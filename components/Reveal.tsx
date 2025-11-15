"use client"

import { motion, useReducedMotion } from "framer-motion"
import { PropsWithChildren } from "react"

type RevealProps = PropsWithChildren<{
  delay?: number
  className?: string
}>

export default function Reveal({ children, delay = 0.1, className }: RevealProps) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      // Keep opacity at 1 on mount so content is immediately visible after SSR hydration.
      initial={prefersReduced ? false : { opacity: 1, y: 12 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}
