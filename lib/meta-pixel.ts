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

/** Fire Lead event (e.g. after waitlist signup). */
export function trackMetaLead(params?: Record<string, unknown>): void {
  trackMetaEvent("Lead", params)
}
