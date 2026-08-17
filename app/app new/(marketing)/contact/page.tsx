import { redirect } from "next/navigation";

/**
 * Contact is now the homepage's "Contact" section per the 2026 redesign.
 */
export default function ContactRedirect() {
  redirect("/#contact");
}
