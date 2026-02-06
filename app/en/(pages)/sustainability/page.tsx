import type { Metadata } from "next"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import Faq from "@/components/Faq"
import { SITE, buildLocalBusinessSchema } from "@/lib/seo"

type Stat = { label: string; value: string; detail: string }
type PillarLink = { href: string; label: string; external?: boolean }
type Pillar = { title: string; copy: string; icon: "material" | "energy" | "loop"; links: PillarLink[] }

export const metadata: Metadata = {
  title: "FuturePrint Lab | Sustainability & circularity | X3DPrints",
  description:
    "Sustainable 3D printing from Herzele. X3DPrints focuses on smart design, efficient material choices and local delivery for entrepreneurs, schools and associations in East Flanders.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/sustainability/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/sustainability/",
      en: "https://www.x3dprints.be/en/sustainability/",
      "x-default": "https://www.x3dprints.be/sustainability/",
    },
  },
  openGraph: {
    title: "Sustainable 3D printing at X3DPrints",
    description:
      "Discover how X3DPrints, a local 3D printing studio in Herzele, focuses on efficient production, long lifespan and smart material choices.",
    url: "https://www.x3dprints.be/en/sustainability/",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "FuturePrint Lab | Sustainability & circularity",
    description: "How X3DPrints builds practical, conscious 3D printing for small batches and prototypes.",
  },
}

const stats: Stat[] = [
  {
    label: "Local production",
    value: "Herzele (BE)",
    detail:
      "One maker, short lines and direct communication. Ideal for SMEs, schools and associations in East Flanders and the Ghent/Aalst region.",
  },
  {
    label: "On-demand printing",
    value: "No stock",
    detail: "We only print when there's a project. This avoids overproduction, unused inventory and unnecessary costs.",
  },
  {
    label: "Targeted material choice",
    value: "PLA / PETG / TPU",
    detail: "Per application we pick the material that lasts longest and actually serves the part's purpose.",
  },
  {
    label: "Transparent approach",
    value: "1-to-1",
    detail: "Direct contact with the person who checks, optimises and prints your model.",
  },
]

const pillars: Pillar[] = [
  {
    title: "Smart design, less waste",
    copy:
      "Every print starts with the model. We review wall thickness, infill and orientation so you need less material and parts last longer. 3D printing becomes a deliberate solution instead of a gimmick.",
    icon: "material",
    links: [
      { href: "/en/materials", label: "See materials and guidelines" },
      { href: "/en/viewer", label: "Check your 3D model in the viewer" },
    ],
  },
  {
    title: "Efficient small-batch production",
    copy:
      "X3DPrints is not a mass factory but a compact workspace where small runs and prototypes are carefully planned. Where possible, prints are bundled per material and colour to limit changeovers and purge cycles.",
    icon: "energy",
    links: [
      { href: "/en/pricing", label: "How pricing is built" },
      { href: "/en/segments/3d-printing-prototypes", label: "More on prototyping" },
    ],
  },
  {
    title: "Practical and local logistics",
    copy:
      "Pickup by appointment in Herzele. For Ghent and surrounding towns we combine deliveries with existing routes. Beyond that we use compact parcel services.",
    icon: "loop",
    links: [
      { href: "/en/locaties", label: "Delivery and regions" },
      { href: "/en/contact", label: "Discuss a project" },
    ],
  },
]

const roadmap = [
  {
    title: "Design intake",
    detail:
      "You send your STL or STEP with a short description of the use case. Together we decide what matters: strength, show surface, dimensional accuracy or mainly look-and-feel.",
    evidence: "Outcome: fewer test prints and a design that fits real-world use.",
  },
  {
    title: "Production",
    detail:
      "Print settings are tuned to your goal: from fast proofs of concept to showpieces for events. We prefer functional and reliable over unnecessary complexity.",
    evidence: "Outcome: realistic lead times and as few failed prints as possible.",
  },
  {
    title: "Finishing and packing",
    detail:
      "Supports are removed, sharp edges lightly cleaned up and parcels are packed compactly with reusable or recyclable material.",
    evidence: "Outcome: parts that are ready to use and no boxes full of air.",
  },
  {
    title: "Longer lifespan",
    detail:
      "We think about spare parts, modular design and how you can reorder easily later. Sustainability here means: make the same part last longer.",
    evidence: "Outcome: less waste, more reuse and easier maintenance.",
  },
]

const faqItems = [
  {
    q: "How is 3D printing at X3DPrints more sustainable than classic production?",
    a:
      "You only make what you need, in the quantities you actually use. No large minimum orders, moulds or stock. Paired with the right material choice and local delivery you avoid unnecessary production and transport.",
  },
  {
    q: "Can I pick a more sustainable material option?",
    a:
      "Yes. PLA is a solid choice for indoor, decorative or lightly loaded parts. For parts that live outdoors or take more abuse we usually recommend PETG or TPU. We decide per project what makes the most sense.",
  },
  {
    q: "What happens to failed prints or test pieces?",
    a:
      "We try to avoid failed prints by checking the model and tuning settings. Offcuts are stored per material and reused for tests, fit models or R&D where possible.",
  },
  {
    q: "Can you help make my design more efficient?",
    a:
      "Absolutely. We review wall thicknesses, infill, cavities and reinforcements. Often a design can be lighter, faster to print and still strong enough. That saves material, time and cost.",
  },
  {
    q: "Do you work with schools and associations?",
    a:
      "Yes. We regularly support schools, makerspaces and associations with limited budgets. We think along about cost per part, feasibility and how one design can serve multiple purposes.",
  },
]

const pageUrl = `${SITE.url}/en/sustainability`

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",

    headline: "FuturePrint Lab: sustainability at X3DPrints",
  description:
  "Overview of X3DPrints' practical sustainability principles: smart design, efficient material choices, local production and tailored small batches.",
  author: { "@type": "Organization", name: "X3DPrints", url: SITE.url },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    logo: { "@type": "ImageObject", url: `${SITE.url}/og-x3dprints.jpg` },
  },
  datePublished: "2024-12-01",
  dateModified: "2026-02-06",
  mainEntityOfPage: pageUrl,
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

function PillarIcon({ type }: { type: "material" | "energy" | "loop" }) {
  if (type === "material") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden className="h-12 w-12 text-emerald-500">
        <rect x="6" y="8" width="36" height="32" rx="8" fill="currentColor" opacity={0.15} />
        <path
          d="M14 20h20M14 28h12M28 28h6M14 36h8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (type === "energy") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden className="h-12 w-12 text-cyan-500">
        <circle cx="24" cy="24" r="18" fill="currentColor" opacity={0.15} />
        <path
          d="M26 10l-8 14h9l-3 14 12-18h-8l4-10h-6z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden className="h-12 w-12 text-indigo-500">
      <circle cx="24" cy="24" r="18" fill="currentColor" opacity={0.15} />
      <path
        d="M18 16c0-3 2-5 6-5s6 2 6 5c0 5-6 5-6 10m0 0v3m0 2.5v.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function SustainabilityPage() {
  const localBusinessJsonLd = buildLocalBusinessSchema({
    pageUrl,
    description: metadata.description ?? "",
    areaServed: "BE",
  })

  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-10%] -z-10 h-[360px] bg-[radial-gradient(110%_80%_at_50%_0%,rgba(52,211,153,.12),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.06]" />

      <section className="px-6 pb-14 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">FuturePrint Lab</p>
              <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Sustainability in practice, for real projects.
              </h1>
              <p className="text-lg text-slate-700">
                Small-batch 3D printing that favours smart design, efficient runs and local delivery. Less waste, more longevity - for SMEs, schools and associations.
              </p>
              <div className="flex flex-wrap gap-3">
                <ShimmerButton href="/en/contact">Plan a project</ShimmerButton>
                <Link
                  href="/en/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Pricing & approach
                </Link>
                <Link
                  href="/en/blog/3d-printen-in-de-buurt"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Read: 3D printing nearby
                </Link>
              </div>
            </div>

            <GlassCard className="border-white/50 bg-gradient-to-br from-white/80 to-white/50 p-6 shadow-lg ring-1 ring-white/60">
              <div className="grid gap-3 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-slate-200/60 bg-white/80 p-4 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-600">{stat.label}</div>
                    <div className="mt-1 text-lg font-bold text-slate-900">{stat.value}</div>
                    <p className="mt-1 text-sm text-slate-600">{stat.detail}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">The three pillars</h2>
          <p className="mt-2 text-slate-600">
            Sustainability here means fewer wasted prints, realistic planning and a longer life for the parts you actually need.
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <GlassCard key={pillar.title} className="h-full p-5">
                <div className="mb-3">
                  <PillarIcon type={pillar.icon} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{pillar.copy}</p>
                <div className="mt-3 grid gap-2 text-sm text-emerald-700">
                  {pillar.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                      className="inline-flex items-center gap-2 font-semibold hover:text-emerald-500"
                    >
                  {link.label} <span aria-hidden>-&gt;</span>
                    </Link>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <GlassCard className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Roadmap</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">From idea to durable result</h2>
              <p className="mt-3 text-sm text-slate-600">
                We keep things practical: make only what is needed, ship locally and document settings so reorders stay consistent.
              </p>
              <div className="mt-4 space-y-3">
                {roadmap.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                    <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                    <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.evidence}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="space-y-4">
              <GlassCard className="p-5">
                <h3 className="text-lg font-semibold text-slate-900">Why local matters</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Working locally makes feedback loops faster, reduces transport and keeps commitments realistic.
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>- Shorter delivery routes and flexible pickup slots.</li>
                  <li>- Direct contact with the maker - no ticket queues.</li>
                  <li>- Planning that adapts to your sprint or event calendar.</li>
                </ul>
              </GlassCard>
              <GlassCard className="p-5">
                <h3 className="text-lg font-semibold text-slate-900">Who benefits?</h3>
                <p className="mt-2 text-sm text-slate-600">
                  This approach suits anyone who needs fast, purposeful runs without building their own print farm:
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>- SMEs needing a prototype, jig or custom part.</li>
                  <li>- Schools and training centres wanting tangible materials without excess stock.</li>
                  <li>- Associations and events needing limited but impactful quantities.</li>
                </ul>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-5xl rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">Example case</p>
            <h2 className="mt-3 text-2xl font-semibold">Small batch for a local event</h2>
            <p className="mt-3 text-sm text-slate-200">
              Think badges for an association, small props for a booth or a series of test parts for a school project. Getting everything ready on time matters more than pumping out thousands of units.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>- First a single test print to check shape, legibility and size.</li>
              <li>- Then a small batch tuned to the event or project (e.g. 8, 20 or 50 pieces).</li>
              <li>- Material and colour chosen together so it fits the branding or theme.</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/5 p-6">
            <p className="text-sm font-semibold text-emerald-300">What to expect</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              <li>- Honest feedback on whether 3D printing makes sense or another approach is better.</li>
              <li>- Transparent pricing that separates design, test print and production run.</li>
              <li>- Realistic planning: we align when you need the parts and how we can make that workable.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/en/contact">Start your project</ShimmerButton>
              <Link
                href="/en/segments/3d-printing-marketing"
                className="inline-flex items-center gap-2 text-sm text-emerald-300 hover:text-white"
              >
                3D printing for marketing & events <span aria-hidden>-&gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-4xl">
        <Faq title="FAQ on sustainability" items={faqItems} />
      </section>

      <section className="mx-auto mt-16 max-w-5xl rounded-3xl border border-slate-200 bg-white/80 p-8 text-center shadow-md">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Move forward together</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">Have an idea that should last?</h2>
        <p className="mt-3 text-sm text-slate-600">
          We love thinking along about circular cases, education projects or simply a batch of parts that need to last longer. Reach out and we will schedule a call.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ShimmerButton href="/en/contact">Schedule a call</ShimmerButton>
          <Link
            href="/en/blog/3d-printen-in-de-buurt"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:-translate-y-0.5"
          >
            Read: 3D printing nearby
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
    </main>
  )
}

