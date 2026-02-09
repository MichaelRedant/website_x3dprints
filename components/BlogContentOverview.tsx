import GlassCard from "@/components/GlassCard"
import ContentTableOfContents from "@/components/ContentTableOfContents"

const COPY = {
  en: {
    tocTitle: "On this page",
    tocItems: [
      { id: "content-overview", label: "Overview" },
      { id: "key-choices", label: "Key choices at a glance" },
      { id: "sources", label: "Sources and references" },
    ],
    tableTitle: "Key choices at a glance",
    headers: ["Choice", "When to pick it", "Impact"],
    rows: [
      {
        choice: "Material",
        when: "Based on strength, finish and heat needs",
        impact: "Sets durability, feel and long-term performance",
      },
      {
        choice: "File format (STL vs STEP)",
        when: "STL for fixed geometry, STEP if changes are likely",
        impact: "Controls editability and revision speed",
      },
      {
        choice: "Finishing level",
        when: "Raw for speed, sanded/painted for presentation",
        impact: "Affects price, lead time and final appearance",
      },
    ],
    note: "Use this matrix as a quick decision guide before you dive into the details below.",
  },
  nl: {
    tocTitle: "Op deze pagina",
    tocItems: [
      { id: "content-overview", label: "Overzicht" },
      { id: "key-choices", label: "Belangrijkste keuzes" },
      { id: "sources", label: "Bronnen en referenties" },
    ],
    tableTitle: "Belangrijkste keuzes in 1 oogopslag",
    headers: ["Keuze", "Wanneer kiezen", "Impact"],
    rows: [
      {
        choice: "Materiaal",
        when: "Op basis van sterkte, finish en temperatuur",
        impact: "Bepaalt duurzaamheid, gevoel en prestaties",
      },
      {
        choice: "Bestandsformaat (STL vs STEP)",
        when: "STL voor vaste vorm, STEP als wijzigingen nodig zijn",
        impact: "Bepaalt aanpasbaarheid en revisiesnelheid",
      },
      {
        choice: "Nabewerking",
        when: "Ruw voor snelheid, geschuurd/geverfd voor presentatie",
        impact: "Heeft invloed op prijs, timing en look",
      },
    ],
    note: "Gebruik dit schema als snelle leidraad voordat je de details hieronder leest.",
  },
} as const

type BlogContentOverviewProps = {
  locale: "nl" | "en"
}

export default function BlogContentOverview({ locale }: BlogContentOverviewProps) {
  const copy = COPY[locale]

  return (
    <section id="content-overview" className="px-6 pb-12 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <ContentTableOfContents title={copy.tocTitle} items={copy.tocItems} />
        <GlassCard id="key-choices" className="border border-white/40 bg-white/85 p-5 shadow-lg backdrop-blur">
          <h2 className="text-2xl font-semibold text-slate-900">{copy.tableTitle}</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-[360px] text-sm text-slate-700">
              <thead>
                <tr className="text-left text-slate-500">
                  {copy.headers.map((header) => (
                    <th key={header} className="py-2 pr-4 font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {copy.rows.map((row) => (
                  <tr key={row.choice} className="border-t border-slate-200/70">
                    <td className="py-2 pr-4 font-medium text-slate-900">{row.choice}</td>
                    <td className="py-2 pr-4">{row.when}</td>
                    <td className="py-2 pr-4">{row.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            {copy.note}
          </p>
        </GlassCard>
      </div>
    </section>
  )
}
