import "./globals.css"
import type { Metadata } from "next"
import { SITE } from "@/lib/seo"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ScrollProgress from "@/components/ScrollProgress"
import CookieBanner from "@/components/CookieBanner"
import AnalyticsConsent from "@/components/AnalyticsConsent"
import { cn } from "@/lib/utils";

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD Organization/LocalBusiness
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phone,
    image: `${SITE.url}${SITE.ogImage}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country
    },
    sameAs: SITE.sameAs,
    areaServed: "BE",
    priceRange: "€€",
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Print Service" } }
    ]
  }

  return (
    <html lang="nl">
      <body className={cn("min-h-screen flex flex-col")}>
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <AnalyticsConsent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  )
}
