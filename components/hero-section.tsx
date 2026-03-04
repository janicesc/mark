import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Firefly_HeroVideo-mRi9NHxcY3s9KD53J7h9xNUJ2mkZLN.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8 w-full py-32 md:py-40">
        <div className="max-w-2xl">
          <p className="text-sm md:text-base uppercase tracking-widest text-white/70 mb-5 font-medium">
            The World{"'"}s First AI Bookmark
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-normal tracking-tight text-white leading-tight mb-6">
            Read once.{" "}
            <span className="block">Retrieve anytime.</span>
          </h1>
          <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-md mb-10">
            You underline something powerful — but do you remember it?
            <br />
            Mark turns every highlight into searchable, lasting insights.
          </p>
          <Link
            href="#reserve"
            className="inline-flex items-center gap-2.5 bg-white text-black px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors duration-300"
          >
            <ArrowRight className="h-4 w-4" />
            Get early access
          </Link>
        </div>
      </div>
    </section>
  )
}
