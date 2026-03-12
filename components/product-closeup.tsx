"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { trackMetaCustomEvent } from "@/lib/meta-pixel"

const variants = {
  silver: {
    src: "/images/mark-light-front.png",
    alt: "Mark device in silver finish - premium 3D render showing the scanner and reader body",
  },
  black: {
    src: "/images/mark-dark-front.png",
    alt: "Mark device in black finish - premium 3D render showing the scanner and reader body",
  },
}

export function ProductCloseup() {
  const [activeColor, setActiveColor] = useState<"silver" | "black">("silver")
  const [textRef, textVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
  const [imgRef, imgVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 })
  const [ctaRef, ctaVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.3 })

  return (
    <section className="bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-20 md:py-32">
        {/* Opal-style: content + image row */}
        <div className="flex flex-col md:flex-row items-stretch gap-12 md:gap-8 lg:gap-16">
          {/* Left: content (tight column, max 420–460px) */}
          <div
            ref={textRef}
            className="w-full md:w-[38%] shrink-0 flex flex-col"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "none" : "translateY(40px)",
              transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="max-w-[440px] w-full">
              <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground leading-tight text-balance">
                Uniquely designed{" "}
                <span className="block">for reading.</span>
              </h2>

              {/* Design cue: SLEEK. COMPACT. */}
              <p className="mt-10 text-sm md:text-base font-bold uppercase tracking-wider text-foreground">
                Sleek. Compact.
              </p>
              <p className="mt-3 text-muted-foreground text-sm md:text-base leading-relaxed">
                Mark is purpose-built for readers — a beautifully simple device that lives quietly inside your book.
                Wherever your next read takes you, it&apos;s already there.
              </p>

              <p className="mt-5 text-muted-foreground text-sm md:text-base leading-relaxed">
                With an intuitive scanner for paper and screens, an integrated microphone, and intelligent AI organization, Mark turns what you read into structured knowledge.
              </p>

              {/* Battery as micro feature highlight */}
              <div className="mt-6 pt-6 border-t border-border/60">
                <p className="text-sm font-bold uppercase tracking-wider text-foreground">
                  7+ days battery life
                </p>
                <p className="mt-1.5 text-muted-foreground text-sm md:text-base leading-relaxed">
                  Charge it once, forget about it — just you and the book, whenever you want.
                </p>
              </div>

              {/* Color swatches — closer to content flow, above CTA */}
              <div className="mt-8 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveColor("silver")}
                  className={`w-9 h-9 rounded-full border-2 transition-all duration-300 ${
                    activeColor === "silver"
                      ? "border-foreground/40 scale-110"
                      : "border-transparent hover:border-foreground/20"
                  }`}
                  aria-label="Silver"
                >
                  <span className="block w-full h-full rounded-full bg-gradient-to-br from-[#d4d4d4] to-[#a3a3a3]" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveColor("black")}
                  className={`w-9 h-9 rounded-full border-2 transition-all duration-300 ${
                    activeColor === "black"
                      ? "border-foreground/40 scale-110"
                      : "border-transparent hover:border-foreground/20"
                  }`}
                  aria-label="Black"
                >
                  <span className="block w-full h-full rounded-full bg-gradient-to-br from-[#404040] to-[#171717]" />
                </button>
              </div>

              {/* CTA — left-aligned with body and color section; microcopy centered under button */}
              <div ref={ctaRef} className="mt-6 inline-flex flex-col items-stretch" style={{
                opacity: ctaVisible ? 1 : 0,
                transform: ctaVisible ? "none" : "translateY(20px)",
                transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              }}>
                <Link
                  href="/reserve"
                  onClick={() => trackMetaCustomEvent("ReserveCTAClick", { source: "product_showcase" })}
                  className="inline-flex items-center justify-center bg-[#FFDB01] text-black px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#FFDB01]/90 transition-colors duration-300"
                >
                  Reserve & save
                </Link>
                <p className="mt-3 text-xs text-muted-foreground text-center">
                  $1 deposit • 25% off MSRP
                </p>
              </div>
            </div>
          </div>

          {/* Right: device — larger, lower, with depth */}
          <div
            ref={imgRef}
            className="w-full md:w-[62%] relative flex items-end justify-center min-w-0 md:pb-0"
            style={{
              opacity: imgVisible ? 1 : 0,
              transform: imgVisible ? "none" : "translateY(60px) scale(0.95)",
              transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            {/* Subtle radial gradient behind device for depth */}
            <div
              className="absolute inset-0 flex items-end justify-center pointer-events-none"
              aria-hidden
              style={{
                background: "radial-gradient(ellipse 70% 60% at 50% 85%, rgba(232, 227, 215, 0.5) 0%, rgba(226, 220, 207, 0.25) 40%, transparent 70%)",
              }}
            />
            {/* Device frame: scale up ~7%, allow bleed toward bottom */}
            <div
              className="relative w-full max-w-[520px] aspect-[1136/1420] flex items-end justify-center"
              style={{
                filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.12))",
              }}
            >
              <div className="relative w-full aspect-[1136/1420]">
                <Image
                  src={variants.silver.src}
                  alt={variants.silver.alt}
                  fill
                  className={`object-contain object-center transition-opacity duration-500 ease-in-out ${
                    activeColor === "silver" ? "opacity-100" : "opacity-0"
                  }`}
                  sizes="(max-width: 768px) 100vw, 960px"
                  priority
                  quality={90}
                />
                <Image
                  src={variants.black.src}
                  alt={variants.black.alt}
                  fill
                  className={`object-contain object-center transition-opacity duration-500 ease-in-out ${
                    activeColor === "black" ? "opacity-100" : "opacity-0"
                  }`}
                  sizes="(max-width: 768px) 100vw, 960px"
                  quality={90}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
