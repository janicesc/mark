"use client"

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { Shield, Award, Handshake } from "lucide-react"
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

export function ReserveContent() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [infoRef, infoVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })
  const [trustRef, trustVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 })

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
        <section className="bg-white min-h-[calc(100vh-80px)]">
          <div className="flex flex-col lg:flex-row">
            {/* Left: Product image gallery - takes majority of the space */}
            <div className="w-full lg:w-[60%] xl:w-[62%] bg-[#f5f1e5]">
              <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[calc(100vh-80px)] lg:sticky lg:top-20 flex items-center justify-center overflow-hidden">
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
                    <div className="relative w-full h-full max-w-[500px]">
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

            {/* Right: Product info panel - sticky */}
            <div className="w-full lg:w-[40%] xl:w-[38%]">
              <div
                ref={infoRef}
                className="lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] flex items-center"
              >
                <div className="w-full px-8 md:px-12 lg:px-14 xl:px-16 py-12 lg:py-0">
                  {/* Product name and subtitle */}
                  <div
                    style={{
                      opacity: infoVisible ? 1 : 0,
                      transform: infoVisible ? "none" : "translateY(20px)",
                      transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
                    }}
                  >
                    <p className="text-sm uppercase tracking-widest text-foreground/40 mb-2 font-medium">
                      Mark
                    </p>
                    <h1 className="font-serif text-3xl md:text-4xl font-normal text-foreground tracking-tight leading-tight">
                      {"Reserve & Save 50%"}
                    </h1>
                  </div>

                  {/* Price */}
                  <div
                    className="mt-6 flex items-baseline gap-3"
                    style={{
                      opacity: infoVisible ? 1 : 0,
                      transform: infoVisible ? "none" : "translateY(16px)",
                      transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
                    }}
                  >
                    <span className="text-2xl font-semibold text-foreground">$70</span>
                    <span className="text-base text-foreground/40 line-through">$150</span>
                  </div>

                  {/* Divider */}
                  <div
                    className="my-6"
                    style={{
                      opacity: infoVisible ? 1 : 0,
                      transition: "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.25s",
                    }}
                  >
                    <div className="w-full h-px bg-foreground/10" />
                  </div>

                  {/* Description */}
                  <div
                    style={{
                      opacity: infoVisible ? 1 : 0,
                      transform: infoVisible ? "none" : "translateY(16px)",
                      transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
                    }}
                  >
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      Secure your exclusive discount with a $10 deposit.
                    </p>
                    <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
                      {"You\u2019ll lock in $80 off our $150 MSRP \u2014 bringing your total to just $70."}
                    </p>
                  </div>

                  {/* Color selector dots */}
                  <div
                    className="mt-6 flex items-center gap-3"
                    style={{
                      opacity: infoVisible ? 1 : 0,
                      transform: infoVisible ? "none" : "translateY(12px)",
                      transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.35s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.35s",
                    }}
                  >
                    <button
                      className="w-7 h-7 rounded-full bg-gradient-to-br from-[#d4d4d4] to-[#e8e8e8] border-2 border-foreground/20 transition-all duration-200 hover:border-foreground/50"
                      onClick={() => setActiveIndex(0)}
                      aria-label="Silver color"
                    />
                    <button
                      className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#404040] border-2 border-transparent transition-all duration-200 hover:border-foreground/30"
                      onClick={() => setActiveIndex(3)}
                      aria-label="Black color"
                    />
                  </div>

                  {/* CTA Button - Opal style: black to yellow on hover */}
                  <div
                    className="mt-8"
                    style={{
                      opacity: infoVisible ? 1 : 0,
                      transform: infoVisible ? "none" : "translateY(16px)",
                      transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.45s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.45s",
                    }}
                  >
                    <a
                      href="https://mark.engineering/reserve"
                      className="group relative inline-flex items-center justify-center w-full h-14 rounded-[4px] bg-[#212121] text-white text-sm font-semibold tracking-wide uppercase overflow-hidden transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#f2e48d] hover:text-[#212121]"
                    >
                      <span className="relative z-10 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-[#212121]">
                        Reserve Now
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-[#f5f1e5]">
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
