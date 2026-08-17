import Link from "next/link";
import { cn } from "@/lib/utils/format";

/**
 * The Wildflower Mail wordmark — uses the client's actual supplied logo
 * illustration (a botanical "W" mark: flower, two figures, leaves) as the
 * icon mark, paired with a thin vertical divider and the real
 * "WILDFLOWER / MAIL" wordmark set in the site's own serif so it stays
 * crisp and legible at any size. This intentionally does NOT recreate the
 * mark as a redrawn SVG — the flower artwork itself is the supplied image,
 * processed into two pre-recolored transparent PNGs (dark olive + ivory)
 * so it stays legible on both light and dark section backgrounds. `tone`
 * picks both the wordmark text color AND which icon file is used — on the
 * dark aubergine footer, the plain dark-olive icon would nearly disappear,
 * so `tone="ivory"` swaps in the light-colored icon file, not just the text.
 * The wordmark itself is set in font-serif (Fraunces) — the same face as
 * the hero's big "Wildflower Mail" title — per feedback that the earlier
 * Cormorant Garamond italic swap didn't land. Unlike the hero title it's
 * NOT uppercase, just title case, so it still reads as a compact logotype
 * rather than a shouty headline. Stacked onto two lines ("Wildflower" over
 * "Mail") at a smaller size, per feedback that a single wide line was
 * still reading too big/long next to the mark.
 */
export function Logo({ className, tone = "olive" }: { className?: string; tone?: "olive" | "ivory" }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label="The Wildflower Mail, home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- brand mark, fixed intrinsic size, not a content photo */}
      <img
        src={tone === "ivory" ? "/images/brand/logo-mark-ivory.png" : "/images/brand/logo-mark.png"}
        alt=""
        aria-hidden="true"
        className="h-9 w-auto shrink-0 sm:h-10"
      />
      <span
        className={cn("h-7 w-px shrink-0", tone === "olive" ? "bg-clay/40" : "bg-ivory/30")}
        aria-hidden="true"
      />
      {/* Wordmark set in font-serif (Fraunces) — matching the hero's
          "Wildflower Mail" title font exactly, just not uppercase, so the
          header logotype and the hero headline feel like the same brand
          voice instead of two different typefaces. Stacked two-line
          layout ("Wildflower" / "Mail") at a smaller size, per feedback. */}
      <span
        className={cn(
          "flex flex-col font-serif text-[12px] font-semibold leading-[1.15] tracking-wide sm:text-[13px]",
          tone === "olive" ? "text-charcoal" : "text-ivory"
        )}
      >
        <span>Wildflower</span>
        <span>Mail</span>
      </span>
    </Link>
  );
}
