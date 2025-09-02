// components/Footer.tsx
import Link from "next/link"
import Image from "next/image"
import Container from "./Container"
import { getAllLocationSlugs, getLocationBySlug } from "@/lib/locations"

const socials = [
  { href: "https://www.linkedin.com/company/x3dprints", label: "LinkedIn", icon: "linkedin" },
  { href: "https://www.instagram.com/x3dprints", label: "Instagram", icon: "instagram" },
]

function SocialIcon({ type, className }: { type: string; className?: string }) {
  if (type === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className}>
        <path
          fill="currentColor"
          d="M4.98 3.5A2.49 2.49 0 1 1 5 8.48 2.49 2.49 0 0 1 4.98 3.5zM3.5 9h3v11h-3zM9 9h2.87v1.5h.04c.4-.75 1.39-1.54 2.86-1.54 3.06 0 3.63 2 3.63 4.63V20H15v-4.7c0-1.12-.02-2.56-1.56-2.56-1.56 0-1.8 1.22-1.8 2.48V20H9z"
        />
      </svg>
    )
  }
  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className}>
        <path
          fill="currentColor"
          d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.3.5.6.2 1 .5 1.5 1s.7.9 1 1.5c.2.4.4 1.1.5 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.3-.2.6-.5 1-1 1.5s-.9.7-1.5 1c-.4.2-1.1.4-2.3.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.3-.5-.6-.2-1-.5-1.5-1s-.7-.9-1-1.5c-.2-.4-.4-1.1-.5-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.3.2-.6.5-1 1-1.5s.9-.7 1.5-1c.4-.2 1.1-.4 2.3-.5C8.4 2.2 8.8 2.2 12 2.2m0 1.8c-3.2 0-3.5 0-4.7.1-1.1.1-1.7.3-2 .4-.5.2-.8.4-1.2.8-.4.4-.6.7-.8 1.2-.1.3-.3.9-.4 2-.1 1.2-.1 1.5-.1 4.7s0 3.5.1 4.7c.1 1.1.3 1.7.4 2 .2.5.4.8.8 1.2.4.4.7.6 1.2.8.3.1.9.3 2 .4 1.2.1 1.5.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.3 2-.4.5-.2.8-.4 1.2-.8.4-.4.6-.7.8-1.2.1-.3.3-.9.4-2 .1-1.2.1-1.5.1-4.7s0-3.5-.1-4.7c-.1-1.1-.3-1.7-.4-2-.2-.5-.4-.8-.8-1.2-.4-.4-.7-.6-1.2-.8-.3-.1-.9-.3-2-.4-1.2-.1-1.5-.1-4.7-.1m0 3.3A6.7 6.7 0 1 1 5.3 14 6.7 6.7 0 0 1 12 7.3m0 11.1a4.4 4.4 0 1 0 0-8.9 4.4 4.4 0 0 0 0 8.9M17.9 6.2a1.6 1.6 0 1 0 0-3.3 1.6 1.6 0 0 0 0 3.3Z"
        />
      </svg>
    )
  }
  return null
}

export default function Footer() {
  // Bouw locaties op (server component), sorteer alfabetisch
  const slugs = getAllLocationSlugs()
  const locations = slugs
    .map((slug) => ({ slug, city: getLocationBySlug(slug)?.city ?? slug }))
    .sort((a, b) => a.city.localeCompare(b.city, "nl"))

  const topVisible = locations.slice(0, 12)
  const rest = locations.slice(12)

  // Groepeer rest op initiaal (A, B, C...)
  const grouped: Record<string, { slug: string; city: string }[]> = {}
  for (const loc of rest) {
    const k = (loc.city?.[0] ?? "#").toUpperCase()
    if (!grouped[k]) grouped[k] = []
    grouped[k].push(loc)
  }
  const letters = Object.keys(grouped).sort()

  // JSON-LD voor ItemList (cap op 50)
  const itemList = locations.slice(0, 50).map((loc, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://www.x3dprints.be/${loc.slug}`,
    name: `3D printen in ${loc.city}`,
  }))

  return (
    <footer className="relative mt-24">
      {/* top gradient hairline */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />

      {/* CTA strip */}
      <div className="px-6 sm:px-8 lg:px-12">
        <div className="mx-auto -mt-10 max-w-6xl">
          <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur sm:flex sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-sm font-semibold tracking-tight text-slate-900">Klaar om te printen?</p>
              <p className="mt-1 text-sm text-slate-600">Stuur je STL/STEP en ontvang snel een transparante offerte.</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(99,102,241,.35)] transition hover:brightness-110"
              >
                Offerte aanvragen
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* main footer */}
      <div className="mt-10 border-t bg-white/60 backdrop-blur">
        <Container className="grid gap-10 py-12 text-sm text-slate-600 md:grid-cols-4">
          {/* brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/Logo.webp" alt="X3DPrints" width={44} height={44} className="h-11 w-11 object-contain" />
              <span className="text-base font-semibold tracking-tight text-slate-900">X3DPrints</span>
            </Link>
            <p className="mt-3 max-w-prose">
              3D-printstudio uit Herzele (regio Gent). Prototypes en kleine series met nette afwerking. Onderdeel van
              Xinudesign.
            </p>

            <div className="mt-4 flex items-center gap-3">
              {socials.map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/70 bg-white/70 text-slate-700 transition hover:text-slate-900"
                >
                  <SocialIcon type={icon} className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* contact */}
          <div>
            <div className="font-semibold text-slate-900">Contact</div>
            <ul className="mt-3 space-y-1">
              <li>Herzele, Oost-Vlaanderen</li>
              <li>
                <a href="mailto:michael@xinudesign.be" className="underline-offset-2 hover:underline">
                  michael@xinudesign.be
                </a>
              </li>
            </ul>
          </div>

          {/* statische links */}
          <div>
            <div className="font-semibold text-slate-900">Links</div>
            <ul className="mt-3 space-y-2">
              <li><Link href="/services" className="hover:text-slate-900">Services</Link></li>
              <li><Link href="/materials" className="hover:text-slate-900">Materialen</Link></li>
              <li><Link href="/portfolio" className="hover:text-slate-900">Portfolio</Link></li>
              <li><Link href="/about" className="hover:text-slate-900">Over ons</Link></li>
              <li><Link href="/pricing" className="hover:text-slate-900">Prijzen</Link></li>
              <li><Link href="/privacy" className="hover:text-slate-900">Privacybeleid</Link></li>
              <li><Link href="/algemene-voorwaarden" className="hover:text-slate-900">Algemene voorwaarden</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-slate-900">Sitemap</Link></li>
            </ul>
          </div>
        </Container>

        {/* LOKALE PAGINA'S: volle-breedte band onder de hoofdfooter */}
        <div className="border-t bg-white/70">
          <Container className="py-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">Lokale pagina’s</h3>
                <p className="mt-1 text-xs text-slate-600">
                  Snelle toegang per regio.
                </p>
              </div>
              <Link
                href="/locaties"
                className="rounded-full border border-white/30 bg-white/70 px-3 py-1.5 text-xs text-slate-700 backdrop-blur transition hover:bg-white hover:text-slate-900"
              >
                Alle locaties pagina
              </Link>
            </div>

            {/* Top 12 als pills */}
            {topVisible.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {topVisible.map((loc) => (
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
            )}

            {/* Uitklapbare mega-lijst op alfabet, voor grote aantallen */}
            {rest.length > 0 && (
              <details className="group mt-5">
                <summary className="inline-flex cursor-pointer select-none items-center gap-2 rounded-full border border-white/30 bg-white/60 px-3 py-1.5 text-xs font-medium text-slate-700 backdrop-blur transition hover:bg-white">
                  Toon alle locaties
                  <svg width="14" height="14" viewBox="0 0 24 24" className="opacity-70 transition group-open:rotate-180">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                  </svg>
                </summary>

                <div className="mt-4 space-y-6">
                  {letters.map((letter) => (
                    <div key={letter}>
                      <div className="mb-2 text-xs font-semibold tracking-wider text-slate-500">{letter}</div>
                      <ul
                        className="
                          grid grid-cols-1 gap-2
                          sm:grid-cols-2
                          md:grid-cols-3
                          lg:grid-cols-4
                        "
                      >
                        {grouped[letter].map((loc) => (
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
                    </div>
                  ))}
                </div>
              </details>
            )}

            {/* JSON-LD ItemList voor crawlers */}
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
          </Container>
        </div>

        {/* bottom bar */}
        <div className="border-t">
          <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate-500 md:flex-row">
            <p>© {new Date().getFullYear()} X3DPrints. Alle rechten voorbehouden.</p>
            <p className="text-slate-400">
              Gemaakt door{" "}
              <Link href="https://www.xinudesign.be" className="hover:text-slate-900" target="_blank" rel="noopener noreferrer">
                Xinudesign
              </Link>.
            </p>
          </Container>
        </div>
      </div>
    </footer>
  )
}
