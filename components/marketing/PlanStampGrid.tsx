import { ScrollReveal } from "@/components/ui/ScrollReveal";

export type Plan = {
  slug: string;
  name: string;
  stripeUrl: string;
  discountPct?: number;
  paperWeight?: string;
  finish?: string;
};

// Card redesign (was: rotated die-cut "stamp" pieces). Cards now read as
// clean, conventional pricing cards for clarity/conversion, while staying
// on-brand: paper-grain texture, the postmark watermark, and a small
// stamp-style plan icon are kept, just restyled inside a standard card
// shell instead of a perforated stamp clip-path.
//
// One card (the middle/best-value plan) is visually promoted with an
// "olive" fill + "Most Loved" ribbon so there's a clear default choice,
// matching the "clear CTA" goal without inventing fake urgency copy.
const FEATURED_INDEX = 2; // "6 Months" - middle of the 5 plans

// Per-card CTA copy: explicit action verbs tied to what happens next,
// rather than a repeated generic "Subscribe" on every card.
function ctaLabel(plan: Plan): string {
  switch (plan.slug) {
    case "monthly-subscription":
      return "Subscribe Now";
    case "gift-a-friend":
      return "Gift This Plan";
    default:
      return `Get ${plan.name}`; // "Get 3 Months", "Get 6 Months", "Get 1 Year"
  }
}

/**
 * The five "Choose Your Wildflower Mail" plan cards. No interactive state
 * of its own, so this is a plain server component - ScrollReveal handles
 * its own client-side reveal-on-scroll internally.
 */
export function PlanStampGrid({ plans }: { plans: Plan[] }) {
  return (
    <div className="mx-auto grid max-w-sm grid-cols-1 gap-6 sm:max-w-3xl sm:grid-cols-3 lg:max-w-none lg:grid-cols-5">
      {plans.map((plan, i) => {
        const featured = i === FEATURED_INDEX;
        return (
          <ScrollReveal key={plan.slug} delayMs={i * 50}>
            <div
              className={`paper-grain relative flex h-full flex-col items-center rounded-2xl border p-6 text-center shadow-sm transition-shadow hover:shadow-md ${
                featured ? "border-olive/30 bg-olive text-ivory" : "border-olive/10 bg-paper text-charcoal"
              }`}
            >
              {/* "Most Loved" ribbon on the featured plan */}
              {featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-clay px-3 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-ivory shadow">
                  Most Loved
                </span>
              )}

              {/* Discount badge pill, top-right */}
              {plan.discountPct && (
                <span
                  className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
                    featured ? "bg-kraft text-charcoal" : "bg-kraft/70 text-charcoal"
                  }`}
                >
                  {plan.discountPct}% off
                </span>
              )}

              {/* Small stamp-style watermark, unobtrusive, tucked top-left */}
              {/* eslint-disable-next-line @next/next/no-img-element -- small decorative watermark, not a content photo */}
              <img
                src="/images/brand/snail-mail-postmark-circle.png"
                alt=""
                aria-hidden="true"
                className={`pointer-events-none absolute left-4 top-4 h-8 w-8 object-contain mix-blend-multiply ${
                  featured ? "opacity-20" : "opacity-25"
                }`}
              />

              <div className="mt-8 flex flex-1 flex-col items-center">
                <p className="font-serif text-xl font-bold leading-tight sm:text-xl">{plan.name}</p>

                {(plan.paperWeight || plan.finish) && (
                  <p className={`mt-2 text-xs ${featured ? "text-ivory/70" : "text-charcoal/55"}`}>
                    {[plan.paperWeight, plan.finish].filter(Boolean).join(" - ")}
                  </p>
                )}

                <div className="flex-1" />

                
                  <a href={plan.stripeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 w-full rounded-full px-4 py-3 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    featured
                      ? "bg-clay text-ivory hover:bg-clay/90 focus-visible:ring-clay"
                      : "bg-olive text-ivory hover:bg-olive/90 focus-visible:ring-olive"
                  }`}
                >
                  {ctaLabel(plan)}
                </a>
              </div>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
