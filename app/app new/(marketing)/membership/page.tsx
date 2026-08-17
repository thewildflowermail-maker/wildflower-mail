import { redirect } from "next/navigation";

/**
 * The standalone Membership page has been folded into the homepage's
 * "Choose Your Wildflower Mail" section per the 2026 redesign — the
 * Monthly Subscription option now lives at /mail/monthly-subscription.
 * This route stays in place (redirecting) so any old links/bookmarks
 * still land somewhere useful.
 */
export default function MembershipRedirect() {
  redirect("/mail/monthly-subscription");
}
