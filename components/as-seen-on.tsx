"use client"

import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const pressOutlets = [
  { name: "Gizmodo", url: "https://gizmodo.com/this-ai-bookmark-might-actually-help-you-finish-reading-books-2000569596" },
  { name: "Tom's Hardware", url: "https://www.tomshardware.com/peripherals/ai-powered-bookmark-wants-to-revolutionize-the-way-you-read-usd129-mark-1-offers-ai-generated-summaries" },
  { name: "Yahoo Tech", url: "https://www.yahoo.com/tech/ai-powered-bookmark-wants-revolutionize-124556081.html" },
  { name: "Y Combinator", url: "https://www.ycombinator.com/" },
  { name: "Product Hunt", url: "https://www.producthunt.com/products/mark-4" },
  { name: "Morning Brew", url: "https://x.com/MorningBrew/status/1895514802245537921" },
  { name: "Digital Frontier", url: "https://digitalfrontier.com/articles/mark-AI-co-founders-belong-interview" },
  { name: "Superhuman AI", url: "https://www.superhuman.ai/p/fri-feb-14-eae5ce0a4cd115fe" },
  { name: "Gamereactor", url: "https://www.gamereactor.eu/mark-engineering-unveils-129-ai-bookmark-that-helps-you-remember-where-you-left-off-1506073/" },
  { name: "Ben's Bites", url: "https://news.bensbites.com/posts/35526-mark-ai-bookmark-for-physical-readers" },
  { name: "ForkLog", url: "https://forklog.com/en/mark-unveils-129-ai-enhanced-bookmark/" },
  { name: "dev.ua", url: "https://dev.ua/en/news/shi-zakladka-za-130-baksiv-1740756528" },
]

const LOGO_HEIGHT = "h-[26px]"

function LogoIcon({ name }: { name: string }) {
  switch (name) {
    case "Gizmodo":
      return (
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Gizmodo_logo.svg/3840px-Gizmodo_logo.svg.png"
          alt="Gizmodo"
          width={120}
          height={26}
          className={`${LOGO_HEIGHT} w-auto object-contain`}
          unoptimized
        />
      )
    case "Y Combinator":
      return (
        <span className="font-semibold text-base tracking-tight text-inherit">
          Y Combinator
        </span>
      )
    case "Tom's Hardware":
      return (
        <Image
          src="https://www.tomshardware.com/media/img/brand_logo.svg"
          alt="Tom's Hardware"
          width={128}
          height={26}
          className={`${LOGO_HEIGHT} w-auto object-contain`}
          unoptimized
        />
      )
    case "Yahoo Tech":
      return (
        <Image
          src="https://media.licdn.com/dms/image/v2/D5622AQFHKGr7b3Amjg/feedshare-shrink_800/feedshare-shrink_800/0/1704216692557?e=2147483647&v=beta&t=f4DRtcYfky70QX8fif0GadiUIFgph5qHz7Au7ZZI5sI"
          alt="Yahoo Tech"
          width={160}
          height={28}
          className="h-7 w-auto min-h-[26px] object-contain object-center"
          unoptimized
        />
      )
    case "Product Hunt":
      return (
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Product_Hunt_Logo.png"
          alt="Product Hunt"
          width={160}
          height={28}
          className="h-7 w-auto min-h-[26px] object-contain"
          unoptimized
        />
      )
    case "Morning Brew":
      return (
        <Image
          src="https://cdn.sanity.io/images/bl383u0v/production/85492dece7bf5ed80a164a1be4a74b8de9f79be2-386x55.svg?rect=1,0,385,55&w=224&h=32"
          alt="Morning Brew"
          width={112}
          height={26}
          className={`${LOGO_HEIGHT} w-auto object-contain`}
          unoptimized
        />
      )
    case "Digital Frontier":
      return (
        <span className="text-base italic leading-6 text-inherit">
          +digital frontier
        </span>
      )
    case "Superhuman AI":
      return (
        <div className="flex items-center gap-2">
          <Image
            src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/publication/logo/faa6a747-8c1c-43c1-8155-91aa43268f01/thumb_Ad_9_2.png"
            alt="Superhuman AI"
            width={26}
            height={26}
            className="h-[26px] w-[26px] rounded-md object-cover"
            unoptimized
          />
          <span className="font-medium text-base leading-6 text-inherit">Superhuman AI</span>
        </div>
      )
    case "Gamereactor":
      return (
        <Image
          src="https://www.gamereactor.eu/lay/redesign/gramplogo_32.png"
          alt="Gamereactor"
          width={150}
          height={26}
          className={`${LOGO_HEIGHT} w-auto object-contain`}
          unoptimized
        />
      )
    case "Ben's Bites":
      return (
        <div className="flex items-center gap-2">
          <Image
            src="https://news.bensbites.com/images/logo.jpg"
            alt="Ben's Bites"
            width={26}
            height={26}
            className="h-[26px] w-[26px] rounded-md object-cover"
            unoptimized
          />
          <span className="font-bold text-base uppercase leading-6 text-inherit">Ben&apos;s Bites</span>
        </div>
      )
    case "ForkLog":
      return (
        <Image
          src="https://forklog.com/wp-content/themes/forklogv2/img/logo2025.svg"
          alt="ForkLog"
          width={108}
          height={26}
          className={`${LOGO_HEIGHT} w-auto object-contain`}
          unoptimized
        />
      )
    case "dev.ua":
      return (
        <Image
          src="https://dev.ua/assets/logo-4b90ec4680478287089c83e27780252c89a0c62de1ceb36c0e14472a7735c490.svg"
          alt="dev.ua"
          width={80}
          height={26}
          className={`${LOGO_HEIGHT} w-auto object-contain`}
          unoptimized
        />
      )
    default:
      return <span className="font-medium text-base leading-6 text-inherit">{name}</span>
  }
}

export function AsSeenOn() {
  const [sectionRef, sectionVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })
  const duplicatedOutlets = [...pressOutlets, ...pressOutlets]

  return (
    <section
      ref={sectionRef}
      className="w-full py-14 md:py-22 pl-12 md:pl-20 lg:pl-28 bg-white overflow-hidden"
      style={{
        opacity: sectionVisible ? 1 : 0,
        transform: sectionVisible ? "none" : "translateY(20px)",
        transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
      }}
    >
      <div className="relative flex flex-col gap-16">
        <p className="text-center text-xs font-normal uppercase tracking-[0.2em] text-muted-foreground">
          Featured in
        </p>
        <div className="relative">
          <div className="flex items-center gap-x-20 md:gap-x-24 animate-marquee [animation-duration:22s]">
            {duplicatedOutlets.map((outlet, index) => (
              <a
                key={`${outlet.name}-${index}`}
                href={outlet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-shrink-0 flex items-center justify-center min-h-[28px] h-7 opacity-70 hover:opacity-100 transition-opacity duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:opacity-100 rounded text-foreground"
                aria-label={`Read about Mark on ${outlet.name}`}
              >
                <span className="grayscale transition-all duration-200 group-hover:grayscale-0">
                  <LogoIcon name={outlet.name} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
