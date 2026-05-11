SEO Growth Roadmap - Audit na marktaandeel-analyse

Datum: 2026-03-01  
Scope: Sitewide on-page SEO en conversie (locatiepagina's apart traject).  
Doel: Vindbaarheid verhogen zonder regressies in build, indexatie of UX.

Status update (2026-03-01):
- [x] P0.1 SEO checks + CI gating gestabiliseerd (fast/deep split, noindex-aware checks, regex scan fix).
- [x] P0.2 Hero trust-framework standaardiseren op alle money pages.
- [x] Static-render safety op money pages (geen `await searchParams` meer op statische routes).
- [x] P1.3 Snelle contactroute + event tracking (zonder WhatsApp).
- [x] P1.4 Capaciteitssignaal met centrale bron + zichtbaarheid op money pages.
- [x] P1.5 OG/CTR governance hardening (top-landing policy + route-specifieke OG/Twitter checks; geen logo-fallback op top routes).
- [x] P1.5b OG CTR copy polish: route-specifieke SVG copy/chips aangescherpt op alle top landings.
- [x] P1.5c Locale split OG assets: aparte NL/EN OG-SVG's voor alle top money pages + governance check geupdate.
- [x] P1.5d Locale split doorgetrokken op detailcontent: blogposts, segmentdetails en cases (NL/EN OG varianten).
- [x] P3.8 Materials micro-interacties: quick chooser + benefit matrix copy op `/materials` en `/en/materials`.
- [x] P3.9 Keyword governance uitgebreid: versiebeheerde baseline (`lib/seo-keyword-governance.json`) + title/H1/intro checks op NL/EN money pages.
- [x] P2.6 Cluster A voltooid (2/2): `/blog/kapot-onderdeel-laten-printen` en `/blog/vervangstuk-huishoudtoestel-3d-printen` (beide met EN-variant).
- [x] P2.6 Cluster B voltooid (2/2): `/blog/ikea-onderdelen-3d-printen` en `/blog/kabelmanagement-3d-printen` (beide met EN-variant).
- [x] P2.6 Cluster C voltooid (2/2): `/blog/prototyping-kleine-reeksen-3d-printen` en `/blog/retail-pos-3d-printen` (beide met EN-variant).
- [x] P2.7 Case engine opgestart: `/cases` + `/en/cases` live met herhaalbaar case-format, 6-case pipeline en extra interne linkinjecties.
- [x] P2.7 Case hub impact upgrade: intent-matrix, quick-start routes, bottom CTA en HowTo JSON-LD toegevoegd.
- [x] P2.7 Tone + funnel polish: minder SEO-jargon op `/cases`, dedicated OG assets (`/images/og-cases-nl.svg` + `/images/og-cases-en.svg`) en route-matrices doorgetrokken naar `/services` en `/segments`.

---

## 1) Reality check op de Copilot-analyse

Kernconclusie: de analyse is directioneel bruikbaar, maar op meerdere punten verouderd t.o.v. de huidige codebase.

Wat de analyse correct ziet:
- Lokale positioning en meertaligheid zijn sterke assets.
- Verdere winst zit in content intent-clusters + conversieoptimalisatie.
- Casestudies en gebruiksgerichte pagina's blijven een groeiversneller.

Wat intussen al (grotendeels) opgelost is:
- Structured data is al breed aanwezig (helper-gedreven via `lib/seo.ts` op veel money/content routes).
- Interne links zijn sterk verbeterd via `ReadMoreLinks` en CTA-injecties.
- Pricing is geen dunne pagina meer; er staat al pricing-structuur met vanafprijzen, calculator-flow en quotepad.
- Contentdekking is veel breder dan de analyse veronderstelt (64 NL blogslugs + 64 EN blogslugs, meerdere segmenten).
- Mediaformaat is grotendeels modern (`public`: voornamelijk `.webp`).

Punten die nog wel valide zijn:
- OG/CTR governance op top landingspagina's kan nog scherper.
- Static-render discipline moet bewaakt blijven bij nieuwe route-wijzigingen.
- Case cadence kan strakker en zakelijker gestuurd worden.

---

## 2) Huidige sterke basis (behouden)

Technisch:
- Next.js App Router met duidelijke route-architectuur en locale varianten.
- Robuuste metadata/alternates-setup + recente canonical/hreflang hygiëne.
- JSON-LD helpers aanwezig en veel gebruikt (`buildArticleJsonLd`, `buildLocalBusinessSchema`, `buildServiceSchema`, `buildOfferCatalog`, `buildFaqPageSchema`).

Content:
- Grote topical dekking in blog + segmentpagina's.
- Sterke FAQ- en how-to-structuur.
- Duidelijke materiaalpositionering (PLA/PETG/TPU + varianten).

Conversie:
- Duidelijke quote- en contactflow.
- Pricing bevat concrete instapniveaus en vervolgstappen.
- Meertalige CTA's op kernroutes.

---

## 3) Gaps met hoogste impact (haalbaar voor 1-persoonsstudio)

P0 - Kritisch (nu eerst)
1. SEO checks stabiliseren en hard in CI
- Probleem: regressiechecks moeten snel, betrouwbaar en standaard meedraaien.
- Actie:
  - `check:seo` opdelen in snelle gates + optionele deep checks.
  - Timeouts/performantie van linkcheck oplossen zodat CI niet blokkeert.
  - CI workflow afdwingen op `lint + build + check:seo`.
- DoD:
  - Checks < 5 min op CI.
  - `main` heeft groene pipeline zonder flaky failures.

2. Hero trust-framework standaardiseren op money pages
- Actie:
  - Uniforme trustbalk op home/services/pricing/materials/contact:
    - lokale studio + regio
    - duidelijke responstijd
    - heldere use-case focus
  - Primaire CTA altijd zichtbaar boven de fold.
- DoD:
  - Zelfde trust-structuur op alle money pages.
  - Geen visuele regressie mobiel/desktop.

P1 - Hoge groei-impact
3. Conversieversneller: snelle contactroute + tracking (zonder WhatsApp)
- Actie:
  - Snelle contactknoppen op money pages: `Offerte aanvragen`, `Mail direct`, `Project uploaden`.
  - Prefill-routes vanuit use-cases behouden/uitbreiden (`/contact?material=...&quote=...`).
  - Event tracking toevoegen op contact-starts (CTA click, mail click, project upload click, form submit).
- DoD:
  - Alle money pages hebben minimaal 2 snelle contactacties boven de fold.
  - Eventmeting zichtbaar in analytics voor CTA, mail, project upload en form submit.

4. Capaciteitssignaal ("huidige doorlooptijd")
- Actie:
  - Klein, centraal beheerd statusblok (bijv. config/ENV driven) op home/contact/pricing.
  - Copy met realistische bandbreedte i.p.v. harde belofte.
- DoD:
  - 1 bron voor lead-time status.
  - Status zichtbaar op minstens 3 money pages.

5. OG/CTR governance verder harden
- Actie:
  - OG-afbeelding-per-route policy documenteren en valideren in checkscript.
  - Top 20 landingspagina's op unieke OG/Twitter assets houden.
- DoD:
  - Geen fallback-spam met dezelfde OG op top pages.
  - Check faalt bij ontbrekende/ongeldige OG op money pages.
- Status: Done (2026-03-01).

P2 - Content moat (SEO marktaandeel)
6. 3 probleemgerichte clusters (transactioneel + lokaal)
- Cluster A: kapot/vervangonderdeel
- Cluster B: home/workshop practicals (IKEA, kabelmanagement, organizers)
- Cluster C: B2B retail/POS/prototyping
- Actie:
  - 2 pagina's per cluster (1 pillar + 1 commerciële use case) = 6 nieuwe URL's.
  - Iedere pagina: FAQ + tabel + bronsectie + duidelijke CTA.
- DoD:
  - 6 live pagina's NL + minimaal 3 EN-varianten voor top performers.
  - Interne links vanuit bestaande relevante blogs/segmenten.

7. Case engine (herhaalbaar format)
- Actie:
  - Vast template: uitdaging -> materiaalkeuze -> tijd/kost -> resultaat -> CTA.
  - Ritme: 2 cases/maand i.p.v. ad hoc.
- DoD:
  - Case-template componentized.
  - Pipeline van volgende 6 cases gepland.

P3 - Verdere optimalisatie
8. Micro-interacties materials / keuzehulp
- Actie:
  - UX-verfijning van materiaalkeuze (benefit matrix, progressive disclosure).
  - Focus op beginnersbegrip zonder technische overload.
- DoD:
  - Lagere bounce op materials.
  - Meer CTA-clicks naar contact/quote.

9. Keyword governance uitbreiden (niet alleen locaties)
- Actie:
  - Money-page keyword checks toevoegen (`check:seo:keywords`) op titels/H1/intro.
  - Regressiealerts bij verlies van kernintentie.
- DoD:
  - Script in CI.
  - Baseline keyword set versies onder versiebeheer.

---

## 4) 90-dagen uitvoerplan

Week 1-2
- P0.1 SEO checks/CI stabiel maken
- P0.2 Hero trust-framework uitrollen

Week 3-5
- P1.4 Capaciteitssignaal
- P1.5 OG governance checks

Week 6-10
- P2.6 6 nieuwe clusterpagina's
- P2.7 Case-engine + eerste 4 cases

Week 11-12
- P3.8 materials micro-interacties
- P3.9 keyword governance uitbreiden

---

## 5) KPI-kader (zakelijk en haalbaar)

Primary KPI's:
- Organisch verkeer naar money pages
- CTR op branded + non-branded money queries
- Contact/quote conversieratio vanaf SEO landingspagina's

Secondary KPI's:
- Gemiddelde positie op clusterkeywords
- Assisted conversions (blog -> services/pricing/contact)
- CTA click-through op hero en contactroutes

Guardrails:
- Geen daling in build-stabiliteit
- Geen stijging in indexatieproblemen (Search Console)
- Geen regressie op Core Web Vitals budget

---

## 6) Beslisregel voor implementatie

Eerst uitvoeren:
1) P0.1 (checks + CI stabiliteit)
2) P0.2 (hero trust standaard)
3) P1.3 (snelle contactroute + tracking, zonder WhatsApp)
4) P1.5 (OG governance checks)

Pas daarna:
- Nieuwe contentclusters/cases op schaal publiceren.
