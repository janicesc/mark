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

function ColorSwatches({
  activeColor,
  setActiveColor,
}: {
  activeColor: "silver" | "black"
  setActiveColor: (c: "silver" | "black") => void
}) {
  return (
    <div className="flex items-center gap-3">
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
  )
}

function ProductMetaAndCta({
  activeColor,
  setActiveColor,
  ctaRef,
  ctaVisible,
  batterySpacingClass,
}: {
  activeColor: "silver" | "black"
  setActiveColor: (c: "silver" | "black") => void
  /** Desktop only — omit on mobile so the outer mobile block owns scroll reveal */
  ctaRef?: React.RefObject<HTMLDivElement | null>
  ctaVisible?: boolean
  /** e.g. mt-8 when below copy on desktop; mt-0 when below product image on mobile */
  batterySpacingClass: string
}) {
  const ctaReveal = ctaRef != null && ctaVisible != null
  return (
    <>
      <div className={`${batterySpacingClass} pt-7 border-t glass-divider-light`}>
        <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.14em] text-foreground/80">
          7+ days battery life
        </p>
        <p className="mt-1.5 text-muted-foreground/90 text-xs md:text-sm leading-relaxed max-w-md">
          Charge it once, forget about it — just you and the book, whenever you want.
        </p>
      </div>

      {/* Swatches + (Reserve + deposit line) on md+: deposit centered under the button only */}
      <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-4 lg:gap-6">
        <div className="shrink-0 flex items-center">
          <ColorSwatches activeColor={activeColor} setActiveColor={setActiveColor} />
        </div>

        <div className="flex w-full flex-col items-center gap-3 md:w-auto md:shrink-0">
          <div
            ref={ctaRef ?? undefined}
            className="w-full md:w-auto"
            style={
              ctaReveal
                ? {
                    opacity: ctaVisible ? 1 : 0,
                    transform: ctaVisible ? "none" : "translateY(20px)",
                    transition:
                      "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  }
                : undefined
            }
          >
            <Link
              href={activeColor === "silver" ? "/reserve?finish=light" : "/reserve?finish=dark"}
              onClick={() => trackMetaCustomEvent("ReserveCTAClick", { source: "product_showcase" })}
              className="mark-cta mark-cta-on-light px-8 w-full md:w-auto inline-flex"
            >
              Reserve & save
            </Link>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            $1 deposit • 25% off MSRP
          </p>
        </div>
      </div>
    </>
  )
}

export function ProductCloseup() {
  const [activeColor, setActiveColor] = useState<"silver" | "black">("silver")
  const [textRef, textVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
  const [imgRef, imgVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 })
  const [ctaRef, ctaVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.3 })
  const [mobileMetaRef, mobileMetaVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section className="border-t glass-divider-light bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-stretch gap-12 md:gap-8 lg:gap-16">
          {/* Copy: heading + body only */}
          <div
            ref={textRef}
            className="w-full md:w-[38%] shrink-0 flex flex-col order-1 md:order-none"
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

              <p className="mt-10 text-sm md:text-base font-bold uppercase tracking-wider text-foreground">
                Sleek. Compact.
              </p>
              <p className="mt-3 text-muted-foreground text-sm md:text-base leading-relaxed">
                Mark is purpose-built for readers — a beautifully simple device that lives quietly inside your book.
                Wherever your next read takes you, it&apos;s already there.
              </p>

              <p className="mt-5 text-muted-foreground text-sm md:text-base leading-relaxed">
                With an intuitive scanner for paper and screens, an integrated microphone, and intelligent AI
                organization, Mark turns what you read into structured knowledge.
              </p>

              {/* Desktop: battery, swatches, CTA stay in left column under copy */}
              <div className="hidden md:block">
                <ProductMetaAndCta
                  activeColor={activeColor}
                  setActiveColor={setActiveColor}
                  ctaRef={ctaRef}
                  ctaVisible={ctaVisible}
                  batterySpacingClass="mt-8"
                />
              </div>
            </div>
          </div>

          {/* Product image — on mobile: directly under body copy */}
          <div
            ref={imgRef}
            className="order-2 md:order-none w-full md:w-[62%] relative flex items-end justify-center min-w-0 md:pb-0 mt-2 md:mt-0"
            style={{
              opacity: imgVisible ? 1 : 0,
              transform: imgVisible ? "none" : "translateY(60px) scale(0.95)",
              transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <div
              className="relative w-full max-w-[520px] aspect-[1136/1420] flex items-end justify-center md:[filter:drop-shadow(0_30px_60px_rgba(0,0,0,0.12))]"
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

          {/* Mobile only: battery, colorways, CTA below product image */}
          <div
            ref={mobileMetaRef}
            className="order-3 md:hidden w-full max-w-[440px] -mt-2"
            style={{
              opacity: mobileMetaVisible ? 1 : 0,
              transform: mobileMetaVisible ? "none" : "translateY(24px)",
              transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <ProductMetaAndCta
              activeColor={activeColor}
              setActiveColor={setActiveColor}
              batterySpacingClass="mt-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
