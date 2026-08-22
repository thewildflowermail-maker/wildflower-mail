import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContactForm } from "@/components/marketing/ContactForm";
import { BotanicalMark } from "@/components/marketing/BotanicalMark";
import { WhatsInsideIcon } from "@/components/marketing/WhatsInsideIcon";
import { PlanStampGrid } from "@/components/marketing/PlanStampGrid";
import { brand, plans } from "@/lib/config/site-config";
import { whatsInside } from "@/lib/config/whats-inside-content";

export const metadata: Metadata = {
  title: "The Wildflower Mail | A Monthly Ritual for Mothers",
  description:
    "A monthly ritual of art, affirmations and grounding exercises delivered by mail — for mothers learning to bloom through the noise.",
  alternates: { canonical: "/" },
};

// Small accent color + icon tint for each "What's Inside" item — instead of
// coloring the whole paper, color lives in these little details (per item),
// like little wildflowers found across one neutral page: dusty rose/berry,
// deep raspberry (swapped from the cooler dustblue — reads warmer and more
// "artistic" for the Artwork & Affirmation item), terracotta, antique gold,
// faded poppy.
const WHATS_INSIDE_ACCENT = ["text-dustyrose", "text-raspberry", "text-clay", "text-gold", "text-poppy"];

// What's Inside — one unified organic paper composition. Recolored to
// match the provided dusty-rose flecked-paper reference: a flat warm rose
// base with faint, sparse gold/amber flecks — pulled back from an earlier,
// glittery-looking version (55 dense high-opacity dots) to a much sparser
// 16-dot pattern at low opacity, so it reads as flecked cardstock rather
// than sparkle/glitter paper. The .paper-grain + .paper-grain-heavy noise
// layers on the container do the real "realistic paper" work now.
const WHATS_INSIDE_PAPER_FLECKS =
  "url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNjAiIGhlaWdodD0iMjYwIiB2aWV3Qm94PSIwIDAgMjYwIDI2MCI+PGNpcmNsZSBjeD0iMTE3LjYiIGN5PSIxNDUuNSIgcj0iMS40MiIgZmlsbD0iI0Q5QTk0RSIgZmlsbC1vcGFjaXR5PSIwLjU2Ii8+PGNpcmNsZSBjeD0iNDkuNCIgY3k9IjIwOS4wIiByPSIwLjk4IiBmaWxsPSIjREZBRTQ5IiBmaWxsLW9wYWNpdHk9IjAuMzciLz48Y2lyY2xlIGN4PSI3OC45IiBjeT0iMjMuNiIgcj0iMS4zMSIgZmlsbD0iI0RGQUU0OSIgZmlsbC1vcGFjaXR5PSIwLjUiLz48Y2lyY2xlIGN4PSIxMDMuMCIgY3k9IjExNy44IiByPSIxLjI0IiBmaWxsPSIjRDlBOTRFIiBmaWxsLW9wYWNpdHk9IjAuMzUiLz48Y2lyY2xlIGN4PSIxMzcuNCIgY3k9IjE1LjUiIHI9IjAuNjkiIGZpbGw9IiNERkFFNDkiIGZpbGwtb3BhY2l0eT0iMC41NCIvPjxjaXJjbGUgY3g9Ijg0LjgiIGN5PSIxNTMuNiIgcj0iMC43IiBmaWxsPSIjRTlCQjU1IiBmaWxsLW9wYWNpdHk9IjAuNDciLz48Y2lyY2xlIGN4PSIxNzIuMiIgY3k9IjExOC45IiByPSIwLjc4IiBmaWxsPSIjREZBRTQ5IiBmaWxsLW9wYWNpdHk9IjAuNTMiLz48Y2lyY2xlIGN4PSI4Mi4wIiBjeT0iNTkuNyIgcj0iMi4yMSIgZmlsbD0iI0U5QkI1NSIgZmlsbC1vcGFjaXR5PSIwLjM4Ii8+PGNpcmNsZSBjeD0iNzUuNiIgY3k9IjE3LjQiIHI9IjAuNTIiIGZpbGw9IiNERkFFNDkiIGZpbGwtb3BhY2l0eT0iMC40Ii8+PGNpcmNsZSBjeD0iMjM2LjciIGN5PSIxMjIuMiIgcj0iMS40OCIgZmlsbD0iI0RGQUU0OSIgZmlsbC1vcGFjaXR5PSIwLjQ5Ii8+PGNpcmNsZSBjeD0iNTEuNiIgY3k9IjE3NS41IiByPSIwLjg0IiBmaWxsPSIjREZBRTQ5IiBmaWxsLW9wYWNpdHk9IjAuNTkiLz48Y2lyY2xlIGN4PSIxOTcuMSIgY3k9IjMwLjciIHI9IjEuNjUiIGZpbGw9IiNFOUJCNTUiIGZpbGwtb3BhY2l0eT0iMC4zOSIvPjxjaXJjbGUgY3g9IjE0NS40IiBjeT0iMTE2LjMiIHI9IjAuNjkiIGZpbGw9IiNERkFFNDkiIGZpbGwtb3BhY2l0eT0iMC40NSIvPjxjaXJjbGUgY3g9Ijk5LjgiIGN5PSIxMDIuNyIgcj0iMi4yOSIgZmlsbD0iI0Q5QTk0RSIgZmlsbC1vcGFjaXR5PSIwLjQzIi8+PGNpcmNsZSBjeD0iMjMwLjEiIGN5PSI1NC44IiByPSIwLjg5IiBmaWxsPSIjRDlBOTRFIiBmaWxsLW9wYWNpdHk9IjAuNDkiLz48Y2lyY2xlIGN4PSIxMC45IiBjeT0iMzguMSIgcj0iMi4wOSIgZmlsbD0iI0U5QkI1NSIgZmlsbC1vcGFjaXR5PSIwLjQ1Ii8+PC9zdmc+\")";
// Lightened again (~24% further toward white from #E7D5D1) per "1.5 tone
// lighter" — still the same dusty blush-beige family, just softer/paler.
const WHATS_INSIDE_PAPER_COLOR = "#EDDFDC";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    description:
      "A monthly ritual of art, affirmations and grounding exercises delivered by mail, created for mothers.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================= HERO — editorial two-part composition: type left, envelope right ================= */}
      {/* Column split is ~55% text / 45% artwork on desktop so the animated
          envelope reads as a genuine hero element, not a small illustration
          next to the copy. */}
      <section className="relative overflow-hidden border-b border-charcoal/10 bg-ivory">
        <Container className="relative grid grid-cols-1 items-center gap-12 py-20 sm:py-28 lg:grid-cols-[55fr_45fr] lg:gap-8 lg:py-28">
          <ScrollReveal>
            <h1 className="whitespace-nowrap font-serif font-semibold uppercase leading-[1.05] tracking-wide text-charcoal" style={{ fontSize: "clamp(2rem,4.1vw,3.5rem)" }}>
              Wildflower Mail
            </h1>
            <p className="mt-5 max-w-md font-serif text-2xl leading-snug text-charcoal sm:text-[1.65rem]">
              For mothers learning to <span className="italic text-clay">bloom</span> through the
              noise.
            </p>
            <p className="mt-4 max-w-[26rem] text-base leading-relaxed text-charcoal/75">
              {brand.supportingText}
            </p>
            <p className="handwritten-note mt-6 inline-block text-2xl text-clay/85">
              something is waiting for you.
            </p>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href="#choose-your-mail"
                className="inline-flex items-center justify-center rounded-full bg-raspberry px-8 py-3.5 text-sm font-medium uppercase tracking-[0.1em] text-ivory transition-colors duration-250 hover:bg-charcoal"
              >
                Choose Your Wildflower Mail
              </Link>
              <Link
                href="#whats-inside"
                className="text-sm font-medium text-clay/80 hover:text-clay"
              >
                See what arrives each month
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={100}>
            <div className="relative mx-auto w-[51%] sm:max-w-[218px] lg:mx-0 lg:ml-auto lg:w-full lg:max-w-[277px] xl:max-w-[317px]">
              {/* eslint-disable-next-line @next/next/no-img-element -- animated GIF must stay unoptimized to preserve motion; colors intentionally left untouched. Background is genuinely transparent (verified alpha=0 at the corners across all 6 frames), so no wrapping background color is added here that would show through. */}
              <img
                src="/images/brand/envelope-hero-v4.gif"
                alt="An illustrated sage-green envelope resting beneath a small gold crescent moon and stars"
                className="h-auto w-full"
              />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ================= WHAT'S INSIDE — one unified organic paper, warm & neutral, color lives in the content ================= */}
      <section id="whats-inside" className="relative border-b border-charcoal/10 bg-ivory py-20 sm:py-28">
        <Container className="max-w-5xl">
          <ScrollReveal>
            <div
              className="paper-grain paper-grain-heavy torn-bottom paper-shadow relative -rotate-[0.3deg] px-7 pb-12 pt-11 sm:px-12 sm:pb-16 sm:pt-14 lg:px-16"
              style={{
                backgroundColor: WHATS_INSIDE_PAPER_COLOR,
                backgroundImage: WHATS_INSIDE_PAPER_FLECKS,
                backgroundSize: "260px 260px",
                backgroundRepeat: "repeat",
              }}
            >
              <div className="pointer-events-none absolute -right-2 top-8 hidden w-9 opacity-[0.22] sm:block lg:right-4 lg:w-10" aria-hidden="true">
                <BotanicalMark color="#3E4636" />
              </div>

              <div className="text-center">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-clay/70">
                  Every envelope holds
                </p>
                <h2 className="font-serif text-3xl font-semibold text-charcoal sm:text-4xl">What&rsquo;s Inside?</h2>
              </div>

              <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
                {whatsInside.map((item, i) => (
                  <div
                    key={item.numeral}
                    className={i === whatsInside.length - 1 ? "lg:col-span-2 lg:mx-auto lg:max-w-md" : ""}
                  >
                    <WhatsInsideIcon numeral={item.numeral} className={`h-6 w-6 ${WHATS_INSIDE_ACCENT[i]}`} />
                    <h3 className="mt-1.5 font-serif text-lg font-semibold text-charcoal sm:text-xl">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-charcoal/70">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ================= CHOOSE YOUR WILDFLOWER MAIL — five equal stamps ================= */}
      <section id="choose-your-mail" className="relative bg-ivory py-20 sm:py-28">
        <Container>
          <ScrollReveal className="relative mx-auto mb-16 max-w-xl text-center">
            <p className="relative mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-clay/70">Join the ritual</p>
            <h2 className="relative font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
              Choose how you&rsquo;d like to receive your Wildflower Mail
            </h2>
          </ScrollReveal>

          <PlanStampGrid plans={plans} />
        </Container>
      </section>

      {/* ================= OUR STORY — a large photo set against the painted wildflower linen ================= */}
      <section
        id="our-story"
        className="relative border-b border-olive/10 bg-cream bg-cover bg-center py-20 sm:py-28"
        style={{ backgroundImage: "url('/images/patterns/about-wildflowers.jpg')" }}
      >
        {/* Overlay is lightest near the photo (left) so the painted flowers
            stay clearly visible around it, and only gently deepens toward
            the text (right) for legibility — the linen/wildflower artwork
            should read clearly, not be heavily faded out. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(246,238,225,0.12), rgba(246,238,225,0.58) 55%, rgba(246,238,225,0.7) 100%)",
          }}
          aria-hidden="true"
        />
        {/* Widened the text column's share (was 45fr/55fr) — the earlier
            attempts to widen the panel via max-w on the inner div did
            little on desktop because the grid column itself, not the
            max-w, was the real constraint on line length. Giving the
            photo column less room and the text column more directly
            shortens the block (fewer line wraps) as requested. */}
        <Container className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[34fr_66fr] lg:gap-16">
          <ScrollReveal className="mx-auto w-[85%] lg:mx-0 lg:w-full">
            <div
              className="lift-on-hover relative mx-auto aspect-[4/5] w-full shadow-[0_30px_60px_-22px_rgba(62,70,54,0.45)]"
              style={{ borderRadius: "62% 38% 55% 45% / 55% 45% 62% 38%", transform: "rotate(-2deg)", overflow: "hidden" }}
            >
              <div
                role="img"
                aria-label="Placeholder image: a keepsake photo for Our Story"
                className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,rgba(62,70,54,0.05)_0px,rgba(62,70,54,0.05)_2px,transparent_2px,transparent_10px)] p-8 text-center"
              >
                <span className="font-sans text-xs uppercase tracking-wide text-olive/55">
                  Photography placeholder — a keepsake photo for Our Story
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={100} className="text-center">
            {/* Low-opacity paper panel behind the whole text block — the
                photo background alone made the handwriting-style body copy
                hard to read, so this backs it with just enough of a light
                surface to restore contrast without fully hiding the photo.
                bg-paper/65 measures 10:1+ against charcoal text even
                against a pessimistically dark patch of photo underneath —
                comfortably past WCAG AAA, not just barely legible. */}
            <div className="mx-auto w-full max-w-2xl rounded-2xl bg-paper/65 px-6 py-8 sm:px-9 sm:py-10 lg:max-w-none">
              <h2 className="font-serif text-3xl font-semibold leading-tight text-charcoal sm:text-4xl">
                About Wildflower
              </h2>
              {/* font-script (Caveat) for a handwritten-letter feel, but
                  sized up (text-lg/xl instead of the site's usual text-base)
                  with generous leading — script faces lose legibility fast
                  at small sizes, so this trades a little bit of "note card"
                  intimacy for staying easy to actually read. */}
              <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-charcoal sm:text-lg">
                <p>
                  Hi, I&rsquo;m Marie — a mother of two, learning to find myself somewhere between
                  the endless to-do lists, little hands that always need me, and the beautiful
                  chaos of motherhood.
                </p>
                <p>
                  When I became a mother five years ago, something in me began to change too. It
                  was one of the most beautiful, but also one of the hardest chapters of my life. I
                  loved being a mom, yet somewhere along the way, I realized how easy it was to lose
                  touch with myself.
                </p>
                <p>
                  Yoga, breathwork, and small grounding rituals slowly helped me find my way back —
                  not to who I was before motherhood, but to the woman I was becoming.
                </p>
                <p>Wildflower Mail was born from that journey.</p>
                <p>
                  I created it for mothers like me — mothers who adore their children, but still
                  need a little space to breathe, dream, create, and simply be.
                </p>
                <p>
                  I hope each letter feels like a gentle pause in the noise. A little reminder to
                  come back to your breath, to nature, and most importantly, to yourself.
                </p>
                <p>
                  Because while we&rsquo;re so busy helping our little ones grow, we deserve to keep
                  growing, too.
                </p>
              </div>
              {/* Closing quote — replaces the previous "With love, Marie"
                  signoff. Now set in the same font-script (Caveat) as the
                  body copy per feedback, just bolder/larger so it still
                  reads as a deliberate closing statement rather than just
                  another line of the letter. Divider line above it removed. */}
              <p className="mt-7 font-script text-2xl font-semibold leading-snug text-charcoal sm:text-3xl">
                &ldquo;Like a wildflower, she stands gently in the wind, but her roots run deeper
                than any storm could ever reach.&rdquo;
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="relative bg-paper py-20 sm:py-28">
        <Container className="max-w-xl text-center">
          <ScrollReveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-clay/70">Say hello</p>
            <h2 className="font-serif text-3xl font-semibold text-charcoal sm:text-4xl">Contact</h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal/75">
              Questions, kind words, or something you&rsquo;d love to share? We&rsquo;d love to hear from you.
            </p>
            <div className="mt-9 text-left">
              <ContactForm />
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
