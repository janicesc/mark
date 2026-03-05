import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@/lib/supabase/client"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set")
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    )
  }

  let event: Stripe.Event
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 })
  }

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("Stripe webhook signature verification failed:", message)
    return NextResponse.json({ error: `Webhook signature verification failed: ${message}` }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const email = session.customer_email ?? session.customer_details?.email ?? null
    const sessionId = session.id

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        const supabase = createClient()
        const { error } = await supabase.from("reserve_signups").insert({
          email: email || undefined,
          source: "stripe",
          stripe_session_id: sessionId,
        })

        if (error) {
          if (error.code === "23505") {
            // Unique violation = already recorded (idempotent)
            return NextResponse.json({ received: true })
          }
          console.error("Supabase insert error:", error)
          return NextResponse.json(
            { error: "Failed to record reservation" },
            { status: 500 }
          )
        }
      } catch (err) {
        console.error("Webhook handler error:", err)
        return NextResponse.json(
          { error: "Internal error" },
          { status: 500 }
        )
      }
    }
    return NextResponse.json({ received: true })
  }

  return NextResponse.json({ received: true })
}
