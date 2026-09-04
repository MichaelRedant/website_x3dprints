export type GaEvent = {
  action: string
  category?: string
  label?: string
  value?: number
  parameters?: Record<string, string | number | boolean | undefined>
}

export function trackEvent(event: GaEvent) {
  if (typeof window === "undefined") return
  const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag
  if (!gtag) return

  const parameters: Record<string, string | number | boolean> = {}
  for (const [key, value] of Object.entries(event.parameters ?? {})) {
    if (value !== undefined) parameters[key] = value
  }
  if (event.category) parameters.event_category = event.category
  if (event.label) parameters.event_label = event.label
  if (event.value !== undefined) parameters.value = event.value

  gtag("event", event.action, {
    ...parameters,
  })
}
