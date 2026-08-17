import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getCurrentCustomer() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, customer: null };

  const { data: customer } = await supabase.from("customers").select("*").eq("user_id", user.id).maybeSingle();
  return { user, customer };
}

export async function getCustomerSubscription(customerId: string) {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("subscriptions")
    .select("*, recipients(*, shipping_addresses(*))")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false })
    .maybeSingle();
  return data;
}

export async function getCustomerGiftSubscriptions(customerId: string) {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("gift_subscriptions")
    .select("*, recipients(full_name)")
    .eq("purchaser_customer_id", customerId)
    .order("created_at", { ascending: false });
  return data || [];
}

export async function getCustomerOrders(customerId: string) {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });
  return data || [];
}

export async function getRecipientPlaylists(recipientId: string) {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("mailing_batches")
    .select("mailing_status, mailed_at, monthly_editions(name, month_year, playlist_links(spotify_url))")
    .eq("recipient_id", recipientId)
    .eq("mailing_status", "mailed")
    .order("mailed_at", { ascending: false });
  return data || [];
}
