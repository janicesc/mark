# Supabase setup

## 1. Create a project

Create a project at [supabase.com](https://supabase.com) if you don’t have one.

## 2. Run the migration

In the Supabase dashboard: **SQL Editor** → New query → paste the contents of `migrations/20250304000000_initial_signups.sql` → Run.

Or with the Supabase CLI (from project root):

```bash
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

## 3. Env vars

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SUPABASE_URL` — from Project Settings → API → Project URL  
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Project Settings → API → anon public key  

## Tables

- **waitlist_signups** — Emails from the “Join” waitlist form (`email`, `source`, `created_at`).
- **reserve_signups** — Users who click “Reserve now” (`email` optional until you add a form, `source`, `created_at`).
