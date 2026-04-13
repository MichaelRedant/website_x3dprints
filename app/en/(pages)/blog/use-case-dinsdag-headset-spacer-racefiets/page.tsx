import type { Metadata } from "next"

import HeadsetSpacerCasePage, { HEADSET_SPACER_CASE_SLUG } from "@/components/HeadsetSpacerCasePage"

const canonical = `https://www.x3dprints.be/en/blog/${HEADSET_SPACER_CASE_SLUG}/`
const nlCanonical = `https://www.x3dprints.be/blog/${HEADSET_SPACER_CASE_SLUG}/`
const publishedDate = "2026-04-12T08:00:00+02:00"
const dateModified = "2026-04-12"
const INTERNAL_LINK_SLOTS = ["/en/materials", "/en/services", "/en/contact"] as const

void INTERNAL_LINK_SLOTS

export const metadata: Metadata = {
  title: "Use Case Tuesday #9: custom bike part for race bikes",
  description:
    "Case study of 3D printed bike parts: a custom headset spacer for a race bike, from CAD and prototype to the final made-to-fit print.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": nlCanonical,
      "en-BE": canonical,
      "x-default": nlCanonical,
    },
  },
  openGraph: {
    title: "Custom bike part for a race bike | headset spacer case",
    description:
      "Case study of a custom bike part with 3D printing: analysis, CAD, prototype and a final made-to-fit headset spacer for a race bike.",
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
        alt: "Race bike with a custom 3D printed headset spacer between the frame and cockpit",
      },
    ],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom bike part for a race bike",
    description: "From problem photo to CAD, prototype and final custom headset spacer with 3D printing.",
    images: ["/images/blog/headset-spacer/custom-bike-headset-spacer-overview.webp"],
  },
}

export default function Page() {
  return <HeadsetSpacerCasePage locale="en" />
}
