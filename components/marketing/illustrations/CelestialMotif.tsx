import { cn } from "@/lib/utils/format";

/**
 * A scattering of small embroidered-gold stars and a crescent moon (with
 * the faintest suggestion of a face) — the "magic" layer of the brand,
 * used sparingly as a background accent for night/quiet-ritual moments
 * (the playlist, the final CTA) rather than on every section.
 */
export function CelestialMotif({ className, dense = false }: { className?: string; dense?: boolean }) {
  const star4 = (cx: number, cy: number, s: number, opacity = 1) => (
    <path
      key={`${cx}-${cy}`}
      d={`M${cx} ${cy - s} C${cx + s * 0.15} ${cy - s * 0.15}, ${cx + s} ${cy}, ${cx + s * 0.15} ${cy + s * 0.15} C${cx} ${cy + s}, ${cx - s * 0.15} ${cy + s * 0.15}, ${cx - s} ${cy} C${cx - s * 0.15} ${cy - s * 0.15}, ${cx} ${cy - s}, ${cx} ${cy - s}Z`}
      fill="#C7AF83"
      opacity={opacity}
    />
  );

  return (
    <svg viewBox="0 0 400 300" className={cn("w-full h-full", className)} role="presentation" aria-hidden="true">
      {/* crescent moon with a soft, gentle face */}
      <g transform="translate(70 70)">
        <path
          d="M20 -26 C40 -20 46 8 30 26 C42 18 48 -2 38 -18 C48 -10 50 12 36 26 C10 34 -14 18 -18 -6 C-8 -22 4 -30 20 -26 Z"
          fill="#C7AF83"
        />
        <circle cx="10" cy="-2" r="1.6" fill="#3E4636" opacity="0.5" />
        <path d="M6 6 Q10 9 14 6" stroke="#3E4636" strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round" />
      </g>

      {star4(160, 40, 8)}
      {star4(230, 90, 5, 0.8)}
      {star4(310, 50, 10)}
      {star4(340, 140, 6, 0.7)}
      {star4(120, 150, 5, 0.7)}
      {star4(270, 190, 7, 0.85)}
      {star4(40, 200, 6, 0.6)}
      {star4(190, 230, 5, 0.6)}
      {dense && (
        <>
          {star4(370, 220, 6, 0.7)}
          {star4(20, 100, 4, 0.5)}
          {star4(100, 260, 4, 0.5)}
          {star4(330, 20, 4, 0.6)}
        </>
      )}
    </svg>
  );
}
