import "./globals.css"
import type { Metadata } from "next"
import { SITE } from "@/lib/seo"
import { Orbitron, JetBrains_Mono } from "next/font/google"
import { cn } from "@/lib/utils"

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", weight: ["400", "500", "600", "700"] })
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s | X3DPrints",
  },
  description: SITE.description,
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    type: "website",
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
    locale: SITE.locale,
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  icons: { icon: "/favicon.ico" },
  other: googleSiteVerification
    ? {
        "google-site-verification": googleSiteVerification,
      }
    : undefined,
}

function buildSchema() {
  const baseLocalBusiness = {
    "@type": "LocalBusiness",
    "@id": `${SITE.url}#x3dprints-main`,
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phone,
    image: `${SITE.url}${SITE.ogImage}`,
    inLanguage: ["nl-BE", "en-BE"],
    alternateName: ["X3DPrints", "X3DPrints (English)"],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    sameAs: SITE.sameAs,
    areaServed: "Belgium",
    priceRange: "EUR",
    makesOffer: [{ "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Print Service" } }],
    geo: { "@type": "GeoCoordinates", latitude: 50.8839, longitude: 3.8932 },
    hasMap: "https://www.google.com/maps/search/?api=1&query=Provincieweg+34a+9552+Herzele",
  }

  const clusterLocalBusinesses = [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE.url}#x3dprints-gent`,
      name: "X3DPrints Gent & Vlaamse Ardennen",
      url: `${SITE.url}/locaties`,
      telephone: SITE.phone,
      address: baseLocalBusiness.address,
      inLanguage: baseLocalBusiness.inLanguage,
      alternateName: baseLocalBusiness.alternateName,
      areaServed: ["Gent", "Zottegem", "Geraardsbergen", "Oudenaarde", "Ninove"],
      makesOffer: baseLocalBusiness.makesOffer,
      parentOrganization: { "@id": baseLocalBusiness["@id"] },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE.url}#x3dprints-dender`,
      name: "X3DPrints Aalst & Denderstreek",
      url: `${SITE.url}/locaties`,
      telephone: SITE.phone,
      address: baseLocalBusiness.address,
      inLanguage: baseLocalBusiness.inLanguage,
      alternateName: baseLocalBusiness.alternateName,
      areaServed: ["Aalst", "Denderleeuw", "Ninove", "Haaltert"],
      makesOffer: baseLocalBusiness.makesOffer,
      parentOrganization: { "@id": baseLocalBusiness["@id"] },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE.url}#x3dprints-waasland`,
      name: "X3DPrints Waasland",
      url: `${SITE.url}/locaties`,
      telephone: SITE.phone,
      address: baseLocalBusiness.address,
      inLanguage: baseLocalBusiness.inLanguage,
      alternateName: baseLocalBusiness.alternateName,
      areaServed: ["Sint-Niklaas", "Beveren", "Lokeren", "Temse"],
      makesOffer: baseLocalBusiness.makesOffer,
      parentOrganization: { "@id": baseLocalBusiness["@id"] },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE.url}#x3dprints-kortrijk`,
      name: "X3DPrints Kortrijk & Leievallei",
      url: `${SITE.url}/locaties`,
      telephone: SITE.phone,
      address: baseLocalBusiness.address,
      inLanguage: baseLocalBusiness.inLanguage,
      alternateName: baseLocalBusiness.alternateName,
      areaServed: ["Kortrijk", "Waregem", "Deinze", "Zulte"],
      makesOffer: baseLocalBusiness.makesOffer,
      parentOrganization: { "@id": baseLocalBusiness["@id"] },
    },
  ]

  return {
    "@context": "https://schema.org",
    "@graph": [baseLocalBusiness, ...clusterLocalBusinesses],
  }
}

function buildBreadcrumbList(locale: "nl" | "en") {
  const isEn = locale === "en"
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    inLanguage: isEn ? "en-BE" : "nl-BE",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: isEn ? "Services" : "Services", item: `${SITE.url}/services` },
      { "@type": "ListItem", position: 3, name: isEn ? "Materials" : "Materialen", item: `${SITE.url}/materials` },
      { "@type": "ListItem", position: 4, name: "Portfolio", item: `${SITE.url}/portfolio` },
      { "@type": "ListItem", position: 5, name: isEn ? "Pricing" : "Prijzen", item: `${SITE.url}/pricing` },
      { "@type": "ListItem", position: 6, name: "Contact", item: `${SITE.url}/contact` },
      { "@type": "ListItem", position: 7, name: "Blog", item: `${SITE.url}/blog` },
    ],
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = buildSchema()
  const breadcrumbList = buildBreadcrumbList("nl")

  return (
    <html lang="nl" data-theme="light" suppressHydrationWarning>
      <head>
        <meta httpEquiv="content-language" content="nl-BE" />
      </head>
      <body className={cn("min-h-screen flex flex-col antialiased", orbitron.variable, mono.variable)}>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
      </body>
    </html>
  )
}
