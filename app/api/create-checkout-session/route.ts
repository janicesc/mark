import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const RESERVATION_AMOUNT_CENTS = 100 // $1.00 deposit
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

    // Use selected finish (light/dark) so Stripe shows the correct product image in the order summary (right side)
    let finish: "light" | "dark" = "light"
    try {
      const body = await req.json()
      if (body?.finish === "dark" || body?.finish === "light") finish = body.finish
    } catch {
      // ignore invalid JSON
    }

    // When using a Stripe Price ID, Stripe uses the image on that Product — you can't override it.
    // So: (1) use two Price IDs (Light + Dark) and we pick the right one here, or
    // (2) leave STRIPE_PRICE_ID unset and we use price_data + product_data with our image URL.
    const priceIdLight = process.env.STRIPE_PRICE_ID_LIGHT || process.env.STRIPE_PRICE_ID
    const priceIdDark = process.env.STRIPE_PRICE_ID_DARK
    const productId = process.env.STRIPE_PRODUCT_ID

    // Image URL for Stripe Checkout. Must be publicly reachable: use HTTPS in production.
    // On localhost Stripe cannot fetch the image, so it will appear only when deployed.
    const productImage =
      origin && (origin.startsWith("http://") || origin.startsWith("https://"))
        ? `${origin}/images/mark-${finish}.png`
        : undefined

    const useStripeProduct =
      finish === "dark" && priceIdDark
        ? priceIdDark
        : priceIdLight

    const lineItems: Stripe.Checkout.SessionCreateParams["line_items"] = useStripeProduct
      ? [{ price: useStripeProduct, quantity: 1 }]
      : [
          {
            price_data: {
              currency: CURRENCY,
              unit_amount: RESERVATION_AMOUNT_CENTS,
              ...(productId
                ? { product: productId }
                : {
                    product_data: {
                      name: "Mark — Reserve your device",
                      description: "Secure your spot with a $1 deposit. Lock in $80 off the $150 MSRP — yours for just $70.",
                      images: productImage ? [productImage] : undefined,
                    },
                  }),
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
