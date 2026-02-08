import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import { buildFaqPageSchema, buildArticleJsonLd } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/3d-printen-herfst-halloween/"
const datePublished = "2025-09-15"
const dateModified = "2026-02-08"
const lastUpdatedLabel = "Last updated: 8 February 2026"


export const metadata: Metadata = {
  title: "3D printing for autumn and Halloween | X3DPrints Blog",
  description:
    "Pumpkins, haunted props and mood lanterns in Silk, Marble and Translucent PLA. Tips for supports, light diffusion, delivery and design service (model not included).",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-printen-herfst-halloween/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/3d-printen-herfst-halloween/",
    },
  },
  openGraph: {
    title: "3D printing for autumn and Halloween",
    description: "Make pumpkins, spooky props and lanterns in Silk/Marble/Translucent PLA. Materials, slicer tips, delivery zones and design service.",
    url: canonical,
    type: "article",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D printed Halloween decor" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing for autumn and Halloween",
    description: "Pumpkins, haunted props and lanterns. Choose Silk/Marble/Translucent PLA and plan delivery in time.",
    images: ["/images/og-home.jpg"],
  },
}

const tips = [
  "Use PLA Silk or Marble for pumpkins and statues; Translucent for lanterns with LEDs or fairy lights.",
  "Layer height 0.16-0.2 mm; keep wall thickness >1.2 mm for sturdy decor to hang or place.",
  "Orient visible faces upward and keep the bottom flat for stable placement.",
  "Integrate cable holes or magnets for LED strips or battery packs and ensure ventilation for warmer LEDs.",
  "Design/model not included: provide STL/STEP or choose design service at ï¿½45/hour.",
]

const checklist = [
  "Size + whether it must be hollow (for LEDs/batteries).",
  "Material choice: Silk/Marble for looks, Translucent for light, PETG for outdoor.",
  "Finish: raw, lightly sanded or primed. Ask primer if you will paint.",
  "Delivery: EV zones or parcel; pickup is possible. Add your deadline.",
]

const faqItems = [
  {
    q: "Can you print pumpkins hollow?",
    a: "Yes. We use 2-3 perimeters, tuned infill and openings for LEDs/batteries. Provide STL/STEP or let us design at ï¿½45/hour.",
  },
  {
    q: "What is the best material for spooky props?",
    a: "Silk/Marble PLA for glossy pumpkins and statues. Translucent PLA for lanterns. PETG for outdoor use.",
  },
  {
    q: "How do you ship fragile decor safely?",
    a: "Packed separately with foam; EV delivery in zones (Zone 1 ï¿½15, Zone 2 ï¿½30, Zone 3 ï¿½45) or parcel service. Pickup is free.",
  },
  {
    q: "Is the 3D model included?",
    a: "No. The design file is not included in the print price. Provide STL/STEP or choose design service at ï¿½45/hour; we optimise wall thickness and supports.",
  },
  {
    q: "Can you prime or deliver paint-ready?",
    a: "Yes, light sanding and grey primer are possible. Mention it in your request.",
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
  headline: "3D printing for autumn & Halloween",
  description: metadata.description ?? "",
  datePublished: datePublished,
  dateModified,
  image: ["https://www.x3dprints.be/images/og-home.jpg"],
  inLanguage: "en-BE",
})


const faqJsonLd = buildFaqPageSchema({
  inLanguage: "en-BE",
  items: faqItems,
})

const inspirationImages = [
  { src: "/images/portfolio/halloween1.webp", alt: "3D printed Halloween decor set 1" },
  { src: "/images/portfolio/Halloween2.webp", alt: "3D printed Halloween decor set 2" },
  { src: "/images/portfolio/Halloween3.webp", alt: "3D printed Halloween decor set 3" },
  { src: "/images/portfolio/Halloween4.webp", alt: "3D printed Halloween decor set 4" },
  { src: "/images/portfolio/Halloween5.webp", alt: "3D printed Halloween decor set 5" },
  { src: "/images/portfolio/Halloween6.webp", alt: "3D printed Halloween decor set 6" },
]

export default function BlogAutumnHalloweenEn() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50" />
      </div>

      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              3D printing for autumn and Halloween
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Pumpkins, spooky props and lanterns for cosy nights. Design file not included; provide STL/STEP or choose design service (ï¿½45/hour). EV
              delivery for fragile decor or parcel service elsewhere.
            </p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/en/contact?material=PLA">Plan Halloween prints</ShimmerButton>
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
                    <span className="mt-1 h-2 w-2 rounded-full bg-orange-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Keep light channels clear for LEDs, reinforce loops for hanging, and avoid dark PLA in direct sun if decor goes outdoorsï¿½use PETG instead.
                We can split larger pieces into modules for safer shipping and assembly.
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
                Extra: add TPU anti-slip pads to keep decor stable on smooth surfaces. Want branding or names? Provide emboss in your STL/STEP or request
                design service.
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need Halloween prints?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Send your STL/STEP, light plan and deadline. We will confirm materials, reinforcement and delivery slots.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?material=PLA">Plan my Halloween order</ShimmerButton>
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
          <h2 className="text-2xl font-semibold text-slate-900">Sources and references</h2>
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
      <BlogReadMore />
    </main>
  )
}






