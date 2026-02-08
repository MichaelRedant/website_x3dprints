"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"
import { CookieConsentValue, onConsentChange, readStoredConsent } from "@/lib/cookie-consent"

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export default function AnalyticsConsent() {
  const [consent, setConsent] = useState<CookieConsentValue | null>(null)
  const hasTrackingId = Boolean(GA_TRACKING_ID)
  const canLoadAnalytics = consent === "granted" && hasTrackingId
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastPagePath = useRef<string | null>(null)

  const pagePath = useMemo(() => {
    const query = searchParams?.toString()
    return query ? `${pathname}?${query}` : pathname
  }, [pathname, searchParams])

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

  useEffect(() => {
    if (!canLoadAnalytics) {
      lastPagePath.current = null
      return
    }
    const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag
    if (!gtag) return
    if (!lastPagePath.current) {
      lastPagePath.current = pagePath
      return
    }
    if (lastPagePath.current === pagePath) return
    lastPagePath.current = pagePath
    gtag("event", "page_view", {
      page_path: pagePath,
      page_title: document.title,
    })
  }, [canLoadAnalytics, pagePath])

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
            gtag('config', '${GA_TRACKING_ID}', { anonymize_ip: true, cookie_domain: 'auto' });
          `}
        </Script>
      )}
    </>
  )
}
