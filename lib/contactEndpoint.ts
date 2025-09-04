// lib/contactEndpoint.ts
export function getContactEndpoint() {
  // In productie op static hosting naar PHP
  if (process.env.NEXT_PUBLIC_CONTACT_ENDPOINT) {
    return process.env.NEXT_PUBLIC_CONTACT_ENDPOINT
  }
  // Default lokaal naar Next API
  return "/api/contact"
}
