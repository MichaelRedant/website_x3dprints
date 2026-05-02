# Seasonal Automation Roadmap

## Goal
De seasonal laag moet:
- automatisch wisselen
- home en lokale landingspagina's synchroon houden
- zo weinig mogelijk handmatig werk vragen
- SEO-correcte HTML behouden

## Current State

### Seasonal logic today
- Home seasonal data + timing staat in `app/(home)/page.tsx`
- Lokale seasonal data + timing staat in `components/LocationShowcase.tsx`
- De huidige CI in `.github/workflows/ci.yml` doet:
  - lint
  - security checks
  - build
  - SEO fast checks
  - SEO deep checks op `main`
- Er is **nog geen automatische deploy-workflow**

### Current limitation
De site is statisch geëxporteerd. Daardoor geldt:
- seasonal state wordt mee vastgelegd in de build
- zonder nieuwe build/deploy blijft de seasonal button en carousel op de oude toestand staan

## Decision
De beste route voor deze site is:

1. **één centrale seasonal config**
2. **één gedeelde resolver voor home + local**
3. **geplande automatische builds**
4. **geplande automatische deploys**
5. **optionele manual override als noodrem**

Niet kiezen als hoofdoplossing:
- puur client-side seasonal switching
- dubbele seasonal logica per component
- handmatige maandelijkse code-aanpassingen

## Target Architecture

### 1. Central seasonal config
Later invoeren als één centrale bron, bijvoorbeeld:
- `lib/seasonal-campaigns.ts`

Die config moet per campaign bevatten:
- `key`
- `type`
  - `season`
  - `holiday`
  - `commercial_moment`
- `priority`
- `active_from`
- `active_until`
- optioneel dynamische regels
  - bv. tweede zondag mei
  - tweede zondag juni
- `cta_label_nl`
- `cta_label_en`
- `cta_href_nl`
- `cta_href_en`
- `home_images`
- `location_images`
- `minimum_home_seasonal_slots`
- `minimum_location_seasonal_slots`
- `enabled`

### 2. Shared seasonal resolver
Later één functie die bepaalt:
- welke campaign actief is
- welke CTA zichtbaar wordt
- welke seasonal beelden voorrang krijgen
- hoeveel seasonal slots op home en local gevuld moeten worden

Die ene resolver moet gebruikt worden door:
- `app/(home)/page.tsx`
- `components/LocationShowcase.tsx`

### 3. Deterministic rendering
Behouden:
- geen echte random shuffle
- geen runtime-verschillen zonder vaste seed

Verplicht:
- home output blijft stabiel binnen dezelfde campaign
- lokale output blijft stabiel per stad

## Deployment Automation

### Current gap
Er is nu alleen CI in `.github/workflows/ci.yml`.
Er is nog geen workflow die:
- scheduled builds draait
- deployt naar productie

### Target deployment model
Nieuwe workflow later toevoegen, bijvoorbeeld:
- `.github/workflows/seasonal-deploy.yml`

Die workflow moet ondersteunen:
1. `schedule`
2. `workflow_dispatch`
3. optioneel `push` op `main`

### Recommended cadence
Beste basis:
- `1x per dag` voor normale seasonal rotatie

Betere operationele keuze:
- `2x per dag`
  - ochtend
  - late namiddag / avond

Waarom:
- nog steeds volledig automatisch
- meer marge rond campaign-wissels
- geen realtime complexiteit nodig

### Workflow steps
De latere deploy-workflow moet dit doen:
1. checkout
2. Node 20
3. `npm ci`
4. `npm run verify:ci`
5. build export
6. productie-upload van `out/`
7. log van actieve seasonal campaign

## Deploy Strategy

### Preferred
Volledige statische export opnieuw deployen.

Waarom:
- veiligst voor consistency
- home, local, sitemap snippets en AI-resources blijven uit dezelfde build komen

### Avoid
Alleen losse HTML-bestanden vervangen zonder bijbehorende `_next/static` assets.

Dat heeft eerder al tot 404's geleid op chunk-bestanden.

## Manual Override

### Why
Voor uitzonderlijke situaties:
- campagne vroeger starten
- campagne verlengen
- foutieve timing tijdelijk corrigeren

### Recommended model
Een eenvoudige override in config:
- `auto`
- of expliciet één campaign key

Voorbeelden:
- `auto`
- `valentine`
- `parents`
- `back-to-school`
- `winter`
- `spring`
- `summer`
- `autumn`

### Rule
Override mag bestaan, maar standaard moet de site op `auto` draaien.

## Content Rules

### Required per seasonal campaign
Voor een campaign live seasonal-promotie krijgt:
1. minstens 3 degelijke beelden
2. een bestaande en sterke landingspagina
3. duidelijke NL/EN CTA labels
4. correcte alt-teksten
5. interne links vanuit home of blog waar logisch

### Recommended display rules
- Home:
  - seasonal als accent
  - niet te dominant
- Lokale pagina's:
  - precies 2 seasonal beelden vooraan
  - daarna brede portfolio-mix

## SEO Rules

### Keep stable
- metadata
- canonical
- hreflang
- page copy
- hoofdstructuur van pagina's

### Seasonal can change automatically
- hero seasonal CTA
- seasonal beelden in de homecarousel
- seasonal beelden in lokale carousels

### Avoid
- H1 of meta title dagelijks laten wisselen
- verschillende seasonal states op home en local
- client-side only seasonal hoofdlogica

## AI / Agent Layer

De seasonal automation moet ook hier consistent blijven:
- de publieke HTML blijft de source of truth
- geen aparte live seasonal state alleen voor agents

AI-resources hoeven de seasonal campaign niet expliciet te publiceren, tenzij dat later echt nuttig blijkt.

## Secrets / Ops Requirements

Voor een echte automatische deploy-workflow zijn later nodig:
- FTP/SFTP of andere deploy credentials in GitHub Secrets
- eventuele host/path secrets
- optioneel een deploy lock of logkanaal

Omdat dit vandaag nog niet in de repo zit, is dit een aparte implementatiestap.

## Rollout Plan

### Phase 0
Beslissen en vastleggen:
- buildfrequentie: `1x` of `2x per dag`
- deploymethode: FTP/SFTP of alternatief
- overridebeleid

### Phase 1
Centrale seasonal config bouwen.

### Phase 2
Home en local op dezelfde shared resolver zetten.

### Phase 3
Scheduled deploy-workflow toevoegen.

### Phase 4
Manual override toevoegen.

### Phase 5
Monitoring:
- bevestigen welke campaign actief was bij elke deploy
- snelle rollbackmogelijkheid houden

## Recommended Choice For This Project

Voor X3DPrints is dit de beste combinatie:

1. `centrale seasonal config`
2. `gedeelde resolver`
3. `2 automatische deploys per dag`
4. `manual override`

Dat geeft:
- minimale handmatige opvolging
- correcte SEO-output
- consistente home + local seasonal state
- weinig operationele complexiteit

## Practical Conclusion
Als het doel is dat jij er bijna niet meer naar hoeft te kijken, dan is de juiste aanpak:

- **niet** realtime client-side seasonal switching
- **wel** build-time seasonal rendering
- **plus** automatische scheduled deploys

Dat is de meest onderhoudbare en SEO-veilige automatisering voor deze site.
