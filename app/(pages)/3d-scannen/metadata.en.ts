import type { Metadata } from "next"

const scannerImage = "/images/CR-Scan_Otter_3.webp"

export const EN_METADATA: Metadata = {
  title: "3D scanning Belgium | Scan-to-print from EUR 45",
  description:
    "Local 3D scanning service for parts, prototypes, decor and person scans. Free intake, scan + mesh from EUR 45, from Herzele.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/3d-scannen/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/3d-scannen/",
      "en-BE": "https://www.x3dprints.be/en/3d-scannen/",
      "x-default": "https://www.x3dprints.be/3d-scannen/",
    },
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
  openGraph: {
    title: "3D scanning in Belgium | X3DPrints",
    description:
      "From object to 3D file without the hassle. Scan-to-print for parts, prototypes, decor, person scans and reverse engineering.",
    url: "https://www.x3dprints.be/en/3d-scannen/",
    images: [
      {
        url: scannerImage,
        width: 1600,
        height: 1600,
        alt: "CR-Scan Otter 3D scanner for 3D scanning at X3DPrints",
      },
    ],
    locale: "en_BE",
    siteName: "X3DPrints",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D scanning in Belgium",
    description:
      "Local scan-to-print service for parts, prototypes, decor and person scans. Free intake, scan from EUR 45.",
    images: [scannerImage],
  },
  keywords: [
    "3D scanning Belgium",
    "3D scan service Herzele",
    "3D scanning for 3D printing",
    "scan-to-print Belgium",
    "reverse engineering 3D scan",
    "object 3D scanning",
    "person scan 3D",
    "3D scan bust",
    "scan to CAD",
  ],
}
