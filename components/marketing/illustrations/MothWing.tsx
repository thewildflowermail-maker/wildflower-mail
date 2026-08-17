import { cn } from "@/lib/utils/format";

/**
 * A single translucent moth/butterfly wing, veined like the reference mood
 * board — a small floating "discovery" rather than a literal insect. Used
 * once or twice on the page, never as a repeating pattern, so it keeps its
 * sense of surprise.
 *
 * The SVG is wrapped in a container that pins its aspect ratio (matching
 * the 160:200 viewBox) and caps its width via `maxWidth`, so dropping this
 * into a wide flex/grid cell can never stretch it to an oversized or
 * distorted scale — `className` is layered on top for positioning/opacity
 * only and never fights the sizing classes.
 */
export function MothWing({
  className,
  flip = false,
  maxWidth = "max-w-xs",
}: {
  className?: string;
  flip?: boolean;
  maxWidth?: string;
}) {
  return (
    <div className={cn("aspect-[160/200] w-full", maxWidth, className)}>
      <svg
        viewBox="0 0 160 200"
        className={cn("h-full w-full", flip && "-scale-x-100")}
        role="presentation"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M20 40 C10 90 20 150 60 190 C70 150 66 120 78 100 C90 120 100 150 116 188 C148 150 150 90 130 36 C104 8 96 30 80 54 C64 30 46 8 20 40 Z"
          fill="#EDE3D3"
          opacity="0.55"
        />
        <g stroke="#3E4636" strokeOpacity="0.22" strokeWidth="1" fill="none">
          <path d="M80 54 L80 150" />
          <path d="M80 70 C60 78 40 90 26 96" />
          <path d="M80 90 C58 100 42 112 30 122" />
          <path d="M80 110 C64 122 52 136 44 150" />
          <path d="M80 70 C100 78 118 90 132 96" />
          <path d="M80 90 C100 100 116 112 128 122" />
          <path d="M80 110 C96 122 108 136 116 150" />
        </g>
        <path d="M78 100 C90 120 100 150 116 188" stroke="#B9785E" strokeOpacity="0.4" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}
