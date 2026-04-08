"use client"

import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const organizeUiShots = [
  {
    src: "/images/Organize_UI_1.png",
    alt: "Mark mobile app UI showing organized reading highlights and insights",
  },
  {
    src: "/images/Organize_UI_2.png",
    alt: "Mark mobile app UI showing searchable ideas and quote cards",
  },
  {
    src: "/images/Organize_UI_3.png",
    alt: "Mark mobile app UI showing personalized reading organization tools",
  },
]

export function OrganizeSection() {
  const [textRef, textVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
  const [imageRef, imageVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section className="border-t glass-divider-light bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-20 md:py-32">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
          {/* App UI screens showcase */}
          <div
            ref={imageRef}
            className="w-full md:w-[62%]"
            style={{
              opacity: imageVisible ? 1 : 0,
              transform: imageVisible ? "none" : "translateY(50px)",
              transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
            }}
          >
            <div className="flex w-full gap-5 overflow-x-auto pb-1 md:gap-8 md:overflow-visible">
              {organizeUiShots.map((shot) => (
                <div key={shot.src} className="relative min-w-[180px] flex-1 max-w-[230px] md:min-w-0 md:max-w-none">
                  <div className="relative w-full aspect-[9/19.5] overflow-hidden rounded-[22px]">
                    <Image src={shot.src} alt={shot.alt} fill className="object-contain" sizes="(max-width: 768px) 44vw, 20vw" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text content */}
          <div
            ref={textRef}
            className="w-full md:w-[40%] shrink-0 md:pl-6 lg:pl-10"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "none" : "translateY(40px)",
              transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4 font-medium">
              Organize
            </p>
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground leading-tight text-balance mb-6">
              All your ideas.{" "}
              <span className="block">Instantly searchable.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-sm">
              Search key ideas, generate AI-powered insights, and share
              meaningful quotes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
