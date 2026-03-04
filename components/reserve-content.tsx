"use client"

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { Shield, Award, Handshake, Minus, Plus } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const productImages = [
  {
    src: "/images/mark-light.png",
    alt: "Mark device in silver finish, three-quarter view",
  },
  {
    src: "/images/mark-dark.png",
    alt: "Mark device in black finish",
  },
  {
    src: "/images/mark-light-handheld.png",
    alt: "Silver Mark device held in hand, showing compact form factor",
  },
  {
    src: "/images/mark-dark-handheld.png",
    alt: "Black Mark device held in hand, showing compact form factor",
  },
  {
    src: "/images/smartest-bookmark.png",
    alt: "The Smartest bookmark - Mark device resting on a desk beside an open book",
  },
]

const guarantees = [
  {
    icon: Award,
    title: "100% Refund Guarantee",
    description:
      "If you cancel your reservation, we guarantee you a full refund at any time before production",
  },
  {
    icon: Handshake,
    title: "Transparency Guarantee",
    description:
      "We will be transparent about the progress of our project throughout the entire campaign",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description:
      "All orders are processed through our secure and private network",
  },
]

const UNIT_PRICE = 70

export function ReserveContent() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [silverQty, setSilverQty] = useState(1)
  const [blackQty, setBlackQty] = useState(0)
  const [infoRef, infoVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })
  const [trustRef, trustVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 })

  const totalQty = silverQty + blackQty
  const totalPrice = totalQty * UNIT_PRICE

  // Auto-advance gallery
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % productImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const handleDotClick = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  return (
    <>
      <Navbar />

      <main className="pt-20">
        {/* Opal-style checkout layout */}
        <section className="bg-[#fafafa] min-h-[calc(100vh-80px)]">
          <div className="flex flex-col lg:flex-row">
            {/* Left: Product image gallery - Opal-style light grey */}
            <div className="w-full lg:w-[60%] xl:w-[62%] bg-[#fafafa]">
              <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[calc(100vh-80px)] lg:sticky lg:top-20 flex items-center justify-center overflow-hidden lg:rounded-[8px]">
                {/* Image carousel */}
                {productImages.map((img, i) => (
                  <div
                    key={img.src}
                    className="absolute inset-0 flex items-center justify-center p-8 md:p-16 lg:p-20"
                    style={{
                      opacity: activeIndex === i ? 1 : 0,
                      transform: activeIndex === i ? "scale(1)" : "scale(1.02)",
                      transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    {/* Fixed frame so Light (mark-light) and Dark (mark-dark) stay identical in size */}
                    <div className="relative w-full max-w-[480px] aspect-[1136/1420]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        priority={i === 0}
                      />
                    </div>
                  </div>
                ))}

                {/* Dot indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {productImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleDotClick(i)}
                      className="group relative w-2.5 h-2.5 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: activeIndex === i ? "#212121" : "rgba(33,33,33,0.2)",
                        transform: activeIndex === i ? "scale(1.15)" : "scale(1)",
                      }}
                      aria-label={`View product image ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Product config panel - Opal Tadpole style */}
            <div className="w-full lg:w-[40%] xl:w-[38%] flex flex-col bg-white lg:bg-[#fafafa]">
              <div
                ref={infoRef}
                className="flex-1 overflow-y-auto px-6 md:px-8 lg:px-10 py-8 lg:pt-7"
              >
                {/* Purchase heading - Opal style */}
                <h1
                  className="hidden lg:block font-sans text-2xl md:text-3xl font-light tracking-tight text-black pb-10"
                  style={{
                    opacity: infoVisible ? 1 : 0,
                    transform: infoVisible ? "none" : "translateY(12px)",
                    transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
                  }}
                >
                  <span className="text-black/20">Purchase your</span>
                  <br />
                  <span className="text-black">Mark</span>
                </h1>

                <p
                  className="lg:hidden font-sans text-2xl font-medium text-foreground tracking-tight mb-6"
                  style={{
                    opacity: infoVisible ? 1 : 0,
                    transition: "opacity 0.5s ease",
                  }}
                >
                  Reserve your Mark
                </p>

                {/* Choose your finish - Opal style */}
                <span
                  className="block text-sm font-semibold text-black mb-3"
                  style={{ opacity: infoVisible ? 1 : 0, transition: "opacity 0.5s ease 0.15s" }}
                >
                  Choose your finish.
                </span>

                {/* Light finish card */}
                <div
                  className="group relative flex items-center justify-between rounded-[4px] border-[1.34px] border-black/[0.05] bg-white cursor-pointer transition-shadow duration-200 hover:border-[#dcdcdc] hover:shadow-[0_2px_4px_rgba(0,0,0,.05)] h-[80px] lg:h-[120px] mb-1 px-4 lg:px-5"
                  style={{ opacity: infoVisible ? 1 : 0, transition: "opacity 0.5s ease 0.2s" }}
                  onClick={() => setActiveIndex(0)}
                >
                  <div className="flex items-center gap-4 md:gap-5">
                    <div className="relative w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16">
                      <Image
                        src="/images/mark-light.png"
                        alt="Mark Light"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-black text-sm lg:text-base font-medium">
                      Light
                    </p>
                  </div>
                  <div className="flex w-[112px] items-center justify-between gap-2">
                    <button
                      type="button"
                      aria-label="Decrease Light quantity"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSilverQty((q) => Math.max(0, q - 1))
                      }}
                      className="group/btn h-8 w-8 shrink-0 rounded-full border border-black/[0.05] bg-[#fafafa] transition-colors hover:bg-black hover:border-black/20 active:bg-[#343434] flex items-center justify-center"
                    >
                      <Minus className="h-2.5 w-2.5 text-black group-hover/btn:text-white transition-colors" strokeWidth={2} />
                    </button>
                    <span className="relative w-8 text-center text-[20px] font-medium text-black tabular-nums">
                      {silverQty}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase Light quantity"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSilverQty((q) => q + 1)
                      }}
                      className="group/btn h-8 w-8 shrink-0 rounded-full border border-black/[0.05] bg-[#fafafa] transition-colors hover:bg-black hover:border-black/20 active:bg-[#343434] flex items-center justify-center"
                    >
                      <Plus className="h-2.5 w-2.5 text-black group-hover/btn:text-white transition-colors" strokeWidth={2} />
                    </button>
                  </div>
                </div>

                {/* Dark finish card */}
                <div
                  className="group relative flex items-center justify-between rounded-[4px] border-[1.34px] border-black/[0.05] bg-white cursor-pointer transition-shadow duration-200 hover:border-[#dcdcdc] hover:shadow-[0_2px_4px_rgba(0,0,0,.05)] h-[80px] lg:h-[120px] px-4 lg:px-5"
                  style={{ opacity: infoVisible ? 1 : 0, transition: "opacity 0.5s ease 0.25s" }}
                  onClick={() => setActiveIndex(1)}
                >
                  <div className="flex items-center gap-4 md:gap-5">
                    <div className="relative w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16">
                      <Image
                        src="/images/mark-dark.png"
                        alt="Mark Dark"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-black text-sm lg:text-base font-medium">
                      Dark
                    </p>
                  </div>
                  <div className="flex w-[112px] items-center justify-between gap-2">
                    <button
                      type="button"
                      aria-label="Decrease Dark quantity"
                      onClick={(e) => {
                        e.stopPropagation()
                        setBlackQty((q) => Math.max(0, q - 1))
                      }}
                      className="group/btn h-8 w-8 shrink-0 rounded-full border border-black/[0.05] bg-[#fafafa] transition-colors hover:bg-black hover:border-black/20 active:bg-[#343434] flex items-center justify-center"
                    >
                      <Minus className="h-2.5 w-2.5 text-black group-hover/btn:text-white transition-colors" strokeWidth={2} />
                    </button>
                    <span className="relative w-8 text-center text-[20px] font-medium text-black tabular-nums">
                      {blackQty}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase Dark quantity"
                      onClick={(e) => {
                        e.stopPropagation()
                        setBlackQty((q) => q + 1)
                      }}
                      className="group/btn h-8 w-8 shrink-0 rounded-full border border-black/[0.05] bg-[#fafafa] transition-colors hover:bg-black hover:border-black/20 active:bg-[#343434] flex items-center justify-center"
                    >
                      <Plus className="h-2.5 w-2.5 text-black group-hover/btn:text-white transition-colors" strokeWidth={2} />
                    </button>
                  </div>
                </div>

                {/* Shipping / tax - Opal style */}
                <div
                  className="text-center text-sm font-medium leading-6 text-[#999999] mt-10 lg:mt-11"
                  style={{ opacity: infoVisible ? 1 : 0, transition: "opacity 0.5s ease 0.3s" }}
                >
                  <p>We ship worldwide.</p>
                  <p>Taxes are calculated at next step.</p>
                </div>

                {/* Divider */}
                <div className="h-px bg-black/10 my-10" style={{ opacity: infoVisible ? 1 : 0, transition: "opacity 0.5s ease 0.35s" }} />

                {/* Short description */}
                <div
                  className="text-sm text-foreground/60 leading-relaxed"
                  style={{ opacity: infoVisible ? 1 : 0, transition: "opacity 0.5s ease 0.4s" }}
                >
                  <p>Secure your exclusive discount with a $10 deposit. Lock in $80 off our $150 MSRP.</p>
                </div>
              </div>

              {/* Sticky footer - Opal style */}
              <div className="sticky bottom-0 left-0 border-t border-black/10 bg-white px-4 py-4 lg:px-4 lg:py-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <div className="flex items-center justify-between sm:block">
                  <span className="text-lg lg:text-2xl font-medium text-black">${totalPrice}</span>
                  {totalQty > 0 && (
                    <span className="text-sm text-black/50">
                      {totalQty} {totalQty === 1 ? "unit" : "units"} · $70 each
                    </span>
                  )}
                </div>
                <a
                  href="https://mark.engineering/reserve"
                  className="flex-1 sm:flex-initial flex items-center justify-center h-12 rounded-[4px] bg-black text-white text-sm font-semibold transition-colors duration-200 hover:bg-[#FFDB01] hover:text-black min-w-[140px]"
                >
                  Reserve Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-[#fafafa]">
          <div
            ref={trustRef}
            className="mx-auto max-w-7xl px-6 md:px-8 py-14 md:py-20"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-8">
              {guarantees.map((g, i) => (
                <div
                  key={g.title}
                  style={{
                    opacity: trustVisible ? 1 : 0,
                    transform: trustVisible ? "none" : "translateY(24px)",
                    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.12}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.12}s`,
                  }}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <g.icon className="h-5 w-5 text-foreground/40 shrink-0" strokeWidth={1.5} />
                      <h3 className="text-sm font-bold text-foreground tracking-wide">
                        {g.title}
                      </h3>
                    </div>
                    <p className="text-sm text-foreground/50 leading-relaxed">
                      {g.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
