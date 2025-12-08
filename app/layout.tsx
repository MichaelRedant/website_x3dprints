import "./globals.css"
import type { Metadata } from "next"
import { SITE } from "@/lib/seo"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ScrollProgress from "@/components/ScrollProgress"
import BackToTop from "@/components/BackToTop"
import CookieBanner from "@/components/CookieBanner"
import AnalyticsConsent from "@/components/AnalyticsConsent"
import ThemeProvider from "@/components/ThemeProvider"
import { Orbitron, JetBrains_Mono } from "next/font/google"
import { cn } from "@/lib/utils";

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
    priceRange: "EUR",
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Print Service" } },
    ],
  }

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
      { "@type": "ListItem", position: 3, name: "Materialen", item: `${SITE.url}/materials` },
      { "@type": "ListItem", position: 4, name: "Portfolio", item: `${SITE.url}/portfolio` },
      { "@type": "ListItem", position: 5, name: "Prijzen", item: `${SITE.url}/pricing` },
      { "@type": "ListItem", position: 6, name: "Contact", item: `${SITE.url}/contact` },
      { "@type": "ListItem", position: 7, name: "Blog", item: `${SITE.url}/blog` },
    ],
  }

  return (
    <html lang="nl" data-theme="light" suppressHydrationWarning>
      <body className={cn("min-h-screen flex flex-col antialiased", orbitron.variable, mono.variable)}>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{const key="x3d-theme";const stored=localStorage.getItem(key);const prefers=window.matchMedia("(prefers-color-scheme: dark)").matches;const theme=(stored==="dark"||stored==="light")?stored:(prefers?"dark":"light");const root=document.documentElement;if(theme==="dark"){root.classList.add("dark");root.dataset.theme="hawkins";}else{root.classList.remove("dark");root.dataset.theme="light";}}catch(e){}})();`,
          }}
        />
        <ThemeProvider>
          <ScrollProgress />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
          <BackToTop />
          <AnalyticsConsent />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
        />
      </body>
    </html>
  )
}
