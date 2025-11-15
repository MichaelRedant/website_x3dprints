"use client"

import { requestConsentBanner } from "@/lib/cookie-consent"
import { cn } from "@/lib/utils"

interface CookieSettingsButtonProps {
  className?: string
}

export default function CookieSettingsButton({ className }: CookieSettingsButtonProps) {
  return (
    <button
      type="button"
      onClick={requestConsentBanner}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border border-transparent px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:text-slate-900",
        className,
      )}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="text-slate-500">
        <path
          d="M12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Zm7.4-3.5c0-.4 0-.7-.1-1l1.6-1.2a.7.7 0 0 0 .2-.9l-1.5-2.6a.7.7 0 0 0-.8-.3l-1.8.7c-.5-.4-1-.7-1.5-.9L15 2.6a.7.7 0 0 0-.7-.6h-3a.7.7 0 0 0-.6.5l-.4 2.2c-.6.2-1.1.5-1.6.9l-2-.8a.7.7 0 0 0-.8.3L4.4 7.7a.7.7 0 0 0 .1.9l1.7 1.3v1.2L4.5 12.1a.7.7 0 0 0-.2.9l1.5 2.6c.2.3.5.4.8.3l1.9-.7c.5.4 1 .7 1.6.9l.4 2.2c.1.3.3.5.6.5h3a.7.7 0 0 0 .7-.6l.4-2.2c.5-.2 1-.5 1.5-.9l1.8.7c.3.1.6 0 .8-.3l1.5-2.6a.7.7 0 0 0-.2-.9l-1.5-1.1a6 6 0 0 0 .1-1Zm-2 0a5.4 5.4 0 1 1-10.8 0 5.4 5.4 0 0 1 10.8 0Z"
          fill="currentColor"
        />
      </svg>
      Cookie-instellingen
    </button>
  )
}
