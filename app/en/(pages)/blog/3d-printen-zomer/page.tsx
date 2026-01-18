import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/3d-printen-zomer"

export const metadata: Metadata = {
  title: "3D printing for summer | X3DPrints Blog",
  description:
    "Outdoor decor, nautical props and terrace accessories. PETG for sun/moisture, PLA Silk/Marble for luxe table decor, TPU for grip. Design file not included; design service available.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-printen-zomer",
      en: canonical,
    },
  },
  openGraph: {
    title: "3D printing for summer",
    description: "Garden and beach decor, nautical themes and custom holders. Materials, slicer tips, delivery and design service.",
    url: canonical,
    type: "article",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D printed summer decor" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing for summer",
    description: "Outdoor props and terrace toppers in PETG/TPU or Silk PLA. Tips for heat, grip and delivery.",
    images: ["/images/og-home.jpg"],
  },
}

const tips = [
  "Use PETG for outdoor decor: better against sun and moisture. PLA Silk/Marble for luxe table decor indoors.",
  "Layer height 0.2 mm for larger pieces; 0.16 mm for fine details. Wall thickness >1.6 mm for items in the sun.",
  "TPU for anti-slip feet under trays or beach gear. Combine PLA or PETG on top for stiffness.",
  "Design/model not included: provide STL/STEP or choose design service at €45/hour.",
  "For drinkware holders: add drainage holes and round edges for comfort.",
]

const checklist = [
  "State if it is for outdoor or indoor (sun/moisture).",
  "Material choice: PETG for outdoor, PLA Silk/Marble for looks, TPU for grip/anti-slip.",
  "Finish: raw for utility, lightly sanded or primed for showpieces.",
  "Delivery: EV zone or parcel; pickup is possible. Add your deadline (festival, garden party, beach trip).",
]

const faqItems = [
  {
    q: "Which materials do you recommend for outdoors?",
    a: "PETG for sun/moisture, optionally with matte finish. PLA Silk/Marble for indoor or sheltered spots. TPU for anti-slip feet.",
  },
  {
    q: "Can you make beach or nautical props?",
    a: "Yes. Anchors, lighthouses, shells or custom holders for drinkware and gadgets. Provide STL/STEP or use design service (€45/hour).",
  },
  {
    q: "How do you ship fragile pieces safely?",
    a: "We pack separately with foam and deliver via EV zones (Zone 1 €15, Zone 2 €30, Zone 3 €45) or parcel service. Pickup in Herzele is free.",
  },
  {
    q: "Is the 3D model included?",
    a: "No. Design file is not included; you provide STL/STEP or choose design service at €45/hour. We optimise wall thickness and supports.",
  },
  {
    q: "How do you prevent warping in the sun?",
    a: "Choose PETG for outdoors, avoid dark PLA in full sun and keep wall thickness >1.6 mm. For heavier items we add wider bases or TPU feet.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",

    headline: "3D printing for summer",
  description:
    "Outdoor decor, nautical props and terrace accessories. PETG for sun/moisture, PLA Silk/Marble for luxe table decor, TPU for grip.",
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

    mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

const inspirationImages = [
  { src: "/images/portfolio/Summer1.webp", alt: "3D printed summer decor 1" },
  { src: "/images/portfolio/Summer2.webp", alt: "3D printed summer decor 2" },
  { src: "/images/portfolio/Summer3.webp", alt: "3D printed summer decor 3" },
  { src: "/images/portfolio/Summer4.webp", alt: "3D printed summer decor 4" },
  { src: "/images/portfolio/Summer5.webp", alt: "3D printed summer decor 5" },
  { src: "/images/portfolio/Summer6.webp", alt: "3D printed summer decor 6" },
  { src: "/images/portfolio/Summer7.webp", alt: "3D printed summer decor 7" },
]

export default function BlogSummerEn() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-amber-50" />
      </div>

      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              3D printing for summer
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Terrace decor, nautical themes and custom holders for festivals or beach trips. Design file not included; provide STL/STEP or choose design
              service (€45/hour). EV delivery for fragile pieces or parcel service further away.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/en/contact">Plan your summer prints</ShimmerButton>
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
                Add drainage/openings for outdoor decor and choose PETG for heat resistance (car/sun). TPU pads prevent sliding on smooth tables. For indoor
                luxe use Silk/Marble PLA.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Delivery: EV zones or parcel service. Fragile parts are packed separately; large decor can ship in modules so the interior stays smooth.
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
                Extra: add TPU anti-slip feet to trays or caddies. Want branding/names? Provide an STL/STEP with emboss or use design service.
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BlogReadMore />
    </main>
  )
}

