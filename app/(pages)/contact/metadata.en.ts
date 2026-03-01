import type { Metadata } from "next"

export const EN_METADATA: Metadata = {
  title: "Contact | X3DPrints Belgium",
  description:
    "Request a 3D printing quote: prototypes or small to large batches. Fast, clear and no fluff. Based in Herzele/Ghent region.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/contact/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/contact/",
      "en-BE": "https://www.x3dprints.be/en/contact/",
      "x-default": "https://www.x3dprints.be/contact/",
    },
  },
  openGraph: {
    title: "Contact | X3DPrints Belgium",
    description:
      "Request a quote for PLA, PETG or TPU prints. Direct communication, clear on price and lead time.",
    url: "https://www.x3dprints.be/en/contact/",
    images: [{ url: "/images/og-contact-en.svg", width: 1200, height: 630, alt: "Contact X3DPrints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | X3DPrints Belgium",
    description: "Request a quote for PLA, PETG or TPU prints with clear pricing and lead-time follow-up.",
    images: ["/images/og-contact-en.svg"],
  },
}

