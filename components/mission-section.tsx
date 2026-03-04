"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function MissionSection() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.25 })

  return (
    <section className="bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-20 md:py-32">
        <div
          ref={ref}
          className="max-w-2xl mx-auto text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(40px)",
            transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4 font-medium">
            Our Mission
          </p>
          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground leading-tight text-balance mb-10">
            Maximize the potential of every reader.
          </h2>
          <blockquote
            className="text-lg md:text-xl italic text-muted-foreground leading-relaxed mb-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "none" : "translateY(20px)",
              transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.25s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.25s",
            }}
          >
            “I got into reading and self-help books and wanted a tool that could
            organize and keep track of all my thoughts, notes, and insights. I hope
            Mark can do the same for other everyday readers.”
          </blockquote>
          <p
            className="text-base font-semibold text-foreground"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.45s",
            }}
          >
            — Eason Tang
          </p>
        </div>
      </div>
    </section>
  )
}
