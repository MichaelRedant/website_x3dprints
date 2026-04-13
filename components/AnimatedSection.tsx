"use client"
import { motion, useReducedMotion } from "framer-motion"
import { ReactNode } from "react"

export default function AnimatedSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion()
  const initialState = prefersReduced ? false : { opacity: 0.72, y: 14 }
  const revealState = prefersReduced ? {} : { opacity: 1, y: 0 }
  const viewport = { once: false, amount: 0.08, margin: "0px 0px 12% 0px" as const }
  const transition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <motion.section
      className={className}
      // Match the default reveal rhythm without making sections disappear on first paint.
      initial={initialState}
      whileInView={revealState}
      viewport={viewport}
      transition={transition}
    >
      {children}
    </motion.section>
  )
}
