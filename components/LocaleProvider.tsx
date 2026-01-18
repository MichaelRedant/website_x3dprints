"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { DEFAULT_LOCALE, isLocale, normalizeLocale, type Locale } from "@/lib/i18n/locales"

type LocaleContextValue = {
  locale: Locale
  setLocale: (value: Locale) => void
}

const STORAGE_KEY = "x3d-locale"

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)

export default function LocaleProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: React.ReactNode
  initialLocale?: Locale
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale)

  // Initialize from query param/localStorage/navigator
  useEffect(() => {
    const fromQuery =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("lang")
        : null
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null
    const fromPath =
      typeof window !== "undefined"
        ? window.location.pathname.split("/").filter(Boolean)[0] // e.g. "en"
        : null
    const fromNavigator =
      typeof navigator !== "undefined" ? navigator.language ?? navigator.languages?.[0] : null

    let next: Locale
    if (fromQuery) next = normalizeLocale(fromQuery)
    else if (stored) next = normalizeLocale(stored)
    else if (fromPath) next = normalizeLocale(fromPath)
    else if (fromNavigator)
      next = fromNavigator.toLowerCase().startsWith("nl") ? "nl" : "en"
    else next = DEFAULT_LOCALE

    setLocale(next)
    document.documentElement.lang = next
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, next)
    }
  }, [])

  // Persist and mirror on <html>
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, locale)
    }
    document.documentElement.lang = locale
    document.documentElement.dataset.locale = locale
  }, [locale])

  const value = useMemo(() => ({ locale, setLocale }), [locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider")
  return ctx
}
