# Wildflower Mail

A monthly physical-mail subscription website for mothers, built with Next.js (App Router),
TypeScript, and Tailwind CSS, with Stripe for payments, Supabase for data, and Resend for
transactional email.

This is a **working MVP**: the full public website, membership and gift purchase flows, Stripe
Checkout (test mode), a customer account area, and a password-protected admin dashboard with
CSV mailing-list export. Customer accounts, edition archives, and further personalization are
structured so they can be extended later without a rewrite.

---

## 1. Tech stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Stripe** — Checkout (subscription + one-time payment modes), Billing Portal, webhooks
- **Supabase** — Postgres database + Auth (magic-link sign-in for customers)
- **Resend** — transactional email
- Deployable to **Vercel** (recommended) or any Node.js host that supports Next.js

---

## 2. Local setup

```bash
npm install
cp .env.example .env.local
# fill in .env.local — see sections 3–5 below
npm run dev
```

The site runs at `http://localhost:3000`.

Run `npm run typecheck` and `npm run lint` before committing changes.

---

## 3. Supabase setup

1. Create a project at supabase.com.
2. In **Project Settings → API**, copy the Project URL, `anon` public key, and `service_role`
   secret key into `.env.local` as `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   and `SUPABASE_SERVICE_ROLE_KEY`.
3. Open the **SQL Editor** and run the contents of `supabase/migrations/0001_init.sql`. This
   creates every table described in the project spec (customers, recipients, shipping
   addresses, subscriptions, gift subscriptions, orders, payments, monthly editions, playlist
   links, mailing batches, email consent, contact inquiries, admin notes) plus Row Level
   Security policies.
4. In **Authentication → Providers**, ensure Email is enabled, and Email OTP / Magic Link is
   turned on (used for customer account sign-in — no password required).
5. In **Authentication → URL Configuration**, add your site URL (and
   `http://localhost:3000` for local dev) to the allowed redirect URLs.

The `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security and is used **only** in
server-only code (API routes, the admin dashboard). It must never be exposed to the browser —
double-check it isn't prefixed with `NEXT_PUBLIC_`.

---

## 4. Stripe setup (test mode first)

1. Create a Stripe account and switch to **Test mode**.
2. In **Products**, create three products/prices matching the plans in
   `lib/config/site-config.ts`:
   - Monthly Membership — recurring, monthly
   - Three-Month Gift — one-time
   - Six-Month Gift — one-time
3. Copy each Price ID into `.env.local`:
   `STRIPE_PRICE_MONTHLY_MEMBERSHIP`, `STRIPE_PRICE_GIFT_THREE_MONTH`, `STRIPE_PRICE_GIFT_SIX_MONTH`.
4. Copy your test **Secret key** and **Publishable key** into `STRIPE_SECRET_KEY` and
   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
5. Install the [Stripe CLI](https://stripe.com/docs/stripe-cli) and run, in a separate
   terminal, while developing locally:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   Copy the webhook signing secret it prints into `STRIPE_WEBHOOK_SECRET`.
6. In production, add a webhook endpoint in the Stripe Dashboard pointing to
   `https://yourdomain.com/api/webhooks/stripe`, listening for at least:
   `checkout.session.completed`, `invoice.payment_failed`, `customer.subscription.updated`,
   `customer.subscription.deleted`. Copy that endpoint's signing secret into your production
   `STRIPE_WEBHOOK_SECRET`.
7. Test a full purchase using Stripe's [test card numbers](https://stripe.com/docs/testing)
   (e.g. `4242 4242 4242 4242`, any future expiry, any CVC) before ever switching to live keys.

**Do not switch to live Stripe keys until a full test-mode purchase (membership + both gift
options), the webhook, and confirmation emails have all been verified.**

---

## 5. Resend setup

1. Create an account at resend.com and verify a sending domain (or use their test domain
   during development).
2. Create an API key and set it as `RESEND_API_KEY`.
3. Set `RESEND_FROM_ADDRESS` to a verified sender, e.g. `"Wildflower Mail <hello@wildflowermail.com>"`.
4. All 14 transactional email templates required by the project spec are implemented in
   `emails/copy.ts` (wording) and rendered by `emails/render.ts` (shared branded HTML layout).
   If `RESEND_API_KEY` is left as the placeholder value, sends are safely skipped with a console
   warning instead of failing — useful while developing without a real Resend account.

**Marketing vs. transactional email:** the newsletter signup (`/api/newsletter`) and the
optional "also send me Wildflower Notes" checkbox at checkout are the *only* ways someone is
added to `email_consent.marketing_consent = true`. Completing a purchase alone never enrolls
someone in marketing email — see `app/api/checkout/subscription/route.ts` and
`app/api/webhooks/stripe/route.ts` for where this distinction is enforced.

A marketing-email platform (e.g. Klaviyo, Mailchimp) is not yet connected — `email_consent` is
the source of truth in the meantime. See the `TODO` comment in `app/api/newsletter/route.ts`
for where to add that integration later.

---

## 6. Editing content, prices, dates, and links

Almost everything editable lives in one file:

**`lib/config/site-config.ts`**
- `pricing` — display prices for all three plans (keep in sync with the actual Stripe Price
  whenever you change it in the Stripe Dashboard)
- `operations` — order cutoff day, mailing day, delivery window, address-change deadline,
  cancellation deadline (shown on Home, How It Works, FAQ, and the Shipping policy page)
- `currentPlaylist` — this month's Spotify link and QR code image path
- `featureFlags.showTestimonials` — flip to `true` once real, permissioned customer
  testimonials are ready to publish
- `nav` / `footerLinks` — header and footer navigation

**`lib/config/faq-content.ts`** — every FAQ answer.

**`lib/config/editions-content.ts`** — sample Past Editions content (clearly marked as
placeholder; replace with real editions, ideally sourced from the `monthly_editions` table via
the admin dashboard, before launch).

**`app/(marketing)/about/page.tsx`** — founder placeholders (`founderName`, `location`,
`personalStory`, `signature`, plus the photo placeholder) are marked at the top of the file —
do not publish invented personal history.

**Legal pages** (`app/(marketing)/privacy`, `terms`, `shipping-cancellation-refund`) each show a
`LegalNotice` banner reminding you to have an attorney review before publishing — replace
bracketed `[placeholder]` text first.

Monthly editions, playlist links, and mailing schedules for *specific months* are managed from
the admin dashboard (see section 8) once Supabase is connected, rather than in code.

---

## 7. Customer accounts

Customers sign in at `/login` with a magic link (no password) via Supabase Auth, then manage
their membership at `/account`:

- View membership status and next billing date
- Update shipping address (writes a new `shipping_addresses` row and keeps history)
- Manage billing via the Stripe Billing Portal
- Cancel their monthly membership (effective at the end of the current billing period)
- View gift subscriptions they've purchased
- View order history
- View playlist links for editions they've received

Gift recipients are never given account access to the purchaser's billing details — see the
Row Level Security policies and the admin `recipients` page notes in
`supabase/migrations/0001_init.sql` for how that separation is enforced.

---

## 8. Admin dashboard

Visit `/admin` and sign in with the password set in `ADMIN_PASSWORD` (`.env.local`).

This MVP uses one shared password behind a signed, httpOnly session cookie
(`lib/admin/auth.ts`) rather than individual admin accounts — sufficient for a single-operator
launch. To support multiple admins with an audit trail later, replace this with Supabase Auth
plus a `role = 'admin'` check (the middleware in `middleware.ts` is the only place that needs
to change).

From the admin dashboard you can:
- View subscriber and gift-subscription counts, failed payments, and canceled subscriptions
- Search/filter subscribers by customer name, email, or membership type
- View recipients and their full mailing addresses (never shown on public pages)
- Create monthly editions, and mark them **Prepared** or **Mailed**
- Export the mailing list as CSV, optionally scoped to a single edition, for label printing or
  a shipping tool (`/api/admin/mailing-list`)
- Review failed payments

**Not yet built into the admin UI** (documented as a deliberate MVP scope cut, so launch isn't
delayed): uploading edition cover images and QR code files, and editing prices/dates from the
UI instead of `site-config.ts`. Cover images and Spotify/QR links can be set directly on the
`monthly_editions` and `playlist_links` tables in the Supabase Table Editor in the meantime.

---

## 9. Deployment (Vercel)

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import it into [Vercel](https://vercel.com/new).
3. Add every variable from `.env.example` to the Vercel project's Environment Variables
   (Production and Preview), using your real Supabase/Stripe/Resend values.
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain (e.g. `https://wildflowermail.com`).
5. Deploy. Then add your production Stripe webhook endpoint (section 4, step 6) pointing at the
   deployed URL.

### Connecting a custom domain
In the Vercel project, go to **Settings → Domains**, add your domain, and follow Vercel's DNS
instructions (either delegate nameservers to Vercel or add the provided A/CNAME records at your
registrar). Update `NEXT_PUBLIC_SITE_URL` to match once the domain is live.

---

## 10. Analytics & tracking (optional, off by default)

- **Google Analytics 4**: set `NEXT_PUBLIC_GA4_MEASUREMENT_ID` to enable (see `app/layout.tsx`).
- **Meta Pixel**: set `NEXT_PUBLIC_META_PIXEL_ID` to enable. Disabled until configured, per spec.
- **Search Console**: set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to the verification string
  Google gives you; it's injected into page metadata automatically.

---

## 11. Folder structure

```
app/
  (marketing)/        Public site: home, how-it-works, membership, gift, about,
                       past-editions, faq, contact, cart, checkout, legal pages
  (account)/           Customer login + /account area
  (admin)/             Password-protected admin dashboard
  api/                 Route handlers: checkout, Stripe webhook, contact, newsletter,
                       account actions, admin actions
  sitemap.ts, robots.ts
components/
  ui/                  Generic building blocks (Button, Accordion, form fields, etc.)
  marketing/           Public-site-specific components
  account/             Customer account components
  admin/               Admin dashboard components
lib/
  config/              site-config.ts, faq-content.ts, editions-content.ts (edit these!)
  stripe/, supabase/, resend/, admin/, account/, validation/, utils/
emails/                Transactional email copy + shared HTML template
supabase/migrations/   SQL schema
public/images/placeholders/  Neutral photography placeholders (search codebase for
                              <ImagePlaceholder to find every spot needing a real photo)
```

---

## 12. Prelaunch testing checklist

- [ ] Every header/footer/nav link goes to the correct page (desktop and mobile)
- [ ] Every button triggers the correct action (no dead buttons)
- [ ] All forms validate correctly and show specific, friendly errors without clearing
      completed fields (Contact, Gift, Cart/Checkout, Newsletter, Account Address)
- [ ] Contact form submissions save to `contact_inquiries` and send a confirmation email
- [ ] Responsive layout checked at 320px, 375px, 390px, 430px, and desktop widths — no
      horizontal scrolling anywhere
- [ ] Loading, empty, and error states checked (e.g. admin pages before Supabase is connected,
      Past Editions with no purchasable editions, checkout button while submitting)
- [ ] Images optimized; no obvious layout shift as placeholders/content load
- [ ] Page titles, meta descriptions, and Open Graph tags reviewed per page
- [ ] Accessibility pass: keyboard-only navigation through the whole site, visible focus
      states, screen-reader labels on icon-only buttons, color contrast, reduced-motion
      preference respected
- [ ] Full Stripe **test-mode** checkout for the monthly membership, three-month gift, and
      six-month gift
- [ ] Stripe webhook received and processed correctly (`stripe listen` locally, or the
      Dashboard's webhook log in production) — confirm rows appear in `customers`,
      `recipients`, `shipping_addresses`, `subscriptions`/`gift_subscriptions`, and `orders`
- [ ] Confirmation, receipt, and internal new-order emails all arrive and render correctly on
      mobile email clients
- [ ] Customer account security: a signed-in customer can only ever see their own data
      (verify Row Level Security policies), and gift recipients cannot see purchaser billing
      details
- [ ] Admin dashboard requires the admin password and cannot be reached without it
      (`/admin` and every `/api/admin/*` route)
- [ ] CSV mailing-list export opens correctly in a spreadsheet application and contains the
      expected columns
- [ ] Remove any remaining placeholder/sample content (Past Editions, About page founder info,
      testimonials) before going live, and have legal pages reviewed by an attorney
- [ ] Switch Stripe from test mode to live mode only after all of the above passes

---

## 13. Illustration & photography assets

The envelope mark, bouquet, moth wing, stars/moon motif, and postage stamp graphic
(`components/marketing/illustrations/` and `EnvelopeIllustration.tsx`) are original inline SVG,
safe to ship with no licensing risk — but they're a first-pass placeholder for what should
eventually be more polished, possibly commissioned illustration. See **ASSET-SOURCING.md** for
where to license similar vintage-botanical/collage-style art or commission an illustrator, plus
where real product/lifestyle photography should come from to replace the `<ImagePlaceholder>`
components throughout the site.

## 14. What's intentionally out of scope for this MVP

Per the build brief, these are structured to be added later without reworking the foundation,
but are not built today: referral rewards, deeper personalization, in-admin image/QR uploads,
a marketing-email platform integration (Klaviyo/Mailchimp), and multi-admin accounts with
audit logging.
