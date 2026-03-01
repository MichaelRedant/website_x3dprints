import type { Locale } from "@/lib/i18n/locales"

export type LeadTimeStatus = {
  label: string
  value: string
  note: string
  refreshed: string
}

const DEFAULT_LEAD_TIME: Record<Locale, LeadTimeStatus> = {
  nl: {
    label: "Huidige doorlooptijd",
    value: "Meestal 2-4 werkdagen",
    note: "Afhankelijk van complexiteit, materiaal en oplage.",
    refreshed: "Planningstatus wordt wekelijks geverifieerd.",
  },
  en: {
    label: "Current lead time",
    value: "Usually 2-4 business days",
    note: "Depends on complexity, material and batch size.",
    refreshed: "Planning status is verified weekly.",
  },
}

function readEnvString(name: string): string | null {
  const raw = process.env[name]
  if (!raw) return null
  const value = raw.trim()
  return value.length > 0 ? value : null
}

function valueOrDefault(
  locale: Locale,
  envName: string,
  fallbackKey: keyof LeadTimeStatus,
) {
  return readEnvString(envName) ?? DEFAULT_LEAD_TIME[locale][fallbackKey]
}

export function getLeadTimeStatus(locale: Locale): LeadTimeStatus {
  const suffix = locale === "en" ? "EN" : "NL"

  return {
    label: valueOrDefault(locale, `NEXT_PUBLIC_LEAD_TIME_LABEL_${suffix}`, "label"),
    value: valueOrDefault(locale, `NEXT_PUBLIC_LEAD_TIME_VALUE_${suffix}`, "value"),
    note: valueOrDefault(locale, `NEXT_PUBLIC_LEAD_TIME_NOTE_${suffix}`, "note"),
    refreshed: valueOrDefault(locale, `NEXT_PUBLIC_LEAD_TIME_REFRESHED_${suffix}`, "refreshed"),
  }
}
