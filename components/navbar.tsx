"use client"

import { useEffect, useState, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { trackMetaCustomEvent } from "@/lib/meta-pixel"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === "/"

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const smoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    if (pathname !== "/") {
      router.push(`/#${targetId}`)
      return
    }
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [pathname, router])

  /* On home page: white text when at top (over dark hero video), dark text when scrolled.
     On other pages (e.g. /reserve): always dark text, white bg at top, blurred bg when scrolled. */
  const useDarkText = scrolled || !isHome

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-foreground/10 shadow-sm"
          : !isHome
            ? "bg-white border-b border-black/10"
            : "bg-transparent border-b-0 border-b-transparent shadow-none"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 md:px-8 h-16 md:h-20">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/mark-logo.png"
            alt="Mark"
            width={120}
            height={28}
            className={`h-6 md:h-7 w-auto transition-all duration-300 ${
              useDarkText ? "" : "invert brightness-0"
            }`}
            priority
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#how-it-works"
            onClick={(e) => smoothScroll(e, "how-it-works")}
            className={`text-sm font-medium transition-colors duration-300 ${
              useDarkText
                ? "text-foreground/70 hover:text-foreground"
                : "text-white/70 hover:text-white"
            }`}
          >
            How it works
          </Link>
          <Link
            href="#community"
            onClick={(e) => {
              trackMetaCustomEvent("JoinWaitlistClick", { source: "navbar" })
              smoothScroll(e, "community")
            }}
            className={`text-sm font-medium transition-colors duration-300 ${
              useDarkText
                ? "text-foreground/70 hover:text-foreground"
                : "text-white/70 hover:text-white"
            }`}
          >
            Join waitlist
          </Link>
          <Link
            href="/reserve"
            onClick={() => trackMetaCustomEvent("ReserveCTAClick", { source: "navbar" })}
            className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 bg-[#FFDB01] text-black hover:bg-[#FFDB01]/90"
          >
            Reserve & save
          </Link>
        </nav>
      </div>
    </header>
  )
}
