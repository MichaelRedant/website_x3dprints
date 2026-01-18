"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { LOCALE_LABELS, LOCALE_NAMES, SUPPORTED_LOCALES, type Locale, DEFAULT_LOCALE } from "@/lib/i18n/locales"
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
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [menuStyle, setMenuStyle] = useState({ top: 0, left: 0, width: 190 })
  const rootRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const activeBadge = locale === "en" ? "Active" : "Actief"

  useEffect(() => {
    setMounted(true)
  }, [])

  const updateMenuPosition = () => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const width = 190
    const viewportPadding = 8
    const left = Math.min(
      Math.max(viewportPadding, rect.right - width),
      window.innerWidth - width - viewportPadding,
    )
    const top = rect.bottom + 8
    setMenuStyle({ top, left, width })
  }

  useEffect(() => {
    if (!open) return
    updateMenuPosition()
    const handleOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (rootRef.current?.contains(target)) return
      if (menuRef.current?.contains(target)) return
      setOpen(false)
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    const handleScroll = () => updateMenuPosition()
    const handleResize = () => updateMenuPosition()
    document.addEventListener("mousedown", handleOutside)
    document.addEventListener("keydown", handleKey)
    window.addEventListener("scroll", handleScroll, true)
    window.addEventListener("resize", handleResize)
    return () => {
      document.removeEventListener("mousedown", handleOutside)
      document.removeEventListener("keydown", handleKey)
      window.removeEventListener("scroll", handleScroll, true)
      window.removeEventListener("resize", handleResize)
    }
  }, [open])

  const handleChange = (next: Locale) => {
    if (next === locale) return
    const href = buildHref(pathname, searchParams as URLSearchParams, next)
    setLocale(next)
    router.push(href)
    setOpen(false)
  }

  const options = useMemo(
    () =>
      SUPPORTED_LOCALES.map((code) => ({
        code,
        label: LOCALE_LABELS[code],
        name: LOCALE_NAMES[code],
      })),
    [],
  )

  const flagFor = (code: string) => {
    if (code === "en") return FlagEn
    if (code === "nl") return FlagBe
    return null
  }

  return (
    <div ref={rootRef} className={cn("relative inline-flex", className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={locale === "en" ? "Choose language" : "Kies taal"}
        className={cn(
          "inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/80 px-2.5 py-1.5 shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5",
          "dark:border-[#1f2336] dark:bg-[#0B0F1A]/90 dark:shadow-[0_12px_30px_rgba(0,0,0,0.45)]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0B0F1A]",
        )}
      >
        <span className="inline-flex h-6 w-8 items-center justify-center overflow-hidden rounded-md border border-white/70 bg-white/70">
          {(() => {
            const Flag = flagFor(locale)
            return Flag ? (
              <Flag className="h-full w-full" />
            ) : (
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                {LOCALE_LABELS[locale]}
              </span>
            )
          })()}
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-700 dark:text-slate-100">
            {LOCALE_LABELS[locale]}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-300">{LOCALE_NAMES[locale]}</span>
        </span>
        <svg viewBox="0 0 20 20" aria-hidden className="h-3.5 w-3.5 text-slate-500">
          <path d="M5 7l5 6 5-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      {open && mounted
        ? createPortal(
            <div
              ref={menuRef}
              role="listbox"
              aria-label={locale === "en" ? "Language options" : "Taalopties"}
              className="fixed z-[9999] rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-2xl backdrop-blur dark:border-[#1f2336] dark:bg-[#0B0F1A]/95"
              style={{ top: menuStyle.top, left: menuStyle.left, width: menuStyle.width }}
            >
              <div className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">
                {locale === "en" ? "Language" : "Taal"}
              </div>
              {options.map((option) => {
                const active = option.code === locale
                const Flag = flagFor(option.code)
                return (
                  <button
                    key={option.code}
                    role="option"
                    aria-selected={active}
                    type="button"
                    onClick={() => handleChange(option.code)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition",
                      active
                        ? "bg-indigo-600/10 text-slate-900 dark:bg-indigo-500/20 dark:text-white"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-[#111525]",
                    )}
                  >
                    <span className="inline-flex h-6 w-9 items-center justify-center overflow-hidden rounded-md border border-white/70 bg-white/70">
                      {Flag ? (
                        <Flag className="h-full w-full" />
                      ) : (
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                          {option.label}
                        </span>
                      )}
                    </span>
                    <span className="flex flex-col items-start">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.3em]">{option.label}</span>
                      <span className="text-xs opacity-70">{option.name}</span>
                    </span>
                    {active ? <span className="ml-auto text-xs font-semibold text-indigo-600">{activeBadge}</span> : null}
                  </button>
                )
              })}
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}

function FlagBe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden focusable="false">
      <rect width="24" height="16" fill="#111827" />
      <rect x="8" width="8" height="16" fill="#FACC15" />
      <rect x="16" width="8" height="16" fill="#EF4444" />
      <rect width="24" height="16" fill="none" stroke="rgba(255,255,255,0.45)" />
    </svg>
  )
}

function FlagEn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden focusable="false">
      <rect width="60" height="30" fill="#1B3D8A" />
      <path d="M0 0 L60 30 M60 0 L0 30" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M0 0 L60 30 M60 0 L0 30" stroke="#C8102E" strokeWidth="3" />
      <path d="M30 0 V30 M0 15 H60" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M30 0 V30 M0 15 H60" stroke="#C8102E" strokeWidth="6" />
      <rect width="60" height="30" fill="none" stroke="rgba(255,255,255,0.45)" />
    </svg>
  )
}
