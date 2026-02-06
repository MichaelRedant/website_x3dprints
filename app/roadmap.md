SEO Roadmap - On-page vindbaarheid (excl. locaties)

Doel:
Maximale indexeerbaarheid, duidelijke taalclustering (NL/EN), sterkere rich results en hogere CTR.

Statusmodel:
- P0 = eerst uitvoeren (hoogste impact op vindbaarheid)
- P1 = daarna uitvoeren (sterke verbetering)
- P2 = optimalisatie (nice-to-have, maar waardevol)

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

1) Locale-correct schema
- Zorg dat inLanguage aansluit op paginalocale (nl-BE of en-BE).
- Vermijd generieke meertalige default op single-locale pagina's waar mogelijk.

1) Breadcrumb schema aanscherpen
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
  - schema validatie smoke checks
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
- Geen regressie in metadata/alternates.
- Interne links correct per locale.
- JSON-LD valide in page source.
