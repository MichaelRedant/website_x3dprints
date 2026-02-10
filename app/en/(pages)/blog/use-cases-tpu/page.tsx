import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd } from "@/lib/seo"
import BlogContentOverview from "@/components/BlogContentOverview"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogFaq from "@/components/BlogFaq"
import { BLOG_FAQ_EN } from "@/content/blog-faq-en"

const canonical = "https://www.x3dprints.be/en/blog/use-cases-tpu/"
const publishedDate = "2025-10-03T08:00:00+02:00"
const dateModified = "2026-02-08"
const faq = BLOG_FAQ_EN["use-cases-tpu"]
const lastUpdatedLabel = "Last updated: 8 February 2026"

export const metadata: Metadata = {
  title: "TPU use cases: how clients deploy flexible prints | X3DPrints",
  description:
    "Real TPU 3D print examples: bumpers, grips, sleeves and dampers for retail, IoT and tooling. See how we design, plan and finish.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/use-cases-tpu/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/use-cases-tpu/",
    },
  },
  openGraph: {
    title: "How clients use TPU 3D prints",
    description:
      "Case studies for flexible TPU parts: protective housings, soft grips and dampers. Discover settings, planning and integrations.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["TPU 3D printing", "Use cases", "Filament Friday"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "TPU use cases by X3DPrints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Use cases: how clients deploy TPU",
    description: "Concrete TPU projects: from sensor sleeves to retail grips. See how we design, test and deliver flexible prints.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Sectors live", value: "5+", detail: "Retail, IoT, tooling, marketing and education" },
  { label: "Avg. lead time", value: "5-7 days", detail: "Including design review and drying" },
  { label: "Return reduction", value: "-32%", detail: "Less damage thanks to TPU bumpers" },
]

const caseStudies = [
  {
    title: "Sensor sleeves for an IoT scale-up",
    sector: "Industrial IoT",
    challenge: "PC-ABS covers broke during installation in HVAC units. The client needed a flexible sleeve to protect cables and stay on-brand.",
    approach: [
      "TPU 95A with a matte finish so debossed logos remain legible.",
      "Variable walls: 2.2 mm around the connector, 1.4 mm on the body for flex.",
      "Printed tie-wrap inserts so assembly runs 40% faster.",
    ],
    link: { label: "View TPU material sheet", href: "/en/materials/tpu" },
  },
  {
    title: "Soft-touch grips for field service tools",
    sector: "Machine maintenance",
    challenge: "Metal grips lacked traction and scratched surfaces. TPU had to be non-slip and oil resistant.",
    approach: [
      "TPU Soft (92A) with ribs repeating every 8 mm for consistent compression.",
      "Open end so the grip slides over existing handles, locked with two snap tabs.",
      "Accelerated ageing test (48h at 60 C) to check oil absorption.",
    ],
    link: { label: "Request a TPU prototype", href: "/en/contact?material=TPU" },
  },
  {
    title: "Retail props with TPU dampers",
    sector: "Retail and events",
    challenge: "Fragile displays broke during transport. Needed: dampers that protect hard PLA shells without ruining the look.",
    approach: [
      "Hybrid print: PLA Matte cover + TPU damper insert that snaps in place.",
      "Dampers only on impact zones to save material.",
      "AMS batch planning so all TPU parts are dried and printed in one run.",
    ],
    link: { label: "View marketing segment", href: "/en/segments/3d-printing-marketing" },
  },
]

const playbooks = [
  {
    sector: "Electronics and IoT",
    summary: "Sleeves, strain reliefs and cable glands that survive installation in tight enclosures.",
    bulletPoints: [
      "Use 95A for the holder + 90A inserts when compression matters.",
      "Integrate serial/QR codes in the print to speed up service flow.",
      "Test fit on the actual connector: print dummy shells in PLA for repetitive fit checks.",
    ],
  },
  {
    sector: "Tooling and production",
    summary: "Grips, bumpers and nest inserts that absorb impact around steel tools.",
    bulletPoints: [
      "Layer height 0.2 mm for grip parts, 0.16 mm for visible areas with labels.",
      "Add slots for zip-ties or bolts so TPU stays replaceable.",
      "Lightly coat contact faces with IPA for easier assembly.",
    ],
  },
  {
    sector: "Retail and marketing",
    summary: "Pop-up props, portable displays and giveaways with soft-touch feel.",
    bulletPoints: [
      "Combine TPU carriers with PLA/PETG covers for branding.",
      "Embed magnets or NFC tags during the print using pauses (M601).",
      "Use translucent TPU + LEDs to visualise impact during demos.",
    ],
  },
]

const resourceLinks = [
  { label: "TPU material sheet", href: "/en/materials/tpu", description: "Stock, colours and FAQ for flexible prints." },
  {
    label: "Material Suggestion Tool",
    href: "/en/materials#material-suggestion-tool",
    description: "Wizard comparing PLA, PETG and TPU based on your context.",
  },
  { label: "Pricing and calculator", href: "/en/pricing", description: "See the impact of slower prints and extra machine hours." },
  { label: "Viewer upload", href: "/en/viewer", description: "Upload STL/STEP, add photos and request feedback." },
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
  headline: "Use cases: how clients deploy TPU",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home.jpg",
  inLanguage: "en-BE",
})


function SectionDivider() {
  return (
    <div className="mx-auto my-10 flex w-full max-w-4xl items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
      <span>TPU use cases</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
    </div>
  )
}

export default function UseCasesTpuEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_90%_at_50%_-20%,rgba(79,70,229,0.2),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

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
                <li className="font-medium text-slate-700">Filament Friday</li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-900">TPU use cases</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Filament Friday bonus</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Use cases: how clients deploy TPU in practice.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              TPU sounds abstract until you see what it solves. This bonus edition bundles projects where flexible prints reduce damage, improve ergonomics
              or make marketing pop. You get concrete settings, planning tips and CTAs to check your own use case right away.
            </p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/contact?material=TPU">Schedule a TPU workshop</ShimmerButton>
              <Link
                href="/en/materials/tpu"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                View TPU sheet
              </Link>
              <Link
                href="/en/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Material Suggestion Tool
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Published 3 October 2025 - ties into Filament Friday #3 on TPU.</p>
          </Reveal>
          <div className="mt-10 grid gap-4 rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BlogContentOverview locale="en" />

      <SectionDivider />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Why TPU casework pays off</h2>
              <p className="mt-3 text-sm text-slate-600">
                Flexible prints absorb impact, keep cables in place and add grip where metal or PLA fall short. They shine when a part is handled often or
                needs to take shocks.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Unlike silicone molds or rubber injection you do not need expensive tooling. You can iterate TPU during a campaign or launch.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Feel free to combine TPU with other filaments: a PLA or PETG shell for looks, a TPU insert for function. That is exactly how we build most
                retail and IoT projects.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Checklist before you start</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>Plan 0.6-1 mm clearance for parts snapping into PLA/PETG shells.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>Note where grip or damping matters more than looks. That drives shore hardness.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>Add photos of the final product. We position ribs or relief exactly on impact zones.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>Plan batches: bundle TPU parts so we run one drying cycle and AMS profile.</span>
                </li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Case studies</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {caseStudies.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.sector}</p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold text-slate-900">Challenge</p>
                    <p className="text-sm text-slate-600">{item.challenge}</p>
                    <p className="mt-3 text-sm font-semibold text-slate-900">Approach</p>
                    <ul className="mt-1 space-y-1.5 text-sm text-slate-600">
                      {item.approach.map((approach) => (
                        <li key={approach} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                          <span>{approach}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={item.link.href}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                    >
                      {item.link.label}
                      <span aria-hidden>-&gt;</span>
                    </Link>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
          {playbooks.map((playbook) => (
            <Reveal key={playbook.sector}>
              <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{playbook.sector}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{playbook.summary}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {playbook.bulletPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionDivider />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Workflow for TPU jobs</h2>
              <ol className="mt-4 space-y-3 text-sm text-slate-600">
                <li>
                  <span className="font-semibold text-slate-900">1. Intake and suggestion</span> - Use the{" "}
                  <Link href="/en/materials#material-suggestion-tool" className="text-indigo-600 underline underline-offset-4">
                    Material Suggestion Tool
                  </Link>{" "}
                  and add extra context in the form. We immediately check if TPU is the right choice.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">2. Mini prototype</span> - We print a small to large batch (1-3 pieces) so you can test fit and
                  ergonomics. Feedback follows within 48 hours.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">3. Batch production</span> - We group jobs per colour/shore. Drying time, print and QA
                  run in the same slot so lead time stays predictable.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">4. Implementation and aftercare</span> - We share assembly notes (e.g. ideal tension for
                  zip-ties) and keep spares ready in case you need to scale.
                </li>
              </ol>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Internal resources</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {resourceLinks.map((resource) => (
                  <div key={resource.href} className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{resource.label}</p>
                    <p className="mt-2 text-sm text-slate-600">{resource.description}</p>
                    <Link
                      href={resource.href}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                    >
                      Go to {resource.label}
                      <span aria-hidden>-&gt;</span>
                    </Link>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Test your TPU idea without risk.</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share files, photos or even a voice memo. We will give honest advice on whether TPU is right and which blend fits best.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?material=TPU">Start TPU intake</ShimmerButton>
                <Link href="/en/blog/filament-vrijdag-tpu" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Read Filament Friday #3
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
                <cite className="not-italic"><a href={ref.href} target="_blank" rel="noreferrer" className="text-base font-semibold text-indigo-600">
                  {ref.label}
                </a></cite>
                <p className="mt-1 text-sm text-slate-600">{ref.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BlogFaq title={faq.title} items={faq.items} inLanguage="en-BE" mainEntityOfPage={canonical} />


      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogAuthorNote locale="en" />

    </main>
  )
}




