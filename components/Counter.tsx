"use client"

import { animate, useMotionValue, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

type Props = {
  from?: number
  to: number
  duration?: number
  className?: string
  /** Aantal decimalen (bv. 1 voor 0,2) */
  decimals?: number
  /** Tekst vóór het getal (bv. "±" of "2–") */
  prefix?: string
  /** Tekst na het getal (bv. " mm" of " d") */
  suffix?: string
  /** Locale voor decimale komma/punt (bv. "nl-BE") */
  locale?: string
}

export default function Counter({
  from = 0,
  to,
  duration = 1.2,
  className,
  decimals = 0,
  prefix = "",
  suffix = "",
  locale = "nl-BE",
}: Props) {
  const reduce = useReducedMotion()
  const mv = useMotionValue(from)
  const [val, setVal] = useState(from)

  useEffect(() => {
    const unsub = mv.on("change", v => setVal(v as number))
    const controls = animate(mv, to, { duration: reduce ? 0 : duration, ease: "easeOut" })
    return () => {
      unsub()
      controls.stop()
    }
  }, [mv, to, duration, reduce])

  // Rond af op gewenst aantal decimalen
  const numeric =
    decimals > 0 ? parseFloat((val as number).toFixed(decimals)) : Math.round(val as number)

  const nf = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return <span className={className}>{`${prefix}${nf.format(numeric)}${suffix}`}</span>
}
