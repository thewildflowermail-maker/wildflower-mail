-- ===========================================================================
-- Wildflower Mail — initial database schema (Supabase / Postgres)
-- Run this in the Supabase SQL editor, or via `supabase db push` once the
-- Supabase CLI is linked to your project. See README.md for setup steps.
-- ===========================================================================

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------------
-- users: Supabase Auth already maintains auth.users. This table stores
-- app-specific profile data for customers who create an account.
-- ---------------------------------------------------------------------------
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- customers: the paying party (may or may not have a user account yet —
-- guest checkout is supported, and customers can later claim their account
-- by matching email).
-- ---------------------------------------------------------------------------
create table if not exists public.customers (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users (id) on delete set null,
  full_name text not null,
  email text not null,
  stripe_customer_id text unique,
  newsletter_consent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_customers_email on public.customers (email);

-- ---------------------------------------------------------------------------
-- recipients: the person receiving the mail. For a self-purchased monthly
-- membership, recipient == customer's own address. For gifts, this is
-- someone else, and their address must stay hidden from the purchaser view.
-- ---------------------------------------------------------------------------
create table if not exists public.recipients (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid not null references public.customers (id) on delete cascade,
  full_name text not null,
  is_self boolean not null default true,
  reveal_sender boolean not null default true,
  gift_message text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- shipping_addresses
-- ---------------------------------------------------------------------------
create table if not exists public.shipping_addresses (
  id uuid primary key default uuid_generate_v4(),
  recipient_id uuid not null references public.recipients (id) on delete cascade,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  zip text not null,
  country text not null default 'US',
  is_current boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_shipping_addresses_recipient on public.shipping_addresses (recipient_id);

-- ---------------------------------------------------------------------------
-- products: mirrors the plans defined in lib/config/site-config.ts, kept in
-- the database so orders/subscriptions can reference a stable product row.
-- ---------------------------------------------------------------------------
create table if not exists public.products (
  id text primary key, -- matches pricing.<plan>.id in site-config.ts
  name text not null,
  mode text not null check (mode in ('subscription', 'payment')),
  edition_count int, -- null for open-ended monthly membership
  stripe_price_id text not null,
  active boolean not null default true
);

-- ---------------------------------------------------------------------------
-- subscriptions: monthly membership state, mirrored from Stripe subscription
-- webhooks.
-- ---------------------------------------------------------------------------
create table if not exists public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid not null references public.customers (id) on delete cascade,
  recipient_id uuid not null references public.recipients (id) on delete cascade,
  product_id text not null references public.products (id),
  stripe_subscription_id text unique not null,
  status text not null check (status in ('active','past_due','canceled','incomplete','trialing','unpaid')),
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  next_expected_mailing_month text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_subscriptions_customer on public.subscriptions (customer_id);

-- ---------------------------------------------------------------------------
-- gift_subscriptions: three- or six-month one-time gifts.
-- ---------------------------------------------------------------------------
create table if not exists public.gift_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  purchaser_customer_id uuid not null references public.customers (id) on delete cascade,
  recipient_id uuid not null references public.recipients (id) on delete cascade,
  product_id text not null references public.products (id),
  starting_month text not null,
  announcement_preference text not null check (announcement_preference in ('email-now','letter-first')),
  editions_total int not null,
  editions_sent int not null default 0,
  status text not null default 'active' check (status in ('active','completed','canceled')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- orders: one row per checkout (subscription signup or gift purchase).
-- ---------------------------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid not null references public.customers (id) on delete cascade,
  product_id text not null references public.products (id),
  order_type text not null check (order_type in ('membership','gift')),
  subscription_id uuid references public.subscriptions (id) on delete set null,
  gift_subscription_id uuid references public.gift_subscriptions (id) on delete set null,
  stripe_checkout_session_id text unique,
  status text not null default 'pending' check (status in ('pending','paid','failed','refunded')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- payments: individual Stripe payment events (initial + recurring charges).
-- ---------------------------------------------------------------------------
create table if not exists public.payments (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders (id) on delete set null,
  subscription_id uuid references public.subscriptions (id) on delete set null,
  stripe_payment_intent_id text,
  stripe_invoice_id text,
  amount_cents int not null,
  currency text not null default 'usd',
  status text not null check (status in ('succeeded','failed','refunded')),
  failure_reason text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- monthly_editions: content/theme for each month, managed from the admin.
-- ---------------------------------------------------------------------------
create table if not exists public.monthly_editions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  month_year text not null unique, -- e.g. "August 2026"
  theme_description text,
  cover_image_url text,
  status text not null default 'draft' check (status in ('draft','prepared','mailed')),
  order_cutoff_date date,
  mailing_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- playlist_links: one playlist per edition (kept separate so it can be
-- updated independently, e.g. if a Spotify link needs to be swapped).
-- ---------------------------------------------------------------------------
create table if not exists public.playlist_links (
  id uuid primary key default uuid_generate_v4(),
  edition_id uuid not null references public.monthly_editions (id) on delete cascade,
  spotify_url text,
  qr_code_image_url text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- mailing_batches: one row per recipient per edition, tracking fulfillment.
-- This is what the admin's CSV export and "mark mailed" actions operate on.
-- ---------------------------------------------------------------------------
create table if not exists public.mailing_batches (
  id uuid primary key default uuid_generate_v4(),
  edition_id uuid not null references public.monthly_editions (id) on delete cascade,
  recipient_id uuid not null references public.recipients (id) on delete cascade,
  shipping_address_id uuid not null references public.shipping_addresses (id),
  subscription_id uuid references public.subscriptions (id) on delete set null,
  gift_subscription_id uuid references public.gift_subscriptions (id) on delete set null,
  mailing_status text not null default 'pending' check (mailing_status in ('pending','prepared','mailed')),
  tracking_number text,
  mailed_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists idx_mailing_batches_edition on public.mailing_batches (edition_id);

-- ---------------------------------------------------------------------------
-- email_consent: separates transactional-email eligibility (always allowed,
-- required for order-related communication) from marketing/newsletter
-- consent (opt-in only).
-- ---------------------------------------------------------------------------
create table if not exists public.email_consent (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  first_name text,
  marketing_consent boolean not null default false,
  consent_source text, -- e.g. 'homepage_newsletter_form', 'checkout_opt_in'
  consented_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- contact_inquiries: submissions from the Contact page.
-- ---------------------------------------------------------------------------
create table if not exists public.contact_inquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  order_number text,
  topic text not null,
  subject text not null,
  message text not null,
  resolved boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- admin_notes: free-form internal notes attached to a customer, recipient,
-- or order, for fulfillment/support context.
-- ---------------------------------------------------------------------------
create table if not exists public.admin_notes (
  id uuid primary key default uuid_generate_v4(),
  related_table text not null, -- 'customers' | 'recipients' | 'orders'
  related_id uuid not null,
  note text not null,
  created_by text, -- admin identifier/email
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- app_settings: single-row(ish) key/value table for operational dates and
-- other admin-editable settings, as an alternative to redeploying code.
-- lib/config/site-config.ts remains the source of truth until this is wired
-- up to the admin UI.
-- ---------------------------------------------------------------------------
create table if not exists public.app_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security — enabled on all customer-data tables. The service-role
-- key (server-only, used in API routes and the admin dashboard) bypasses RLS.
-- Policies below allow an authenticated customer to read only their own
-- data through the anon/public client.
-- ---------------------------------------------------------------------------
alter table public.customers enable row level security;
alter table public.recipients enable row level security;
alter table public.shipping_addresses enable row level security;
alter table public.subscriptions enable row level security;
alter table public.gift_subscriptions enable row level security;
alter table public.orders enable row level security;
alter table public.payments enable row level security;
alter table public.contact_inquiries enable row level security;

create policy "customers read own row"
  on public.customers for select
  using (auth.uid() = user_id);

create policy "subscriptions read own"
  on public.subscriptions for select
  using (
    customer_id in (select id from public.customers where user_id = auth.uid())
  );

-- Note: recipients/shipping_addresses for GIFTS deliberately have no public
-- read policy for the purchaser — gift recipient addresses are only ever
-- visible via the service-role key (admin dashboard / fulfillment), per the
-- requirement that purchasers cannot see gift recipients' full private
-- shipping/billing details beyond what they themselves entered at checkout.

-- Seed the three launch products (edit stripe_price_id after creating real
-- Stripe Prices, or update via SQL/admin later).
insert into public.products (id, name, mode, edition_count, stripe_price_id, active)
values
  ('monthly-membership', 'Monthly Membership', 'subscription', null, 'price_placeholder_monthly', true),
  ('gift-three-month', 'Three-Month Gift', 'payment', 3, 'price_placeholder_gift3', true),
  ('gift-six-month', 'Six-Month Gift', 'payment', 6, 'price_placeholder_gift6', true)
on conflict (id) do nothing;
