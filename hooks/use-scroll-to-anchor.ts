"use client"

import { useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"

/**
 * Same behavior as navbar in-page anchors: smooth scroll on home, navigate to /#id from other routes.
 * Next.js <Link href="/#id"> does not reliably scroll to the element on the home page.
 */
export function useScrollToAnchor() {
  const pathname = usePathname()
  const router = useRouter()

  return useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault()
      if (pathname !== "/") {
        router.push(`/#${targetId}`)
        return
      }
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    },
    [pathname, router],
  )
}
