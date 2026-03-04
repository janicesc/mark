import { StepCard } from "@/components/step-card"

const steps = [
  {
    imageSrc: "/images/step-1.jpg",
    imageAlt: "Elegant fashion editorial of a woman in a cream trench coat",
    title: "Digitize your closet",
    description:
      "Take full control of what you own with an oh-so-scrollable digital wardrobe",
    rounded: "top-left" as const,
  },
  {
    imageSrc: "/images/step-2.jpg",
    imageAlt: "Luxury pearl beaded handbag with soft studio lighting",
    title: "Elevate your style",
    description:
      "Build outfits on your own or get 1:1 support from a personal stylist",
    rounded: "none" as const,
  },
  {
    imageSrc: "/images/step-3.jpg",
    imageAlt: "Close-up of elegant gold jewelry and flowing cream fabric",
    title: "Connect and share",
    description:
      "Share your digital closet with friends and get inspired by others",
    rounded: "bottom-right" as const,
  },
]

export function StepsSection() {
  return (
    <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-serif text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-foreground text-balance mb-14 md:mb-20">
          The magic of Indyx is how it{" "}
          <em className="italic">all</em> works together
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-10">
          {steps.map((step) => (
            <StepCard
              key={step.title}
              imageSrc={step.imageSrc}
              imageAlt={step.imageAlt}
              title={step.title}
              description={step.description}
              rounded={step.rounded}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
