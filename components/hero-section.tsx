"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { HERO_VIDEO_SRC } from "@/lib/hero-video"
import { trackMetaCustomEvent } from "@/lib/meta-pixel"

/** Opal C1–style vertical scroll indicator (static; visual match to opalcamera.com hero) */
function HeroPaginationDots() {
  return (
    <div
      className="flex flex-col gap-0"
      aria-hidden="true"
      role="presentation"
    >
      {/* Active segment — tall white fill inside gray track */}
      <div className="mt-1 h-7 w-1 overflow-hidden rounded-[4px] bg-[#4C4C4C] transition-[height] duration-300 ease-out will-change-[height] lg:mt-2 lg:h-12">
        <div className="h-full w-full bg-white" />
      </div>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="mt-1 h-1 w-1 overflow-hidden rounded-[4px] bg-[#4C4C4C] transition-[height] duration-300 ease-out lg:mt-2"
        >
          <div
            className="h-full w-full bg-white opacity-0"
            style={{ transform: "translate3d(0, -100%, 0)" }}
          />
        </div>
      ))}
    </div>
  )
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  /** Muted inline autoplay + programmatic play — helps mobile start playback without lingering native play UI */
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const kick = () => {
      el.muted = true
      el.setAttribute("muted", "")
      void el.play().catch(() => {})
    }
    kick()
    el.addEventListener("loadeddata", kick)
    const onVis = () => {
      if (document.visibilityState === "visible") kick()
    }
    document.addEventListener("visibilitychange", onVis)
    return () => {
      el.removeEventListener("loadeddata", kick)
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [])

  const fade = (delay: string) =>
    ({
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translate3d(0, 0, 0)" : "translate3d(0, 12px, 0)",
      transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`,
    }) as const

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black">
      {/* Full-bleed video — product sits in lower frame like Opal C1 */}
      <video
        ref={videoRef}
        className="mark-decorative-video mark-hero-video absolute inset-0 h-full w-full object-cover object-[50%_35%]"
        src={HERO_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        fetchPriority="high"
        controls={false}
        controlsList="nodownload noplaybackrate nofullscreen"
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden="true"
      />
      {/* Readability: stronger bottom scrim on small screens so bottom-left copy sits on darker video */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/22 to-black/[0.86] max-md:via-black/32 md:from-black/45 md:via-black/18 md:to-black/78"
        aria-hidden="true"
      />

      {/* Left rail — keep z below nav (z-200): same z as nav + later DOM order was stealing clicks over hero */}
      <div className="pointer-events-none absolute left-0 top-0 z-40 hidden h-full w-14 mix-blend-difference md:block">
        <div className="sticky top-0 ml-3 flex h-[100svh] items-center">
          <HeroPaginationDots />
        </div>
      </div>

      {/* Mobile: bottom-left stack over darker scrim. md+: top-left grid like Opal desktop. */}
      <header
        id="mark-hero"
        className="pointer-events-none relative z-10 flex w-full flex-1 flex-col justify-end pb-10 pt-0 max-md:pb-[max(4.5rem,env(safe-area-inset-bottom,0px))] md:flex-none md:justify-start md:pt-[clamp(8rem,18vh,13rem)] md:pb-24"
      >
        <div
          id="mark-hero-content"
          className="pointer-events-auto mx-auto flex w-full max-w-6xl flex-col items-start px-6 text-left md:px-12 lg:px-20"
        >
          <div
            id="mark-hero-txt"
            className="max-w-[17.5rem] sm:max-w-xl md:max-w-[34rem] max-md:[text-shadow:0_2px_32px_rgba(0,0,0,0.55)]"
          >
            <h1
              id="mark-hero-txt-title"
              className="font-sans text-[clamp(1.85rem,6vw,4.25rem)] font-medium leading-[1.06] tracking-[-0.02em] text-white"
              style={fade("0.05s")}
            >
              World&apos;s First AI Highlighter
            </h1>
            <p
              id="mark-hero-txt-p"
              className="mt-4 text-lg font-normal leading-snug tracking-[-0.01em] text-white/88 sm:text-xl md:mt-5 md:text-2xl md:leading-8 md:text-white/78"
              style={fade("0.15s")}
            >
              Read once. Retrieve anytime.
            </p>
          </div>

          <div style={fade("0.28s")} className="mt-7 md:mt-10">
            <Link
              href="/reserve"
              onClick={() => trackMetaCustomEvent("ReserveCTAClick", { source: "hero" })}
              className="mark-cta hero-glass-cta"
            >
              Get early access
            </Link>
          </div>
        </div>
      </header>
    </section>
  )
}
