const DEFAULT_EMAIL = "michael@xinudesign.be"

export const BUSINESS_CONTACT = {
  email: (process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? DEFAULT_EMAIL).trim() || DEFAULT_EMAIL,
}

export function getBusinessEmailHref(subject?: string) {
  if (!subject) return `mailto:${BUSINESS_CONTACT.email}`
  return `mailto:${BUSINESS_CONTACT.email}?subject=${encodeURIComponent(subject)}`
}
