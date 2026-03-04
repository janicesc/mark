const logos = [
  {
    name: "Morning Brew",
    style: "font-sans font-semibold text-sm md:text-base tracking-wide uppercase",
    icon: (
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4 md:w-5 md:h-5"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 13c0-3 2-5 4-5s4 2 4 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Tom's Hardware",
    renderCustom: (
      <span className="text-sm md:text-base tracking-tight">
        {"tom's"}
        <span className="font-extrabold uppercase">Hardware</span>
      </span>
    ),
  },
  {
    name: "Digital Frontier",
    renderCustom: (
      <span className="text-sm md:text-base italic font-light tracking-wide text-[#c4d442]">
        +digital frontier
      </span>
    ),
  },
  {
    name: "Gizmodo",
    style: "font-sans font-black text-lg md:text-2xl tracking-tight uppercase",
  },
  {
    name: "Y",
    renderCustom: (
      <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-sm bg-[#F26522] text-white font-bold text-lg md:text-xl">
        Y
      </span>
    ),
  },
  {
    name: "Product Hunt",
    renderCustom: (
      <span className="flex items-center gap-1.5 text-sm md:text-base font-medium tracking-tight">
        <span className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#DA552F] text-white text-xs font-bold">
          P
        </span>
        Product Hunt
      </span>
    ),
  },
]

export function AsSeenOn() {
  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-8 md:gap-12">
        <p className="text-sm md:text-base text-foreground/80 font-sans">
          As seen on
        </p>
        <div className="w-full flex flex-wrap items-center justify-center gap-8 md:gap-14 lg:gap-20 opacity-50">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center gap-1.5 text-foreground shrink-0"
            >
              {logo.renderCustom ? (
                logo.renderCustom
              ) : (
                <>
                  {logo.icon && logo.icon}
                  <span className={logo.style}>{logo.name}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
