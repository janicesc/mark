"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function CaptureSection() {
  const [showDigital, setShowDigital] = useState(false)
  const [sectionRef, sectionVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
  const [flipRef, flipVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.3 })

  // Auto-flip when the card becomes visible
  useEffect(() => {
    if (!flipVisible) return
    const interval = setInterval(() => {
      setShowDigital((prev) => !prev)
    }, 3500)
    return () => clearInterval(interval)
  }, [flipVisible])

  return (
    <section className="bg-background overflow-hidden">
      <div ref={sectionRef} className="mx-auto max-w-7xl px-6 md:px-8 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Text content */}
          <div
            className="w-full md:w-[40%] shrink-0"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "none" : "translateY(40px)",
              transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4 font-medium">
              Capture
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-foreground leading-tight text-balance mb-6">
              Capture with ease:{" "}
              <span className="block">physical or digital.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-sm">
              Wherever you read — from eBooks to paperbacks — Mark captures it.
            </p>
          </div>

          {/* Flip media */}
          <div
            ref={flipRef}
            className="w-full md:w-[60%]"
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
                {/* Front: Physical */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Image
                    src="/images/physical-scan.jpg"
                    alt="Mark scanning highlighted text on a physical book"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </div>
                {/* Back: Digital */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden [transform:rotateY(180deg)]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Image
                    src="/images/digital-scan.jpg"
                    alt="Mark scanning text on an e-reader screen"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-3">
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    !showDigital ? "bg-foreground scale-100" : "bg-foreground/30 scale-75"
                  }`}
                />
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    showDigital ? "bg-foreground scale-100" : "bg-foreground/30 scale-75"
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
