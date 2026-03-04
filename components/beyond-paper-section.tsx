import Image from "next/image"

export function BeyondPaperSection() {
  return (
    <section className="bg-[#0a0a0a] text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Text content */}
          <div className="w-full md:w-[40%] shrink-0">
            <p className="text-sm uppercase tracking-widest text-white/50 mb-4 font-medium">
              Beyond paper
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight text-balance mb-6">
              Turn spoken thoughts into structured knowledge.
            </h2>
            <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-sm">
              Capture lectures, conversations, and audiobooks — automatically
              transcribed and linked to your reading.
            </p>
          </div>

          {/* Media */}
          <div className="w-full md:w-[60%]">
            <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden">
              <Image
                src="/images/voice-capture.jpg"
                alt="Voice capture and transcription with Mark device"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
