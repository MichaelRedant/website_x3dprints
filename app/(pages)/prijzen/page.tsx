import type { Metadata } from "next"
import Link from "next/link"
import { SITE } from "@/lib/seo"

const TARGET = "/pricing"

export const metadata: Metadata = {
  title: "Prijzen & calculator | X3DPrints",
  description: "Doorverwijzing naar de actuele prijzen- en calculatorpagina.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${SITE.url}${TARGET}/`,
    languages: {
      "nl-BE": `${SITE.url}${TARGET}/`,
      en: `${SITE.url}/en/pricing/`,
      "x-default": `${SITE.url}${TARGET}/`,
    },
  },
  openGraph: {
    title: "Prijzen & calculator | X3DPrints",
    description: "We sturen je meteen door naar de actuele prijzenpagina.",
    url: `${SITE.url}${TARGET}/`,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "X3DPrints" }],
    locale: "nl_BE",
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
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Doorverwijzing</p>
      <h1 className="text-balance text-3xl font-extrabold text-slate-900 sm:text-4xl">Prijzenpagina is verplaatst</h1>
      <p className="text-lg text-slate-700">
        Je wordt automatisch doorgestuurd naar <Link href={TARGET} className="font-semibold text-indigo-600">/pricing</Link>. Klik als dat niet
        meteen gebeurt.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href={TARGET}
          className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:-translate-y-0.5 hover:bg-indigo-100"
        >
          Ga naar pricing
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
        >
          Contact
        </Link>
      </div>
    </main>
  )
}
