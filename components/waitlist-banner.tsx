"use client"

import { ArrowRight } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { trackMetaLead } from "@/lib/meta-pixel"
import { getClient } from "@/lib/supabase/client"

const WAITLIST_SOURCE = "waitlist_banner"
const FALLBACK_READER_COUNT = 5064

async function fetchWaitlistCount(): Promise<number> {
  const supabase = getClient()
  if (!supabase) return FALLBACK_READER_COUNT
  const { data, error } = await supabase.rpc("get_waitlist_signups_count")
  if (error != null || data == null) return FALLBACK_READER_COUNT
  const n = Number(data)
  return Number.isFinite(n) && n >= 0 ? n : FALLBACK_READER_COUNT
}

export function WaitlistBanner() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [readerCount, setReaderCount] = useState(FALLBACK_READER_COUNT)
  const router = useRouter()
  const [sectionRef, sectionVisible] = useScrollReveal<HTMLElement>({ threshold: 0.2 })

  const loadCount = useCallback(() => {
    fetchWaitlistCount().then(setReaderCount)
  }, [])

  useEffect(() => {
    loadCount()
  }, [loadCount])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) return

    const supabase = getClient()
    if (supabase) {
      await supabase.from("waitlist_signups").insert({
        email: trimmed,
        source: WAITLIST_SOURCE,
      })
    }

    setSubmitted(true)
    setReaderCount((c) => c + 1)
    loadCount()
    trackMetaLead({ content_name: "Waitlist signup" })
    setTimeout(() => router.push("/reserve"), 2000)
  }

  return (
    <section
      id="community"
      ref={sectionRef}
      className="bg-[#0a0a0a] text-white"
    >
      <div
        className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20"
        style={{
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? "none" : "translateY(30px)",
          transition:
            "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-16">
          {/* Left: Copy */}
          <div className="flex-shrink-0 max-w-md">
            <h2 className="font-sans text-2xl md:text-3xl font-semibold tracking-tight text-white mb-3">
              Join the waitlist
            </h2>
            <p className="text-sm md:text-base text-white/65 leading-relaxed">
              Join {readerCount.toLocaleString()} readers building the future of intelligent reading.
            </p>
          </div>

          {/* Right: Form */}
          <div className="w-full md:w-auto md:flex-1 md:max-w-md">
            {submitted ? (
              <div
                className="flex items-center gap-3 text-white/70"
                style={{
                  animation: "fadeIn 0.5s ease forwards",
                }}
              >
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-4 h-4 text-white/70" />
                </div>
                <p className="text-sm">
                  {"You're on the list. We'll be in touch."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="flex-1 bg-transparent border border-white/20 text-white/90 placeholder:text-white/45 px-5 py-3.5 text-sm focus:outline-none focus:border-white/50 transition-colors duration-300"
                  style={{ borderRight: "none" }}
                />
                <button
                  type="submit"
                  className="group flex items-center gap-2.5 bg-[#FFDB01] text-black px-6 py-3.5 text-sm font-semibold transition-all duration-500 hover:bg-[#FFDB01]/90 flex-shrink-0"
                >
                  Join
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
