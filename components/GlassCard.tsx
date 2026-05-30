import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export default function GlassCard({ children, className = "", ...props }: GlassCardProps) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-3xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-xl text-slate-900",
        "dark:border-slate-700/60 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(15,23,42,0.82))] dark:text-slate-100",
        "dark:shadow-[0_24px_60px_rgba(2,6,23,0.38)] dark:backdrop-blur-2xl",
      className
      )}
    >
      {children}
    </div>
  )
}
