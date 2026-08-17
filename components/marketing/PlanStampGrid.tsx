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
// subtle sage moment — sage is an accent now, not the default.
const STAMP_STYLE = [
  { bg: "bg-kraft", text: "text-charcoal", accent: "text-charcoal/55", border: "border-charcoal/20" },
  { bg: "bg-blossom", text: "text-charcoal", accent: "text-charcoal/55", border: "border-charcoal/20" },
  { bg: "bg-dustyrose", text: "text-ivory", accent: "text-ivory/70", border: "border-ivory/35" },
  { bg: "bg-peach", text: "text-charcoal", accent: "text-charcoal/55", border: "border-charcoal/20" },
  { bg: "bg-sage/[0.32]", text: "text-olive", accent: "text-olive/60", border: "border-olive/25" },
];

/**
 * The five "Choose Your Wildflower Mail" stamps. No interactive state of
 * its own, so this is a plain server component — ScrollReveal handles its
 * own client-side reveal-on-scroll internally.
 *
 * The paper-weight/finish badge and the old built-in postmark SVG were
 * removed in favor of the supplied "SNAIL MAIL" postmark illustration
 * (public/images/brand/snail-mail-postmark-circle.png — the circular-badge
 * crop of the full graphic, which also has wavy cancellation lines running
 * off to the left; the circle crop reads better at this small card size).
 * It sits as a small, low-opacity, mix-blend-multiply mark tucked into the
 * bottom-right corner of the card, so it reads as a little inked postmark
 * stamped onto the paper rather than a flat sticker or a distraction from
 * the plan name — and stays legible against every stamp color since
 * multiply blending lets each card's own background show through.
 *
 * .paper-grain still adds the same fine paper-fiber noise used elsewhere
 * on the site, so the flat stamp colors read as aged/printed paper rather
 * than flat UI-color swatches. .stamp-piece's own clip-path still draws
 * the full perforated edge. A pressed/active micro-interaction (scale
 * down slightly, deepen shadow) lives on .stamp-piece:active in
 * globals.css.
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
                className={`stamp-piece paper-grain ${style.bg} flex flex-col items-center justify-center gap-2 px-6 text-center`}
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
                    className={`relative rounded-full border-2 ${style.border} px-3 py-1 text-sm font-bold uppercase tracking-[0.06em] ${style.accent}`}
                  >
                    {plan.discountPct}% off
                  </span>
                )}
                <p className={`relative font-serif text-lg font-semibold leading-tight ${style.text} sm:text-xl`}>
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
