"use client"

import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const screens = [
  {
    src: "/images/app-home.jpg",
    alt: "Mark app home screen showing recent highlights and reading activity",
  },
  {
    src: "/images/app-notes.jpg",
    alt: "Mark app notes view with organized categories and tags",
  },
  {
    src: "/images/app-share.jpg",
    alt: "Mark app share feature with a formatted quote card",
  },
]

export function OrganizeSection() {
  const [textRef, textVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
  const [phonesRef, phonesVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section className="bg-background overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center min-h-[50vh]">
          {/* Phone screens hub */}
          <div
            ref={phonesRef}
            className="order-first md:order-first"
            style={{
              opacity: phonesVisible ? 1 : 0,
              transform: phonesVisible ? "none" : "translateY(50px)",
              transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
          >
            <div className="flex items-end justify-center gap-3 min-h-[280px] md:min-h-[480px]">
              {screens.map((screen, i) => (
                <div
                  key={screen.alt}
                  className={`relative overflow-hidden shadow-2xl ${
                    i === 1
                      ? "w-[35%] aspect-[9/19] z-10"
                      : "w-[28%] aspect-[9/19]"
                  }`}
                  style={{
                    transform:
                      i === 0
                        ? "translateY(12px) rotate(-3deg)"
                        : i === 2
                          ? "translateY(12px) rotate(3deg)"
                          : "none",
                    opacity: phonesVisible ? (i === 1 ? 1 : 0.8) : 0,
                    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + i * 0.15}s`,
                  }}
                >
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 35vw, 20vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Text content */}
          <div
            ref={textRef}
            className="py-10"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "none" : "translateY(40px)",
              transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#85817F] mb-4">
              Organize
            </p>
            <h2 className="font-sans text-[32px] font-semibold leading-[40px] text-[#000] mb-6 md:leading-[50px]">
              All your ideas.{" "}
              <span className="block">Instantly searchable.</span>
            </h2>
            <p className="text-base text-[#333] leading-[1.65]">
              Search key ideas, generate AI-powered insights, and share
              meaningful quotes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
