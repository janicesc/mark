"use client"

import { useState } from "react"
import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const variants = {
  silver: {
    src: "/images/mark-light.png",
    alt: "Mark device in silver finish - premium 3D render showing the scanner and reader body",
  },
  black: {
    src: "/images/mark-dark.png",
    alt: "Mark device in black finish - premium 3D render showing the scanner and reader body",
  },
}

export function ProductCloseup() {
  const [activeColor, setActiveColor] = useState<"silver" | "black">("silver")
  const [textRef, textVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
  const [imgRef, imgVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 })
  const [tagRef, tagVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.3 })

  return (
    <section className="bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-8 lg:gap-16">
          {/* Text content */}
          <div
            ref={textRef}
            className="w-full md:w-[38%] shrink-0"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "none" : "translateY(40px)",
              transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-foreground leading-tight text-balance">
              Uniquely designed{" "}
              <span className="block">for your reading.</span>
            </h2>

            <div className="mt-8 flex flex-col gap-5 text-muted-foreground text-sm md:text-base leading-relaxed max-w-sm">
              <p>
                Mark is a compact device built for readers — designed to capture
                highlights, record ideas, and organize what you learn as you read.
              </p>
              <p>
                With an intuitive scanner that works on paper and screens, voice
                and typed notes, and built-in AI organization, Mark turns your
                reading into structured knowledge.
              </p>
            </div>

            {/* Color toggles */}
            <div className="mt-10 flex items-center gap-3">
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
          </div>

          {/* Product image */}
          <div
            ref={imgRef}
            className="w-full md:w-[62%] relative flex items-center justify-center"
            style={{
              opacity: imgVisible ? 1 : 0,
              transform: imgVisible ? "none" : "translateY(60px) scale(0.95)",
              transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <div className="relative w-full max-w-lg md:max-w-none aspect-[4/5]">
              {/* Silver variant */}
              <Image
                src={variants.silver.src}
                alt={variants.silver.alt}
                fill
                className={`object-contain transition-opacity duration-500 ease-in-out ${
                  activeColor === "silver" ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
              {/* Black variant */}
              <Image
                src={variants.black.src}
                alt={variants.black.alt}
                fill
                className={`object-contain transition-opacity duration-500 ease-in-out ${
                  activeColor === "black" ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
          </div>
        </div>

        {/* Tagline below */}
        <div
          ref={tagRef}
          className="mt-16 md:mt-24 max-w-xl"
          style={{
            opacity: tagVisible ? 1 : 0,
            transform: tagVisible ? "none" : "translateY(30px)",
            transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-foreground">
            Sleek. Compact.
          </p>
          <p className="mt-3 text-xs md:text-sm uppercase tracking-wider text-muted-foreground leading-relaxed max-w-md">
            Mark rests quietly inside your book — wherever your next read takes
            you. Works seamlessly with books, e-readers, and screens.
          </p>
        </div>
      </div>
    </section>
  )
}
