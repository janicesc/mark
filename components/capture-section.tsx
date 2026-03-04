"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function CaptureSection() {
  const [showDigital, setShowDigital] = useState(false)
  const [sectionRef, sectionVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
  const [flipRef, flipVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.3 })

  useEffect(() => {
    if (!flipVisible) return
    const interval = setInterval(() => {
      setShowDigital((prev) => !prev)
    }, 3500)
    return () => clearInterval(interval)
  }, [flipVisible])

  return (
    <section className="bg-background overflow-hidden">
      <div ref={sectionRef} className="mx-auto max-w-[1280px] px-5 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center min-h-[50vh]">
          {/* Text content */}
          <div
            className="py-10"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "none" : "translateY(40px)",
              transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#85817F] mb-4">
              Capture
            </p>
            <h2 className="font-sans text-[32px] font-semibold leading-[40px] text-[#000] mb-6 md:leading-[50px]">
              Capture with ease:{" "}
              <span className="block">physical or digital.</span>
            </h2>
            <p className="text-base text-[#333] leading-[1.65]">
              Wherever you read — from eBooks to paperbacks — Mark captures it.
            </p>
          </div>

          {/* Flip media */}
          <div
            ref={flipRef}
            style={{
              opacity: flipVisible ? 1 : 0,
              transform: flipVisible ? "none" : "translateY(50px)",
              transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
            }}
          >
            <div
              className="relative cursor-pointer perspective-[1200px]"
              onClick={() => setShowDigital((prev) => !prev)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setShowDigital((prev) => !prev)
              }}
              aria-label="Toggle between physical and digital scanning"
            >
              <div
                className={`relative w-full aspect-[3/2] transition-transform duration-700 ease-in-out ${
                  showDigital ? "[transform:rotateY(180deg)]" : ""
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute inset-0 overflow-hidden bg-[#F5F5F4]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Image
                    src="/images/physical-scan.jpg"
                    alt="Mark scanning highlighted text on a physical book"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div
                  className="absolute inset-0 overflow-hidden bg-[#F5F5F4] [transform:rotateY(180deg)]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Image
                    src="/images/digital-scan.jpg"
                    alt="Mark scanning text on an e-reader screen"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-3">
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    !showDigital ? "bg-[#212121] scale-100" : "bg-[#212121]/30 scale-75"
                  }`}
                />
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    showDigital ? "bg-[#212121] scale-100" : "bg-[#212121]/30 scale-75"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
