import type { Metadata } from "next"

import HeadsetSpacerCasePage, { HEADSET_SPACER_CASE_SLUG } from "@/components/HeadsetSpacerCasePage"

const canonical = `https://www.x3dprints.be/blog/${HEADSET_SPACER_CASE_SLUG}/`
const enCanonical = `https://www.x3dprints.be/en/blog/${HEADSET_SPACER_CASE_SLUG}/`
const publishedDate = "2026-04-12T08:00:00+02:00"
const dateModified = "2026-04-12"
const INTERNAL_LINK_SLOTS = ["/materials", "/services", "/contact"] as const

void INTERNAL_LINK_SLOTS

export const metadata: Metadata = {
  title: "Use Case Dinsdag #9: custom fietsonderdeel voor racefiets",
  description:
    "Case over 3D printing fietsonderdelen: een custom headset spacer voor een racefiets, van CAD en prototype tot finale 3D print op maat.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": canonical,
      "en-BE": enCanonical,
      "x-default": canonical,
    },
  },
  openGraph: {
    title: "Custom fietsonderdeel voor racefiets | headset spacer case",
    description:
      "Case study van een custom fietsonderdeel met 3D printing: analyse, CAD, prototype en finale headset spacer op maat voor een racefiets.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    modifiedTime: dateModified,
    authors: ["https://www.x3dprints.be"],
    images: [
      {
        url: "/images/blog/headset-spacer/custom-bike-headset-spacer-overview.webp",
        width: 1200,
        height: 1600,
        alt: "Racefiets met custom 3D geprinte headset spacer tussen frame en cockpit",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom fietsonderdeel voor racefiets",
    description: "Van probleemfoto naar CAD, prototype en finale custom headset spacer met 3D printing.",
    images: ["/images/blog/headset-spacer/custom-bike-headset-spacer-overview.webp"],
  },
}

export default function Page() {
  return <HeadsetSpacerCasePage locale="nl" />
}
