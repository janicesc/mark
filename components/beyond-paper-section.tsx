"use client"

import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function BeyondPaperSection() {
  const [textRef, textVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
  const [mediaRef, mediaVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section className="bg-[#212121] text-[#ECEBE5] overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center min-h-[50vh]">
          {/* Text content */}
          <div
            ref={textRef}
            className="py-10"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "none" : "translateY(40px)",
              transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#85817F] mb-4">
              Beyond paper
            </p>
            <h2 className="font-sans text-[32px] font-semibold leading-[40px] text-[#ECEBE5] mb-6 md:leading-[50px]">
              Turn spoken thoughts into structured knowledge.
            </h2>
            <p className="text-base text-[#ECEBE5]/[0.92] leading-[1.65]">
              Capture lectures, conversations, and audiobooks — automatically
              transcribed and linked to your reading.
            </p>
          </div>

          {/* Media */}
          <div
            ref={mediaRef}
            style={{
              opacity: mediaVisible ? 1 : 0,
              transform: mediaVisible ? "none" : "translateY(50px) scale(0.97)",
              transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
            }}
          >
            <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#F5F5F4]">
              <Image
                src="/images/voice-capture.jpg"
                alt="Voice capture and transcription with Mark device"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
