```tsx
import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import ContentTableOfContents from "@/components/ContentTableOfContents"

const slug = "<segment-slug>"
const canonical = `https://www.x3dprints.be/segments/${slug}/`
const enCanonical = `https://www.x3dprints.be/en/segments/${slug}/`
const lastUpdatedLabel = "Laatst bijgewerkt: <datum>"

const tocItems = [
  { id: "segment-overview", label: "Overzicht" },
  { id: "segment-workflow", label: "Stappenplan" },
  { id: "segment-next", label: "Verder lezen" },
  { id: "segment-faq", label: "FAQ" },
  { id: "segment-sources", label: "Bronnen en referenties" },
]

const faqItems = [
  { q: "<Vraag 1>", a: "<Antwoord 1>" },
  { q: "<Vraag 2>", a: "<Antwoord 2>" },
  { q: "<Vraag 3>", a: "<Antwoord 3>" },
]

const references = [
  { label: "<Bron 1>", href: "https://example.com/bron-1" },
  { label: "<Bron 2>", href: "https://example.com/bron-2" },
]

export const metadata: Metadata = {
  title: "<Segmenttitel> | X3DPrints",
  description: "<120-170 chars met segment-value proposition>",
  alternates: {
    canonical,
    languages: {
      "nl-BE": canonical,
      "en-BE": enCanonical,
      "x-default": canonical,
    },
  },
  openGraph: {
    title: "<OG titel>",
    description: "<OG description>",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "<Twitter titel>",
    description: "<Twitter description>",
    images: ["/Logo.webp"],
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "nl-BE",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

export default function SegmentTemplate() {
  return (
    <main>
      <section id="segment-overview">
        <h1><Segment H1></h1>
        <p>{lastUpdatedLabel}</p>
        <ContentTableOfContents title="Inhoud" items={tocItems} />
      </section>

      {/* Verplichte CTA/linkslots */}
      <div>
        <Link href="/materials#material-suggestion-tool">Material Suggestion Tool</Link>
        <Link href="/contact?material=pla-matte">Vraag advies</Link>
      </div>

      {/* Interne linkslots (min 3) */}
      <ul id="segment-next">
        <li><Link href="/services">Services</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="/pricing">Pricing</Link></li>
      </ul>

      {/* Verplicht FAQ minimum: min 3 */}
      <section id="segment-faq">
        <Faq items={faqItems} title="FAQ" />
      </section>

      <section id="segment-sources">
        <h2>Bronnen en referenties</h2>
        <ul>
          {references.map((item) => (
            <li key={item.href}>
              <cite>
                <a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>
              </cite>
            </li>
          ))}
        </ul>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
```
