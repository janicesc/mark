"use client"

import { StepCard } from "@/components/step-card"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const steps = [
  {
    imageSrc: "/images/step-1.png",
    imageAlt: "Person reading a book on an airplane with stats overlay showing 32 notes, 1h32m duration, and 21 ideas",
    title: "Scan your text",
    description:
      "Highlight with the Mark device — on paper or on screen.",
    rounded: "top-left" as const,
    stepNumber: 1,
    objectPosition: "center" as string | undefined,
  },
  {
    imageSrc: "/images/step-2.png",
    imageAlt: "Woman reading in a library with a notification card showing a note from Atomic Habits",
    title: "Record your thoughts",
    description:
      "Add voice or typed notes while you read.",
    rounded: "none" as const,
    stepNumber: 2,
    objectPosition: undefined as string | undefined,
  },
  {
    imageSrc: "/images/step-3.png",
    imageAlt: "Mark app note card showing a quote from Zero to One with tags for Business, Startups, and Growth",
    title: "Organize your knowledge",
    description:
      "Your highlights, notes, and ideas are automatically organized, searchable, and enhanced with AI.",
    rounded: "bottom-right" as const,
    stepNumber: 3,
    objectPosition: "center" as string | undefined,
  },
]

export function StepsSection() {
  const [headRef, headVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.3 })
  const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section id="how-it-works" className="bg-background px-5 py-10 md:px-8 md:py-16">
      <div className="mx-auto max-w-[1280px]">
        <div
          ref={headRef}
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "none" : "translateY(30px)",
            transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-[#85817F] mb-4">
            Simple
          </p>
          <h2 className="text-center font-sans text-[32px] font-semibold leading-[40px] text-[#000] mb-14 md:mb-20 md:leading-[50px]">
            How Mark Works
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10"
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
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
