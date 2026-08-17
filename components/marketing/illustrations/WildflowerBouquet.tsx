import { cn } from "@/lib/utils/format";

/**
 * A small, colorful, flat-illustration wildflower bouquet — poppy, bluebell,
 * a cream anemone, and a mustard bloom, the way pressed garden flowers
 * might look tucked into a letter. This is the "life and color" counterpart
 * to the more muted botanical line art used elsewhere; use it where the
 * brand should feel warm and a little wild rather than quiet.
 *
 * Wrapped in a container pinned to the 220:240 viewBox aspect ratio with a
 * `maxWidth` cap (defaults to `max-w-sm`, since this is the largest/most
 * detailed of the three illustrations) so it scales down gracefully on
 * small screens without ever growing past a sensible size in a wide layout.
 */
export function WildflowerBouquet({
  className,
  maxWidth = "max-w-sm",
}: {
  className?: string;
  maxWidth?: string;
}) {
  return (
    <div className={cn("aspect-[220/240] w-full", maxWidth, className)}>
      <svg viewBox="0 0 220 240" className="h-full w-full" role="presentation" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {/* stems */}
      <path d="M110 230 C108 190 112 160 110 130" stroke="#6B7A52" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M110 150 C100 140 88 132 76 118" stroke="#6B7A52" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M112 145 C124 133 132 122 140 104" stroke="#6B7A52" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M108 170 C96 165 84 165 70 172" stroke="#6B7A52" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M113 168 C126 164 138 166 150 176" stroke="#6B7A52" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* leaves */}
      <path d="M104 200 C88 196 80 206 78 220" fill="#7C8C61" />
      <path d="M116 205 C132 200 140 210 143 222" fill="#8E9C6E" />

      {/* bluebell cluster (top left) */}
      <g transform="translate(76 100)">
        <ellipse rx="7" ry="11" fill="#7C8FC4" transform="rotate(-18)" />
        <ellipse rx="6" ry="10" fill="#93A4D2" transform="translate(10 14) rotate(-8)" />
        <ellipse rx="5.5" ry="9" fill="#6779B0" transform="translate(-8 16) rotate(-30)" />
      </g>

      {/* poppy (top right) */}
      <g transform="translate(140 96)">
        <circle r="16" fill="#C4472F" />
        <path d="M0 0 C6 -14 -6 -14 0 -22" stroke="#8B3A2F" strokeWidth="0" fill="none" />
        <ellipse rx="9" ry="13" fill="#D8583A" transform="rotate(20) translate(0 -8)" />
        <ellipse rx="9" ry="13" fill="#C4472F" transform="rotate(150) translate(0 -8)" />
        <ellipse rx="9" ry="13" fill="#B03A24" transform="rotate(270) translate(0 -8)" />
        <circle r="4.5" fill="#3E2A1A" />
      </g>

      {/* cream anemone (center, focal bloom) */}
      <g transform="translate(108 150)">
        <g fill="#FBF7EE" stroke="#EADFC8" strokeWidth="0.6">
          <ellipse rx="13" ry="18" transform="rotate(0) translate(0 -14)" />
          <ellipse rx="13" ry="18" transform="rotate(51) translate(0 -14)" />
          <ellipse rx="13" ry="18" transform="rotate(102) translate(0 -14)" />
          <ellipse rx="13" ry="18" transform="rotate(153) translate(0 -14)" />
          <ellipse rx="13" ry="18" transform="rotate(204) translate(0 -14)" />
          <ellipse rx="13" ry="18" transform="rotate(255) translate(0 -14)" />
          <ellipse rx="13" ry="18" transform="rotate(306) translate(0 -14)" />
        </g>
        <circle r="8" fill="#B8935A" />
        <circle r="8" fill="#B8935A" />
        <circle r="4.5" fill="#3E2A1A" opacity="0.85" />
      </g>

      {/* mustard bloom (bottom left) */}
      <g transform="translate(70 178)">
        <g fill="#D9A441">
          <ellipse rx="9" ry="14" transform="rotate(0) translate(0 -10)" />
          <ellipse rx="9" ry="14" transform="rotate(72) translate(0 -10)" />
          <ellipse rx="9" ry="14" transform="rotate(144) translate(0 -10)" />
          <ellipse rx="9" ry="14" transform="rotate(216) translate(0 -10)" />
          <ellipse rx="9" ry="14" transform="rotate(288) translate(0 -10)" />
        </g>
        <circle r="6" fill="#8B3A2F" opacity="0.8" />
      </g>

      {/* dusty rose mum (bottom right) */}
      <g transform="translate(150 182)">
        <g fill="#C9A39A">
          <ellipse rx="6" ry="10" transform="rotate(0) translate(0 -7)" />
          <ellipse rx="6" ry="10" transform="rotate(45) translate(0 -7)" />
          <ellipse rx="6" ry="10" transform="rotate(90) translate(0 -7)" />
          <ellipse rx="6" ry="10" transform="rotate(135) translate(0 -7)" />
          <ellipse rx="6" ry="10" transform="rotate(180) translate(0 -7)" />
          <ellipse rx="6" ry="10" transform="rotate(225) translate(0 -7)" />
          <ellipse rx="6" ry="10" transform="rotate(270) translate(0 -7)" />
          <ellipse rx="6" ry="10" transform="rotate(315) translate(0 -7)" />
        </g>
        <circle r="5" fill="#B9785E" />
      </g>
      </svg>
    </div>
  );
}
