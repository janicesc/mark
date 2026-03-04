import Image from "next/image"
import Link from "next/link"
import { Shield, Award, Handshake, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reserve & Save 50% | Mark",
  description:
    "Secure your exclusive discount on Mark with a $10 deposit. Lock in $80 off our $150 MSRP.",
}

const guarantees = [
  {
    icon: Award,
    title: "100% Refund Guarantee",
    description:
      "If you cancel your reservation, we guarantee you a full refund at any time before production",
  },
  {
    icon: Handshake,
    title: "Transparency Guarantee",
    description:
      "We will be transparent about the progress of our project throughout the entire campaign",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description:
      "All orders are processed through our secure and private network",
  },
]

export default function ReservePage() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        {/* Hero section */}
        <section className="bg-[#f5f1e5]">
          <div className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24 lg:py-32">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-8">
              {/* Product image */}
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="relative w-[260px] md:w-[340px] lg:w-[400px] aspect-[3/4]">
                  <Image
                    src="/images/mark-light.png"
                    alt="Mark device in silver finish"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 260px, 400px"
                    priority
                  />
                </div>
              </div>

              {/* Reservation card */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                <div className="w-full max-w-md bg-white p-8 md:p-10">
                  <h1 className="font-serif text-3xl md:text-4xl font-normal text-foreground tracking-tight">
                    {"Reserve & Save 50%"}
                  </h1>

                  <div className="w-16 h-px bg-foreground/20 my-6" />

                  <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                    Secure your exclusive discount with a $10 deposit.
                  </p>

                  <p className="mt-5 text-base md:text-lg text-foreground/70 leading-relaxed">
                    {"You\u2019ll lock in $80 off our $150 MSRP \u2014 bringing your total to just $70."}
                  </p>

                  <div className="mt-8">
                    <a
                      href="https://mark.engineering/reserve"
                      className="inline-flex items-center justify-center gap-2.5 bg-foreground text-background px-7 py-4 text-base font-semibold hover:bg-foreground/90 transition-colors duration-300 w-full"
                    >
                      Reserve Now
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-[#f2e48d]">
          <div className="mx-auto max-w-7xl px-6 md:px-8 py-12 md:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-6">
              {guarantees.map((g) => (
                <div key={g.title} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <g.icon className="h-6 w-6 text-foreground/50 shrink-0" strokeWidth={1.5} />
                    <h3 className="text-sm md:text-base font-bold text-foreground">
                      {g.title}
                    </h3>
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {g.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
