"use client"

import Image from "next/image"
import Link from "next/link"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function SiteFooter() {
  const [logoRef, logoVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })

  return (
    <footer className="bg-[#212121] text-[#ECEBE5]">
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
        <div className="px-5 md:px-8 py-8 md:py-12">
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

      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        {/* Row 1: Newsletter | Social + CTA */}
        <div className="border-t border-white/15 pt-10 pb-12 grid grid-cols-1 lg:grid-cols-[5fr_3fr_4fr] gap-10">
          {/* Newsletter */}
          <div className="max-w-sm">
            <h2 className="text-[1.25rem] font-semibold text-white mb-2">Stay in the Know</h2>
            <p className="text-[0.9375rem] text-[#ECEBE5]/[0.92] leading-[1.5] mb-5">
              Subscribe to our newsletter to learn about the latest product
              features, updates and more.
            </p>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <label htmlFor="footer-email" className="text-sm font-medium text-[#ECEBE5] mb-1 block">
                Email Address
              </label>
              <div className="flex gap-3">
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Email Address"
                  required
                  className="flex-1 min-w-[200px] bg-white/8 border-2 border-white/30 px-4 py-3 text-base text-white placeholder:text-white/50 focus:outline-none focus:border-[#FFDB01] transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#FFDB01] text-black px-5 py-3 text-[0.9375rem] font-semibold hover:bg-[#E6C801] transition-all duration-200 hover:-translate-y-px shrink-0"
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
              className="inline-flex items-center px-6 py-3 bg-[#FFDB01] text-black text-[0.9375rem] font-semibold hover:bg-[#E6C801] transition-all duration-200 hover:-translate-y-px"
            >
              Reserve & save
            </Link>
            <nav className="flex flex-wrap items-center gap-4" aria-label="Social links">
              <a
                href="https://instagram.com/mark.engineering"
                className="text-[0.9375rem] text-[#ECEBE5]/[0.92] hover:opacity-100 opacity-[0.92] transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com/company/markhardware"
                className="text-[0.9375rem] text-[#ECEBE5]/[0.92] hover:opacity-100 opacity-[0.92] transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/markhardware"
                className="text-[0.9375rem] text-[#ECEBE5]/[0.92] hover:opacity-100 opacity-[0.92] transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                X
              </a>
            </nav>
          </div>
        </div>

        <hr className="border-none border-t border-white/15 my-4" />

        {/* Row 2: Nav links | Logo */}
        <div className="grid grid-cols-1 md:grid-cols-[6fr_4fr_2fr] gap-6 py-8 items-center">
          <nav className="flex flex-wrap items-center gap-4 text-base leading-[1.6]">
            <Link href="#how-it-works" className="text-[#ECEBE5]/[0.92] hover:opacity-100 transition-opacity">
              How it works
            </Link>
            <Link href="#community" className="text-[#ECEBE5]/[0.92] hover:opacity-100 transition-opacity">
              Join waitlist
            </Link>
            <a href="mailto:Contact@Mark.Engineering" className="text-[#ECEBE5]/[0.92] hover:opacity-100 transition-opacity">
              Contact
            </a>
            <Link href="#" className="text-[#ECEBE5]/[0.92] hover:opacity-100 transition-opacity">
              Privacy Policy
            </Link>
          </nav>
          <div />
          <div className="flex justify-start md:justify-end">
            <Image
              src="/images/mark-logo.png"
              alt="Mark"
              width={200}
              height={56}
              className="w-auto max-w-[200px] h-auto max-h-[56px] object-contain invert brightness-100"
            />
          </div>
        </div>

        <hr className="border-none border-t border-white/15 my-4" />

        {/* Row 3: Legal */}
        <div className="grid grid-cols-1 md:grid-cols-[3fr_9fr] gap-4 py-6 items-center">
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            <Link href="#" className="text-[#ECEBE5]/[0.92] hover:opacity-100 transition-opacity">
              Privacy Policy
            </Link>
            <Link href="#" className="text-[#ECEBE5]/[0.92] hover:opacity-100 transition-opacity">
              {"Terms & Conditions"}
            </Link>
            <Link href="#community" className="text-[#ECEBE5]/[0.92] hover:opacity-100 transition-opacity">
              Subscribe
            </Link>
          </nav>
          <p className="text-sm text-[#ECEBE5]/85 md:text-right">{"© 2026 Mark"}</p>
        </div>
      </div>
    </footer>
  )
}
