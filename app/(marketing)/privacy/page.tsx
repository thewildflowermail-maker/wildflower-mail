import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { LegalNotice } from "@/components/marketing/LegalNotice";
import { brand } from "@/lib/config/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" description="Last updated: [add date before publishing]" />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl space-y-8 text-sm leading-relaxed text-charcoal/85">
          <LegalNotice />

          <div>
            <h2 className="font-serif text-xl font-medium text-olive">Information we collect</h2>
            <p className="mt-2">
              When you place an order, join the Wildflower Club, or send a gift, we collect
              information such as your name, email address, shipping address, and — for gifts —
              the recipient's name and shipping address. Payment details are collected and
              processed directly by Stripe; Wildflower Mail does not store full card numbers on
              its own servers.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-olive">How we use information</h2>
            <p className="mt-2">
              We use this information to fulfill orders, mail physical editions, send
              transactional emails (such as order and shipping confirmations), and provide
              customer support. We only send marketing emails (Wildflower Notes) to people who
              have separately opted in — placing an order does not automatically enroll you in
              marketing email.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-olive">Sharing of information</h2>
            <p className="mt-2">
              We share information with service providers strictly as needed to operate
              Wildflower Mail — for example, Stripe (payments), Supabase (data storage), and
              Resend (transactional email). We do not sell personal information.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-olive">Your choices</h2>
            <p className="mt-2">
              You can update your shipping address and cancel a monthly membership from your
              account page, unsubscribe from Wildflower Notes at any time via the link in any
              marketing email, and contact us at {brand.supportEmail} with any privacy questions
              or requests.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-olive">Cookies</h2>
            <p className="mt-2">
              [Placeholder — describe analytics/advertising cookies once Google Analytics 4
              and/or Meta Pixel are enabled, and add a cookie consent banner if required in your
              jurisdiction.]
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-olive">Contact</h2>
            <p className="mt-2">Questions about this policy can be sent to {brand.supportEmail}.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
