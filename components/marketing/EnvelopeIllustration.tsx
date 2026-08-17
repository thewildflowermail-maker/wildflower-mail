import { cn } from "@/lib/utils/format";

/**
 * The Wildflower Mail signature mark: an ivory envelope, letter peeking out
 * with a deckled edge, a wax-style seal, a linen ribbon, a small botanical
 * postage stamp, and a little bouquet spilling out of the opening. This is
 * the recurring visual motif of the brand — it should appear consistently
 * enough (hero, section dividers, favicon-scale marks) that a cropped
 * screenshot is recognizable without the wordmark. Set spillingFlowers to
 * false for smaller/quieter placements (e.g. a favicon-scale mark).
 *
 * Deliberately built as inline vector art rather than a photo placeholder:
 * unlike the lifestyle photography (still TODO — see ImagePlaceholder),
 * this illustration IS meant to ship as the final asset.
 */
export function EnvelopeIllustration({ className, spillingFlowers = true }: { className?: string; spillingFlowers?: boolean }) {
  return (
    <svg
      viewBox="0 0 400 440"
      className={cn("w-full h-auto", className)}
      role="img"
      aria-label="An illustrated ivory envelope with a wax seal, botanical postage stamp, and a handwritten letter, with a small colorful bouquet spilling out of the opening"
    >
      {/* soft ground shadow */}
      <ellipse cx="204" cy="392" rx="150" ry="18" fill="#3E4636" opacity="0.08" />

      {/* letter, peeking up out of the envelope */}
      <g>
        <path
          d="M96 96 L96 300 L308 300 L308 96
             L286 108 L264 92 L242 110 L220 90 L198 109 L176 91 L154 110 L132 92 L110 108 Z"
          fill="#FCFAF5"
          stroke="#3E4636"
          strokeOpacity="0.12"
          strokeWidth="1.5"
        />
        {/* handwritten-feel lines */}
        <line x1="128" y1="150" x2="276" y2="150" stroke="#3E4636" strokeOpacity="0.16" strokeWidth="2" strokeLinecap="round" />
        <line x1="128" y1="172" x2="256" y2="172" stroke="#3E4636" strokeOpacity="0.16" strokeWidth="2" strokeLinecap="round" />
        <line x1="128" y1="194" x2="268" y2="194" stroke="#3E4636" strokeOpacity="0.16" strokeWidth="2" strokeLinecap="round" />
        <line x1="128" y1="216" x2="212" y2="216" stroke="#3E4636" strokeOpacity="0.16" strokeWidth="2" strokeLinecap="round" />
        {/* small signature flourish */}
        <path d="M128 250 C150 238, 162 262, 182 246 S210 236, 224 250" fill="none" stroke="#B9785E" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      </g>

      {/* envelope back pocket */}
      <path
        d="M56 176 L204 268 L352 176 L352 366 Q352 374 344 374 L64 374 Q56 374 56 366 Z"
        fill="#F7F2E9"
        stroke="#3E4636"
        strokeOpacity="0.14"
        strokeWidth="1.5"
      />
      {/* envelope front flap (open, folded back) */}
      <path
        d="M56 176 L204 96 L352 176 L204 268 Z"
        fill="#F0E7D6"
        stroke="#3E4636"
        strokeOpacity="0.14"
        strokeWidth="1.5"
      />

      {/* linen ribbon wrap */}
      <path d="M56 300 L352 300" stroke="#9AA58D" strokeWidth="14" opacity="0.55" />
      <path d="M56 300 L352 300" stroke="#9AA58D" strokeWidth="14" opacity="0.55" transform="translate(0 34)" />
      <path d="M188 282 L188 352 Q204 340 220 352 L220 282" fill="#EDE3D3" stroke="#9AA58D" strokeWidth="1.5" opacity="0.9" />

      {/* wax seal */}
      <g transform="translate(204 300)">
        <circle r="26" fill="#C17A5A" />
        <circle r="26" fill="none" stroke="#3E4636" strokeOpacity="0.1" strokeWidth="1" />
        {/* tiny wildflower monogram pressed into the seal */}
        <g fill="#F7F2E9" opacity="0.9">
          <circle r="3.4" />
          <circle cy="-9" r="3.6" />
          <circle cy="9" r="3.6" />
          <circle cx="-9" r="3.6" />
          <circle cx="9" r="3.6" />
        </g>
      </g>

      {/* pressed wildflower, tucked beside the seal */}
      <g transform="translate(272 316) rotate(18)">
        <line x1="0" y1="0" x2="0" y2="30" stroke="#9AA58D" strokeWidth="2" strokeLinecap="round" />
        <g fill="#C9A39A" opacity="0.9">
          <ellipse rx="7" ry="4" />
          <ellipse rx="7" ry="4" transform="rotate(72)" />
          <ellipse rx="7" ry="4" transform="rotate(144)" />
          <ellipse rx="7" ry="4" transform="rotate(216)" />
          <ellipse rx="7" ry="4" transform="rotate(288)" />
        </g>
        <circle r="3" fill="#C7AF83" />
      </g>

      {/* a small, colorful bouquet spilling out of the opening — the "life"
          of the mark; the rest of the illustration stays quiet so this can
          be the one moment of real color. */}
      {spillingFlowers && (
        <g transform="translate(204 92)">
          <path d="M0 40 C-4 20 2 6 0 -6" stroke="#7C8C61" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M-2 20 C-14 12 -24 8 -34 10" stroke="#7C8C61" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M2 16 C14 6 22 0 32 -4" stroke="#7C8C61" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* poppy */}
          <g transform="translate(-34 6)">
            <circle r="11" fill="#C4472F" />
            <ellipse rx="6" ry="9" fill="#D8583A" transform="rotate(20) translate(0 -6)" />
            <ellipse rx="6" ry="9" fill="#B03A24" transform="rotate(200) translate(0 -6)" />
            <circle r="3" fill="#3E2A1A" />
          </g>

          {/* cream anemone, focal */}
          <g transform="translate(0 -8)">
            <g fill="#FBF7EE" stroke="#EADFC8" strokeWidth="0.5">
              <ellipse rx="9" ry="13" transform="rotate(0) translate(0 -9)" />
              <ellipse rx="9" ry="13" transform="rotate(60) translate(0 -9)" />
              <ellipse rx="9" ry="13" transform="rotate(120) translate(0 -9)" />
              <ellipse rx="9" ry="13" transform="rotate(180) translate(0 -9)" />
              <ellipse rx="9" ry="13" transform="rotate(240) translate(0 -9)" />
              <ellipse rx="9" ry="13" transform="rotate(300) translate(0 -9)" />
            </g>
            <circle r="5.5" fill="#B8935A" />
            <circle r="3" fill="#3E2A1A" opacity="0.8" />
          </g>

          {/* mustard bloom */}
          <g transform="translate(32 2)">
            <g fill="#D9A441">
              <ellipse rx="6" ry="10" transform="rotate(0) translate(0 -7)" />
              <ellipse rx="6" ry="10" transform="rotate(72) translate(0 -7)" />
              <ellipse rx="6" ry="10" transform="rotate(144) translate(0 -7)" />
              <ellipse rx="6" ry="10" transform="rotate(216) translate(0 -7)" />
              <ellipse rx="6" ry="10" transform="rotate(288) translate(0 -7)" />
            </g>
            <circle r="4" fill="#8B3A2F" opacity="0.8" />
          </g>

          {/* bluebell sprig */}
          <g transform="translate(-16 -18)">
            <ellipse rx="4.5" ry="7" fill="#7C8FC4" transform="rotate(-18)" />
            <ellipse rx="4" ry="6" fill="#93A4D2" transform="translate(6 8) rotate(-8)" />
          </g>
        </g>
      )}

      {/* botanical postage stamp, top right corner */}
      <g transform="translate(300 40)">
        <rect x="0" y="0" width="66" height="80" rx="3" fill="#FCFAF5" stroke="#3E4636" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="12" y1="60" x2="12" y2="20" stroke="#9AA58D" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="12" cy="24" rx="9" ry="5" fill="#9AA58D" transform="rotate(-20 12 24)" />
        <ellipse cx="12" cy="34" rx="8" ry="4.5" fill="#9AA58D" opacity="0.85" transform="rotate(15 12 34)" />
        <circle cx="40" cy="30" r="10" fill="none" stroke="#B9785E" strokeWidth="1.5" />
        <circle cx="40" cy="30" r="4" fill="#B9785E" />
      </g>
      {/* postmark, overlapping the stamp */}
      <g transform="translate(276 96)" opacity="0.55">
        <circle r="24" fill="none" stroke="#3E4636" strokeWidth="1.4" />
        <circle r="19" fill="none" stroke="#3E4636" strokeWidth="1" />
        <line x1="-30" y1="-6" x2="-24" y2="-6" stroke="#3E4636" strokeWidth="1.2" />
        <line x1="-30" y1="0" x2="-24" y2="0" stroke="#3E4636" strokeWidth="1.2" />
        <line x1="-30" y1="6" x2="-24" y2="6" stroke="#3E4636" strokeWidth="1.2" />
      </g>
    </svg>
  );
}
