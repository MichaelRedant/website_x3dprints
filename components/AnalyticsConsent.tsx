"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { CookieConsentValue, onConsentChange, readStoredConsent } from "@/lib/cookie-consent"

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export default function AnalyticsConsent() {
  const [consent, setConsent] = useState<CookieConsentValue | null>(null)
  const canLoadAnalytics = consent === "granted" && typeof GA_TRACKING_ID === "string" && GA_TRACKING_ID.length > 0

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
    if (typeof GA_TRACKING_ID !== "string" || GA_TRACKING_ID.length === 0) return
    if (consent === "granted") {
      ;(window as typeof window & { [key: string]: unknown })[`ga-disable-${GA_TRACKING_ID}`] = false
    } else {
      ;(window as typeof window & { [key: string]: unknown })[`ga-disable-${GA_TRACKING_ID}`] = true
    }
  }, [consent])

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
