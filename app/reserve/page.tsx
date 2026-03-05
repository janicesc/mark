import { ReserveContent } from "@/components/reserve-content"
import type { Metadata } from "next"

// Prevent static caching so live site always shows latest content
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Reserve & Save 50% | Mark",
  description:
    "Secure your exclusive discount on Mark with a $1 deposit. Lock in $80 off our $150 MSRP.",
}

export default function ReservePage() {
  return <ReserveContent />
}
