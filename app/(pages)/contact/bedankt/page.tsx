import type { Metadata } from "next"
import ContactThankYouPanel from "@/components/ContactThankYouPanel"

const NL_METADATA: Metadata = {
  title: "Bedankt voor je aanvraag | X3DPrints",
  description: "Je aanvraag is goed ontvangen. We antwoorden snel met prijs en timing.",
  alternates: {
    canonical: "https://www.x3dprints.be/contact/bedankt/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/contact/bedankt/",
      "en-BE": "https://www.x3dprints.be/en/contact/bedankt/",
      "x-default": "https://www.x3dprints.be/contact/bedankt/",
    },
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

const EN_METADATA: Metadata = {
  title: "Thank you for your request | X3DPrints",
  description: "Your request has been received. We will reply quickly with pricing and lead time.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/contact/bedankt/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/contact/bedankt/",
      "en-BE": "https://www.x3dprints.be/en/contact/bedankt/",
      "x-default": "https://www.x3dprints.be/contact/bedankt/",
    },
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

void EN_METADATA

export const metadata: Metadata = NL_METADATA

const resolveLocaleOverride = (props: unknown): "nl" | "en" => {
  if (typeof props !== "object" || props === null) {
    return "nl"
  }
  const localeOverride = (props as { localeOverride?: unknown }).localeOverride
  return localeOverride === "en" ? "en" : "nl"
}

export default function ContactThankYouPage(props: unknown) {
  const locale = resolveLocaleOverride(props)
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white px-6 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <ContactThankYouPanel locale={locale} />
      </div>
    </main>
  )
}
