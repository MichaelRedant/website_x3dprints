"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useLocale } from "./LocaleProvider"
import { localizeHref } from "@/lib/i18n/paths"
import {
  CookieConsentValue,
  REQUEST_BANNER_EVENT,
  onConsentChange,
  persistConsent,
  readStoredConsent,
} from "@/lib/cookie-consent"

export default function CookieBanner() {
  const { locale } = useLocale()
  const localize = (href: string) => localizeHref(href, locale)
  const [open, setOpen] = useState(false)
  const [lastChoice, setLastChoice] = useState<CookieConsentValue | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const existing = readStoredConsent()
    if (!existing) {
      setOpen(true)
    } else {
      setLastChoice(existing)
    }
  }, [])

  useEffect(() => {
    const handler = () => {
      const current = readStoredConsent()
      setLastChoice(current)
      setOpen(true)
      setTimeout(() => {
        dialogRef.current?.focus()
      }, 0)
    }

    window.addEventListener(REQUEST_BANNER_EVENT, handler)
    return () => window.removeEventListener(REQUEST_BANNER_EVENT, handler)
  }, [])

  useEffect(() => {
    const unsubscribe = onConsentChange((value) => {
      setLastChoice(value)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => {
      dialogRef.current?.focus()
    }, 50)
    return () => clearTimeout(timer)
  }, [open])

  const handleChoice = (value: CookieConsentValue) => {
    persistConsent(value)
    setLastChoice(value)
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[80] flex justify-center px-4 sm:px-6">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-banner-title"
        tabIndex={-1}
        className={cn(
          "pointer-events-auto w-full max-w-3xl rounded-2xl border border-slate-200/70 bg-white/90 shadow-xl backdrop-blur",
          "ring-1 ring-black/5",
        )}
      >
        <div className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6 sm:p-6">
          <div>
            <p id="cookie-banner-title" className="text-sm font-semibold tracking-tight text-slate-900">
              Cookies voor analyse
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              We gebruiken Google Analytics om de prestaties van onze website te meten. We plaatsen alleen analytische cookies
              nadat je hiervoor toestemming hebt gegeven. Lees meer in ons{" "}
              <Link href={localize("/cookies")} className="font-medium text-slate-900 underline-offset-2 hover:underline">
                cookiebeleid
              </Link>
              .
            </p>
            {lastChoice && (
              <p className="mt-2 text-xs text-slate-500">
                Huidige keuze: {lastChoice === "granted" ? "cookies toegestaan" : "cookies geweigerd"}.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 sm:justify-self-end">
            <button
              type="button"
              onClick={() => handleChoice("denied")}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200/70 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
            >
              Weigeren
            </button>
            <button
              type="button"
              onClick={() => handleChoice("granted")}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200/70 bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(99,102,241,.35)] transition hover:brightness-110"
            >
              Accepteren
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
