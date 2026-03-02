import type { Metadata } from "next"

export const EN_METADATA: Metadata = {
  title: "3D printing prices in Belgium for businesses and individuals | X3DPrints",
  description:
    "3D printing prices in Belgium from EUR 5 (small), EUR 20 (medium) and EUR 49 (large) for businesses and individuals. Clear quote and material advice.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/pricing/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/pricing/",
      "en-BE": "https://www.x3dprints.be/en/pricing/",
      "x-default": "https://www.x3dprints.be/pricing/",
    },
  },
  openGraph: {
    title: "3D printing prices in Belgium | X3DPrints",
    description:
      "3D printing rates for businesses and individuals: EUR 5 (small), EUR 20 (medium), EUR 49 (large). Parts, organizers, prototypes and custom pieces.",
    url: "https://www.x3dprints.be/en/pricing/",
    images: [{ url: "/images/og-pricing-en.svg", width: 1200, height: 630, alt: "3D printing prices" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing prices in Belgium",
    description:
      "Indicative rates for parts, organizers, prototypes and custom pieces. Materials: PLA, PLA+ variants, PETG and TPU.",
    images: ["/images/og-pricing-en.svg"],
  },
}

