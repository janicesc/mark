-- Allow webhook to update the reserve_signup row when checkout completes (one row per session).
-- Only rows with stripe_session_id null can be updated.
create policy "Allow update reserve_signups when not completed"
  on public.reserve_signups for update
  using (stripe_session_id is null)
  with check (true);
