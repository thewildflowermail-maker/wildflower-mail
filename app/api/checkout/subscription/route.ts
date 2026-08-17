import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { subscriptionCheckoutSchema } from "@/lib/validation/schemas";
import { pricing } from "@/lib/config/site-config";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = subscriptionCheckoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const priceId = process.env[pricing.monthlyMembership.stripePriceEnvVar];

  if (!priceId) {
    return NextResponse.json(
      { error: "Stripe price is not configured. Set STRIPE_PRICE_MONTHLY_MEMBERSHIP in your environment." },
      { status: 500 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: data.email,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/canceled`,
      allow_promotion_codes: true,
      metadata: {
        order_type: "membership",
        product_id: pricing.monthlyMembership.id,
        full_name: data.fullName,
        email: data.email,
        address_line1: data.addressLine1,
        address_line2: data.addressLine2 || "",
        city: data.city,
        state: data.state,
        zip: data.zip,
        newsletter_consent: String(data.newsletterConsent),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe subscription checkout error:", err);
    return NextResponse.json({ error: "Unable to start checkout. Please try again." }, { status: 500 });
  }
}
