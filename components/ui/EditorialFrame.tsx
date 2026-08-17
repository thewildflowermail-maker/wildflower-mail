import { cn } from "@/lib/utils/format";

/**
 * Wraps a photography placeholder (or, later, a real <Image>) in an
 * editorial-feeling frame: soft layered shadow, a slight rotation, and a
 * hairline border — so imagery reads like a printed photo tucked into a
 * scrapbook rather than a flat product-grid tile.
 */
export function EditorialFrame({
  children,
  rotate = "none",
  className,
}: {
  children: React.ReactNode;
  rotate?: "none" | "left" | "right";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "zoom-on-hover relative rounded-sm bg-paper p-2 shadow-[0_30px_60px_-30px_rgba(47,58,42,0.35)]",
        rotate === "left" && "-rotate-2",
        rotate === "right" && "rotate-2",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * A guaranteed-legible backing for any caption/label text that needs to sit
 * directly on top of a heavily textured surface — a photo, TornPaperBacking,
 * WashiTape, or any other illustration whose fill color can't be trusted to
 * give 4.5:1 contrast on its own (WCAG AA, normal text).
 *
 * `tone="light"` (default) is near-opaque paper behind dark text — use over
 * busy/dark imagery. `tone="dark"` is near-opaque charcoal behind light
 * text — use over pale/washed-out imagery. Both stay well above 4.5:1
 * against the site's own `text-charcoal` / `text-ivory`.
 */
export function TextScrim({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-sm px-2.5 py-1 font-sans",
        tone === "light" ? "bg-paper/92 text-charcoal" : "bg-charcoal/88 text-ivory",
        className
      )}
    >
      {children}
    </span>
  );
}
