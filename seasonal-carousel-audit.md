# Seasonal Carousel Audit

## Scope
- `app/(home)/page.tsx:169`
- `app/(home)/page.tsx:278`
- `components/LocationShowcase.tsx:112`
- `components/LocationShowcase.tsx:229`

## Goal
Deze audit beoordeelt de huidige seasonal-logica voor:
- de homepagina
- lokale landingspagina's
- uitbreidbaarheid zonder SEO-regressie

Er zijn in dit document bewust **geen codewijzigingen** opgenomen. Dit is een beslisdocument voor de volgende stap.

## Current State
De huidige seasonal-opzet werkt al degelijk:
- er is een actieve seasonal CTA op home en lokale pagina's
- out-of-season beelden worden gefilterd
- seasonal routes bestaan al als echte contentpagina's
- lokale pagina's tonen nu deterministisch twee seasonal beelden vooraan

Actieve seasonal clusters vandaag:
1. `Valentijn`
2. `Vaderdag & Moederdag`
3. `Back to School`
4. `Winter, Kerst & Nieuwjaar`
5. `Lente & Pasen`
6. `Zomer`
7. `Herfst & Halloween`

## Findings

### 1. Home en lokale pagina's gebruiken twee aparte seasonal engines
**Severity:** hoog

De seasonal brondata en selectie-logica staan dubbel:
- home: `app/(home)/page.tsx:169`, `app/(home)/page.tsx:278`
- local: `components/LocationShowcase.tsx:112`, `components/LocationShowcase.tsx:229`

Gevolg:
- drift is bijna gegarandeerd
- uitbreidingen moeten op twee plaatsen gebeuren
- home en local kunnen visueel of inhoudelijk uit sync raken

Concreet voorbeeld:
- de lokale carousel heeft deterministische city-based variatie en forceert twee seasonal beelden: `components/LocationShowcase.tsx:286-301`
- de homecarousel doet dat nog niet op dezelfde manier: `app/(home)/page.tsx:939-943`

### 2. Seasonal assets en alt-teksten zijn hardcoded in componentcode
**Severity:** hoog

Elke uitbreiding vereist code-aanpassing in plaats van contentbeheer.

Impact:
- foutgevoelig
- trager om nieuwe campagnes toe te voegen
- moeilijk schaalbaar als je meer seasonal campagnes wilt testen

Wat nu hardcoded is:
- route
- beelden
- alt-tekst
- timing
- CTA-label

### 3. Campaign taxonomy is gemengd
**Severity:** medium

De huidige set combineert:
- echte seizoenen: lente, zomer, herfst, winter
- feestdagen: Valentijn, Pasen, Halloween, Kerst
- commerciële momenten: Back to School, Vaderdag, Moederdag

Dat werkt operationeel, maar conceptueel is het één vlakke lijst.

Gevolg:
- moeilijker om later prioriteiten te beheren
- moeilijker om overlap correct te behandelen
- minder duidelijk wat "seasonal" is en wat "campaign-driven" is

### 4. Timingregels zijn correct genoeg, maar blijven fragiel
**Severity:** medium

De timing zit hardcoded in `getSeasonCta`:
- home: `app/(home)/page.tsx:278`
- local: `components/LocationShowcase.tsx:229`

Sterk:
- Moederdag en Vaderdag worden dynamisch berekend
- Back to School, winter, lente, zomer en herfst volgen begrijpelijke vensters

Zwak:
- aanpassingen aan timing vragen codewijzigingen
- er is geen aparte prioriteitslaag
- uitzonderingen per regio/campagne zijn niet configureerbaar

### 5. Home en local hebben niet exact dezelfde UX-regels
**Severity:** medium

Lokaal:
- twee seasonal beelden vooraan
- city-based deterministische variatie

Home:
- seasonal beelden worden wel vooraan gezet
- maar niet via exact dezelfde selectie- en quotaregels

Dat is niet fout, maar het verhoogt de kans dat de ene plek beter evolueert dan de andere.

### 6. Seasonal uitbreiding is nu technisch mogelijk, maar redactioneel niet bewaakt
**Severity:** medium

Er is vandaag geen expliciete checklist voor:
- minimum aantal beelden per campagne
- minimum kwaliteit van alt-teksten
- wanneer een campagne sterk genoeg is om live mee te draaien
- wanneer een seasonal pagina te dun is om prominent te tonen

Voor SEO is dat relevant: een seasonal CTA of carousel heeft alleen zin als de onderliggende route sterk genoeg is.

## What Already Works Well

### 1. De logica is niet echt random
Dat is goed. Echte random output is onwenselijk voor SEO en QA. De lokale pagina's gebruiken nu een stabiele, deterministische variatie per stad.

### 2. Seasonal content is additief
De seasonal laag vervangt de hoofdpositionering van de site niet. Dat is correct voor je merk en voor SEO.

### 3. Out-of-season filtering voorkomt visuele ruis
Dit houdt de carousel relevanter en voorkomt dat winter- of paasbeelden op verkeerde momenten domineren.

### 4. Seasonal routes zijn echte bestemmingspagina's
Dat is veel sterker dan enkel een carousel zonder inhoudelijke landingspagina.

## Risks If Expanded Without Structure

1. Te veel code-duplicatie tussen home en local
2. Visuele drift tussen pagina's
3. Meer campagnes zonder genoeg sterke beelden
4. Te veel seasonal focus op momenten waarop B2B/functioneel werk belangrijker is
5. Meer handwerk bij elk nieuw seizoen

## Recommended Direction

### P0. Central seasonal registry
Maak later één centrale registry voor:
- campaign key
- route
- label NL/EN
- start/end logic
- beeldset
- alt-teksten
- prioriteit
- minimum aantal beelden

Doel:
- één source of truth
- home en local gebruiken dezelfde bron
- minder drift

### P1. Scheid "campaign type" van "display rules"
Maak later onderscheid tussen:
- `season`
- `holiday`
- `commercial_moment`

En apart:
- hoeveel beelden op home
- hoeveel beelden op local
- welke campagne de CTA wint

Dat maakt uitbreiding veel robuuster.

### P2. Behoud deterministische output
Niet veranderen:
- geen echte random shuffle
- geen runtime wisselende content zonder vaste seed

Wel behouden:
- stabiele variatie per stad
- stabiele variatie per pagina-type

### P3. Definieer minimum contentkwaliteit per seasonal cluster
Aanbevolen minimum per seasonal campagne:
1. minstens 3 bruikbare beelden
2. 1 sterke landingspagina
3. 1 interne link vanaf relevante blog/segment/home
4. duidelijke NL/EN labels
5. alt-teksten die ook zonder campagnecontext logisch blijven

### P4. Houd seasonal altijd ondersteunend
Aanbevolen regel:
- seasonal mag inspireren
- maar mag de kern van de site niet overstemmen

Praktisch:
- home: seasonal als accent
- lokale pagina's: 2 seasonal beelden is goed
- rest van de carousel moet functionele of brede portfolio-items blijven tonen

## Good Expansion Candidates
Alleen uitbreiden als er echte content en beelden voor zijn.

Sterk kansrijk:
1. `Sinterklaas / eindejaar kleine gifts`
2. `Communie / lentefeest`
3. `Einde schooljaar / bedankjes`
4. `Beurzen / zomer-events`
5. `Eindejaar relatiegeschenken B2B`

Minder interessant tenzij er sterke beelden zijn:
1. Black Friday
2. Nieuw schooljaar tweede golf naast Back to School
3. losse maandcampagnes zonder eigen landingswaarde

## SEO Guidance

### Keep
- vaste seasonal routes
- stabiele CTA-doelen
- seasonal als ondersteunende laag
- deterministische volgorde

### Avoid
- metadata of H1 dynamisch laten wisselen per dag
- echte random carousel-output
- nieuwe seasonal routes zonder degelijke content
- te veel overlap tussen campagnes

## Recommended Next Step
Niet coderen, wel eerst beslissen:

1. welke extra seasonal clusters echt commercieel relevant zijn
2. welke bestaande seasonal pages sterk genoeg zijn om zwaarder te promoten
3. of home en local later exact dezelfde seasonal registry moeten delen

## Suggested Future Structure
Als dit later gebouwd wordt, is dit de beste richting:

1. `seasonal-campaign registry`
2. gedeelde selector voor home + local
3. page-type rules:
   - home: accent
   - local: 2 seasonal beelden vast
4. content QA per campaign
5. later eventueel CRM- of content-driven beheer

## Practical Conclusion
De huidige functie is al bruikbaar en veilig genoeg voor SEO.

De grootste winst zit niet in "meer random", maar in:
1. centraliseren
2. onderscheid maken tussen campaign types
3. uitbreiden met alleen sterke seasonal clusters
4. dezelfde bron laten werken voor home en local
