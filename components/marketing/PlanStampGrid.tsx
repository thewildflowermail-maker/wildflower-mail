import { ScrollReveal } from "@/components/ui/ScrollReveal";

export type Plan = {
  slug: string;
  name: string;
  stripeUrl: string;
  discountPct?: number;
  paperWeight?: string;
  finish?: string;
};

// Each subscription stamp's color + text-tone pairing. Per the 2026.5
// color-balance correction: a mixed stationery-collection palette of warm
// kraft, dusty blush, muted berry rose and soft peach, with only ONE
// subtle sage moment - sage is an accent now, not the default.
const STAMP_STYLE = [
  { bg: "bg-kraft", text: "text-charcoal", accent: "text-charcoal/55", border: "border-charcoal/20" },
  { bg: "bg-blossom", text: "text-charcoal", accent: "text-charcoal/55", border: "border-charcoal/20" },
  { bg: "bg-dustyrose", text: "text-ivory", accent: "text-ivory/70", border: "border-ivory/35" },
  { bg: "bg-peach", text: "text-charcoal", accent: "text-charcoal/55", border: "border-charcoal/20" },
  { bg: "bg-sage/[0.32]", text: "text-olive", accent: "text-olive/60", border: "border-olive/25" },
];

/**
 * The five "Choose Your Wildflower Mail" stamps. No interactive state of
 * its own, so this is a plain server component - ScrollReveal handles its
 * own client-side reveal-on-scroll internally.
 *
 * Whole card is the link (no separate CTA button, no "Most Loved" badge) -
 * clicking/tapping anywhere on the stamp goes straight to that plan's
 * Stripe checkout link.
 *
 * Fix: the badge + title were using `flex` from Tailwind, but
