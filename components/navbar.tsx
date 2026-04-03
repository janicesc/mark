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
        <nav className="flex items-center gap-6 md:gap-8 shrink-0">
          <Link
            href="#how-it-works"
            onClick={(e) => scrollToAnchor(e, "how-it-works")}
            className={`hidden md:inline text-sm font-medium transition-colors duration-300 ${
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
            className={`hidden md:inline text-sm font-medium transition-colors duration-300 ${
              useDarkText
                ? "text-foreground/70 hover:text-foreground"
                : "text-white/70 hover:text-white"
            }`}
          >
            Join waitlist
          </Link>
          <Link
            href="/reserve"
            onClick={() =>
              trackMetaCustomEvent("ReserveCTAClick", {
                source:
                  typeof window !== "undefined" && window.innerWidth < 768 ? "navbar_mobile" : "navbar",
              })
            }
            className={`mark-cta mark-cta-nav-rect inline-flex h-10 min-h-[40px] items-center px-4 py-0 text-sm transition-colors duration-300 md:px-5 ${
              useDarkText ? "mark-cta-on-light" : "mark-cta-nav-silver mark-nav-reserve-join-glass-hover"
            }`}
          >
            Reserve for $1
          </Link>
        </nav>
      </div>
    </header>
  )
}
