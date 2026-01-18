import type { Metadata } from "next"
import Link from "next/link"

const canonical = "https://www.x3dprints.be/en/privacy"

export const metadata: Metadata = {
  title: "Privacy Policy | X3DPrints",
  description: "How X3DPrints collects, uses and protects personal data in line with the GDPR.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/privacy",
      en: canonical,
    },
  },
  openGraph: {
    title: "Privacy Policy | X3DPrints",
    description: "How X3DPrints collects, uses and protects personal data in line with the GDPR.",
    url: canonical,
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy",
  description: metadata.description,
  url: canonical,
  inLanguage: "en-BE",
  isPartOf: {
    "@type": "WebSite",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
  },
}

export default function PrivacyPageEn() {
  return (
    <main className="px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Privacy Policy</h1>
        <ol className="mt-6 space-y-6 list-decimal pl-5">
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Controller</h2>
            <p className="mt-2 text-slate-600">
              X3DPrints (Redant, Michael), Provincieweg 34A, 9552 Herzele, Belgium, VAT BE1032.408.513 (VAT exempt), is the controller under GDPR. Contact:{" "}
              <a href="mailto:michael@xinudesign.be" className="underline-offset-2 hover:underline">
                michael@xinudesign.be
              </a>.
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">What data we process</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Identification: name, address, email, phone.</li>
              <li>Order and payment: billing address, VAT number, payment status.</li>
              <li>Project data: files, specs, material choices, delivery preferences.</li>
              <li>Technical: IP address, browser data, cookies (see cookie policy).</li>
              <li>3D files (STL/STEP) and instructions provided by clients.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">How we collect data</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Via contact forms, email or phone.</li>
              <li>When you submit files and project info for a quote or production.</li>
              <li>Via cookies and analytics when you visit the website.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Purposes</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Handling orders, deliveries and payments.</li>
              <li>Communication about quotes, projects and support.</li>
              <li>Technical support and quality control of prints.</li>
              <li>Accounting and legal obligations.</li>
              <li>Marketing/promotions (only with consent).</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Legal basis</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Contractual necessity: to execute a quote/order.</li>
              <li>Legal obligation: fiscal and accounting duties.</li>
              <li>Consent: newsletters or promotions.</li>
              <li>Legitimate interest: basic statistics and site security.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Data sharing</h2>
            <p className="mt-2 text-slate-600">Shared only with necessary third parties such as:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Payment providers, logistics partners, accountant.</li>
              <li>Hosting/email providers for site operation and communication.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Transfers outside the EEA</h2>
            <p className="mt-2 text-slate-600">
              If we work with suppliers outside the EEA, we implement appropriate safeguards (e.g. SCCs) to protect your data.
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Retention</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Billing/transaction data: 7 years (tax law).</li>
              <li>Quote/project data: as needed for the assignment and follow-up.</li>
              <li>Marketing data: until consent is withdrawn.</li>
              <li>STL/STEP files: only as long as needed for the assignment unless agreed otherwise.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Your rights</h2>
            <p className="mt-2 text-slate-600">
              Rights of access, rectification, erasure, restriction, portability and objection. Right to withdraw consent for marketing. You can lodge a complaint with the Belgian Data Protection Authority (www.dataprotectionauthority.be).
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Cookies &amp; analytics</h2>
            <p className="mt-2 text-slate-600">
              For cookies, statistics and your preferences see the{" "}
              <Link href="/en/cookies" className="underline-offset-2 hover:underline">
                cookie policy
              </Link>.
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Security</h2>
            <p className="mt-2 text-slate-600">
              X3DPrints takes technical and organisational measures to protect data against loss, misuse or unauthorised access.
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Changes</h2>
            <p className="mt-2 text-slate-600">
              This policy may be updated if legislation or services change. The latest version is always on this page.
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
            <p className="mt-2 text-slate-600">
              Questions or exercising rights:{" "}
              <a href="mailto:michael@xinudesign.be" className="underline-offset-2 hover:underline">
                michael@xinudesign.be
              </a>
            </p>
          </li>
        </ol>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </main>
  )
}
