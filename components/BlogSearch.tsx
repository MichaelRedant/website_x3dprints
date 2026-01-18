"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useLocale } from "./LocaleProvider"
import { localizeHref } from "@/lib/i18n/paths"

type BlogSearchLink = { label: string; href: string }

type CategoryKey =
  | "filament-friday"
  | "maker-monday"
  | "use-case-dinsdag"
  | "materials-pricing"
  | "segments-cases"
  | "how-to"

type BlogSearchTopic = {
  id: string
  title: string
  summary: string
  category: CategoryKey
  links: BlogSearchLink[]
}

type BlogSearchProps = {
  topics: BlogSearchTopic[]
}

const COPY = {
  nl: {
    label: "Zoek in blog & kennisbank",
    placeholder: "Zoek op PLA Marble, pricing, TPU...",
    hint: "Tip: zoek op materiaal (PLA, PETG), thema (marketing, kostprijs) of workflow (Bambu, viewer).",
    noResults: (query: string) => `Geen resultaten voor "${query}". Probeer een ander trefwoord.`,
    categoryLabels: {
      "filament-friday": "Filament Vrijdag",
      "maker-monday": "Maker Monday",
      "use-case-dinsdag": "Use Case Dinsdag",
      "materials-pricing": "Materialen & pricing",
      "segments-cases": "Segmenten & cases",
      "how-to": "How-to & workflows",
    },
    fallbackCategory: "Kennisbank",
    defaultLinkLabel: "Lees artikel",
  },
  en: {
    label: "Search the blog & knowledge base",
    placeholder: "Search for PLA Marble, pricing, TPU...",
    hint: "Tip: search by material (PLA, PETG), theme (marketing, pricing) or workflow (Bambu, viewer).",
    noResults: (query: string) => `No results for "${query}". Try another keyword.`,
    categoryLabels: {
      "filament-friday": "Filament Friday",
      "maker-monday": "Maker Monday",
      "use-case-dinsdag": "Use Case Tuesday",
      "materials-pricing": "Materials & pricing",
      "segments-cases": "Segments & cases",
      "how-to": "How-to & workflows",
    },
    fallbackCategory: "Knowledge base",
    defaultLinkLabel: "Read article",
  },
}

export default function BlogSearch({ topics }: BlogSearchProps) {
  const { locale } = useLocale()
  const isEn = locale === "en"
  const copy = isEn ? COPY.en : COPY.nl
  const [query, setQuery] = useState("")
  const normalized = query.trim().toLowerCase()

  const results = useMemo(() => {
    if (!normalized) return []
    return topics
      .filter((topic) => {
        const haystack = `${topic.title} ${topic.summary} ${topic.category}`.toLowerCase()
        return haystack.includes(normalized)
      })
      .slice(0, 8)
  }, [normalized, topics])

  return (
    <div className="rounded-3xl border border-white/40 bg-white/80 p-5 shadow-lg backdrop-blur">
      <label className="block text-sm font-semibold text-slate-700">
        {copy.label}
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.placeholder}
          className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-base text-slate-900 shadow-inner focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          aria-label={copy.label}
        />
      </label>
      {normalized === "" ? (
        <p className="mt-3 text-sm text-slate-500">{copy.hint}</p>
      ) : results.length ? (
        <ul className="mt-4 space-y-3" aria-live="polite">
          {results.map((topic) => (
            <li key={topic.id} className="rounded-2xl border border-slate-100 bg-white/90 px-4 py-3 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.25em] text-slate-500">
                <span>{copy.categoryLabels[topic.category] ?? copy.fallbackCategory}</span>
                <span className="font-semibold text-slate-400">
                  {topic.links[0]?.label ?? copy.defaultLinkLabel}
                </span>
              </div>
              <Link
                href={localizeHref(`/blog/${topic.id}`, locale)}
                className="mt-1 block text-base font-semibold text-slate-900 hover:text-indigo-600"
              >
                {topic.title}
              </Link>
              <p className="text-sm text-slate-600">{topic.summary}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-rose-600">{copy.noResults(query)}</p>
      )}
    </div>
  )
}
