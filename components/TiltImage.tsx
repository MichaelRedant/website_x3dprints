"use client"

import Image from "next/image"
import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

interface TiltImageProps {
  src: string
  alt: string
  className?: string
}

export default function TiltImage({ src, alt, className }: TiltImageProps) {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={reduce ? {} : hovered ? { rotateY: 8, rotateX: -8 } : { rotateY: 0, rotateX: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <Image src={src} alt={alt} width={400} height={400} className="h-auto w-full rounded-2xl shadow-lg" />
    </motion.div>
  )
}
