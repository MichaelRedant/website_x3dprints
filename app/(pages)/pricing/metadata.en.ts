import type { Metadata } from "next"

export const EN_METADATA: Metadata = {
  title: "3D Printing Prices | X3DPrints",
  description:
    "3D printing prices from EUR 5 (small), EUR 20 (medium) and EUR 49 (large). PLA, PETG and TPU with a clear quote within 24 hours.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/pricing/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/pricing/",
      "en-BE": "https://www.x3dprints.be/en/pricing/",
      "x-default": "https://www.x3dprints.be/pricing/",
    },
  },
  openGraph: {
    title: "3D printing prices",
    description:
      "3D printing from EUR 5 (small), EUR 20 (medium) and EUR 49 (large). PLA, PETG and TPU. Delivery across Belgium.",
    url: "https://www.x3dprints.be/en/pricing/",
    images: [{ url: "/images/og-pricing-en.svg", width: 1200, height: 630, alt: "3D printing prices" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing prices",
    description:
      "Indicative rates for prototypes and small to large batches. Materials: PLA (standard), PLA+ variants, PETG and TPU. Delivery across Belgium.",
    images: ["/images/og-pricing-en.svg"],
  },
}

