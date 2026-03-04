"use client"

import { useState } from "react"
import Image from "next/image"

export function CaptureSection() {
  const [showDigital, setShowDigital] = useState(false)

  return (
    <section className="bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Text content */}
          <div className="w-full md:w-[40%] shrink-0">
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
          <div className="w-full md:w-[60%]">
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
              <p className="mt-4 text-xs text-center text-muted-foreground/60">
                Click to flip
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
