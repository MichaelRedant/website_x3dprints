import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import { buildFaqPageSchema } from "@/lib/seo"

const slug = "selectieve-val-aziatische-hoornaar-sint-lievens-houtem"
const canonical = `https://www.x3dprints.be/en/cases/${slug}/`
const nlCanonical = `https://www.x3dprints.be/cases/${slug}`
const publishedDate = "2026-02-01T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Case Study: Selective Trap for Asian Hornet | X3DPrints",
  description:
    "How #9520KLIMAAT and X3DPrints deploy selective 3D printed traps to slow down the Asian hornet in Sint-Lievens-Houtem.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": nlCanonical,
      "en-BE": canonical,
      "x-default": nlCanonical,
    },
  },
  openGraph: {
    title: "Case Study: Selective Trap for Asian Hornet",
    description:
      "Local impact with 3D printing: selective traps, clear instructions, follow-up and scalable production for Sint-Lievens-Houtem.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    modifiedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["case study", "selective trap", "Asian hornet", "3D printing", "Sint-Lievens-Houtem"],
    locale: "en_BE",
    siteName: "X3DPrints",
    images: [
      {
        url: "/images/og-cases-en.svg",
        width: 1200,
        height: 630,
        alt: "Case Study - Selective trap against Asian hornet by X3DPrints",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Study: Selective Trap for Asian Hornet",
    description: "Local impact with 3D printing: from design to scalable production and communication.",
    images: ["/images/og-cases-en.svg"],
  },
}

const heroStats = [
  { label: "Audience", value: "Residents 9520", detail: "Accessible action at EUR 4 per trap" },
  { label: "Focus window", value: "Early spring", detail: "Catching queens = fewer nests" },
  { label: "Approach", value: "Selective design", detail: "Target species in, bycatch escapes" },
]

const externalLinks = [
  { label: "#9520KLIMAAT (Facebook)", href: "https://www.facebook.com/9520KLIMAAT" },
  { label: "Municipality of Sint-Lievens-Houtem", href: "https://www.sint-lievens-houtem.be/" },
  {
    label: "Action page: selective trap",
    href: "https://www.sint-lievens-houtem.be/nieuws/koop-een-selectieve-val-voor-de-aziatische-hoornaar",
  },
  {
    label: "Info on wasps/bees/hornets",
    href: "https://www.sint-lievens-houtem.be/wespen-bijen-hommels-en-hoornaars",
  },
]

const internalLinks = [
  { label: "3D printing pillar", href: "/en/3d-printen", desc: "Workflow, quality guardrails and outdoor planning." },
  { label: "Materials: PETG", href: "/en/materials/petg", desc: "Why PETG/PC is right for outdoor parts." },
  { label: "Pricing & calculator", href: "/en/pricing", desc: "Realistic cost per batch and lead time." },
  { label: "Viewer upload", href: "/en/viewer", desc: "Send STL/STEP for similar community projects." },
  { label: "Contact", href: "/en/contact?topic=case-selective-trap", desc: "For associations, councils and local groups." },
]

const faqItems = [
  {
    question: "What makes this a selective hornet trap?",
    answer:
      "The funnel is sized for Asian hornets, while smaller insects such as bees can exit through escape openings. That keeps bycatch low and targets the invasive species.",
  },
  {
    question: "When should you place the trap?",
    answer:
      "Early spring, when queens are active. Catching a queen usually means one less nest later in the season.",
  },
  {
    question: "Is the Asian hornet dangerous to people?",
    answer:
      "Risk increases when a nest is approached or disturbed. The main impact is on bees and other pollinators. Always follow municipal guidance and report nests via the official channels.",
  },
  {
    question: "How do I check if I caught the right species?",
    answer:
      "Take a clear photo and use an ID app such as ObsIdentify (waarnemingen.be) or get confirmation via the action’s contact channels as shared by the organizers/municipality.",
  },
  {
    question: "How do I humanely dispatch trapped hornets?",
    answer:
      "Follow the action’s instructions: submerge the jar for a few minutes or place it in the freezer. Always verify the latest guidance on the municipal page.",
  },
  {
    question: "Which attractant and how much?",
    answer:
      "A common mix is 1/3 beer, 1/3 wine and 1/3 sugar syrup or grenadine. Fill to roughly 2–3 cm and refresh when diluted or dirty.",
  },
  {
    question: "Why isn’t the glass jar included?",
    answer:
      "The trap is designed for reusing standard wide-mouth jars (e.g. chocolate spread jars). That keeps cost low, sustainable and easy to replace.",
  },
  {
    question: "Does one trap make a difference?",
    answer:
      "Yes, especially when many residents participate. More traps in early spring mean fewer nests later in the year.",
  },
]

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "en-BE",
  items: faqItems,
})

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Case Study: Selective Trap for Asian Hornet in Sint-Lievens-Houtem",
  description:
    "How #9520KLIMAAT and X3DPrints deploy selective 3D printed traps to slow down the Asian hornet.",
  datePublished: publishedDate,
  dateModified: publishedDate,
  author: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
  },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
    logo: {
      "@type": "ImageObject",
      url: "https://www.x3dprints.be/images/og-default.svg",
    },
  },
  mainEntityOfPage: canonical,
  url: canonical,
  image: "https://www.x3dprints.be/images/og-cases-en.svg",
  inLanguage: "en-BE",
}

function SectionDivider() {
  return (
    <div className="mx-auto my-10 flex w-full max-w-4xl items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
      <span>Case Study</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
    </div>
  )
}

export default function CaseStudySelectiveTrapEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(160%_90%_at_50%_-20%,rgba(79,70,229,0.18),transparent_75%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      {/* HERO */}
      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal className="stacked-content">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href="/en/cases"
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Cases
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-900">Selective trap Asian hornet</li>
              </ol>
            </nav>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
              Local impact with 3D printing
            </p>

            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Selective traps for the Asian hornet in Sint-Lievens-Houtem
            </h1>

            <p className="mt-4 text-lg text-slate-700">
              Citizen group <span className="font-semibold">#9520KLIMAAT</span> launched an affordable trap to slow down the Asian
              hornet. X3DPrints supplies the 3D printed funnel lid: scalable, consistent and built to minimise bycatch.
            </p>

            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/contact?topic=case-selective-trap&material=PETG%20Matte">
                Discuss a similar project
              </ShimmerButton>

              <Link
                href="/en/3d-printen"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Our production approach
              </Link>

              <Link
                href="https://www.sint-lievens-houtem.be/nieuws/koop-een-selectieve-val-voor-de-aziatische-hoornaar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Municipality action page
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-500">Published on 1 February 2026.</p>
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

      <SectionDivider />

      {/* PROBLEM + URGENCY */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">The problem</h2>
              <p className="mt-3 text-sm text-slate-600">
                The Asian hornet is invasive and pressures bees and pollinators. Local authorities provide info and reporting
                channels for nests and sightings.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                See the official guidance from the municipality:{" "}
                <Link
                  href="https://www.sint-lievens-houtem.be/wespen-bijen-hommels-en-hoornaars"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline underline-offset-4"
                >
                  wasps, bees and hornets
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Why act early?</h2>
              <p className="mt-3 text-sm text-slate-600">
                Queens are active in early spring. Catching them reduces the number of nests later in the year. The action keeps
                cost low so more residents can join quickly.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Practical instructions (bait, checks, pick-up points) are listed on the{" "}
                <Link
                  href="https://www.sint-lievens-houtem.be/nieuws/koop-een-selectieve-val-voor-de-aziatische-hoornaar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline underline-offset-4"
                >
                  municipal action page
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* VISUALS */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/80 shadow-lg">
                <Image
                  src="/images/portfolio/hornaarval.webp"
                  alt="Selective 3D printed funnel for the Asian hornet mounted on a glass jar"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 600px, 100vw"
                  priority
                />
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/80 shadow-lg">
                <Image
                  src="/images/portfolio/hoornaarval2.webp"
                  alt="Detail of the escape openings in the 3D printed lid for selective hornet traps"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 600px, 100vw"
                />
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Photos: PETG Matte funnel lid, ready to mount on reused wide-mouth glass jars.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Solution: a selective 3D printed lid</h2>
              <p className="mt-2 text-sm text-slate-600">
                The trap uses a 3D printed funnel lid that fits a standard wide-mouth glass jar. The jar itself is reused (not
                included), keeping the action affordable and easy to replenish.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Selectivity</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Escape paths for smaller insects reduce bycatch and focus on the target species.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Scalability</p>
                  <p className="mt-2 text-sm text-slate-700">
                    3D printing delivers consistent batches fast, without tooling cost when demand spikes.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Accessibility</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Low entry price, clear instructions and reusable jars keep the barrier low for residents.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Note: X3DPrints supplies the 3D printed part. Usage and follow-up follow the communication from the action and the
                municipality.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* USAGE & MATERIAL */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Practical use</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>
                    Bait: fill ~2–3 cm with a mix (1/3 beer, 1/3 wine, 1/3 sugar syrup or grenadine). Refresh when diluted or
                    dirty.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>Check regularly and report suspect catches according to municipal guidance.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>
                    Dispatch via submersion or freezer as instructed by the action. Identification can be done via photo or app
                    (ObsIdentify/waarnemingen.be).
                  </span>
                </li>
              </ul>

              <p className="mt-4 text-sm text-slate-600">
                All instructions, pick-up points and follow-up are listed on the{" "}
                <Link
                  href="https://www.sint-lievens-houtem.be/nieuws/koop-een-selectieve-val-voor-de-aziatische-hoornaar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline underline-offset-4"
                >
                  municipal action page
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Material & production</h2>
              <p className="mt-2 text-sm text-slate-600">
                We print the lid in PETG Matte for UV and moisture resistance. Wall thickness and funnel geometry are tuned for
                FDM so each batch keeps the same fit on standard jars.
              </p>
              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Consistency</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Every batch is checked on inner diameter and clip strength to stay compatible with wide-mouth jars.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Scalable delivery</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Small runs for community pilots or larger batches for wider roll-out; we schedule printers around the early
                    spring peak.
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <Link
                  href="/en/materials/petg"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  View PETG sheet
                </Link>
                <Link
                  href="/en/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Estimate batch cost
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* RESULTS */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Results & learnings</h2>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-white/60 p-4 text-sm text-slate-700">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Community</p>
                  <p className="mt-2">
                    Low price (EUR 4) and clear instructions reduce friction. Reusing jars keeps replacement simple for residents.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white/60 p-4 text-sm text-slate-700">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Scaling</p>
                  <p className="mt-2">
                    The design is ready for reprints or expansion to neighbouring towns without tooling changes. Lead time is
                    planned against the early spring peak.
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <ShimmerButton href="/en/contact?topic=case-selective-trap&material=PETG%20Matte">
                  Start a similar project
                </ShimmerButton>
                <Link
                  href="/en/segments"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  View segments & cases
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* INTERNAL & EXTERNAL LINKS */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Internal links for your next step</h2>
              <p className="mt-2 text-sm text-slate-600">
                Use this case study as a blueprint for similar projects: community actions, schools, associations or councils.
              </p>
              <div className="mt-4 grid gap-3">
                {internalLinks.map((item) => (
                  <div key={item.href} className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
                    <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                    <Link
                      href={item.href}
                      className="mt-3 inline-flex text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                    >
                      Go to {item.label} <span aria-hidden className="ml-1">-&gt;</span>
                    </Link>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Sources and partners</h2>
              <p className="mt-2 text-sm text-slate-600">Transparent references for the action and official guidance.</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {externalLinks.map((ref) => (
                  <li key={ref.href} className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                    <Link
                      href={ref.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-indigo-600 transition hover:text-indigo-500"
                    >
                      {ref.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                {faqItems.map((item) => (
                  <div key={item.question}>
                    <p className="font-semibold text-slate-900">{item.question}</p>
                    <p className="mt-1">{item.answer}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton href="/en/contact?topic=case-selective-trap&material=PETG%20Matte">
                  Start a similar project
                </ShimmerButton>
                <Link
                  href="/en/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  View pricing
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogReadMore />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}


