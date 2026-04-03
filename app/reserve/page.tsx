import { Suspense } from "react"
import { ReserveContent } from "@/components/reserve-content"
import type { Metadata } from "next"

// Prevent static caching so live site always shows latest content
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Reserve & Save 25% | Mark",
  description:
    "Reserve your Mark AI bookmark with a $1 deposit. Lock in 25% off the $159 MSRP — yours for $119.25.",
}

export default function ReservePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" aria-hidden />}>
      <ReserveContent />
    </Suspense>
  )
}
