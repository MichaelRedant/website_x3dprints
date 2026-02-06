import type { Metadata } from "next"

const canonical = "https://www.x3dprints.be/en/algemene-voorwaarden/"

export const metadata: Metadata = {
  title: "Terms & Conditions | X3DPrints",
  description: "Terms for quotes, orders and deliveries at X3DPrints.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/algemene-voorwaarden/",
      en: canonical,
      "x-default": "https://www.x3dprints.be/algemene-voorwaarden/",
    },
  },
  openGraph: {
    title: "Terms & Conditions | X3DPrints",
    description: "Terms for quotes, orders and deliveries at X3DPrints.",
    url: canonical,
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms & Conditions",
  description: metadata.description,
  url: canonical,
  inLanguage: "en-BE",
  isPartOf: {
    "@type": "WebSite",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
  },
}

export default function TermsPageEn() {
  return (
    <main className="px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Terms &amp; Conditions</h1>
        <ol className="mt-6 space-y-6 list-decimal pl-5">
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Seller identity</h2>
            <p className="mt-2 text-slate-600">
              X3DPrints (Redant, Michael), Provincieweg 34A, 9552 Herzele, Belgium, VAT BE1032.408.513 (VAT exempt; no VAT charged).
              Contact:{" "}
              <a href="mailto:michael@xinudesign.be" className="underline-offset-2 hover:underline">
                michael@xinudesign.be
              </a>.
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Scope</h2>
            <p className="mt-2 text-slate-600">
              These terms apply to all quotes, orders and agreements with X3DPrints unless agreed otherwise in writing.
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Quotes &amp; formation</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Quotes are valid for 30 days unless stated otherwise.</li>
              <li>An agreement is concluded after written confirmation or payment by the client.</li>
              <li>Changes in specifications or quantities may affect price and planning.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Pricing &amp; payment</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>All prices are in EUR; X3DPrints is VAT exempt and does not charge VAT.</li>
              <li>Payment term: 14 days after invoice date unless otherwise agreed.</li>
              <li>Late payment: default interest under the Act of 2 August 2002 plus admin costs.</li>
              <li>For custom work or larger projects a deposit may be required.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Delivery &amp; execution</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Lead times are indicative; delays do not entitle compensation or cancellation.</li>
              <li>Shipping is at the client&apos;s risk unless agreed otherwise.</li>
              <li>The client provides correct delivery and contact details.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Inspection &amp; complaints</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Inspect the delivery as soon as possible after receipt.</li>
              <li>Visible defects must be reported in writing within 7 calendar days.</li>
              <li>Consumer statutory conformity rights remain unaffected.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Right of withdrawal</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Because 3D prints are custom-made, the 14-day right of withdrawal does not apply (Art. VI.53, 3° WER).</li>
              <li>Right of withdrawal applies to standard products/accessories.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Intellectual property &amp; files</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Submitted 3D files remain the client&apos;s property.</li>
              <li>The client warrants all rights (including copyright, licenses and trademarks) on submitted files and indemnifies X3DPrints against third-party claims.</li>
              <li>Models designed by X3DPrints remain X3DPrints&apos; property unless agreed otherwise in writing.</li>
              <li>Portfolio use of photos happens only with consent.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Liability</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>3D prints are custom work and may show minor tolerances or deviations.</li>
              <li>X3DPrints is not liable for indirect damage (data loss, loss of profit).</li>
              <li>Liability is limited to the invoice amount of the relevant order.</li>
              <li>No liability for incorrect use or application outside the agreed context.</li>
              <li>X3DPrints bears no responsibility for the lawfulness of submitted 3D models or licenses; the client guarantees that use and reproduction are legal and indemnifies X3DPrints for any related claims.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Force majeure</h2>
            <p className="mt-2 text-slate-600">X3DPrints is not liable in case of force majeure (e.g. outages, supplier delays, technical defects).</p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Privacy &amp; confidentiality</h2>
            <p className="mt-2 text-slate-600">
              We treat submitted files and information confidentially and only use them to execute the assignment. More info in the privacy policy.
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Governing law &amp; disputes</h2>
            <p className="mt-2 text-slate-600">Belgian law applies. Disputes fall under the exclusive jurisdiction of the courts of Ghent.</p>
          </li>
        </ol>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </main>
  )
}
