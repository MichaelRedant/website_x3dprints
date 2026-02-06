import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import GlassOrb from "@/components/GlassOrb"
import ShimmerButton from "@/components/ShimmerButton"
import Catchphrase from "@/components/Catchphrase"

import { buildLocalBusinessSchema, SITE } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Local & 100% Belgian 3D printing | X3DPrints Herzele",
  description:
    "Herzele-based merchant and 100% Belgian 3D print studio. Short supply chain, clear agreements and member of Werkgroep Ondernemend Herzele. Request your quote.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/lokaal-belgisch/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/lokaal-belgisch/",
      en: "https://www.x3dprints.be/en/lokaal-belgisch/",
      "x-default": "https://www.x3dprints.be/lokaal-belgisch/",
    },
  },
  openGraph: {
    title: "Local & Belgian 3D printing | X3DPrints",
    description:
      "X3DPrints is a Herzele merchant and 100% Belgian 3D print studio. Short chain, clear agreements and proud partner of Werkgroep Ondernemend Herzele.",
    url: "https://www.x3dprints.be/en/lokaal-belgisch/",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export default function Page() {
  const values = [
    {
      title: "Herzele merchant",
      desc: "Workshop at Provincieweg 34a (Borsbeke). You talk to the maker directly - no intermediaries or call centres.",
    },
    {
      title: "100% Belgian",
      desc: "Invoicing, production and service from Belgium. No drop-shipping or anonymous fulfilment abroad.",
    },
    {
      title: "Short supply chain",
      desc: "Delivery across Flanders, pickup by appointment in Herzele. Fewer transport kilometres and faster feedback loops.",
    },
    {
      title: "Fair agreements",
      desc: "Clear pricing, realistic timelines and no empty promises. We plan together within achievable margins.",
    },
    {
      title: "Belgian values",
      desc: "Reliability, craftsmanship and no-nonsense communication. We build lasting relationships with customers and associations.",
    },
    {
      title: "Werkgroep Ondernemend Herzele",
      desc: "Proud member of the working group. We invest in local collaborations, events and visibility for Herzele entrepreneurs.",
    },
    {
      title: "Pay with Heuro",
      desc: "X3DPrints accepts the Herzele Euro (Heuro) so you pay locally and keep the budget circulating in the region.",
    },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Local & Belgian 3D printing",
    url: "https://www.x3dprints.be/en/lokaal-belgisch/",
    description:
      "X3DPrints is a Herzele merchant and 100% Belgian 3D print studio. Short chain, clear agreements and member of Werkgroep Ondernemend Herzele.",
    inLanguage: "en-BE",
    about: [
      { "@type": "Thing", name: "Herzele", description: "Herzele merchant, local 3D print service" },
      { "@type": "Thing", name: "Belgian 3D print studio" },
      { "@type": "Thing", name: "Werkgroep Ondernemend Herzele" },
    ],
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  }

  const localBusinessJsonLd = buildLocalBusinessSchema({
    pageUrl: "https://www.x3dprints.be/en/lokaal-belgisch/",
    description:
      "Herzele merchant and 100% Belgian 3D print studio with a short supply chain, clear agreements and membership of Werkgroep Ondernemend Herzele.",
    areaServed: "BE",
  })

  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(45,212,191,.14),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.06]" />

      <section className="relative px-6 pb-16 pt-14 sm:px-8 lg:px-12 lg:pb-24">
        <div className="absolute right-0 top-0 -z-10 hidden sm:block">
          <GlassOrb className="h-64 w-64 opacity-40" />
        </div>
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-4xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100/80 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Rooted in Herzele
            </span>
            <Catchphrase className="mt-4 block text-base font-semibold text-emerald-600 sm:text-lg">
              Belgian 3D prints, direct lines
            </Catchphrase>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Herzele merchant & 100% Belgian 3D print studio.
            </h1>
            <p className="mt-3 text-balance text-lg font-semibold text-slate-700">
              One point of contact, short supply chain and clear agreements.
            </p>
            <p className="mt-5 max-w-3xl text-pretty text-base leading-7 text-slate-600 sm:text-lg">
              X3DPrints produces in Herzele (Borsbeke) and delivers across Flanders. As a Herzele merchant and proud member of the{" "}
              <Link
                href="https://www.herzele.be/werkgroep-ondernemend-herzele"
                target="_blank"
                rel="noreferrer"
                prefetch={false}
                className="font-semibold text-emerald-700 underline decoration-emerald-200 hover:decoration-emerald-500"
              >
                Werkgroep Ondernemend Herzele
              </Link>{" "}
              we work with Belgian partners, transparent pricing and realistic timelines. No outsourcing or drop-shipping - everything stays local and anchored in{" "}
              <Link
                href="https://www.herzele.be"
                target="_blank"
                rel="noreferrer"
                prefetch={false}
                className="font-semibold text-emerald-700 underline decoration-emerald-200 hover:decoration-emerald-500"
              >
                Herzele
              </Link>
              .
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ShimmerButton href="/en/contact">Request a quote</ShimmerButton>
              <Link
                href="/en/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Materials & guidelines
              </Link>
              <Link
                href="/en/locaties"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Local delivery zones
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">What local means</h2>
            <p className="mt-2 text-slate-600">
              Local goes beyond having an address in Herzele. We build a short supply chain, clear communication and Belgian partnerships so you get faster feedback and strengthen the economy.
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((item) => (
              <Reveal key={item.title}>
                <GlassCard className="h-full border-white/40 bg-gradient-to-br from-white/80 to-white/50 p-5 shadow-lg ring-1 ring-white/60">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Belgian values, every day</h2>
              <p className="text-slate-600">
                Every project starts from reliability, clear communication and care for finishing. We plan realistically, communicate openly and keep promises. Transparent quotes, clear lead times and honest feedback are part of the package.
              </p>
              <ul className="grid gap-2 sm:grid-cols-2 sm:gap-3">
                {[
                  "Transparent pricing without surprises",
                  "Pickup in Herzele or delivery across Flanders",
                  "Belgian invoicing and support",
                  "Fast feedback directly with the maker",
                  "Working with local associations and SMEs",
                  "Respect for planning, even on rush jobs",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-slate-700">
                    <span aria-hidden className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <GlassCard className="border-white/40 bg-gradient-to-br from-white/80 to-white/50 p-6 shadow-lg ring-1 ring-white/60">
              <h3 className="text-xl font-semibold text-slate-900">Why it matters</h3>
              <p className="mt-2 text-sm text-slate-600">
                Local 3D printing keeps communication short and supports the region. You know who prints your parts, where they come from and how fast we can switch when plans change.
              </p>
              <div className="mt-4 grid gap-3 text-sm text-slate-700">
                <div className="rounded-xl border border-emerald-100/70 bg-white/80 p-4 shadow-sm">
                  <div className="font-semibold text-slate-900">Faster iterations</div>
                  <p className="mt-1">No overseas shipping delays - we adjust and reprint quickly.</p>
                </div>
                <div className="rounded-xl border border-emerald-100/70 bg-white/80 p-4 shadow-sm">
                  <div className="font-semibold text-slate-900">Clear accountability</div>
                  <p className="mt-1">One owner for design, print and finishing. Straight answers, no runaround.</p>
                </div>
                <div className="rounded-xl border border-emerald-100/70 bg-white/80 p-4 shadow-sm">
                  <div className="font-semibold text-slate-900">Support your region</div>
                  <p className="mt-1">Budgets, expertise and visibility stay in Herzele and Flanders.</p>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="relative overflow-hidden rounded-3xl border border-emerald-100/80 bg-white/80 p-8 shadow-xl backdrop-blur">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/25 via-cyan-200/20 to-teal-200/25" aria-hidden />
              <div className="relative">
                <h2 className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Ready for a local 3D print partner?
                </h2>
                <p className="mt-3 max-w-3xl text-base text-slate-600">
                  Send your STL/STEP, describe the use case and we will share material advice, planning and pricing - all produced in Herzele.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ShimmerButton href="/en/contact">Request a quote</ShimmerButton>
                  <Link
                    href="/en/segments"
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-100/80 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:-translate-y-0.5"
                  >
                    View segments
                  </Link>
                  <Link
                    href="/en/materials"
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-100/80 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:-translate-y-0.5"
                  >
                    Materials library
                  </Link>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
    </main>
  )
}
