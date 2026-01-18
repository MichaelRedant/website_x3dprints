import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/3d-printen-lente-pasen"

export const metadata: Metadata = {
  title: "3D printing for spring and Easter | X3DPrints Blog",
  description:
    "Pastel decor, Easter ornaments and light objects in Silk, Matte and Translucent PLA. Tips for supports, magnets, delivery and design service (model not included).",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-printen-lente-pasen",
      en: canonical,
    },
  },
  openGraph: {
    title: "3D printing for spring and Easter",
    description: "Eggs, bunnies, floral decor and lanterns in pastel PLA or Translucent. Slicer tips, finishing and delivery zones.",
    url: canonical,
    type: "article",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D printed Easter decor" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing for spring and Easter",
    description: "Pastel PLA and Translucent lanterns, with tips for supports, magnets and delivery.",
    images: ["/images/og-home.jpg"],
  },
}

const tips = [
  "Use Silk or Matte PLA in pastel colours for eggs, bunnies and ornaments; Translucent for light objects.",
  "Layer height 0.16-0.2 mm; keep wall thickness >1.2 mm for sturdy hangers on branches.",
  "Integrate eyelets or pin-holes for hooks/magnets so ornaments do not break.",
  "Design/model not included: provide STL/STEP or choose design service at €45/hour.",
  "For outdoor decor: choose PETG for better UV/moisture resistance and avoid dark colours in full sun.",
]

const checklist = [
  "Use: ornament, table decor, light object or garland.",
  "Material: Silk/Matte for pastels, Translucent for glow, PETG for outdoor.",
  "Mounting: ribbon, hook or magnet? Add holes or eyelets.",
  "Delivery: EV zones or parcel; add your deadline (Easter brunch/event).",
]

const faqItems = [
  {
    q: "Can you print hollow eggs for LEDs?",
    a: "Yes. We keep 2-3 perimeters, tuned infill and openings for LEDs/batteries. Provide STL/STEP or use design service (€45/hour).",
  },
  {
    q: "Best material for Easter ornaments?",
    a: "Silk/Matte PLA pastels for indoor decor, Translucent for light objects. PETG if items go outside.",
  },
  {
    q: "How do you ship fragile pieces?",
    a: "Packed separately with foam; EV delivery in zones (Zone 1 €15, Zone 2 €30, Zone 3 €45) or parcel service. Pickup is free.",
  },
  {
    q: "Is design included?",
    a: "No. Design is not included in the print price. Provide STL/STEP or choose design service at €45/hour; we optimise wall thickness and supports.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",

  inLanguage: ["nl-BE", "en-BE"],
  headline: "3D printing for spring & Easter",
  description:
    "Pastel decor, ornaments and light objects in Silk, Matte and Translucent PLA with tips for supports, magnets and delivery.",
  author: { "@type": "Organization", name: "X3DPrints", url: "https://www.x3dprints.be" },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
    logo: { "@type": "ImageObject", url: "https://www.x3dprints.be/Logo.webp" },
  },
  mainEntityOfPage: canonical,
  url: canonical,
  image: ["https://www.x3dprints.be/images/og-home.jpg"],
  inLanguage: "en-BE",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  inLanguage: ["nl-BE", "en-BE"],
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

const inspirationImages = [
  { src: "/images/portfolio/pasen1.webp", alt: "3D printed Easter decor 1" },
  { src: "/images/portfolio/pasen2.webp", alt: "3D printed Easter decor 2" },
  { src: "/images/portfolio/pasen3.webp", alt: "3D printed Easter decor 3" },
  { src: "/images/portfolio/pasen4.webp", alt: "3D printed Easter decor 4" },
]

export default function BlogSpringEasterEn() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50" />
      </div>

      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              3D printing for spring and Easter
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Pastel ornaments, bunnies and light decor. Design file not included; provide STL/STEP or choose design service (€45/hour). EV delivery for
              fragile pieces or parcel service.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/en/contact?material=PLA">Plan Easter prints</ShimmerButton>
              <Link
                href="/en/segments/3d-printing-seasonal"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Go to seasonal segment
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Materials & settings</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {tips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Keep hangers reinforced, add small holes for magnets or hooks, and choose PETG for outdoor pieces. For light diffusion, keep walls 1.6-2 mm
                thick and avoid overheating LEDs.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Checklist</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {checklist.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-slate-700">
                Extra: add TPU anti-slip pads to table decor. Want names or branding? Provide emboss in your STL/STEP or request design service.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">FAQ</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                {faqItems.map((item) => (
                  <div key={item.q}>
                    <h4 className="text-base font-semibold text-slate-900">{item.q}</h4>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need Easter prints?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Send your STL/STEP, colours and deadline. We confirm materials, glow options and delivery slots.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?material=PLA">Plan my Easter order</ShimmerButton>
                <Link href="/en/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  See pricing & lead times
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BlogReadMore />
    </main>
  )
}
