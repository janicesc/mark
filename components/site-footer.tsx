"use client"

import Image from "next/image"
import Link from "next/link"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function SiteFooter() {
  const [logoRef, logoVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })

  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* Giant logo */}
      <div
        ref={logoRef}
        className="relative overflow-hidden"
        style={{
          opacity: logoVisible ? 1 : 0,
          transform: logoVisible ? "none" : "translateY(40px) scale(0.96)",
          transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="px-4 md:px-8 py-8 md:py-12">
          <Image
            src="/images/mark-logo.png"
            alt="Mark"
            width={1800}
            height={400}
            className="w-full max-h-[clamp(100px,18vw,320px)] object-contain object-left invert brightness-100"
            priority
          />
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Row 1: Newsletter | Social + CTA */}
        <div className="border-t border-white/10 pt-10 pb-12 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10">
          {/* Newsletter */}
          <div className="max-w-sm">
            <h2 className="text-lg font-semibold mb-3">Stay in the Know</h2>
            <p className="text-sm text-white/50 leading-relaxed mb-5">
              Subscribe to our newsletter to learn about the latest product
              features, updates and more.
            </p>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <label htmlFor="footer-email" className="text-xs text-white/40">
                Email Address
              </label>
              <div className="flex gap-3">
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Email Address"
                  required
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-white text-black px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block" />

          {/* Social + CTA */}
          <div className="flex flex-col items-start lg:items-end gap-5">
            <Link
              href="#reserve"
              className="inline-flex items-center px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              Reserve & save
            </Link>
            <nav className="flex items-center gap-5" aria-label="Social links">
              <a
                href="https://instagram.com/mark.engineering"
                className="text-sm text-white/60 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com/company/markhardware"
                className="text-sm text-white/60 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/markhardware"
                className="text-sm text-white/60 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                X
              </a>
            </nav>
          </div>
        </div>

        {/* Row 2: Nav links | Logo */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <nav className="flex flex-wrap items-center gap-6">
            <Link
              href="#how-it-works"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              How it works
            </Link>
            <Link
              href="#community"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Join waitlist
            </Link>
            <a
              href="mailto:Contact@Mark.Engineering"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Contact
            </a>
            <Link
              href="#"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </nav>
          <Image
            src="/images/mark-logo.png"
            alt="Mark"
            width={160}
            height={36}
            className="h-6 w-auto invert brightness-100"
          />
        </div>

        {/* Row 3: Legal */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="#"
              className="text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              {"Terms & Conditions"}
            </Link>
            <Link
              href="#community"
              className="text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Subscribe
            </Link>
          </div>
          <p className="text-xs text-white/40">{"© 2026 Mark"}</p>
        </div>
      </div>
    </footer>
  )
}
