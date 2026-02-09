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

const canonical = "https://www.x3dprints.be/en/blog/3d-printen-back-to-school/"
const datePublished = "2025-07-15"
const dateModified = "2026-02-09"
const lastUpdatedLabel = "Last updated: 9 February 2026"


export const metadata: Metadata = {
  title: "Back to School 2026: 3D printing for school | X3DPrints Blog",
  description:
    "Pen holders, nameplates, desk organizers and STEM models. Educational 3D printing in PLA/PETG with quick turnaround for August-September 2026.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-printen-back-to-school/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/3d-printen-back-to-school/",
    },
  },
  openGraph: {
    title: "Back to School 2026: 3D printing for school",
    description:
      "Educational 3D printing for 2026: personalised supplies, pen holders and STEM models in PLA/PETG. Material and delivery tips.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Back to School 3D printing" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Back to School 2026: 3D printing for school",
    description: "Personalised school supplies and STEM models for 2026. PLA/PETG, matte colours and fast planning.",
    images: ["/images/og-home.jpg"],
  },
}

const tips = [
  "PLA Matte for clean text and safe edges; PETG for stronger organizers.",
  "Use rounded corners and at least 0.6 mm text depth for readability.",
  "Integrate TPU anti-slip feet or pockets for rubber pads.",
  "Layer height 0.16-0.24 mm for a neat look without excessive print time.",
  "Request class/name variants in one go; we batch for consistent colour and finish.",
]

const checklist = [
  "Use: pen holder, nameplate, desk organizer or STEM model.",
  "Material: PLA Matte (look), PETG (strength), TPU (grip). Colour? Share HEX/RGB or school colour.",
  "Finish: raw or lightly sanded; primer optional if you paint.",
  "Deadline: August-September 2026 (back-to-school) + delivery option (EV zone or parcel service).",
  "File: STL/STEP. Need design? Design service €45/hour.",
]

const faqItems = [
  {
    q: "Which materials do you recommend for school items?",
    a: "PLA Matte for clean text and soft feel, PETG for stronger organizers. TPU for anti-slip pads or clips. Always with rounded edges.",
  },
  {
    q: "Can we do multiple names in one batch?",
    a: "Yes. Provide a list or adjust STL/STEP per name; we batch prints so colour and finish stay consistent.",
  },
  {
    q: "How fast can you deliver around August-September 2026?",
    a: "Usually within a few business days. Mention your deadline; we plan realistically without fixed promises.",
  },
  {
    q: "Is the 3D model included?",
    a: "No. Provide STL/STEP or choose design service (€45/hour). We check wall thickness, rounding and readability.",
  },
]

const inspirationImages = [
  { src: "/images/portfolio/back2school%20(1).webp", alt: "Back to School set with pen holder and nameplate" },
  { src: "/images/portfolio/back2school%20(2).webp", alt: "Personalised desk organizer for school" },
  { src: "/images/portfolio/back2school%20(3).webp", alt: "Back to School kit with label and holder" },
]

const videos = [
  { id: "JRWyFUfqUlM", title: "Funko dude custom", description: "Personalised desk figure that doubles as a buddy." },
  { id: "yEN9ZY75pDg", title: "Pencil holder on request", description: "Custom pen holder in PLA Matte." },
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
  headline: "Back to School 2026: 3D printing for school",
  description: metadata.description ?? "",
  datePublished: datePublished,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home.jpg",
  inLanguage: "en-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  items: faqItems,
})


export default function BlogBackToSchoolEn() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-50 via-white to-amber-50" />
      </div>

      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Back to School 2026: 3D printing
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Pen holders, nameplates, desk organizers and educational STEM models. Design file not included; provide STL/STEP or choose design service
              (€45/hour). Fast planning for August-September 2026.
            </p>
            <p className="mt-3 max-w-3xl text-pretty text-base text-slate-700">
              Tie your brief to internal resources: see the{" "}
              <Link href="/en/segments/3d-printing-back-to-school" className="font-semibold text-lime-700 underline">
                Back to School segment
              </Link>{" "}
              for workflow and materials, or jump straight to the{" "}
              <Link href="/en/materials#material-suggestion-tool" className="font-semibold text-lime-700 underline">
                Material Suggestion Tool
              </Link>{" "}
              for a material recommendation. Externally you can grab inspiration on{" "}
              <Link href="https://www.printables.com" target="_blank" rel="noreferrer" className="font-semibold text-lime-700 underline">
                Printables
              </Link>{" "}
              and send references.
            </p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/en/contact?material=pla-matte">Plan school prints 2026</ShimmerButton>
              <Link
                href="/en/segments/3d-printing-back-to-school"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Go to Back to School segment
              </Link>
              <Link
                href="/en/pricing"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                View pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="en" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Tips for school prints</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.05}>
            <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Checklist for your request</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
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

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="overflow-hidden border border-white/40 bg-white/85 shadow-lg backdrop-blur">
              <div className="grid gap-4 p-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2">
                  {inspirationImages.map((image) => (
                    <div key={image.src} className="overflow-hidden rounded-2xl border border-slate-100 bg-white/60">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={420}
                        height={420}
                        className="h-full w-full object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 320px"
                      />
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Inspiration</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Keep edges rounded and add anti-slip where needed. Colour-match to school branding or keep it neutral matte.
                  </p>
                  <div className="mt-3 text-sm font-semibold text-indigo-600">
                    <Link href="/en/materials/pla-matte">See PLA Matte colours</Link>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Video</p>
              <h2 className="text-2xl font-semibold text-slate-900">Desk buddies and organisers</h2>
              <p className="text-sm text-slate-600">
                See personalised holders and nameplates. Send your model and class list; we batch for consistent colour and finish.
              </p>
            </div>
            <VideoGallery videos={videos} highlightIds={[]} />
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Next step</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need school prints scheduled?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share your STL/STEP, names and deadline. We will confirm materials, timing and delivery slots.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?material=pla-matte">Plan my school order</ShimmerButton>
                <Link href="/en/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  See pricing & lead times
                </Link>
              </div>
            </GlassCard>
          </Reveal>
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








