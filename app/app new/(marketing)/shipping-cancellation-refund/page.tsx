import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { LegalNotice } from "@/components/marketing/LegalNotice";
import { operations, brand } from "@/lib/config/site-config";

export const metadata: Metadata = {
  title: "Shipping, Cancellation & Refund Policy",
  alternates: { canonical: "/shipping-cancellation-refund" },
};

export default function ShippingPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Shipping, Cancellation & Refund Policy"
        description="Last updated: [add date before publishing]"
      />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl space-y-8 text-sm leading-relaxed text-charcoal/85">
          <LegalNotice />

          <div>
            <h2 className="font-serif text-xl font-medium text-olive">Shipping</h2>
            <p className="mt-2">
              Wildflower Mail currently ships to addresses within the United States only. Orders
              placed before the monthly cutoff ({operations.orderCutoffDay}) are included in that
              month's mailing, sent {operations.mailingDay}. Expected domestic delivery is{" "}
              {operations.domesticDeliveryWindow} after mailing. These dates may be adjusted
              periodically and the most current schedule is shown on the How It Works page.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-olive">Address changes</h2>
            <p className="mt-2">
              Shipping address changes can be made from your account page up until{" "}
              {operations.addressChangeDeadline}. We cannot guarantee that changes requested
              after this point will be reflected in that month's mailing.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-olive">Cancellation</h2>
            <p className="mt-2">
              Monthly memberships can be canceled at any time from your account page.
              Cancellations made {operations.cancellationDeadline} will take effect before the
              next billing cycle. Gift subscriptions (three- or six-month) are one-time purchases
              with nothing to cancel — they conclude automatically after the final edition.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-olive">Refunds</h2>
            <p className="mt-2">
              [Placeholder — refund eligibility for physical, personalized mail should be defined
              with legal guidance before launch. Consider addressing: lost or damaged mail,
              duplicate charges, and how far in advance of an already-mailed edition a refund can
              be requested.]
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-olive">Lost or damaged mail</h2>
            <p className="mt-2">
              If your edition does not arrive within the expected delivery window, or arrives
              damaged, please contact us at {brand.supportEmail} and we will do our best to make
              it right on a case-by-case basis.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
