import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendTransactionalEmail } from "@/lib/resend/send";


// Cloudflare Pages (via @cloudflare/next-on-pages) only supports the
// Edge Runtime for API routes -- without this declaration the route can
// build successfully but fail at request time in production.
export const runtime = 'edge';

/**
 * The lightest-touch alternative to canceling: billing and the
 * subscription itself are untouched (no Stripe call needed) — this just
 * sets a one-time flag that the monthly fulfillment job should check and
 * clear after skipping this member's next edition.
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

  await admin
    .from("subscriptions")
    .update({ skip_next_edition: true, updated_at: new Date().toISOString() })
    .eq("id", subscription.id);

  await sendTransactionalEmail("editionSkipped", customer.email);

  return NextResponse.json({ ok: true });
}
