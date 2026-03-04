"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const logos = [
  {
    name: "Morning Brew",
    style: "font-sans font-bold text-base md:text-lg tracking-wide uppercase text-foreground",
    icon: (
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5 md:w-6 md:h-6 shrink-0"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 13c0-3 2-5 4-5s4 2 4 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Tom's Hardware",
    renderCustom: (
      <span className="text-base md:text-lg tracking-tight font-semibold text-foreground">
        {"tom's"}
        <span className="font-extrabold uppercase"> Hardware</span>
      </span>
    ),
  },
  {
    name: "Digital Frontier",
    renderCustom: (
      <span className="text-base md:text-lg italic font-medium tracking-wide text-foreground">
        +digital frontier
      </span>
    ),
  },
  {
    name: "Gizmodo",
    style: "font-sans font-black text-lg md:text-xl tracking-tight uppercase text-foreground",
  },
  {
    name: "Y",
    renderCustom: (
      <span className="flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-sm bg-[#F26522] text-white font-bold text-lg md:text-xl shrink-0">
        Y
      </span>
    ),
  },
  {
    name: "Product Hunt",
    renderCustom: (
      <span className="flex items-center gap-2 text-base md:text-lg font-semibold tracking-tight text-foreground">
        <span className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#DA552F] text-white text-sm font-bold shrink-0">
          P
        </span>
        Product Hunt
      </span>
    ),
  },
]

export function AsSeenOn() {
  const [logosRef, logosVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div
          ref={logosRef}
          className="w-full flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between gap-x-8 md:gap-x-10 lg:gap-x-14 gap-y-4"
          style={{
            opacity: logosVisible ? 1 : 0,
            transform: logosVisible ? "none" : "translateY(20px)",
            transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
          }}
        >
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center gap-3 text-foreground min-h-[3.5rem] whitespace-nowrap"
            >
              {logo.renderCustom ? (
                logo.renderCustom
              ) : (
                <>
                  {logo.icon && logo.icon}
                  <span className={logo.style}>{logo.name}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
