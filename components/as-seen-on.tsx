"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const logos = [
  {
    name: "Morning Brew",
    style: "font-sans font-semibold text-sm md:text-base tracking-wide uppercase",
    icon: (
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4 md:w-5 md:h-5"
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
      <span className="text-sm md:text-base tracking-tight">
        {"tom's"}
        <span className="font-extrabold uppercase">Hardware</span>
      </span>
    ),
  },
  {
    name: "Digital Frontier",
    renderCustom: (
      <span className="text-sm md:text-base italic font-light tracking-wide text-[#c4d442]">
        +digital frontier
      </span>
    ),
  },
  {
    name: "Gizmodo",
    style: "font-sans font-black text-lg md:text-2xl tracking-tight uppercase",
  },
  {
    name: "Y",
    renderCustom: (
      <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-[#F26522] text-white font-bold text-lg md:text-xl">
        Y
      </span>
    ),
  },
  {
    name: "Product Hunt",
    renderCustom: (
      <span className="flex items-center gap-1.5 text-sm md:text-base font-medium tracking-tight">
        <span className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#DA552F] text-white text-xs font-bold">
          P
        </span>
        Product Hunt
      </span>
    ),
  },
]

export function AsSeenOn() {
  const [headRef, headVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.3 })
  const [logosRef, logosVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section className="w-full py-10 md:py-16 bg-[#F5F5F4]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 flex flex-col items-center gap-8 md:gap-12">
        <p
          ref={headRef}
          className="text-sm md:text-base text-[#333]/80 font-sans"
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "none" : "translateY(20px)",
            transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          As seen on
        </p>
        <div
          ref={logosRef}
          className="w-full flex flex-wrap items-center justify-center gap-8 md:gap-14 lg:gap-20"
          style={{
            opacity: logosVisible ? 0.5 : 0,
            transform: logosVisible ? "none" : "translateY(20px)",
            transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
          }}
        >
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center gap-1.5 text-[#212121] shrink-0"
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
