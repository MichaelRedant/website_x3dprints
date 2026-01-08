import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/blog/use-case-dinsdag-auto-fiets"
const publishedDate = "2025-11-25T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Use Case Dinsdag #1: 3D printen voor auto- en fietsaccessoires",
  description:
    "Wanneer kies je PLA, PETG of TPU voor auto- en fietsaccessoires? Leer ontwerpregels tegen warmte, UV en vibraties plus materiaaladvies van X3DPrints.",
  alternates: { canonical },
  openGraph: {
    title: "Use Case Dinsdag #1: Auto- en fietsaccessoires 3D printen",
    description:
      "Toepassing-gebaseerde gids over mounts, klemmen en behuizingen voor voertuigen. Inclusief materiaalvergelijking, ontwerpchecklist en do/don't lijst.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: [
      "3D printen fietsaccessoires",
      "auto accessoires 3D printen",
      "PETG auto",
      "TPU fiets",
      "Use Case Dinsdag",
    ],
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "3D geprinte auto- en fietsaccessoires",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Case Dinsdag: Auto & fiets 3D prints",
    description:
      "Welke onderdelen kun je betrouwbaar 3D printen voor voertuigen? Deze gids bundelt toepassingen, ontwerpregels en materiaaladvies.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Aanbevolen basis", value: "PETG Solid", detail: "Taai en hitteresistent" },
  { label: "Flexzones", value: "TPU 95A", detail: "Anti-ratel, zachte klemmen" },
  { label: "Alleen indoor", value: "PLA Matte", detail: "Decoratieve delen uit zon" },
]

const materialTable = [
  { material: "PLA", warmte: "55-60 degC wordt zacht", vibraties: "Bros, microcracks", uv: "Verkleurt snel" },
  { material: "PETG", warmte: "Tot ca. 80 degC stabiel", vibraties: "Taai, buigt mee", uv: "Betere weerstand" },
  { material: "TPU", warmte: "Geen probleem", vibraties: "Absorbeert trillingen", uv: "Blend-afhankelijk" },
]

const applications = [
  {
    title: "Auto-interieur",
    items: [
      "Telefoon- en dashcam mounts (PETG)",
      "Kabelgeleiders en bagagehaken (PETG)",
      "Anti-ratel pads tussen panelen (TPU)",
      "Decoratieve inserts buiten directe zon (PLA matte)",
    ],
  },
  {
    title: "Fietsaccessoires",
    items: [
      "GPS-, licht- en sensorhouders (PETG)",
      "Fietspomp- of toolkit-klemmen (TPU + PETG kern)",
      "AirTag/trackers (PETG behuizing + TPU band)",
      "Organizer clips voor remleidingen (TPU)",
    ],
  },
]

const designChecklist = [
  {
    title: "Toleranties",
    detail: "PETG +0.25 mm, TPU +0.40 mm, PLA +0.15 mm (alleen binnenshuis). Zie Maker Monday #3.",
  },
  {
    title: "Wanddiktes",
    detail: "PETG 2.4-2.8 mm, TPU >= 3 mm. Volg Maker Monday #2 voor ribbing.",
  },
  {
    title: "Ribs & fillets",
    detail: "Ribs achter schroefpunten en fillets van 2-4 mm beperken stress.",
  },
  {
    title: "Schroefgaten",
    detail: "Messing inserts of thread-forming screws volgens Maker Monday #5.",
  },
  {
    title: "Temperatuur",
    detail: "Brede bases en chamfers tegen warping. Zie Maker Monday #6.",
  },
]

const doNotPrint = [
  "Onderdelen die tegen motorblok of uitlaat zitten.",
  "Structurele veiligheid (rem, stuurkolom, stoelrails).",
  "Zones met olie/benzine: hiervoor kies je beter ABS/PC via een ander proces.",
  "Lange PLA brackets die permanent zon zien.",
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Use Case Dinsdag #1: 3D printen voor auto- en fietsaccessoires",
  description:
    "Welke onderdelen kun je betrouwbaar 3D printen voor voertuigen? Gids met materiaalkeuze, ontwerpregels voor warmte/UV en toepassingstips.",
  datePublished: publishedDate,
  dateModified: publishedDate,
  author: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
  },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
    logo: {
      "@type": "ImageObject",
      url: "https://www.x3dprints.be/images/og-home.jpg",
    },
  },
  mainEntityOfPage: canonical,
  url: canonical,
  image: "https://www.x3dprints.be/images/og-home.jpg",
}

function SectionDivider() {
  return (
    <div className="mx-auto my-12 flex w-full max-w-4xl items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
      <span>Use Case Dinsdag</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
    </div>
  )
}

export default function UseCaseDinsdagAutoFietsPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(180%_90%_at_50%_-20%,rgba(59,130,246,0.14),transparent_75%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal className="stacked-content">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href="/blog"
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-700">Use Case Dinsdag</li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-900">Auto & fietsaccessoires</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Use Case Dinsdag #1</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor auto- en fietsaccessoires: wanneer PETG, PLA of TPU wel werken (en wanneer niet).
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Onderweg krijg je te maken met warmte, UV, trillingen en onverwachte impact. Deze gids toont welke onderdelen je
              betrouwbaar kunt printen, hoe je ze ontwerpt en welk materiaal je kiest voor auto&apos;s en fietsen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?topic=use-case-auto-fiets">Vraag projectadvies</ShimmerButton>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Materialenoverzicht
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Pricing & lead times
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Gepubliceerd op 25 november 2025 - Use Case Dinsdag.</p>
          </Reveal>
          <div className="mt-10 grid gap-4 rounded-3xl border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">1. PLA faalt sneller dan je denkt</h2>
              <p className="mt-2 text-sm text-slate-600">
                PLA is prachtig voor interieurs, maar in voertuigen wordt het zacht rond 55-60 degC, verkleurt onder UV en scheurt
                door vibraties. Gebruik het enkel voor decoratieve elementen die niet warm worden. Voor functionele onderdelen
                kies je PETG of TPU.
              </p>
              <Link
                href="/blog/filament-vrijdag-pla"
                className="mt-3 inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
              >
                Lees PLA materiaalblog
                <span aria-hidden className="ml-2">-&gt;</span>
              </Link>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">2. PETG: werkpaard voor voertuigen</h2>
              <p className="mt-2 text-sm text-slate-600">
                PETG is hitteresistent tot ca. 80 degC, taai, vochtbestendig en veroudert trager in zonlicht. Perfect voor mounts,
                sensorbehuizingen, kofferorganizers en fietslicht-houders.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Telefoon- en dashcam mounts</li>
                <li>AirTag of tracker housings voor fietsen</li>
                <li>Bagagehaken en organizer clips</li>
                <li>Dashboardsensoren en kabelgeleiders</li>
              </ul>
              <Link
                href="/blog/filament-vrijdag-petg"
                className="mt-3 inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
              >
                Lees PETG materiaalblog
                <span aria-hidden className="ml-2">-&gt;</span>
              </Link>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">3. TPU: flexibele klemmen & dempers</h2>
              <p className="mt-2 text-sm text-slate-600">
                TPU absorbeert vibraties, krast niet en blijft flexibel. Gebruik het voor klemmen rond frames, anti-ratel pads en
                strap-on mounts.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Fietspomp- of toolkit-houders</li>
                <li>Soft latches rond carbon of aluminium</li>
                <li>Kabelgeleiders die niet mogen beschadigen</li>
                <li>Dashboard anti-ratel pads</li>
              </ul>
              <Link
                href="/blog/filament-vrijdag-tpu"
                className="mt-3 inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
              >
                Lees TPU materiaalblog
                <span aria-hidden className="ml-2">-&gt;</span>
              </Link>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">4. Warmte, UV en vibraties</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Materiaal</th>
                      <th className="py-2 pr-4">Warmte</th>
                      <th className="py-2 pr-4">Vibraties</th>
                      <th className="py-2 pr-4">UV</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {materialTable.map((row) => (
                      <tr key={row.material}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.material}</td>
                        <td className="py-3 pr-4">{row.warmte}</td>
                        <td className="py-3 pr-4">{row.vibraties}</td>
                        <td className="py-3 pr-4">{row.uv}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Dashboardtesten tonen dat zwarte PETG 70-80 degC aankan zonder schade, maar ontwerp brede bases en chamfers zodat
                krimp geen kans krijgt. Zie{" "}
                <Link
                  href="/blog/maker-monday-warping-layer-cracks"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Maker Monday #6
                </Link>{" "}
                voor extra tips rond warping en layer cracks.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">5. Ontwerpregels voor voertuigdelen</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {designChecklist.map((item) => (
                  <li key={item.title} className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          {applications.map((block) => (
            <Reveal key={block.title}>
              <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <h2 className="text-2xl font-semibold text-slate-900">{block.title}</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">6. Wat print je beter niet?</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                {doNotPrint.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Toch een case voor ABS, ASA of nylon? Laat het weten tijdens de intake. Onze productie is afgestemd op PLA, PETG
                en TPU voor snelheid en reproduceerbaarheid, maar we adviseren graag een partner- of hybride traject wanneer dat
                logischer is.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">7. Afwerking: nodig of niet?</h2>
              <p className="mt-2 text-sm text-slate-600">
                Voor auto- en fietsaccessoires primeert functionaliteit. PETG en TPU gebruik je rechtstreeks uit de printer. PLA
                matte is aangewezen voor decoratieve interieurelementen. Wil je toch schuren, primen of lakken? Check{" "}
                <Link
                  href="/blog/finishing-friday-schuren-primen-lakken"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Finishing Friday
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">8. Wanneer schakelt een klant X3DPrints in?</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Custom telefoon- of GPS-houder die exact past.</li>
                <li>TPU klem die carbon of lak niet mag beschadigen.</li>
                <li>Prototype van auto-interieur onderdeel of organizer.</li>
                <li>Fietsaccessoires voor verlichting, sensoren of trackers.</li>
                <li>Projecten waar vibraties, zon en hitte niet mogen winnen.</li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Wij leveren PETG Solid/Matte/Translucent, TPU 95A en PLA Matte voor decor. Gratis ontwerpreview voor functionele
                onderdelen hoort erbij.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Volgende stap</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Wil je een auto- of fietsaccessoire laten printen?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel je STL of STEP, vermeld materiaal en toepassing en we koppelen terug met ontwerpadvies, planning en kost in
                  lijn met onze workflow.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?topic=use-case-auto-fiets">Start intake</ShimmerButton>
                <Link href="/3d-printen" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Bekijk knowledge hub
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogReadMore />

    </main>
  )
}

