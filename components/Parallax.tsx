"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { PropsWithChildren, useRef } from "react"

type Props = PropsWithChildren<{ offset?: number; className?: string }>

export default function Parallax({ children, offset = 30, className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduce = useReducedMotion()

  // Hooks altijd onvoorwaardelijk aanroepen
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const yRange = useTransform(scrollYProgress, [0, 1], [-offset, offset])

  // Als motion gereduceerd moet worden: geen style meegeven
  const style = reduce ? undefined : { y: yRange }

  return (
    <motion.div ref={ref} style={style} className={className}>
      {children}
    </motion.div>
  )
}
