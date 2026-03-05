import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const RESERVATION_AMOUNT_CENTS = 7000 // $70.00
const CURRENCY = "usd"

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured. Add STRIPE_SECRET_KEY to .env" },
        { status: 500 }
      )
    }

    const origin = process.env.NEXT_PUBLIC_APP_URL || req.headers.get("origin") || "http://localhost:3000"
    const successUrl = `${origin}/reserve/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${origin}/reserve?canceled=1`

    const lineItems: Stripe.Checkout.SessionCreateParams["line_items"] = process.env.STRIPE_PRICE_ID
      ? [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }]
      : [
          {
            price_data: {
              currency: CURRENCY,
              unit_amount: RESERVATION_AMOUNT_CENTS,
              product_data: {
                name: "Mark — Reserve your device",
                description: "Secure your exclusive discount. Lock in $80 off the $150 MSRP — yours for just $70.",
                images: req.headers.get("origin")
                  ? [`${origin}/images/mark-light.png`]
                  : undefined,
              },
            },
            quantity: 1,
          },
        ]

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      submit_type: "pay",
    })

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("Stripe checkout error:", err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
