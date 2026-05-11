# Seasonal Expansion Priority

## Doel
Deze roadmap bepaalt welke extra seasonal campagnes commercieel zinvol zijn voor `x3dprints.be`, welke timinglogica ze nodig hebben, en in welke volgorde ze best gebouwd worden.

De bedoeling is:
- seasonal automatisering uitbreiden zonder SEO-chaos
- alleen campagnes toevoegen die echt passen bij de huidige site
- een centrale seasonal engine voorbereiden die meerdere timingtypes aankan

---

## Huidige actieve set
De site heeft vandaag al:
1. `valentine`
2. `mothers-day`
3. `fathers-day`
4. `back-to-school`
5. `winter`
6. `spring`
7. `summer`
8. `autumn`

Dat is een sterke basis. Nieuwe campagnes moeten dus:
- inhoudelijk duidelijk verschillen
- genoeg beelden hebben
- een eigen landingswaarde hebben

---

## Aanbevolen extra campagnes

### P1. Communie & Lentefeest
**Prioriteit:** hoog  
**Waarom:** sterke Vlaamse fit, goed voor gepersonaliseerde gifts, naamitems, decor, tafelstukken en kleine reeksen.

**Beste timingtype:** `date_range`
- aanbevolen venster:
  - start: `1 april`
  - einde: `31 mei`
- alternatief:
  - start `6 weken voor Pasen`
  - einde `4 weken na Pasen`

**Waarom niet op 1 vaste dag:**
- communies en lentefeesten liggen gespreid
- de koopintentie start ruim vooraf

**Aanbevolen landingsrichting:**
- blog of segment rond gepersonaliseerde communie- en lentefeestprints
- focus op gifts, tafelnaamkaartjes, decor, herinneringsitems

**Minimum contentvereiste:**
1. minstens 4 beelden
2. 1 echte landingspagina
3. 1 interne link vanaf home/blog/portfolio

---

### P2. Einde Schooljaar / Juf-Meester Bedankjes
**Prioriteit:** hoog  
**Waarom:** sterke gift-intentie, sluit goed aan op kleine gepersonaliseerde objecten.

**Beste timingtype:** `date_range`
- aanbevolen venster:
  - start: `1 juni`
  - einde: `30 juni`

**Alternatief:** dynamisch tussen `1 juni` en de laatste schoolweek, maar dat geeft weinig extra waarde tegenover een vaste range.

**Aanbevolen landingsrichting:**
- kleine naamcadeaus
- desk items
- keychains
- mini organizers of bedankjes in kleine oplages

**Minimum contentvereiste:**
1. minstens 3 bruikbare beelden
2. 1 duidelijke giftpagina
3. CTA naar offerte of contact

---

### P3. Sinterklaas
**Prioriteit:** hoog  
**Waarom:** veel logischer voor jouw markt dan Black Friday, en visueel/commercieel sterker voor gifts en decor.

**Beste timingtype:** `fixed_date`
- target datum: `6 december`
- aanbevolen actief venster:
  - `21 dagen voor`
  - `2 dagen na`

**Aanbevolen landingsrichting:**
- gepersonaliseerde naamitems
- decor
- kleine cadeaus
- schoencadeau-achtige objecten

**Minimum contentvereiste:**
1. minstens 4 beelden
2. eigen pagina of sterke subsectie
3. interne links vanaf seasonal hub en home

---

### P4. Dag Van De Leerkracht
**Prioriteit:** medium  
**Waarom:** klein maar zuiver moment, bruikbaar als extra giftcampagne.

**Beste timingtype:** `fixed_date`
- target datum: `5 oktober`
- aanbevolen actief venster:
  - `14 dagen voor`
  - `2 dagen na`

**Opmerking:**
- alleen bouwen als er ook echt visuele assets voor zijn
- anders blijft dit te dun

---

### P5. B2B Eindejaar Relatiegeschenken
**Prioriteit:** medium tot hoog  
**Waarom:** commercieel interessant, zeker voor bedrijven, maar inhoudelijk moet dit apart blijven van gewone kerstdecor.

**Beste timingtype:** `date_range`
- aanbevolen venster:
  - start: `1 oktober`
  - einde: `20 december`

**Waarom aparte campagne:**
- andere intentie dan `winter`
- minder decor
- meer B2B gifts, branded items en kleine reeksen

**Aanbevolen landingsrichting:**
- relatiegeschenken
- branded desk items
- event gifts
- eindejaarsgeschenken in kleine oplage

---

## Campagnes Die Technisch Dynamisch Kunnen

### 1. Pasen
**Status nu:** onderdeel van `spring`  
**Kan dynamisch?** ja

**Beste timingtype:** `relative_to_easter`
- voorbeeld:
  - start: `42 dagen voor Pasen`
  - einde: `7 dagen na Pasen`

**Advies:**
- niet meteen opsplitsen tenzij je genoeg paasgerichte beelden en copy hebt
- eerst `spring` behouden is eenvoudiger

---

### 2. Halloween
**Status nu:** onderdeel van `autumn`  
**Kan dynamisch?** ja

**Beste timingtype:** `fixed_date`
- target datum: `31 oktober`
- voorbeeld:
  - start: `21 dagen voor`
  - einde: `1 dag na`

**Advies:**
- pas opsplitsen als Halloween voor jou commercieel sterk genoeg is
- anders blijft `autumn` functioneel genoeg

---

### 3. Kerst
**Status nu:** onderdeel van `winter`  
**Kan dynamisch?** ja

**Beste timingtype:** `fixed_date`
- target datum: `25 december`
- voorbeeld:
  - start: `35 dagen voor`
  - einde: `2 dagen na`

**Advies:**
- later mogelijk opsplitsen van `winter`
- nu nog niet nodig zolang winter goed werkt

---

## Campagnes Die Ik Niet Prioriteer

### Black Friday / Cyber Monday
**Technisch mogelijk:** ja  
**Commercieel nuttig voor jouw site:** laag

Waarom niet prioriteren:
- voelt minder passend bij jouw merk
- weinig eigen visuele of inhoudelijke landingswaarde
- kan goedkoop of discount-gedreven overkomen

### Losse maandcampagnes
Bijvoorbeeld:
- maart promo
- juli deals
- november specials

Niet doen:
- te dun
- weinig SEO-waarde
- te veel onderhoud

---

## Timingtypes Die De Engine Best Ondersteunt

Voor de centrale seasonal config is dit de juiste set:

1. `date_range`
- voor vaste periodes zoals zomer, schooleinde, B2B eindejaar

2. `fixed_date`
- voor vaste kalenderdagen zoals Sinterklaas of Dag van de Leerkracht

3. `nth_weekday_of_month`
- voor campagnes zoals Moederdag en Vaderdag

4. `relative_to_easter`
- voor Pasen en eventueel communie/lentefeest-achtige voorjaarswindows

5. `manual_override`
- voor uitzonderingen of tijdelijke commerciële nadruk

---

## Aanbevolen Bouwvolgorde

### Fase 1
1. `Communie & Lentefeest`
2. `Sinterklaas`

**Waarom:**
- sterkste lokale fit
- duidelijke seasonal identiteit
- goede visuele en commerciële waarde

### Fase 2
1. `Einde schooljaar / juf-meester`
2. `B2B eindejaar relatiegeschenken`

**Waarom:**
- logisch commercieel vervolg
- goed combineerbaar met bestaande content

### Fase 3
1. `Dag van de Leerkracht`
2. optioneel `Pasen` los van `spring`
3. optioneel `Halloween` los van `autumn`

**Waarom:**
- pas nuttig als de basis al sterk staat

---

## Kwaliteitsdrempel Per Nieuwe Seasonal

Voordat een nieuwe campaign live seasonal weight krijgt:

1. minstens `3` goede beelden, liever `4+`
2. minstens `1` echte landingspagina
3. duidelijke NL en EN label
4. alt-teksten die ook zonder campagnecontext logisch zijn
5. minstens `2` interne links vanaf bestaande pagina's
6. geen overlap die de hoofdpositionering van de site wegdrukt

---

## Praktische Conclusie

Als er maar enkele extra campagnes bijkomen, zijn dit de juiste:

1. `Communie & Lentefeest`
2. `Sinterklaas`
3. `Einde schooljaar / Juf-Meester`
4. `B2B eindejaar relatiegeschenken`

En qua engine moet je later werken met:

1. `date_range`
2. `fixed_date`
3. `nth_weekday_of_month`
4. `relative_to_easter`
5. `manual_override`

Dat is voldoende om praktisch al je relevante seasonal use cases automatiserbaar te maken.
