import { StepCard } from "@/components/step-card"

const steps = [
  {
    imageSrc: "/images/step-1.png",
    imageAlt: "Overhead view of a person reading on a Kindle with stats overlay showing 32 notes, 1h32m duration, and 21 ideas",
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
    imageAlt: "Mark app interface showing recently scanned quotes and organized notes",
    title: "Organize your knowledge",
    description:
      "Your highlights, notes, and ideas are automatically organized, searchable, and enhanced with AI.",
    rounded: "bottom-right" as const,
    stepNumber: 3,
    objectPosition: "top",
  },
]

export function StepsSection() {
  return (
    <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm md:text-base uppercase tracking-widest text-muted-foreground mb-4">
          Simple
        </p>
        <h2 className="text-center font-serif text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-foreground text-balance mb-14 md:mb-20">
          How Mark Works
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-10">
          {steps.map(({ objectPosition, ...step }) => (
            <StepCard
              key={step.title}
              imageSrc={step.imageSrc}
              imageAlt={step.imageAlt}
              title={step.title}
              description={step.description}
              stepNumber={step.stepNumber}
              rounded={step.rounded}
              objectPosition={objectPosition}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
