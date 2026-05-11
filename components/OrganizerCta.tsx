import Link from "next/link"
import Reveal from "@/components/Reveal"
import { cn } from "@/lib/utils"
import { localizeHref } from "@/lib/i18n/paths"

type Locale = "nl" | "en"

const copy = {
  nl: {
    kicker: "Tool organizers op maat",
    title: "Perfect georganiseerde gereedschapskoffers, op maat van jouw systeem.",
    body: "Gridfinity, Milwaukee Packout, TSTAK en volledig custom inserts. Geen rammel, labelbaar, antislip optioneel.",
    bullets: [
      "Gridfinity - open-source grid voor lades, bureaus en koffers",
      "Packout inlays die stil blijven in de camionette",
      "TSTAK inserts met labelzones en antislip",
      "Custom pegboard/Skadis, bins of parametric organizers",
    ],
    primary: "Bekijk tool organizers",
    secondary: "Plan een indeling",
    tertiary: "Materialen & grip",
  },
  en: {
    kicker: "Tool organizers, made to fit",
    title: "Perfectly organized tool cases, tailored to your system.",
    body: "Gridfinity, Milwaukee Packout, TSTAK and fully custom inserts. No rattle, label-ready, anti-slip optional.",
    bullets: [
      "Gridfinity - open-source grid for drawers, desks and cases",
      "Packout inlays that stay quiet in the van",
      "TSTAK inserts with label zones and anti-slip",
      "Custom pegboard/Skadis, bins or parametric organizers",
    ],
    primary: "See tool organizers",
    secondary: "Plan a layout",
    tertiary: "Materials & grip",
  },
}

export default function OrganizerCta({
  locale = "nl",
  variant = "light",
  className,
}: {
  locale?: Locale
  variant?: "light" | "dark"
  className?: string
}) {
  const t = copy[locale]
  const localize = (href: string) => localizeHref(href, locale)
  const darkVariant = variant === "dark"

  return (
    <Reveal
      className={cn(
        "relative overflow-hidden rounded-3xl border px-6 py-7 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition",
        darkVariant
          ? "border-slate-800 bg-[#0B0F1A]/90 ring-0"
          : "border-slate-100 bg-white/85 ring-1 ring-white/70 backdrop-blur dark:border-slate-700/70 dark:bg-slate-950/80 dark:ring-0",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_20%_20%,rgba(34,211,238,0.12),transparent),radial-gradient(120%_120%_at_80%_10%,rgba(255,0,168,0.14),transparent)]"
      />
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.24em]",
              darkVariant ? "text-cyan-200" : "text-cyan-700 dark:text-cyan-300",
            )}
          >
            {t.kicker}
          </p>
          <h2 className={cn("text-xl font-bold sm:text-2xl", darkVariant ? "text-white" : "text-slate-900 dark:text-white")}>
            {t.title}
          </h2>
          <p className={cn("max-w-3xl text-sm", darkVariant ? "text-slate-200" : "text-slate-700 dark:text-slate-300")}>
            {t.body}
          </p>
          <ul className={cn("grid gap-1 text-sm", darkVariant ? "text-slate-100" : "text-slate-800 dark:text-slate-200")}>
            {t.bullets.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <span className="i-lucide-sparkles text-cyan-500" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={localize("/organizers")}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition",
              darkVariant
                ? "bg-white text-slate-900 shadow-sm hover:-translate-y-0.5"
                : "bg-slate-900 text-white shadow-lg shadow-slate-900/15 hover:-translate-y-0.5 dark:bg-slate-100 dark:text-slate-900",
            )}
          >
            {t.primary}
            <span className="i-lucide-arrow-right" aria-hidden />
          </Link>
          <Link
            href={localize("/contact?material=organizers")}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition",
              darkVariant
                ? "border-slate-700 text-slate-100 hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-100"
                : "border-slate-200 text-slate-900 hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-900 dark:border-slate-700 dark:text-slate-100 dark:hover:border-cyan-300 dark:hover:text-cyan-100",
            )}
          >
            {t.secondary}
            <span className="i-lucide-layout-grid" aria-hidden />
          </Link>
          <Link
            href={localize("/materials#material-suggestion-tool")}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition",
              darkVariant
                ? "border-slate-700 text-slate-100 hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-100"
                : "border-slate-200 text-slate-900 hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-900 dark:border-slate-700 dark:text-slate-100 dark:hover:border-cyan-300 dark:hover:text-cyan-100",
            )}
          >
            {t.tertiary}
            <span className="i-lucide-sparkle" aria-hidden />
          </Link>
        </div>
      </div>
    </Reveal>
  )
}
