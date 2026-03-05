# Stripe setup for the Reservation page

This guide walks you through enabling Stripe Checkout on the **Reserve** page so users can pay the $1 reservation deposit.

---

## 1. Create a Stripe account and get API keys

1. Sign up at [stripe.com](https://stripe.com) if you don’t have an account.
2. Open [Dashboard → API keys](https://dashboard.stripe.com/apikeys).
3. Copy your **Publishable key** (starts with `pk_test_` or `pk_live_`) and **Secret key** (starts with `sk_test_` or `sk_live_`).
4. Use **test** keys while developing; switch to **live** keys when you’re ready for real payments.

---

## 2. Add environment variables

Create or update `.env.local` in the project root (do not commit this file):

```bash
# Required for creating Checkout sessions
STRIPE_SECRET_KEY=sk_test_...

# Base URL for redirects (Stripe sends users here after payment or cancel)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

- **Development:** `NEXT_PUBLIC_APP_URL=http://localhost:3000`
- **Production:** set this to your real domain, e.g. `https://mark.engineering`

Optional:

```bash
# If you create a Product + Price in the Stripe Dashboard, set the Price ID here.
# If unset, the API creates a one-time $1 deposit using inline price_data.
STRIPE_PRICE_ID=price_...
```

---

## 3. (Optional) Create a Product and Price in Stripe

You can skip this step: the app works without it by sending `price_data` ($1 one-time deposit) to Stripe.

To use a fixed Price ID (e.g. for reporting or recurring use):

1. Go to [Stripe Dashboard → Products](https://dashboard.stripe.com/products).
2. Click **Add product**.
3. Name: e.g. **Mark — Reserve your device**.
4. One-time price: **$1.00 USD** (reservation deposit).
5. Save and copy the **Price ID** (e.g. `price_1ABC...`).
6. Set `STRIPE_PRICE_ID=price_1ABC...` in `.env.local`.

---

## 4. (Recommended) Set up the webhook to record reservations

When a customer completes checkout, Stripe can send a `checkout.session.completed` event to your app so you can store the reservation (e.g. in Supabase).

1. **Run the new migration** so `reserve_signups` has `stripe_session_id`:
   ```bash
   npx supabase db push
   ```
   Or apply `supabase/migrations/20250305000000_reserve_signups_stripe_session.sql` in your Supabase project.

2. **Expose your webhook URL** for local dev using the [Stripe CLI](https://docs.stripe.com/stripe-cli):
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   The CLI will print a **webhook signing secret** (e.g. `whsec_...`). Add it to `.env.local`:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

3. **In production**, add an endpoint in [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks):
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`
   - Copy the **Signing secret** and set `STRIPE_WEBHOOK_SECRET` in your production env.

With this in place, completed checkouts are written to `reserve_signups` (email, `source: "stripe"`, `stripe_session_id`). Supabase env vars must be set for inserts to run.

---

## 5. Run the app and test

1. From the project root: `npm run dev`.
2. (Optional) In another terminal: `stripe listen --forward-to localhost:3000/api/webhooks/stripe` and add the printed `STRIPE_WEBHOOK_SECRET` to `.env.local`.
3. Open [http://localhost:3000/reserve](http://localhost:3000/reserve).
4. Click **Reserve Now**. You should be redirected to Stripe Checkout.
5. Use [Stripe test cards](https://docs.stripe.com/testing#cards), e.g. **4242 4242 4242 4242**.
5. After paying, you should land on `/reserve/success`. If you cancel on Stripe’s page, you return to `/reserve?canceled=1`.

---

## 6. Production checklist

- [ ] Replace test keys with **live** keys in your production environment.
- [ ] Set `NEXT_PUBLIC_APP_URL` to your production URL (e.g. `https://mark.engineering`).
- [ ] Webhook is configured (see step 4); `STRIPE_WEBHOOK_SECRET` is set in production and the endpoint is added in Stripe Dashboard.
- [ ] In Stripe Dashboard, complete [activation](https://dashboard.stripe.com/settings/account) so you can accept live payments.

---

## What’s implemented

| Piece | Location |
|--------|----------|
| Create Checkout Session | `app/api/create-checkout-session/route.ts` |
| Stripe webhook (record reservation) | `app/api/webhooks/stripe/route.ts` |
| Reserve Now button → Stripe | `components/reserve-content.tsx` |
| Success page | `app/reserve/success/page.tsx` |
| Cancel redirect | Back to `/reserve?canceled=1` |

The **Reserve Now** button calls `POST /api/create-checkout-session`, which creates a Stripe Checkout Session and returns its URL; the client then redirects the user to Stripe’s hosted payment page.
