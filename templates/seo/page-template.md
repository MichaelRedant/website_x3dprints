```tsx
import type { Metadata } from "next"
import Link from "next/link"

const canonical = "https://www.x3dprints.be/<slug>/"
const enCanonical = "https://www.x3dprints.be/en/<slug>/"

export const metadata: Metadata = {
  title: "<Titel met zoekintentie> | X3DPrints",
  description: "<120-170 chars met waardepropositie en locatiecontext>",
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

export default function PageTemplate() {
  return (
    <main>
      <h1><Pagina H1></h1>

      {/* Interne linkslots (min 3) */}
      <nav aria-label="Verder lezen">
        <ul>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/materials#material-suggestion-tool">Material Suggestion Tool</Link></li>
          <li><Link href="/contact?material=pla-matte">Contact met prefill</Link></li>
        </ul>
      </nav>
    </main>
  )
}
```
