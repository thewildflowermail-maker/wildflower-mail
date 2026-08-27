import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/admin/auth";


// Cloudflare Pages (via @cloudflare/next-on-pages) only supports the
// Edge Runtime for API routes -- without this declaration the route can
// build successfully but fail at request time in production.
export const runtime = 'edge';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return response;
}
