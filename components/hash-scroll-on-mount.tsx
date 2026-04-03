"use client"

import { useEffect } from "react"

/** After client navigation to `/#id`, scroll to the target (Next.js does not always do this). */
export function HashScrollOnMount() {
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const run = () => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    const t = window.setTimeout(run, 0)
    return () => clearTimeout(t)
  }, [])
  return null
}
