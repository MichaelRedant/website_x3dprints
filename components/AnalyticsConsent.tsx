"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { CookieConsentValue, onConsentChange, readStoredConsent } from "@/lib/cookie-consent"

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-QPQ7LDMSRV"

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
    ;(window as typeof window & { [key: string]: unknown })[`ga-disable-${GA_TRACKING_ID}`] = consent !== "granted"
  }, [consent, hasTrackingId])

  useEffect(() => {
    if (!hasTrackingId || !consent) return
    const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag
    if (!gtag) return

    const status = consent === "granted" ? "granted" : "denied"
    gtag("consent", "update", {
      ad_storage: status,
      ad_user_data: status,
      ad_personalization: status,
      analytics_storage: status,
    })
  }, [consent, hasTrackingId])

  if (!hasTrackingId) return null

  return (
    <>
      {canLoadAnalytics && (
        <Script id="ga-loader" src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="afterInteractive" />
      )}
      {canLoadAnalytics && (
        <Script id="ga-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              wait_for_update: 500
            });
            gtag('consent', 'update', {
              ad_storage: 'granted',
              ad_user_data: 'granted',
              ad_personalization: 'granted',
              analytics_storage: 'granted',
            });
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', { anonymize_ip: true });
          `}
        </Script>
      )}
    </>
  )
}
