import "./globals.css"
import type { Metadata } from "next"
import {
  SITE,
  buildBreadcrumbSchema,
  buildOfferCatalog,
  buildOrganizationSchema,
  buildWebsiteSchema,
  type SchemaOfferInput,
} from "@/lib/seo"
import { Orbitron, JetBrains_Mono } from "next/font/google"
import { cn } from "@/lib/utils"

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", weight: ["400", "500", "600", "700"] })
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s",
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
  const organizationSchema = buildOrganizationSchema({
    url: SITE.url,
    inLanguage: ["nl-BE", "en-BE"],
  })
  const websiteSchema = buildWebsiteSchema({
    url: SITE.url,
    inLanguage: ["nl-BE", "en-BE"],
  })

  const offerItems: SchemaOfferInput[] = [
    { serviceName: "Prototype prints", price: "EUR 0", description: "Quote + planning", url: `${SITE.url}/services` },
    { serviceName: "Small batches", price: "EUR 0", description: "Batch advice and unit pricing", url: `${SITE.url}/services` },
    { serviceName: "Tool organizers", price: "EUR 0", description: "Custom inserts and organizers", url: `${SITE.url}/organizers` },
  ]

  const offerCatalog = buildOfferCatalog("3D Print Services", offerItems)

  const baseLocalBusiness = {
    "@type": "LocalBusiness",
    "@id": `${SITE.url}#x3dprints-main`,
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phone,
    priceRange: SITE.priceRange,
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
    makesOffer: [{ "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Print Service" } }],
    hasOfferCatalog: offerCatalog,
    geo: { "@type": "GeoCoordinates", latitude: 50.8839, longitude: 3.8932 },
    hasMap: "https://www.google.com/maps/search/?api=1&query=Provincieweg+34a+9552+Herzele",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
    ],
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
    "@graph": [organizationSchema, websiteSchema, baseLocalBusiness, ...clusterLocalBusinesses],
  }
}

const breadcrumbNl = buildBreadcrumbSchema({
  id: `${SITE.url}/#breadcrumb-nl`,
  inLanguage: "nl-BE",
  items: [
    { name: "Home", url: `${SITE.url}/` },
    { name: "Services", url: `${SITE.url}/services/` },
    { name: "Materialen", url: `${SITE.url}/materials/` },
    { name: "Portfolio", url: `${SITE.url}/portfolio/` },
    { name: "Pricing", url: `${SITE.url}/pricing/` },
    { name: "Contact", url: `${SITE.url}/contact/` },
    { name: "Blog", url: `${SITE.url}/blog/` },
  ],
})

const breadcrumbEn = buildBreadcrumbSchema({
  id: `${SITE.url}/en/#breadcrumb-en`,
  inLanguage: "en-BE",
  items: [
    { name: "Home", url: `${SITE.url}/en/` },
    { name: "Services", url: `${SITE.url}/en/services/` },
    { name: "Materials", url: `${SITE.url}/en/materials/` },
    { name: "Portfolio", url: `${SITE.url}/en/portfolio/` },
    { name: "Pricing", url: `${SITE.url}/en/pricing/` },
    { name: "Contact", url: `${SITE.url}/en/contact/` },
    { name: "Blog", url: `${SITE.url}/en/blog/` },
  ],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = buildSchema()
  const localeBootstrapScript = `(() => {
    try {
      const pathname = window.location.pathname || "/";
      const isEn = pathname === "/en" || pathname.startsWith("/en/");
      const lang = isEn ? "en-BE" : "nl-BE";
      const root = document.documentElement;
      if (root.lang !== lang) root.lang = lang;
      root.setAttribute("data-locale", isEn ? "en" : "nl");
    } catch (_) {}
  })();`

  return (
    <html lang="nl-BE" data-theme="light" suppressHydrationWarning>
      <body className={cn("min-h-screen flex flex-col antialiased", orbitron.variable, mono.variable)}>
        <script dangerouslySetInnerHTML={{ __html: localeBootstrapScript }} />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbNl) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbEn) }} />
      </body>
    </html>
  )
}
