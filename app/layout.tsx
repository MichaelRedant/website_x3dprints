import "./globals.css"
import type { Metadata } from "next"
import {
  SITE,
  buildLocalBusinessSchema,
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
    { serviceName: "Small to large batches", price: "EUR 0", description: "Batch advice and unit pricing", url: `${SITE.url}/services` },
    { serviceName: "Tool organizers", price: "EUR 0", description: "Custom inserts and organizers", url: `${SITE.url}/organizers` },
  ]

  const bilingualNames = ["X3DPrints", "X3DPrints (English)"]
  const bilingualLanguage = ["nl-BE", "en-BE"]
  const baseLocalBusinessId = `${SITE.url}#x3dprints-main`
  const baseOffers = [{ serviceName: "3D Print Service" }]

  const baseLocalBusiness = buildLocalBusinessSchema({
    id: baseLocalBusinessId,
    pageUrl: SITE.url,
    inLanguage: bilingualLanguage,
    alternateName: bilingualNames,
    areaServed: "Belgium",
    sameAs: SITE.sameAs,
    geo: { latitude: 50.8839, longitude: 3.8932 },
    hasMap: "https://www.google.com/maps/search/?api=1&query=Provincieweg+34a+9552+Herzele",
    makesOffer: baseOffers,
    offersName: "3D Print Services",
    offers: offerItems,
    includeContext: false,
  })

  const clusterLocalBusinesses = [
    buildLocalBusinessSchema({
      id: `${SITE.url}#x3dprints-gent`,
      name: "X3DPrints Gent & Vlaamse Ardennen",
      pageUrl: `${SITE.url}/locaties`,
      inLanguage: bilingualLanguage,
      alternateName: bilingualNames,
      areaServed: ["Gent", "Zottegem", "Geraardsbergen", "Oudenaarde", "Ninove"],
      makesOffer: baseOffers,
      parentOrganizationId: baseLocalBusinessId,
      includeContext: false,
    }),
    buildLocalBusinessSchema({
      id: `${SITE.url}#x3dprints-dender`,
      name: "X3DPrints Aalst & Denderstreek",
      pageUrl: `${SITE.url}/locaties`,
      inLanguage: bilingualLanguage,
      alternateName: bilingualNames,
      areaServed: ["Aalst", "Denderleeuw", "Ninove", "Haaltert"],
      makesOffer: baseOffers,
      parentOrganizationId: baseLocalBusinessId,
      includeContext: false,
    }),
    buildLocalBusinessSchema({
      id: `${SITE.url}#x3dprints-waasland`,
      name: "X3DPrints Waasland",
      pageUrl: `${SITE.url}/locaties`,
      inLanguage: bilingualLanguage,
      alternateName: bilingualNames,
      areaServed: ["Sint-Niklaas", "Beveren", "Lokeren", "Temse"],
      makesOffer: baseOffers,
      parentOrganizationId: baseLocalBusinessId,
      includeContext: false,
    }),
    buildLocalBusinessSchema({
      id: `${SITE.url}#x3dprints-kortrijk`,
      name: "X3DPrints Kortrijk & Leievallei",
      pageUrl: `${SITE.url}/locaties`,
      inLanguage: bilingualLanguage,
      alternateName: bilingualNames,
      areaServed: ["Kortrijk", "Waregem", "Deinze", "Zulte"],
      makesOffer: baseOffers,
      parentOrganizationId: baseLocalBusinessId,
      includeContext: false,
    }),
  ]

  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, websiteSchema, baseLocalBusiness, ...clusterLocalBusinesses],
  }
}

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
      </body>
    </html>
  )
}
