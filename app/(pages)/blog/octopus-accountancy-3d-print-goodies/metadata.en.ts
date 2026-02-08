import type { Metadata } from "next"

const NL_CANONICAL = "https://www.x3dprints.be/blog/octopus-accountancy-3d-print-goodies"
const EN_CANONICAL = "https://www.x3dprints.be/en/blog/octopus-accountancy-3d-print-goodies"
const PUBLISHED_DATE = "2025-12-16T08:00:00+01:00"

const OG_IMAGE = {
  url: "/images/portfolio/Octopus25-50.webp",
  width: 1200,
  height: 630,
  alt: "Octopus x X3DPrints case",
}

export const EN_METADATA: Metadata = {
  title: "Case: Octopus x X3DPrints - 3D-printed mascots, badges and event goodies",
  description:
    "How X3DPrints produced 3D-printed mascots, badges and goodies for Octopus (accountancy software) across office, trade shows and events. Smart material choices, fast iteration and consistent quality.",
  alternates: {
    canonical: EN_CANONICAL,
    languages: {
      "nl-BE": NL_CANONICAL,
      "en-BE": EN_CANONICAL,
      "x-default": NL_CANONICAL,
    },
  },
  openGraph: {
    title: "Case: Octopus x X3DPrints - 3D-printed mascots and event goodies",
    description:
      "Collaboration with Octopus: 3D-printed mascots, QR goodies and badges for office and events. Fast iteration, clear workflow and materials that hold up to daily use.",
    url: EN_CANONICAL,
    type: "article",
    publishedTime: PUBLISHED_DATE,
    authors: ["https://www.x3dprints.be"],
    tags: ["Octopus case", "3D printing marketing", "event goodies", "badges", "mascot", "SaaS merchandising"],
    images: [OG_IMAGE],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case: Octopus x X3DPrints - 3D-printed mascots and event goodies",
    description:
      "Mascots, QR goodies and badges for office and events. X3DPrints made Octopus merch people actually use.",
    images: [OG_IMAGE.url],
  },
}

