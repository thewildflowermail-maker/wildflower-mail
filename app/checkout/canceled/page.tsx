import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function CheckoutCanceledPage() {
  return (
    <section className="paper-grain relative border-b border-olive/10 bg-ivory py-24">
      <Container className="max-w-xl text-center">
        <h1 className="font-serif text-4xl font-semibold text-olive">Checkout canceled</h1>
        <p className="mt-6 text-base leading-relaxed text-charcoal/75">
          No worries — nothing was charged. You can pick up right where you left off whenever you're ready.
        </p>
        <Button href="/#choose-your-mail" size="lg" className="mt-9">Back to options</Button>
      </Container>
    </section>
  );
}
