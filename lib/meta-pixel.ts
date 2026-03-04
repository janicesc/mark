/**
 * Fire Meta Pixel events from client code.
 * Use for custom events like Lead (waitlist signup), ViewContent, etc.
 *
 * @see https://developers.facebook.com/docs/meta-pixel/reference
 */
declare global {
  interface Window {
    fbq?: (
      action: "track" | "trackCustom",
      eventName: string,
      params?: Record<string, unknown>
    ) => void
  }
}

export function trackMetaEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params)
  }
}

/** Fire Lead event (e.g. after waitlist signup, Reserve Now click). */
export function trackMetaLead(params?: Record<string, unknown>): void {
  trackMetaEvent("Lead", params)
}

/** Fire a custom event (for CTA clicks, etc.). */
export function trackMetaCustomEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", eventName, params)
  }
}
