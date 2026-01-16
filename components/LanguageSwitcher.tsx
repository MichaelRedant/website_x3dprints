"use client"

import { useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { LOCALE_LABELS, LOCALE_NAMES, type Locale, DEFAULT_LOCALE } from "@/lib/i18n/locales"
import { useLocale } from "./LocaleProvider"
import { cn } from "@/lib/utils"
import { localizeHref } from "@/lib/i18n/paths"

function buildHref(pathname: string, searchParams: URLSearchParams, locale: Locale) {
  const params = new URLSearchParams(searchParams.toString())
  if (locale === DEFAULT_LOCALE) {
    params.delete("lang")
  } else {
    params.set("lang", locale)
  }
  const query = params.toString()
  const hash = typeof window !== "undefined" ? window.location.hash : ""
  return localizeHref(`${pathname}${query ? `?${query}` : ""}${hash}`, locale)
}

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale()
  const pathname = usePathname() || "/"
  const searchParams = useSearchParams() ?? new URLSearchParams()
  const router = useRouter()

  const options = useMemo(
    () => [
      { code: "nl" as Locale, label: LOCALE_LABELS.nl, name: LOCALE_NAMES.nl },
      { code: "en" as Locale, label: LOCALE_LABELS.en, name: LOCALE_NAMES.en },
    ],
    [],
  )

  const handleChange = (next: Locale) => {
    if (next === locale) return
    const href = buildHref(pathname, searchParams as URLSearchParams, next)
    setLocale(next)
    router.push(href)
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-xl border border-slate-200/70 bg-white/70 px-1 py-1 text-xs font-semibold shadow-sm dark:border-[#1f2336] dark:bg-[#0B0F1A]/90",
        className,
      )}
      aria-label="Taal kiezen"
    >
      {options.map((opt) => {
        const active = opt.code === locale
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => handleChange(opt.code)}
            className={cn(
              "min-w-[42px] rounded-lg px-2 py-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0B0F1A]",
              active
                ? "bg-indigo-600 text-white shadow-[0_6px_18px_rgba(99,102,241,.35)] dark:bg-[#D7263D]"
                : "text-slate-700 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-[#111525]",
            )}
            aria-pressed={active}
            aria-label={opt.name}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
