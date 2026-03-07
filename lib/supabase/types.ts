export type WaitlistSignup = {
  id: string
  email: string
  source: string | null
  created_at: string
}

export type ReserveSignup = {
  id: string
  email: string | null
  source: string | null
  finish: "light" | "dark" | null
  created_at: string
}
