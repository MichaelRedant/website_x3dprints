# ChatGPT naar CRM workflow en 3D-print berekening

Laatst bijgewerkt: 20 juni 2026

Dit document beschrijft hoe je een Custom GPT veilig offertes naar een CRM laat sturen, zonder dubbele klanten te maken, en hoe je een 3D-print volledig berekent van slicerdata tot offerteprijs en winst.

## Inhoud

- [Doel](#doel)
- [Architectuur](#architectuur)
- [Waarom een bridge nodig is](#waarom-een-bridge-nodig-is)
- [Beveiliging](#beveiliging)
- [CRM-datamodel](#crm-datamodel)
- [Bestaande klanten herkennen](#bestaande-klanten-herkennen)
- [Meerdere projecten voor een klant](#meerdere-projecten-voor-een-klant)
- [Custom GPT Action](#custom-gpt-action)
- [Bridge-logica](#bridge-logica)
- [3D-print berekening](#3d-print-berekening)
- [X3DPrints tarieven](#x3dprints-tarieven)
- [Voorbeeldberekening](#voorbeeldberekening)
- [GPT-instructie voor offertes](#gpt-instructie-voor-offertes)
- [Checklist voor een nieuw project](#checklist-voor-een-nieuw-project)
- [Bronnen](#bronnen)

## Doel

De workflow moet dit mogelijk maken:

1. Je berekent een offerte in ChatGPT.
2. Je zegt: "stuur deze offerte door naar CRM".
3. De Custom GPT zet de offerte om naar gestructureerde data.
4. De GPT Action stuurt die data naar een eigen bridge-endpoint.
5. De bridge zoekt eerst of de klant al bestaat.
6. De bridge maakt of update de klant/contactpersoon.
7. De bridge maakt per project een aparte verkoopkans/opdracht aan.
8. Het CRM bevat klantgegevens, projectgegevens, printdata, kosten, offertebedrag, winst en levering.

Belangrijk: ChatGPT stuurt niet rechtstreeks naar de CRM-adminomgeving. Er zit altijd een kleine server-side bridge tussen.

## Architectuur

```text
ChatGPT gesprek
  |
  v
Custom GPT instructies
  |
  v
GPT Action op basis van OpenAPI schema
  |
  v
Eigen HTTPS bridge endpoint
  |
  v
CRM API user met beperkte rechten
  |
  v
CRM records: Account, Contact, Project/Kans/Opportunity
```

De bridge is een kleine API die jij beheert. In het X3DPrints-voorbeeld draait die als PHP-endpoint op de hosting, maar hetzelfde principe werkt ook met Node, Laravel, Symfony, Next.js API routes, Python Flask/FastAPI of een serverless function.

## Waarom een bridge nodig is

Een bridge lost vier problemen op:

| Probleem | Oplossing door bridge |
| --- | --- |
| CRM API is vaak te technisch voor de GPT | De bridge accepteert een eenvoudige offerte-payload. |
| Je wilt geen admin-credentials in ChatGPT | De bridge gebruikt server-side een beperkte CRM API-key. |
| Je wilt geen dubbele klanten | De bridge voert matching uit op BTW, e-mail, telefoon en naam. |
| Je wilt meerdere projecten onder dezelfde klant | De bridge verwerkt `projects[]` als aparte CRM-opdrachten. |

De GPT Action is dus alleen de ingang. De bedrijfslogica hoort in de bridge.

## Beveiliging

Minimale regels:

1. Gebruik nooit een CRM-adminaccount voor de GPT.
2. Maak een aparte API-user, bijvoorbeeld `chatgpt-action`.
3. Geef die API-user alleen rechten op de entiteiten die nodig zijn.
4. Bewaar de echte CRM API-key alleen server-side.
5. Zet het bridge-endpoint achter HTTPS.
6. Gebruik een aparte Action API-key voor de GPT Action.
7. Log geen volledige persoonsgegevens of secrets in publieke logs.
8. Voeg rate limiting toe als het endpoint publiek bereikbaar is.
9. Accepteer alleen `POST` met `application/json`.
10. Valideer verplichte velden voordat je iets naar het CRM schrijft.

Voor een nieuw project is dit de aanbevolen authenticatie:

```text
ChatGPT Action
  Authentication: API Key
  Header: Authorization: Bearer <ACTION_KEY>

Bridge
  Controleert Authorization-header
  Gebruikt daarna server-side CRM API-key
```

Gebruik dus bij voorkeur een standaard `Authorization` header in nieuwe projecten. Als een bestaande setup met een eigen header werkt, kan dat technisch blijven werken, maar de standaardvorm is beter overdraagbaar.

## CRM-datamodel

Gebruik drie niveaus:

1. **Klant / Account**
2. **Contactpersoon**
3. **Project / Kans / Opportunity**

### Klantgegevens

```json
{
  "customer_name": "",
  "company_name": "",
  "email": "",
  "phone": "",
  "street": "",
  "postal_code": "",
  "city": "",
  "country": "BE",
  "vat_number": "",
  "is_business_customer": false,
  "is_returning_customer": false,
  "customer_source": ""
}
```

Aanbevolen waarden voor `customer_source`:

- Website
- Facebook
- Instagram
- LinkedIn
- Mond-tot-mond
- Bestaande klant
- Google
- Beurs/Event

### Projectgegevens

```json
{
  "project_id": "",
  "project_name": "",
  "project_type": "",
  "project_status": "",
  "date_created": "",
  "requested_deadline": "",
  "delivery_date": ""
}
```

Aanbevolen waarden voor `project_type`:

- 3D Print
- 3D Scan
- 3D Ontwerp
- Reverse Engineering
- Herdenkingsbuste
- Funko Style
- Huisdier
- Functioneel onderdeel
- Mold
- Prototype

Aanbevolen waarden voor `project_status`:

- Aanvraag ontvangen
- Offerte berekend
- Offerte verzonden
- Goedgekeurd
- In productie
- Klaar voor levering
- Afgeleverd
- Gefactureerd
- Betaald
- Geannuleerd

### Printgegevens

```json
{
  "printer": "",
  "material": "",
  "color": "",
  "quantity": 1,
  "weight_grams": 0,
  "print_time_hours": 0,
  "number_of_print_beds": 1,
  "infill_percentage": 0,
  "layer_height": 0.2
}
```

Aanbevolen waarden voor `printer`:

- X1C
- H2S
- H2C

### Kosten

```json
{
  "material_cost_eur": 0,
  "electricity_cost_eur": 0,
  "dryer_cost_eur": 0,
  "modeling_cost_eur": 0,
  "scan_cost_eur": 0,
  "delivery_cost_eur": 0,
  "extra_costs_eur": 0
}
```

### Offerte

```json
{
  "quote_amount_eur": 0,
  "discount_amount_eur": 0,
  "final_amount_eur": 0,
  "vat_included": true,
  "quote_sent_date": "",
  "quote_accepted": false
}
```

### Winstanalyse

```json
{
  "total_cost_eur": 0,
  "gross_profit_eur": 0,
  "profit_margin_percent": 0
}
```

Formules:

```text
gross_profit_eur = final_amount_eur - total_cost_eur
profit_margin_percent = (gross_profit_eur / final_amount_eur) * 100
```

Let op: een "winstmarge calculatie" van 200% is in de praktijk een **markup**, geen marge.  
Een markup van 200% betekent:

```text
verkoopprijs = kostprijs * 3
```

Een echte winstmarge blijft altijd lager dan 100%, want:

```text
marge = winst / verkoopprijs
```

### Levering

```json
{
  "delivery_method": "",
  "shipping_required": true,
  "shipping_cost_eur": 0,
  "distance_km": 0,
  "tracking_number": ""
}
```

Aanbevolen waarden voor `delivery_method`:

- Afhaling
- Bpost
- PostNL
- Persoonlijke levering

### X3DPrints specifieke velden

```json
{
  "render_sent": false,
  "stl_received": false,
  "model_created_by_x3dprints": false,
  "files_location": "",
  "license_required": false,
  "commercial_license": false,
  "reprint_required": false,
  "reprint_reason": ""
}
```

## Bestaande klanten herkennen

De bridge moet altijd eerst zoeken, dan pas aanmaken.

Aanbevolen volgorde:

1. BTW-nummer, als aanwezig.
2. E-mailadres, als aanwezig.
3. Telefoonnummer, genormaliseerd.
4. Exacte klantnaam of bedrijfsnaam.

### Telefoon normaliseren

Belgische nummers kunnen binnenkomen als:

```text
0493 59 99 51
0493599951
+32 493 59 99 51
0032 493 59 99 51
```

Zet ze intern om naar een vergelijkbare vorm, bijvoorbeeld:

```text
+32493599951
```

Pseudocode:

```text
normalize_phone(phone):
  verwijder spaties, punten, streepjes en haakjes
  als nummer start met 00: vervang 00 door +
  als Belgisch mobiel nummer start met 0: vervang eerste 0 door +32
  return genormaliseerd nummer
```

### Upsert-regel

```text
als bestaande klant gevonden:
  update ontbrekende of nieuwe klantvelden
  zet is_returning_customer = true
anders:
  maak klant aan
  zet is_returning_customer = false
```

Dit voorkomt dat dezelfde klant vijf keer in het CRM komt wanneer er meerdere offertes of projecten volgen.

## Meerdere projecten voor een klant

Gebruik altijd een array `projects[]`.

Een klant kan dus in een payload meerdere projecten hebben:

```json
{
  "customer": {
    "customer_name": "Voorbeeld Klant",
    "email": "klant@example.com",
    "phone": "+32490000000"
  },
  "projects": [
    {
      "project": {
        "project_id": "2026-001",
        "project_name": "Wieldoppen voor stoelen",
        "project_type": "3D Ontwerp",
        "project_status": "In productie"
      },
      "print": {
        "printer": "X1C",
        "material": "TPU for AMS",
        "quantity": 10
      },
      "quote": {
        "final_amount_eur": 175,
        "vat_included": true
      }
    },
    {
      "project": {
        "project_id": "2026-002",
        "project_name": "Buitenstoel covers",
        "project_type": "3D Print",
        "project_status": "Klaar voor levering"
      },
      "print": {
        "printer": "X1C",
        "material": "PLA Matte",
        "color": "Grey",
        "quantity": 4,
        "weight_grams": 94.08,
        "print_time_hours": 3.27
      },
      "quote": {
        "final_amount_eur": 20,
        "vat_included": true
      }
    }
  ]
}
```

CRM-regel:

```text
1 klant/account
1 contactpersoon
2 aparte projecten/kansen
```

### Projecten niet dubbel maken

Gebruik `project_id` als externe sleutel.

Aanbevolen:

```text
project_id = <jaar>-<klant-slug>-<korte-projectslug>
```

Voorbeeld:

```text
2026-klant-wieldoppen-stoelen
2026-klant-buitenstoel-covers
```

Als dezelfde `project_id` later opnieuw wordt doorgestuurd, moet de bridge het bestaande project updaten in plaats van een nieuw project te maken.

## Custom GPT Action

De Custom GPT heeft drie onderdelen nodig:

1. Instructies voor de GPT.
2. Een OpenAPI schema dat het endpoint beschrijft.
3. Authenticatie-instellingen.

### Minimale OpenAPI-structuur

```yaml
openapi: 3.1.0
info:
  title: CRM Quote Bridge
  version: 1.0.0
  description: Slaat klanten en 3D-print projecten op in het CRM.
servers:
  - url: https://crm.example.com
paths:
  /quote-bridge:
    post:
      operationId: sendQuoteToCrm
      summary: Stuur een klant met een of meerdere projecten naar het CRM.
      x-openai-isConsequential: true
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - customer
                - projects
              properties:
                customer:
                  type: object
                  required:
                    - customer_name
                  properties:
                    customer_name:
                      type: string
                    company_name:
                      type: string
                    email:
                      type: string
                    phone:
                      type: string
                    vat_number:
                      type: string
                    is_business_customer:
                      type: boolean
                    customer_source:
                      type: string
                projects:
                  type: array
                  items:
                    type: object
                    properties:
                      project:
                        type: object
                      print:
                        type: object
                      costs:
                        type: object
                      quote:
                        type: object
                      delivery:
                        type: object
                      x3d:
                        type: object
                      summary:
                        type: string
                      quote_text:
                        type: string
                      notes:
                        type: string
      responses:
        "200":
          description: Records aangemaakt of bijgewerkt.
          content:
            application/json:
              schema:
                type: object
                properties:
                  ok:
                    type: boolean
                  account_id:
                    type: string
                  projects:
                    type: array
                    items:
                      type: object
```

Omdat dit een actie is die data in het CRM wijzigt, zet je `x-openai-isConsequential: true`.

## Bridge-logica

Pseudocode:

```text
POST /quote-bridge

1. Controleer HTTPS.
2. Controleer Authorization/API-key.
3. Parse JSON.
4. Valideer:
   - customer.customer_name of company_name verplicht
   - projects[] verplicht en niet leeg
   - elk project heeft project_name of summary
5. Normaliseer:
   - e-mail lowercase
   - telefoon naar internationale vorm
   - BTW-nummer zonder spaties/punten
   - materiaalnamen naar CRM-keuzelijst
6. Zoek bestaande klant:
   - BTW
   - e-mail
   - telefoon
   - naam
7. Maak of update account.
8. Maak of update contactpersoon.
9. Voor elk project in projects[]:
   - bereken ontbrekende kosten indien mogelijk
   - zoek bestaand project op project_id
   - update bestaand project of maak nieuw project
10. Return:
   - account_id
   - contact_id
   - project_ids
   - created/updated status per project
```

Aanbevolen response:

```json
{
  "ok": true,
  "account_id": "crm-account-id",
  "contact_id": "crm-contact-id",
  "returning_customer": true,
  "projects": [
    {
      "project_id": "2026-klant-project",
      "crm_id": "crm-opportunity-id",
      "action": "created"
    }
  ]
}
```

## 3D-print berekening

De berekening bestaat uit twee lagen:

1. **Werkelijke kostprijs**: wat kost het project jou echt?
2. **Offerteprijs**: welke prijs vraag je commercieel aan de klant?

Sla beide op. Zo kan je later winst, korting, conversie en materiaalgebruik analyseren.

### Inputvelden

| Input | Voorbeeld | Opmerking |
| --- | ---: | --- |
| Materiaal | PLA Matte | Moet matchen met tarieventabel. |
| Materiaalprijs | 25.99 EUR/kg | Soms per 0.5 kg of 0.75 kg. |
| Gewicht per stuk | 23.52 g | Uit slicer. |
| Aantal | 4 | Aantal identieke prints. |
| Waste percentage | 0-10% | Brim, purge, support, misprintbuffer. |
| Printtijd per stuk | 49m06s | Uit slicer. |
| Printer | X1C | Bepaalt energieverbruik. |
| Printervermogen | 1 kW | Rekenwaarde. |
| Stroomprijs | configureerbaar | Bijvoorbeeld 0.12 EUR/kWh in de voorbeeldberekening. |
| Droogtijd | 0, 4 of 8 uur | Afhankelijk van materiaal. |
| Drogervermogen | 0.145 kW | 145 W. |
| Ontwerptijd | uren | Uurloon 40 EUR/u. |
| Scankost | bedrag | Bijvoorbeeld volgens scanprijslijst. |
| Levering | Bpost/afhaling/eigen levering | Volgens verzendtarieven. |
| Extra kosten | bedrag | Inserts, magneten, verpakking, nabewerking. |

### Stap 1: materiaalprijs per kg

```text
package_weight_kg = 1.0 voor EUR/kg
package_weight_kg = 0.75 voor EUR/0.75kg
package_weight_kg = 0.5 voor EUR/0.5kg

material_price_per_kg = package_price_eur / package_weight_kg
```

Voorbeelden:

```text
PLA Matte: 25.99 EUR / 1 kg = 25.99 EUR/kg
PPA-CF: 155.99 EUR / 0.75 kg = 207.99 EUR/kg
Support for PLA: 25.99 EUR / 0.5 kg = 51.98 EUR/kg
```

### Stap 2: totaal gewicht

```text
base_weight_g = weight_g_per_part * quantity
waste_weight_g = base_weight_g * (waste_percent / 100)
total_weight_g = base_weight_g + waste_weight_g
```

Als je slicer al het totaalgewicht geeft, gebruik dat als `base_weight_g`.

### Stap 3: materiaalkost

```text
material_base_cost_eur = (total_weight_g / 1000) * material_price_per_kg
material_cost_with_margin_eur = material_base_cost_eur * (1 + material_margin_percent / 100)
```

Met 20% materiaalmarge:

```text
material_cost_with_margin_eur = material_base_cost_eur * 1.20
```

Belangrijk: beslis of je `material_cost_with_margin_eur` gebruikt als kost in je prijsberekening of alleen als verkoopcomponent. Tel dezelfde marge niet twee keer.

### Stap 4: printtijd

```text
print_time_hours_per_part = print_minutes_per_part / 60
total_print_time_hours = print_time_hours_per_part * quantity
```

Als prints tegelijk op hetzelfde printbed staan, gebruik dan de totale printtijd van het printbed, niet de som per stuk.

Voorbeeld:

```text
4 losse prints van 49.1 minuten = 196.4 minuten = 3.27 uur
4 stuks tegelijk op een printbed van 55 minuten = 0.92 uur
```

### Stap 5: elektriciteit

```text
print_energy_kwh = total_print_time_hours * printer_power_kw
electricity_cost_eur = print_energy_kwh * electricity_rate_eur_per_kwh
```

Printervermogen:

| Printer | Rekenvermogen |
| --- | ---: |
| X1C | 1 kW |
| H2S | 2 kW |
| H2C | 2 kW |

### Stap 6: drogen

```text
dryer_energy_kwh = dryer_hours * dryer_power_kw
dryer_energy_cost_eur = dryer_energy_kwh * electricity_rate_eur_per_kwh

dryer_cost_eur =
  dryer_project_fee_eur
  + (dryer_per_print_fee_eur * quantity)
  + dryer_energy_cost_eur
```

X3DPrints droogparameters:

| Parameter | Waarde |
| --- | ---: |
| Droogtoeslag project | 5 EUR/project |
| Droogtoeslag per print | 0.05 EUR/print |
| Drogervermogen | 0.145 kW |
| PLA Wood | 4 uur op 40 graden |
| PETG | 8 uur op 60 graden |
| TPU | 8 uur op 50 graden |

Gebruik droogkosten alleen wanneer drogen nodig is.

### Stap 7: ontwerp, scan en voorbereiding

```text
modeling_cost_eur = modeling_hours * 40
scan_cost_eur = scan_count * scan_rate_eur
preparation_cost_eur = preparation_minutes / 60 * hourly_rate_eur
```

Voor kleine prints is het nuttig om een minimum handling/slicing kost te gebruiken, anders lijkt de print goedkoper dan het werk dat erin zit.

Voorbeeld:

```text
preparation_minutes = 10
hourly_rate_eur = 40
preparation_cost_eur = 10 / 60 * 40 = 6.67 EUR
```

Je kan commercieel beslissen om die voorbereiding niet volledig door te rekenen, maar je bewaart ze best wel intern voor winstanalyses.

### Stap 8: levering

X3DPrints verzendtarieven:

| Levering | Prijs |
| --- | ---: |
| Bpost < 2 kg | 7.50 EUR/zending |
| Bpost 2-5 kg | 8.00 EUR/zending |
| Bpost 5-10 kg | 9.00 EUR/zending |
| Eigen levering binnen 10 km | 10.00 EUR/rit |
| Eigen levering buiten 10 km | 10.00 EUR + 0.60 EUR/km boven 10 km |

Formule eigen levering:

```text
als distance_km <= 10:
  delivery_cost_eur = 10
anders:
  delivery_cost_eur = 10 + ((distance_km - 10) * 0.60)
```

### Stap 9: totale kostprijs

Basisformule:

```text
total_cost_eur =
  material_base_cost_eur
  + electricity_cost_eur
  + dryer_cost_eur
  + modeling_cost_eur
  + scan_cost_eur
  + preparation_cost_eur
  + delivery_cost_eur
  + extra_costs_eur
```

Als je materiaalmarge als interne kost wil meenemen:

```text
total_cost_eur =
  material_cost_with_margin_eur
  + electricity_cost_eur
  + dryer_cost_eur
  + modeling_cost_eur
  + scan_cost_eur
  + preparation_cost_eur
  + delivery_cost_eur
  + extra_costs_eur
```

Kies een methode en blijf consistent.

### Stap 10: offerteprijs

Er zijn drie manieren.

#### Methode A: cost-plus

```text
quote_amount_eur = total_cost_eur * (1 + profit_markup_percent / 100)
```

Met 200% markup:

```text
quote_amount_eur = total_cost_eur * 3
```

#### Methode B: minimumprijs

Voor kleine prints is een minimumprijs vaak logischer.

```text
quote_amount_eur = max(calculated_price_eur, minimum_order_price_eur)
```

Voorbeeld:

```text
minimum_order_price_eur = 15 of 20
```

#### Methode C: manuele offerteprijs

Bij bestaande klanten, bundelkorting of strategische projecten kan je een manuele prijs kiezen.

Sla dan op:

```text
quote_amount_eur = normale berekende prijs
discount_amount_eur = quote_amount_eur - final_amount_eur
final_amount_eur = gekozen offerteprijs
```

### Stap 11: winst

```text
gross_profit_eur = final_amount_eur - total_cost_eur
profit_margin_percent = (gross_profit_eur / final_amount_eur) * 100
```

Voorbeeld:

```text
final_amount_eur = 20.00
total_cost_eur = 4.33
gross_profit_eur = 15.67
profit_margin_percent = 78.35%
```

## X3DPrints tarieven

### Filamenten

| Naam | Type | Prijs | Eenheid |
| --- | --- | ---: | --- |
| PLA Basic | Filament | 25.99 | EUR/kg |
| PLA Matte | Filament | 25.99 | EUR/kg |
| PLA Basic Gradient | Filament | 27.99 | EUR/kg |
| PLA Translucent | Filament | 25.99 | EUR/kg |
| PLA Silk+ | Filament | 25.99 | EUR/kg |
| PLA Tough+ | Filament | 26.99 | EUR/kg |
| PLA Silk Multi-Color | Filament | 27.99 | EUR/kg |
| PLA Metal | Filament | 27.99 | EUR/kg |
| PLA Galaxy | Filament | 27.99 | EUR/kg |
| PLA Wood | Filament | 27.99 | EUR/kg |
| PLA Sparkle | Filament | 27.99 | EUR/kg |
| PLA Marble | Filament | 27.99 | EUR/kg |
| PLA Glow | Filament | 27.99 | EUR/kg |
| PLA Aero | Filament | 49.99 | EUR/kg |
| PLA-CF | Filament | 26.99 | EUR/kg |
| TPU for AMS | Filament | 35.99 | EUR/kg |
| TPU 85/90A | Filament | 43.99 | EUR/kg |
| PETG Basic | Filament | 25.99 | EUR/kg |
| PETG-CF | Filament | 35.99 | EUR/kg |
| PETG HF | Filament | 25.99 | EUR/kg |
| PETG Translucent | Filament | 25.99 | EUR/kg |
| ABS | Filament | 25.99 | EUR/kg |
| ABS-GF | Filament | 31.99 | EUR/kg |
| PA6-GF | Filament | 62.99 | EUR/kg |
| PA6-CF | Filament | 82.99 | EUR/kg |
| PAHT-CF | Filament | 101.99 | EUR/kg |
| PET-CF | Filament | 90.99 | EUR/kg |
| PC | Filament | 42.99 | EUR/kg |
| PC FR | Filament | 56.99 | EUR/kg |
| ASA | Filament | 24.99 | EUR/kg |
| ASA-CF | Filament | 38.99 | EUR/kg |
| ASA Aero | Filament | 51.99 | EUR/kg |
| PPA-CF | Filament | 155.99 | EUR/0.75kg |
| PPS-CF | Filament | 133.99 | EUR/0.75kg |

### Supportmateriaal

| Naam | Type | Prijs | Eenheid |
| --- | --- | ---: | --- |
| Support for PLA | Support filament | 25.99 | EUR/0.5kg |
| Support for PLA/PETG | Support filament | 36.99 | EUR/0.5kg |
| Support for ABS | Support filament | 16.99 | EUR/0.5kg |
| PVA | Support filament | 41.99 | EUR/0.5kg |

### Arbeid, marge, levering en machines

| Naam | Type | Prijs | Eenheid |
| --- | --- | ---: | --- |
| Ontwerp uurloon | Arbeid | 40 | EUR/uur |
| Materiaalmarge | Marge | 20 | % |
| Winstmarge calculatie | Markup | 200 | % |
| Bpost verzending <2 kg | Verzending | 7.50 | EUR/zending |
| Bpost verzending 2-5 kg | Verzending | 8.00 | EUR/zending |
| Bpost verzending 5-10 kg | Verzending | 9.00 | EUR/zending |
| Eigen levering binnen 10 km | Verzending | 10.00 | EUR/rit |
| Eigen levering +10 km | Verzending | 0.60 | EUR/km |
| Droogtoeslag | Droging | 5.00 | EUR/project |
| Droogtoeslag per print | Droging | 0.05 | EUR/print |
| Vermogen droger | Droging | 0.145 | kW |
| Vermogen X1C | Printer | 1 | kW |
| Vermogen H2S | Printer | 2 | kW |
| Vermogen H2C | Printer | 2 | kW |

## Voorbeeldberekening

Project:

```text
Klant: bestaande klant
Project: buitenstoel covers
Materiaal: PLA Matte Grey
Aantal: 4
Gewicht per stuk: 23.52 g
Printtijd per stuk: 49m06s
Printer: X1C
Gekozen offerteprijs: 20 EUR
```

### Stap 1: gewicht

```text
base_weight_g = 23.52 * 4 = 94.08 g
waste_percent = 0
total_weight_g = 94.08 g
```

### Stap 2: materiaal

```text
material_price_per_kg = 25.99 EUR/kg
material_base_cost_eur = 94.08 / 1000 * 25.99
material_base_cost_eur = 2.45 EUR
```

Met 20% materiaalmarge:

```text
material_cost_with_margin_eur = 2.45 * 1.20 = 2.93 EUR
```

### Stap 3: printtijd

```text
49m06s = 49.1 minuten
total_print_minutes = 49.1 * 4 = 196.4 minuten
total_print_time_hours = 196.4 / 60 = 3.27 uur
```

### Stap 4: elektriciteit

Met X1C op 1 kW en stroomprijs 0.12 EUR/kWh:

```text
print_energy_kwh = 3.27 * 1 = 3.27 kWh
electricity_cost_eur = 3.27 * 0.12 = 0.39 EUR
```

### Stap 5: directe kost

Zonder volledige arbeid:

```text
material_base_cost_eur = 2.45
electricity_cost_eur = 0.39
small_handling_buffer_eur = 1.49

total_cost_eur = 2.45 + 0.39 + 1.49 = 4.33 EUR
```

### Stap 6: offerte en winst

```text
final_amount_eur = 20.00
gross_profit_eur = 20.00 - 4.33 = 15.67
profit_margin_percent = 15.67 / 20.00 * 100 = 78.35%
```

Conclusie:

```text
20 EUR voor 4 covers is commercieel logisch:
- lage materiaalkost
- beperkte printtijd
- bestaande klant
- eenvoudig bedrag
- voldoende marge voor kleine nabewerking of misprintbuffer
```

## GPT-instructie voor offertes

Gebruik in de Custom GPT iets in deze richting:

```text
Je bent de offerte-assistent voor een 3D-printbedrijf.

Wanneer de gebruiker vraagt om een offerte naar CRM te sturen:
1. Vat eerst de klant en project(en) kort samen.
2. Controleer of minstens klantnaam of bedrijfsnaam aanwezig is.
3. Controleer of er per project een duidelijke projectnaam, materiaal, aantal en offertebedrag is.
4. Als e-mail, telefoon of BTW-nummer aanwezig is, gebruik die voor klantmatching.
5. Gebruik altijd projects[] voor projecten, ook als het maar een project is.
6. Maak nooit meerdere klanten voor dezelfde persoon; dezelfde e-mail, telefoon of BTW betekent dezelfde klant.
7. Maak wel aparte projecten/kansen voor verschillende opdrachten.
8. Vul kostenvelden in als de data beschikbaar is.
9. Vul ontbrekende velden niet fictief in; laat ze leeg of op 0.
10. Vraag bevestiging voordat je de CRM Action uitvoert.

Materiaalnormalisatie:
- "pla matte grey" wordt "PLA Matte" met kleur "Grey"
- "tpu" wordt "TPU for AMS" tenzij expliciet TPU 85/90A staat
- "petg" wordt "PETG Basic" tenzij een specifiek PETG-type vermeld is

Projectstatus:
- Nieuwe offerte: "Offerte berekend" of "Offerte verzonden"
- Reeds goedgekeurd: "Goedgekeurd"
- Lopend werk: "In productie"
- Bijna klaar: "Klaar voor levering"
- Afgerond: "Afgeleverd"
```

## Checklist voor een nieuw project

### CRM voorbereiden

- Maak entiteiten of velden voor klant, contact, project, printdata, kosten, offerte, winst en levering.
- Maak keuzelijsten voor projecttype, status, materiaal, printer en levering.
- Maak een beperkte API-user aan.
- Test manueel of die API-user records kan lezen, maken en bijwerken.

### Bridge bouwen

- Maak een publiek HTTPS endpoint.
- Accepteer alleen `POST`.
- Valideer `Authorization`.
- Parse JSON.
- Zoek klanten voor je records aanmaakt.
- Normaliseer e-mail, telefoon, BTW en materiaal.
- Verwerk `projects[]`.
- Gebruik `project_id` als externe sleutel.
- Return JSON met CRM-record IDs.

### GPT Action maken

- Maak of update de Custom GPT.
- Voeg het OpenAPI schema toe.
- Stel API-key-authenticatie in.
- Verwijs in de GPT-instructies naar de `operationId`.
- Test eerst met een fake klant.
- Test daarna met een bestaande klant.
- Test daarna met twee projecten voor dezelfde klant.

### Testcases

| Test | Verwacht resultaat |
| --- | --- |
| Geen API-key | 401 Unauthorized |
| Nieuwe klant, 1 project | 1 klant, 1 contact, 1 project |
| Zelfde e-mail, nieuw project | Zelfde klant, nieuw project |
| Zelfde telefoon in ander formaat | Zelfde klant |
| Twee projecten in `projects[]` | 1 klant, 2 projecten |
| Zelfde `project_id` opnieuw | Project wordt bijgewerkt |
| Onbekend materiaal | Materiaal leeg laten of naar fallback mappen |
| Ontbrekend bedrag | Project niet verzenden of om bevestiging vragen |

## Bronnen

- OpenAI Actions introduction: https://developers.openai.com/api/docs/actions/introduction
- OpenAI Actions getting started: https://developers.openai.com/api/docs/actions/getting-started
- OpenAI Actions authentication: https://developers.openai.com/api/docs/actions/authentication
- OpenAI Actions production notes: https://developers.openai.com/api/docs/actions/production

