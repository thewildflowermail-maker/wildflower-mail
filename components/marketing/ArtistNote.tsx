/**
 * A short, handwritten-feeling reflection from the person behind Wildflower
 * Mail, meant to sit directly alongside product/plan options rather than
 * buried on a separate About page — a small "studio note" moment that
 * reinforces this is made by hand, by someone, not mass-produced. Server
 * component (no interactivity), so it costs nothing to render inline
 * wherever it's used.
 */
export function ArtistNote({
  quote,
  attribution = "Marie, founder",
  className,
}: {
  quote: string;
  attribution?: string;
  className?: string;
}) {
  return (
    <aside
      className={
        "deckled-soft paper-grain paper-shadow relative mx-auto max-w-sm -rotate-1 bg-oatmeal px-6 py-5 text-center " +
        (className ?? "")
      }
    >
      <p className="handwritten-note relative text-xl leading-snug text-clay/90 sm:text-2xl">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="relative mt-3 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-muted-aaa">
        — {attribution}
      </p>
    </aside>
  );
}
