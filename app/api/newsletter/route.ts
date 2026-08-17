import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation/schemas";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = 'edge';

/**
 * Adds someone to the Wildflower Notes marketing list. This is the ONLY
 * place marketing consent should be granted from a standalone form — never
 * add a paying customer to marketing email just because they checked out
 * (see api/checkout/* routes, which only add consent when the customer
 * explicitly opts in during checkout).
 *
 * TODO: once a marketing email platform (e.g. Klaviyo, Mailchimp) is
 * connected, sync the contact there too. For now this only records
 * consent in Supabase.
 */
export async function POST(request: Request) {
  const body = await request.json();
  const parsed = newsletterSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { firstName, email } = parsed.data;
  const supabase = createSupabaseAdminClient();

  await supabase.from("email_consent").upsert(
    {
      email,
      first_name: firstName,
      marketing_consent: true,
      consent_source: "homepage_newsletter_form",
      consented_at: new Date().toISOString(),
    },
    { onConflict: "email" }
  );

  return NextResponse.json({ ok: true });
}
