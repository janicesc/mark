-- Add Stripe session id to reserve_signups for webhook idempotency and tracking
alter table public.reserve_signups
  add column if not exists stripe_session_id text unique;

comment on column public.reserve_signups.stripe_session_id is 'Stripe Checkout Session ID when payment completed via webhook';
