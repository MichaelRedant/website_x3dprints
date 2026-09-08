# X3DPrints AI Quote Assistant for EspoCRM

Controlled quote drafting for EspoCRM 9.3.8. The module shows the quote assistant on `Email` and `Opportunity` records, links drafts to the other supported records, and stores results in a new `X3dAiQuote` entity.

## Safety model

- OpenAI interprets the request but never calculates prices.
- Exact slicer input such as `5.72 g`, `41m` and `PETG Basic` is parsed again server-side and overrides AI interpretation.
- `PricingService.php` applies the controlled X3DPrints price rules and scan-price table.
- Unknown material, weight, print time or quantity remains missing; no values are invented.
- A delivery-only result can never be saved or approved as a quote.
- OpenAI requests use the Responses API with Structured Outputs and `store: false`.
- The API key stays server-side.
- A quote is only saved after clicking **Offerte en project opslaan**.
- Saving never sends an email. The same explicit action creates or updates the linked Opportunity project.
- The project reuses an existing CRM relation by customer email or exact name. For website emails, the linked Lead provides the customer data; otherwise a relation is created with available contact data and the correct private/business type.
- The resolved relation is written to the project and back to a direct or email-linked Lead.
- If project synchronization fails after the quote was saved, the separate project action can safely retry without creating a duplicate in the current session.
- The existing website contact endpoint, mail importer, `X3dImport` processing and `X3dMobile` module are not modified.

## Supported pricing

- Multi-material product or production-set calculations without double-counting electricity.
- Filament prices follow the X3DPrints reference price list supplied on 2026-08-30.
- Material +20%, electricity at EUR 0.23/kWh and drying in direct cost before factor x3.
- A simple replacement part up to 15 g and 1.5 print hours uses a EUR 10 service rate when no CAD, scan or extra work is required; the normal calculation remains visible for audit.
- Standard PostNL shipping within Belgium is EUR 7.50.
- Explicit printer power, filament-price and commercial-price overrides from staff instructions.
- Base quote, project options and optional shipping are totalled separately.
- 3D modeling: EUR 45 per hour as a one-time quote item.
- 3D scanning: fixed service prices from EUR 45 through EUR 250 as a one-time quote item.
- A scan line explicitly states that the customer also receives the digital 3D scan.
- The customer email is drafted in Dutch, French, English or German.
- The internal calculation and customer-ready email are stored separately.
- A commercial project total can be applied without hiding the original deterministic calculation.
- A CRM project summary and supported production fields can be written to a linked or new Opportunity.
- The Belgian small-business VAT exemption is applied; no VAT is added.

## Build and test

```powershell
& 'C:\xampp\php\php.exe' tests/pricing-test.php
& 'C:\xampp\php\php.exe' tests/project-draft-test.php
& 'C:\xampp\php\php.exe' tests/quote-input-normalizer-test.php
& 'C:\xampp\php\php.exe' tests/openai-smoke.php
./build.ps1
```

The package is created at `dist/X3DPrints-AI-Quote-1.3.5.zip`.

## Installation

Preferred: install the ZIP in **Administration > Extensions**. For direct FTP, copy the contents of `files/` into the EspoCRM root without deleting or mirroring any remote folder. Then run an EspoCRM rebuild.

The module reads the API key in this order:

1. Internal Espo config parameter `x3dOpenAiApiKey`.
2. Server environment variable `OPENAI_API_KEY`.
3. `data/x3d-ai-quote.php`, based on `data/x3d-ai-quote.example.php`.

After installation:

1. Configure the API key server-side.
2. Run `php command.php rebuild` or use **Administration > Rebuild**.
3. Grant the intended role read/create/edit access to `AI-offerteconcepten`.
4. Open an Email or Opportunity record and test the assistant.
5. Verify that saving creates only a Draft and sends no email.

## Rollback

Disable access to `X3dAiQuote`, then remove only these two module directories and rebuild:

- `custom/Espo/Modules/X3dAiQuote`
- `client/custom/modules/x3d-ai-quote`

Do not remove or overwrite `custom/Espo/Custom`, `X3dMobile`, `X3dImport` or existing CRM data. The custom quote table can remain for audit/restore purposes.
