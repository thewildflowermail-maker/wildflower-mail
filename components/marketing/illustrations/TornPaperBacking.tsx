import { cn } from "@/lib/utils/format";

/**
 * An organic, torn-kraft-paper backing shape (loosely traced from the
 * pressed-flower cards in the mood board) to sit behind a badge, label, or
 * small illustration so it reads as a paper cutout rather than a flat
 * rectangle.
 *
 * Accessibility note: the default kraft tone (and most brand accent colors
 * passed via `color`) are mid-tone, so they do NOT reliably give 4.5:1
 * contrast against either dark or light text on their own. If you're
 * placing text directly over this shape (rather than over a solid card
 * that merely sits near it), wrap that text in `<TextScrim>` from
 * `@/components/ui/EditorialFrame` first — don't set text color straight
 * against this fill.
 */
export function TornPaperBacking({ className, color = "#D9C7A3" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 220 220" className={cn("h-full w-full", className)} role="presentation" aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M40 8 C60 2 80 14 100 6 C124 -2 146 10 168 20 C196 32 214 54 208 82
           C216 100 220 122 206 140 C214 158 204 178 182 184 C168 202 142 210 118 200
           C96 214 66 210 50 192 C24 194 4 174 8 148 C-6 128 2 100 18 84
           C6 66 14 40 40 8 Z"
        fill={color}
      />
    </svg>
  );
}
