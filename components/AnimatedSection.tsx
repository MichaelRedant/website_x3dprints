"use client"
import { motion, useReducedMotion } from "framer-motion"
import { ReactNode } from "react"

export default function AnimatedSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.section
      className={className}
      // Keep opacity at 1 on mount so sections remain visible immediately after load.
      initial={prefersReduced ? false : { opacity: 1, y: 12 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  )
}
