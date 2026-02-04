"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { trackEvent } from "@/lib/analytics"

type Props = {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  event?: {
    action: string
    category?: string
    label?: string
    value?: number
  }
}

export default function ShimmerButton({ href, children, className, onClick, event }: Props) {
  const handleClick = () => {
    if (event) trackEvent(event)
    if (onClick) onClick()
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative inline-flex">
      <Link
        href={href}
        onClick={handleClick}
        className={cn(
          "group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white",
          "bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)] shadow-[0_10px_30px_rgba(99,102,241,.35)]",
          "transition-[box-shadow,filter] hover:shadow-[0_12px_40px_rgba(99,102,241,.55)] hover:brightness-110",
          "dark:border dark:border-[#00E6FF]/40 dark:bg-[radial-gradient(circle_at_20%_20%,rgba(0,230,255,0.18),transparent),linear-gradient(120deg,#0F1324,#0B0F1A)] dark:shadow-[0_10px_30px_rgba(0,230,255,.35)]",
          "dark:hover:shadow-[0_14px_40px_rgba(0,230,255,.55)] dark:hover:brightness-110",
          className
        )}
      >
        {children}
        <span className="i-lucide-arrow-right transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
    </motion.div>
  )
}
