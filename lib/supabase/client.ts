import { createClient as createSupabaseClient, SupabaseClient } from "@supabase/supabase-js"

let _client: SupabaseClient | null | undefined

/**
 * Returns the Supabase client when env vars are set; otherwise null.
 * Use this in the app so it still works when Supabase is not configured.
 */
export function getClient(): SupabaseClient | null {
  if (_client !== undefined) return _client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    _client = null
    return null
  }
  _client = createSupabaseClient(url, key)
  return _client
}

/** Use when you require Supabase (e.g. server scripts); throws if env is missing. */
export function createClient(): SupabaseClient {
  const client = getClient()
  if (!client) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY")
  return client
}
