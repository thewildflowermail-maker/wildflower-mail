import { createClient } from "@supabase/supabase-js";

/**
 * SERVER-ONLY service-role Supabase client. This bypasses Row Level
 * Security and must never be imported into a Client Component or exposed
 * to the browser. Use only inside API routes / server actions, e.g. Stripe
 * webhook handling and the admin dashboard.
 */
export function createSupabaseAdminClient() {
  if (typeof window !== "undefined") {
    throw new Error("createSupabaseAdminClient must never be called from the browser.");
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
