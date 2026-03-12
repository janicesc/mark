"use client"

import Image from "next/image"
import { useState, useEffect, useCallback, useRef } from "react"
import { Shield, Award, Handshake, Loader2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { trackMetaLead } from "@/lib/meta-pixel"

const productImages = [
  { src: "/images/mark-light-front.png", alt: "Mark device in silver finish, front view" },
  { src: "/images/mark-light-side.png", alt: "Mark device in silver finish, side view" },
  { src: "/images/mark-light-handheld.png", alt: "Silver Mark device held in hand" },
  { src: "/images/mark-dark-front.png", alt: "Mark device in black finish, front view" },
  { src: "/images/mark-dark-side.png", alt: "Mark device in black finish, side view" },
  { src: "/images/mark-dark-handheld.png", alt: "Black Mark device held in hand" },
  { src: "/images/smartest-bookmark.png", alt: "Mark device resting on a desk beside an open book" },
]

const guarantees = [
  { icon: Award, title: "100% Refund Guarantee", description: "If you cancel your reservation, we guarantee you a full refund at any time before production" },
  { icon: Handshake, title: "Transparency Guarantee", description: "We will be transparent about the progress of our project throughout the entire campaign" },
  { icon: Shield, title: "Secure Payment", description: "All orders are processed through our secure and private network" },
]

type Finish = "light" | "dark"

export function ReserveContent() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedFinish, setSelectedFinish] = useState<Finish | null>(null)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const finishSectionRef = useRef<HTMLDivElement>(null)
  const [infoRef, infoVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })
  const [trustRef, trustVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 })

  const handleFinishSelect = useCallback((finish: Finish) => {
    setSelectedFinish(finish)
    setCheckoutError(null)
    setActiveIndex(finish === "light" ? 0 : 3)
  }, [])

  const handleReserveClick = useCallback(async () => {
    setCheckoutError(null)
    if (!selectedFinish) {
      setCheckoutError("Please select Light or Dark finish.")
      finishSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
    setIsCheckingOut(true)
    trackMetaLead({ content_name: "Reserve Now" })

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ finish: selectedFinish }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Checkout failed")
      if (data.url) window.location.href = data.url
      else throw new Error("No checkout URL returned")
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsCheckingOut(false)
    }
  }, [selectedFinish])

  useEffect(() => {
    const timer = setInterval(() => setActiveIndex((prev) => (prev + 1) % productImages.length), 4000)
    return () => clearInterval(timer)
  }, [])

  const handleDotClick = useCallback((index: number) => setActiveIndex(index), [])

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20">
        <section className="bg-white min-h-[calc(100vh-80px)] pt-6 md:pt-10">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-[60%] xl:w-[62%] bg-[#fafafa]">
              <div className="relative w-full h-[52vh] sm:h-[60vh] lg:h-[calc(100vh-80px)] lg:sticky lg:top-20 flex items-center justify-center overflow-hidden lg:rounded-[8px]">
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
                    <div className="relative w-full max-w-[480px] aspect-[1136/1420]">
                      <Image src={img.src} alt={img.alt} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 960px" priority={i === 0} quality={90} />
                    </div>
                  </div>
                ))}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 hidden lg:flex">
                  {productImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleDotClick(i)}
                      className="group relative w-2.5 h-2.5 rounded-full transition-all duration-300"
                      style={{ backgroundColor: activeIndex === i ? "#212121" : "rgba(33,33,33,0.2)", transform: activeIndex === i ? "scale(1.15)" : "scale(1)" }}
                      aria-label={`View product image ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 mb-6 flex items-center justify-center gap-2 lg:hidden">
                {productImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDotClick(i)}
                    className="group relative w-2.5 h-2.5 rounded-full transition-all duration-300"
                    style={{ backgroundColor: activeIndex === i ? "#212121" : "rgba(33,33,33,0.2)", transform: activeIndex === i ? "scale(1.15)" : "scale(1)" }}
                    aria-label={`View product image ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="w-full lg:w-[40%] xl:w-[38%] flex flex-col bg-white lg:bg-[#fafafa]">
              <div ref={infoRef} className="flex-1 overflow-y-auto px-6 md:px-8 lg:px-10 py-8 lg:pt-7">
                <h1
                  className="hidden lg:block font-sans text-2xl md:text-3xl font-light tracking-tight text-black pb-6"
                  style={{ opacity: infoVisible ? 1 : 0, transform: infoVisible ? "none" : "translateY(12px)", transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s" }}
                >
                  <span className="text-black/20">Reserve your</span>
                  <br />
                  <span className="text-black">Mark</span>
                </h1>
                <p className="lg:hidden font-sans text-2xl font-medium text-foreground tracking-tight mb-6" style={{ opacity: infoVisible ? 1 : 0, transition: "opacity 0.5s ease" }}>
                  Reserve your Mark
                </p>

                <p className="text-2xl md:text-3xl font-semibold text-black mb-8" style={{ opacity: infoVisible ? 1 : 0, transition: "opacity 0.5s ease 0.15s" }}>
                  $1
                </p>

                <div
                  ref={finishSectionRef}
                  style={{ opacity: infoVisible ? 1 : 0, transition: "opacity 0.5s ease 0.2s" }}
                  className={checkoutError === "Please select Light or Dark finish." ? "rounded-[4px] ring-2 ring-red-500/80 ring-offset-2 p-2 -m-2" : ""}
                >
                  <span className="block text-sm font-semibold text-black mb-3">Choose your finish.</span>
                  {checkoutError === "Please select Light or Dark finish." && (
                    <p className="text-sm font-medium text-red-600 mb-2" role="alert">
                      Please select Light or Dark finish.
                    </p>
                  )}
                  <div className="flex flex-col gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => handleFinishSelect("light")}
                      className={`flex items-center gap-3 rounded-[4px] border-[1.34px] bg-white px-4 py-3 transition-shadow hover:border-[#dcdcdc] hover:shadow-[0_2px_4px_rgba(0,0,0,.05)] ${
                        selectedFinish === "light"
                          ? "border-[#dcdcdc] shadow-[0_2px_4px_rgba(0,0,0,.05)]"
                          : "border-black/[0.05]"
                      }`}
                    >
                      <div className="relative w-10 h-10">
                        <Image src="/images/mark-light-front.png" alt="Light" fill className="object-contain" sizes="80px" quality={90} />
                      </div>
                      <span className="text-sm font-medium text-black">Light</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFinishSelect("dark")}
                      className={`flex items-center gap-3 rounded-[4px] border-[1.34px] bg-white px-4 py-3 transition-shadow hover:border-[#dcdcdc] hover:shadow-[0_2px_4px_rgba(0,0,0,.05)] ${
                        selectedFinish === "dark"
                          ? "border-[#dcdcdc] shadow-[0_2px_4px_rgba(0,0,0,.05)]"
                          : "border-black/[0.05]"
                      }`}
                    >
                      <div className="relative w-10 h-10">
                        <Image src="/images/mark-dark-front.png" alt="Dark" fill className="object-contain" sizes="80px" quality={90} />
                      </div>
                      <span className="text-sm font-medium text-black">Dark</span>
                    </button>
                  </div>
                </div>

                <div className="h-px bg-black/10 my-10" style={{ opacity: infoVisible ? 1 : 0, transition: "opacity 0.5s ease 0.35s" }} />
                <div className="text-sm text-foreground/60 leading-relaxed text-left" style={{ opacity: infoVisible ? 1 : 0, transition: "opacity 0.5s ease 0.4s" }}>
                  <p>Secure your exclusive discount with a $1 deposit.</p>
                  <p>Lock in 25% off the $159 MSRP — yours for $119.25.</p>
                </div>
              </div>

              <div className="sticky bottom-0 left-0 border-t border-black/10 bg-white px-4 py-4 lg:px-4 lg:py-4 flex flex-col gap-3 w-full">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleReserveClick}
                    disabled={isCheckingOut}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 h-12 rounded-[4px] bg-black text-white text-sm font-semibold transition-colors duration-200 hover:bg-[#FFDB01] hover:text-black min-w-[140px] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Redirecting…
                      </>
                    ) : (
                      "Reserve Now"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fafafa]">
          <div ref={trustRef} className="mx-auto max-w-7xl px-6 md:px-8 py-14 md:py-20">
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
                      <h3 className="text-sm font-bold text-foreground tracking-wide">{g.title}</h3>
                    </div>
                    <p className="text-sm text-foreground/50 leading-relaxed">{g.description}</p>
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
