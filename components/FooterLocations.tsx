// components/FooterLocations.tsx
import Link from "next/link"
import { getAllLocationSlugs, getLocationBySlug } from "@/lib/locations"

type Props = {
  title?: string
  maxVisible?: number // aantal directe links voordat "Alle locaties" verschijnt
}

export default function FooterLocations({ title = "Lokale pagina’s", maxVisible = 12 }: Props) {
  const slugs = getAllLocationSlugs()
  const locations = slugs
    .map((slug) => ({ slug, city: getLocationBySlug(slug)?.city ?? slug }))
    .sort((a, b) => a.city.localeCompare(b.city, "nl"))

  const visible = locations.slice(0, maxVisible)
  const hidden = locations.slice(maxVisible)

  // JSON-LD ItemList (beperk tot 50, dat is zat)
  const itemList = locations.slice(0, 50).map((loc, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://www.x3dprints.be/${loc.slug}`,
    name: `3D printen in ${loc.city}`,
  }))

  return (
    <div className="mt-2">
      <div className="font-semibold text-slate-900">{title}</div>

      {/* zichtbare set als glass-pills */}
      <ul className="mt-3 flex flex-wrap gap-2">
        {visible.map((loc) => (
          <li key={loc.slug}>
            <Link
              href={`/${loc.slug}`}
              className="rounded-full border border-white/30 bg-white/70 px-3 py-1.5 text-xs text-slate-700 backdrop-blur transition hover:bg-white hover:text-slate-900"
            >
              3D printen in {loc.city}
            </Link>
          </li>
        ))}
      </ul>

      {/* uitklap voor alle overige locaties; crawlable en a11y-oké */}
      {hidden.length > 0 && (
        <details className="group mt-3">
          <summary
            className="inline-flex cursor-pointer select-none items-center gap-2 rounded-full border border-white/30 bg-white/60 px-3 py-1.5 text-xs font-medium text-slate-700 backdrop-blur transition hover:bg-white"
            aria-label="Toon alle locaties"
          >
            Alle locaties
            <svg width="14" height="14" viewBox="0 0 24 24" className="opacity-70 transition group-open:rotate-180">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            </svg>
          </summary>

          <ul
            className="
              mt-3 grid grid-cols-1 gap-2
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {hidden.map((loc) => (
              <li key={loc.slug}>
                <Link
                  href={`/${loc.slug}`}
                  className="inline-block rounded-full border border-white/30 bg-white/60 px-3 py-1.5 text-xs text-slate-700 backdrop-blur transition hover:bg-white hover:text-slate-900"
                >
                  3D printen in {loc.city}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      )}

      {/* JSON-LD ItemList */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
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
