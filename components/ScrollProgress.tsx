"use client"

import { motion, useScroll } from "framer-motion"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)]"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
