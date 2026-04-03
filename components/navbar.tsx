"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { trackMetaCustomEvent } from "@/lib/meta-pixel"
import { useScrollToAnchor } from "@/hooks/use-scroll-to-anchor"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"
  const scrollToAnchor = useScrollToAnchor()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* On home page: white text when at top (over dark hero video), dark text when scrolled.
     On other pages (e.g. /reserve): always dark text, white bg at top, blurred bg when scrolled. */
  const useDarkText = scrolled || !isHome

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-black/10 shadow-sm"
          : !isHome
            ? "bg-background border-b border-black/10"
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
            onClick={(e) => scrollToAnchor(e, "how-it-works")}
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
              scrollToAnchor(e, "community")
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
            className="mark-cta mark-cta-nav-silver px-5 py-2.5 text-sm"
          >
            Reserve for $1
          </Link>
        </nav>
        {/* Mobile: Reserve CTA at top right */}
        <Link
          href="/reserve"
          onClick={() => trackMetaCustomEvent("ReserveCTAClick", { source: "navbar_mobile" })}
          className="mark-cta mark-cta-nav-silver md:hidden px-4 py-2 text-sm shrink-0"
        >
          Reserve for $1
        </Link>
      </div>
    </header>
  )
}
