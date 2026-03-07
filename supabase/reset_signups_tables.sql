-- Run this in Supabase SQL Editor when you want to drop and redo the signup tables.
-- Then run migrations/20250304000000_initial_signups.sql again.
-- WARNING: This deletes all data in waitlist_signups and reserve_signups.
drop policy if exists "Allow insert waitlist_signups" on public.waitlist_signups;
drop policy if exists "Allow insert reserve_signups" on public.reserve_signups;
drop table if exists public.waitlist_signups;
drop table if exists public.reserve_signups;
