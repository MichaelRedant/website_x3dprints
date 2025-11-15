export type CookieConsentValue = "granted" | "denied"

const STORAGE_KEY = "x3dprints:cookie-consent"
const COOKIE_NAME = "x3dprints-cookie-consent"
export const CONSENT_EVENT = "x3dprints:cookie-consent-change"
export const REQUEST_BANNER_EVENT = "x3dprints:cookie-consent-open"

function safeWindow(): Window | undefined {
  if (typeof window === "undefined") return undefined
  return window
}

export function readStoredConsent(): CookieConsentValue | null {
  const w = safeWindow()
  if (!w) return null

  try {
    const fromStorage = w.localStorage.getItem(STORAGE_KEY) as CookieConsentValue | null
    if (fromStorage === "granted" || fromStorage === "denied") {
      return fromStorage
    }
  } catch {
    // localStorage might be blocked; ignore and fall back to cookies
  }

  if (typeof document === "undefined") return null

  const cookie = document.cookie
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${COOKIE_NAME}=`))

  if (!cookie) return null

  const value = cookie.split("=")[1]
  if (value === "granted" || value === "denied") {
    return value
  }

  return null
}

export function persistConsent(value: CookieConsentValue) {
  const w = safeWindow()
  if (!w) return

  try {
    w.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Ignore storage errors (e.g. Safari private mode)
  }

  const maxAge = 60 * 60 * 24 * 180 // 180 days
  if (typeof document !== "undefined") {
    document.cookie = `${COOKIE_NAME}=${value};path=/;max-age=${maxAge};SameSite=Lax`
  }

  w.dispatchEvent(new CustomEvent<CookieConsentValue>(CONSENT_EVENT, { detail: value }))
}

export function requestConsentBanner() {
  const w = safeWindow()
  if (!w) return
  w.dispatchEvent(new Event(REQUEST_BANNER_EVENT))
}

export function onConsentChange(callback: (value: CookieConsentValue) => void) {
  const w = safeWindow()
  if (!w) return () => {}

  const handler = (event: Event) => {
    const detail = (event as CustomEvent<CookieConsentValue>).detail
    if (detail === "granted" || detail === "denied") {
      callback(detail)
    }
  }

  w.addEventListener(CONSENT_EVENT, handler as EventListener)
  return () => w.removeEventListener(CONSENT_EVENT, handler as EventListener)
}
