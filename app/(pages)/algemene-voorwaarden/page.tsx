import type { Metadata } from "next"

const canonical = "https://www.x3dprints.be/algemene-voorwaarden/"

export const metadata: Metadata = {
  title: "Algemene Voorwaarden | X3DPrints",
  description: "Voorwaarden voor offertes, bestellingen en leveringen bij X3DPrints.",
  alternates: { canonical },
  openGraph: {
    title: "Algemene Voorwaarden | X3DPrints",
    description: "Voorwaarden voor offertes, bestellingen en leveringen bij X3DPrints.",
    url: canonical,
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Algemene Voorwaarden",
  description: metadata.description ?? "",
  url: canonical,
  inLanguage: "nl-BE",
  isPartOf: {
    "@type": "WebSite",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
  },
}

export default function TermsPage() {
  return (
    <main className="px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Algemene Voorwaarden</h1>
        <ol className="mt-6 space-y-6 list-decimal pl-5">
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Identiteit van de verkoper</h2>
            <p className="mt-2 text-slate-600">
              X3DPrints (Redant, Michael), Provincieweg 34A, 9552 Herzele, België, btw-nummer BE1032.408.513
              (vrijgesteld van btw; geen btw-aanrekening).
              Contact:{" "}
              <a href="mailto:michael@xinudesign.be" className="underline-offset-2 hover:underline">
                michael@xinudesign.be
              </a>.
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Toepassing</h2>
            <p className="mt-2 text-slate-600">
              Deze voorwaarden zijn van toepassing op alle offertes, bestellingen en overeenkomsten met X3DPrints,
              tenzij schriftelijk anders overeengekomen.
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Offertes &amp; totstandkoming</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Offertes zijn 30 dagen geldig, tenzij anders vermeld.</li>
              <li>Een overeenkomst komt tot stand na schriftelijke bevestiging of betaling van de klant.</li>
              <li>Wijzigingen in specificaties of aantallen kunnen de prijs en planning aanpassen.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Prijzen &amp; betaling</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Alle prijzen zijn in euro; X3DPrints is vrijgesteld van btw en rekent geen btw aan.</li>
              <li>Betalingstermijn: 14 dagen na factuurdatum, tenzij anders overeengekomen.</li>
              <li>Bij laattijdige betaling: nalatigheidsintresten conform Wet van 2 augustus 2002 en administratiekosten.</li>
              <li>Voor maatwerk of grotere projecten kan een voorschot gevraagd worden.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Levering &amp; uitvoering</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Levertermijnen zijn indicatief; vertraging geeft geen recht op schadevergoeding of annulatie.</li>
              <li>Verzending gebeurt op risico van de klant, tenzij anders overeengekomen.</li>
              <li>De klant voorziet correcte levering- en contactgegevens.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Controle &amp; klachten</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Controleer de levering zo snel mogelijk na ontvangst.</li>
              <li>Zichtbare gebreken worden binnen 7 kalenderdagen schriftelijk gemeld.</li>
              <li>Voor consumenten blijven de wettelijke conformiteitsrechten onverminderd gelden.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Herroepingsrecht</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>
                Aangezien 3D-prints maatwerk zijn, geldt het wettelijke herroepingsrecht van 14 dagen niet (art. VI.53, 3° WER).
              </li>
              <li>Herroepingsrecht geldt wel voor standaardproducten/accessoires.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Intellectuele eigendom &amp; bestanden</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Aangeleverde 3D-bestanden blijven eigendom van de klant.</li>
              <li>De klant staat in voor alle rechten (o.a. auteurs-, licentie- en merkrechten) op aangeleverde bestanden en vrijwaart X3DPrints voor claims van derden.</li>
              <li>Door X3DPrints ontworpen modellen blijven eigendom van X3DPrints, tenzij anders schriftelijk overeengekomen.</li>
              <li>Gebruik van foto&apos;s voor portfolio gebeurt enkel met toestemming.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Aansprakelijkheid</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>3D-prints zijn maatwerk en kunnen lichte toleranties of afwijkingen vertonen.</li>
              <li>X3DPrints is niet aansprakelijk voor indirecte schade (verlies van gegevens, winstderving).</li>
              <li>Aansprakelijkheid is beperkt tot het factuurbedrag van de betrokken bestelling.</li>
              <li>Geen aansprakelijkheid voor foutief gebruik of toepassing buiten de afgesproken context.</li>
              <li>X3DPrints draagt geen verantwoordelijkheid voor de rechtmatigheid van aangeleverde 3D-modellen of licenties; de klant garandeert dat gebruik en reproductie legaal zijn en vrijwaart X3DPrints voor elke aanspraak hieromtrent.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Overmacht</h2>
            <p className="mt-2 text-slate-600">
              X3DPrints is niet aansprakelijk bij overmacht (bv. storingen, vertragingen bij leveranciers, technische defecten).
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Privacy &amp; vertrouwelijkheid</h2>
            <p className="mt-2 text-slate-600">
              We behandelen aangeleverde bestanden en informatie vertrouwelijk en gebruiken ze enkel voor de uitvoering van de
              opdracht. Meer info vind je in het privacybeleid.
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Toepasselijk recht &amp; geschillen</h2>
            <p className="mt-2 text-slate-600">
              Belgisch recht is van toepassing. Geschillen behoren tot de exclusieve bevoegdheid van de rechtbanken van Gent.
            </p>
          </li>
        </ol>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </main>
  )
}

