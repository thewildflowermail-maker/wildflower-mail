import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false },
};

export default function CheckoutSuccessPage() {
  return (
    <section className="py-24 text-center">
      <Container className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">Thank you</p>
        <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-medium text-olive">
          Your order has been received.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-charcoal/85">
          A confirmation email is on its way. Your first edition will be prepared and mailed
          according to the current mailing schedule — details are in your confirmation email and
          on the How It Works page.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button href="/account">View My Account</Button>
          <Button href="/" variant="secondary">Return Home</Button>
        </div>
      </Container>
    </section>
  );
}
