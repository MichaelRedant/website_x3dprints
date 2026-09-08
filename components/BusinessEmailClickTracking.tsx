"use client"

import { useEffect } from "react"
import { trackEvent } from "@/lib/analytics"
import { BUSINESS_CONTACT } from "@/lib/business-contact"

export default function BusinessEmailClickTracking() {
  useEffect(() => {
    const businessEmail = BUSINESS_CONTACT.email.toLowerCase()

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return

      const link = event.target.closest<HTMLAnchorElement>('a[href^="mailto:"]')
      if (!link) return

      const email = link.getAttribute("href")?.slice("mailto:".length).split("?")[0].trim().toLowerCase()
      if (email !== businessEmail) return

      trackEvent({
        action: "email_click",
        category: "contact",
        label: window.location.pathname,
      })
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return null
}
