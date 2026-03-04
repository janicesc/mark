import Image from "next/image"

const screens = [
  {
    src: "/images/app-home.jpg",
    alt: "Mark app home screen showing recent highlights and reading activity",
  },
  {
    src: "/images/app-notes.jpg",
    alt: "Mark app notes view with organized categories and tags",
  },
  {
    src: "/images/app-share.jpg",
    alt: "Mark app share feature with a formatted quote card",
  },
]

export function OrganizeSection() {
  return (
    <section className="bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-20 md:py-32">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
          {/* Phone screens hub */}
          <div className="w-full md:w-[60%]">
            <div className="flex items-end justify-center gap-3 md:gap-5">
              {screens.map((screen, i) => (
                <div
                  key={screen.alt}
                  className={`relative rounded-2xl overflow-hidden shadow-2xl ${
                    i === 1
                      ? "w-[35%] aspect-[9/19] z-10"
                      : "w-[28%] aspect-[9/19] opacity-80"
                  }`}
                  style={{
                    transform:
                      i === 0
                        ? "translateY(12px) rotate(-3deg)"
                        : i === 2
                          ? "translateY(12px) rotate(3deg)"
                          : "none",
                  }}
                >
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 35vw, 20vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Text content */}
          <div className="w-full md:w-[40%] shrink-0">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4 font-medium">
              Organize
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-foreground leading-tight text-balance mb-6">
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
