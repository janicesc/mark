# Meta (Facebook) Pixel – Step-by-Step Setup

This guide walks you through installing and verifying the Meta Pixel on the Mark landing page.

---

## Step 1: Create or get your Pixel ID

1. Go to [Meta Events Manager](https://business.facebook.com/events_manager).
2. Sign in with your Facebook account (use a Business account if you run ads).
3. Click **Connect Data Sources** (or **Add new data source**).
4. Choose **Web** and click **Connect**.
5. Select **Meta Pixel** and click **Connect**.
6. Name your pixel (e.g. `Mark Landing Page`) and enter your site URL.
7. Click **Create Pixel**. Meta will show your **Pixel ID** (e.g. `1234567890123456`). Copy it.

---

## Step 2: Add your Pixel ID to the project

The app reads the Pixel ID from an environment variable so it’s not committed to the repo.

1. In the project root, create or edit `.env.local` (this file is gitignored).
2. Add:

   ```bash
   NEXT_PUBLIC_META_PIXEL_ID=your-pixel-id-here
   ```

   Replace `your-pixel-id-here` with your actual Pixel ID (numbers only).

3. Restart the dev server so the new env is picked up:

   ```bash
   npm run dev
   ```

---

## Step 3: What’s already implemented

- **Base pixel** – The pixel script is loaded on every page via `components/meta-pixel.tsx` and included in `app/layout.tsx`. If `NEXT_PUBLIC_META_PIXEL_ID` is set, it loads the script and sends a **PageView** on each load.
- **Lead event** – When a user submits the waitlist form in `components/waitlist-banner.tsx`, a **Lead** event is sent with `content_name: "Waitlist signup"` so you can track conversions and build audiences.

No code changes are required for basic setup; only the env variable in Step 2.

---

## Step 4: Verify the pixel

1. Install the [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) (Chrome) or use Events Manager.
2. Open your site (e.g. `http://localhost:3000` or your production URL).
3. Click the Pixel Helper icon. You should see:
   - **PageView** when the page loads.
   - **Lead** when you submit the waitlist form.
4. In **Events Manager**, open your pixel and check **Test Events** (or **Overview**) to see events in real time.

### Test Events not showing in Events Manager

If **Test Events** doesn’t show your actions (e.g. Reserve or Join waitlist):

1. **Use the full URL**  
   In “Enter website URL” use **`https://v0-marklanding.vercel.app`** (include `https://`). Without the protocol, the test view may not load or match your site correctly.

2. **Test in a normal tab**  
   Keep the **Test Events** tab open in Events Manager, then open a **second tab** and go to `https://v0-marklanding.vercel.app`. Take the action (join waitlist or Reserve) in that second tab. Events are matched by browser; the iframe inside Test Events can block tracking.

3. **Disable ad blockers**  
   Ad blockers often block `connect.facebook.net` and prevent the pixel from loading. Test in a window with extensions disabled or use an incognito window with no extensions.

4. **Confirm the pixel on the page**  
   On your site, open **View Page Source** and search for `960369136415593`. You should see it in the script in the `<head>`. If it’s missing, the latest deployment may not be live yet.

5. **Use Meta Pixel Helper**  
   On your site tab, open the Pixel Helper. You should see **PageView** on load and **Lead** after submitting the waitlist or clicking Reserve. If Lead never appears, the event isn’t firing; if it appears there but not in Test Events, the issue is usually URL, ad blocker, or testing inside the iframe.

---

## Step 5: (Optional) Track more events

To send other standard or custom events from client code, use the helpers in `lib/meta-pixel.ts`:

```ts
import { trackMetaEvent, trackMetaLead } from "@/lib/meta-pixel"

// Standard event: Lead
trackMetaLead({ content_name: "Waitlist signup" })

// Other standard events
trackMetaEvent("ViewContent", { content_name: "Product page" })
trackMetaEvent("CompleteRegistration", { content_name: "Signup" })

// Custom event
trackMetaEvent("CustomEventName", { key: "value" })
```

Call these from client components (e.g. in `onClick` or after async actions). The pixel must be loaded (page has been visited and `NEXT_PUBLIC_META_PIXEL_ID` is set) for events to send.

---

## Step 6: Production (e.g. Vercel)

1. In your hosting dashboard (e.g. Vercel), open your project **Settings → Environment Variables**.
2. Add:
   - **Name:** `NEXT_PUBLIC_META_PIXEL_ID`
   - **Value:** your Pixel ID
3. Redeploy so the new variable is applied. The same pixel will run on production and track PageView and Lead as above.

---

## Summary

| Step | Action |
|------|--------|
| 1 | Create a pixel in Meta Events Manager and copy the Pixel ID. |
| 2 | Set `NEXT_PUBLIC_META_PIXEL_ID=your-id` in `.env.local` and restart the dev server. |
| 3 | Use the site; PageView and waitlist Lead are already implemented. |
| 4 | Verify with Meta Pixel Helper and Events Manager. |
| 5 | (Optional) Add more events via `lib/meta-pixel.ts`. |
| 6 | Add the same env var in production and redeploy. |

For more on events and parameters, see [Meta Pixel – Standard Events](https://developers.facebook.com/docs/meta-pixel/reference).
