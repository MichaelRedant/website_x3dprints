"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Props = {
  href: string
  children: React.ReactNode
  className?: string
}

export default function ShimmerButton({ href, children, className }: Props) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative inline-flex">
      <Link
        href={href}
        className={cn(
          "group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white",
          "bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)] shadow-[0_10px_30px_rgba(99,102,241,.35)]",
          "transition-[box-shadow,filter] hover:shadow-[0_12px_40px_rgba(99,102,241,.55)] hover:brightness-110",
          className
        )}
      >
        {children}
        <span className="i-lucide-arrow-right transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
    </motion.div>
  )
}
