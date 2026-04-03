"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUp } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { trackMetaCustomEvent } from "@/lib/meta-pixel"

const footerLinks = {
  Company: [
    { label: "About", href: "https://mark.engineering" },
    { label: "Contact", href: "mailto:Contact@Mark.Engineering" },
  ],
  Legal: [
    { label: "Terms", href: "https://mark.engineering/terms-and-service" },
    { label: "Privacy", href: "https://mark.engineering/privacy-policy" },
  ],
  Social: [
    { label: "Instagram", href: "https://www.instagram.com/thinkwithmark" },
    { label: "LinkedIn", href: "https://linkedin.com/company/markhardware" },
    { label: "X", href: "https://x.com/thinkwithmark" },
  ],
}

export function SiteFooter() {
  const [logoRef, logoVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* Giant MARK logo — matching Opal's oversized wordmark */}
      <div
        ref={logoRef}
        className="relative overflow-hidden"
        style={{
          opacity: logoVisible ? 1 : 0,
          transform: logoVisible ? "none" : "translateY(40px) scale(0.96)",
          transition:
            "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="px-4 md:px-8 pt-10 pb-6 md:pt-14 md:pb-8">
          <Image
            src="/images/mark-logo.png"
            alt="Mark"
            width={1800}
            height={400}
            className="w-full max-h-[clamp(120px,22vw,380px)] object-contain object-left brightness-0 invert"
            priority
          />
        </div>
      </div>

      {/* Content area */}
      <div className="mx-auto max-w-[1616px] px-4 md:px-8">
        {/* Newsletter + Link columns row */}
        <div className="border-t glass-divider-dark pt-8 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          {/* Newsletter — left side */}
          <div className="max-w-[320px]">
            <p className="mb-5 text-xl font-semibold leading-7">
              Join the Mark waitlist
            </p>
            <p className="mb-6 text-[13px] leading-6 text-white/50 max-w-[247px]">
              Get early access, product updates, and launch announcements.
            </p>
            <Link
              href="/#community"
              onClick={() => trackMetaCustomEvent("JoinWaitlistClick", { source: "footer" })}
              className="group relative inline-flex h-10 w-[100px] items-center rounded-full bg-white transition-colors duration-200 hover:bg-[#FFDB01]"
              aria-label="Scroll to waitlist signup"
            >
              <ArrowRight
                className="absolute text-black transition-all duration-300 ease-out left-[calc(100%-44px)] group-hover:left-[calc(50%-12px)]"
                size={24}
                strokeWidth={2}
              />
            </Link>
          </div>

          {/* Link columns — right side */}
          <div className="grid grid-cols-3 gap-8 lg:gap-6">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <p className="text-[13px] text-white/40 mb-4">{category}</p>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                        {...(link.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t glass-divider-dark py-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-[13px] text-white/40">Mark Inc.</span>
            <span className="text-[13px] text-white/40">
              All rights reserved.
            </span>
          </div>
          <button
            onClick={scrollToTop}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  )
}
