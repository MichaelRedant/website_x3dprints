SEO Roadmap - On-page vindbaarheid (excl. locaties)

Doel:
Maximale indexeerbaarheid, duidelijke taalclustering (NL/EN), sterkere rich results en hogere CTR.

Scope (afgesproken):
- We werken enkel aan SEO-taken die in deze codebase/VSCode aanpasbaar zijn.
- Geen externe/off-page taken in deze roadmap (backlinks, citations, outreach, reviews).

Statusmodel:
- P0 = eerst uitvoeren (hoogste impact op vindbaarheid)
- P1 = daarna uitvoeren (sterke verbetering)
- P2 = optimalisatie (nice-to-have, maar waardevol)

Laatste audit (2026-02-07):
- `npm run lint` [done]
- `npm run build` [done]
- `npm run check:seo:quality` [done] (0 warnings op export-HTML)
- `npm run check:seo:templates` [done] (template-contract actief; segmentregels strict, momenteel 0 template warnings)
- `npm run check:seo:locations` [done] (796 locatie-markdownbestanden gevalideerd op niet-lokale fallback city-links in linksecties)
- `npm run fix:seo:locations` [done] (510 locatiebestanden opgeschoond: 1214 niet-lokale fallback city-links verwijderd, met overview-fallback waar nodig)
- `npm run check:seo` [done] (`metadata`, `locale-diff`, `locale-links`, `templates`, `quality`, `html-lang`, `schema`, `schema:locale`, `og`, `sitemap`, `links`, `locations` groen)
- `npm run verify` [done] (lint + security + build + seo checks in 1 run)

Roadmap status nu:
- P0.1 Taal-signalen corrigeren: [done] html taal-signalen nu ook in statische export afgedwongen (`postbuild` patch op `out/**/*.html` + regressiecheck `check:seo:html-lang`).
- P0.2 Hreflang + canonical hygiene finaliseren: [done] trailing slash canonicals opgeschoond, `en-BE` hreflang gestandaardiseerd en EN segment-detailroutes toegevoegd aan sitemap met alternates.
- P0.3 EN interne links zonder NL-leaks: [done] broncode + export opgelost (blog CTA's, organizers CTA/bundles, EN locaties links, FAQ data links, route-localisatie voor dynamische segment/blog slugs) + regressiecheck op geëxporteerde EN HTML anchors (`check:seo:locale-links`).
- P0.4 Index hygiene: [done] utility pages noindex, pricing indexeerbaar.
- P0.5 Security + SEO trust: [done] CRM auth/reply server-side sessie-gebaseerd en hash-only (`CRM_PASSWORD_HASH`), client secrets verwijderd, publieke `public/data/*.json` verwijderd en build-guards actief (`check:security:public-data`, `check:security:crm-auth`). Hosting/opschoning bevestigd uitgevoerd.

- P1.6 Article JSON-LD afronden: [done] schema-check groen.
- P1.7 Locale-correct schema: [done] locale-specifieke `inLanguage` op page-level schema's + build check (`check:seo:schema:locale`).
- P1.8 Breadcrumb schema aanscherpen: [done]
- P1.9 OG-image strategie: [done] OG/Twitter snippets sitebreed gestandaardiseerd op tijdloos logo (`/Logo.webp`) via postbuild + regressiecheck (`check:seo:og`).

- P2.10 NL/EN content differentiatie: [done] kernpagina's hebben aparte NL/EN metadata-copy en regressiecheck bewaakt dat NL/EN titels/descriptions niet near-duplicate zijn + EN wrappers `locale="en"` blijven doorgeven (`check:seo:locale-diff`).
- P2.11 Interne linkblokken verfijnen: [done] basis op orde, linkintegriteit groen.
- P2.12 Measurement hardening: [done] grotendeels op orde.
- P2.13 CI checks: [done] actief en groen.

Nieuwe fase (VSCode-only):
- P3.1 SEO-content templates: [done] startertemplates toegevoegd (`templates/seo/*`) + source guardrail `check:seo:templates` met verplichte metadata-contracten, segment-FAQ minimum en verplichte segment CTA/linkslots.
- P3.2 Content kwaliteit checks: [done] `check:seo:quality` toegevoegd op export-HTML met harde fails voor ontbrekende SEO-basics (title, description, canonical, 1x H1) en 0 actuele quality warnings.
- P3.3 Interne link architectuur: [done] centrale mapping toegevoegd (`lib/seo-related-links.ts`) en gekoppeld aan `ReadMoreLinks` via `pageType` (incl. locale-veilige href generatie met `localizeHref`).
- P3.4 Programmatic schema consistency: [done] helper-fabrieken toegevoegd in `lib/seo.ts` (`buildFaqPageSchema`, `buildHowToSchema`, uitgebreide `buildServiceSchema`) en toegepast op kernpagina's (`3d-printen`, `materials`, `materials/[slug]`, `services`, `segments`, `viewer`, inclusief EN varianten waar relevant).
- P3.5 Build-safe guardrails: [done] `check:seo` pipeline uitgebreid met quality-gate; `verify` draait deze automatisch mee en blijft groen.

GEO uitbreiding (VSCode-only):
- P4.1 AI crawler toegankelijkheid: [done] `app/robots.ts` uitgebreid met expliciete `GPTBot` en `Google-Extended` rules + build-check `scripts/check-seo-robots.mjs` en opname in `check:seo`.
- P4.2 Global AI schema baseline: [done] `WebSite` + `Organization` JSON-LD helperlaag in `lib/seo.ts` (`buildWebsiteSchema`, `buildOrganizationSchema`) en opgenomen in `app/layout.tsx`.
- P4.3 E-E-A-T auteur signalen: [done] `buildArticleJsonLd` ondersteunt `Person` auteur-signalen met centrale author-config + `rel="author"` in blog footer.
- P4.4 GEO contentstructuur templates: [done] lange gidspagina's `/3d-modellen-vinden` (NL/EN) kregen inverted-pyramid intro, ToC met ID deep-links, gestructureerde vergelijkingstabel, zichtbare "laatst bijgewerkt" en bronsectie met `<cite>`.
- P4.5 GEO segment detail EN: [done] `/en/segments/[slug]` gebruikt nu ToC + deep-link anchors, zichtbaar `Last updated` en bronsectie met `<cite>`; template-guardrails (`templates/seo/segment-template.md`) en source-check zijn hierop afgestemd zonder build-noise.
- P5.1 Money pages Batch A: [done] `/3d-printen`, `/materials`, `/pricing`, `/contact` kregen conversion-first SEO updates: extra intent-FAQ, materiaalvergelijkingstabel, snelle offerte-paden met prefill links en CTA-event tracking op kernacties.
- P5.2 Money pages Batch B: [done] `/services`, top-routes in `/materials/[slug]` (PLA Matte, PETG, TPU) en `/segments/3d-printing-prototypes` kregen conversion-first uitbreidingen: intent-routing, "wanneer niet kiezen" guidance, TOC/anchors/sources, last-updated signalen en extra CTA-event tracking.
- P5.3 Money pages Batch C: [done] `/viewer`, `/blog/hoeveel-kost-3d-printen` en `/blog/juiste-3d-print-materiaal` kregen conversion-first GEO updates: ToC + anchors, FAQ/HowTo schema, bronsecties met `<cite>`, sterkere interne linkflow en prefill CTA-event tracking.
- P5.4 Segment rollout Batch D: [done] `/segments/3d-printing-marketing`, `/segments/3d-printing-engineers`, `/segments/3d-printing-makers` en `/segments/3d-printing-tabletop` kregen dezelfde GEO-structuur (ToC/anchors, zichtbaar "laatst bijgewerkt", FAQ + HowTo + Service + LocalBusiness JSON-LD, bronsectie met `<cite>`, conversion CTA-flow naar `/materials#material-suggestion-tool` en `/contact?material=<slug>`). Daarnaast is op `/segments/3d-printing-prototypes` de contact-prefill gecorrigeerd van `pla-tough-plus` naar geldige slug `pla-tough`.
- P5.5 Segment rollout Batch E: [done] `/segments/3d-printing-back-to-school`, `/segments/3d-printing-scholen`, `/segments/3d-printing-modelbouwers` en `/segments/3d-printing-seasonal` zijn naar dezelfde GEO-standaard gebracht (ToC/anchors, zichtbaar "laatst bijgewerkt", FAQ + HowTo + Service + LocalBusiness JSON-LD, bronsecties met `<cite>`, CTA-flow naar `/materials#material-suggestion-tool` en `/contact?material=<slug>`), inclusief cleanup van eerdere encoding-artefacten.
- P5.6 Segment rollout Batch F: [done] `/segments/3d-printing-vaderdag-moederdag` en `/segments/3d-printing-valentijn` kregen dezelfde GEO-conversieopzet (ToC/anchors, zichtbaar "laatst bijgewerkt", FAQ + HowTo + Service + LocalBusiness JSON-LD, bronsectie met `<cite>`, CTA-flow naar `/materials#material-suggestion-tool`, `/contact?material=<slug>`, en extra interne links naar `/locaties`, blog en pricing).
- P5.7 Commercial blog rollout Batch G: [done] 5 high-intent NL blogposts kregen GEO-conversie upgrades: `/blog/3d-printen-op-bestelling`, `/blog/3d-printen-in-de-buurt`, `/blog/pla-vs-petg`, `/blog/bestanden-voor-3d-printen`, `/blog/ontwerp-3d-printbaar-model` met ToC/deep links, zichtbaar last-updated, FAQ + HowTo + Article JSON-LD, bronnen met `<cite>`, sterkere interne linkflow en CTA-prefills naar `/contact?material=<slug>`.
- P5.8 Commercial blog rollout Batch H (EN mirror): [done] EN varianten `/en/blog/3d-printen-op-bestelling`, `/en/blog/3d-printen-in-de-buurt`, `/en/blog/pla-vs-petg`, `/en/blog/bestanden-voor-3d-printen` en `/en/blog/ontwerp-3d-printbaar-model` kregen dezelfde GEO-conversiestructuur met ToC/deep links, zichtbaar last-updated, FAQ + HowTo + Article JSON-LD, bronsecties met `<cite>`, `/Logo.webp` OG/Twitter en EN-locale CTA-prefills.
- P5.9 Locatie-keyword locality hardening: [done] locatie-linkblokken opgeschoond van generieke fallback-steden (`Gent/Ghent`, `Aalst`, `Antwerpen`, `Oudenaarde`) wanneer niet lokaal relevant; nieuwe regressiecheck `check:seo:locations` bewaakt dit bij toekomstige updates.
- P5.10 Keyword governance automation: [done] keyword dataset verplaatst naar `lib/Keyword Stats *.csv` en nieuwe build-safe regressiecheck `check:seo:keywords` toegevoegd (meedraaiend in `check:seo`) voor money-page keyword coverage op basis van actuele CSV-data.
- P5.11 Local keyword governance automation: [done] nieuwe check `check:seo:location-keywords` toegevoegd (meedraaiend in `check:seo`) die op alle NL/EN locatiepagina's primaire lokale intent bewaakt (`3d printen in <stad>` / `3d printing in <city>`) en city-keywords uit de actuele CSV als optimalisatiewarnings signaleert.
- P5.12 Local keyword auto-fix: [done] script `fix:seo:location-keywords` toegevoegd dat ontbrekende primaire/secundaire lokale keywordsignalen (en optionele CSV-signalering) automatisch terugplaatst in locatie-markdown, gevolgd door check via `check:seo:location-keywords`.
- P5.13 Money-page keyword expansion: [done] keyword-governance uitgebreid naar extra commerciële routes (`/services`, `/viewer`, `/blog/3d-printen-in-de-buurt`) en copy subtiel aangescherpt op high-intent termen uit de actuele CSV (o.a. `3d model printen`, `3d print onderdelen`, `3d print service belgie`) zonder build-regressie.
- P5.14 EN parity keyword expansion: [done] EN money-routes (`/en/services`, `/en/viewer`, `/en/blog/3d-printen-in-de-buurt`) inhoudelijk aangescherpt met EN-intent termen (o.a. `3d model print`, `3d printing gent`) en opgenomen in `check:seo:keywords` zodat NL/EN keyword-governance parity krijgt.
- P5.15 EN local landing schema parity: [done] dynamische EN locatiepagina-template (`/en/[slug]`) uitgebreid met `Service`, `LocalBusiness`, `FAQPage`, `BreadcrumbList` en `WebPage` JSON-LD + EN keyword metadata en zichtbaar `Last updated`, zodat EN lokale landingspagina's dezelfde E-E-A-T/GEO signalen dragen als NL zonder 796 individuele files te bewerken.
- P5.16 Keyword governance batch I: [done] `check:seo:keywords` uitgebreid van 15 naar 19 targets met extra bewaking voor `/3d-modelleren`, `/en/3d-modelleren`, `/blog/hoeveel-kost-3d-printen` en `/en/blog/hoeveel-kost-3d-printen`; copy/metadata op deze routes aangescherpt op actuele CSV-termen (o.a. `3d model printen`, `3d ontwerp printen`, `kosten 3d printen`, `3d printen prijs`) zonder build-regressie.
- P5.17 Keyword governance batch J: [done] materiaalgids-routes toegevoegd aan keyword-regressie (`/blog/juiste-3d-print-materiaal` en `/en/blog/juiste-3d-print-materiaal`), met content/metadata-updates op actuele termen (NL: `3d print materiaal`, `3d print materialen`; EN: `3d model print`) en behoud van build-veiligheid.
- P5.18 Keyword governance batch K: [done] commerciële bestelroute `/blog/3d-printen-op-bestelling` toegevoegd aan keyword-regressie met CSV-termen (`3d printen op bestelling`, `3d model printen`, `3d print service belgie`) en NL metadata/introcopy aangescherpt; EN mirror bleef al gedekt in governance.
- P5.19 Keyword governance batch L: [done] NL vergelijkingsroute `/blog/pla-vs-petg` toegevoegd aan keyword-regressie met materiaaltermen uit CSV (`3d print materiaal`, `3d print materialen`, `materiaal 3d printen`) en metadata/introcopy aangescherpt voor betere match op materiaal-intentie.
- P5.20 Keyword governance batch M (resterende NL commercial blogs): [done] `/blog/bestanden-voor-3d-printen` en `/blog/ontwerp-3d-printbaar-model` toegevoegd aan keyword-regressie met CSV-termen (o.a. `3d stl`, `3d modellen om te printen`, `3d model printen`, `3d ontwerp printen`, `3d modellen printen`) en metadata/introcopy aangescherpt; daarmee zijn de resterende NL routes uit de eerdere commercial blogbatch afgedekt.

Money pages prioritering (Impact x Effort x Conversie)

Doel van deze matrix:
- Eerst pages verbeteren met hoogste combinatie van zoekvraag, koopintentie en omzetimpact.
- NL is hoofdtaal (primair), EN volgt als spiegel voor hreflang/canonical consistentie.

Scoremodel:
- Impact (1-5): verwacht SEO + omzetimpact.
- Effort (1-5): implementatie-inspanning in code/content.
- Prioriteitsscore = `(Impact * 2) - Effort`.

| Prioriteit | Route | Intentie | Impact | Effort | Score | Focusactie (eerstvolgende) |
|---|---|---|---:|---:|---:|---|
| 1 | `/3d-printen` | Transactioneel | 5 | 2 | 8 | Hero-copy aanscherpen op "3D printen op maat in Herzele/Gent", FAQ uitbreiden met pricing/timing intentievarianten. |
| 2 | `/materials` | Commercial investigation | 5 | 2 | 8 | Materiaalvergelijkingstabel uitbreiden (use-case, outdoor, sterkte, prijsrange), extra interne links naar contact/pricing. |
| 3 | `/pricing` | Transactioneel | 5 | 2 | 8 | Snippet-optimalisatie met duidelijke prijsankers + CTA tracking per pakket/actie. |
| 4 | `/contact` | Transactioneel | 5 | 2 | 8 | Frictie verlagen (kortere bovenste flow), extra FAQ met "wanneer antwoord?" en intentiegerichte prefill routes. |
| 5 | `/services` | Commercial investigation | 4 | 2 | 6 | Serviceblokken koppelen aan concrete use-cases + segmentroutes + proof links naar portfolio/blog. |
| 6 | `/materials/[slug]` (top slugs) | Long-tail transactioneel | 4 | 2 | 6 | Voor topmaterialen extra vergelijkingssectie + "wanneer niet kiezen" + CTA naar `/contact?material=<slug>`. |
| 7 | `/segments/3d-printing-prototypes` | B2B intentie | 4 | 3 | 5 | NL GEO-structuur volledig uitrollen (ToC/anchors/sources/last updated) en stronger interne links naar pricing/contact. |
| 8 | `/viewer` | Assistive/commercial | 3 | 2 | 4 | Boven-de-vouw copy op "controle voor offerte" + directe CTA naar contact met materiaalprefill. |
| 9 | `/blog/hoeveel-kost-3d-printen` | Informational -> transactioneel | 4 | 3 | 5 | FAQ intenties voor prijszoekers uitbreiden + prominente CTA's naar pricing/contact. |
| 10 | `/blog/juiste-3d-print-materiaal` | Informational -> commercial | 3 | 3 | 3 | Beslissingsmatrix versterken en doorsturen naar `/materials` en material detail pages. |

Aanbevolen uitvoerbatch (na huidige status):
- Batch A (hoogste ROI): `/3d-printen`, `/materials`, `/pricing`, `/contact`.
- Batch B: `/services`, top `/materials/[slug]`, `/segments/3d-printing-prototypes` (NL).
- Batch C: `/viewer`, top 2 money-blogposts met sterke CTA-flow.

KPI's per 60-90 dagen (money pages):
- +20-35% organische clicks op top 6 money pages.
- +15-25% CTR op pages met vernieuwde snippets/meta.
- +10-20% stijging in CTA-clicks naar `/contact` en `/pricing`.
- Daling van uitstapratio op `/pricing` en `/contact` met 10%.

P0 - Foundation fixes

1) Taal-signalen corrigeren
- Maak html lang en content-language correct per locale (NL vs EN).
- Voorkom dat EN-pagina's met NL taal-signalen renderen.

2) Hreflang + canonical hygiene finaliseren
- Voeg x-default toe waar languages al bestaat maar x-default ontbreekt.
- Maak canonicals consistent met trailing slash waar de sitemap ook slash gebruikt.
- Vermijd mixed canonical formats binnen dezelfde routegroep.

3) EN interne links zonder NL-leaks
- Corrigeer EN pagina-links die nog naar NL paden verwijzen.
- Focus eerst op money pages en viewer/blog CTA links.

4) Index hygiene
- Zet noindex,nofollow op utility pages:
  - /crm
  - /prijzen
  - /en/prijzen
- Houd pricing als enige indexeerbare prijspagina.

5) Security + SEO trust
- Verplaats naar server-side controle of env-only flow.

P1 - Structured data completion

1) Article JSON-LD afronden
- Vul ontbrekende datePublished/dateModified op posts met handmatige articleJsonLd.
- Behoud mainEntityOfPage, author en publisher consistent.

2) Locale-correct schema
- Zorg dat inLanguage aansluit op paginalocale (nl-BE of en-BE).
- Vermijd generieke meertalige default op single-locale pagina's waar mogelijk.

3) Breadcrumb schema aanscherpen
- Voeg stabiele @id's toe aan breadcrumb entities.
- Houd NL en EN breadcrumb structuur parallel.

P1 - CTR/snippet verbetering

9) OG-image deduplicatie
- Verminder hergebruik van og-home.jpg op money pages + top blogposts.
- Gebruik page-specifieke OG assets met duidelijke context.

P2 - Content en linking optimalisatie

10) NL/EN content differentiatie
- Versterk unieke intro's, voorbeelden en use-cases op EN varianten.
- Vermijd vertaalde near-duplicates op belangrijke posts.

11) Interne linkblokken verfijnen
- Behoud en verbeter "Verder lezen" / equivalent op money pages.
- Stuur intern verkeer gericht naar materials, pricing, services, contact.

P2 - Meetbaarheid en governance

12) Measurement hardening
- Behoud GA via NEXT_PUBLIC_GA_ID en cookie_domain auto.
- Breid CTA-event tracking uit op key conversion paden.

13) CI checks (lichtgewicht)
- Voeg scripts toe voor:
  - html lang/data-locale regressie checks op geëxporteerde HTML
  - schema validatie smoke checks
  - schema-locale regressie checks
  - OG/Twitter asset-integriteit
  - sitemap dekking van indexeerbare routes
  - metadata/hreflang regressie checks
  - basis linkintegriteit checks

Uitvoervolgorde (implementatie)

Sprint 1:
- P0.1 t/m P0.4

Sprint 2:
- P0.5 + P1.6 + P1.7

Sprint 3:
- P1.8 + P1.9 + P2.10

Sprint 4:
- P2.11 + P2.12 + P2.13

Definition of done per item
- Build blijft groen.
- Gebruik `npm run build` (niet enkel `npx next build`) zodat `postbuild` taal/OG-patches altijd worden toegepast.
- Geen regressie in metadata/alternates.
- Interne links correct per locale.
- JSON-LD valide in page source.
