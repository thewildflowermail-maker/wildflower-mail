import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Checkout Canceled",
  robots: { index: false },
};

export default function CheckoutCanceledPage() {
  return (
    <section className="py-24 text-center">
      <Container className="max-w-xl">
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-olive">
          Your checkout was canceled.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-charcoal/85">
          No payment was made. You're welcome to try again whenever you're ready.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button href="/membership">Back to Membership</Button>
          <Button href="/contact" variant="secondary">Contact Us</Button>
        </div>
      </Container>
    </section>
  );
}
