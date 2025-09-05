"use client"

import Image, { type ImageProps } from "next/image"
import { useRef } from "react"

function cn(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ")
}

export type TiltImageProps = ImageProps & {
  intensity?: number // 0..1
}

/**
 * Kleine tilt/parallax wrapper om Next/Image heen.
 * Alle ImageProps (incl. priority) worden doorgelaten.
 */
export default function TiltImage({
  className,
  intensity = 0.12,
  style,
  alt,
  ...imgProps
}: TiltImageProps) {
  const ref = useRef<HTMLDivElement>(null)

  // optioneel: superlichte tilt (geen externe lib)
  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `rotateX(${-(py * 6 * intensity)}deg) rotateY(${px * 6 * intensity}deg) translateZ(0)`
  }

  function onMouseLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)"
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn(
        "will-change-transform transition-transform duration-150 ease-out",
        className,
      )}
      style={{
        transformStyle: "preserve-3d",
        perspective: "800px",
        ...style,
      }}
    >
      <Image alt={alt} {...imgProps} />
    </div>
  )
}
