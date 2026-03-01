import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export type HeroTrustItem = {
  icon: LucideIcon
  label: string
  value: string
}

type HeroTrustBarProps = {
  items: HeroTrustItem[]
  className?: string
}

export default function HeroTrustBar({ items, className }: HeroTrustBarProps) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-3", className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <item.icon className="mt-0.5 h-5 w-5 text-indigo-600" aria-hidden />
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
              <p className="mt-0.5 text-sm font-semibold text-slate-900">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
