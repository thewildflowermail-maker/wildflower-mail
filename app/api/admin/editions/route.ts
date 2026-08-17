import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = 'edge';

export async function POST(request: Request) {
  const body = await request.json();
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase.from("monthly_editions").insert({
    name: body.name,
    month_year: body.monthYear,
    theme_description: body.themeDescription || null,
    order_cutoff_date: body.orderCutoffDate || null,
    mailing_date: body.mailingDate || null,
    status: "draft",
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase
    .from("monthly_editions")
    .update({ status: body.status, updated_at: new Date().toISOString() })
    .eq("id", body.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
