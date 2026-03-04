"use client"

import { useState } from "react"
import Image from "next/image"

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

  const current = variants[activeColor]

  return (
    <section className="bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-8 lg:gap-16">
          {/* Text content */}
          <div className="w-full md:w-[38%] shrink-0">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-foreground leading-tight text-balance">
              Uniquely designed{" "}
              <span className="block">for your reading.</span>
            </h2>

            <div className="mt-8 flex flex-col gap-5 text-muted-foreground text-sm md:text-base leading-relaxed max-w-sm">
              <p>
                Mark is the remarkably small, reading-dedicated scanning device
                designed to capture and organize your thoughts.
              </p>
              <p>
                It comes with an intuitive scanner that works on paper and
                screens, voice and typed note recording, and AI-powered
                knowledge organization built in.
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
          <div className="w-full md:w-[62%] relative flex items-center justify-center">
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
        <div className="mt-16 md:mt-24 max-w-xl">
          <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-foreground">
            Sleek. Compact.
          </p>
          <p className="mt-3 text-xs md:text-sm uppercase tracking-wider text-muted-foreground leading-relaxed max-w-md">
            The Mark is just small enough to fit in your pocket. It works
            seamlessly with any book, e-reader, or screen.
          </p>
        </div>
      </div>
    </section>
  )
}
