import type { Metadata } from "next"

const canonical = "https://www.x3dprints.be/cookies/"

export const metadata: Metadata = {
  title: "Cookiebeleid â€“ X3DPrints",
  description:
    "Lees hoe X3DPrints cookies inzet voor essentiÃ«le functies en anonieme analytics, met tips om je voorkeuren te beheren.",
  alternates: { canonical },
  openGraph: {
    title: "Cookiebeleid â€“ X3DPrints",
    description:
      "Lees hoe X3DPrints cookies inzet voor essentiÃ«le functies en anonieme analytics, met tips om je voorkeuren te beheren.",
    url: canonical,
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Cookiebeleid",
  description: metadata.description,
  url: canonical,
  inLanguage: "nl-BE",
  isPartOf: {
    "@type": "WebSite",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
  },
}

export default function CookiePolicyPage() {
  return (
    <main className="px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Cookiebeleid</h1>
          <p className="text-slate-600">
            Onze website gebruikt cookies om alles soepel te laten draaien en om geanonimiseerde statistieken te verzamelen.
            Hieronder lees je welke cookies dat zijn, waarom ze bestaan en hoe je je voorkeuren aanpast. We beloven dat we ze
            niet stiekem opeten â€“ hoe graag we echte koekjes ook hebben.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Wat zijn cookies?</h2>
          <p className="text-slate-600">
            Cookies zijn kleine tekstbestanden die op je toestel worden bewaard wanneer je onze site bezoekt. Ze helpen bij het
            onthouden van voorkeuren en het meten van websitegebruik. We gebruiken geen cookies om jou persoonlijk te volgen of
            te profileren.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Welke cookies gebruiken we?</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Noodzakelijke cookies</h3>
              <p className="text-slate-600">
                Deze cookies zijn nodig om de site te laten werken. Ze onthouden bijvoorbeeld of je de cookiebanner al hebt
                gesloten en bewaren je toestemmingskeuze. Zonder deze cookies verschijnt de banner bij elk bezoek opnieuw.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Analytische cookies</h3>
              <p className="text-slate-600">
                We gebruiken Google Analytics om inzicht te krijgen in bezoekersstromen, populaire pagina&apos;s en mogelijke
                foutmeldingen. Deze metingen zijn geanonimiseerd en worden pas gestart nadat je toestemming hebt gegeven in onze
                cookiebanner of via de cookie-instellingen.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Toestemming beheren</h2>
          <p className="text-slate-600">
            Bij je eerste bezoek vragen we toestemming via de cookiebanner. Je kunt deze keuze later eenvoudig wijzigen via de
            knop &ldquo;Cookie-instellingen&rdquo; in de footer. We slaan je voorkeur op voor maximaal 12 maanden, tenzij je je
            cookies eerder verwijdert.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Externe partijen</h2>
          <p className="text-slate-600">
            Google treedt voor de analytische cookies op als verwerker. We hebben een verwerkersovereenkomst gesloten en
            IP-adressen worden geanonimiseerd. Gegevens worden niet gedeeld met andere Google-diensten.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Cookies verwijderen of blokkeren</h2>
          <p className="text-slate-600">
            Wil je cookies verwijderen? Dan kan dat via de instellingen van je browser. Raadpleeg de hulppagina van Chrome,
            Firefox, Safari of Edge voor stapsgewijze uitleg. Houd er rekening mee dat sommige functies van de website minder
            goed kunnen werken zonder noodzakelijke cookies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Vragen of zin in echte koekjes?</h2>
          <p className="text-slate-600">
            Heb je vragen over dit cookiebeleid of wil je je rechten uitoefenen? Neem dan contact op via
            {" "}
            <a href="mailto:michael@xinudesign.be" className="underline-offset-2 hover:underline">
              michael@xinudesign.be
            </a>
            . Voor fysieke koekjes ben je uiteraard ook welkom, maar die bewaren we liever in de keuken dan in je browser.
          </p>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </main>
  )
}

