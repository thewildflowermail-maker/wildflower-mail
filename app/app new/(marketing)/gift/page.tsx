import { redirect } from "next/navigation";

/**
 * The standalone Gift page has been folded into the homepage's
 * "Choose Your Wildflower Mail" section per the 2026 redesign — the
 * gifting option now lives at /mail/gift-a-friend.
 */
export default function GiftRedirect() {
  redirect("/mail/gift-a-friend");
}
