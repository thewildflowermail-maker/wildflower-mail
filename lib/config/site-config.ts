/**
 * Wildflower Mail — central site configuration.
 *
 * This is the ONE file to edit for prices, operational dates, and playlist
 * links so non-engineers (or future-you) don't have to hunt through pages.
 * Everything here is plain data — no business logic.
 *
 * IMPORTANT: Stripe price IDs must match Products/Prices you create in the
 * Stripe Dashboard. The dollar amounts below are display copy only — the
 * actual amount charged is whatever the Stripe Price ID is configured for.
 * Keep them in sync by hand until an admin-editable price sync is built.
 */

export const brand = {
  name: "The Wildflower Mail",
  membershipName: "The Wildflower Club",
  tagline: "A monthly ritual of art, affirmations and grounding exercises.",
  statement: "For mothers learning to bloom through the noise.",
  supportingText:
    "A monthly ritual of art, affirmations and grounding exercises to help you reconnect with who you are.",
  supportingPhrases: [
    "Thoughtful mail for mothers who give so much.",
    "A monthly pause, delivered to your mailbox.",
    "Something beautiful, created just for you.",
    "Real letters for the beautifully imperfect journey of motherhood.",
    "Because mothers deserve to receive, too.",
    "A gentle reminder that you are still becoming.",
  ],
  supportEmail: "hello@wildflowermail.com",
};

/**
 * Pricing — edit the `displayPrice` strings whenever the underlying Stripe
 * Price changes so the site copy never drifts from what customers are
 * actually charged.
 */
export const pricing = {
  monthlyMembership: {
    id: "monthly-membership",
    name: "Monthly Membership",
    displayPrice: "$16",
    billingCadence: "per month",
    stripePriceEnvVar: "STRIPE_PRICE_MONTHLY_MEMBERSHIP",
    mode: "subscription" as const,
  },
    oneYear: {
    id: "one-year",
    name: "One-Year Membership",
    displayPrice: "$139.99",
    billingCadence: "per year",
    stripePriceEnvVar: "STRIPE_PRICE_ONE_YEAR",
    mode: "subscription" as const,
  },
  giftOneYear: {
    id: "gift-one-year",
    name: "One-Year Gift",
    displayPrice: "$139.99",
    billingCadence: "one-time payment",
    stripePriceEnvVar: "STRIPE_PRICE_ONE_YEAR_GIFT",
    mode: "payment" as const,
    editionCount: 12,
  },
  giftThreeMonth: {
    id: "gift-three-month",
    name: "Three-Month Gift",
    displayPrice: "$45",
    billingCadence: "one-time payment",
    stripePriceEnvVar: "STRIPE_PRICE_THREE_MONTH",
    mode: "payment" as const,
    editionCount: 3,
  },
  giftSixMonth: {
    id: "gift-six-month",
    name: "Six-Month Gift",
    displayPrice: "$84",
    billingCadence: "one-time payment",
    stripePriceEnvVar: "STRIPE_PRICE_SIX_MONTH",
    mode: "payment" as const,
    editionCount: 6,
  },
};

/**
 * Operational dates — these drive copy on the Home and How It Works pages.
 * Update monthly, or wire up to an admin-editable settings table later
 * (see supabase/migrations/0001_init.sql -> app_settings).
 */
export const operations = {
  orderCutoffDay: "the 15th of each month",
  mailingDay: "the last week of each month",
  domesticDeliveryWindow: "5–10 business days after mailing",
  addressChangeDeadline: "5 days before the monthly order cutoff",
  cancellationDeadline: "before the next monthly billing date",
};

/**
 * Sample playlist — replace `spotifyUrl` and `qrImagePath` from the admin
 * dashboard (or directly here) each time a new edition ships.
 */
export const currentPlaylist = {
  title: "The Becoming Edition — Reflection Playlist",
  spotifyUrl: "https://open.spotify.com/",
  qrImagePath: "/images/placeholders/qr-code-placeholder.svg",
};

export const featureFlags = {
  // Turn on once real, verified customer testimonials are collected.
  showTestimonials: false,
  gaEnabled: Boolean(process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID),
  metaPixelEnabled: Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID),
};

// Minimal single-page nav — every item is an anchor on the homepage.
// Per brand direction: no additional menu categories.
export const nav = [
  { label: "What's Inside", href: "/#whats-inside" },
  { label: "Choose Your Mail", href: "/#choose-your-mail" },
  { label: "About", href: "/#our-story" },
  { label: "Contact", href: "/#contact" },
];

// Footer stays minimal: logo, social icons, copyright only — no extra
// menus/categories (legal pages still exist as routes for compliance, they
// are just not surfaced in the footer nav per the current brand direction).
export const footerLinks = {
  social: [
    { label: "Instagram", href: "https://instagram.com/", placeholder: true },
    { label: "Facebook", href: "https://facebook.com/", placeholder: true },
    { label: "TikTok", href: "https://tiktok.com/", placeholder: true },
  ],
};

// The five "Choose Your Wildflower Mail" options. Each renders as its own
// physical piece of mail (envelope/postcard/card) on the homepage. `stripeUrl`
// is a direct Stripe Payment Link (test mode) — clicking a stamp goes
// straight to Stripe checkout rather than the /mail/[slug] detail page.
// `discountPct` is optional display-only copy (e.g. "20% off") shown on the
// longer-commitment and gift boxes; the monthly plan has none.
// `paperWeight` / `finish` are tactile-detail copy (per the "Artist's Lens"
// design pass) surfaced as a small badge on each stamp, plus fed into the
// TactileZoomModal detail view — real production values, matched to what's
// actually used for the mailed pieces, not filler copy.
export const plans = [
  {
    slug: "monthly-subscription",
    name: "Monthly Subscription",
    stripeUrl: "https://buy.stripe.com/test_00w8wOb6R3Ryfm52Btffy00",
    paperWeight: "80lb Cover",
    finish: "Soft-Touch",
  },
  {
    slug: "3-months",
    name: "3 Months",
    discountPct: 5,
    stripeUrl: "https://buy.stripe.com/test_5kQbJ02Al3Ry8XH5NFffy01",
    paperWeight: "100lb Cotton",
    finish: "Letterpress",
  },
  {
    slug: "6-months",
    name: "6 Months",
    discountPct: 10,
    stripeUrl: "https://buy.stripe.com/test_9B6eVc0sdbk0fm5a3Vffy02",
    paperWeight: "100lb Cotton",
    finish: "Letterpress",
  },
  {
    slug: "1-year",
    name: "1 Year",
    discountPct: 20,
    stripeUrl: "https://buy.stripe.com/test_fZu9AS6QB1Jq8XH4JBffy03",
    paperWeight: "110lb Cotton",
    finish: "Foil Stamp",
  },
  {
    slug: "gift-a-friend",
    name: "A Gift to a Friend",
    discountPct: 20,
    stripeUrl: "https://buy.stripe.com/test_7sY9ASfn7ewc0rb6RJffy04",
    paperWeight: "110lb Cotton",
    finish: "Foil Stamp",
  },
];
