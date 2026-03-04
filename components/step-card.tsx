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
  const borderRadiusClass =
    rounded === "top-left"
      ? "rounded-tl-[60px] md:rounded-tl-[100px]"
      : rounded === "bottom-right"
        ? "rounded-br-[60px] md:rounded-br-[100px]"
        : ""

  return (
    <div className="flex flex-col">
      <div
        className={`relative aspect-[2/3] w-full overflow-hidden ${borderRadiusClass}`}
      >
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
      <div className="pt-6 pb-2 flex items-baseline gap-4">
        <span className="text-3xl md:text-4xl font-serif font-light text-muted-foreground/50">
          {stepNumber}
        </span>
        <h3 className="text-xl md:text-2xl font-medium tracking-tight text-foreground">
          {title}
        </h3>
      </div>
      <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-xs">
        {description}
      </p>
    </div>
  )
}
