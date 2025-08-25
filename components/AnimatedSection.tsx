"use client"
import { motion, useReducedMotion } from "framer-motion"
import { ReactNode } from "react"

export default function AnimatedSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.section
      className={className}
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.section>
  )
}
