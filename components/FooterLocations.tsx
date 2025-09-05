"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { getAllLocationSlugs, getLocationBySlug } from "@/lib/locations"

type Props = {
  title?: string
}

export default function FooterLocations({ title = "Lokale pagina\u2019s" }: Props) {
  const slugs = getAllLocationSlugs()
  const locations = useMemo(
    () =>
      slugs
        .map((slug) => ({ slug, city: getLocationBySlug(slug)?.city ?? slug }))
        .sort((a, b) => a.city.localeCompare(b.city, "nl")),
    [slugs]
  )

  const [query, setQuery] = useState("")
  const [letter, setLetter] = useState<string>("")
  const filtered = locations.filter((loc) => {
    const matchQuery = loc.city.toLowerCase().includes(query.toLowerCase())
    const matchLetter = letter ? loc.city[0].toUpperCase() === letter : true
    return matchQuery && matchLetter
  })

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  const itemList = filtered.slice(0, 50).map((loc, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://www.x3dprints.be/${loc.slug}`,
    name: `3D printen in ${loc.city}`,
  }))

  return (
    <div>
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>

      <input
        type="text"
        aria-label="Zoek stad of gemeente"
        placeholder="Zoek stad of gemeente..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mt-4 w-full rounded-xl border border-white/30 bg-white/70 px-3 py-2 text-xs text-slate-700 placeholder:text-slate-400 backdrop-blur transition focus:border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300"
      />

      <div className="mt-4 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => setLetter("")}
          className={`rounded-md px-2 py-1 text-xs transition ${
            letter === "" ? "bg-teal-500 text-white" : "text-slate-700 hover:bg-white/60"
          }`}
        >
          Alle
        </button>
        {alphabet.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLetter(l)}
            className={`rounded-md px-2 py-1 text-xs transition ${
              letter === l ? "bg-teal-500 text-white" : "text-slate-700 hover:bg-white/60"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-500">{filtered.length} locaties gevonden.</p>

      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {filtered.map((loc) => (
          <li key={loc.slug}>
            <Link
              href={`/${loc.slug}`}
              className="block rounded-xl border border-white/30 bg-white/70 px-3 py-2 text-xs text-slate-700 backdrop-blur transition hover:bg-white hover:text-slate-900"
            >
              <span className="sr-only">3D printen in </span>
              {loc.city}
            </Link>
          </li>
        ))}
      </ul>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: itemList,
          }),
        }}
      />
    </div>
  )
}

