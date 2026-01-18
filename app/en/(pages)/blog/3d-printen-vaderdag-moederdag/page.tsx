import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/3d-printen-vaderdag-moederdag"

export const metadata: Metadata = {
  title: "Father&apos;s Day & Mother&apos;s Day 3D printing | X3DPrints Blog",
  description:
    "Personalised keychains, desk items and name gifts in Silk/Matte/PETG. Tips for legibility, rounded edges and delivery (May-June).",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-printen-vaderdag-moederdag",
      en: canonical,
    },
  },
  openGraph: {
    title: "Father&apos;s Day & Mother&apos;s Day 3D printing",
    description: "Custom gifts with name/initials, rounded edges and anti-slip feet. Material picks and delivery tips for Father's/Mother's Day.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Father's Day Mother's Day 3D prints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Father&apos;s Day & Mother&apos;s Day 3D printing",
    description: "Personalised gifts in Silk/Matte/PETG with rounded edges and fast delivery.",
    images: ["/images/og-home.jpg"],
  },
}

const tips = [
  "Silk PLA for glossy gifts, Matte PLA for a soft look; PETG for stronger keychains/desk items.",
  "Min. 0.6 mm text depth and rounded edges for a pleasant feel in daily use.",
  "TPU pads for anti-slip; use pockets or integrated feet.",
  "Layer height 0.16-0.24 mm for tidy lines without long print time.",
  "Batch names/initials per print run for consistent colour and finish.",
]

const checklist = [
  "Gift type: keychain, desk item, name/initial piece or small decor.",
  "Material: Silk/Matte for looks, PETG for strength, TPU for grip.",
  "Finish: raw or lightly sanded; primer optional if you paint.",
  "Deadline (May-June) + delivery option (EV zones or parcel).",
]

const faqItems = [
  {
    q: "Can you add custom names or logos?",
    a: "Yes. Provide STL/STEP with text or let us add emboss/deboss via design service (EUR 45/hour). We ensure legibility and rounded edges.",
  },
  {
    q: "Which material lasts longer on keychains?",
    a: "PETG holds up best for keychains and daily use. Silk/Matte PLA works well for desk gifts and shelf decor.",
  },
  {
    q: "How fast can you deliver before Father's/Mother's Day?",
    a: "Usually within a few business days. Share your date; we plan realistically without overpromising.",
  },
  {
    q: "Is the design included?",
    a: "No. Design is not included. Provide STL/STEP or choose design service at EUR 45/hour; we optimise for comfort and strength.",
  },
]

const inspirationImages = [
  { src: "/images/portfolio/vaas-stained.webp", alt: "Personalised vase gift" },
  { src: "/images/portfolio/bamboe-eraser.webp", alt: "Desk gift for Father's Day" },
  { src: "/images/portfolio/Man-vase.webp", alt: "Silk PLA decorative gift" },
  { src: "/images/portfolio/Ceramics2.webp", alt: "Small decor gift idea" },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Father&apos;s Day & Mother&apos;s Day 3D printing",
  description:
    "Personalised gifts in Silk/Matte/PETG with guidance on legibility, rounded edges and delivery for May-June.",
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

export default function FathersMothersDayBlogEn() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-sky-50" />
      </div>

      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Father&apos;s Day & Mother&apos;s Day 3D printing
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Personalised keychains, desk items and name gifts in Silk, Matte or PETG. Design file not included; provide STL/STEP or choose design service
              (EUR 45/hour). Rounded edges and legible text for daily use.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/en/contact?material=PLA">Plan my gift</ShimmerButton>
              <Link
                href="/en/materials#material-suggestion-tool"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Choose PLA/PETG
              </Link>
              <Link
                href="/en/pricing"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                See pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Material & finishing tips</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {tips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                For keychains use PETG for durability. For desk gifts pick Silk for gloss or Matte for a soft look. Add TPU pads to keep items steady on
                smooth surfaces.
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need personalised gifts?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Send your STL/STEP, names and deadline. We confirm materials, finishes and delivery slots in time for the day.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?material=PLA">Plan my gift batch</ShimmerButton>
                <Link href="/en/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  See pricing & lead times
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
