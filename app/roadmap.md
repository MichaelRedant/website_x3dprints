SEO Roadmap - Sitewide Audit & Reset (excl. locaties)

Datum: 2026-02-09
Scope: Alle pagina's behalve locatiepagina's en lokale slugs.
Methodiek: Code-scan van metadata, schema, content-structuur, interne links, robots/sitemap. Geen build of runtime checks uitgevoerd op dit apparaat.

Kernstats (code-scan)
- Blogposts totaal: 116 (NL 62, EN 54).
- Blogposts met Article JSON-LD in pagina of gedeeld content-bestand: 116/116.
- Blogposts met FAQ JSON-LD via `buildFaqPageSchema` of `BlogFaq`: 112/116 (uitzonderingen = index/wrappers).
- Blogposts met "Laatst bijgewerkt"/"Last updated": 112/116 (uitzonderingen = index/wrappers).
- Blogposts met bronnen-sectie (`<cite>`): NL 60/62, EN 5/54.
- Blogposts met tabel (`<table>`): NL 55/62, EN 16/54.
- Segmentpagina's (NL): 11/11 met FAQ schema + bronnen.
- Bilingual parity: 8 NL high‑intent posts zonder EN equivalent.

Executive summary
- Technische basis staat goed: metadata aanwezig op vrijwel alle routes, sitemap/robots consistent, money pages hebben schema coverage en bronnen.
- Grootste SEO-winst zit in content-pariteit en GEO-structuur voor EN content (bronnen + tabellen) en in schema-governance (inline vs helpers).
- Interne linkflow is sterk op money pages, maar kan consistenter door ReadMoreLinks ook op blogposts te gebruiken.

Audit - kernbevindingen
1) Crawl & indexatie
- `app/robots.ts` en `app/sitemap.ts` zijn aanwezig en consistent met alternates + lastModified.
- `/crm` is uitgesloten van indexing via robots + noindex layout. OK.
- Geen build/run validations uitgevoerd; status van `npm run check:seo` onbekend op dit apparaat.

2) Metadata & alternates
- Alle blogposts hebben metadata; dynamische routes gebruiken `generateMetadata`.
- Core money pages hebben metadata + OG.
- Volledige hreflang/alternate coverage niet geverifieerd via scripts.

3) Schema coverage & governance
- Money pages (services/pricing/materials/portfolio/contact/segments) gebruiken helper-gebaseerde schema’s.
- Inline schema objecten bestaan nog in o.a. `app/layout.tsx`, `app/(pages)/portfolio/page.tsx` en `app/(pages)/blog/BlogPage.tsx`.
- `BlogFaq` gebruikt helpers, maar zet geen `mainEntityOfPage` (kan consistentie verbeteren).

4) Content-structuur (GEO)
- NL longform posts zijn grotendeels compliant (TOC/H2-anchors, tabellen, bronnen, last-updated).
- EN content mist vaak bronnen en tabellen (bronnen: 5/54, tabellen: 16/54).
- Dit verlaagt topical authority en kan rich result kansen beperken op EN slugs.

5) Interne linkflow
- ReadMoreLinks staat op money pages en segment detailpages.
- Veel blogposts hebben geen ReadMoreLinks of centrale mapping (opportunity voor consistent interne link-mesh).

6) Bilingual parity
- 8 NL high-intent gidsen hebben geen EN variant (o.a. kosten- en materiaalclusters).
- Twee EN slugs hebben enkel een andere slugnaam t.o.v. NL (Gridfinity/Tool organizers) maar zijn inhoudelijk wél vertaald.

Roadmap (reset)
P0 - Maximaal SEO effect (0-2 weken)
- EN blogposts upgraden naar GEO-structuur: voeg bronnen-sectie met `<cite>` en minstens 1 tabel toe op alle EN longform posts zonder deze elementen.
- BlogFAQ schema consistent maken door `mainEntityOfPage` door te geven (via `BlogFaq` props) op alle posts met FAQ.
- Run `npm run check:seo` op een zwaardere machine en registreer issues (metadata, schema, links, locale parity).

P1 - Governance & schaal (2-6 weken)
- Verplaats inline schema’s naar helper-fabrieken:
  - Blog index ItemList/Blog schema → nieuwe helper in `lib/seo.ts`.
  - Portfolio ImageObject/VideoObject → helper(s) of uitbreiden bestaande helpers.
  - LocalBusiness in `app/layout.tsx` → `buildLocalBusinessSchema` uitbreiden met geo/hasMap om inline te vermijden.
- ReadMoreLinks standaardiseren op alle blogposts (pageType = "blog") voor consistente interne linkflow.

P2 - Groei & content (6-12 weken)
- Vertaal 8 NL high‑intent gidsen naar EN en voeg canonical + alternates.
- Voeg kwartale refresh planning toe voor top-20 blogposts (nieuwe bronnen, interne links, CTA updates).
- Maak 3 nieuwe “pillar” artikelen (pricing/materials/design) met extra FAQ + HowTo schema en link naar segmenten.

Openstaande assumpties
- Geen build of Lighthouse checks uitgevoerd op dit apparaat.
- Audit gebaseerd op code-scan (geen runtime of SERP-data).
