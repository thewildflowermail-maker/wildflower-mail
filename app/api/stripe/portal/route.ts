import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { createSupabaseServerClient } from "@/lib/supabase/server";


// Cloudflare Pages (via @cloudflare/next-on-pages) only supports the
// Edge Runtime for API routes -- without this declaration the route can
// build successfully but fail at request time in production.
export const runtime = 'edge';

/**
 * Creates a Stripe Billing Portal session for the signed-in customer, so
 * they can update payment methods or view invoices without Wildflower Mail
 * building custom billing UI.
 */
export async function POST() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const { data: customer } = await supabase
    .from("customers")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  if (!customer?.stripe_customer_id) {
    return NextResponse.json({ error: "No billing account found." }, { status: 404 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customer.stripe_customer_id,
    return_url: `${siteUrl}/account`,
  });

  return NextResponse.json({ url: portalSession.url });
}
