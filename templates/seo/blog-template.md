```tsx
import type { Metadata } from "next"
import Link from "next/link"

const canonical = "https://www.x3dprints.be/blog/<slug>/"
const enCanonical = "https://www.x3dprints.be/en/blog/<slug>/"
const publishedDate = "2026-01-01T08:00:00+01:00"

export const metadata: Metadata = {
  title: "<Blogtitel met primary keyword> | X3DPrints",
  description: "<120-170 chars samenvatting met intentie + CTA>",
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
    type: "article",
    publishedTime: publishedDate,
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

export default function BlogTemplate() {
  return (
    <article>
      <h1><Blog H1></h1>

      {/* Interne linkslots (min 3) */}
      <aside aria-label="Gerelateerde links">
        <ul>
          <li><Link href="/materials">Materialen</Link></li>
          <li><Link href="/segments">Segmenten</Link></li>
          <li><Link href="/contact?material=pla-matte">Contact</Link></li>
        </ul>
      </aside>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            inLanguage: "nl-BE",
            headline: "<Blogtitel>",
            description: "<Meta description>",
            datePublished: publishedDate,
            dateModified: publishedDate,
            mainEntityOfPage: canonical,
            url: canonical,
            image: ["https://www.x3dprints.be/Logo.webp"],
          }),
        }}
      />
    </article>
  )
}
```
