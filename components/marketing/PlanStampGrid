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
 * Fix: the badge + title were using `flex` from Tailwind, but the
 * `.stamp-piece` CSS rule (in globals.css) also sets `display: block`,
 * which - depending on stylesheet order - could silently win over the
 * `flex` utility class and break the vertical stacking, which is what
 * caused the discount badge to visually collide with two-line plan names
 * like "A Gift to a Friend". `!flex !flex-col` forces flex to always
 * apply regardless of source order. Gap increased slightly (gap-2 ->
 * gap-3) and title given a touch more line-height room as extra headroom
 * for two-line names.
 */
export function PlanStampGrid({ plans }: { plans: Plan[] }) {
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:max-w-none lg:grid-cols-5 lg:gap-x-5">
      {plans.map((plan, i) => {
        const style = STAMP_STYLE[i % STAMP_STYLE.length];
        const rotateClass = i % 2 === 0 ? "lg:-rotate-1" : "lg:rotate-1";
        const liftClass = i % 3 === 1 ? "lg:-translate-y-2" : i % 3 === 2 ? "lg:translate-y-2" : "";
        const isLast = i === plans.length - 1;
        return (
          <ScrollReveal
            key={plan.slug}
            delayMs={i * 50}
            className={isLast ? "col-span-2 flex justify-center sm:col-span-1" : ""}
          >
            <div className={`${rotateClass} ${liftClass} relative w-full max-w-[200px]`}>
              <a
                href={plan.stripeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`stamp-piece paper-grain ${style.bg} !flex !flex-col items-center justify-center gap-3 px-6 text-center`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- small decorative watermark, not a content photo */}
                <img
                  src="/images/brand/snail-mail-postmark-circle.png"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[6%] right-[6%] h-[24%] w-[24%] object-contain opacity-[0.24] mix-blend-multiply"
                />
                <span className={`absolute inset-[11%] border ${style.border}`} aria-hidden="true" />
                {plan.discountPct && (
                  <span
                    className={`relative shrink-0 rounded-full border-2 ${style.border} px-3 py-1 text-sm font-bold uppercase tracking-[0.06em] ${style.accent}`}
                  >
                    {plan.discountPct}% off
                  </span>
                )}
                <p className={`relative font-serif text-lg font-semibold leading-snug ${style.text}`}>
                  {plan.name}
                </p>
              </a>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
