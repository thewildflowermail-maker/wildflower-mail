import { cn } from "@/lib/utils/format";

const patterns = {
  stripe: (color: string) => (
    <pattern id="washi-stripe" width="10" height="10" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <rect width="5" height="10" fill={color} opacity="0.55" />
    </pattern>
  ),
  dot: (color: string) => (
    <pattern id="washi-dot" width="14" height="14" patternUnits="userSpaceOnUse">
      <circle cx="7" cy="7" r="2" fill={color} opacity="0.6" />
    </pattern>
  ),
};

/**
 * A small strip of decorative washi tape, meant to sit half-on/half-off a
 * photo frame corner like a real scrapbook page — a tiny, tactile detail
 * that keeps the site feeling handmade rather than templated.
 *
 * Purely decorative (aria-hidden) — never place body text directly on top
 * of the tape itself. If a caption needs to sit near it, put the caption on
 * its own solid card (see `TextScrim` in `@/components/ui/EditorialFrame`)
 * rather than layered straight over the pattern fill, since the tape's
 * mid-tone colors don't guarantee 4.5:1 contrast for any given text color.
 */
export function WashiTape({
  className,
  variant = "stripe",
  color = "#C9A39A",
  rotate = -8,
}: {
  className?: string;
  variant?: "stripe" | "dot";
  color?: string;
  rotate?: number;
}) {
  // Derive the pattern id from its actual inputs instead of a hardcoded
  // "washi-stripe" / "washi-dot" string — multiple <WashiTape> instances on
  // the same page previously shared one global SVG pattern id, so only the
  // first instance's color would render for every other instance.
  const patternId = `washi-${variant}-${color.replace("#", "")}`;
  return (
    <svg
      viewBox="0 0 120 40"
      className={cn("w-full h-auto drop-shadow-sm", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
      role="presentation"
      aria-hidden="true"
    >
      <defs>{patterns[variant](color)}</defs>
      <rect width="120" height="40" fill={color} opacity="0.28" />
      <rect width="120" height="40" fill={`url(#${patternId})`} />
    </svg>
  );
}
