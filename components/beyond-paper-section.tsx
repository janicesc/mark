"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function BeyondPaperSection() {
  const [textRef, textVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
  const [mediaRef, mediaVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section className="border-t glass-divider-dark bg-[#0a0a0a] text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Text content */}
          <div
            ref={textRef}
            className="w-full md:w-[40%] shrink-0"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "none" : "translateY(40px)",
              transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <p className="text-sm uppercase tracking-widest text-white/60 mb-4 font-medium">
              Beyond paper
            </p>
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight text-balance mb-6">
              Turn spoken thoughts into structured knowledge.
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-sm">
              Record lectures, conversations, and audiobooks — automatically
              transcribed and linked to your reading.
            </p>
          </div>

          {/* Media */}
          <div
            ref={mediaRef}
            className="w-full md:w-[60%]"
            style={{
              opacity: mediaVisible ? 1 : 0,
              transform: mediaVisible ? "none" : "translateY(50px)",
              transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
            }}
          >
            <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden">
              <video
                className="mark-decorative-video absolute inset-0 w-full h-full object-cover"
                src="/videos/Voice_Annotation.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                controls={false}
                controlsList="nodownload noplaybackrate nofullscreen"
                disablePictureInPicture
                disableRemotePlayback
                aria-label="Voice annotation capture and transcription with Mark device"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
