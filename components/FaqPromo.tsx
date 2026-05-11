"use client"

import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import { useLocale } from "./LocaleProvider"
import { localizeHref } from "@/lib/i18n/paths"

type QA = { q: string; a: string }

type FaqPromoProps = {
  title?: string
  intro?: string
  href?: string
  ctaLabel?: string
  ctaAriaLabel?: string
  qaItems?: QA[]
  emitJsonLd?: boolean
  className?: string
  tagline?: string
}

function clampText(s: string, max = 160) {
  const t = s.trim()
  return t.length <= max ? t : t.slice(0, max - 1).trimEnd() + "..."
}

export default function FaqPromo({
  title = "Vragen over 3D printen?",
  intro = "Antwoorden over materialen, levertijden, prijzen en onze werkwijze.",
  href = "/faq",
  ctaLabel = "Bekijk de FAQ",
  ctaAriaLabel = "Ga naar de veelgestelde vragen",
  qaItems = [
    { q: "Welke materialen printen jullie?", a: "Standaard PLA Matte, plus PETG en TPU. Op aanvraag ABS/ASA, Nylon, PA-CF." },
    { q: "Wat is de gebruikelijke doorlooptijd?", a: "Doorgaans enkele werkdagen, afhankelijk van complexiteit en oplage." },
    { q: "Hoe vraag ik een offerte aan?", a: "Bezorg je STL/STEP en korte context via het formulier. Je krijgt snel prijs en timing." },
  ],
  emitJsonLd = false,
  className = "",
  tagline = "Duidelijke antwoorden. Geen buzzword-bingo.",
}: FaqPromoProps) {
  const { locale } = useLocale()
  const resolvedHref = localizeHref(href, locale)
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "en" ? "en-BE" : "nl-BE",
    mainEntity: qaItems.slice(0, 3).map((i) => ({
      "@type": "Question",
      name: clampText(i.q, 110),
      acceptedAnswer: { "@type": "Answer", text: clampText(i.a, 300) },
    })),
  }

  return (
    <section className={`relative ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>

      <Reveal>
        <GlassCard className="bg-white/55 p-5 ring-1 ring-white/30 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/75 dark:ring-slate-800/60 sm:p-6 lg:p-7">
          <div className="flex flex-col gap-5 sm:gap-6">
            <div className="max-w-2xl">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 sm:text-xl">{title}</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{intro}</p>
            </div>

            {qaItems?.length > 0 && (
              <ul className="grid gap-3 sm:grid-cols-2">
                {qaItems.slice(0, 4).map((item) => (
                  <li
                    key={item.q}
                    className="rounded-xl border border-white/40 bg-white/60 p-3 ring-1 ring-white/30 backdrop-blur transition hover:bg-white/75 dark:border-slate-700/70 dark:bg-slate-900/80 dark:ring-slate-800/60 dark:hover:bg-slate-900"
                    itemScope
                    itemType="https://schema.org/Question"
                  >
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-50" itemProp="name">
                      {item.q}
                    </div>
                    <div
                      className="mt-1 text-sm text-slate-700 dark:text-slate-300"
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <div itemProp="text">{item.a}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={resolvedHref}
                aria-label={ctaAriaLabel}
                className="rounded-xl border border-slate-300 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                {ctaLabel}
              </Link>

              <span className="text-xs text-slate-500 dark:text-slate-400">{tagline}</span>
            </div>
          </div>
        </GlassCard>
      </Reveal>

      {emitJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
    </section>
  )
}
