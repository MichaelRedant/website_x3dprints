"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { DEFAULT_LOCALE, normalizeLocale, type Locale } from "@/lib/i18n/locales"
import { localizeHref } from "@/lib/i18n/paths"

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
  const deriveInitialLocale = (): Locale => {
    if (typeof window === "undefined") return initialLocale
    const url = new URL(window.location.href)
    const fromQuery = url.searchParams.get("lang")
    const fromStorage = localStorage.getItem(STORAGE_KEY)
    const fromPath = url.pathname.split("/").filter(Boolean)[0] // e.g. "en"
    const fromNavigator =
      typeof navigator !== "undefined" ? navigator.language ?? navigator.languages?.[0] : null

    if (fromQuery) return normalizeLocale(fromQuery)
    if (fromStorage) return normalizeLocale(fromStorage)
    if (fromPath) return normalizeLocale(fromPath)
    if (fromNavigator) return fromNavigator.toLowerCase().startsWith("nl") ? "nl" : "en"
    return initialLocale
  }

  const [locale, setLocale] = useState<Locale>(deriveInitialLocale)

  const applyContentLanguageMeta = (value: Locale) => {
    if (typeof document === "undefined") return
    const langValue = value === "en" ? "en-BE" : "nl-BE"
    let meta = document.querySelector('meta[http-equiv="content-language"]') as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement("meta")
      meta.httpEquiv = "content-language"
      document.head.appendChild(meta)
    }
    meta.content = langValue
  }

  // Normalize URL (?lang=) and keep <html lang> in sync on mount
  useEffect(() => {
    if (typeof window === "undefined") return
    const url = new URL(window.location.href)
    const canonicalHref = localizeHref(
      `${url.pathname}${url.search}${url.hash}`,
      locale,
    )
    const currentHref = `${url.pathname}${url.search}${url.hash}`

    // Normalize ?lang= to canonical path to avoid duplicate indexation
    if (canonicalHref !== currentHref) {
      window.location.replace(canonicalHref)
      return
    }

    if (url.searchParams.has("lang")) {
      url.searchParams.delete("lang")
      const cleaned = `${url.pathname}${url.searchParams.toString() ? `?${url.searchParams.toString()}` : ""}${url.hash}`
      if (cleaned !== currentHref) {
        window.history.replaceState({}, "", cleaned)
      }
    }

    document.documentElement.lang = locale
    applyContentLanguageMeta(locale)
  }, [locale])

  // Persist and mirror on <html>
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, locale)
    }
    document.documentElement.lang = locale
    document.documentElement.dataset.locale = locale
    applyContentLanguageMeta(locale)
  }, [locale])

  const value = useMemo(() => ({ locale, setLocale }), [locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider")
  return ctx
}
