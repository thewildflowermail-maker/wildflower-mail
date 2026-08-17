import { redirect } from "next/navigation";

/**
 * "About" is now the homepage's "Our Story" section per the 2026 redesign.
 */
export default function AboutRedirect() {
  redirect("/#our-story");
}
