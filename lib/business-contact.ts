const DEFAULT_PHONE = "+32496908503"
const DEFAULT_EMAIL = "michael@xinudesign.be"

function normalizePhoneForHref(phone: string) {
  return phone.replace(/[^\d+]/g, "")
}

export const BUSINESS_CONTACT = {
  phone: (process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? DEFAULT_PHONE).trim() || DEFAULT_PHONE,
  email: (process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? DEFAULT_EMAIL).trim() || DEFAULT_EMAIL,
}

export function getBusinessPhoneHref() {
  return `tel:${normalizePhoneForHref(BUSINESS_CONTACT.phone)}`
}

export function getBusinessEmailHref(subject?: string) {
  if (!subject) return `mailto:${BUSINESS_CONTACT.email}`
  return `mailto:${BUSINESS_CONTACT.email}?subject=${encodeURIComponent(subject)}`
}
