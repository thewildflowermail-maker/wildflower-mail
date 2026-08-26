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
          <MonthlySubscriptionForm />
        ) : (
          <>
            <p className="mt-6 text-base leading-relaxed text-charcoal/75">
              Full details and checkout for this option are coming soon. In the meantime, reach out
              through our{" "}
              <Link href="/#contact" className="underline underline-offset-4 hover:text-olive">
                contact section
              </Link>{" "}
              and we&rsquo;ll help you get started.
            </p>
            <Link
              href="/#choose-your-mail"
              className="mt-9 inline-flex items-center justify-center rounded-sm border border-olive px-8 py-4 text-base font-medium text-olive transition-colors duration-250 hover:bg-olive hover:text-ivory"
            >
              ← Back to all options
            </Link>
          </>
        )}
      </Container>
    </section>
  );
}
