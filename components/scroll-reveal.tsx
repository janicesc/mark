"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import type { ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: string
  duration?: number
  threshold?: number
  as?: "div" | "section" | "article" | "aside"
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = "40px",
  duration = 0.8,
  threshold = 0.15,
  as: Tag = "div",
}: ScrollRevealProps) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({ threshold })

  const translateMap = {
    up: `translateY(${distance})`,
    down: `translateY(-${distance})`,
    left: `translateX(${distance})`,
    right: `translateX(-${distance})`,
    none: "none",
  }

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : translateMap[direction],
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  )
}
