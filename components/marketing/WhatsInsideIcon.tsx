import { cn } from "@/lib/utils/format";

/**
 * Five minimal line icons for the quick "what you receive" summary row
 * under the hero — one per What's Inside item (matched by roman numeral).
 * Intentionally spare single-stroke line art, matching the restrained
 * editorial mood of the rest of the site. The full explanations live in
 * the What's Inside section below; this row is just a glance.
 */
export function WhatsInsideIcon({ numeral, className }: { numeral: string; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: cn("shrink-0", className),
    "aria-hidden": true,
  };

  switch (numeral) {
    case "I": // Heart-to-Heart Letter — envelope with a small heart
      return (
        <svg {...common}>
          <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
          <path d="M3 6.5l9 6.5 9-6.5" />
          <path d="M12 9.3c-.9-1-2.6-.8-2.6.6 0 1.1 1.3 1.9 2.6 2.9 1.3-1 2.6-1.8 2.6-2.9 0-1.4-1.7-1.6-2.6-.6z" />
        </svg>
      );
    case "II": // Hand-Drawn Artwork & Affirmation — framed flower
      return (
        <svg {...common}>
          <rect x="5" y="3.5" width="14" height="17" rx="1" />
          <circle cx="12" cy="10.5" r="1.3" />
          <path d="M12 9.2c0-1.4-1.2-2.3-2.2-1.5-.8.7-.2 2 1 2.5M12 9.2c0-1.4 1.2-2.3 2.2-1.5.8.7.2 2-1 2.5M12 11.8c0 1.4-1.2 2.3-2.2 1.5-.8-.7-.2-2 1-2.5M12 11.8c0 1.4 1.2 2.3 2.2 1.5.8-.7.2-2-1-2.5" />
          <path d="M12 14v3" />
        </svg>
      );
    case "III": // Goal & Intention Board — checklist
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="17" rx="1.5" />
          <path d="M9 3v2.4M15 3v2.4" />
          <path d="M8 10.5l1 1 2-2.2M12.5 10.5h4M8 15l1 1 2-2.2M12.5 15h4" />
        </svg>
      );
    case "IV": // Curated Audio Companion — music note
      return (
        <svg {...common}>
          <path d="M9 17V6.5l9-2v10.5" />
          <circle cx="7" cy="17.5" r="2.3" />
          <circle cx="16" cy="14.5" r="2.3" />
        </svg>
      );
    case "V": // Monthly Surprise Card — small sprig
    default:
      return (
        <svg {...common}>
          <path d="M12 20V8" />
          <path d="M12 13c-2-.4-3.4-1.6-4-3.6 2.1-.3 3.7.5 4 2.4" />
          <path d="M12 15.5c2-.3 3.4-1.4 4-3.3-2.1-.4-3.7.4-4 2.3" />
          <path d="M12 8c-.6-1.7-.4-3 .6-4.4 1.2 1.2 1.5 2.8.4 4.4" />
        </svg>
      );
  }
}
