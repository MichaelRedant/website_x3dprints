"use client"

import { motion, useReducedMotion } from "framer-motion"
import { PropsWithChildren } from "react"

type RevealProps = PropsWithChildren<{
  delay?: number
  className?: string
}>

export default function Reveal({ children, delay = 0.1, className }: RevealProps) {
  const prefersReduced = useReducedMotion()
  const initialState = prefersReduced ? false : { opacity: 0.72, y: 14 }
  const revealState = prefersReduced ? {} : { opacity: 1, y: 0 }
  const viewport = { once: true, amount: 0.08, margin: "0px 0px 12% 0px" as const }
  const transition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay }

  return (
    <motion.div
      className={className}
      // Keep the effect subtle enough for above-the-fold content while still giving a visible scroll cue.
      initial={initialState}
      whileInView={revealState}
      viewport={viewport}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
