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
      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}
