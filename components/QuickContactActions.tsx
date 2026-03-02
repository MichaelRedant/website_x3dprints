"use client"
import { Mail } from "lucide-react"
import ShimmerButton from "@/components/ShimmerButton"
import { trackEvent } from "@/lib/analytics"
import { getBusinessEmailHref } from "@/lib/business-contact"
import type { Locale } from "@/lib/i18n/locales"
import { cn } from "@/lib/utils"

type QuickContactActionsProps = {
  locale: Locale
  trackingCategory: string
  quoteHref?: string
  showQuote?: boolean
  className?: string
  quoteEventLabel?: string
  quoteLabelOverride?: string
}

export default function QuickContactActions({
  locale,
  trackingCategory,
  quoteHref = "/contact",
  showQuote = true,
  className,
  quoteEventLabel = "quote",
  quoteLabelOverride,
}: QuickContactActionsProps) {
  const isEn = locale === "en"
  const copy = isEn
    ? {
        quote: quoteLabelOverride ?? "Request a quote",
        mail: "Email direct",
        mailSubject: "3D printing request",
      }
    : {
        quote: quoteLabelOverride ?? "Offerte aanvragen",
        mail: "Mail direct",
        mailSubject: "Aanvraag 3D printen",
      }

  const mailHref = getBusinessEmailHref(copy.mailSubject)

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {showQuote ? (
        <ShimmerButton
          href={quoteHref}
          event={{ action: "contact_start", category: trackingCategory, label: quoteEventLabel, value: 1 }}
        >
          {copy.quote}
        </ShimmerButton>
      ) : null}

      <a
        href={mailHref}
        onClick={() => trackEvent({ action: "contact_start", category: trackingCategory, label: "mail", value: 1 })}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
      >
        <Mail className="h-4 w-4" aria-hidden />
        {copy.mail}
      </a>
    </div>
  )
}
