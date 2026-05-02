# Local Landing Pages Roadmap

Date: 2026-05-02
Scope: Alle lokale landingspagina's onder `/locaties/` en `/3d-printen-in-*`.
Goal: De lokale cluster ombouwen van brede template-dekking naar unieke, people-first lokale SEO-pagina's die veilig kunnen groeien, inclusief Limburg.

---

## 1. Hoofddoel

We willen geen grotere massa aan bijna identieke stadspagina's.

We willen:
- sterkere lokale pagina's met echte unieke waarde
- duidelijkere lokale relevantie per stad of provincie
- minder risico op doorway-signalen
- betere interne linking vanuit de pillar pages
- meer visuele variatie zonder SEO-regressie
- een groeipad naar Limburg zonder opnieuw in een template-val te lopen

---

## 2. Niet-onderhandelbare regels

Wat altijd moet gelden:
- elke lokale pagina moet zelfstandig nuttig zijn voor een bezoeker uit die stad of regio
- elke lokale pagina moet een eigen invalshoek, voorbeelden en lokale context hebben
- de eerste 150-200 tekens moeten de lokale vraag meteen beantwoorden
- elke pagina moet een duidelijke H1, lokale intro, FAQ, bronnen en update-datum hebben
- interne links moeten logisch zijn: lokale pagina -> pillar -> materialen -> pricing -> contact
- lokale pagina's moeten naar `/locaties/` teruglinken
- lokale pagina's mogen niet alleen bestaan om extra zoekwoorden te targetten

Wat niet meer mag:
- geen secties zoals `Veel gezochte termen in <stad>`
- geen bijna identieke copyblokken voor tientallen steden
- geen generieke lokale paragrafen zonder echte context
- geen slordigheden zoals dubbele stadnamen of kapotte service-area zinnen
- geen random client-side shuffle per page load
- geen nieuwe indexeerbare lokale pagina's zonder unieke contentlaag

---

## 3. Audit-samenvatting

Huidige hoofdproblemen die eerst aangepakt moeten worden:
- de lokale cluster is te groot en te templated
- te veel pagina's delen dezelfde structuur, reviewblokken en CTA-flow
- de lokale pagina's zijn inhoudelijk zwakker dan de core pages `/3d-printen/`, `/services/`, `/materials/`, `/pricing/` en `/contact/`
- lokale pagina's missen vaak zichtbare `Laatst bijgewerkt` en `Bronnen`
- sommige lokale pagina's bevatten expliciete keyworddump-secties
- de projectcarousel op lokale pagina's is te uniform en te seasonal-heavy
- er zitten nog copyfouten en outputfouten in sommige lokale pagina's

Gevolg:
- de lokale cluster oogt eerder als schaalcontent dan als redactioneel verzorgde lokale landingspagina's
- dat beperkt de kans op sterke lokale rankings en verhoogt het risico op quality-demotions

---

## 4. Gewenste eindstructuur

We bouwen de lokale SEO in 3 lagen op.

### Laag A - Core hubs
- `/3d-printen/`
- `/locaties/`
- later: `/3d-printen-in-limburg/`

### Laag B - Prioriteitssteden
Dit zijn de pagina's die eerst het meeste aandacht krijgen.

Bestaand kerngebied:
- Herzele
- Gent
- Aalst
- Oudenaarde
- Geraardsbergen
- Antwerpen
- Leuven
- Kortrijk

Nieuwe Limburg-pool:
- Hasselt
- Genk
- Sint-Truiden
- Tongeren-Borgloon
- Maasmechelen

### Laag C - Long-tail gemeenten
- enkel behouden of toevoegen als ze inhoudelijk afgeleid kunnen worden van een echte stadshub
- geen volwaardige indexeerbare pagina zonder unieke lokale laag
- zwakke pagina's later evalueren voor samenvoegen, herschrijven of noindex

---

## 5. Verplichte inhoud per lokale pagina

Elke lokale pagina moet minimaal deze blokken hebben:

1. Hero
- lokale H1
- korte, concrete intro
- duidelijke regiovermelding
- primaire CTA naar offerte
- secundaire CTA naar portfolio of relevante case

2. Lokale context
- voor wie we in die regio typisch werken
- hoe levering of afhalen voor die regio werkt
- welke use cases daar logisch zijn
- waarom die regio commercieel relevant is voor X3DPrints

3. Visueel bewijs
- lokale carousel met gevarieerde beelden
- minstens 1 functioneel/B2B-beeld in de eerste 3 slides
- geen identieke beeldvolgorde op alle steden

4. Materiaal- en use-case blok
- 3 kernmaterialen of materiaalkeuzes
- gekoppeld aan lokale use cases
- geen copy-paste matrix zonder lokale duiding

5. Typische sectoren
- per stad of provincie een andere selectie
- bv. logistiek, retail, scholen, makers, events, horeca, industrie, prototyping

6. FAQ
- minimum 3 lokale FAQ's
- niet enkel generieke sitebrede vragen
- lokale leverzone, aanlevering, timing en projecttypes meenemen

7. Bronnen en referenties
- zichtbare bronsectie onderaan
- links naar relevante lokale of primaire bronnen waar zinvol

8. Laatst bijgewerkt
- zichtbaar op de pagina
- alleen aanpassen bij echte inhoudelijke update

---

## 6. Uniekheidsmatrix per pagina

Elke lokale pagina moet minimaal op deze assen verschillen:
- hero-insteek
- sectorfocus
- lokale use cases
- serviced areas
- lokale contextparagraaf
- FAQ-set
- interne links
- beeldselectie
- reviewkeuze of quotevolgorde
- lokale accenten en nabijgelegen plaatsen

Minimaal doel:
- geen lokale pagina mag nog aanvoelen als enkel `stadnaam vervangen in dezelfde template`

---

## 7. Foto- en carouselbeleid

### 7.1 Principes

De carousel mag gevarieerder worden, maar niet chaotisch.

Wat we willen:
- eerste slide moet seasonal zijn
- seasonal slide mag randomizen binnen het actuele seizoen
- overige slides moeten uit een gecureerde pool komen
- lokale pagina's moeten onderling verschillend aanvoelen
- functionele en B2B-relevante beelden moeten meer gewicht krijgen

### 7.2 Regels voor slide 1

Slide 1:
- altijd seasonal
- alleen beelden uit het juiste seizoen
- randomisatie alleen binnen die seizoenspool
- geen runtime-random per bezoek
- wel stabiele selectie per build of per geplande publicatieperiode

Voorbeeld seizoenslogica:
- lente: pasen, voorjaar, lichte decor, retail seizoen
- zomer: tuin, outdoor, events, festival/retail
- herfst: back-to-school, najaar, organizers, functionele overgangsprojecten
- winter: kerst, eindejaar, gifts, winterse retail

### 7.3 Regels voor slides 2+

Slides 2 en verder:
- geen seizoensafhankelijkheid nodig
- voorkeur voor functionele en commercieel relevante beelden
- mix van:
  - prototypes
  - organizers
  - retail displays
  - functionele onderdelen
  - cases
  - gepersonaliseerde producten
- geen duplicaten binnen dezelfde carousel
- geen identieke volgorde op alle lokale pagina's

### 7.4 Technische SEO-regel voor randomisatie

De randomisatie moet deterministisch blijven.

Dat betekent:
- geen willekeurige shuffle client-side na page load
- geen andere HTML per request
- wel een stabiele selectie op basis van bijvoorbeeld:
  - stadslug
  - seizoen
  - builddatum of contentversie

Waarom:
- stabiele HTML is beter voor QA, caching en SEO
- screenshots, QA en indexing blijven dan voorspelbaar

### 7.5 Metadata per beeld

Voor latere CRM- of contentlogica willen we per beeld tags kunnen meegeven:
- `season`: spring / summer / autumn / winter / evergreen
- `use_case`: prototype / organizer / retail / outdoor / decor / personal / b2b
- `audience`: b2b / consumer / mixed
- `location_priority`: city / province / generic
- `allow_home_carousel`
- `allow_location_carousel`
- `allow_portfolio`
- `weight`

---

## 8. Wat eerst herschreven moet worden

### P0 - Eerst fixen
- encoding- en copyfouten op de pillar `/3d-printen/`
- keyworddump-secties verwijderen uit de lokale pagina's
- service-area slordigheden corrigeren
- lokale pagina-template verrijken met update-datum, FAQ en bronnen
- lokale carousels minder generiek maken

### P1 - Eersteklas lokale set
Deze pagina's eerst naar topniveau brengen:
- Herzele
- Gent
- Aalst
- Oudenaarde
- Geraardsbergen
- Antwerpen

### P2 - Tweede golf
- Leuven
- Kortrijk
- Dendermonde
- Deinze
- Lokeren
- Mechelen


Aanpak:
- eerst `/3d-printen-in-limburg/`
- daarna `/3d-printen-in-hasselt/`
- daarna `/3d-printen-in-genk/`
- daarna alleen uitbreiden als performance en inhoudsniveau goed genoeg zijn

---

## 9. Limburg-plan

Limburg moet niet als losse massa pagina's starten.

### Fase 1
Maak 1 provinciehub:
- `/3d-printen-in-limburg/`

Die pagina moet:
- Limburg als geheel afdekken
- lever- en afhaalcontext geven
- use cases voor maakindustrie, retail, events en particulieren benoemen
- linken naar Hasselt en Genk zodra die live zijn

### Fase 2
Maak 2 sterke stadspagina's:
- `/3d-printen-in-hasselt/`
- `/3d-printen-in-genk/`

### Fase 3
Alleen verder uitbreiden als nodig:
- `/3d-printen-in-sint-truiden/`
- `/3d-printen-in-tongeren-borgloon/`
- `/3d-printen-in-maasmechelen/`

Kernregel:
- Limburg groeit via hubs en prioriteitssteden
- niet via brute volume-uitbreiding

---

## 10. Interne linkstrategie

Elke lokale pagina moet minimaal linken naar:
- `/3d-printen/`
- `/materials/`
- `/pricing/`
- `/contact/`
- `/locaties/`
- 1 relevante case
- 1 relevant blogartikel
- 1 relevante segmentpagina of servicepagina

De hub `/locaties/` moet ook slimmer worden:
- minder indexeerbare massa-etalage
- meer redactionele gids voor regio's en prioriteitssteden
- steden groeperen per provincie of kernregio

---

## 11. UX- en conversieregels

Lokale pagina's moeten niet alleen ranken, maar ook converteren.

Daarom:
- offerte-CTA boven de vouw
- adres/afhaalcontext duidelijk maar compact
- lokale review zichtbaar, maar niet altijd exact dezelfde review bovenaan
- geen tekstmuren zonder visuele onderbreking
- materiaalkeuze en typische opdrachten scanbaar houden
- contactroute altijd eenvoudig houden

---

## 12. QA-checklist per lokale pagina

Voor livegang moet elke lokale pagina slagen op:
- unieke H1 en intro
- geen keyworddump
- geen copyfouten of encodingfouten
- zichtbare `Laatst bijgewerkt`
- zichtbare `Bronnen`
- minimum 3 lokale FAQ's
- unieke lokale use-case laag
- unieke carouselvolgorde
- correcte serviced areas
- correcte interne links
- geen console errors
- mobiel geen afgekapt beeld of copy

---

## 13. KPI's

SEO:
- meer impressies op lokale stad- en provincietermen
- hogere CTR op prioriteitssteden
- meer indexeerbare lokale pagina's die echt verkeer trekken
- minder dunne pagina's zonder impressies

Kwaliteit:
- lagere overlap tussen lokale pagina's
- minder template-signalen
- hogere redactionele kwaliteit per pagina

Conversie:
- meer offerte-aanvragen vanaf lokale pagina's
- meer kliks naar contact vanaf prioriteitssteden
- hogere engagement op lokale carousels en cases

---

## 14. Concrete uitvoervolgorde

1. Fix `/3d-printen/` copy- en encodingissues.
2. Verwijder keyworddump-secties uit lokale pagina's.
3. Voeg `Laatst bijgewerkt`, `Bronnen` en lokale FAQ toe aan de lokale template.
4. Herwerk de lokale carousel naar seasonal-first plus deterministische randomisatie.
5. Herschrijf Herzele, Gent, Aalst, Oudenaarde, Geraardsbergen en Antwerpen volledig.
6. Maak `/locaties/` redactioneel sterker en minder massa-gedreven.
7. Bouw daarna pas `/3d-printen-in-limburg/`.
8. Voeg daarna Hasselt en Genk toe.
9. Meet performance en beslis pas dan over extra Limburgse steden.

---

## 15. Beslisregel

Nieuwe lokale pagina's mogen pas live als:
- de template inhoudelijk sterk genoeg is
- de pagina unieke lokale waarde heeft
- de carousel niet dezelfde standaardset toont als elke andere pagina
- de pagina meer is dan een zoekterm-variant op bestaande content

Als een nieuwe pagina deze drempel niet haalt:
- niet publiceren
- of meenemen als niet-indexeerbare ondersteunende pagina tot de content sterk genoeg is
