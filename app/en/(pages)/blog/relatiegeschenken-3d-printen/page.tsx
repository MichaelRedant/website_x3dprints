import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import VideoGallery from "@/components/VideoGallery"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd, buildFaqPageSchema } from "@/lib/seo"
import BlogContentOverview from "@/components/BlogContentOverview"
import BlogAuthorNote from "@/components/BlogAuthorNote"

const canonical = "https://www.x3dprints.be/en/blog/relatiegeschenken-3d-printen/"
const publishedDate = "2025-08-20T08:00:00+01:00"
const dateModified = "2026-02-08"
const lastUpdatedLabel = "Last updated: 8 February 2026"

export const metadata: Metadata = {
  title: "B2B corporate gifts with 3D printing | X3DPrints Blog",
  description:
    "Tailored corporate gifts, thank-you items and team swag: keychains, desk organizers and awards in Silk/Matte/PETG. Quick feedback, design service available.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/relatiegeschenken-3d-printen/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/relatiegeschenken-3d-printen/",
    },
  },
  openGraph: {
    title: "3D printed corporate gifts | B2B",
    description:
      "Personalised B2B gifts: keychains, desk items and awards in Silk/Matte/PETG. Tips on materials, legibility and delivery.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D printed corporate gifts" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printed corporate gifts | B2B",
    description: "Custom keychains, desk items and awards in Silk/Matte/PETG. Material and delivery tips.",
    images: ["/images/og-home.jpg"],
  },
}

const tips = [
  "Silk PLA for a luxe gloss; Matte PLA for a soft feel and legible text. PETG for stronger keychains or desk items.",
  "Text depth min. 0.6 mm; round edges for a pleasant feel. Add pockets for magnets or TPU pads.",
  "Layer height 0.16-0.24 mm: clean lines without long print time. Batch names/initials per colour.",
  "Provide STL/STEP or use design service (€45/hour). Add logo as vector or STL in the brief.",
  "Plan lead time: usually a few business days; share event date and delivery method (EV zones or parcel).",
]

const checklist = [
  "Gift type: keychain, desk organizer, award, nameplate.",
  "Material: Silk/Matte PLA (look), PETG (strength), TPU (grip).",
  "Finish: raw or lightly sanded; primer optional for painting.",
  "Branding: logo, name, QR code? Provide font/outline.",
  "Deadline + delivery option: EV zone or parcel service.",
]

const faqItems = [
  {
    q: "Can you integrate names, initials or logos?",
    a: "Yes. Provide STL/STEP or use design service (€45/hour). We keep at least 0.6 mm text depth and rounded edges.",
  },
  {
    q: "Which materials fit corporate gifts?",
    a: "Silk PLA for glossy awards, Matte PLA for soft feel, PETG for durable keychains/organizers. TPU for anti-slip pads.",
  },
  {
    q: "How fast can you deliver?",
    a: "Typically within a few business days. Share your event date; we plan realistically without overpromising.",
  },
  {
    q: "Is the 3D model included?",
    a: "No. The design file is not included. Provide STL/STEP or choose design service at €45/hour; we optimise for readability and comfort.",
  },
]

const inspirationImages = [
  { src: "/images/portfolio/vaderdag.webp", alt: "3D printed desk gift" },
  { src: "/images/portfolio/vaderdag2.webp", alt: "3D printed giveaway keychain" },
  { src: "/images/portfolio/back2school%20(2).webp", alt: "Custom small gifts" },
  { src: "/Logo.webp", alt: "3D printed logo decor" },
]

const videos = [
  {
    id: "ljJ3R4WtyLg",
    title: "Team gift unboxing",
    description: "Silk PLA gifts with names and logo, packed for safe delivery.",
  },
]

const references = [
  {
    label: "Autodesk: STL file format",
    href: "https://help.autodesk.com/cloudhelp/2014/ENU/Alias/files/GUID-8ABFA3B8-204B-44E0-A50B-BA4C1C3F9BE8.htm",
    description: "STL basics and export context for 3D printing workflows.",
  },
  {
    label: "Prusa: Material guide",
    href: "https://help.prusa3d.com/filament-material-guide",
    description: "Overview of PLA, PETG and TPU material behaviour and print considerations.",
  },
  {
    label: "UltiMaker PLA material properties",
    href: "https://ultimaker.com/materials/pla/",
    description: "PLA characteristics, storage tips and baseline print guidance.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "B2B corporate gifts with 3D printing",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home.jpg",
  inLanguage: "en-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  items: faqItems,
})


export default function CorporateGiftsBlogEn() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-emerald-50" />
      </div>

      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">B2B gifts</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              3D printed corporate gifts
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Custom keychains, desk items and awards with your logo or names. We keep edges rounded, text readable and plan delivery ahead of your event.
            </p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/en/contact?material=PLA">Plan a gift batch</ShimmerButton>
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

      <BlogContentOverview locale="en" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Material & finishing tips</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {tips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Batch names/initials per colour for consistent finish. Add TPU pads to keep items steady on desks. Provide logo as vector or STL so we keep
                detail crisp.
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

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Inspiration</h2>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Ready to order corporate gifts?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share STL/STEP, names and deadline. We confirm material, finish and delivery so you can brief stakeholders confidently.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?material=PLA">Plan my gifts</ShimmerButton>
                <Link href="/en/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  View pricing & lead times
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Video</p>
            <h2 className="text-2xl font-semibold text-slate-900">See how we pack and finish</h2>
            <p className="text-sm text-slate-600">
              Short clip showing Silk PLA gifts with names and logo, packed safely for delivery.
            </p>
          </div>
          <VideoGallery videos={videos} highlightIds={[]} />
        </div>
      </section>
      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
          <h2 id="sources" className="text-2xl font-semibold text-slate-900">Sources and references</h2>
          <p className="mt-2 text-sm text-slate-600">Primary references that support the material and workflow guidance in this article.</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {references.map((ref) => (
              <li key={ref.href} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                <a href={ref.href} target="_blank" rel="noreferrer" className="text-base font-semibold text-indigo-600">
                  {ref.label}
                </a>
                <p className="mt-1 text-sm text-slate-600">{ref.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BlogAuthorNote locale="en" />

      <BlogReadMore />
    </main>
  )
}






