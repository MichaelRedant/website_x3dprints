import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/3d-printen-mini-figuren"

export const metadata: Metadata = {
  title: "3D printing miniatures for tabletop gaming | X3DPrints Blog",
  description:
    "Guide to 3D printing miniatures and dice towers for Dungeons & Dragons and Warhammer. Materials, detail tips, supports, finishing and delivery.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-printen-mini-figuren",
      en: canonical,
    },
  },
  openGraph: {
    title: "3D printing miniatures for tabletop gaming",
    description:
      "Learn how to print razor-sharp D&D and Warhammer minis: material choice, detail, supports, primer, painting and safe delivery.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D printed miniatures and dice tower" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing miniatures for tabletop gaming",
    description: "From STL to printed minis: detail, supports, curing and painting tips for D&D/Warhammer.",
    images: ["/images/og-home.jpg"],
  },
}

type Card = { title: string; body: string }

const highlights: Card[] = [
  {
    title: "Detail & scale",
    body: "Minis of 25-35 mm need tight layers (0.12-0.16 mm) and fine nozzles. We orient the visible side up for sharp faces, weapon edges and ornaments.",
  },
  {
    title: "Supports & cleanup",
    body: "We use minimal supports, place them away from faces and fine details, and clean up carefully to avoid scars. Optional priming for a paint-ready surface.",
  },
  {
    title: "Material choice",
    body: "PLA Matte for crisp detail and easy painting. PETG only if you need extra toughness for bigger terrain. TPU for flexible bases or bumpers.",
  },
]

const faqItems = [
  {
    q: "Can you print custom hero minis?",
    a: "Yes. Provide STL/STEP. We keep 0.12-0.16 mm layers, orient faces upward and use minimal supports. Priming optional.",
  },
  {
    q: "Do you ship painted minis?",
    a: "We ship unpainted. We can prime in grey so you can paint immediately.",
  },
  {
    q: "What about dice towers or terrain?",
    a: "Larger parts often print in modules and join with dowels/magnets. We keep walls thick enough for durability and avoid sharp edges.",
  },
  {
    q: "How are minis packed?",
    a: "Individually wrapped with foam and stiffeners. EV delivery available in zones; parcel shipping possible for further destinations.",
  },
]

const inspirationImages = [
  { src: "/images/portfolio/minifiguren1.webp", alt: "3D printed tabletop miniatures set 1" },
  { src: "/images/portfolio/minifiguren2.webp", alt: "3D printed tabletop miniatures set 2" },
  { src: "/images/portfolio/dice-tower.webp", alt: "3D printed dice tower" },
  { src: "/images/portfolio/Ceramics1.webp", alt: "Terrain-inspired print" },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "3D printing miniatures for tabletop gaming",
  description:
    "Guide to printing minis and dice towers for tabletop games with settings, materials, support strategy, finishing and packing.",
  author: { "@type": "Organization", name: "X3DPrints", url: "https://www.x3dprints.be" },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
    logo: { "@type": "ImageObject", url: "https://www.x3dprints.be/Logo.webp" },
  },
  mainEntityOfPage: canonical,
  url: canonical,
  image: "https://www.x3dprints.be/images/og-home.jpg",
  inLanguage: "en-BE",
}

export default function MiniFiguresBlogEn() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_-10%,rgba(59,130,246,0.12),transparent_65%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Tabletop</p>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printing miniatures for tabletop gaming
            </h1>
            <p className="text-lg text-slate-700">
              From hero minis to dice towers: we print crisp details, protect faces from supports and can prime so you paint right away.
            </p>
            <div className="flex flex-wrap gap-3">
              <ShimmerButton href="/en/contact?material=PLA">Request a mini print</ShimmerButton>
              <Link
                href="/en/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                View pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <Reveal key={item.title}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-3 text-sm text-slate-600">{item.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                {faqItems.map((item) => (
                  <div key={item.q}>
                    <h3 className="text-base font-semibold text-slate-900">{item.q}</h3>
                    <p className="mt-1">{item.a}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Inspiration</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {inspirationImages.map((image) => (
                  <div key={image.src} className="overflow-hidden rounded-2xl border border-slate-100 bg-white/60">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={380}
                      height={380}
                      className="h-full w-full object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 240px"
                    />
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Next step</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need minis printed?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share your STL/STEP and scale. We confirm supports, finish (raw/primed) and delivery so you can paint and play quickly.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?material=PLA">Plan my minis</ShimmerButton>
                <Link href="/en/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  View pricing & lead times
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
