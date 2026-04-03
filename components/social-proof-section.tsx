"use client"

declare global {
  interface Window {
    twttr?: {
      widgets: { load: (el?: Element) => void }
      events: { bind: (event: string, cb: () => void) => void }
    }
  }
}

import { useEffect, useRef, useState } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function SocialProofSection() {
  const [headingRef, headingVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
  const [tweetRef, tweetVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })
  const embedRef = useRef<HTMLDivElement>(null)
  const scriptLoaded = useRef(false)
  const [tweetReady, setTweetReady] = useState(false)

  useEffect(() => {
    if (!tweetVisible || scriptLoaded.current) return
    scriptLoaded.current = true

    // Load Twitter widgets script when the section becomes visible
    const script = document.createElement("script")
    script.src = "https://platform.twitter.com/widgets.js"
    script.async = true
    script.charset = "utf-8"
    script.onload = () => {
      // Wait for Twitter to render the blockquote into an iframe
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load(embedRef.current ?? undefined)
        window.twttr.events.bind("rendered", () => {
          setTweetReady(true)
        })
      }
    }
    document.body.appendChild(script)

    return () => {
      // Cleanup is optional since the script is idempotent
    }
  }, [tweetVisible])

  return (
    <section className="border-t glass-divider-dark bg-[#0a0a0a] py-20 md:py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        {/* Heading */}
        <div
          ref={headingRef}
          className="text-center mb-12 md:mb-16"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "none" : "translateY(30px)",
            transition:
              "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white text-balance mb-4">
            7.4 million readers discovered Mark
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto text-balance leading-relaxed">
            One tweet ignited a global conversation among readers.
          </p>
        </div>

        {/* Embedded tweet — light card inside frosted glass frame on dark bg */}
        <div
          ref={tweetRef}
          className="flex justify-center"
          style={{
            opacity: tweetVisible ? 1 : 0,
            transform: tweetVisible ? "none" : "translateY(40px)",
            transition:
              "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
          }}
        >
          <div
            ref={embedRef}
            className="social-proof-tweet-glass w-full max-w-lg overflow-hidden rounded-2xl p-3 md:p-4"
            style={{
              opacity: tweetReady ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            <blockquote className="twitter-tweet" data-dnt="true" data-theme="light">
              <p lang="en" dir="ltr">
                {"Introducing Mark — a $129 AI bookmark that helps book readers remember everything."}
                <br />
                <br />
                {"🧵👇 Thread: "}
                <a href="https://t.co/LllFwgMLYS">pic.twitter.com/LllFwgMLYS</a>
              </p>
              &mdash; Mark (@markhardware){" "}
              <a href="https://twitter.com/markhardware/status/1894812320397955254?ref_src=twsrc%5Etfw">
                February 26, 2025
              </a>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
