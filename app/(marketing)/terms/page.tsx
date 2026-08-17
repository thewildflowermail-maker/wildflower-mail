import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { LegalNotice } from "@/components/marketing/LegalNotice";
import { brand } from "@/lib/config/site-config";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms and Conditions" description="Last updated: [add date before publishing]" />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl space-y-8 text-sm leading-relaxed text-charcoal/85">
          <LegalNotice />

          <div>
            <h2 className="font-serif text-xl font-medium text-olive">Overview</h2>
            <p className="mt-2">
              These Terms govern your use of the Wildflower Mail website and your purchase of a
              monthly membership or gift subscription. By placing an order, you agree to these
              Terms.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-olive">Memberships and gifts</h2>
            <p className="mt-2">
              The monthly membership renews automatically and bills on a recurring basis until
              canceled. Three- and six-month gift subscriptions are one-time payments that do not
              renew automatically. Prices are shown at checkout; see the Membership page for
              current pricing.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-olive">Content</h2>
            <p className="mt-2">
              Each edition's letters, illustrations, and other contents are provided for personal
              use and reflection. Wildflower Mail retains ownership of its original written and
              designed content.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-olive">Payment</h2>
            <p className="mt-2">
              Payments are processed securely through Stripe. By providing payment information,
              you authorize Wildflower Mail to charge the applicable amount for your selected
              membership or gift.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-olive">Limitation of liability</h2>
            <p className="mt-2">
              [Placeholder — a qualified attorney should draft this section to reflect your
              business structure and applicable state law.]
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-olive">Changes to these Terms</h2>
            <p className="mt-2">
              We may update these Terms from time to time. Material changes will be reflected by
              an updated "last updated" date above.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-olive">Contact</h2>
            <p className="mt-2">Questions about these Terms can be sent to {brand.supportEmail}.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
