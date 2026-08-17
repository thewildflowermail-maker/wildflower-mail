import { redirect } from "next/navigation";

/**
 * "Past Editions" was not part of the 2026 redesign's simplified page list,
 * so this route redirects home rather than being linked anywhere.
 */
export default function PastEditionsRedirect() {
  redirect("/");
}
