import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { CartCheckoutForm } from "@/components/marketing/CartCheckoutForm";

export const metadata: Metadata = {
  title: "Cart & Checkout",
  robots: { index: false },
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return (
    <>
      <PageHero eyebrow="Checkout" title="Complete your membership" />
      <section className="py-16 sm:py-20">
        <Container>
          <Suspense fallback={<p className="text-sm text-charcoal/60">Loading…</p>}>
            <CartCheckoutForm />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
