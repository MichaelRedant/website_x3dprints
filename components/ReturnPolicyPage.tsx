import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import {
  SITE,
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildLocalBusinessSchema,
  buildMerchantReturnPolicySchema,
} from "@/lib/seo"

export const RETURN_POLICY_DATE_MODIFIED = "2026-04-21"

type ReturnPolicyLocale = "nl" | "en"

type TocItem = {
  id: string
  label: string
}

type PolicyRow = {
  situation: string
  outcome: string
  practical: string
}

type PolicySource = {
  label: string
  href: string
}

type PolicyCopy = {
  canonical: string
  alternate: string
  metadataTitle: string
  metadataDescription: string
  pageName: string
  kicker: string
  updatedLabel: string
  lead: string
  tocTitle: string
  toc: TocItem[]
  tableTitle: string
  tableIntro: string
  tableHeaders: {
    situation: string
    outcome: string
    practical: string
  }
  tableRows: PolicyRow[]
  standardTitle: string
  standardBody: string[]
  customTitle: string
  customBody: string[]
  processTitle: string
  processBody: string[]
  defectsTitle: string
  defectsBody: string[]
  b2bTitle: string
  b2bBody: string[]
  contactTitle: string
  contactBody: string
  contactPrimary: string
  contactSecondary: string
  faqTitle: string
  faqItems: { q: string; a: string }[]
  sourcesTitle: string
  sourcesIntro: string
  sources: PolicySource[]
}

const COPY: Record<ReturnPolicyLocale, PolicyCopy> = {
  nl: {
    canonical: `${SITE.url}/retour-herroepingsrecht/`,
    alternate: `${SITE.url}/en/retour-herroepingsrecht/`,
    metadataTitle: "Retour & herroepingsrecht shop | X3DPrints",
    metadataDescription:
      "Duidelijk beleid voor retour, herroepingsrecht, maatwerkuitzonderingen en defecte shopproducten bij X3DPrints.",
    pageName: "Retour & herroepingsrecht",
    kicker: "Shopbeleid",
    updatedLabel: "Laatst bijgewerkt: 21 april 2026",
    lead:
      "Voor standaard shopproducten die consumenten op afstand kopen, geldt in principe een herroepingstermijn van 14 kalenderdagen. Voor maatwerk of duidelijk gepersonaliseerde goederen kan het herroepingsrecht wettelijk uitgesloten zijn. Bij fout geleverde of defecte producten blijven de wettelijke conformiteitsrechten gelden.",
    tocTitle: "Inhoud",
    toc: [
      { id: "samenvatting", label: "Samenvatting per situatie" },
      { id: "standaardproducten", label: "Standaard shopproducten voor consumenten" },
      { id: "maatwerk", label: "Maatwerk en gepersonaliseerde bestellingen" },
      { id: "proces", label: "Hoe een herroeping praktisch verloopt" },
      { id: "defecten", label: "Defect, fout geleverd of niet conform" },
      { id: "b2b", label: "B2B-bestellingen" },
      { id: "contact", label: "Contact en opvolging" },
      { id: "bronnen", label: "Bronnen" },
    ],
    tableTitle: "Samenvatting per situatie",
    tableIntro:
      "Gebruik deze tabel als snelle leidraad. De concrete beoordeling hangt altijd af van het type product, de bestelling en of je als consument of onderneming koopt.",
    tableHeaders: {
      situation: "Situatie",
      outcome: "Wat geldt in principe",
      practical: "Praktische betekenis",
    },
    tableRows: [
      {
        situation: "Standaard voorraadproduct voor consument",
        outcome: "14 dagen herroepingsrecht bij verkoop op afstand",
        practical:
          "Voor standaard shopproducten werken we in principe met het wettelijke herroepingsrecht, tenzij een specifieke wettelijke uitzondering geldt.",
      },
      {
        situation: "Goederen op maat volgens jouw specificaties of duidelijk gepersonaliseerd",
        outcome: "Wettelijke uitzondering mogelijk",
        practical:
          "Voor echt maatwerk of duidelijk gepersonaliseerde bestellingen kan het herroepingsrecht wettelijk uitgesloten zijn.",
      },
      {
        situation: "Defect, fout geleverd of niet conform",
        outcome: "Wettelijke conformiteitsrechten",
        practical:
          "Dan gaat het niet over een gewone retour om van mening te veranderen, maar over herstel, vervanging, prijsvermindering of passende oplossing.",
      },
      {
        situation: "B2B-bestelling of offerte op naam van onderneming",
        outcome: "Contractuele regeling",
        practical:
          "Voor ondernemingen kijken we eerst naar offerte, bevestiging, productspecificaties en afgesproken levervoorwaarden.",
      },
    ],
    standardTitle: "Standaard shopproducten voor consumenten",
    standardBody: [
      "Voor standaard producten uit de shop die je als consument op afstand koopt, vertrekken we van het wettelijke kader voor herroeping bij online verkoop. Dat betekent in principe een termijn van 14 kalenderdagen vanaf ontvangst.",
      "Dit is ook relevant voor shopproducten die tweedehands of uit reststock komen, zolang het om een verkoop door een onderneming aan een consument gaat. De juridische basis verandert niet alleen omdat een product gebruikt of beperkt op voorraad is.",
      "Een herroeping betekent niet automatisch dat elk product zonder meer terug kan zonder opvolging. We vragen altijd eerst een bericht met ordergegevens, zodat we retourinstructies, adres en verdere afhandeling correct kunnen bevestigen.",
    ],
    customTitle: "Maatwerk en gepersonaliseerde bestellingen",
    customBody: [
      "Voor goederen die volgens jouw specificaties worden gemaakt of duidelijk gepersonaliseerd zijn, kan het wettelijke herroepingsrecht niet van toepassing zijn. Denk aan producten die inhoudelijk op jouw maat, maatvoering, merk, project of unieke configuratie zijn uitgewerkt.",
      "Niet elk product dat pas na aanvraag of pas na betaling wordt geproduceerd, is daarom automatisch maatwerk in juridische zin. Het verschil zit in de mate waarin het product echt op jouw specifieke vraag is afgestemd.",
      "Twijfel je of jouw aanvraag als standaardproduct of als maatwerk wordt behandeld, dan vermelden we dat best expliciet in de offerte- of orderbevestiging.",
    ],
    processTitle: "Hoe een herroeping praktisch verloopt",
    processBody: [
      "Stuur eerst een bericht via <a href=\"/contact\" class=\"font-semibold text-indigo-600 underline-offset-2 hover:underline\">contact</a> met je naam, ordergegevens, product en datum van ontvangst. Zo vermijden we retouren zonder context of foutieve zendingen.",
      "Na je melding bezorgen we de praktische instructies voor retour of verdere beoordeling. Bij gewone herroeping van een standaardproduct gaan we uit van een duidelijke en snelle afhandeling, zonder dat dit afbreuk doet aan eventuele wettelijke uitzonderingen.",
      "Tenzij we schriftelijk anders bevestigen, ga je er best van uit dat de rechtstreekse retourkost bij gewone herroeping van een standaardproduct voor rekening van de consument is.",
    ],
    defectsTitle: "Defect, fout geleverd of niet conform",
    defectsBody: [
      "Bij een fout geleverd product, transportschade, een defect of een product dat niet overeenstemt met wat bevestigd werd, spreken we niet over een gewone retour omdat je van mening veranderde. Dan bekijken we de situatie onder het kader van conformiteit en correcte levering.",
      "Neem in dat geval zo snel mogelijk contact op, liefst met duidelijke foto's, omschrijving van het probleem en je ordergegevens. Dan kunnen we gericht beoordelen of herstel, vervanging, prijsaanpassing of een andere oplossing aangewezen is.",
      "Deze rechten staan los van de gewone herroepingstermijn voor standaard online aankopen.",
    ],
    b2bTitle: "B2B-bestellingen",
    b2bBody: [
      "Deze pagina is in de eerste plaats geschreven voor consumentenbestellingen via de shop. Voor ondernemingen, verenigingen, overheden of professionele toepassingen primeert de offerte- en orderbevestiging.",
      "Bij B2B-orders kijken we dus eerst naar de afgesproken specificaties, aantallen, levervoorwaarden, het al dan niet maatwerk-karakter en eventuele schriftelijke afwijkingen.",
    ],
    contactTitle: "Contact en opvolging",
    contactBody:
      "Voor vragen over een shopproduct, een lopende aanvraag of een retourmelding reageren we best vanuit een concreet order- of offerteoverzicht. Zo blijft de afhandeling werkbaar en vermijd je misverstanden.",
    contactPrimary: "Contacteer ons over een shoporder",
    contactSecondary: "Terug naar de shop",
    faqTitle: "Veelgestelde vragen over retour en herroeping",
    faqItems: [
      {
        q: "Geldt dit ook voor de shopproducten die nu live staan?",
        a: "Voor standaard shopproducten voor consumenten vertrekken we in principe van het gewone wettelijke kader voor online aankopen. Als een product of aanvraag onder een wettelijke maatwerkuitzondering valt, communiceren we dat best expliciet in de offerte of bevestiging.",
      },
      {
        q: "Is een product automatisch maatwerk omdat het pas na aanvraag wordt geproduceerd?",
        a: "Nee. Niet elk product dat pas na aanvraag of pas na betaling gemaakt wordt, is automatisch maatwerk in juridische zin. De vraag is vooral of het product werkelijk volgens jouw specifieke instructies of personalisatie wordt gemaakt.",
      },
      {
        q: "Wie betaalt de retourkost bij gewone herroeping?",
        a: "Bij een gewone herroeping van een standaard online aankoop ga je er best van uit dat de rechtstreekse retourkost voor rekening van de consument is, tenzij we schriftelijk iets anders bevestigen.",
      },
      {
        q: "Wat als het product defect is of niet overeenstemt met de bestelling?",
        a: "Dan gaat het niet om een gewone retour omdat je van mening veranderde. In dat geval bekijken we het onder het kader van conforme levering en wettelijke rechten bij een fout of defect product.",
      },
      {
        q: "Geldt dit beleid ook voor B2B-bestellingen?",
        a: "Voor ondernemingen, verenigingen en professionele bestellingen kijken we eerst naar offerte, orderbevestiging en afgesproken voorwaarden. Deze pagina focust vooral op consumentenbestellingen via de shop.",
      },
    ],
    sourcesTitle: "Bronnen",
    sourcesIntro:
      "Deze pagina is geschreven als praktische samenvatting voor klanten. Voor de formele wettelijke context en Google merchant-richtlijnen verwijzen we naar de volgende primaire bronnen:",
    sources: [
      {
        label: "FOD Economie - herroepingsrecht bij aankoop op afstand",
        href: "https://economie.fgov.be/nl/themas/verkoop/reglementering/herroepingstermijnen/herroepingsrecht-bij-aankoop",
      },
      {
        label: "Your Europe - consumentrechten en 14 dagen herroeping",
        href: "https://europa.eu/youreurope/citizens/consumers/shopping/shopping-consumer-rights/index_en.htm",
      },
      {
        label: "Your Europe - uitzondering voor tailor-made of gepersonaliseerde goederen",
        href: "https://europa.eu/youreurope/business/selling-in-eu/selling-goods-services/ecommerce-distance-selling/index_en.htm",
      },
      {
        label: "Google Search Central - MerchantReturnPolicy structured data",
        href: "https://developers.google.com/search/docs/appearance/structured-data/return-policy",
      },
      {
        label: "Google Merchant Center Help - duidelijke return/refund policy",
        href: "https://support.google.com/merchants/answer/6150127",
      },
    ],
  },
  en: {
    canonical: `${SITE.url}/en/retour-herroepingsrecht/`,
    alternate: `${SITE.url}/retour-herroepingsrecht/`,
    metadataTitle: "Returns & withdrawal policy | X3DPrints",
    metadataDescription:
      "Clear returns, withdrawal, custom-order exceptions, and faulty-product policy for the X3DPrints shop.",
    pageName: "Returns & withdrawal policy",
    kicker: "Shop policy",
    updatedLabel: "Last updated: April 21, 2026",
    lead:
      "For standard shop products bought online by consumers, we start from the regular 14-day withdrawal framework. For custom-made or clearly personalised goods, the legal withdrawal right may be excluded. If a product is faulty or delivered incorrectly, statutory conformity rights still apply.",
    tocTitle: "Contents",
    toc: [
      { id: "summary", label: "Summary by situation" },
      { id: "standard-products", label: "Standard shop products for consumers" },
      { id: "custom-orders", label: "Custom-made and personalised orders" },
      { id: "process", label: "How withdrawal works in practice" },
      { id: "faulty-products", label: "Faulty, wrong, or non-conforming products" },
      { id: "b2b", label: "B2B orders" },
      { id: "contact", label: "Contact and follow-up" },
      { id: "sources", label: "Sources" },
    ],
    tableTitle: "Summary by situation",
    tableIntro:
      "Use this table as a quick reference. The final assessment always depends on the exact product, order, and whether you buy as a consumer or as a business.",
    tableHeaders: {
      situation: "Situation",
      outcome: "What generally applies",
      practical: "Practical meaning",
    },
    tableRows: [
      {
        situation: "Standard stocked product bought by a consumer",
        outcome: "14-day withdrawal right for distance selling",
        practical:
          "For standard shop products, we generally follow the ordinary statutory withdrawal framework unless a specific legal exception applies.",
      },
      {
        situation: "Goods made to your specifications or clearly personalised",
        outcome: "Legal exception may apply",
        practical:
          "For genuine custom-made or clearly personalised orders, the statutory withdrawal right may be excluded.",
      },
      {
        situation: "Faulty, wrongly delivered, or non-conforming product",
        outcome: "Statutory conformity rights",
        practical:
          "This is not a normal return because you changed your mind. It becomes a matter of repair, replacement, price reduction, or another suitable solution.",
      },
      {
        situation: "B2B order or quote issued to a company",
        outcome: "Contractual framework",
        practical:
          "For businesses, we first look at the quote, confirmation, product specifications, and agreed delivery terms.",
      },
    ],
    standardTitle: "Standard shop products for consumers",
    standardBody: [
      "For standard shop products bought remotely by a consumer, we start from the regular statutory withdrawal framework for online sales. In principle this means a 14-day period from the moment of receipt.",
      "This also matters for second-hand or leftover-stock products offered through the shop. The legal context does not disappear only because a product is used or available in limited quantity.",
      "A withdrawal does not mean that every product should simply be sent back without prior follow-up. We always ask for a message with your order details first so we can confirm the correct return instructions and practical handling.",
    ],
    customTitle: "Custom-made and personalised orders",
    customBody: [
      "For goods made to your specifications or clearly personalised, the statutory withdrawal right may not apply. Think of products that are truly made around your dimensions, branding, project-specific details, or other unique configuration.",
      "Not every product that is only produced after request or after payment automatically becomes custom-made in the legal sense. The real question is whether it is genuinely tailored to your specific instructions.",
      "If there is any doubt about whether your order should be treated as a standard product or as custom-made work, we should make that explicit in the quote or order confirmation.",
    ],
    processTitle: "How withdrawal works in practice",
    processBody: [
      "First contact us through <a href=\"/en/contact\" class=\"font-semibold text-indigo-600 underline-offset-2 hover:underline\">contact</a> with your name, order details, product, and delivery date. That keeps the follow-up workable and avoids returns without context.",
      "After your message, we confirm the practical return steps or the next review stage. For a normal withdrawal of a standard product, we aim for a clear and workable process without limiting any applicable statutory rights.",
      "Unless we confirm otherwise in writing, you should assume that the direct return cost for a normal withdrawal of a standard product remains with the consumer.",
    ],
    defectsTitle: "Faulty, wrong, or non-conforming products",
    defectsBody: [
      "If a product was delivered incorrectly, damaged in transport, faulty, or does not match what was confirmed, this is not the same as an ordinary return because you changed your mind. In that case we assess it under the framework of conformity and correct delivery.",
      "Contact us as soon as possible, ideally with clear photos, a short description of the issue, and your order details. That lets us decide whether repair, replacement, a price adjustment, or another practical solution is appropriate.",
      "These rights are separate from the standard withdrawal period for ordinary online consumer purchases.",
    ],
    b2bTitle: "B2B orders",
    b2bBody: [
      "This page is primarily written for consumer orders placed through the shop. For companies, associations, public bodies, or professional applications, the quote and order confirmation take priority.",
      "For B2B work we therefore first look at the agreed specifications, quantities, delivery terms, whether the job is custom-made, and any written deviations.",
    ],
    contactTitle: "Contact and follow-up",
    contactBody:
      "For questions about a shop product, a running inquiry, or a return-related issue, it is best to contact us with a concrete order or quote reference. That keeps follow-up efficient and reduces misunderstandings.",
    contactPrimary: "Contact us about a shop order",
    contactSecondary: "Back to the shop",
    faqTitle: "Frequently asked questions about returns and withdrawal",
    faqItems: [
      {
        q: "Does this also apply to the products currently live in the shop?",
        a: "For standard consumer-facing shop products, we generally start from the ordinary legal framework for online sales. If a product or request falls under a lawful custom-made exception, that should be made explicit in the quote or confirmation.",
      },
      {
        q: "Is a product automatically custom-made because it is only produced after request?",
        a: "No. A product does not automatically become custom-made in the legal sense only because it is produced after a request or after payment. The real question is whether it is genuinely made to your specific instructions or personalisation.",
      },
      {
        q: "Who pays the return shipping cost for a normal withdrawal?",
        a: "For a normal withdrawal of a standard online purchase, you should generally assume that the direct return cost remains with the consumer unless we confirm something else in writing.",
      },
      {
        q: "What if the product is faulty or does not match the order?",
        a: "Then it is not a normal return because you changed your mind. In that case we look at it under the framework of correct delivery and statutory rights for a faulty or non-conforming product.",
      },
      {
        q: "Does this policy also apply to B2B orders?",
        a: "For companies, associations, and professional orders, we first look at the quote, order confirmation, and agreed conditions. This page is mainly focused on consumer orders placed through the shop.",
      },
    ],
    sourcesTitle: "Sources",
    sourcesIntro:
      "This page is written as a practical customer summary. For the formal legal context and Google merchant guidance, refer to the following primary sources:",
    sources: [
      {
        label: "Belgian FPS Economy - withdrawal right for distance purchases",
        href: "https://economie.fgov.be/nl/themas/verkoop/reglementering/herroepingstermijnen/herroepingsrecht-bij-aankoop",
      },
      {
        label: "Your Europe - consumer rights and 14-day withdrawal",
        href: "https://europa.eu/youreurope/citizens/consumers/shopping/shopping-consumer-rights/index_en.htm",
      },
      {
        label: "Your Europe - exception for tailor-made or personalised goods",
        href: "https://europa.eu/youreurope/business/selling-in-eu/selling-goods-services/ecommerce-distance-selling/index_en.htm",
      },
      {
        label: "Google Search Central - MerchantReturnPolicy structured data",
        href: "https://developers.google.com/search/docs/appearance/structured-data/return-policy",
      },
      {
        label: "Google Merchant Center Help - clear return/refund policy",
        href: "https://support.google.com/merchants/answer/6150127",
      },
    ],
  },
}

function getPrefix(locale: ReturnPolicyLocale) {
  return locale === "en" ? "/en" : ""
}

export function getReturnPolicyMetadata(locale: ReturnPolicyLocale): Metadata {
  const copy = COPY[locale]

  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    alternates: {
      canonical: copy.canonical,
      languages: {
        "nl-BE": COPY.nl.canonical,
        "en-BE": COPY.en.canonical,
        "x-default": COPY.nl.canonical,
      },
    },
    openGraph: {
      title: copy.metadataTitle,
      description: copy.metadataDescription,
      url: copy.canonical,
      locale: locale === "en" ? "en_BE" : "nl_BE",
      siteName: "X3DPrints",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metadataTitle,
      description: copy.metadataDescription,
    },
  }
}

export default function ReturnPolicyPage({ locale }: { locale: ReturnPolicyLocale }) {
  const copy = COPY[locale]
  const prefix = getPrefix(locale)
  const inLanguage = locale === "en" ? "en-BE" : "nl-BE"
  const homeUrl = locale === "en" ? `${SITE.url}/en/` : `${SITE.url}/`
  const contactHref = `${prefix}/contact?quote=${encodeURIComponent(locale === "en" ? "Return policy question" : "Vraag over retour en herroeping")}`
  const shopHref = `${prefix}/shop`
  const sectionIds = {
    summary: copy.toc[0].id,
    standard: copy.toc[1].id,
    custom: copy.toc[2].id,
    process: copy.toc[3].id,
    defects: copy.toc[4].id,
    b2b: copy.toc[5].id,
    contact: copy.toc[6].id,
    sources: copy.toc[7].id,
  }

  const faqJsonLd = buildFaqPageSchema({
    items: copy.faqItems,
    inLanguage,
    mainEntityOfPage: copy.canonical,
  })

  const breadcrumbJsonLd = buildBreadcrumbSchema({
    id: `${copy.canonical}#breadcrumb`,
    inLanguage,
    items: [
      { name: "Home", url: homeUrl },
      { name: copy.pageName, url: copy.canonical },
    ],
  })

  const merchantReturnPolicy = buildMerchantReturnPolicySchema({
    applicableCountry: "BE",
    merchantReturnDays: 14,
    merchantReturnLink: copy.canonical,
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    inLanguage,
  })

  const businessJsonLd = {
    ...buildLocalBusinessSchema({
      id: `${SITE.url}#return-policy-business`,
      pageUrl: SITE.url,
      inLanguage,
      sameAs: SITE.sameAs,
      hasMerchantReturnPolicy: merchantReturnPolicy,
    }),
    mainEntityOfPage: copy.canonical,
  }

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.pageName,
    description: copy.metadataDescription,
    url: copy.canonical,
    inLanguage,
    dateModified: RETURN_POLICY_DATE_MODIFIED,
    isPartOf: {
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
    },
  }

  return (
    <main className="px-6 pb-16 pt-20 sm:px-8 lg:px-12 xl:pb-20">
      <div className="mx-auto max-w-[96rem] 2xl:max-w-[108rem]">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 sm:p-8 xl:p-10">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-200/45 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 left-8 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />
            <div className="relative min-w-0 md:text-center lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">{copy.kicker}</p>
              <h1 className="mt-4 break-words text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">
                {copy.pageName}
              </h1>
              <p className="mt-4 max-w-4xl break-words text-lg text-slate-600 md:mx-auto lg:mx-0">{copy.lead}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.updatedLabel}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-center lg:justify-start">
                <Link
                  href={contactHref}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)] px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:brightness-110 sm:w-auto"
                >
                  {copy.contactPrimary}
                </Link>
                <Link
                  href={shopHref}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 sm:w-auto"
                >
                  {copy.contactSecondary}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,0.28fr)]">
          <Reveal>
            <GlassCard className="min-w-0 md:text-center lg:text-left">
              <h2 id={sectionIds.summary} className="text-2xl font-extrabold text-slate-900">{copy.tableTitle}</h2>
              <p className="mt-3 max-w-3xl break-words text-sm text-slate-600 md:mx-auto lg:mx-0">{copy.tableIntro}</p>
              <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-100 bg-white/70">
                <table className="min-w-[720px] w-full text-left text-sm text-slate-700">
                  <thead className="border-b border-slate-200 bg-slate-50/80">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-slate-900">{copy.tableHeaders.situation}</th>
                      <th className="px-4 py-3 font-semibold text-slate-900">{copy.tableHeaders.outcome}</th>
                      <th className="px-4 py-3 font-semibold text-slate-900">{copy.tableHeaders.practical}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {copy.tableRows.map((row) => (
                      <tr key={row.situation} className="border-b border-slate-100 last:border-b-0">
                        <th className="px-4 py-3 align-top font-semibold text-slate-900">{row.situation}</th>
                        <td className="px-4 py-3 align-top break-words">{row.outcome}</td>
                        <td className="px-4 py-3 align-top break-words">{row.practical}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal>
            <GlassCard className="min-w-0 md:text-center lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{copy.tocTitle}</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {copy.toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="inline-flex break-words font-medium text-indigo-600 transition hover:text-indigo-500">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <Reveal>
            <GlassCard className="min-w-0 md:text-center lg:text-left">
              <h2 id={sectionIds.standard} className="text-xl font-semibold text-slate-900">
                {copy.standardTitle}
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                {copy.standardBody.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          <Reveal>
            <GlassCard className="min-w-0 md:text-center lg:text-left">
              <h2 id={sectionIds.custom} className="text-xl font-semibold text-slate-900">
                {copy.customTitle}
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                {copy.customBody.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          <Reveal>
            <GlassCard className="min-w-0 md:text-center lg:text-left">
              <h2 id={sectionIds.process} className="text-xl font-semibold text-slate-900">
                {copy.processTitle}
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                {copy.processBody.map((paragraph) => (
                  <p key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
            </GlassCard>
          </Reveal>

          <Reveal>
            <GlassCard className="min-w-0 md:text-center lg:text-left">
              <h2 id={sectionIds.defects} className="text-xl font-semibold text-slate-900">
                {copy.defectsTitle}
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                {copy.defectsBody.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          <Reveal>
            <GlassCard className="min-w-0 md:text-center lg:text-left">
              <h2 id={sectionIds.b2b} className="text-xl font-semibold text-slate-900">
                {copy.b2bTitle}
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                {copy.b2bBody.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          <Reveal>
            <GlassCard className="min-w-0 md:text-center lg:text-left">
              <h2 id={sectionIds.contact} className="text-xl font-semibold text-slate-900">
                {copy.contactTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{copy.contactBody}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-center lg:justify-start">
                <Link
                  href={contactHref}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 sm:w-auto"
                >
                  {copy.contactPrimary}
                </Link>
                <Link
                  href={shopHref}
                  className="inline-flex w-full items-center justify-center gap-2 text-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 sm:w-auto"
                >
                  {copy.contactSecondary}
                  <span className="i-lucide-arrow-right" aria-hidden />
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>

        <div className="mt-8">
          <Faq items={copy.faqItems} title={copy.faqTitle} className="max-w-none" />
        </div>

        <Reveal>
          <GlassCard className="mt-8 min-w-0 md:text-center lg:text-left">
            <h2 id={sectionIds.sources} className="text-xl font-semibold text-slate-900">
              {copy.sourcesTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{copy.sourcesIntro}</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {copy.sources.map((source) => (
                <li key={source.href}>
                  <cite className="not-italic">
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-indigo-600 underline-offset-2 transition hover:text-indigo-500 hover:underline"
                    >
                      {source.label}
                    </a>
                  </cite>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
    </main>
  )
}
