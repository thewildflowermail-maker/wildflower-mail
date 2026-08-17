-- ---------------------------------------------------------------------------
-- Adds the two soft alternatives to full cancellation offered by
-- CancelMembershipButton.tsx: "Pause my membership" and "Skip next edition"
-- (components/account/CancelMembershipButton.tsx, app/api/account/pause,
-- app/api/account/skip-next). Additive only — nothing here changes existing
-- rows/behavior for members who never use these options.
-- ---------------------------------------------------------------------------

alter table public.subscriptions
  drop constraint if exists subscriptions_status_check;

alter table public.subscriptions
  add constraint subscriptions_status_check
  check (status in ('active', 'past_due', 'canceled', 'incomplete', 'trialing', 'unpaid', 'paused'));

alter table public.subscriptions
  add column if not exists paused_at timestamptz;

-- One-time flag: the next monthly fulfillment run should skip this
-- subscription, then clear the flag back to false. Independent of `status`
-- so a member can skip a single edition without pausing/interrupting
-- billing at all.
alter table public.subscriptions
  add column if not exists skip_next_edition boolean not null default false;
