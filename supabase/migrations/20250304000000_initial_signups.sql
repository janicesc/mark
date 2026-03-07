-- Waitlist signups: users who enter email and click "Join" on the waitlist form
create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text,
  created_at timestamptz not null default now()
);

-- Reserve signups: users who click "Reserve now" or complete Stripe checkout
create table if not exists public.reserve_signups (
  id uuid primary key default gen_random_uuid(),
  email text,
  source text,
  created_at timestamptz not null default now(),
  finish text,
  stripe_session_id text unique
);

-- Indexes for listing and deduplication
create index if not exists idx_waitlist_signups_created_at on public.waitlist_signups (created_at desc);
create index if not exists idx_waitlist_signups_email on public.waitlist_signups (email);
create index if not exists idx_reserve_signups_created_at on public.reserve_signups (created_at desc);

-- RLS: allow anonymous inserts so the app can write with the anon key
alter table public.waitlist_signups enable row level security;
alter table public.reserve_signups enable row level security;

-- Anyone can insert (used by Next.js with anon key)
create policy "Allow insert waitlist_signups"
  on public.waitlist_signups for insert
  with check (true);

create policy "Allow insert reserve_signups"
  on public.reserve_signups for insert
  with check (true);

-- Allow update only for incomplete rows (stripe_session_id null) so webhook can set email + stripe_session_id on completion
create policy "Allow update reserve_signups when not completed"
  on public.reserve_signups for update
  using (stripe_session_id is null)
  with check (true);

-- Optional: allow authenticated/service role to read (you can add dashboard later)
-- For now, use Supabase dashboard or service role to read. No select for anon.

comment on table public.waitlist_signups is 'Emails from users who submitted the waitlist "Join" form';
comment on table public.reserve_signups is 'Reserve intent (source=reserve_page) or completed checkout (source=stripe, stripe_session_id set). finish: light/dark.';
comment on column public.reserve_signups.finish is 'Product finish selected: light or dark';
comment on column public.reserve_signups.stripe_session_id is 'Stripe Checkout Session ID when payment completed via webhook';
