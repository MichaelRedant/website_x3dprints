# SEO-First Shop Roadmap

Date: 2026-04-20  
Scope: Huidige quote-first shopstrategie voor de bestaande Next.js website, zonder SEO-regressie en zonder onnodige checkoutcomplexiteit.

## Baseline Audit & Feasibility Verdict

Current-state audit:
- De website heeft al een sterk organisch fundament met een grote bestaande indexatie.
- De shop bestaat al onder `/shop/` en `/en/shop/` als additieve laag bovenop de bestaande contentsite.
- De huidige shop werkt via productpagina's en offerte-/aanvraagflows, niet via een volautomatische checkout.
- De private backend gebruikt MySQL voor productdata, stock, zichtbaarheid en koopmodus.
- De huidige shop past operationeel beter bij een kleine, gecontroleerde catalogus dan bij een brede direct-checkoutstrategie.
- De huidige bouwstenen laten toe om productroutes, sitemap en structured data stabiel te houden zonder een payment provider te forceren.

Feasibility verdict:
- Feasible: Ja.
- Aanbevolen model: quote-first shop, directe betaling uitgesteld.
- Risiconiveau: Low to medium, vooral op SEO-consistentie, copyduidelijkheid en frontend/backend-sync.
- Kritieke voorwaarde: frontendcopy, live stockstatus en shopdata moeten op elk moment dezelfde werkelijkheid tonen.

---

## 1. Vision & Principles

De shop is een uitbreiding van de bestaande site, geen vervanging.
- De huidige website blijft de hoofdbron voor organische instroom.
- Blog, materialen, diensten, locaties, segmenten en cases blijven de sterkste acquisitielaag.
- De shop moet die instroom omzetten in concrete aanvragen, niet de rest van de site verdringen.

SEO-first commerce principes:
- Zero URL changes voor alle bestaande indexeerbare pagina's.
- Additive routing only voor shopfunctionaliteit.
- Blog en content blijven de primaire acquisitiekanalen.
- Productpagina's mogen commercieel zijn, maar moeten inhoudelijk duidelijk en geloofwaardig blijven.
- De shop werkt in fase 1 quote-first: eerst aanvraag, dan bevestiging en afhandeling.

Wat nooit mag gebeuren:
- Bestaande content-URL's herschrijven, samenvoegen of redirecten naar de shop.
- Cart- of checkoutlogica prominent maken terwijl de echte flow nog via aanvraag loopt.
- Canonicals van bestaande sterke contentpagina's naar shop-URL's laten wijzen.
- Productpagina's vullen met generieke of bijna identieke templatecopy.
- Prijs-, stock- of leverbeloftes tonen die operationeel niet hard gemaakt kunnen worden.
- Indexeerbare filter-, sorteer- of querypagina's aanmaken zonder unieke inhoud.

---

## 2. Non-Negotiable SEO Constraints

- URL stability:
  - Alle bestaande paden blijven exact stabiel.
  - Nieuwe shop-URL's komen alleen onder het bestaande `/shop/` namespace.
- Canonical integrity:
  - Exact een canonical per indexeerbare URL.
  - Bestaande canonicals buiten de shop blijven onaangeroerd.
- Internal link preservation:
  - Huidige interne links tussen blog, materials, services, segments, cases en locatiepagina's blijven intact.
  - Shoplinks worden additief toegevoegd, niet in de plaats van bestaande sterke links.
- Crawl budget protection:
  - Utility-routes en toekomstige checkoutroutes blijven non-indexable.
  - Geen indexeerbare querystates, filters of sorteer-URL's.
- Duplicate content prevention:
  - Een indexeerbare product-URL per locale en per productslug.
  - Geen dunne duplicaten per variant, filter of use case.
- Filter/indexing strategy:
  - Filters zijn UX-functionaliteit, geen SEO-landingspagina's.
  - Een categoriepagina mag pas indexeerbaar worden als die unieke inhoud en meerdere relevante producten heeft.
- Product vs blog intent separation:
  - Blog en cases bedienen informatieve en probleemgerichte intent.
  - Productpagina's bedienen aanvraag- en aankoopintentie.
  - Geen intentkannibalisatie door blogcopy letterlijk in productslugs te kopieren.

---

## 3. High-Level Architecture

Runtime architecture in de huidige fase:
- `Next.js` blijft de enige publieke crawlbare frontendlaag.
- Een private product- en CRM-backend levert live catalogusdata, voorraad, zichtbaarheid en aankoopmodus.
- `MySQL` bewaart productrecords, stock, visibility flags en operationele shopdata.
- De bestaande offerte-/contactflow blijft de primaire conversielaag voor de shop.

Waarom de backend niet publiek crawlbaar mag zijn:
- Backend- en CRM-endpoints zijn operationele APIs, geen landingspagina's.
- Crawlen van admin- of API-endpoints voegt ruis toe en verspilt crawlbudget.
- Shop-SEO moet volledig geconcentreerd blijven op de Next.js frontend-URL's.

Hoe MySQL wordt gebruikt:
- Een bron van waarheid voor:
  - slug
  - prijs
  - availability
  - stockstatus
  - purchase mode
  - zichtbaarheid
- Geen directe afhankelijkheid van een payment provider voor fase 1.

Hoe de quote-first shopflow werkt:
- Gebruiker bezoekt `/shop/` of een productpagina.
- Gebruiker kiest `Vraag offerte aan` of opent de shopmodal.
- Next.js stuurt de aanvraag naar de bestaande contact-/CRM-flow.
- De opvolging gebeurt manueel: bevestiging, verzending of afhaling, en eventuele betalingsafspraak.
- De bedankpagina bevestigt de aanvraag, niet een online betaling.

Mollie in deze architectuur:
- Mollie is bewust geen onderdeel van fase 1.
- Er is momenteel geen nood aan een redirect-checkout of webhookketen voor de huidige catalogus.
- Als directe betaling later zinvol wordt, blijft dat een optionele, runtime-only uitbreiding en nooit een build-time afhankelijkheid.

Logical flow:
- User -> Next.js shop/home/product page -> quote modal or contact flow -> CRM/backend -> manual follow-up -> thank-you / confirmation

Separation of concerns:
- Next.js web:
  - SEO
  - metadata
  - canonical policy
  - internal linking
  - shop-UI
  - productlandingspagina's
- Private backend + MySQL:
  - live productdata
  - voorraad
  - koopmodus
  - product visibility
  - administratieve opvolging
- Operations:
  - aanvraagopvolging
  - verzending of afhaling
  - latere betalingsafhandeling indien nodig

---

## 4. Shop Scope Definition (MVP First)

Phase 1 scope:
- Kleine catalogus met duidelijke, vaste productslugs.
- Standaard stockproducten met vaste prijs.
- Made-to-order producten met duidelijke lead time.
- Geen file upload.
- Geen instant pricing.
- Alleen beperkte varianten als ze echt nodig zijn.
- Simpele verzend- of afhaalregels.
- Offerte-/aanvraagflow als standaard bestelwijze.
- Geen directe online betaling.

Expliciet buiten scope in fase 1:
- Directe checkout:
  - niet nodig voor de huidige shopbreedte en verhoogt de operationele complexiteit.
- Mollie:
  - uitgesteld tot er genoeg vaste, voorspelbare stockproducten zijn.
- Upload-to-print:
  - te veel opslag-, support- en prijscomplexiteit voor de huidige fase.
- Geautomatiseerde prijsberekening:
  - risicovol voor marges en foutgevoelig voor maatwerk.
- Complexe variantmatrix:
  - vergroot kans op dunne of verwarrende productstructuren.
- Geavanceerde B2B-orderlogica:
  - pas later zinvol zodra de productflow en aanvraagwerking stabiel zijn.

---

## 5. SEO-Safe URL Strategy

Allowed indexable shop routes:
- `/shop/`
- `/shop/[slug]/`
- `/en/shop/`
- `/en/shop/[slug]/`

Allowed non-indexable utility routes:
- toekomstige cart- of checkoutroutes, enkel indien later functioneel nodig
- interne modal- of querystates
- eventuele filter- of sorteerstates

Forbidden route patterns:
- nieuwe top-level shopnamespaces zoals `/store/`, `/products/` of `/catalog/`
- indexeerbare query-URL's zoals `?filter=`, `?sort=` of `?page=`
- elke wijziging aan bestaande content-URL's buiten `/shop/`

Coexistence met de rest van de site:
- Blog, pricing, services, segments, organizers, materials, portfolio en cases behouden hun eigen functie.
- Productpagina's moeten transactiewaarde toevoegen zonder de contentsite te overschaduwen.
- De shop blijft een conversion layer binnen de bredere site-architectuur.

Internal linking policy:
- Blog, gidsen, cases en services linken naar de shop wanneer de intent logisch koopgericht wordt.
- Niet elke pagina hoeft naar de shop te linken.
- Shoproutes mogen contextlinks teruggeven naar relevante gidsen of cases, maar niet geforceerd of op elke template-identieke manier.

---

## 6. Structured Data & Indexation Strategy

Product schema policy:
- `Product` schema alleen op indexeerbare productdetailpagina's.
- `ItemList` op de shop-home en later op categoriepagina's.
- `FAQPage` alleen waar de FAQ zichtbaar op de pagina staat.

Price, availability en offers:
- Price en availability in schema moeten overeenkomen met zichtbare UI en live productdata.
- Bij twijfel geen overdreven of onbetrouwbare offer claims uitsturen.
- `InStock`, `PreOrder` en `OutOfStock` moeten aansluiten op de echte bestelrealiteit.

Wanneer schema wel of niet wordt toegevoegd:
- Wel:
  - live productslugs
  - shop-home
  - latere categoriepagina's met echte inhoud
- Niet:
  - placeholderproducten
  - utilityroutes
  - verborgen of tijdelijke test-SKU's

Conflict prevention met bestaande schema's:
- `Article` alleen op blogpagina's.
- `FAQPage` en `HowTo` alleen waar de inhoud zichtbaar is.
- Geen ongecontroleerde mix van product- en artikelintentie op een URL.

Indexation control:
- Sitemap bevat alleen goedgekeurde indexeerbare shoproutes.
- Utility- of toekomstige checkoutroutes blijven buiten sitemap en buiten indexatie.
- Elke productslug houdt een self-referential canonical.

---

## 7. Phased Roadmap

### Phase 0 - Pre-flight & Safety Checks

Preconditions:
- Bevries de huidige SEO-baseline:
  - route-inventaris
  - canonical map
  - robots policy
  - sitemap snapshot
  - interne links
- Houd build en shoprouting stabiel:
  - geen regressies op `npm run build`
  - geen regressies op shop sitemap / canonical / metadata
- Zorg dat frontendcopy en live backenddata niet uit elkaar lopen.
- Maak een duidelijke beslisregel voor welk product echt live mag gaan.

Technical deliverables:
- shop-growth-roadmap als uitvoeringsdocument
- product launch checklist
- regressiechecks voor sitemap, robots en shop-SEO

### Phase 1 - Minimal Quote-First Shop MVP

Features:
- indexeerbare shop-home onder `/shop/`
- indexeerbare productdetailpagina's onder `/shop/[slug]/`
- shop-specifieke offerte-/aanvraagmodal
- kleine live catalogus met vaste prijzen of made-to-order pricing context
- duidelijke verzend- en afhaalcopy

SEO guarantees:
- bestaande niet-shoproutes blijven onaangeraakt
- productschema alleen op live, zichtbare productpagina's
- utilityroutes blijven non-indexable
- shop-home en productslugs blijven inhoudelijk uniek

Technical deliverables:
- stabiele productdataflow tussen frontend en backend
- offerteflow die shopcontext meeneemt
- duidelijke thank-you / confirmation flow

### Phase 2 - Variants & Logistics

Features:
- beperkte varianten waar functioneel nodig
- duidelijkere lead times
- stock versus made-to-order logica
- meer consistente verzendcopy per producttype

SEO guarantees:
- geen nieuwe indexeerbare URL's per variant tenzij daar expliciet SEO-rechtvaardiging voor is
- parent slug blijft canonical

Technical deliverables:
- uitgebreidere productdata
- betere availability mapping
- consistente backend/frontend productcopy per producttype

### Phase 3 - Conversion Optimization

Features:
- sterkere product-UX
- betere CTA-copy
- meer use-case links van content naar product
- heldere trust- en leveringsblokken

SEO guarantees:
- geen dunne landingspagina's
- geen geforceerde interne linkspam
- geen checkout-copy die niet matcht met de echte flow

Technical deliverables:
- verbeterde producttemplate
- related links en productresources
- meetbare shopofferteflow

### Phase 4 - Optional Direct Checkout

Deferred capabilities:
- cart- en checkoutautomatisatie
- directe online betaling
- Mollie redirect + webhook
- order status automation
- refund en payment state handling

Mollie pas toevoegen wanneer alle onderstaande voorwaarden tegelijk gehaald zijn:
- er zijn minstens 5 tot 10 vaste stockproducten met voorspelbare prijzen
- verzending en afhaling zijn voldoende gestandaardiseerd
- productpagina's vragen nog zelden manuele prijs- of projectvalidatie
- de offerteflow wordt aantoonbaar een rem op conversie
- refunds, annulaties en supportafhandeling zijn operationeel uitgewerkt
- webhook monitoring en order-state opvolging zijn voorzien

Waarom dit uitgesteld blijft:
- directe betaling voegt geen SEO-voordeel toe op zichzelf
- voor een kleine of hybride catalogus verhoogt het vooral beheerlast
- te vroege checkout maakt de shop complexer zonder bewezen rendement

---

## 8. Local Development & Build Safety

How `npm run dev` moet werken:
- Next.js draait los van live backendafhankelijkheden.
- Shoproutes kunnen veilig renderen met lokale of fallbackdata.
- De offerteflow mag lokaal getest worden zonder een payment provider.

How `npm run build` veilig blijft:
- Build hangt niet af van live product- of paymentconnecties.
- Shopmetadata, sitemap en productroutes moeten reproduceerbaar zijn.
- Geen enkele betalings- of checkoutcall mag tijdens build uitgevoerd worden.

Environment variable discipline:
- Frontend public env alleen voor niet-geheime waarden.
- Backend- en CRM-credentials alleen server-side.
- Mollie-credentials zijn geen vereiste voor fase 1 en horen dus niet tot de kritieke buildvereisten.

Payment/build safety rule:
- In fase 1 bestaat er geen nood aan payment calls in build of runtime.
- Als Mollie later wordt toegevoegd, blijft dat volledig runtime-only en strikt gescheiden van static generation.

---

## 9. Risk Register

| Risk | Likelihood | Impact | Mitigation Strategy |
| --- | --- | --- | --- |
| URL- of canonical drift op bestaande pagina's | Medium | Critical | route- en canonical-regressiechecks in CI |
| Frontend/backend mismatch in stock of availability | Medium | High | een bron van waarheid, handmatige verificatie bij live updates |
| Dikke shopcopy die niet klopt met echte offerteflow | Medium | High | quote-first copy governance, geen checkout-copy zonder checkout |
| Index bloat via filters of utilityroutes | Medium | High | geen indexeerbare querystates, geen sitemap-opname |
| Te vroege checkout/Mollie-introductie | Medium | High | pas toestaan na vaste fase-4 criteria |
| Dunne categoriepagina's met te weinig producten | High | Medium | categorieen pas vanaf meerdere sterke productslugs |
| Backend/API-endpoints publiek crawlbaar | Low | Medium | geen publieke linking, noindex/no crawl op operationele endpoints |
| Productdata wel live in backend maar niet visueel klaar op frontend | Medium | Medium | live backendwijzigingen altijd toetsen aan assets en frontendcopy |
| Handmatige opvolging wordt operationeel traag | Medium | Medium | duidelijke SLA, kleine catalogus, pas automatiseren wanneer echt nodig |

---

## 10. Success Metrics

SEO safety KPIs:
- geen rankingverlies op bestaande niet-shoppagina's
- geen onverwachte indexgroei buiten goedgekeurde shoproutes
- shopindexatie beperkt tot `/shop/`, `/en/shop/` en goedgekeurde productslugs
- geen regressies in structured data, canonicals of sitemap

Conversion KPIs:
- doorklik van `/shop/` naar productpagina's
- offerteaanvragen vanaf productpagina's
- offerteaanvragen vanaf shopmodal
- percentage shopaanvragen dat effectief wordt opgevolgd of besteld

Engagement KPIs:
- assisted conversions van blog/cases/services naar shop
- interactie met FAQ, specs en resource links op productpagina's
- stijging van productgerichte zoekimpressies

Technical KPIs:
- `npm run build` blijft groen
- shop-SEO checks blijven groen
- frontend/backend productdata blijven consistent
- geen broken image- of broken link-regressies op live shopproducten

---

Execution rule:
- Geen directe checkout of Mollie toevoegen voordat de quote-first shop stabiel draait, operationeel beheersbaar blijft en de Phase 4 criteria aantoonbaar gehaald zijn.
