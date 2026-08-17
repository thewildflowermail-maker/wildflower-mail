import { cn } from "@/lib/utils/format";

/**
 * A small vintage-style postage stamp: perforated edge, a flying bird line
 * mark, a gold wax seal, and a cherry-blossom sprig. Stands in for the
 * literal "this letter traveled to find you" detail — used near the
 * playlist / mailing moments rather than as the primary brand mark (that's
 * EnvelopeIllustration).
 *
 * Sized via an outer container pinned to the 140:170 viewBox aspect ratio
 * with a `maxWidth` cap, so it can't be stretched oversized by a wide
 * parent. The slight rotation lives on that same container, not the SVG
 * itself, so the rest of the layout can reason about one predictable box.
 */
export function VintageStamp({
  className,
  rotate = -6,
  maxWidth = "max-w-[140px]",
}: {
  className?: string;
  rotate?: number;
  maxWidth?: string;
}) {
  return (
    <div className={cn("aspect-[140/170] w-full", maxWidth, className)} style={{ transform: `rotate(${rotate}deg)` }}>
      <svg
        viewBox="0 0 140 170"
        className="h-full w-full"
        role="presentation"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
      <rect x="4" y="4" width="132" height="162" rx="2" fill="#EDE3D3" stroke="#B8935A" strokeWidth="1.2" strokeDasharray="3 4" />
      <rect x="14" y="14" width="112" height="142" fill="#FCFAF5" />

      {/* flying bird mark */}
      <path
        d="M28 40 C36 30 50 28 60 34 C52 34 46 40 44 46 C54 44 62 48 66 56 C56 54 48 56 44 60"
        fill="none"
        stroke="#3E4636"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* cherry blossom sprig */}
      <g transform="translate(96 40)">
        <path d="M0 60 C-2 40 4 24 10 6" stroke="#7C8C61" strokeWidth="1.4" fill="none" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i % 2 === 0 ? -6 : 6} ${14 + i * 16})`}>
            <circle r="4.5" cx="-3" fill="#C9A39A" opacity="0.9" />
            <circle r="4.5" cx="3" fill="#C9A39A" opacity="0.9" />
            <circle r="4.5" cy="-4" fill="#C9A39A" opacity="0.9" />
            <circle r="2" fill="#B8935A" />
          </g>
        ))}
      </g>

      {/* postmark */}
      <g transform="translate(46 108)" opacity="0.6">
        <circle r="26" fill="none" stroke="#3E4636" strokeWidth="1.3" />
        <circle r="21" fill="none" stroke="#3E4636" strokeWidth="0.8" />
        <path d="M-34 -4 L-27 -4 M-34 2 L-27 2 M-34 8 L-27 8" stroke="#3E4636" strokeWidth="1" />
      </g>

      {/* wax seal */}
      <g transform="translate(96 122)">
        <circle r="17" fill="#B8935A" />
        <path d="M-6 2 C-4 -6 4 -6 6 2 C4 6 -4 6 -6 2 Z" fill="#FCFAF5" opacity="0.85" />
      </g>
      </svg>
    </div>
  );
}
