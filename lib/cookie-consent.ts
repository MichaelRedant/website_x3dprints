export type CookieConsentValue = "granted" | "denied"

const STORAGE_KEY = "x3dprints:cookie-consent"
const COOKIE_NAME = "x3dprints-cookie-consent"
export const CONSENT_EVENT = "x3dprints:cookie-consent-change"
export const REQUEST_BANNER_EVENT = "x3dprints:cookie-consent-open"
const MAX_AGE_SECONDS = 60 * 60 * 24 * 365
const MAX_AGE_MS = MAX_AGE_SECONDS * 1000

type StoredConsent = { value: CookieConsentValue; expiresAt: number }

function safeWindow(): Window | undefined {
  if (typeof window === "undefined") return undefined
  return window
}

function storeConsent(w: Window, value: CookieConsentValue, expiresAt: number) {
  try {
    const payload: StoredConsent = { value, expiresAt }
    w.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // Ignore storage errors (e.g. Safari private mode)
  }
}

export function readStoredConsent(): CookieConsentValue | null {
  const w = safeWindow()
  if (!w) return null

  try {
    const raw = w.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      if (raw === "granted" || raw === "denied") {
        storeConsent(w, raw, Date.now() + MAX_AGE_MS)
        return raw
      }

      const parsed = JSON.parse(raw) as Partial<StoredConsent>
      if (parsed?.value === "granted" || parsed?.value === "denied") {
        if (typeof parsed.expiresAt === "number" && parsed.expiresAt > Date.now()) {
          return parsed.value
        }
      }

      w.localStorage.removeItem(STORAGE_KEY)
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

  storeConsent(w, value, Date.now() + MAX_AGE_MS)

  const maxAge = MAX_AGE_SECONDS
  if (typeof document !== "undefined") {
    const secure = typeof window !== "undefined" && window.location.protocol === "https:"
    const parts = [`${COOKIE_NAME}=${value}`, "path=/", `max-age=${maxAge}`, "SameSite=Lax"]
    if (secure) parts.push("Secure")
    document.cookie = parts.join(";")
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
