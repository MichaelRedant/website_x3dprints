import { Clock3, RefreshCcw } from "lucide-react"
import type { Locale } from "@/lib/i18n/locales"
import { getLeadTimeStatus } from "@/lib/lead-time"
import { cn } from "@/lib/utils"

type LeadTimeStatusProps = {
  locale: Locale
  className?: string
}

export default function LeadTimeStatus({ locale, className }: LeadTimeStatusProps) {
  const leadTime = getLeadTimeStatus(locale)

  return (
    <aside
      aria-label={leadTime.label}
      className={cn(
        "rounded-2xl border border-emerald-200/80 bg-emerald-50/70 px-4 py-3 shadow-sm dark:border-emerald-300/20 dark:bg-emerald-400/10",
        className,
      )}
    >
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800 dark:text-emerald-200">
        <Clock3 className="h-4 w-4" aria-hidden />
        {leadTime.label}
      </p>
      <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-50">{leadTime.value}</p>
      <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{leadTime.note}</p>
      <p className="mt-2 inline-flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
        <RefreshCcw className="h-3.5 w-3.5" aria-hidden />
        {leadTime.refreshed}
      </p>
    </aside>
  )
}
