import { redirect } from "next/navigation";

/**
 * "How It Works" is now covered by the homepage's "What's Inside?" section
 * per the 2026 redesign, so this standalone page redirects there.
 */
export default function HowItWorksRedirect() {
  redirect("/#whats-inside");
}
