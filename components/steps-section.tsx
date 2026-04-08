"use client"

import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"

const steps = [
  {
    imageSrc: "/images/step-1.png",
    imageAlt: "Reader with Mark device scanning book pages",
    title: "Scan your pages",
    description:
      "Slip Mark into your book. Its camera silently scans the pages you just read — physical or digital text, it captures everything automatically.",
    objectPosition: "center" as string | undefined,
  },
  {
    imageSrc: "/images/step-2.png",
    imageAlt: "Reader capturing voice notes and highlights with Mark",
    title: "Record your thoughts",
    description:
      "Voice notes, highlights, reactions — captured instantly. Mark turns your spoken thoughts into structured, searchable knowledge while the ideas are still fresh.",
    objectPosition: undefined as string | undefined,
  },
  {
    imageSrc: "/images/step-3.png",
    imageAlt: "Mark app search and resurfaced reading insights",
    title: "Retrieve anytime",
    description:
      "Search your entire reading history by concept, book, or idea. Smart reminders resurface key insights using spaced repetition — so knowledge actually sticks.",
    objectPosition: "center" as string | undefined,
  },
]

function StepColumn({
  imageSrc,
  imageAlt,
  title,
  description,
  objectPosition = "center",
  priority,
  columnStaggerSec,
}: {
  imageSrc: string
  imageAlt: string
  title: string
  description: string
  objectPosition?: string
  priority: boolean
  columnStaggerSec: number
}) {
  const [imageRef, imageVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.12 })
  const [textRef, textVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.12 })

  const imageDelay = `${columnStaggerSec}s`
  const textDelay = `${columnStaggerSec + 0.14}s`

  return (
    <div className="flex flex-col">
      <div
        ref={imageRef}
        style={{
          opacity: imageVisible ? 1 : 0,
          transform: imageVisible ? "none" : "translateY(44px)",
          transition: `opacity 0.85s ${EASE} ${imageDelay}, transform 0.85s ${EASE} ${imageDelay}`,
        }}
      >
        <div className="relative w-full aspect-[20/29]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover rounded-none"
            style={{ objectPosition }}
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={priority}
          />
        </div>
      </div>
      <div
        ref={textRef}
        className="w-full pt-6 pb-2"
        style={{
          opacity: textVisible ? 1 : 0,
          transform: textVisible ? "none" : "translateY(36px)",
          transition: `opacity 0.8s ${EASE} ${textDelay}, transform 0.8s ${EASE} ${textDelay}`,
        }}
      >
        <h3 className="mb-3 text-left text-xl md:text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-left text-base md:text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

export function StepsSection() {
  const [headRef, headVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.3 })

  return (
    <section id="how-it-works" className="border-t glass-divider-light bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div
          ref={headRef}
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "none" : "translateY(30px)",
            transition: `opacity 0.8s ${EASE}, transform 0.8s ${EASE}`,
          }}
        >
          <p className="text-center text-sm md:text-base uppercase tracking-widest text-muted-foreground mb-3">
            Three steps.
          </p>
          <h2 className="text-center font-sans text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground text-balance mb-4">
            How Mark Works
          </h2>
          <p className="text-center text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto mb-10 md:mb-14">
            A lifetime of knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-10">
          {steps.map((step, i) => (
            <StepColumn
              key={step.title}
              imageSrc={step.imageSrc}
              imageAlt={step.imageAlt}
              title={step.title}
              description={step.description}
              objectPosition={step.objectPosition}
              priority={i === 0}
              columnStaggerSec={0.08 + i * 0.12}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
