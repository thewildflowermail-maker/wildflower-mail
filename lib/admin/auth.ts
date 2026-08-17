const COOKIE_NAME = "wm_admin_session";

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "insecure-default-change-me";
}

async function getHmacKey() {
  const keyData = new TextEncoder().encode(getSecret());
  return crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
}

function bufferToHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(value: string) {
  const key = await getHmacKey();
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return bufferToHex(signature);
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function createAdminSessionToken() {
  const issuedAt = Date.now().toString();
  return `${issuedAt}.${await sign(issuedAt)}`;
}

export async function isValidAdminSessionToken(token: string | undefined | null) {
  if (!token) return false;
  const [issuedAt, signature] = token.split(".");
  if (!issuedAt ||
