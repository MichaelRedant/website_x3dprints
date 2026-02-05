import type { Metadata } from "next"
import Link from "next/link"
import { SITE } from "@/lib/seo"

const TARGET = "/en/pricing"

export const metadata: Metadata = {
  title: "Pricing & calculator | X3DPrints",
  description: "Redirecting you to the current pricing page.",
  alternates: {
    canonical: `${SITE.url}${TARGET}/`,
    languages: {
      "nl-BE": `${SITE.url}/pricing/`,
      en: `${SITE.url}${TARGET}/`,
      "x-default": `${SITE.url}/pricing/`,
    },
  },
  openGraph: {
    title: "Pricing & calculator | X3DPrints",
    description: "We send you straight to the active pricing page.",
    url: `${SITE.url}${TARGET}/`,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "X3DPrints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
}

function RedirectClient() {
  if (typeof window !== "undefined") {
    window.location.replace(TARGET)
  }
  return null
}

export default function Page() {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-start justify-center gap-6 px-6 py-16 sm:px-8">
      <RedirectClient />
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Redirect</p>
      <h1 className="text-balance text-3xl font-extrabold text-slate-900 sm:text-4xl">Pricing page moved</h1>
      <p className="text-lg text-slate-700">
        You are being redirected to <Link href={TARGET} className="font-semibold text-indigo-600">/en/pricing</Link>. Click if it does not happen
        automatically.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href={TARGET}
          className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:-translate-y-0.5 hover:bg-indigo-100"
        >
          Go to pricing
        </Link>
        <Link
          href="/en/contact"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
        >
          Contact
        </Link>
      </div>
    </main>
  )
}
