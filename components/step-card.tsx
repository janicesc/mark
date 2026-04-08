import Image from "next/image"

interface StepCardProps {
  imageSrc: string
  imageAlt: string
  title: string
  description: string
  stepNumber: number
  rounded?: "top-left" | "bottom-right" | "none"
  objectPosition?: string
  priority?: boolean
}

export function StepCard({
  imageSrc,
  imageAlt,
  title,
  description,
  stepNumber,
  rounded = "none",
  objectPosition = "center",
  priority = false,
}: StepCardProps) {
  void rounded

  return (
    <div className="flex flex-col">
      <div className="relative w-full aspect-[20/29] overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          style={{ objectPosition }}
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={priority}
        />
      </div>
      <div className="pt-6 pb-2">
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h3>
      </div>
      <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-xs">
        {description}
      </p>
    </div>
  )
}
