import { brand } from "@/lib/config/site-config";
import { currentYear } from "@/lib/utils/format";

/**
 * Wraps any email's heading/body paragraphs in a single shared, branded,
 * mobile-friendly HTML layout (inline styles only, for email-client
 * compatibility) plus a plain-text fallback.
 */
export function renderBrandedEmail({
  heading,
  body,
  ctaLabel,
  ctaUrl,
}: {
  heading: string;
  body: string[];
  ctaLabel?: string;
  ctaUrl?: string;
}) {
  const paragraphsHtml = body
    .map(
      (p) =>
        `<p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#302F2B;">${escapeHtml(p)}</p>`
    )
    .join("");

  const ctaHtml =
    ctaLabel && ctaUrl
      ? `<a href="${ctaUrl}" style="display:inline-block;margin-top:8px;padding:12px 24px;background:#3E4636;color:#FCFAF5;text-decoration:none;border-radius:3px;font-size:14px;font-weight:600;">${escapeHtml(
          ctaLabel
        )}</a>`
      : "";

  const html = `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:#F7F2E9;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F7F2E9;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:520px;background-color:#FCFAF5;border-radius:4px;overflow:hidden;">
            <tr>
              <td style="padding:32px 32px 0 32px;">
                <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#B9785E;font-family:Arial,sans-serif;">
                  ${brand.name}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 0 32px;">
                <h1 style="margin:0 0 20px 0;font-size:24px;line-height:1.3;color:#3E4636;font-weight:500;">
                  ${escapeHtml(heading)}
                </h1>
                ${paragraphsHtml}
                ${ctaHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0;font-size:12px;color:#302F2B99;font-family:Arial,sans-serif;">
                  ${brand.name} · ${brand.supportEmail}<br/>
                  © ${currentYear()} ${brand.name}. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [heading, "", ...body, "", ctaLabel && ctaUrl ? `${ctaLabel}: ${ctaUrl}` : "", `${brand.name} · ${brand.supportEmail}`]
    .filter(Boolean)
    .join("\n");

  return { html, text };
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
