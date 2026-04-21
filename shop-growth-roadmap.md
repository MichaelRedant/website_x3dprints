# Shop SEO Growth Roadmap

Date: 2026-04-20  
Scope: Groei-roadmap vanaf de huidige live shopstatus.  
Goal: De shop stap voor stap uitbouwen tot een sterke, vindbare en commercieel bruikbare 3D print shop voor Vlaanderen, zonder SEO-regressies.

---

## 1. Startpositie

De shopbasis staat technisch goed:
- `/shop/` en `/en/shop/` zijn indexeerbaar.
- Productpagina's hebben metadata, canonical, hreflang en `Product` schema.
- Cart en checkout zijn afgeschermd in `robots`.
- Shop en productslugs staan in de sitemap.
- De huidige SEO checks slagen.
- De shop draait bewust quote-first: productpagina's sturen naar aanvraag en opvolging, niet naar directe online betaling.
- Voor de huidige catalogus is er geen nood aan Mollie om commercieel werkbaar te blijven.

De belangrijkste beperking vandaag is niet techniek, maar diepte:
- Er is nog weinig shopdiepte.
- Er zijn nog geen categorie-landingspagina's.
- Er zijn nog te weinig interne links naar specifieke productslugs.
- De shop heeft nog weinig transactionele autoriteit tegenover de rest van de site.

Belangrijke operationele regel:
- Nieuwe producten zijn pas echt SEO-live als ze lokaal in `content/shop-products.ts` staan.
- Alleen backend/CRM data is vandaag nog niet genoeg om automatisch een indexeerbare productroute en sitemap-entry te krijgen.

---

## 2. Einddoel

We bouwen geen losstaand webshopeiland.

We bouwen een shop die:
- logisch aansluit op de bestaande SEO-site,
- commercieel bruikbaar is vanaf de eerste producten,
- groeit via content, interne links en duidelijke productstructuur,
- en op termijn een echte zoekbestemming wordt voor 3D print producten in Vlaanderen.

De shop moet tegelijk:
- goed indexeerbaar zijn,
- duidelijk zijn voor klanten,
- schaalbaar blijven,
- en geen rommelindex of dunne content aanmaken.

---

## 3. Werkregels

Wat we altijd doen:
- productpagina's als volwaardige landingspagina's behandelen
- elke nieuwe shop-URL koppelen aan interne links
- alleen indexeerbare pagina's maken met unieke inhoud
- shopgroei pas uitbreiden als de vorige laag degelijk staat
- offerte-aanvragen als primaire shopconversie behandelen
- copy altijd laten matchen met de echte aanvraagflow

Wat we niet doen:
- geen dunne categoriepagina's met 1 product
- geen indexeerbare filter-URL's
- geen geforceerde SEO-copy die onnatuurlijk leest
- geen backend-only producten als "live shoppagina" beschouwen
- geen URL-wijzigingen van live productslugs
- geen checkout- of betaalcopy gebruiken zolang de shop nog via aanvraag werkt
- geen Mollie toevoegen puur omdat het technisch mogelijk is

---

## 3A. Commercieel Model Nu

De huidige shopkeuze is bewust simpel:
- quote-first shop
- vaste productpagina's
- aanvraag via shopmodal of offerteflow
- manuele opvolging voor verzending, afhaling en bevestiging
- geen directe online betaling in fase 1

Waarom dit nu de juiste keuze is:
- het past bij een kleine, gecontroleerde catalogus
- het houdt pricing, stock en support beheersbaar
- het vermijdt checkoutcomplexiteit zonder SEO-winst op te offeren
- het laat toe om eerst product-SEO, interne links en shopstructuur op niveau te brengen

---

## 4. Prioriteiten Volgorde

Dit is de logische uitvoervolgorde vanaf vandaag.

### Stap 1 - Producttemplate naar echt shopniveau brengen

Doel:
- van elke productpagina een sterke individuele landingspagina maken

Acties:
- zichtbare FAQ-sectie toevoegen per product
- FAQ JSON-LD koppelen aan zichtbare vragen
- productcopy verder structureren rond use cases, levering en praktische vragen
- per product een duidelijke interne CTA-flow behouden

Waarom eerst:
- zolang productpagina's nog te licht zijn, verlies je rendement op elke nieuwe slug

Definition of done:
- elke live productpagina heeft unieke intro, highlights, specs, FAQ en duidelijke bestelcontext

### Stap 2 - Interne linkkracht naar shop en productpagina's opbouwen

Doel:
- `/shop/` en live productslugs sneller autoriteit geven

Acties:
- links toevoegen vanuit home
- links toevoegen vanuit relevante blogs
- links toevoegen vanuit organizers, materials, services of portfolio waar dat logisch is
- niet alleen naar `/shop/`, maar ook naar specifieke productslugs linken

Waarom tweede:
- zonder interne links blijft de shop technisch goed, maar SEO-matig zwak

Definition of done:
- minstens 5 tot 10 kwalitatieve interne links naar `/shop/`
- minstens 3 tot 5 kwalitatieve interne links naar de eerste live productslug

### Stap 3 - Product launch checklist standaardiseren

Doel:
- elk nieuw shopproduct op dezelfde kwaliteitslat leggen

Acties:
- vaste checklist maken voor:
  - naam
  - slug
  - samenvatting
  - uitgebreide beschrijving
  - OG-image
  - FAQ
  - specs
  - interne linktargets
  - NL en EN variant

Waarom nu:
- vanaf product 2 en 3 wil je geen ad-hoc shopstructuur meer

Definition of done:
- elke nieuwe productlancering kan via exact hetzelfde vaste proces gebeuren

### Stap 4 - Tweede en derde live product toevoegen

Doel:
- van een single-product shop naar een echte mini-collectie gaan

Acties:
- product 2 live zetten met volledige SEO-opbouw
- product 3 live zetten met volledige SEO-opbouw
- collectiepagina blijven aanscherpen op meerdere producten

Waarom pas na stap 1 tot 3:
- meer producten zonder degelijke structuur vergroot alleen de rommel

Definition of done:
- minimaal 3 live producten die elk aan de product-checklist voldoen

### Stap 5 - Eerste categoriepagina bouwen

Doel:
- de eerste echte categorie-intentie targetten

Beste eerste kandidaten:
- `/shop/spools`
- `/shop/organizers`
- `/shop/accessoires`

Voorwaarde:
- pas bouwen zodra er genoeg inhoud is
- een categoriepagina moet minstens 3 relevante producten en eigen unieke copy hebben

Definition of done:
- unieke H1
- unieke intro
- eigen FAQ
- ItemList schema
- interne links naar de juiste productslugs

---

## 5. Faseplan

### Fase 1 - Nu: 1 tot 3 live producten

Focus:
- kwaliteit per productpagina
- interne links
- stabiele launchflow
- quote-first duidelijkheid

Concrete doelen:
- eerste producttemplate versterken
- eerste productslug intern promoten
- 2 extra producten live krijgen zonder SEO-slordigheid

Belangrijkste KPI's:
- indexatie van `/shop/` en live productslugs
- impressions op shop en productpagina's
- eerste shopgerelateerde offerteaanvragen
- snelle en duidelijke opvolging van aanvragen

### Fase 2 - Mini-collectie: 3 tot 5 live producten

Focus:
- eerste categorie-intentie
- collectie-architectuur
- duidelijkere shopnavigatie

Concrete doelen:
- eerste categoriepagina live
- betere related products
- sterkere clustering tussen shop, blog en servicecontent

Belangrijkste KPI's:
- meer organische impressies op shopclusters
- hogere CTR op shop- en productroutes
- meer productgerichte offerteaanvragen

### Fase 3 - Groeilaag: 6 tot 15 live producten

Focus:
- inhoudelijke diepte
- transactionele SEO-clusters
- shop als zoekkanaal

Concrete doelen:
- meerdere categoriepagina's
- ondersteunende koopgidsen en use-case content
- productclusters per probleem of toepassing

Voorbeelden:
- reserveonderdelen
- organizers
- Bambu gerelateerde producten
- werkplaatsaccessoires

Belangrijkste KPI's:
- organisch verkeer op shop- en categoriepagina's
- interne doorklik naar productslugs
- stijgende share of voice op productgerichte zoekopdrachten

### Fase 4 - Later

Focus:
- verdere trust-signalen
- reviews
- slimmere commerciele flows
- geautomatiseerde shop-SEO processen
- optionele checkoutautomatisatie

Pas later toevoegen:
- productreviews
- rating schema
- uitgebreidere category systems
- backend-gestuurde SEO-manifests
- directe online betaling
- Mollie

Mollie blijft expliciet buiten fase 1, 2 en 3.

---

## 6. Product SEO Checklist

Elke nieuwe live productpagina moet minstens dit hebben:

### Inhoud
- unieke productnaam
- duidelijke slug
- unieke samenvatting
- langere beschrijving met praktische context
- zichtbare use cases
- highlights
- specs
- lever- of afhaalduidelijkheid
- FAQ

### SEO
- metadata title
- meta description
- canonical
- hreflang
- OG-image
- `Product` schema
- opname in sitemap
- opname in interne linking

### UX / conversie
- duidelijke hoofd-CTA
- offerteflow helder uitgelegd
- prijs zichtbaar waar logisch
- beschikbaarheid zichtbaar waar logisch
- geen verwarrende checkout-copy als het nog via aanvraag loopt

### Publicatie
- NL en EN versie
- shopcollectie blijft logisch lezen met meerdere items
- minstens 1 relevante interne link vanaf een bestaande sterke pagina

---

## 7. Categorie Regels

We maken pas een categoriepagina als die echt bestaansrecht heeft.

Een categorie mag pas live als:
- er minstens 3 relevante producten in zitten
- de categorie een eigen zoekintentie heeft
- de pagina meer is dan een productfilter

Een goede categoriepagina bevat:
- unieke titel
- unieke intro
- korte koophulp
- FAQ
- zichtbare productlijst
- interne links naar ondersteunende content

Wat geen categoriepagina mag zijn:
- een lege hub
- een filter met querystring
- een kopie van de shop-home

---

## 8. Interne Link Strategie

De shop groeit niet alleen via nieuwe pagina's, maar via linkstructuur.

Eerst opbouwen vanuit:
- home
- shop-home
- relevante blogs
- services
- organizers
- materials
- portfolio waar toepasselijk

Regel:
- link alleen als de intent logisch is
- liever 5 sterke contextuele links dan 50 generieke template-links

Prioriteit:
1. `/shop/`
2. eerste live productslug
3. nieuwe topcategorieen zodra die bestaan

---

## 9. KPI's

### SEO KPI's
- indexeerbare shoppagina's zonder fouten
- impressions op `/shop/`
- impressions op productslugs
- CTR op shop- en productpagina's
- groei in querydekking rond productintentie

### Conversie KPI's
- aantal shopofferte-aanvragen
- doorklik van `/shop/` naar productpagina's
- doorklik van productpagina's naar offerteflow
- responstijd op shopaanvragen
- aandeel shopaanvragen dat effectief tot bestelling leidt

### Kwaliteits KPI's
- geen SEO check regressies
- geen index-bloat via filters of utility routes
- geen dunne product- of categoriepagina's

---

## 10. Wanneer Mollie Pas Zinvol Wordt

Mollie komt pas in beeld als de shop duidelijk voorbij het huidige quote-first model groeit.

Minimale voorwaarden:
- minstens 5 tot 10 vaste stockproducten met stabiele prijs
- verzendlogica is voorspelbaar en herhaalbaar
- klanten hebben zelden nog extra bevestiging of maatwerkvalidatie nodig
- productpagina's dragen duidelijke direct-buy intent, niet alleen aanvraagintentie
- de huidige offerteflow wordt aantoonbaar een rem op conversie
- refunds, annulaties en supportafhandeling zijn praktisch uitgewerkt
- webhook- en orderstatusmonitoring kunnen betrouwbaar opgezet worden

Tot die voorwaarden gehaald zijn, blijft het betere model:
- sterke productpagina's
- duidelijke offerteflow
- kleine, beheersbare catalogus
- geen extra betaalcomplexiteit

---

## 11. Beslisregels

Als we twijfelen over de volgende stap:

1. eerst bestaande productpagina's sterker maken
2. dan interne links uitbreiden
3. dan nieuwe producten toevoegen
4. dan pas categorieen bouwen
5. pas daarna bredere schaalvergroting

De volgorde is bewust streng:
- kwaliteit eerst
- structuur daarna
- volume pas op het einde

---

## 12. Direct Volgende Actie

De eerstvolgende logische stap is:

### Product 3 kiezen en lanceren via de bestaande launch-checklist

Waarom dit nu de juiste stap is:
- de eerste twee producten staan inhoudelijk op niveau
- shopdiepte is nu de grootste beperkende factor
- een derde sterk product maakt de eerste echte categorie-intentie mogelijk
- het houdt de focus op productkwaliteit in plaats van te vroege checkoutcomplexiteit

Na die stap volgt:
1. de eerste categorie-intentie kiezen
2. een echte categoriepagina pas voorbereiden zodra minstens 3 productslugs klaar staan
3. Mollie uit scope houden tot de voorwaarden in sectie 10 gehaald zijn
