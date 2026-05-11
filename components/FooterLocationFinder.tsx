"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { EN_LOCATION_SLUGS, getAllLocationSlugs, getLocationBySlug } from "@/lib/locations"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useLocale } from "./LocaleProvider"
import { localizeHref } from "@/lib/i18n/paths"

const COPY = {
  nl: {
    trigger: "Lokale pagina's zoeken",
    overlayClose: "Sluit lokale pagina's",
    modalEyebrow: "Lokale pagina's",
    modalTitle: "Zoek 3D printen per stad",
    close: "Sluit",
    searchLabel: "Zoek stad of gemeente",
    searchPlaceholder: "Zoek stad of gemeente...",
    filterAll: "Alle",
    results: (count: number) => `${count} resultaten`,
    quickAccess: "Snelle toegang",
  },
  en: {
    trigger: "Search local pages",
    overlayClose: "Close local pages",
    modalEyebrow: "Local pages",
    modalTitle: "Find 3D printing by city",
    close: "Close",
    searchLabel: "Search city or town",
    searchPlaceholder: "Search city or town...",
    filterAll: "All",
    results: (count: number) => `${count} results`,
    quickAccess: "Quick access",
  },
}

const HIGHLIGHT_SLUGS = [
  // hoofd hubs
  "3d-printen-in-gent",
  "3d-printen-in-aalst",
  "3d-printen-in-antwerpen",
  "3d-printen-in-leuven",
  // Vlaams-Brabant clusters
  "3d-printen-in-vilvoorde",
  "3d-printen-in-zaventem",
  "3d-printen-in-machelen",
  "3d-printen-in-steenokkerzeel",
  "3d-printen-in-kortenberg",
  "3d-printen-in-herent",
  "3d-printen-in-kampenhout",
  "3d-printen-in-sterrebeek",
  "3d-printen-in-nossegem",
  "3d-printen-in-dilbeek",
  "3d-printen-in-sint-pieters-leeuw",
  "3d-printen-in-beersel",
  "3d-printen-in-grimbergen",
  "3d-printen-in-tervuren",
  "3d-printen-in-overijse",
  "3d-printen-in-hoeilaart",
  "3d-printen-in-rotselaar",
  "3d-printen-in-haacht",
  "3d-printen-in-tremelo",
  "3d-printen-in-keerbergen",
]

export default function FooterLocationFinder() {
  const { locale } = useLocale()
  const localize = (href: string) => localizeHref(href, locale)
  const copy = locale === "en" ? COPY.en : COPY.nl
  const slugs = getAllLocationSlugs()
  const locations = useMemo(
    () =>
      slugs
        .map((slug) => ({ slug, city: getLocationBySlug(slug)?.city ?? slug }))
        .sort((a, b) => a.city.localeCompare(b.city, locale === "en" ? "en" : "nl")),
    [slugs, locale],
  )
  const highlightLocations = useMemo(() => {
    const mapped = HIGHLIGHT_SLUGS.map((slug) => {
      const loc = getLocationBySlug(slug)
      return loc ? { slug, city: loc.city } : null
    })
      .filter((loc): loc is { slug: string; city: string } => Boolean(loc))
      .filter((loc) => (locale === "en" ? EN_LOCATION_SLUGS.has(loc.slug) : true))
    const seen = new Set<string>()
    return [...mapped, ...locations]
      .filter((loc) => {
        if (seen.has(loc.slug)) return false
        seen.add(loc.slug)
        return true
      })
      .slice(0, 24)
  }, [locations, locale])

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [letter, setLetter] = useState<string>("")
  const filtered = locations.filter((loc) => {
    const matchQuery = loc.city.toLowerCase().includes(query.toLowerCase())
    const matchLetter = letter ? loc.city[0].toUpperCase() === letter : true
    return matchQuery && matchLetter
  })

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:shadow-[0_12px_30px_rgba(2,6,23,0.35)]"
      >
        {copy.trigger}
        <span aria-hidden className="text-[10px] text-slate-400 dark:text-slate-500">({locations.length})</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[120]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              aria-label={copy.overlayClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="relative mx-auto mt-16 w-[min(1100px,94vw)] rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-2xl backdrop-blur dark:border-slate-700/70 dark:bg-slate-950/95"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    {copy.modalEyebrow}
                  </p>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{copy.modalTitle}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/70 bg-white/80 text-slate-700 transition hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  aria-label={copy.close}
                >
                  <span aria-hidden>&times;</span>
                </button>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-[1.1fr,0.9fr]">
                <div className="space-y-3">
                  <input
                    type="text"
                    aria-label={copy.searchLabel}
                    placeholder={copy.searchPlaceholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-sky-400 dark:focus:ring-sky-400/20"
                  />
                  <div className="flex flex-wrap gap-1">
                    <FilterChip label={copy.filterAll} active={letter === ""} onClick={() => setLetter("")} />
                    {alphabet.map((l) => (
                      <FilterChip key={l} label={l} active={letter === l} onClick={() => setLetter(l)} />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{copy.results(filtered.length)}</p>
                </div>

                <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">
                    {copy.quickAccess}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {highlightLocations.map((loc) => (
                      <Link
                        key={loc.slug}
                        href={localize(`/${loc.slug}`)}
                        className="rounded-lg border border-slate-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                        onClick={() => setOpen(false)}
                      >
                        {loc.city}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 max-h-[420px] overflow-y-auto rounded-2xl border border-slate-200/70 bg-white/80 p-3 shadow-inner dark:border-slate-700 dark:bg-slate-950">
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {filtered.map((loc) => (
                    <li key={loc.slug}>
                      <Link
                        href={localize(`/${loc.slug}`)}
                        className={cn(
                          "block rounded-lg border border-slate-200/70 bg-white/90 px-3 py-2 text-xs text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white",
                          "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {loc.city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md px-2 py-1 text-xs font-semibold transition",
        active
          ? "bg-indigo-600 text-white shadow-sm dark:bg-slate-700 dark:text-white"
          : "text-slate-700 hover:bg-white/70 dark:text-slate-200 dark:hover:bg-slate-900",
      )}
    >
      {label}
    </button>
  )
}
