import { redirect } from "next/navigation";

/**
 * A standalone FAQ page was not part of the 2026 redesign's simplified page
 * list — questions now go through the homepage's Contact section.
 */
export default function FaqRedirect() {
  redirect("/#contact");
}
