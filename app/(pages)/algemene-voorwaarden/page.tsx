import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Algemene Voorwaarden | X3DPrints",
  description: "Voorwaarden voor offertes, bestellingen en leveringen bij X3DPrints.",
  alternates: { canonical: "https://www.x3dprints.be/algemene-voorwaarden" },
  openGraph: {
    title: "Algemene Voorwaarden | X3DPrints",
    description: "Voorwaarden voor offertes, bestellingen en leveringen bij X3DPrints.",
    url: "https://www.x3dprints.be/algemene-voorwaarden",
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export default function TermsPage() {
  return (
    <main className="px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Algemene Voorwaarden</h1>
        <ol className="mt-6 space-y-6 list-decimal pl-5">
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Toepassing</h2>
            <p className="mt-2 text-slate-600">
              Deze voorwaarden zijn van toepassing op alle offertes, bestellingen en overeenkomsten met X3DPrints,
              tenzij schriftelijk anders overeengekomen.
            </p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Offertes &amp; Bestellingen</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Offertes zijn 30 dagen geldig.</li>
              <li>Een overeenkomst komt tot stand na schriftelijke bevestiging of betaling van de klant.</li>
              <li>
                Aangeleverde 3D-bestanden (STL/STEP) blijven eigendom van de klant, maar X3DPrints is niet
                aansprakelijk voor schending van rechten van derden.
              </li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Leveringen &amp; Termijnen</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Levertermijnen zijn indicatief, vertraging geeft geen recht op schadevergoeding of annulatie.</li>
              <li>Verzending gebeurt op risico van de klant, tenzij anders overeengekomen.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Prijzen &amp; Betaling</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Alle prijzen zijn in euro, inclusief btw, tenzij anders vermeld.</li>
              <li>Betalingstermijn: 14 dagen na factuurdatum, tenzij anders overeengekomen.</li>
              <li>Bij laattijdige betaling: nalatigheidsintresten conform Wet van 2 augustus 2002 en administratiekosten.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Eigendomsvoorbehoud</h2>
            <p className="mt-2 text-slate-600">Geleverde goederen blijven eigendom van X3DPrints tot volledige betaling.</p>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Garantie &amp; Aansprakelijkheid</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>3D-prints zijn maatwerk en kunnen lichte toleranties of afwijkingen vertonen.</li>
              <li>X3DPrints garandeert een correcte uitvoering volgens best mogelijke technieken.</li>
              <li>Geen aansprakelijkheid voor indirecte schade (verlies van gegevens, winstderving).</li>
              <li>Aansprakelijkheid beperkt tot het factuurbedrag van de betrokken bestelling.</li>
            </ul>
          </li>
          <li>
            <h2 className="text-xl font-semibold text-slate-900">Intellectuele eigendom</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Alle door X3DPrints ontworpen modellen blijven eigendom van X3DPrints, tenzij anders schriftelijk overeengekomen.</li>
              <li>Klanten zijn verantwoordelijk voor de rechten op bestanden die zij aanleveren.</li>
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
            <h2 className="text-xl font-semibold text-slate-900">Overmacht</h2>
            <p className="mt-2 text-slate-600">
              X3DPrints is niet aansprakelijk bij overmacht (bv. storingen, vertragingen leveranciers, technische defecten).
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
    </main>
  )
}
