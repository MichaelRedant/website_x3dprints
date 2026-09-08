"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { trackEvent } from "@/lib/analytics"

type Props = {
  href: string
  children: React.ReactNode
  className?: string
  wrapperClassName?: string
  onClick?: () => void
  event?: {
    action: string
    category?: string
    label?: string
    value?: number
  }
}

export default function ShimmerButton({ href, children, className, wrapperClassName, onClick, event }: Props) {
  const handleClick = () => {
    if (event) trackEvent(event)
    if (onClick) onClick()
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn("relative inline-flex", wrapperClassName)}
    >
      <Link
        href={href}
        onClick={handleClick}
        className={cn(
          "group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white",
          "bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)] shadow-[0_10px_30px_rgba(99,102,241,.35)]",
          "transition-[box-shadow,filter] hover:shadow-[0_12px_40px_rgba(99,102,241,.55)] hover:brightness-110",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
          "dark:border dark:border-cyan-300/50 dark:bg-[linear-gradient(105deg,#4338ca,#0369a1)] dark:text-white dark:shadow-[0_12px_34px_rgba(8,145,178,.25)] dark:ring-offset-slate-950",
          "dark:hover:border-cyan-200/70 dark:hover:shadow-[0_16px_42px_rgba(8,145,178,.34)] dark:hover:brightness-110",
          className
        )}
      >
        {children}
        <span className="i-lucide-arrow-right transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
    </motion.div>
  )
}
