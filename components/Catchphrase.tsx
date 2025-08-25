"use client"
import { motion, useReducedMotion } from "framer-motion"
import { PropsWithChildren } from "react"

export default function Catchphrase({ children, className }: PropsWithChildren<{ className?: string }>) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      className={className}
      initial={reduce ? undefined : { opacity: 0, y: 8 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.span>
  )
}
