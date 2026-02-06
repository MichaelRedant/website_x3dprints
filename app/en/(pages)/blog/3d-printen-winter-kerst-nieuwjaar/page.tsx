import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/3d-printen-winter-kerst-nieuwjaar/"
const datePublished = "2024-11-15"
const dateModified = "2026-02-04"

export const metadata: Metadata = {
  title: "3D printing for winter, Christmas and New Year | X3DPrints Blog",
  description:
    "Snowflakes, ornaments, place cards and party props in Silk, Marble and Translucent PLA. Tips for light objects, mounting and delivery. Design file not included.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-printen-winter-kerst-nieuwjaar/",
      en: canonical,
      "x-default": "https://www.x3dprints.be/blog/3d-printen-winter-kerst-nieuwjaar/",
    },
  },
  openGraph: {
    title: "3D printing for winter, Christmas and New Year",
  description: "Festive decor with gloss or glow. Material choices, slicer tips and delivery options for year-end.",
  url: canonical,
  images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D printed Christmas decor" }],
  locale: "en_BE",
  siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing for winter, Christmas and New Year",
    description: "Ornaments, snowflakes and party props. Silk/Marble/Translucent PLA and delivery options.",
    images: ["/images/og-home.jpg"],
  },
}

const tips = [
  "Silk or Marble PLA for shiny ornaments and table pieces; multicolour PLA for playful baubles.",
  "Translucent PLA for light objects; wall thickness 1.6-2 mm for a soft glow.",
  "Layer height 0.16-0.2 mm; ensure sturdy hang loops on ornaments.",
  "Design/model not included: provide STL/STEP or choose design service at €45/hour.",
]

const checklist = [
  "Use: ornament, table decor, light object, party prop or gift tag.",
  "Material: Silk/Marble for gloss, Translucent for glow, Matte for soft pastels.",
  "Mounting: ribbon, hook or magnet? Add holes/eyelets and consider weight.",
  "Delivery: EV zones or parcel; add your event date (Christmas dinner, New Year party).",
]

const faqItems = [
  {
    q: "Can you also design the ornament?",
    a: "Yes, optionally. Design is not included. Provide STL/STEP or choose design service (€45/hour). We tune wall thickness, loops and text for printability.",
  },
  {
    q: "What materials are best for light objects?",
    a: "Translucent PLA at 1.6-2 mm walls for a soft glow. Keep ventilation for LEDs and avoid heat buildup.",
  },
  {
    q: "How do you pack fragile items?",
    a: "We pack separately with foam and deliver via EV zones (Zone 1 €15, Zone 2 €30, Zone 3 €45) or parcel service. Pickup in Herzele is free.",
  },
  {
    q: "Can you rush before the holidays?",
    a: "Often yes, depending on volume and finish. Share your date; we plan realistically without overpromising.",
  },
]

const inspirationImages = [
  { src: "/images/portfolio/winter1.webp", alt: "3D printed winter decor 1" },
  { src: "/images/portfolio/winter2.webp", alt: "3D printed winter decor 2" },
  { src: "/images/portfolio/winter3.webp", alt: "3D printed winter decor 3" },
  { src: "/images/portfolio/winter4.webp", alt: "3D printed winter decor 4" },
  { src: "/images/portfolio/winter5.webp", alt: "3D printed winter decor 5" },
  { src: "/images/portfolio/winter6.webp", alt: "3D printed winter decor 6" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D printing for winter, Christmas and New Year",
  description:
    "Snowflakes, ornaments, place cards and party props in Silk, Marble and Translucent PLA. Tips for light objects, mounting and delivery. Design file not included.",
  datePublished,
  dateModified,
  inLanguage: "en-BE",
})

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

    mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

export default function WinterHolidaysBlogEn() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-sky-50" />
      </div>

      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              3D printing for winter, Christmas and New Year
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Snowflakes, ornaments, place cards and party props with gloss or glow. Design file not included; provide STL/STEP or choose design service
              (€45/hour). EV delivery in Belgium, parcel elsewhere; Bpost export for EU/UK gifting on request.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/en/contact?material=PLA">Plan holiday prints</ShimmerButton>
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
                    <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Use Translucent for light diffusion, add robust loops for hanging and keep wall thickness above 1.6 mm. For magnets or ribbon, add
                reinforced holes. We can split larger decor into modules for safer shipping.
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
                Extra: add anti-slip pads to table pieces, and share event colours (HEX/RGB) if you need exact matches.
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
              <div className="mt-4 grid gap-4 sm:grid-cols-3 md:grid-cols-4">
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need holiday prints scheduled?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Send your STL/STEP, colours and event date. We confirm materials, glow options and delivery slots.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?material=PLA">Plan holiday prints</ShimmerButton>
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

