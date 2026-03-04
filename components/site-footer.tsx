"use client"

import Image from "next/image"
import { ArrowRight, ArrowUp } from "lucide-react"

const footerLinks = {
  Products: [
    { label: "Mark Device", href: "#" },
    { label: "Mark App", href: "#" },
    { label: "Mark Pro", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Privacy", href: "#" },
  ],
  Resources: [
    { label: "Support", href: "#" },
    { label: "Media Kit", href: "#" },
    { label: "Downloads", href: "#" },
    { label: "Newsletter", href: "#" },
  ],
  Social: [
    { label: "Instagram", href: "#" },
    { label: "Twitter", href: "#" },
  ],
}

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* Giant MARK logo */}
      <div className="relative overflow-hidden">
        <div className="px-4 md:px-8 py-6 md:py-10">
          <Image
            src="/images/mark-logo.png"
            alt="Mark"
            width={1800}
            height={400}
            className="w-full max-h-[clamp(140px,22vw,380px)] object-contain object-left invert brightness-100"
            priority
          />
        </div>
      </div>

      {/* Footer content */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Top border */}
        <div className="border-t border-white/10" />

        <div className="grid grid-cols-1 gap-12 pt-10 pb-16 lg:grid-cols-2">
          {/* Newsletter section */}
          <div className="max-w-sm">
            <p className="mb-5 text-xl font-semibold leading-7">
              Subscribe to the
              <br />
              Mark Newsletter
            </p>
            <p className="mb-6 text-sm leading-6 text-white/50">
              Latest news, musings, announcements
              and updates direct to your inbox.
            </p>
            <a
              href="#"
              className="group inline-flex h-10 w-[100px] items-center justify-center rounded-full bg-white/10 transition-colors duration-200 hover:bg-white/20"
              aria-label="Subscribe to newsletter"
            >
              <ArrowRight className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <p className="mb-4 text-sm text-white/40">{category}</p>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/80 transition-colors duration-200 hover:text-white"
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
        <div className="flex items-center justify-between border-t border-white/10 py-6">
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/40 sm:gap-8">
            <span>Mark Inc.</span>
            <span>All rights reserved.</span>
          </div>
          <button
            onClick={scrollToTop}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors duration-200 hover:border-white/40 hover:text-white"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
