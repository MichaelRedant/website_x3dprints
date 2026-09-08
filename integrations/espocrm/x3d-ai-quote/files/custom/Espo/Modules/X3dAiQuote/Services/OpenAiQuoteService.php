<?php

declare(strict_types=1);

namespace Espo\Modules\X3dAiQuote\Services;

use Espo\Core\Utils\Config;
use RuntimeException;

class OpenAiQuoteService
{
    private const API_URL = 'https://api.openai.com/v1/responses';

    public function __construct(private Config $config)
    {}

    /**
     * @return array{analysis: array<string, mixed>, responseId: string, model: string}
     */
    public function analyze(string $sourceText, string $corrections = ''): array
    {
        $model = (string) ($this->config->get('x3dOpenAiModel') ?: 'gpt-5.4-mini');
        $payload = [
            'model' => $model,
            'store' => false,
            'max_output_tokens' => 5500,
            'instructions' => $this->instructions(),
            'input' => $this->buildInput($sourceText, $corrections),
            'text' => [
                'format' => [
                    'type' => 'json_schema',
                    'name' => 'x3d_quote_analysis',
                    'strict' => true,
                    'schema' => $this->schema(),
                ],
                'verbosity' => 'low',
            ],
        ];

        $response = $this->request($payload);
        $jsonText = $this->extractOutputText($response);
        $analysis = json_decode($jsonText, true, 64, JSON_THROW_ON_ERROR);

        if (!is_array($analysis)) {
            throw new RuntimeException('OpenAI gaf geen bruikbare offerteanalyse terug.');
        }

        return [
            'analysis' => $analysis,
            'responseId' => (string) ($response['id'] ?? ''),
            'model' => (string) ($response['model'] ?? $model),
        ];
    }

    private function resolveApiKey(): string
    {
        $key = trim((string) ($this->config->get('x3dOpenAiApiKey') ?: getenv('OPENAI_API_KEY')));

        if ($key === '') {
            $localConfig = dirname(__DIR__, 5) . '/data/x3d-ai-quote.php';
            if (is_file($localConfig)) {
                $values = require $localConfig;
                if (is_array($values)) {
                    $key = trim((string) ($values['openaiApiKey'] ?? ''));
                }
            }
        }

        if ($key === '') {
            throw new RuntimeException(
                'OPENAI_API_KEY ontbreekt. Configureer de sleutel server-side; zet hem nooit in JavaScript.'
            );
        }

        return $key;
    }

    private function buildInput(string $sourceText, string $corrections): string
    {
        $input = "AANVRAAG:\n" . trim($sourceText);
        if (trim($corrections) !== '') {
            $input .= "\n\nSLICERDATA, PRIJSINSTRUCTIES EN CORRECTIES VAN X3DPRINTS:\n" . trim($corrections);
        }

        return $input;
    }

    private function instructions(): string
    {
        return <<<'PROMPT'
Je bent de interne offerte-assistent van X3DPrints, een eenpersoons 3D-printatelier in Herzele, Belgie.

Je zet een klantaanvraag en eventuele slicerdata om in strikt gestructureerde offertegegevens. Je maakt geen berekeningen: de server berekent alle bedragen. Je verzint nooit afmetingen, materiaal, gewicht, printtijd, printervermogen, aantal, prijs, korting, verzendkost of doorlooptijd.

Werkwijze:
- Detecteer de taal van de klant: nl, fr, en of de. Schrijf alle customer-velden natuurlijk in die taal.
- Gebruik de correcties van X3DPrints als meest betrouwbare bron als ze afwijken van de oorspronkelijke aanvraag.
- Zet isReplacementPart alleen op true wanneer het gevraagde stuk expliciet een kapot, versleten of niet meer leverbaar onderdeel vervangt. Souvenirs, displays, decoratie en prototypes zijn geen vervangonderdelen.
- Maak per verkoopbaar product of productieset een printing-regel. Een regel mag meerdere materialen bevatten zodat elektriciteit niet dubbel wordt geteld.
- De materials-lijst van één printing-regel bevat uitsluitend materialen die tegelijk in die ene uitvoering worden verbruikt. Zet materiaalkeuzes of alternatieven nooit samen in dezelfde materials-lijst.
- Als een tweede materiaal dezelfde uitvoering vervangt, maak je verplicht een aparte printing-regel met pricingRole alternative. Als daarbij expliciet "zonder prijsverschil" staat, zet je samePriceAsBase op true.
- quantity is het aantal identieke stuks of productiesets waarop gewicht en printtijd per eenheid slaan.
- Gebruik pricePerKgOverride, printerPowerKw, commercialPriceOverride, modelingRatePerHourOverride, modelingFixedPrice en deliveryCostOverride alleen als dat bedrag of vermogen expliciet vermeld is.
- pricingRole is option voor een bijkomende post, alternative voor een keuze die de basisuitvoering vervangt, en anders base. Een alternatief wordt nooit bij het basistotaal opgeteld.
- Zet samePriceAsBase alleen op true wanneer X3DPrints expliciet zegt dat een alternative geen prijsverschil heeft.
- dryingMode is auto voor PETG, TPU, PLA Wood, PC en PC FR, shared wanneer expliciet staat dat drying al elders in hetzelfde project zit, en none voor materialen die geen dryingtoeslag krijgen. Een ontbrekende dryinginstructie mag de vaste dryingkost nooit verwijderen.
- printJobs is alleen een expliciet genoemd of duidelijk uit slicerdata afleidbaar aantal afzonderlijke printjobs. Anders null.
- Interpreteer compacte tijden letterlijk: 41m is 41 minuten (0,6833 uur), 10u39m is 10 uur en 39 minuten (10,65 uur). Deze waarden worden daarna nog server-side gecontroleerd.
- Zet onbekende numerieke prijsinputs op null en voeg alleen gegevens die nodig zijn om de offerteprijs te berekenen toe aan missingInformation.
- Administratieve gegevens en laatste bevestigingen, zoals bedrijfsnaam, btw-nummer, betaaltermijn, facturatiegegevens, afhaling/verzending of een gewenste planning, horen uitsluitend in customerQuestions en blokkeren de prijscontrole niet.
- Een printregel is prijsbaar met minstens materiaal, aantal, filamentgewicht per eenheid en printtijd per eenheid of productieset.
- modelingRequested is true als ontwerp, CAD, reverse engineering, logo-omzetting, splitsing of printvoorbereiding nodig is. Zonder expliciete uren of vaste prijs blijven modelingHours en modelingFixedPrice null.
- 3D-scannen is een eenmalige offertepost. De klant ontvangt ook het digitale 3D-scanbestand.
- Voor objectscans brengt de klant het fysieke object naar Herzele. Foto's dienen alleen voor een eerste haalbaarheidscontrole. Alleen event-scan gebeurt op locatie.
- deliveryIsOptional is true als verzending alleen als mogelijkheid wordt aangeboden; false als de klant verzending kiest of vraagt.
- customerSubject is een korte e-mailtitel zonder prijs.
- customerIntroduction bevat geen begroeting, ondertekening, bedragen of harde leverbelofte.
- Wanneer X3DPrints concrete slicerdata opgeeft, mag de klanttekst vermelden dat het model bekeken en gesliced is. Zonder slicerdata mag je dat niet beweren.
- technicalProposal bevat concrete materiaal-, constructie- en uitvoeringspunten die uit de aanvraag volgen.
- exclusions bevat alleen zaken die voor deze specifieke aanvraag commercieel of technisch relevant zijn. Voeg nooit generieke uitsluitingen toe zoals montage op locatie wanneer daar niet om gevraagd is.
- productionLeadTime is alleen ingevuld als X3DPrints expliciet een timing opgeeft.
- customerQuestions bevat noodzakelijke slotvragen. Vraag bedrijfsnaam, btw-nummer en betaaltermijn alleen wanneer de aanvraag expliciet professioneel, zakelijk of B2B is; vraag dit niet standaard aan een particulier. Deze gegevens horen nooit in missingInformation.
- Laat customerQuestions leeg wanneer materiaal, hoeveelheid, levering en noodzakelijke klantgegevens al duidelijk zijn. Voeg geen beleefdheidszin als vraag toe.
- Schrijf Nederlandse particuliere klantmails natuurlijk met je/jouw en spreek de klant met de voornaam aan. Vermijd stijve of generieke formuleringen.
- customerClosing bevat geen ondertekening of nieuwe bedragen, maar wel een concrete vervolgstap om akkoord te geven. Gebruik geen nietszeggende formulering zoals "we bezorgen u graag de verdere afhandeling".
- sourceType is WebsiteForm bij een herkenbaar websiteformulier, X3DImport bij expliciete X3DImport-context, Email bij gewone e-mail en Manual in alle andere gevallen.

Vaste prijsregels worden achteraf door de server toegepast: materiaal +20%, elektriciteit aan 0,23 EUR/kWh, drying in de directe kost, daarna productiefactor x3. Standaard printervermogen is 1 kW en standaard modellering is 45 EUR/uur. Herhaal deze defaults niet als overrides.

Toegestane materialen:
PLA_BASIC, PLA_BASIC_GRADIENT, PLA_MATTE, PLA_GLOW, PLA_MARBLE, PLA_SPARKLE, PLA_METAL, PLA_GALAXY, PLA_AERO, PLA_SILK_PLUS, PLA_SILK_MULTI_COLOR, PLA_CF, PLA_WOOD, PLA_TRANSLUCENT, PLA_TOUGH_PLUS, PETG, PETG_CF, PETG_HF, PETG_TRANSLUCENT, ABS, ABS_GF, PA6_GF, PA6_CF, PAHT_CF, PET_CF, PC, PC_FR, ASA, ASA_CF, ASA_AERO, PPA_CF, PPS_CF, TPU_AMS, TPU_85_90A, TPU, SUPPORT_PLA, SUPPORT_PLA_PETG, SUPPORT_ABS, PVA.

Toegestane scantypes:
small-object, medium-object, large-object, technical-object, event-scan, person-bust, full-body.
PROMPT;
    }

    /** @return array<string, mixed> */
    private function schema(): array
    {
        $nullableString = ['type' => ['string', 'null']];
        $nullableNumber = ['type' => ['number', 'null']];
        $nullableInteger = ['type' => ['integer', 'null']];
        $pricingRole = ['type' => 'string', 'enum' => ['base', 'option', 'alternative']];
        $materialEnum = [
            'PLA_BASIC', 'PLA_BASIC_GRADIENT', 'PLA_MATTE', 'PLA_GLOW',
            'PLA_MARBLE', 'PLA_SPARKLE', 'PLA_METAL', 'PLA_GALAXY',
            'PLA_AERO', 'PLA_SILK_PLUS', 'PLA_SILK_MULTI_COLOR', 'PLA_CF',
            'PLA_WOOD', 'PLA_TRANSLUCENT', 'PLA_TOUGH_PLUS', 'PETG',
            'PETG_CF', 'PETG_HF', 'PETG_TRANSLUCENT', 'ABS', 'ABS_GF',
            'PA6_GF', 'PA6_CF', 'PAHT_CF', 'PET_CF', 'PC', 'PC_FR',
            'ASA', 'ASA_CF', 'ASA_AERO', 'PPA_CF', 'PPS_CF',
            'TPU_AMS', 'TPU_85_90A', 'TPU', 'SUPPORT_PLA',
            'SUPPORT_PLA_PETG', 'SUPPORT_ABS', 'PVA', null,
        ];

        return [
            'type' => 'object',
            'additionalProperties' => false,
            'properties' => [
                'quoteTitle' => ['type' => 'string'],
                'requestSummary' => ['type' => 'string'],
                'customerName' => $nullableString,
                'customerCompany' => $nullableString,
                'language' => ['type' => 'string', 'enum' => ['nl', 'en', 'fr', 'de']],
                'sourceType' => [
                    'type' => 'string',
                    'enum' => ['WebsiteForm', 'Email', 'X3DImport', 'Manual'],
                ],
                'isReplacementPart' => ['type' => 'boolean'],
                'printing' => [
                    'type' => 'array',
                    'items' => [
                        'type' => 'object',
                        'additionalProperties' => false,
                        'properties' => [
                            'description' => ['type' => 'string'],
                            'pricingRole' => $pricingRole,
                            'quantity' => $nullableInteger,
                            'materials' => [
                                'type' => 'array',
                                'items' => [
                                    'type' => 'object',
                                    'additionalProperties' => false,
                                    'properties' => [
                                        'material' => [
                                            'type' => ['string', 'null'],
                                            'enum' => $materialEnum,
                                        ],
                                        'weightGramsPerUnit' => $nullableNumber,
                                        'pricePerKgOverride' => $nullableNumber,
                                    ],
                                    'required' => [
                                        'material', 'weightGramsPerUnit', 'pricePerKgOverride',
                                    ],
                                ],
                            ],
                            'printHoursPerUnit' => $nullableNumber,
                            'printerPowerKw' => $nullableNumber,
                            'quality' => [
                                'type' => ['string', 'null'],
                                'enum' => ['standard', 'fine', 'ultra', null],
                            ],
                            'printJobs' => $nullableInteger,
                            'dryingMode' => [
                                'type' => 'string',
                                'enum' => ['auto', 'shared', 'none'],
                            ],
                            'commercialPriceOverride' => $nullableNumber,
                            'commercialRationale' => $nullableString,
                            'samePriceAsBase' => ['type' => 'boolean'],
                        ],
                        'required' => [
                            'description', 'pricingRole', 'quantity', 'materials',
                            'printHoursPerUnit', 'printerPowerKw', 'quality', 'printJobs',
                            'dryingMode', 'commercialPriceOverride', 'commercialRationale',
                            'samePriceAsBase',
                        ],
                    ],
                ],
                'scanType' => [
                    'type' => ['string', 'null'],
                    'enum' => [
                        'small-object', 'medium-object', 'large-object', 'technical-object',
                        'event-scan', 'person-bust', 'full-body', null,
                    ],
                ],
                'scanPricingRole' => $pricingRole,
                'modelingRequested' => ['type' => 'boolean'],
                'modelingDescription' => ['type' => 'string'],
                'modelingPricingRole' => $pricingRole,
                'modelingHours' => $nullableNumber,
                'modelingRatePerHourOverride' => $nullableNumber,
                'modelingFixedPrice' => $nullableNumber,
                'delivery' => [
                    'type' => ['string', 'null'],
                    'enum' => ['pickup', 'post', '24h', '48h', null],
                ],
                'deliveryCostOverride' => $nullableNumber,
                'deliveryIsOptional' => ['type' => 'boolean'],
                'discountPercent' => $nullableNumber,
                'extraCosts' => [
                    'type' => 'array',
                    'items' => [
                        'type' => 'object',
                        'additionalProperties' => false,
                        'properties' => [
                            'description' => ['type' => 'string'],
                            'amount' => ['type' => 'number'],
                            'pricingRole' => $pricingRole,
                        ],
                        'required' => ['description', 'amount', 'pricingRole'],
                    ],
                ],
                'assumptions' => ['type' => 'array', 'items' => ['type' => 'string']],
                'missingInformation' => ['type' => 'array', 'items' => ['type' => 'string']],
                'customerSubject' => ['type' => 'string'],
                'customerIntroduction' => ['type' => 'string'],
                'technicalProposal' => ['type' => 'array', 'items' => ['type' => 'string']],
                'exclusions' => ['type' => 'array', 'items' => ['type' => 'string']],
                'productionLeadTime' => $nullableString,
                'customerQuestions' => ['type' => 'array', 'items' => ['type' => 'string']],
                'customerClosing' => ['type' => 'string'],
            ],
            'required' => [
                'quoteTitle', 'requestSummary', 'customerName', 'customerCompany',
                'language', 'sourceType', 'isReplacementPart', 'printing', 'scanType', 'scanPricingRole',
                'modelingRequested', 'modelingDescription', 'modelingPricingRole',
                'modelingHours', 'modelingRatePerHourOverride', 'modelingFixedPrice',
                'delivery', 'deliveryCostOverride', 'deliveryIsOptional', 'discountPercent',
                'extraCosts', 'assumptions', 'missingInformation', 'customerSubject',
                'customerIntroduction', 'technicalProposal', 'exclusions',
                'productionLeadTime', 'customerQuestions', 'customerClosing',
            ],
        ];
    }

    /**
     * @param array<string, mixed> $payload
     * @return array<string, mixed>
     */
    private function request(array $payload): array
    {
        if (!function_exists('curl_init')) {
            throw new RuntimeException('De PHP cURL-extensie is niet beschikbaar op de CRM-server.');
        }

        $handle = curl_init(self::API_URL);
        if ($handle === false) {
            throw new RuntimeException('OpenAI-verbinding kon niet worden gestart.');
        }

        // Resolve the secret inside this stack frame so PHP traces never print it as an argument.
        $authorizationHeader = 'Authorization: Bearer ' . $this->resolveApiKey();

        curl_setopt_array($handle, [
            CURLOPT_POST => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => 10,
            CURLOPT_TIMEOUT => 90,
            CURLOPT_HTTPHEADER => [
                $authorizationHeader,
                'Content-Type: application/json',
            ],
            CURLOPT_POSTFIELDS => json_encode($payload, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE),
        ]);

        $body = curl_exec($handle);
        $status = (int) curl_getinfo($handle, CURLINFO_RESPONSE_CODE);
        $transportError = curl_error($handle);
        curl_close($handle);

        if (!is_string($body)) {
            throw new RuntimeException('OpenAI is niet bereikbaar: ' . $transportError);
        }

        $decoded = json_decode($body, true);
        if ($status < 200 || $status >= 300 || !is_array($decoded)) {
            $message = is_array($decoded)
                ? (string) ($decoded['error']['message'] ?? 'onbekende API-fout')
                : 'ongeldig antwoord';
            throw new RuntimeException(sprintf('OpenAI-aanvraag mislukt (%d): %s', $status, $message));
        }

        return $decoded;
    }

    /** @param array<string, mixed> $response */
    private function extractOutputText(array $response): string
    {
        if (is_string($response['output_text'] ?? null) && trim($response['output_text']) !== '') {
            return $response['output_text'];
        }

        foreach (($response['output'] ?? []) as $output) {
            if (!is_array($output) || ($output['type'] ?? null) !== 'message') {
                continue;
            }
            foreach (($output['content'] ?? []) as $content) {
                if (is_array($content) && ($content['type'] ?? null) === 'output_text') {
                    return (string) ($content['text'] ?? '');
                }
                if (is_array($content) && ($content['type'] ?? null) === 'refusal') {
                    throw new RuntimeException('OpenAI weigerde deze aanvraag te verwerken.');
                }
            }
        }

        throw new RuntimeException('OpenAI gaf geen tekstuitvoer terug.');
    }
}
