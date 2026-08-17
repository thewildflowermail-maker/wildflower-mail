import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * Thin data-access helpers for the admin dashboard. Each function fails
 * soft (returns an empty result + isConfigured: false) if Supabase hasn't
 * been connected yet, so the admin UI can render a friendly empty state
 * during initial setup instead of crashing.
 */

function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project")
  );
}

export async function getDashboardCounts() {
  if (!isSupabaseConfigured()) {
    return { isConfigured: false, subscribers: 0, giftSubscriptions: 0, failedPayments: 0, canceledSubscriptions: 0 };
  }
  const supabase = createSupabaseAdminClient();
  const [subscribers, gifts, failed, canceled] = await Promise.all([
    supabase.from("subscriptions").select("id", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("gift_subscriptions").select("id", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("payments").select("id", { count: "exact", head: true }).eq("status", "failed"),
    supabase.from("subscriptions").select("id", { count: "exact", head: true }).eq("status", "canceled"),
  ]);
  return {
    isConfigured: true,
    subscribers: subscribers.count || 0,
    giftSubscriptions: gifts.count || 0,
    failedPayments: failed.count || 0,
    canceledSubscriptions: canceled.count || 0,
  };
}

export async function listSubscribers(search?: string, membershipType?: string) {
  if (!isSupabaseConfigured()) return { isConfigured: false, rows: [] as any[] };
  const supabase = createSupabaseAdminClient();
  let query = supabase
    .from("subscriptions")
    .select("id, status, current_period_end, cancel_at_period_end, product_id, customers(full_name, email)")
    .order("created_at", { ascending: false });

  if (membershipType) query = query.eq("product_id", membershipType);
  const { data } = await query;

  let rows = data || [];
  if (search) {
    const s = search.toLowerCase();
    rows = rows.filter((r: any) => {
      const name = r.customers?.full_name?.toLowerCase() || "";
      const email = r.customers?.email?.toLowerCase() || "";
      return name.includes(s) || email.includes(s);
    });
  }
  return { isConfigured: true, rows };
}

export async function listRecipientsWithAddresses(search?: string) {
  if (!isSupabaseConfigured()) return { isConfigured: false, rows: [] as any[] };
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("recipients")
    .select("id, full_name, is_self, gift_message, shipping_addresses(address_line1, address_line2, city, state, zip)")
    .order("created_at", { ascending: false });

  let rows = data || [];
  if (search) {
    const s = search.toLowerCase();
    rows = rows.filter((r: any) => r.full_name?.toLowerCase().includes(s));
  }
  return { isConfigured: true, rows };
}

export async function listEditions() {
  if (!isSupabaseConfigured()) return { isConfigured: false, rows: [] as any[] };
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("monthly_editions")
    .select("id, name, month_year, theme_description, status, order_cutoff_date, mailing_date")
    .order("created_at", { ascending: false });
  return { isConfigured: true, rows: data || [] };
}

export async function listFailedPayments() {
  if (!isSupabaseConfigured()) return { isConfigured: false, rows: [] as any[] };
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("payments")
    .select("id, amount_cents, failure_reason, created_at")
    .eq("status", "failed")
    .order("created_at", { ascending: false });
  return { isConfigured: true, rows: data || [] };
}
