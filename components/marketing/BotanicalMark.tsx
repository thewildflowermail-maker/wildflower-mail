import { cn } from "@/lib/utils/format";

/**
 * The Wildflower Mail's recurring brand motif — a single-line botanical
 * sprig with a closed bud and a small floating dot, inspired by the
 * provided logo reference and echoed in the wax seal on the hero envelope.
 * This is the ONE recognizable mark used sparingly across the site (footer,
 * one stamp, the printed insert) — never as a repeating pattern.
 */
export function BotanicalMark({ className, color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 60 82"
      className={cn("h-auto w-full", className)}
      role="presentation"
      aria-hidden="true"
      fill="none"
    >
      <circle cx="20" cy="20" r="1.8" fill={color} />
      <path
        d="M27 76C25 62 27 50 30 40C32 33 33 27 32 20"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M29 46C22 44 16 46 11 52C18 54 24 52 29 46Z"
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M31 34C38 30 44 31 49 36C42 39 36 39 31 34Z"
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M32 21C29 14 30 8 35 3C39 8 39 15 34 21C33.4 20 32.6 20 32 21Z"
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M33 12C35 10 37 10 39 11" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
