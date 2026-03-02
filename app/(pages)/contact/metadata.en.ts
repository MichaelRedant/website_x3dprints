import type { Metadata } from "next"

export const EN_METADATA: Metadata = {
  title: "Contact for custom 3D printing in Belgium | X3DPrints",
  description:
    "Request a 3D printing quote in Belgium for businesses and individuals: parts, organizers, prototypes, retail items and custom pieces. Fast response and clear pricing.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/contact/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/contact/",
      "en-BE": "https://www.x3dprints.be/en/contact/",
      "x-default": "https://www.x3dprints.be/contact/",
    },
  },
  openGraph: {
    title: "Contact for custom 3D printing in Belgium | X3DPrints",
    description:
      "Request a quote for parts, organizers, prototypes and custom pieces in PLA, PETG or TPU. Direct communication with clear pricing and lead time.",
    url: "https://www.x3dprints.be/en/contact/",
    images: [{ url: "/images/og-contact-en.svg", width: 1200, height: 630, alt: "Contact X3DPrints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact X3DPrints | 3D printing quote in Belgium",
    description: "Quotes for businesses and individuals with clear pricing and lead-time follow-up.",
    images: ["/images/og-contact-en.svg"],
  },
}

