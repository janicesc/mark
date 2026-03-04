import Image from "next/image"
import Link from "next/link"
import { Shield, Award, Handshake } from "lucide-react"
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
      {/* Header */}
      <header className="bg-[#0a0a0a] py-5">
        <div className="mx-auto max-w-7xl px-6 md:px-8 flex items-center justify-center">
          <Link href="/">
            <Image
              src="/images/mark-logo.png"
              alt="Mark"
              width={140}
              height={32}
              className="h-7 md:h-8 w-auto invert brightness-100"
              priority
            />
          </Link>
        </div>
      </header>

      {/* Hero section */}
      <main>
        <section className="relative bg-gradient-to-b from-[#8a8a8a] to-[#5a5a5a] overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24 lg:py-32">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-4">
              {/* Product image */}
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="relative w-[280px] md:w-[380px] lg:w-[440px] aspect-[3/4]">
                  <Image
                    src="/images/mark-light.png"
                    alt="Mark device in silver finish"
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 768px) 280px, 440px"
                    priority
                  />
                </div>
              </div>

              {/* Glass card */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 md:p-10">
                  <h1 className="font-serif text-3xl md:text-4xl font-normal text-white tracking-tight">
                    {"Reserve & Save 50%"}
                  </h1>

                  <div className="w-16 h-px bg-white/30 my-6" />

                  <p className="text-base md:text-lg text-white/85 leading-relaxed">
                    Secure your exclusive discount with a $10 deposit.
                  </p>

                  <p className="mt-5 text-base md:text-lg text-white/85 leading-relaxed">
                    {"You\u2019ll lock in $80 off our $150 MSRP \u2014 bringing your total to just $70."}
                  </p>

                  <div className="mt-8">
                    <a
                      href="https://mark.engineering/reserve"
                      className="inline-flex items-center gap-3 bg-white text-[#0a0a0a] px-7 py-4 rounded-lg text-base font-bold hover:bg-white/90 transition-colors duration-300 w-full justify-center"
                    >
                      <span className="flex items-center gap-1">
                        <span className="block w-4 h-4 bg-[#0a0a0a] rounded-sm" />
                        <span className="block w-1.5 h-4 bg-[#0a0a0a] rounded-sm" />
                      </span>
                      Reserve Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-[#1a1a1a] text-white">
          <div className="mx-auto max-w-7xl px-6 md:px-8 py-12 md:py-16">
            <div className="flex flex-col md:flex-row items-start gap-10 md:gap-6">
              {/* Mark logo icon */}
              <div className="flex items-center gap-1.5 shrink-0 pt-1">
                <span className="block w-7 h-7 bg-white rounded-sm" />
                <span className="block w-3 h-7 bg-white rounded-sm" />
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-6 flex-1">
                {guarantees.map((g) => (
                  <div key={g.title} className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <g.icon className="h-6 w-6 text-white/70 shrink-0" strokeWidth={1.5} />
                      <h3 className="text-sm md:text-base font-bold text-white">
                        {g.title}
                      </h3>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {g.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
