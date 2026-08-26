import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { brand, plans } from "@/lib/config/site-config";
import { MonthlySubscriptionForm } from "@/components/marketing/checkout/MonthlySubscriptionForm";

export function generateStaticParams() {
  return plans.map((plan) => ({ plan: plan.slug }));
}

export function generateMetadata({ params }: { params: { plan: string } }): Metadata {
  const plan = plans.find((p) => p.slug === params.plan);
  return {
    title: plan ? `${plan.name} | ${brand.name}` : brand.name,
    alternates: { canonical: `/mail/${params.plan}` },
  };
}

/**
 * Dedicated page for one "Choose Your Wildflower Mail" option. Clicking a
 * piece of mail on the homepage lands here.
 *
 * "monthly-subscription" has a full checkout form wired to Stripe. The
 * other four plans (3 Months / 6 Months / 1 Year / Gift a Friend) still
 * use their existing direct Stripe Payment Link for now - this page shows
 * that as a simple "Continue to checkout" button, matching the same
 * pattern the homepage cards already use, until each gets a full form
 * built out the same way Monthly Subscription just was.
 */
export default function PlanPage({ params }: { params: { plan: string } }) {
  const plan = plans.find((p) => p.slug === params.plan);
  if (!plan) notFound();

  return (
    <section className="paper-grain relative border-b border-olive/10 bg-ivory py-20 sm:py-28">
      <Container className="max-w-xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-raspberry/80">
          {brand.name}
        </p>
        <h1 className="font-serif text-4xl font-semibold text-olive sm:text-5xl">{plan.name}</h1>

        {plan.slug === "monthly-subscription" ? (
          <>
            <p className="mt-6 text-base leading-relaxed text-charcoal/75">
              $16/month, cancel anytime. Tell us where to send your Wildflower Mail.
            </p>
            <MonthlySubscriptionForm />
          </>
        ) : (
          <>
            <p className="mt-6 text-base leading-relaxed text-charcoal/75">
              Ready to get started with {plan.name}?
            </p>
            <a
              href={plan.stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center justify-center rounded-sm bg-raspberry px-8 py-4 text-base font-medium text-paper transition-colors duration-250 hover:bg-charcoal"
            >
              Continue to Checkout
            </a>
          </>
        )}

        <div>
          <Link
            href="/#choose-your-mail"
            className="mt-9 inline-flex items-center justify-center rounded-sm border border-olive px-8 py-4 text-base font-medium text-olive transition-colors duration-250 hover:bg-olive hover:text-ivory"
          >
            Back to all options
          </Link>
        </div>
      </Container>
    </section>
  );
}
