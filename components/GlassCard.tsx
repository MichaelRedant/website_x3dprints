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
        "dark:text-slate-100 dark:border-[#0F203C] dark:bg-[radial-gradient(120%_140%_at_20%_20%,rgba(0,230,255,0.06),transparent),radial-gradient(140%_120%_at_80%_0%,rgba(215,38,61,0.06),transparent),#0B0F1A]",
        "dark:shadow-[0_24px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,230,255,0.18)]",
        "dark:backdrop-blur-2xl dark:[text-shadow:0_0_12px_rgba(0,230,255,0.18)]",
      className
      )}
    >
      {children}
    </div>
  )
}
