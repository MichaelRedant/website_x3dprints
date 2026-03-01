import type { Metadata } from "next"

export const EN_METADATA: Metadata = {
  title: "3D printing blog & knowledge base | X3DPrints",
  description:
    "Strategic 3D printing articles on cost, material choice, Bambu X1C settings and design best practices. Includes links to the calculator and materials library.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/blog/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/",
      "en-BE": "https://www.x3dprints.be/en/blog/",
      "x-default": "https://www.x3dprints.be/blog/",
    },
  },
  openGraph: {
    title: "3D printing blog & knowledge base | X3DPrints",
    description:
      "Learn how to plan 3D printing projects: cost estimates, PLA vs PETG, Bambu X1C settings and design guidelines. Direct links to the pricing calculator and materials.",
    url: "https://www.x3dprints.be/en/blog/",
    images: [{ url: "/images/og-blog-en.svg", width: 1200, height: 630, alt: "3D printing blog X3DPrints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing blog & knowledge base | X3DPrints",
    description: "Strategic content on 3D printing costs, material choice, Bambu X1C settings and design approach.",
    images: ["/images/og-blog-en.svg"],
  },
}

