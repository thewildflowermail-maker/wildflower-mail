import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendTransactionalEmail } from "@/lib/resend/send";
import { isValidZip } from "@/lib/utils/format";

export async function PATCH(request: Request) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const body = await request.json();
  if (!body.addressLine1 || !body.city || !body.state || !isValidZip(body.zip || "")) {
    return NextResponse.json({ error: "Please provide a complete, valid address." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const { data: customer } = await admin.from("customers").select("id, email").eq("user_id", user.id).single();
  if (!customer) return NextResponse.json({ error: "Customer not found." }, { status: 404 });

  const { data: subscription } = await admin
    .from("subscriptions")
    .select("recipient_id")
    .eq("customer_id", customer.id)
    .maybeSingle();

  if (!subscription) return NextResponse.json({ error: "No membership found." }, { status: 404 });

  await admin.from("shipping_addresses").update({ is_current: false }).eq("recipient_id", subscription.recipient_id);
  await admin.from("shipping_addresses").insert({
    recipient_id: subscription.recipient_id,
    address_line1: body.addressLine1,
    address_line2: body.addressLine2 || null,
    city: body.city,
    state: body.state,
    zip: body.zip,
    is_current: true,
  });

  await sendTransactionalEmail("addressUpdateConfirmation", customer.email, {
    addressLine1: body.addressLine1,
    city: body.city,
    state: body.state,
    zip: body.zip,
  });

  return NextResponse.json({ ok: true });
}
