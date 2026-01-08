"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { PropsWithChildren, useRef } from "react"

type Props = PropsWithChildren<{
  offset?: number
  className?: string
  mode?: "element" | "page"
  range?: number
}>

export default function Parallax({
  children,
  offset = 30,
  className,
  mode = "element",
  range = 800,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduce = useReducedMotion()

  // Hooks altijd onvoorwaardelijk aanroepen
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const { scrollY } = useScroll()
  const targetRange = useTransform(scrollYProgress, [0, 1], [-offset, offset])
  const pageRange = useTransform(scrollY, [0, range], [0, offset])
  const yRange = mode === "page" ? pageRange : targetRange

  // Als motion gereduceerd moet worden: geen style meegeven
  const style = reduce ? undefined : { y: yRange }

  return (
    <motion.div ref={ref} style={style} className={className}>
      {children}
    </motion.div>
  )
}
