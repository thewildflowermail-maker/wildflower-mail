import { ScrollReveal } from "@/components/ui/ScrollReveal";

export type Plan = {
  slug: string;
  name: string;
  stripeUrl: string;
  discountPct?: number;
  paperWeight?: string;
  finish?: string;
};

const STAMP_STYLE = [
  { bg: "bg-kraft", text: "text-charcoal", accent: "text-charcoal/55", border: "border-charcoal/20" },
  { bg: "bg-blossom", text: "text-charcoal", accent: "text-charcoal/55", border: "border-charcoal/20" },
  { bg: "bg-dustyrose", text: "text-ivory", accent: "text-ivory/70", border: "border-ivory/35" },
  { bg: "bg-peach", text: "text-charcoal", accent: "text-charcoal/55", border: "border-charcoal/20" },
  { bg: "bg-sage/[0.32]", text: "text-olive", accent: "text-olive/60", border: "border-olive/25" },
];

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
              
               <div className={`${rotateClass} ${liftClass} relative w-full max-w-[200px]`}>
              
                href={plan.stripeUrl} href={plan.stripeUrl}
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
                    className={`absolute top-[14%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border-2 ${style.border} px-3 py-1 text-sm font-bold uppercase tracking-[0.06em] ${style.accent}`}
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
