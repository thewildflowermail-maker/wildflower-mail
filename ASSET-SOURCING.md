# Sourcing final illustration & photography assets

The vector illustrations currently in the codebase (`components/marketing/EnvelopeIllustration.tsx`
and everything in `components/marketing/illustrations/`) are original stand-ins, hand-built to
match the mood and color language of your reference board — a colorful wildflower bouquet, a
moth/butterfly wing with visible linework, an embroidered gold stars-and-moon motif, a vintage
postage stamp, and washi-tape accents. They're safe to ship as-is (nothing borrowed, no
licensing risk), but they're a placeholder-quality first pass, not final illustration work.

This doc is a punch list for replacing them with something more polished before launch, plus
where the photography placeholders (`<ImagePlaceholder>` throughout the codebase) should
eventually be filled from.

## Where to license similar illustration work

**Marketplaces for ready-made assets** (buy a commercial license, then drop the files in):
- **Creative Market** — the closest match to your mood board's exact aesthetic: vintage
  botanical collage sets, pressed-flower PNGs, wax seal and postage stamp graphics, washi tape
  textures. Search "vintage botanical collage," "pressed flower clipart," "wax seal PNG."
- **Adobe Stock** / **Envato Elements** — broader selection, subscription-based, good for
  photography too.
- **Creative Fabrica** — strong for hand-illustrated, whimsical, scrapbook-style assets
  specifically (stamps, ribbons, washi tape, botanical line art).
- **Etsy** (digital download shops) — many independent illustrators sell exactly this style
  (vintage stationery clipart, botanical collage sheets) with clear commercial-use licenses.
  Read each shop's license terms — some restrict use to a certain number of sales/impressions.

Always confirm the license explicitly covers commercial use on a paid subscription product, not
just personal or "small business" tiers with revenue caps.

**Commissioning original work** (fully-owned, most on-brand long-term):
- **Dribbble** or **Behance** — browse illustrators whose existing style matches (search
  "botanical illustration," "vintage stationery," "collage art") and reach out directly.
  This is how the actual EnvelopeIllustration mark should probably end up being redrawn —
  it's the one recurring brand asset worth commissioning properly.
- **Upwork / Fiverr Pro** — faster turnaround, wider price range, good for one-off assets
  (a refined stamp, a set of pressed-flower cutouts) rather than an entire brand identity.

## Photography

The `<ImagePlaceholder>` components throughout the site (hero, story section, gift section, sample
edition flat-lay, founder portrait — search the codebase for `<ImagePlaceholder` to find every
instance) still need real photography in the "Kinfolk / Magnolia Journal" editorial style
described in the original brief: warm natural light, tea, journals, an opened envelope, hands,
soft shadows. Options:
- Commission a real photoshoot styled around the actual physical product once it exists —
  by far the best outcome for an authentic, ownable brand.
- License editorial-style stock in the interim from **Adobe Stock**, **Unsplash+** (paid tier,
  commercial-safe), or **Stocksy** (higher-end, curated, closer to the Kinfolk aesthetic than
  generic stock libraries).

## What to do with this repo in the meantime

Nothing needs to change structurally. When final assets are ready:
1. Drop illustration files into `public/images/brand/` (create the folder) and photography into
   `public/images/photography/`.
2. Swap `<ImagePlaceholder label="..." />` for `<Image src="/images/photography/..." alt="..." />`
   (Next.js `<Image>`, already configured in `next.config.mjs`).
3. Either keep `EnvelopeIllustration.tsx` etc. as lightweight inline SVG (cheap to load, easy to
   recolor) or replace their contents with the commissioned/licensed final artwork — the
   component API (props like `spillingFlowers`, `rotate`) can stay the same either way so nothing
   else in the codebase needs to change.
