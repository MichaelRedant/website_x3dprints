"use client"

import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import { useLocale } from "./LocaleProvider"
import { localizeHref } from "@/lib/i18n/paths"
import {
  getRelatedLinks,
  type RelatedLink as ReadMoreLink,
  type RelatedLinksPageType,
} from "@/lib/seo-related-links"

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

type ReadMoreLinksProps = {
  pageType?: RelatedLinksPageType
  title?: string
  intro?: string
  primaryLinks?: ReadMoreLink[]
  secondaryLinks?: ReadMoreLink[]
}

export default function ReadMoreLinks({
  pageType = "default",
  title,
  intro,
  primaryLinks,
  secondaryLinks,
}: ReadMoreLinksProps) {
  const { locale } = useLocale()
  const copy = locale === "en" ? COPY.en : COPY.nl
  const defaults = getRelatedLinks(pageType, locale)
  const resolvedTitle = title ?? copy.title
  const resolvedIntro = intro ?? copy.intro
  const resolvedPrimary = primaryLinks ?? defaults.primary
  const resolvedSecondary = secondaryLinks ?? defaults.secondary
  const localize = (href: string) => localizeHref(href, locale)
  const localizedPrimary = resolvedPrimary.map((item) => ({ ...item, href: localize(item.href) }))
  const localizedSecondary = resolvedSecondary.map((item) => ({ ...item, href: localize(item.href) }))

  return (
    <section className="px-6 pb-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <GlassCard className="border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur dark:border-slate-700/70 dark:bg-slate-950/75">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">{copy.eyebrow}</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">{resolvedTitle}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{resolvedIntro}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-900/80">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{copy.primaryTitle}</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {localizedPrimary.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-900/80">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{copy.secondaryTitle}</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {localizedSecondary.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200">
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
