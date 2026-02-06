import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import GlassCard from "@/components/GlassCard"
import OrganizerCta from "@/components/OrganizerCta"
import Faq from "@/components/Faq"

const canonical = "https://www.x3dprints.be/en/blog/gridfinity-modular-storage-system/"
const publishedDate = "2026-01-30T08:00:00+01:00"

const GRID_IMAGES = [
  { src: "/images/organizers/modugrid/ModuGrid1.jpg", alt: "Gridfinity drawer overview (top view)", width: 1600, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid2.jpg", alt: "Gridfinity drawer with screws and bits", width: 1600, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid3.webp", alt: "Gridfinity bins with labels and anti-slip", width: 1600, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid4.webp", alt: "Gridfinity bins for desk tools", width: 1600, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid5.webp", alt: "Gridfinity detail with label edge", width: 1600, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid6.webp", alt: "Gridfinity insert with anti-slip", width: 1600, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid7.webp", alt: "Gridfinity drawer in daily use", width: 1600, height: 900 },
  { src: "/images/organizers/modugrid/ModuGrid8.webp", alt: "Custom Gridfinity pocket for multimeter", width: 1600, height: 900 },
]

const FAQ_ITEMS = [
  {
    q: "Do I need STL files to order Gridfinity?",
    a: "No. Send a photo + inner dimensions of your drawer or case and what should fit. We design the right bins and deliver plug-and-play.",
  },
  {
    q: "Which magnets fit Gridfinity?",
    a: "Standard 6×2 mm magnets in each corner. For heavy duty we can add M3 screws to lock baseplates or bins.",
  },
  {
    q: "Which material should I choose?",
    a: "PLA Matte for desks/drawers; PETG for transport or warmer environments. Optional anti-slip base and in-print labels.",
  },
  {
    q: "Can you make a custom bin for one tool?",
    a: "Yes. Send a top-down photo, L×W×H (or diameter × height), desired orientation and quantity. We model a pocket, share a preview and adjust until it fits.",
  },
  {
    q: "Does Gridfinity work inside Packout cases?",
    a: "Yes. We make baseplates to the case footprint while keeping the 42 mm grid, so all bins stay compatible with your setup.",
  },
  {
    q: "How fast do you ship?",
    a: "Typically a few working days after intake, depending on bin count and material. Share photo + dimensions + target U height for the quickest flow.",
  },
]

export const metadata: Metadata = {
  title: "Gridfinity: modular storage, custom-fit by X3DPrints",
  description:
    "Gridfinity explained: 42×42 grid, 7 mm units, magnets, labels, use cases and how X3DPrints designs custom bins and Packout-ready inlays.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/gridfinity-modulair-opslagsysteem/",
      en: canonical,
      "x-default": "https://www.x3dprints.be/blog/gridfinity-modulair-opslagsysteem/",
    },
  },
  openGraph: {
    title: "Gridfinity: modular storage | X3DPrints",
    description:
      "What Gridfinity is, why it works and how X3DPrints delivers custom bins, starter kits and Packout inlays.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["gridfinity", "tool organizer", "packout inlay", "custom bins"],
    images: [{ url: "/images/organizers/modugrid/ModuGrid3.webp", width: 1200, height: 630, alt: "Gridfinity bins made to fit" }],
  },
  twitter: { card: "summary_large_image" },
}

export default function GridfinityBlogEn() {
  return (
    <main className="px-6 pb-16 sm:px-8 lg:px-12">
      <article className="mx-auto max-w-4xl space-y-12">
        <header className="space-y-4 pt-10 sm:pt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">Gridfinity · guide</p>
          <h1 className="text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Gridfinity: the modular storage system transforming workshops and teams
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-200">
            Why the 42×42×7 mm grid wins, and how X3DPrints designs custom bins, starter kits and Packout-ready inlays so you buy calm and time—not plastic.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            <span>Last update: 30 January 2026</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-cyan-100">
              Gridfinity explained
            </span>
          </div>
        </header>

        <section className="space-y-3 text-slate-700 dark:text-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What is Gridfinity?</h2>
          <p>
            Gridfinity uses a standardized 42 × 42 mm grid and 7‑mm height units. Bins snap per grid cell and stack per U. Magnet pockets for 6×2‑mm magnets keep trays planted; M3 screws add lock-down if needed. Label edges (e.g. 9‑mm tape) keep layouts readable. PLA or PETG deliver crisp, strong prints.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Cross-compatible designs between makers and printers.</li>
            <li>Custom to the millimetre: every tool gets its own pocket.</li>
            <li>Scales from one drawer to a full wall or Packout case.</li>
          </ul>
        </section>

        <section className="space-y-3 text-slate-700 dark:text-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Why the hype?</h2>
          <ol className="list-decimal space-y-2 pl-5">
            <li><strong>Modular perfection:</strong> the 42‑mm grid keeps baseplates and bins compatible.</li>
            <li><strong>Personalizable:</strong> any tool can get an exact-fit bin.</li>
            <li><strong>Scalable:</strong> start small, grow without breaking standards.</li>
          </ol>
          <p>Great for hobbyists, electricians, woodworkers, model makers and industrial flows.</p>
        </section>

        <section className="space-y-4 text-slate-700 dark:text-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Technical core</h2>
          <GlassCard className="space-y-2">
            <p><strong>Grid & sizes:</strong> 42×42 mm, 7‑mm U; nominal bin width 41.5 mm for smooth fit.</p>
            <p><strong>Magnets:</strong> 6×2‑mm magnet pockets in corners; M3 screws optional for transport.</p>
            <p><strong>Labels:</strong> label edge fits 9‑mm tape for fast identification.</p>
            <p><strong>Materials:</strong> PLA Matte for desks/drawers; PETG for transport or warmer settings.</p>
            <p>
              <strong>Generators:</strong> web tools (GridfinityCreator, Perplexing Labs) and parametric libs (Build123d, CadQuery, OpenSCAD) create custom bins in minutes.
            </p>
          </GlassCard>
        </section>

        <section className="space-y-3 text-slate-700 dark:text-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Applications</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>Hobby & makerspaces:</strong> printer accessories, bits, electronics, minis.</li>
            <li><strong>Professional:</strong> warehouses, service vans, production lines, electrical parts.</li>
            <li><strong>Home:</strong> make-up, office supplies, sewing gear, kitchen drawers.</li>
          </ul>
          <p>
            Integrations with case systems (Milwaukee Packout, DeWALT ToughSystem, Stanley TSTAK) are booming: print baseplates that fit the case and keep the 42‑mm grid. We make Packout-compatible Gridfinity inlays that respect your tray height units.
          </p>
        </section>

        <section className="space-y-3 text-slate-700 dark:text-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Challenges & fixes</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>Hygiene:</strong> porous for food use; perfect for tools and parts.</li>
            <li><strong>Dead space:</strong> use half-pitch bins or custom baseplates sized to your drawer.</li>
            <li><strong>Stability:</strong> magnets + anti-slip + M3 for vertical cases or transport.</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {GRID_IMAGES.slice(0, 3).map((img) => (
              <div key={img.src} className="overflow-hidden rounded-2xl border border-white/60 shadow ring-1 ring-white/60 dark:border-slate-800 dark:ring-0">
                <Image src={img.src} alt={img.alt} width={img.width} height={img.height} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {GRID_IMAGES.slice(3, 6).map((img) => (
              <div key={img.src} className="overflow-hidden rounded-2xl border border-white/60 shadow ring-1 ring-white/60 dark:border-slate-800 dark:ring-0">
                <Image src={img.src} alt={img.alt} width={img.width} height={img.height} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            A quick look at label-ready bins, anti-slip bases and custom pockets for meters, hobby gear and workshop tools.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {GRID_IMAGES.slice(0, 4).map((img) => (
              <div key={img.src} className="overflow-hidden rounded-2xl border border-white/60 shadow ring-1 ring-white/60 dark:border-slate-800 dark:ring-0">
                <Image src={img.src} alt={img.alt} width={img.width} height={img.height} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            A quick look at label-ready bins, anti-slip bases and custom pockets for meters, hobby gear and workshop tools.
          </p>
        </section>

        <section className="space-y-3 text-slate-700 dark:text-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Why X3DPrints?</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Starter kits to begin without printing yourself.</li>
            <li>Sector-specific sets (electricians, makers, industry).</li>
            <li>Packout-compatible inlays, made-to-fit.</li>
            <li>Custom bins from your tool photo + dimensions + preferred orientation.</li>
            <li>Fully fitted drawers that bring calm and speed.</li>
          </ul>
          <p>
            We design and print from Herzele (<Link href="https://www.herzele.be" target="_blank" rel="noreferrer" className="text-indigo-700 underline">herzele.be</Link>) and deliver across Belgium.
          </p>
        </section>

        <section className="space-y-4">
          <GlassCard className="space-y-3 text-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ready for a calm drawer or case?</h3>
            <p className="text-sm text-slate-700 dark:text-slate-200">
              Pick a starter kit or request a custom Gridfinity pocket. One intake, one fixed layout.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/en/organizers/modugrid"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5 hover:brightness-110"
              >
                See Gridfinity options
              </Link>
              <Link
                href="/en/contact?material=modugrid"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-900 dark:border-slate-700 dark:text-slate-100"
              >
                Start an intake
              </Link>
            </div>
          </GlassCard>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Next step</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <GlassCard className="space-y-2">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Request a custom Gridfinity bin</p>
              <p className="text-sm text-slate-700 dark:text-slate-200">Photo + inner dimensions + target height (U) and label/anti-slip option.</p>
              <Link href="/en/contact?material=modugrid" className="text-sm font-semibold text-cyan-700 underline hover:text-cyan-900">
                Contact with prefill
              </Link>
            </GlassCard>
            <GlassCard className="space-y-2">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">See our Gridfinity work</p>
              <p className="text-sm text-slate-700 dark:text-slate-200">Check the organizers hub and pick bundles or a custom intake.</p>
              <Link href="/en/organizers/modugrid" className="text-sm font-semibold text-cyan-700 underline hover:text-cyan-900">
                Go to Gridfinity page
              </Link>
            </GlassCard>
          </div>
          <OrganizerCta locale="en" />

          <div className="mt-8">
            <Faq items={FAQ_ITEMS} title="Gridfinity FAQ" />
          </div>
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Gridfinity: modular storage system",
            description:
              "Gridfinity explained: grid, magnets, labels, applications and how X3DPrints delivers custom bins, starter kits and Packout inlays.",
            datePublished: publishedDate,
            dateModified: publishedDate,
            author: { "@type": "Person", name: "X3DPrints" },
            publisher: {
              "@type": "Organization",
              name: "X3DPrints",
              logo: { "@type": "ImageObject", url: "https://www.x3dprints.be/og-home.jpg" },
            },
            mainEntityOfPage: canonical,
            image: "https://www.x3dprints.be/images/organizers/modugrid/ModuGrid3.webp",
            mainEntity: {
              "@type": "FAQPage",
              mainEntity: FAQ_ITEMS.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          }),
        }}
      />
    </main>
  )
}
