import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import VideoGallery from "@/components/VideoGallery"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd, buildFaqPageSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/3d-printen-valentijn/"
const ogImage = "https://www.x3dprints.be/images/og-home.jpg"
const publishedDate = "2024-01-25"
const dateModified = "2026-02-08"
const lastUpdatedLabel = "Last updated: 8 February 2026"

export const metadata: Metadata = {
  title: "3D printing Valentine gifts | X3DPrints Blog",
  description:
    "Heart decor, personalised gifts and light objects in Silk, Matte and Translucent PLA. Checklist for material, LEDs and delivery options. Design file not included.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-printen-valentijn/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/3d-printen-valentijn/",
    },
  },
  openGraph: {
    title: "3D printing Valentine gifts",
    description: "Choose Silk/Matte/Translucent PLA for Valentine gifts, nameplates and light objects. Tips for LEDs, magnets and delivery.",
    url: canonical,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "3D printed Valentine decor" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing Valentine gifts",
    description: "Silk/Matte/Translucent PLA for hearts, nameplates and gifts. Includes delivery and material checklist.",
    images: [ogImage],
  },
}

const tips = [
  "PLA Silk or Marble for shiny hearts and nameplates; Matte PLA for soft pastels.",
  "Translucent PLA (1.6-2 mm walls) for light objects with fairy lights; keep ventilation for LEDs.",
  "Integrate eyelets or pin-holes for magnets and make text at least 0.6 mm thick for legibility.",
  "Design/model not included: provide STL/STEP or choose design service at €45/hour.",
  "Delivery options: EV zones or parcel service. Fragile pieces are packed separately; pickup in Herzele is free. Bpost export possible for expat gifting or UK/EU partners.",
]

const checklist = [
  "Size + use (table piece, gift box, shop window, gadget).",
  "Material: Silk/Marble for luxe, Matte for soft look, Translucent for light.",
  "Finish: raw, lightly sanded or primed; note if you will paint.",
  "Mounting: ribbon, magnet or stand? Add holes or pin-holes.",
  "Deadline around 14 February + delivery option (EV zone or parcel service).",
]

const faqItems = [
  {
    q: "Do you also make the design?",
    a: "Optionally, yes. The 3D model is not included. Provide STL/STEP or choose design service at €45/hour; we tune wall thickness, text and supports.",
  },
  {
    q: "Which filament colours do you recommend?",
    a: "Silk red, gold or pearl for luxe gifts. Matte pastel for a soft look. Translucent for lanterns or glowing table decor.",
  },
  {
    q: "Can you do last-minute prints?",
    a: "Often yes, depending on quantity and finish. Mention your date and desired delivery; we plan realistically without overpromising.",
  },
  {
    q: "Are LEDs or magnets included?",
    a: "No. We do add pin-holes or cutouts so you can place them easily. Share the link or size of your LEDs/magnets.",
  },
]

const inspirationImages = [
  { src: "/images/portfolio/valentijn2.webp", alt: "3D printed Valentine duo decor" },
  { src: "/images/portfolio/valentijn3.webp", alt: "3D printed Valentine heart decor" },
  { src: "/images/portfolio/big%20valentijn%20boy%20articulated.webp", alt: "3D printed Valentine articulated figure" },
  { src: "/images/portfolio/vaas-capsule-planter-scaled.webp", alt: "Valentine vase idea" },
  { src: "/images/portfolio/vaas-spiral-2-3-scaled.webp", alt: "Valentine decor with spiral" },
]

const valentijnVideos = [
  {
    id: "js1994tDE18",
    title: "Valentine heart decor - PLA Silk",
    description: "Silk hearts with soft gradients and tips for wall thickness and eyelets.",
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
  headline: "3D printing Valentine gifts",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: ogImage,
  inLanguage: "en-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  items: faqItems,
})

export default function ValentinesBlogEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(140%_70%_at_50%_-10%,rgba(236,72,153,0.22),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal className="stacked-content">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href="/en/blog"
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-700">Valentine</li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printed Valentine gifts: materials and checklist
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Hearts, nameplates or glowing decor? Choose Silk/Marble/Matte for the right look, keep LEDs ventilated and add mounting holes for magnets or
              ribbons. Design files are not included by default.
            </p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href="/en/contact?material=PLA">Request Valentine prints</ShimmerButton>
              <Link
                href="/en/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Pick a PLA blend
              </Link>
              <Link
                href="/en/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Pricing & delivery
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Tips for Valentine prints</h2>
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
                    Mix Silk, Marble and translucent PLA for different moods. Want LEDs? Keep walls thick enough for glow but thin enough for light
                    diffusion.
                  </p>
                  <div className="mt-3 text-sm font-semibold text-indigo-600">
                    <Link href="/en/materials">See PLA colours</Link>
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
              <h2 className="text-2xl font-semibold text-slate-900">A quick look at Valentine prints</h2>
              <p className="text-sm text-slate-600">
                See Silk hearts and translucent decor in action. Share your model and we will pick the right blend.
              </p>
            </div>
            <VideoGallery videos={valentijnVideos} highlightIds={[]} />
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Next step</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need Valentine-ready prints?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share your STL/STEP, colours and deadline. We will confirm material, glow options and delivery slots.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?material=PLA">Plan my Valentine order</ShimmerButton>
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




