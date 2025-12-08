'use client'

import { useMemo, useState } from "react"
import Link from "next/link"

type BlogSearchLink = { label: string; href: string }

type BlogSearchTopic = {
  id: string
  title: string
  summary: string
  category: string
  links: BlogSearchLink[]
}

type BlogSearchProps = {
  topics: BlogSearchTopic[]
}

const categoryLabels: Record<string, string> = {
  "filament-friday": "Filament Vrijdag",
  "materials-pricing": "Materialen & pricing",
  "segments-cases": "Segmenten & cases",
  "how-to": "How-to & workflows",
}

export default function BlogSearch({ topics }: BlogSearchProps) {
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
        Zoek in blog & kennisbank
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Zoek op PLA Marble, pricing, TPU…"
          className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-base text-slate-900 shadow-inner focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          aria-label="Zoek binnen de blog en kennisbank"
        />
      </label>
      {normalized === "" ? (
        <p className="mt-3 text-sm text-slate-500">Tip: zoek op materiaal (PLA, PETG), thema (marketing, kostprijs) of workflow (Bambu, viewer).</p>
      ) : results.length ? (
        <ul className="mt-4 space-y-3" aria-live="polite">
          {results.map((topic) => (
            <li key={topic.id} className="rounded-2xl border border-slate-100 bg-white/90 px-4 py-3 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.25em] text-slate-500">
                <span>{categoryLabels[topic.category] ?? "Kennisbank"}</span>
                <span className="font-semibold text-slate-400">{topic.links[0]?.label ?? "Lees artikel"}</span>
              </div>
              <Link href={`/blog/${topic.id}`} className="mt-1 block text-base font-semibold text-slate-900 hover:text-indigo-600">
                {topic.title}
              </Link>
              <p className="text-sm text-slate-600">{topic.summary}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-rose-600">Geen resultaten gevonden voor “{query}”. Probeer een ander trefwoord.</p>
      )}
    </div>
  )
}
