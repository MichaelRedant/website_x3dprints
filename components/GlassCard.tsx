import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export default function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  )
}
