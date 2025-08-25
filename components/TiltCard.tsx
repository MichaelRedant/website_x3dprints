"use client"

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion"
import { PropsWithChildren, useRef } from "react"

type Props = PropsWithChildren<{ className?: string; maxTilt?: number }>

export default function TiltCard({ children, className, maxTilt = 8 }: Props) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const sx = useSpring(rx, { stiffness: 150, damping: 20 })
  const sy = useSpring(ry, { stiffness: 150, damping: 20 })

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || reduce) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rx.set((py - 0.5) * -2 * maxTilt)
    ry.set((px - 0.5) * 2 * maxTilt)
  }
  function onLeave() {
    rx.set(0); ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduce ? undefined : { rotateX: sx, rotateY: sy, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
