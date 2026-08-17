import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = 'edge';

function csvEscape(value: string | null | undefined) {
  const v = (value ?? "").toString();
  if (v.includes(",") || v.includes('"') || v.includes("\n")) {
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}

/**
 * Exports the current mailing list as CSV, formatted with the columns most
 * label-printing and shipping tools expect. Optionally filter by edition:
 * /api/admin/mailing-list?edition=<monthly_editions.id>
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const editionId = searchParams.get("edition");
  const supabase = createSupabaseAdminClient();

  let query = supabase
    .from("mailing_batches")
    .select(
      `mailing_status, tracking_number,
       recipients(full_name, is_self, gift_message),
       shipping_addresses(address_line1, address_line2, city, state, zip, country),
       subscriptions(product_id),
       gift_subscriptions(product_id)`
    );

  if (editionId) query = query.eq("edition_id", editionId);

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const header = [
    "Recipient Name",
    "Address Line 1",
    "Address Line 2",
    "City",
    "State",
    "ZIP Code",
    "Country",
    "Subscription Type",
    "Gift Status",
    "Gift Message",
    "Mailing Status",
  ];

  const rows = (data || []).map((row: any) => {
    const addr = row.shipping_addresses;
    const isGift = !row.recipients?.is_self;
    return [
      row.recipients?.full_name,
      addr?.address_line1,
      addr?.address_line2,
      addr?.city,
      addr?.state,
      addr?.zip,
      addr?.country || "US",
      row.subscriptions?.product_id || row.gift_subscriptions?.product_id || "",
      isGift ? "Gift" : "Self",
      row.recipients?.gift_message,
      row.mailing_status,
    ]
      .map(csvEscape)
      .join(",");
  });

  const csv = [header.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="wildflower-mail-mailing-list-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
