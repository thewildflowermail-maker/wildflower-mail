import crypto from "crypto";

const COOKIE_NAME = "wm_admin_session";

/**
 * Minimal shared-password admin auth for the MVP. This is intentionally
 * simple: one password (ADMIN_PASSWORD) grants a signed session cookie.
 *
 * UPGRADE PATH: replace with per-admin accounts via Supabase Auth + a
 * `role = 'admin'` claim once more than one person needs admin access or
 * an audit trail of who changed what is required.
 */
function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "insecure-default-change-me";
}

function sign(value: string) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createAdminSessionToken() {
  const issuedAt = Date.now().toString();
  return `${issuedAt}.${sign(issuedAt)}`;
}

export function isValidAdminSessionToken(token: string | undefined | null) {
  if (!token) return false;
  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) return false;
  const expected = sign(issuedAt);
  if (signature.length !== expected.length) return false;
  const valid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!valid) return false;

  // Sessions expire after 12 hours.
  const twelveHoursMs = 12 * 60 * 60 * 1000;
  return Date.now() - Number(issuedAt) < twelveHoursMs;
}

export function checkAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return password === expected;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
