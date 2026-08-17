import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { giftCheckoutSchema } from "@/lib/validation/schemas";
import { pricing } from "@/lib/config/site-config";

export const runtime = 'edge';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = giftCheckoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const plan = data.duration === "gift-three-month" ? pricing.giftThreeMonth : pricing.giftSixMonth;
  const priceId = process.env[plan.stripePriceEnvVar];

  if (!priceId) {
    return NextResponse.json(
      { error: `Stripe price is not configured. Set ${plan.stripePriceEnvVar} in your environment.` },
      { status: 500 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: data.purchaserEmail,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/canceled`,
      metadata: {
        order_type: "gift",
        product_id: plan.id,
        edition_count: String(plan.editionCount),
        recipient_name: data.recipientName,
        address_line1: data.addressLine1,
        address_line2: data.addressLine2 || "",
        city: data.city,
        state: data.state,
        zip: data.zip,
        purchaser_name: data.purchaserName,
        purchaser_email: data.purchaserEmail,
        gift_message: data.giftMessage || "",
        starting_month: data.startingMonth,
        reveal_sender: data.revealSender,
        announcement_preference: data.announcementPreference,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe gift checkout error:", err);
    return NextResponse.json({ error: "Unable to start checkout. Please try again." }, { status: 500 });
  }
}
