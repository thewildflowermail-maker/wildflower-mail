import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe/client";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendTransactionalEmail } from "@/lib/resend/send";
import { brand } from "@/lib/config/site-config";

// Cloudflare's adapter requires every dynamic route to run on the Edge
// Runtime — this still works for Stripe signature verification because
// wrangler.toml enables the nodejs_compat flag, which polyfills the
// node:crypto functions the Stripe SDK uses under the hood.
//
// Route handlers receive the raw body via request.text(), which is required
// for Stripe signature verification — do not use request.json() here.
export const runtime = 'edge';

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const payload = await request.text();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session, supabase);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.customer_email) {
          await sendTransactionalEmail("paymentFailed", invoice.customer_email);
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await supabase
          .from("subscriptions")
          .update({
            status: subscription.status,
            cancel_at_period_end: subscription.cancel_at_period_end,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await supabase
          .from("subscriptions")
          .update({ status: "canceled", updated_at: new Date().toISOString() })
          .eq("stripe_subscription_id", subscription.id);
        break;
      }

      default:
        // Unhandled event types are safely ignored.
        break;
    }
  } catch (err) {
    // Log and still return 200 where appropriate is debatable — we return
    // 500 so Stripe retries, since a DB/email failure here should not be
    // silently dropped.
    console.error(`Error handling Stripe webhook event ${event.type}:`, err);
    return NextResponse.json({ error: "Webhook handler failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  supabase: ReturnType<typeof createSupabaseAdminClient>
) {
  const metadata = session.metadata || {};
  const orderType = metadata.order_type;

  if (orderType === "membership") {
    const { data: customer } = await supabase
      .from("customers")
      .insert({
        full_name: metadata.full_name,
        email: metadata.email,
        stripe_customer_id: typeof session.customer === "string" ? session.customer : null,
        newsletter_consent: metadata.newsletter_consent === "true",
      })
      .select()
      .single();

    if (!customer) return;

    const { data: recipient } = await supabase
      .from("recipients")
      .insert({ customer_id: customer.id, full_name: metadata.full_name, is_self: true, reveal_sender: true })
      .select()
      .single();

    if (!recipient) return;

    const { data: address } = await supabase
      .from("shipping_addresses")
      .insert({
        recipient_id: recipient.id,
        address_line1: metadata.address_line1,
        address_line2: metadata.address_line2 || null,
        city: metadata.city,
        state: metadata.state,
        zip: metadata.zip,
      })
      .select()
      .single();

    const subscriptionId = typeof session.subscription === "string" ? session.subscription : null;

    let subscriptionRow = null;
    if (subscriptionId) {
      const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);
      const { data } = await supabase
        .from("subscriptions")
        .insert({
          customer_id: customer.id,
          recipient_id: recipient.id,
          product_id: metadata.product_id,
          stripe_subscription_id: subscriptionId,
          status: stripeSubscription.status,
          current_period_end: new Date(stripeSubscription.current_period_end * 1000).toISOString(),
        })
        .select()
        .single();
      subscriptionRow = data;
    }

    await supabase.from("orders").insert({
      customer_id: customer.id,
      product_id: metadata.product_id,
      order_type: "membership",
      subscription_id: subscriptionRow?.id || null,
      stripe_checkout_session_id: session.id,
      status: "paid",
    });

    if (metadata.email) {
      await sendTransactionalEmail("welcome", metadata.email, { firstName: metadata.full_name?.split(" ")[0] });
      await sendTransactionalEmail("membershipConfirmation", metadata.email, {
        firstName: metadata.full_name?.split(" ")[0],
        addressLine1: metadata.address_line1,
        city: metadata.city,
        state: metadata.state,
        zip: metadata.zip,
      });
    }

    if (metadata.newsletter_consent === "true" && metadata.email) {
      await supabase.from("email_consent").upsert(
        {
          email: metadata.email,
          first_name: metadata.full_name?.split(" ")[0],
          marketing_consent: true,
          consent_source: "checkout_opt_in",
          consented_at: new Date().toISOString(),
        },
        { onConflict: "email" }
      );
    }

    // Internal notification to the business owner.
    await sendTransactionalEmail("internalNewOrderNotification", brand.supportEmail, {
      orderType: "Monthly Membership",
      customerName: metadata.full_name,
      customerEmail: metadata.email,
      productName: "Monthly Membership",
    });
  }

  if (orderType === "gift") {
    const { data: purchaser } = await supabase
      .from("customers")
      .insert({
        full_name: metadata.purchaser_name,
        email: metadata.purchaser_email,
        stripe_customer_id: typeof session.customer === "string" ? session.customer : null,
      })
      .select()
      .single();

    if (!purchaser) return;

    const { data: recipient } = await supabase
      .from("recipients")
      .insert({
        customer_id: purchaser.id,
        full_name: metadata.recipient_name,
        is_self: false,
        reveal_sender: metadata.reveal_sender === "reveal",
        gift_message: metadata.gift_message || null,
      })
      .select()
      .single();

    if (!recipient) return;

    await supabase.from("shipping_addresses").insert({
      recipient_id: recipient.id,
      address_line1: metadata.address_line1,
      address_line2: metadata.address_line2 || null,
      city: metadata.city,
      state: metadata.state,
      zip: metadata.zip,
    });

    const editionCount = Number(metadata.edition_count || 0);

    const { data: giftSubscription } = await supabase
      .from("gift_subscriptions")
      .insert({
        purchaser_customer_id: purchaser.id,
        recipient_id: recipient.id,
        product_id: metadata.product_id,
        starting_month: metadata.starting_month,
        announcement_preference: metadata.announcement_preference,
        editions_total: editionCount,
      })
      .select()
      .single();

    await supabase.from("orders").insert({
      customer_id: purchaser.id,
      product_id: metadata.product_id,
      order_type: "gift",
      gift_subscription_id: giftSubscription?.id || null,
      stripe_checkout_session_id: session.id,
      status: "paid",
    });

    if (metadata.purchaser_email) {
      await sendTransactionalEmail("giftOrderConfirmationPurchaser", metadata.purchaser_email, {
        purchaserName: metadata.purchaser_name,
        recipientName: metadata.recipient_name,
        editionCount: metadata.edition_count,
        announcementPreference: metadata.announcement_preference,
      });
    }

    // Optional immediate digital gift announcement — only if the purchaser
    // chose "email-now" AND we have an email for the recipient (not
    // collected today; wire up a recipient-email field before enabling).
    if (metadata.announcement_preference === "email-now" && metadata.recipient_email) {
      await sendTransactionalEmail("giftAnnouncementRecipient", metadata.recipient_email, {
        senderLine: metadata.reveal_sender === "reveal" ? metadata.purchaser_name : "Someone who cares about you",
        startingMonth: metadata.starting_month,
      });
    }

    await sendTransactionalEmail("internalNewOrderNotification", brand.supportEmail, {
      orderType: `Gift (${metadata.product_id})`,
      customerName: metadata.purchaser_name,
      customerEmail: metadata.purchaser_email,
      productName: metadata.product_id,
    });
  }
}
