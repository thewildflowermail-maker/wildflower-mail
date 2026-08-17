import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendTransactionalEmail } from "@/lib/resend/send";

export const runtime = 'edge';

/**
 * Softer alternative to /api/account/cancel — pauses Stripe billing
 * collection (via `pause_collection`, which keeps the subscription and its
 * price/schedule intact rather than canceling it) instead of ending the
 * membership outright. Mirrors the structure of the cancel route.
 */
export async function POST() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const admin = createSupabaseAdminClient();
  const { data: customer } = await admin.from("customers").select("id, email").eq("user_id", user.id).single();
  if (!customer) return NextResponse.json({ error: "Customer not found." }, { status: 404 });

  const { data: subscription } = await admin
    .from("subscriptions")
    .select("*")
    .eq("customer_id", customer.id)
    .eq("status", "active")
    .maybeSingle();

  if (!subscription) return NextResponse.json({ error: "No active membership found." }, { status: 404 });

  await stripe.subscriptions.update(subscription.stripe_subscription_id, {
    pause_collection: { behavior: "void" },
  });

  await admin
    .from("subscriptions")
    .update({ status: "paused", paused_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq("id", subscription.id);

  await sendTransactionalEmail("membershipPaused", customer.email);

  return NextResponse.json({ ok: true });
}
