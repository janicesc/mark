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
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Firefly_HeroVideo-mRi9NHxcY3s9KD53J7h9xNUJ2mkZLN.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(33,33,33,0.75) 0%, rgba(33,33,33,0.4) 50%, rgba(33,33,33,0.15) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[560px] w-full px-5 md:px-8 pt-[100px] md:pt-[120px]">
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-[0.12em] text-[#FFDB01] mb-4"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(30px)",
              transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            The World{"'"}s First AI Bookmark
          </p>
          <h1
            className="font-sans text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.25] text-white mb-6"
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
            className="text-base md:text-lg text-white/[0.95] leading-relaxed max-w-full mb-10"
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
              href="#reserve"
              className="inline-flex items-center gap-2.5 bg-[#FFDB01] text-black px-6 py-3.5 text-[0.9375rem] font-semibold hover:bg-[#E6C801] transition-all duration-200 hover:-translate-y-px"
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
