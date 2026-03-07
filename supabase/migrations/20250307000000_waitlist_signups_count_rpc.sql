-- Returns total count of waitlist signups for public display (e.g. "Join X readers").
-- SECURITY DEFINER allows anon to call without SELECT on waitlist_signups.
create or replace function public.get_waitlist_signups_count()
returns bigint
language sql
stable
security definer
set search_path = public
as $$
  select count(*)::bigint from public.waitlist_signups;
$$;

grant execute on function public.get_waitlist_signups_count() to anon;
grant execute on function public.get_waitlist_signups_count() to authenticated;
