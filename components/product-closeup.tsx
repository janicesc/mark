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
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-center">
          {/* Text content */}
          <div
            ref={textRef}
            className="order-first md:order-first"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "none" : "translateY(40px)",
              transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <h2 className="font-sans text-[clamp(1.5rem,4vw,2rem)] font-light leading-[1.3] text-[#000] mb-10">
              Uniquely designed{" "}
              <span className="block">for your reading.</span>
            </h2>

            <div className="flex flex-col gap-5 text-[#333] text-base leading-[1.65]">
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
            <div className="mt-10 flex items-center gap-4">
              <button
                type="button"
                onClick={() => setActiveColor("silver")}
                className={`w-10 h-10 rounded-full border-2 p-0 cursor-pointer transition-all duration-200 ${
                  activeColor === "silver"
                    ? "border-[#212121] shadow-[0_0_0_2px_#fff,0_0_0_4px_#212121]"
                    : "border-black/20 hover:border-black/40"
                }`}
                style={{
                  background: "linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 50%, #a0a0a0 100%)",
                }}
                aria-label="Silver"
              />
              <button
                type="button"
                onClick={() => setActiveColor("black")}
                className={`w-10 h-10 rounded-full border-2 p-0 cursor-pointer transition-all duration-200 ${
                  activeColor === "black"
                    ? "border-[#212121] shadow-[0_0_0_2px_#fff,0_0_0_4px_#212121]"
                    : "border-black/20 hover:border-black/40"
                }`}
                style={{
                  background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)",
                }}
                aria-label="Black"
              />
            </div>
          </div>

          {/* Product image */}
          <div
            ref={imgRef}
            className="relative flex items-center justify-center"
            style={{
              opacity: imgVisible ? 1 : 0,
              transform: imgVisible ? "none" : "translateY(60px) scale(0.95)",
              transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <div className="relative w-full min-h-[280px] md:min-h-[420px] flex items-center justify-center">
              <Image
                src={variants.silver.src}
                alt={variants.silver.alt}
                width={720}
                height={560}
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[min(90vw,680px)] md:max-w-[min(65vw,720px)] h-auto max-h-[520px] md:max-h-[560px] object-contain transition-opacity duration-350 ${
                  activeColor === "silver" ? "opacity-100 z-1" : "opacity-0"
                }`}
                priority
              />
              <Image
                src={variants.black.src}
                alt={variants.black.alt}
                width={720}
                height={560}
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[min(90vw,680px)] md:max-w-[min(65vw,720px)] h-auto max-h-[520px] md:max-h-[560px] object-contain transition-opacity duration-350 ${
                  activeColor === "black" ? "opacity-100 z-1" : "opacity-0"
                }`}
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
          <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#212121]">
            Sleek. Compact.
          </p>
          <p className="mt-3 text-xs md:text-sm uppercase tracking-wider text-[#85817F] leading-relaxed max-w-md">
            The Mark is just small enough to fit in your pocket. It works
            seamlessly with any book, e-reader, or screen.
          </p>
        </div>
      </div>
    </section>
  )
}
