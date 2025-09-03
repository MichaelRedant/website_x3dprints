import type { Metadata } from "next"
import Link from "next/link"
import AutoCarousel from "@/components/AutoCarousel"
import GlassOrb from "@/components/GlassOrb"
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

const videos = [
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
    <main className="relative">
      {/* decor achtergrond */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-teal-50" />
        <div className="absolute -top-24 -left-20 hidden sm:block">
          <GlassOrb className="h-64 w-64 opacity-40" />
        </div>
        <div className="absolute -bottom-28 -right-24 hidden md:block">
          <GlassOrb className="h-72 w-72 opacity-30" />
        </div>
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>

      <section className="px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <header className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/60 px-3 py-1 text-xs text-slate-700 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Cases & showcases
            </span>
            <h1 className="mt-3 bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
              Portfolio
            </h1>
            <p className="mx-auto mt-3 max-w-prose text-slate-600">
              Een selectie van recente prints, van functionele houders tot decoratieve stukken. Wil je iets gelijkaardigs?
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <ShimmerButton href="/contact">Offerte aanvragen</ShimmerButton>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                Bekijk diensten
              </Link>
            </div>
          </header>

          {/* Carousel */}
          <h2 className="mt-12 text-2xl font-bold tracking-tight text-slate-900">Afbeeldingen</h2>
          <p className="mt-2 text-slate-600">Hover om te pauzeren. Klik voor details.</p>
          <div className="mt-6">
            <AutoCarousel items={photos} speed={20}  />
          </div>

          {/* Video's (ongewijzigd) */}
          <h2 className="mt-12 text-2xl font-bold tracking-tight text-slate-900">Timelapse video’s</h2>
          <p className="mt-2 text-slate-600">Kijk mee hoe onderdelen laag per laag ontstaan.</p>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            {videos.map((v) => (
              <article key={v.id} className="rounded-2xl border border-white/30 bg-white/60 p-3 shadow-sm backdrop-blur">
                <div className="aspect-video overflow-hidden rounded-xl">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                    title={v.title}
                    loading="lazy"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
                <h3 className="mt-2 font-semibold text-slate-900">{v.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{v.description}</p>
              </article>
            ))}
          </div>

          {/* CTA onderaan */}
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-600">Interesse in een vergelijkbaar project?</p>
            <div className="mt-3 flex justify-center gap-3">
              <ShimmerButton href="/contact">Neem contact op</ShimmerButton>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                Materialen & richtlijnen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
    </main>
  )
}
