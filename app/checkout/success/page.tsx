import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function CheckoutSuccessPage() {
  return (
    <section className="paper-grain relative border-b border-olive/10 bg-ivory py-24">
      <Container className="max-w-xl text-center">
        <h1 className="font-serif text-4xl font-semibold text-olive">You're in! 🌾</h1>
        <p className="mt-6 text-base leading-relaxed text-charcoal/75">
          Thank you for subscribing to The Wildflower Mail. A confirmation email is on its way —
          your first edition will arrive soon.
        </p>
        <Button href="/" size="lg" className="mt-9">Back to home</Button>
      </Container>
    </section>
  );
}
