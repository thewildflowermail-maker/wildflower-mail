import { resend, FROM_ADDRESS } from "./client";
import { emailCopy, type EmailTemplateKey, type EmailCopyInput } from "@/emails/copy";
import { renderBrandedEmail } from "@/emails/render";

/**
 * Sends a transactional email using a named template from emails/copy.ts.
 * All 14 transactional templates required by the spec are covered by the
 * EmailTemplateKey union — see emails/copy.ts for the full list.
 *
 * IMPORTANT: this function is for transactional email only (order
 * confirmations, receipts, account changes). Marketing/newsletter sends are
 * handled separately (see api/newsletter/route.ts) and require the
 * recipient to have given separate marketing consent — never call this to
 * send promotional content to someone who has only completed a purchase.
 */
export async function sendTransactionalEmail(
  template: EmailTemplateKey,
  to: string,
  values: EmailCopyInput = {}
) {
  const copy = emailCopy[template](values);
  const { html, text } = renderBrandedEmail(copy);

  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_placeholder") {
    console.warn(
      `[resend] RESEND_API_KEY not configured — skipping send of "${template}" to ${to}. ` +
        "Set RESEND_API_KEY in your environment to enable real delivery."
    );
    return { skipped: true };
  }

  return resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: copy.subject,
    html,
    text,
  });
}
