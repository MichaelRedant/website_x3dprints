"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { CookieConsentValue, onConsentChange, readStoredConsent } from "@/lib/cookie-consent"

const DEFAULT_GA_ID = "G-QPQ7LDMSRV"
const envTrackingId = process.env.NEXT_PUBLIC_GA_ID
const GA_TRACKING_ID =
  typeof envTrackingId === "string" && envTrackingId.trim().length > 0 ? envTrackingId.trim() : DEFAULT_GA_ID

export default function AnalyticsConsent() {
  const [consent, setConsent] = useState<CookieConsentValue | null>(null)
  const hasTrackingId = GA_TRACKING_ID.length > 0
  const canLoadAnalytics = consent === "granted" && hasTrackingId

  useEffect(() => {
    const initial = readStoredConsent()
    if (initial) {
      setConsent(initial)
    }

    const unsubscribe = onConsentChange((value) => {
      setConsent(value)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!hasTrackingId) return
    const disableKey = `ga-disable-${GA_TRACKING_ID}`
    ;(window as typeof window & { [key: string]: unknown })[disableKey] = consent === "granted" ? false : true
  }, [consent, hasTrackingId])

  if (!hasTrackingId) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Google Analytics tracking ID ontbreekt: stel NEXT_PUBLIC_GA_ID in of gebruik de default.")
    }
    return null
  }

  if (!canLoadAnalytics) {
    return null
  }

  return (
    <>
      <Script id="ga-loader" src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="afterInteractive" />
      <Script id="ga-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
