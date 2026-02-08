import type { Metadata } from "next"

export const EN_METADATA: Metadata = {
  title: "3D printing in Belgium | X3DPrints Herzele",
  description:
    "Precision 3D printing in Belgium and Flanders. Fast turnaround from Herzele with advice on PLA, PETG, ABS/ASA, Nylon and PA-CF for prototypes, displays and functional parts.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/",
      "en-BE": "https://www.x3dprints.be/en/",
      "x-default": "https://www.x3dprints.be/",
    },
  },
  openGraph: {
    title: "X3DPrints - 3D print service in Belgium",
    description:
      "From STL/STEP to clean 3D prints in Belgium. Local guidance, shorter lead times and durable finishing for projects in Ghent, Aalst and across Flanders.",
    url: "https://www.x3dprints.be/en/",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

