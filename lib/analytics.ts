export type GaEvent = {
  action: string
  category?: string
  label?: string
  value?: number
}

export function trackEvent(event: GaEvent) {
  if (typeof window === "undefined") return
  const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag
  if (!gtag) return
  gtag("event", event.action, {
    event_category: event.category,
    event_label: event.label,
    value: event.value,
  })
}
