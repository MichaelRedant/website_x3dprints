"use client"

import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import { useLocale } from "./LocaleProvider"
import { localizeHref } from "@/lib/i18n/paths"

type ReadMoreLink = { label: string; href: string }

const COPY = {
  nl: {
    eyebrow: "Verder lezen",
    title: "Aanraders voor je volgende stap",
    intro: "Handige interne links om je project vlotter te plannen, materiaal te kiezen en een offerte te starten.",
    primaryTitle: "Start hier",
    secondaryTitle: "Meer context",
  },
  en: {
    eyebrow: "Read more",
    title: "Recommended next steps",
    intro: "Helpful internal links to plan your project, pick materials and start a quote.",
    primaryTitle: "Start here",
    secondaryTitle: "More context",
  },
}

const defaultPrimary: Record<"nl" | "en", ReadMoreLink[]> = {
  nl: [
    { label: "3D print service", href: "/services" },
    { label: "Materialen & richtlijnen", href: "/materials" },
    { label: "Prijzen & calculator", href: "/pricing" },
  ],
  en: [
    { label: "3D print service", href: "/services" },
    { label: "Materials and guidelines", href: "/materials" },
    { label: "Pricing and calculator", href: "/pricing" },
  ],
}

const defaultSecondary: Record<"nl" | "en", ReadMoreLink[]> = {
  nl: [
    { label: "Segmenten & cases", href: "/segments" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Offerte aanvragen", href: "/contact" },
  ],
  en: [
    { label: "Segments & cases", href: "/segments" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Request a quote", href: "/contact" },
  ],
}

type ReadMoreLinksProps = {
  title?: string
  intro?: string
  primaryLinks?: ReadMoreLink[]
  secondaryLinks?: ReadMoreLink[]
}

export default function ReadMoreLinks({
  title,
  intro,
  primaryLinks,
  secondaryLinks,
}: ReadMoreLinksProps) {
  const { locale } = useLocale()
  const copy = locale === "en" ? COPY.en : COPY.nl
  const resolvedTitle = title ?? copy.title
  const resolvedIntro = intro ?? copy.intro
  const resolvedPrimary = primaryLinks ?? defaultPrimary[locale]
  const resolvedSecondary = secondaryLinks ?? defaultSecondary[locale]
  const localize = (href: string) => localizeHref(href, locale)
  const localizedPrimary = resolvedPrimary.map((item) => ({ ...item, href: localize(item.href) }))
  const localizedSecondary = resolvedSecondary.map((item) => ({ ...item, href: localize(item.href) }))

  return (
    <section className="px-6 pb-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <GlassCard className="border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">{copy.eyebrow}</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{resolvedTitle}</h2>
            <p className="mt-2 text-sm text-slate-600">{resolvedIntro}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{copy.primaryTitle}</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  {localizedPrimary.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-indigo-600 transition hover:text-indigo-500">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{copy.secondaryTitle}</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  {localizedSecondary.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-indigo-600 transition hover:text-indigo-500">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  )
}
