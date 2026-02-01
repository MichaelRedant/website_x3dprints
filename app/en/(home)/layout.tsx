import LocaleProvider from "@/components/LocaleProvider"
import ThemeProvider from "@/components/ThemeProvider"
import ScrollProgress from "@/components/ScrollProgress"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CookieBanner from "@/components/CookieBanner"
import BackToTop from "@/components/BackToTop"
import AnalyticsConsent from "@/components/AnalyticsConsent"

export const dynamic = "force-static"

export default function EnHomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider initialLocale="en">
      <ThemeProvider>
        <ScrollProgress />
        <Header />
        <main className="flex-1 pt-16 md:pt-[72px]">{children}</main>
        <Footer />
        <CookieBanner />
        <BackToTop />
        <AnalyticsConsent />
      </ThemeProvider>
    </LocaleProvider>
  )
}
