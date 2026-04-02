"use client"

import { StepCard } from "@/components/step-card"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const steps = [
  {
    imageSrc: "/images/step-1.png",
    imageAlt: "Reader with Mark device scanning book pages",
    title: "Scan your pages",
    description:
      "Slip Mark into your book. Its camera silently scans the pages you just read — physical or digital text, it captures everything automatically.",
    rounded: "top-left" as const,
    stepNumber: 1,
    objectPosition: "center" as string | undefined,
  },
  {
    imageSrc: "/images/step-2.png",
    imageAlt: "Reader capturing voice notes and highlights with Mark",
    title: "Record your thoughts",
    description:
      "Voice notes, highlights, reactions — captured instantly. Mark turns your spoken thoughts into structured, searchable knowledge while the ideas are still fresh.",
    rounded: "none" as const,
    stepNumber: 2,
    objectPosition: undefined as string | undefined,
  },
  {
    imageSrc: "/images/step-3.png",
    imageAlt: "Mark app search and resurfaced reading insights",
    title: "Retrieve anytime",
    description:
      "Search your entire reading history by concept, book, or idea. Smart reminders resurface key insights using spaced repetition — so knowledge actually sticks.",
    rounded: "bottom-right" as const,
    stepNumber: 3,
    objectPosition: "center" as string | undefined,
  },
]

export function StepsSection() {
  const [headRef, headVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.3 })
  const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section id="how-it-works" className="border-t border-black/[0.06] bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div
          ref={headRef}
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "none" : "translateY(30px)",
            transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <p className="text-center text-sm md:text-base uppercase tracking-widest text-muted-foreground mb-3">
            Three steps.
          </p>
          <h2 className="text-center font-sans text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground text-balance mb-4">
            How Mark Works
          </h2>
          <p className="text-center text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto mb-6">
            A lifetime of knowledge.
          </p>
          <p className="text-center text-sm md:text-base font-medium text-foreground mb-10 md:mb-14">
            Three steps to:
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-10"
        >
          {steps.map(({ objectPosition, ...step }, i) => (
            <div
              key={step.title}
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? "none" : "translateY(50px)",
                transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.15}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.15}s`,
              }}
            >
              <StepCard
                imageSrc={step.imageSrc}
                imageAlt={step.imageAlt}
                title={step.title}
                description={step.description}
                stepNumber={step.stepNumber}
                rounded={step.rounded}
                objectPosition={objectPosition}
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
