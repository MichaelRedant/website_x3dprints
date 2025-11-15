import type { Metadata } from "next"
import Link from "next/link"
import AutoCarousel from "@/components/AutoCarousel"
import GlassCard from "@/components/GlassCard"
import GlassOrb from "@/components/GlassOrb"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { readdirSync } from "node:fs"
import path from "node:path"

export const metadata: Metadata = {
  title: "Portfolio 3D prints | X3DPrints",
  description: "Timelapses en foto's van recente 3D-printprojecten uit het atelier in Herzele.",
  alternates: { canonical: "https://www.x3dprints.be/portfolio" },
  openGraph: {
    title: "Portfolio 3D prints | X3DPrints",
    description: "Bekijk timelapse video’s en foto’s van functionele en decoratieve 3D-prints uit onze studio.",
    url: "https://www.x3dprints.be/portfolio",
    images: [{ url: "/Logo.webp", width: 1024, height: 1024 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const portfolioDir = path.join(process.cwd(), "public/images/portfolio")
const photos = readdirSync(portfolioDir)
  .filter((f) => /\.(?:png|jpe?g|webp)$/i.test(f))
  .sort((a, b) => a.localeCompare(b))
  .map((file) => {
    const alt = file
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
    return {
      src: `/images/portfolio/${encodeURIComponent(file)}`,
      alt,
    }
  })

const stats = [
  { label: "Projecten afgerond", value: "150+" },
  { label: "Doorlooptijd", value: "2–5 werkdagen" },
  { label: "Bouwvolume", value: "Tot 25 × 25 × 25 cm" },
]

const focusAreas = [
  {
    title: "Functioneel maatwerk",
    description:
      "Houders, adapters en productietools die direct inzetbaar zijn en tegen een stootje kunnen.",
  },
  {
    title: "Gepersonaliseerde items",
    description: "Gifts en decoratie met naam, logo of unieke afwerking die opvalt.",
  },
  {
    title: "Seriewerk & prototypes",
    description: "Van één teststuk tot kleine series met consistente kwaliteit per onderdeel.",
  },
]

const videos = [
  {
    id: "pEVjhj8Esmo",
    title: "Articulated octopus voor Octopus.be",
    description: "Flexibele octopus voor Octopus.be, direct uit de printer beweegbaar.",
  },
  {
    id: "B-DnVHPTVJE",
    title: "Oorring houder voor Choice Juwelen",
    description: "Eigen ontwerp van een 3D-geprinte houder voor oorbellen.",
  },
  {
    id: "O9MYk5Mgytc",
    title: "Tesla kofferhaak in PETG",
    description: "Stevige haak voor in de Tesla-koffer, geprint in PETG.",
  },
  {
    id: "rRcWkRGwbTo",
    title: "Gepersonaliseerde grafstekker",
    description: "Custom 3D-geprinte grafstekker ontworpen voor een kinderherdenking.",
  },
  {
    id: "o9zBbvayF-4",
    title: "Cartoon figure met naam display",
    description: "Cartoon-personage met gepersonaliseerd naamdisplay uit de 3D-printer.",
  },
  { id: "tVDwEw3Od-8", title: "3D geprinte fleshouder", description: "Praktische fleshouder, laag per laag opgebouwd in PLA." },
  { id: "-CWmBhP_OO0", title: "Wireless mesh houder", description: "Compacte houder voor een draadloze mesh-node met strakke passtukken." },
  { id: "KlYc5fyDMLU", title: "Baby cadeau letter", description: "Persoonlijk kraamcadeau in de vorm van een initiaal." },
  { id: "EomHXEwzXMY", title: "Articulated octopus", description: "Flexibele octopus die direct uit de printer beweegt." },
  { id: "IHAq-qheqpY", title: "Transparante kerstboom", description: "Heldere kerstboom als feestelijke decoratie." },
  { id: "o2TNLro97X4", title: "TPU Samsung S24 Ultra case", description: "Schokbestendige smartphonehoes geprint in TPU." },
  { id: "IMxoScXrRPw", title: "Pray sculpture", description: "Meditatieve sculptuur met fijne details." },
  { id: "RmoQwgCUOcY", title: "Articulated kerstboom", description: "Speelse kerstboom met scharnierende takken." },
  { id: "5R9mFNdQEew", title: "Gehaakte kom", description: "3D-geprinte basis voor een gehaakte kom." },
  { id: "2SWpnls132g", title: "Meditatie sculpture", description: "Rustgevende figuur voor een stille meditatiehoek." },
  { id: "DPUI88Nj9QU", title: "Gepersonaliseerde winkelkar coins", description: "Bedrukte winkelwagenmuntjes als bedrijfsgadget." },
  { id: "B0nTIBoHho0", title: "Baby boy gift", description: "Cadeau voor een pasgeboren jongen, op maat geprint." },
  { id: "0SQdnzZa034", title: "Gehaakte ballonhond", description: "Skelet voor een gehaakte ballonhond." },
  { id: "QtUTEn1gaRw", title: "Zombie hand 'Thing'", description: "Halloweenprop geïnspireerd op 'Thing' uit Wednesday." },
  { id: "ek525KTB6rM", title: "QR code met standaard", description: "Staande QR-code voor promoties of menukaarten." },
  { id: "4aZpwYity2w", title: "Zen sculpture", description: "Minimalistische sculptuur voor een rustige sfeer." },
  { id: "Bo0jpv9hnyg", title: "Fidget studs", description: "Klikbare fidget-studs als speels bureauaccessoire." },
  { id: "vOviHFKnqU0", title: "Articulated pompoen", description: "Scharnierende pompoen voor Halloween." },
]

const newVideoIds = new Set([
  "pEVjhj8Esmo",
  "B-DnVHPTVJE",
  "O9MYk5Mgytc",
  "rRcWkRGwbTo",
  "o9zBbvayF-4",
])

const imageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "X3DPrints image gallery",
  hasPart: photos.map((p) => ({
    "@type": "ImageObject",
    contentUrl: `https://www.x3dprints.be${p.src}`,
    name: p.alt,
    description: p.alt,
  })),
}

const videoJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "X3DPrints portfolio",
  hasPart: videos.map((v) => ({
    "@type": "VideoObject",
    name: v.title,
    description: v.description,
    thumbnailUrl: `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
    embedUrl: `https://www.youtube.com/watch?v=${v.id}`,
  })),
}

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(56,189,248,0.25),transparent_60%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.12]" />

      <section className="relative px-6 pb-24 pt-20 sm:px-8 lg:px-12">
        <div className="absolute -left-16 top-12 -z-10 hidden md:block">
          <GlassOrb className="h-72 w-72 opacity-35" />
        </div>
        <div className="absolute -right-12 -bottom-20 -z-10 hidden lg:block">
          <GlassOrb className="h-80 w-80 opacity-25" />
        </div>
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_.8fr]">
            <Reveal className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Portfolio
              </span>
              <h1 className="mt-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-balance text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
                Real-life 3D prints voor makers, retailers en events.
              </h1>
              <p className="mt-4 text-pretty text-lg text-slate-700">
                Van articulated octopus tot custom winkelmateriaal: elk project combineert functionele eisen met een strakke afwerking.
                Hier ontdek je een mix van maatwerk, seriewerk en persoonlijke cadeaus rechtstreeks uit het atelier in Herzele.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ShimmerButton href="/contact">Offerte aanvragen</ShimmerButton>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white"
                >
                  Bekijk diensten
                </Link>
                <Link
                  href="/materials"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/50 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white"
                >
                  Materialen & richtlijnen
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="grid gap-4">
              <GlassCard className="overflow-hidden border border-white/50 bg-white/70 p-6 shadow-lg backdrop-blur">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Nieuw in de kijker</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Vijf recente projecten die de veelzijdigheid van 3D-printing tonen.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {videos.slice(0, 5).map((video) => (
                    <li key={video.id} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />
                      <span>{video.title}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
              <GlassCard className="border border-white/50 bg-white/70 p-6 shadow-lg backdrop-blur">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Waar we op focussen</h2>
                <div className="mt-4 grid gap-3">
                  {focusAreas.map((item) => (
                    <div key={item.title}>
                      <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <GlassCard
                key={stat.label}
                className="border border-white/50 bg-white/70 px-6 py-5 text-center shadow-md backdrop-blur transition-transform hover:-translate-y-1"
              >
                <div className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">{stat.label}</div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</div>
              </GlassCard>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Afbeeldingen</h2>
            <p className="mt-2 text-slate-600">
              Scroll door de carousel met productshots, prototypes en afgewerkte decorstukken. Klik door voor een vergrote weergave.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mt-8">
            <AutoCarousel items={photos} speed={18} />
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Timelapse video’s</h2>
            <p className="mt-2 text-slate-600">
              Kijk mee hoe onderdelen laag per laag worden opgebouwd. Alle video’s zijn geprint en gefilmd in de studio van X3DPrints.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {videos.map((video, index) => (
              <Reveal
                key={video.id}
                delay={0.1 + index * 0.03}
                className="h-full"
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-4 shadow-lg backdrop-blur transition-transform hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200/60">
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/0 via-slate-900/0 to-slate-900/10 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                      title={video.title}
                      loading="lazy"
                      allowFullScreen
                      className="aspect-video w-full"
                    />
                    {newVideoIds.has(video.id) && (
                      <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                        Nieuw
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex flex-1 flex-col">
                    <h3 className="text-lg font-semibold text-slate-900">{video.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-slate-600">{video.description}</p>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                    >
                      Bekijk op YouTube
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 px-8 py-10 text-center shadow-xl backdrop-blur">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-cyan-400/10 to-sky-400/10" aria-hidden />
              <div className="relative">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Klaar voor het volgende project?</p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">
                  Laat ons mee nadenken over materiaal, afwerking en planning.
                </h2>
                <p className="mt-3 text-base text-slate-600">
                  Deel je ontwerpbestanden en ontvang binnen één werkdag een vrijblijvende offerte met advies.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <ShimmerButton href="/contact">Vraag een offerte aan</ShimmerButton>
                  <Link
                    href="/faq"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white"
                  >
                    Veelgestelde vragen
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
    </main>
  )
}
