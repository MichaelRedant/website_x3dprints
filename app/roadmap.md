SEO Roadmap - Sitewide Audit & Reset (excl. locaties)

Datum: 2026-02-09
Scope: Alle pagina's behalve locatiepagina's en lokale slugs.
Methodiek: Code-scan van metadata, schema, content-structuur, interne links, robots/sitemap + `npm run check:seo`.

Kernstats (code-scan)
- Blogposts totaal: 128 (NL 64, EN 64).
- Blogposts met Article JSON-LD in pagina of gedeeld content-bestand: 126/128.
- Blogposts met FAQ JSON-LD via `buildFaqPageSchema` of `BlogFaq`: 126/128 (uitzonderingen = index/wrappers).
- Blogposts met "Laatst bijgewerkt"/"Last updated": 126/128 (uitzonderingen = index/wrappers).
- Blogposts met bronnen-sectie (`<cite>`): NL 63/64, EN 63/64 (EN uitzondering = octopus wrapper gebruikt gedeeld content-bestand).
- Blogposts met tabel (`<table>`): NL 58/64, EN 27/64 (tabels in gedeelde componenten tellen niet mee in deze scan).
- Segmentpagina's (NL): 11/11 met FAQ schema + bronnen.
- Bilingual parity: 0 NL high-intent posts zonder EN equivalent.

Executive summary
- Technische basis staat goed: metadata aanwezig op vrijwel alle routes, sitemap/robots consistent, money pages hebben schema coverage en bronnen.
- Grootste SEO-winst zit in content-pariteit en GEO-structuur voor EN content (bronnen + tabellen) en in schema-governance (inline vs helpers).
- Interne linkflow is sterk op money pages, maar kan consistenter door ReadMoreLinks ook op blogposts te gebruiken.

Audit - kernbevindingen
1) Crawl & indexatie
- `app/robots.ts` en `app/sitemap.ts` zijn aanwezig en consistent met alternates + lastModified.
- `/crm` is uitgesloten van indexing via robots + noindex layout. OK.
- `npm run check:seo` uitgevoerd en OK op dit apparaat (2026-02-09).

2) Metadata & alternates
- Alle blogposts hebben metadata; dynamische routes gebruiken `generateMetadata`.
- Core money pages hebben metadata + OG.
- Volledige hreflang/alternate coverage niet geverifieerd via scripts.

3) Schema coverage & governance
- Money pages (services/pricing/materials/portfolio/contact/segments) gebruiken helper-gebaseerde schema's.
- Inline schema objecten voor layout, portfolio en blog index zijn gemigreerd naar helper-fabrieken in `lib/seo.ts`.
- `BlogFaq` gebruikt helpers en geeft `mainEntityOfPage` door (consistent).

4) Content-structuur (GEO)
- NL longform posts zijn grotendeels compliant (TOC/H2-anchors, tabellen, bronnen, last-updated).
- EN content: bronnen met `<cite>` zijn nu grotendeels consistent (52/53).
- EN tabellen: audit uitgevoerd; code-scan ondertelt tabellen uit gedeelde componenten.
- Dit kan topical authority en rich result kansen beperken op EN slugs.

5) Interne linkflow
- ReadMoreLinks staat op money pages en segment detailpages.
- ReadMoreLinks is nu standaard op alle blogposts via de blog layout.

6) Bilingual parity
- Alle high-intent NL gidsen hebben nu een EN variant.
- Twee EN slugs hebben enkel een andere slugnaam t.o.v. NL (Gridfinity/Tool organizers) maar zijn inhoudelijk wel vertaald.

Roadmap (reset)
P0 - Maximaal SEO effect (0-2 weken)
- EN blogposts upgraden naar GEO-structuur: bronnen-sectie met `<cite>` toegevoegd op alle EN posts; tabel-audit uitgevoerd (code-scan ondertelt gedeelde tabellen).
- BlogFAQ schema consistent maken door `mainEntityOfPage` door te geven (via `BlogFaq` props) op alle posts met FAQ.
- `npm run check:seo` gedraaid en OK.

P1 - Governance & schaal (2-6 weken)
- Inline schema's gemigreerd naar helper-fabrieken:
  - Blog index ItemList/Blog schema -> helpers in `lib/seo.ts` toegevoegd.
  - Portfolio ImageObject/VideoObject -> helpers in `lib/seo.ts` toegevoegd.
  - LocalBusiness in `app/layout.tsx` -> `buildLocalBusinessSchema` uitgebreid met geo/hasMap en refs.
- ReadMoreLinks standaardiseren op alle blogposts (pageType = "blog") voor consistente interne linkflow (afgerond via blog layout).

P2 - Groei & content (6-12 weken)
- Vertaal 8 NL high-intent gidsen naar EN en voeg canonical + alternates (afgerond).
- Voeg kwartaal refresh planning toe voor top-20 blogposts (nieuwe bronnen, interne links, CTA updates) (afgerond).
- Maak 3 nieuwe "pillar" artikelen (pricing/materials/design) met extra FAQ + HowTo schema en link naar segmenten (afgerond: `/blog/3d-print-prijzen-gids`, `/blog/3d-print-materialen-gids`, `/blog/3d-print-ontwerp-gids`).

Kwartaal refresh planning (2026)
- Q1 (maart): `/blog/3d-print-prijs-per-stuk` (refreshed 2026-02-09), `/blog/3d-print-kosten-besparen` (refreshed 2026-02-09), `/blog/3d-print-offerte-aanvragen` (refreshed 2026-02-09), `/blog/3d-print-ontwerp-checklist` (refreshed 2026-02-09), `/blog/3d-print-assemblage-gids` (refreshed 2026-02-09)
- Q2 (juni): `/blog/3d-print-materiaal-voor-zichtwerk` (refreshed 2026-02-09), `/blog/hittebestendig-3d-print-materiaal` (refreshed 2026-02-09), `/blog/sterke-3d-print-materialen` (refreshed 2026-02-09), `/blog/juiste-3d-print-materiaal` (refreshed 2026-02-09), `/blog/pla-vs-petg` (refreshed 2026-02-09)
- Q3 (september): `/blog/hoeveel-kost-3d-printen` (refreshed 2026-02-09), `/blog/hoe-lang-duurt-3d-printen` (refreshed 2026-02-09), `/blog/bestanden-voor-3d-printen` (refreshed 2026-02-09), `/blog/3d-printen-voor-beginners` (refreshed 2026-02-09), `/blog/beste-instellingen-bambu-printer` (refreshed 2026-02-09)
- Q4 (december): `/blog/filament-vrijdag-pla` (refreshed 2026-02-09), `/blog/filament-vrijdag-petg` (refreshed 2026-02-09), `/blog/filament-vrijdag-tpu` (refreshed 2026-02-09), `/blog/maker-monday-wanddiktes-ribs` (refreshed 2026-02-09), `/blog/maker-monday-toleranties-3d-printen` (refreshed 2026-02-09)

Openstaande assumpties
- `npm run check:seo` en `npm run build` uitgevoerd op dit apparaat (2026-02-09).
- Audit gebaseerd op code-scan (geen runtime of SERP-data).
