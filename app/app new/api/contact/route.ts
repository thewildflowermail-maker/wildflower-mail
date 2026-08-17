import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/schemas";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendTransactionalEmail } from "@/lib/resend/send";
import { brand } from "@/lib/config/site-config";

export const runtime = 'edge';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const supabase = createSupabaseAdminClient();

  await supabase.from("contact_inquiries").insert({
    name: data.name,
    email: data.email,
    order_number: data.orderNumber || null,
    topic: data.topic,
    subject: data.subject,
    message: data.message,
  });

  await sendTransactionalEmail("contactConfirmation", data.email, { subject: data.subject });
  await sendTransactionalEmail("internalNewOrderNotification", brand.supportEmail, {
    orderType: `Contact form: ${data.topic}`,
    customerName: data.name,
    customerEmail: data.email,
    productName: data.subject,
  });

  return NextResponse.json({ ok: true });
}
