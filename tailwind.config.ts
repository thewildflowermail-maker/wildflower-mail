import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./emails/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F2E9",
        paper: "#FCFAF5",
        sage: "#9AA58D",
        rose: "#C9A39A",
        clay: "#B9785E",
        olive: "#3E4636",
        charcoal: "#302F2B",
        beige: "#C7AF83",
        // Expanded brand-world palette — used to give each homepage section
        // its own atmosphere while staying in the same warm, muted family.
        blush: "#E9D9D3",
        terracotta: "#C17A5A",
        oatmeal: "#EDE3D3",
        lavender: "#D9D3DE",
        forest: "#2F3A2A",
        // Whimsy accents pulled from the brand mood board: aged kraft paper,
        // embroidered gold (stars, wax seals, foil), and a deeper berry for
        // the richer botanical illustrations.
        kraft: "#D9C7A3",
        gold: "#B8935A",
        berry: "#8B3A2F",
        // ---------------------------------------------------------------
        // 2026 refresh — sophisticated feminine palette: soft pastel pink,
        // dusty rose, muted dark pink/burgundy, and warm cream/ivory space.
        // Used across the redesigned single-page site (header, hero, What's
        // Inside, Choose Your Mail, Our Story, Contact, footer). Older tokens
        // above are left in place for any legacy pages/emails that reference
        // them, so nothing else in the app breaks.
        // ---------------------------------------------------------------
        cream: "#F6EEE1",
        pink: "#F3D9DE",
        dustyrose: "#C98A97",
        deeprose: "#9C5866",
        peach: "#EEC7A9",
        burgundy: "#6E2F3A",
        ink: "#3A2E2C",
        // ---------------------------------------------------------------
        // 2026.2 refresh — back to an ivory/sage foundation (the brand's
        // original core) with restrained pastel accents used only through
        // stationery, stamps, tape and tiny details, per the "recognizable
        // mail world, not a generic wellness template" art direction.
        // Added as new keys (existing ones above are untouched) so legal/
        // cart pages that still use the older PageHero moods don't shift.
        // ---------------------------------------------------------------
        blossom: "#F3DCE0", // soft blush / powder pink
        butter: "#F2DFA4", // butter yellow
        dustblue: "#C7D8DF", // dusty / powder blue
        raspberry: "#9C3B57", // deeper raspberry/burgundy contrast, used sparingly
        // ---------------------------------------------------------------
        // 2026.3 refresh — richer stationery-shop palette so sage/olive
        // reads as ONE color in the family rather than the whole website.
        // ---------------------------------------------------------------
        ochre: "#C7963E", // muted mustard/ochre, used on the "3 Months" stamp
        aubergine: "#3B2430", // deep grounding footer tone (dusty aubergine)
        // 2026.4 refresh — the What's Inside paper first read as too
        // saturated/pink, was softened, then read as too beige/neutral.
        // Landed on a sophisticated dusty blush — visibly pink, not baby
        // pink, not peach/beige. 5th stamp lightened from clay so it no
        // longer reads dark/burgundy.
        paperblush: "#E8CDD1", // sophisticated dusty blush pink for the What's Inside paper
        claysoft: "#C99A82", // lighter, softer terracotta for the 5th stamp (was clay)
        // ---------------------------------------------------------------
        // 2026.5 refresh — color-balance correction. The site had drifted
        // into reading as a "sage-green wellness brand." Sage/olive are now
        // treated strictly as accents (stems/leaves/linework), and warm
        // cream/paper is the true foundation, with little unexpected
        // "wildflower" moments of berry, coral, gold and dusty blue doing
        // the emotional work instead of green.
        // ---------------------------------------------------------------
        parchment: "#F6EFE4", // warm cream/ivory handmade paper — the What's Inside base
        poppy: "#B5432E", // deep, antique poppy red — a tiny wildflower accent, used sparingly
      },
      fontFamily: {
        serif: ["var(--font-heading)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
        logo: ["var(--font-logo)", "Georgia", "serif"],
      },
      maxWidth: {
        content: "1180px",
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "3px",
        md: "4px",
      },
      transitionDuration: {
        250: "250ms",
      },
    },
  },
  plugins: [],
};

export default config;
