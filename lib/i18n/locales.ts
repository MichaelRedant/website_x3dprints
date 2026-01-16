// Locale definitions shared across the app
export const SUPPORTED_LOCALES = ["nl", "en"] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: Locale = "nl"

export const LOCALE_LABELS: Record<Locale, string> = {
  nl: "NL",
  en: "EN",
}

export const LOCALE_NAMES: Record<Locale, string> = {
  nl: "Nederlands",
  en: "English",
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && SUPPORTED_LOCALES.includes(value as Locale)
}

export function normalizeLocale(value?: string | null): Locale {
  if (!value) return DEFAULT_LOCALE
  const lower = value.toLowerCase()
  if (isLocale(lower)) return lower
  if (lower.startsWith("en")) return "en"
  if (lower.startsWith("nl")) return "nl"
  return DEFAULT_LOCALE
}
