import type { Metadata } from "next"

const canonical = "https://www.x3dprints.be/en/cookies/"

export const metadata: Metadata = {
  title: "Cookie Policy | X3DPrints",
  description: "How X3DPrints uses cookies for essential functions and anonymised analytics, plus how to manage your preferences.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/cookies/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/cookies/",
    },
  },
  openGraph: {
    title: "Cookie Policy | X3DPrints",
    description: "How X3DPrints uses cookies for essential functions and anonymised analytics, plus how to manage your preferences.",
    url: canonical,
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Cookie Policy",
  description: metadata.description,
  url: canonical,
  inLanguage: "en-BE",
  isPartOf: {
    "@type": "WebSite",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
  },
}

export default function CookiePolicyPageEn() {
  return (
    <main className="px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Cookie Policy</h1>
          <p className="text-slate-600">
            We use cookies to keep the site running smoothly and to collect anonymised statistics. Below you&apos;ll find which cookies we use, why, and how to adjust your preferences. No sneaky cookie eating here—only clear info.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">What are cookies?</h2>
          <p className="text-slate-600">
            Cookies are small text files stored on your device when you visit our site. They help remember preferences and measure usage. We don&apos;t use them to profile you personally.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Which cookies do we use?</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Necessary cookies</h3>
              <p className="text-slate-600">
                Required for the site to function. They remember whether you closed the cookie banner and store your consent choice. Without them the banner would reappear on every visit.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Analytics cookies</h3>
              <p className="text-slate-600">
                We use Google Analytics to understand visitor flows, popular pages and potential errors. Measurements are anonymised and only start after you give consent in our banner or via the cookie settings.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Managing consent</h2>
          <p className="text-slate-600">
            On your first visit we ask for consent via the banner. You can change this later using the “Cookie settings” button in the footer. We store your preference for up to 12 months unless you clear cookies sooner.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Third parties</h2>
          <p className="text-slate-600">
            For analytics, Google acts as processor. We have a data processing agreement and IP addresses are anonymised. Data is not shared with other Google services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Removing or blocking cookies</h2>
          <p className="text-slate-600">
            You can remove cookies via your browser settings. Check the help pages of Chrome, Firefox, Safari or Edge for steps. Note that some site functions may work less well without necessary cookies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Questions?</h2>
          <p className="text-slate-600">
            Questions about this policy or your rights? Contact{" "}
            <a href="mailto:michael@xinudesign.be" className="underline-offset-2 hover:underline">
              michael@xinudesign.be
            </a>
            .
          </p>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </main>
  )
}
