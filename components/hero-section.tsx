"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero-latest.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8 w-full py-32 md:py-40">
        <div className="max-w-2xl">
          <p
            className="text-sm md:text-base uppercase tracking-widest text-white/70 mb-5 font-medium"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(30px)",
              transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            The World{"'"}s First AI Bookmark
          </p>
          <h1
            className="font-sans text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-white leading-tight mb-6"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(30px)",
              transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
            }}
          >
            Read once.{" "}
            <span className="block">Retrieve anytime.</span>
          </h1>
          <p
            className="text-base md:text-lg text-white/70 leading-relaxed max-w-md mb-10"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(30px)",
              transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.6s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
            }}
          >
            You underline something powerful — but do you remember it?
            <br />
            Mark turns every highlight into searchable, lasting insights.
          </p>
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(20px)",
              transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.8s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.8s",
            }}
          >
            <Link
              href="/reserve"
              className="inline-flex items-center gap-2.5 bg-white text-black px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors duration-300"
            >
              <ArrowRight className="h-4 w-4" />
              Get early access
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
