import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacybeleid – X3DPrints",
  description:
    "Ontdek hoe X3DPrints persoonsgegevens verzamelt, gebruikt en beschermt volgens de AVG.",
  alternates: { canonical: "https://www.x3dprints.be/privacy" },
  openGraph: {
    title: "Privacybeleid – X3DPrints",
    description:
      "Ontdek hoe X3DPrints persoonsgegevens verzamelt, gebruikt en beschermt volgens de AVG.",
    url: "https://www.x3dprints.be/privacy",
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export default function PrivacyPage() {
  return (
    <main className="px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Privacybeleid</h1>
        <ol className="mt-6 space-y-6 list-decimal pl-5">
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Verantwoordelijke voor verwerking</h2>
            <p className="mt-2 text-slate-600">
              X3DPrints, Provincieweg 34A, 9552 Herzele, België, ondernemingsnummer BE0681.759.451,
              is de verantwoordelijke voor de verwerking van persoonsgegevens in de zin van de Algemene
              Verordening Gegevensbescherming (AVG/GDPR).
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Welke gegevens verzamelen we?</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Identificatiegegevens: naam, adres, e-mailadres, telefoonnummer.</li>
              <li>Bestel- en betaalgegevens: factuuradres, btw-nummer, betaalstatus.</li>
              <li>Technische gegevens: IP-adres, browsergegevens, cookies (zie cookiebeleid).</li>
              <li>3D-bestanden die klanten zelf aanleveren (STL/STEP).</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Doeleinden van verwerking</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Afhandeling van bestellingen, leveringen en betalingen.</li>
              <li>Communicatie over offertes, projecten en klantenservice.</li>
              <li>Boekhouding en wettelijke verplichtingen.</li>
              <li>Marketing en promoties (enkel mits toestemming).</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Rechtsgrond van verwerking</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Contractuele noodzaak: verwerking om een bestelling of offerte uit te voeren.</li>
              <li>Wettelijke verplichting: fiscale en boekhoudkundige verplichtingen.</li>
              <li>Toestemming: voor nieuwsbrieven of promoties.</li>
              <li>Gerechtvaardigd belang: basisstatistieken en beveiliging van de website.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Delen van gegevens</h2>
            <p className="mt-2 text-slate-600">Gegevens worden enkel gedeeld met noodzakelijke derden zoals:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Betaalproviders, logistieke partners, boekhouder.</li>
              <li>Enkel binnen de EU of landen met passend beschermingsniveau.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Bewaartermijn</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Facturatie- en transactiegegevens: 7 jaar (fiscale verplichting).</li>
              <li>Marketinggegevens: tot intrekking van toestemming.</li>
              <li>STL/STEP-bestanden: enkel zolang nodig voor de opdracht, tenzij anders overeengekomen.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Rechten van betrokkenen</h2>
            <p className="mt-2 text-slate-600">
              Recht op inzage, correctie, verwijdering, beperking, overdraagbaarheid en bezwaar. Recht om
              toestemming in te trekken voor marketing. Klachtmogelijkheid bij de
              Gegevensbeschermingsautoriteit (www.gegevensbeschermingsautoriteit.be).
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Beveiliging</h2>
            <p className="mt-2 text-slate-600">
              X3DPrints neemt technische en organisatorische maatregelen om gegevens te beschermen tegen
              verlies, misbruik of ongeoorloofde toegang.
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
            <p className="mt-2 text-slate-600">
              Voor vragen of uitoefening van rechten: <a href="mailto:michael@xinudesign.be" className="underline-offset-2 hover:underline">michael@xinudesign.be</a>
            </p>
          </li>
        </ol>
      </div>
    </main>
  )
}

