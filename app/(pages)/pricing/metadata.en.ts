import type { Metadata } from "next"
import { guideUnitPrice } from "@/lib/price-guide"

// Bedragen komen uit dezelfde prijsberekening als de pagina, zodat ze nooit uit elkaar lopen.
const [SMALL, MEDIUM, LARGE] = (["Small", "Medium", "Large"] as const).map((tier) => guideUnitPrice("PLA_MATTE", tier))

export const EN_METADATA: Metadata = {
  title: "3D printing prices in Belgium for businesses and individuals | X3DPrints",
  description:
    `3D printing prices in Belgium: about EUR ${SMALL} (small), EUR ${MEDIUM} (medium), EUR ${LARGE} (large). Same price for businesses and individuals, with material advice.`,
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
      `3D printing rates for businesses and individuals: about EUR ${SMALL} (small), EUR ${MEDIUM} (medium), EUR ${LARGE} (large). Work out your price in four steps.`,
    url: "https://www.x3dprints.be/en/pricing/",
    images: [{ url: "/images/og-pricing-en.svg", width: 1200, height: 630, alt: "3D printing prices" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing prices in Belgium",
    description:
      "Guide prices for parts, prototypes, gifts and custom pieces. Work out what your part costs in four steps, with material advice.",
    images: ["/images/og-pricing-en.svg"],
  },
}

