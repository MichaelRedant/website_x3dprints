<?php

declare(strict_types=1);

namespace Espo\Modules\X3dAiQuote\Api;

use Espo\Core\Api\Action;
use Espo\Core\Api\Request;
use Espo\Core\Api\Response;
use Espo\Core\Api\ResponseComposer;
use Espo\Core\Acl;
use Espo\Core\Acl\Table;
use Espo\Core\Exceptions\BadRequest;
use Espo\Core\Exceptions\Forbidden;
use Espo\Core\Exceptions\NotFound;
use Espo\Modules\X3dAiQuote\Services\OpenAiQuoteService;
use Espo\Modules\X3dAiQuote\Services\PricingService;
use Espo\Modules\X3dAiQuote\Services\ProjectDraftService;
use Espo\Modules\X3dAiQuote\Services\QuoteInputNormalizer;
use Espo\ORM\EntityManager;

class PostAnalyze implements Action
{
    public function __construct(
        private OpenAiQuoteService $openAiQuoteService,
        private PricingService $pricingService,
        private ProjectDraftService $projectDraftService,
        private QuoteInputNormalizer $quoteInputNormalizer,
        private EntityManager $entityManager,
        private Acl $acl,
    ) {}

    public function process(Request $request): Response
    {
        $body = $request->getParsedBody();
        $sourceText = trim((string) ($body->sourceText ?? ''));
        $corrections = trim((string) ($body->corrections ?? ''));
        $sourceRecordType = trim((string) ($body->sourceRecordType ?? ''));
        $sourceRecordId = trim((string) ($body->sourceRecordId ?? ''));
        $commercialTotal = null;

        if (isset($body->commercialTotal) && $body->commercialTotal !== '') {
            if (!is_numeric($body->commercialTotal)) {
                throw new BadRequest('De commerciële eindprijs moet een geldig bedrag zijn.');
            }
            $commercialTotal = round((float) $body->commercialTotal, 2);
            if ($commercialTotal <= 0 || $commercialTotal > 1000000) {
                throw new BadRequest('De commerciële eindprijs moet tussen 0 en 1.000.000 EUR liggen.');
            }
        }

        if ($sourceText === '') {
            throw new BadRequest('Aanvraagtekst ontbreekt.');
        }
        if (mb_strlen($sourceText) > 20000) {
            throw new BadRequest('Aanvraagtekst is langer dan 20.000 tekens.');
        }
        if (mb_strlen($corrections) > 4000) {
            throw new BadRequest('Aanvullingen zijn langer dan 4.000 tekens.');
        }

        $this->assertSourceRecordAccess($sourceRecordType, $sourceRecordId);

        $ai = $this->openAiQuoteService->analyze($sourceText, $corrections);
        $normalized = $this->quoteInputNormalizer->normalize($ai['analysis'], $sourceText, $corrections);
        $ai['analysis'] = $normalized['analysis'];
        $ai['analysis']['commercialTotalOverride'] = $commercialTotal;
        $quote = $this->pricingService->calculate($ai['analysis']);
        $quote['inputNormalization'] = $normalized['normalization'];
        $quote['customerSubject'] = trim((string) ($ai['analysis']['customerSubject'] ?? 'Offerte X3DPrints'));
        $quote['customerLanguage'] = (string) ($ai['analysis']['language'] ?? 'nl');
        $quote['internalText'] = $this->composeInternalText($ai['analysis'], $quote);
        $quote['customerText'] = $this->composeCustomerText($ai['analysis'], $quote);
        $projectDraft = $this->projectDraftService->build($ai['analysis'], $quote);

        return ResponseComposer::json([
            'analysis' => $ai['analysis'],
            'quote' => $quote,
            'projectDraft' => $projectDraft,
            'ai' => [
                'responseId' => $ai['responseId'],
                'model' => $ai['model'],
                'promptVersion' => 'x3d-quote-prompt-2026-08-30-v7',
                'storedByOpenAi' => false,
            ],
        ]);
    }

    private function assertSourceRecordAccess(string $entityType, string $id): void
    {
        if (!in_array($entityType, ['Email', 'Lead', 'Opportunity', 'X3dImport'], true) || $id === '') {
            throw new BadRequest('Een geldig gekoppeld CRM-record is verplicht.');
        }

        $entity = $this->entityManager->getEntityById($entityType, $id);
        if ($entity === null) {
            throw new NotFound('Het gekoppelde CRM-record bestaat niet.');
        }

        $action = $entityType === 'Email' ? Table::ACTION_READ : Table::ACTION_EDIT;
        if (!$this->acl->check($entity, $action)) {
            throw new Forbidden('Geen toegang tot het gekoppelde CRM-record.');
        }
    }

    /**
     * @param array<string, mixed> $analysis
     * @param array<string, mixed> $quote
     */
    private function composeInternalText(array $analysis, array $quote): string
    {
        $lines = [
            'INTERN - ' . trim((string) ($analysis['quoteTitle'] ?? 'Conceptofferte')),
            '',
            'Samenvatting: ' . trim((string) ($analysis['requestSummary'] ?? '')),
            'Klanttaal: ' . strtoupper((string) ($analysis['language'] ?? 'nl')),
            '',
        ];

        $normalization = is_array($quote['inputNormalization'] ?? null)
            ? $quote['inputNormalization']
            : [];
        if ((bool) ($normalization['applied'] ?? false)) {
            $lines[] = sprintf(
                'Gecontroleerde slicerdata: %s g, %s uur, %s.',
                $this->number((float) ($normalization['weightGrams'] ?? 0)),
                $this->number((float) ($normalization['printHours'] ?? 0), 4),
                (string) ($normalization['material'] ?? 'onbekend materiaal')
            );
            $lines[] = 'Deze waarden zijn server-side gelezen en overschrijven eventuele AI-interpretatiefouten.';
            $lines[] = '';
        }

        foreach (($quote['lineItems'] ?? []) as $item) {
            if (!is_array($item)) {
                continue;
            }

            $role = match ($item['pricingRole'] ?? 'base') {
                'option' => 'OPTIE',
                'alternative' => 'ALTERNATIEF',
                default => 'BASIS',
            };
            if (($item['pricingRole'] ?? '') === 'delivery-option') {
                $role = 'OPTIONELE VERZENDING';
            }
            $lines[] = sprintf('%s - %s', $role, (string) ($item['description'] ?? 'Offertepost'));

            $breakdown = is_array($item['breakdown'] ?? null) ? $item['breakdown'] : null;
            if ($breakdown !== null) {
                foreach (($breakdown['materials'] ?? []) as $material) {
                    if (!is_array($material)) {
                        continue;
                    }
                    $lines[] = sprintf(
                        '- %s: %s g x %s EUR/kg = %s EUR; +20%% = %s EUR%s',
                        (string) ($material['label'] ?? 'Materiaal'),
                        $this->number((float) ($material['weightGramsPerUnit'] ?? 0), 0),
                        $this->money((float) ($material['pricePerKg'] ?? 0)),
                        $this->money((float) ($material['rawCostPerUnit'] ?? 0)),
                        $this->money((float) ($material['costWithMarkupPerUnit'] ?? 0)),
                        (bool) ($material['priceOverridden'] ?? false) ? ' (expliciete kg-prijs)' : ''
                    );
                }
                $lines[] = sprintf(
                    '- Elektriciteit: %s uur x %s kW x %s EUR/kWh = %s EUR per eenheid',
                    $this->number((float) ($breakdown['effectiveHoursPerUnit'] ?? 0)),
                    $this->number((float) ($breakdown['printerPowerKw'] ?? 0)),
                    $this->money((float) ($breakdown['electricityPerKwh'] ?? 0)),
                    $this->money((float) ($breakdown['electricityCostPerUnit'] ?? 0))
                );
                if ((float) ($breakdown['dryingCost'] ?? 0) > 0) {
                    $lines[] = '- Drying in directe kost: ' . $this->money((float) $breakdown['dryingCost']) . ' EUR';
                } elseif (($breakdown['dryingMode'] ?? '') === 'shared') {
                    $lines[] = '- Drying: gedeeld met een andere productieregel, niet opnieuw aangerekend.';
                }
                $lines[] = '- Directe kost: ' . $this->money((float) ($breakdown['directCost'] ?? 0)) . ' EUR';
                $lines[] = sprintf(
                    '- Productieprijs x%s: %s EUR',
                    $this->number((float) ($breakdown['profitFactor'] ?? 0), 0),
                    $this->money((float) ($breakdown['calculatedPrice'] ?? 0))
                );
                if ($breakdown['commercialPriceOverride'] !== null) {
                    $reason = trim((string) ($breakdown['commercialRationale'] ?? ''));
                    $lines[] = '- Commercieel toegepast: ' . $this->money((float) $breakdown['commercialPriceOverride']) .
                        ' EUR' . ($reason !== '' ? ' - ' . $reason : '');
                }
                if ((bool) ($breakdown['samePriceAsBase'] ?? false)) {
                    $lines[] = '- Verkoopprijs gelijk aan de basisuitvoering.';
                }
            } else {
                $lines[] = '- ' . trim((string) ($item['details'] ?? ''));
            }

            $lines[] = '- Offertepost: ' . $this->money((float) ($item['total'] ?? 0)) . ' EUR';
            $lines[] = '';
        }

        $lines[] = 'Berekend basistotaal: ' . $this->money((float) ($quote['calculatedTotalExclVat'] ?? 0)) . ' EUR';
        if (abs((float) ($quote['commercialAdjustment'] ?? 0)) >= 0.005) {
            $lines[] = 'Commerciële aanpassing: ' . $this->money((float) $quote['commercialAdjustment']) . ' EUR';
        }
        $lines[] = 'Commercieel basistotaal: ' . $this->money((float) ($quote['totalExclVat'] ?? 0)) . ' EUR';
        if ((float) ($quote['optionsTotal'] ?? 0) > 0) {
            $lines[] = 'Opties: +' . $this->money((float) $quote['optionsTotal']) . ' EUR';
            $lines[] = 'Totaal met alle projectopties: ' . $this->money((float) $quote['totalWithOptions']) . ' EUR';
        }
        if ((float) ($quote['optionalDeliveryCost'] ?? 0) > 0) {
            $lines[] = 'Optionele verzending: +' . $this->money((float) $quote['optionalDeliveryCost']) . ' EUR';
        }
        $lines[] = (string) ($quote['vatStatement'] ?? '');

        $this->appendList($lines, 'Nog te bevestigen', $quote['missingInformation'] ?? []);
        $this->appendList($lines, 'Aannames en voorwaarden', $analysis['assumptions'] ?? []);

        return trim(implode("\n", $lines));
    }

    /**
     * @param array<string, mixed> $analysis
     * @param array<string, mixed> $quote
     */
    private function composeCustomerText(array $analysis, array $quote): string
    {
        $language = in_array(($analysis['language'] ?? 'nl'), ['nl', 'fr', 'en', 'de'], true)
            ? (string) $analysis['language']
            : 'nl';
        $copy = $this->customerCopy($language);
        $customerName = $this->firstName(trim((string) ($analysis['customerName'] ?? '')));
        $lines = [$customerName !== '' ? sprintf($copy['greetingName'], $customerName) : $copy['greeting']];
        $lines[] = '';
        $lines[] = trim((string) ($analysis['customerIntroduction'] ?? $copy['introduction']));

        $this->appendList($lines, $copy['proposal'], $analysis['technicalProposal'] ?? []);

        $lines[] = '';
        $lines[] = $copy['pricing'] . ':';
        $lines[] = '';
        $lines[] = $copy['description'] . ' | ' . $copy['price'];
        $lines[] = '--- | ---:';

        foreach (($quote['baseLineItems'] ?? []) as $item) {
            if (!is_array($item)) {
                continue;
            }
            $lines[] = sprintf('%s | %s EUR', (string) ($item['description'] ?? $copy['item']), $this->money((float) ($item['total'] ?? 0)));
        }
        $lines[] = sprintf('**%s** | **%s EUR**', $copy['total'], $this->money((float) ($quote['totalExclVat'] ?? 0)));

        foreach (($quote['alternativeLineItems'] ?? []) as $item) {
            if (is_array($item)) {
                $lines[] = sprintf('%s - %s | %s EUR', $copy['alternative'], (string) ($item['description'] ?? $copy['item']), $this->money((float) ($item['total'] ?? 0)));
            }
        }
        foreach (($quote['optionLineItems'] ?? []) as $item) {
            if (is_array($item)) {
                $lines[] = sprintf('%s - %s | + %s EUR', $copy['option'], (string) ($item['description'] ?? $copy['item']), $this->money((float) ($item['total'] ?? 0)));
            }
        }
        if ((float) ($quote['optionsTotal'] ?? 0) > 0) {
            $lines[] = sprintf('**%s** | **%s EUR**', $copy['totalWithOptions'], $this->money((float) ($quote['totalWithOptions'] ?? 0)));
        }
        foreach (($quote['optionalDeliveryItems'] ?? []) as $item) {
            if (is_array($item)) {
                $lines[] = sprintf('%s | + %s EUR', $copy['optionalDelivery'], $this->money((float) ($item['total'] ?? 0)));
            }
        }

        $lines[] = '';
        $lines[] = $copy['vat'];

        $leadTime = trim((string) ($analysis['productionLeadTime'] ?? ''));
        if ($leadTime !== '') {
            $lines[] = '';
            $lines[] = $copy['leadTime'] . ': ' . $leadTime;
        }

        $this->appendList($lines, $copy['notIncluded'], $analysis['exclusions'] ?? []);
        $this->appendList($lines, $copy['questions'], $analysis['customerQuestions'] ?? []);

        $lines[] = '';
        $lines[] = trim((string) ($analysis['customerClosing'] ?? 'Na jouw bevestiging controleer ik planning en uitvoerbaarheid.'));
        $lines[] = '';
        $lines[] = $copy['signoff'];
        $lines[] = 'Michaël';

        return trim(implode("\n", $lines));
    }

    /** @param string[] $lines */
    private function appendList(array &$lines, string $heading, mixed $items): void
    {
        if (!is_array($items) || $items === []) {
            return;
        }

        $lines[] = '';
        $lines[] = $heading . ':';
        foreach ($items as $item) {
            $value = trim((string) $item);
            if ($value !== '') {
                $lines[] = '- ' . $value;
            }
        }
    }

    /** @return array<string, string> */
    private function customerCopy(string $language): array
    {
        return match ($language) {
            'fr' => [
                'greetingName' => 'Bonjour %s,', 'greeting' => 'Bonjour,',
                'introduction' => 'Merci pour votre demande.', 'proposal' => 'Proposition technique',
                'pricing' => 'Offre', 'description' => 'Description', 'price' => 'Prix',
                'item' => 'Poste', 'total' => 'Total', 'option' => 'Option', 'alternative' => 'Alternative',
                'totalWithOptions' => 'Total avec toutes les options',
                'optionalDelivery' => 'Envoi en Belgique - option',
                'vat' => 'TVA non applicable - régime belge de franchise pour petites entreprises.',
                'leadTime' => 'Délai prévu après validation', 'notIncluded' => 'Non compris',
                'questions' => 'Pour finaliser', 'signoff' => 'Bien à vous,',
            ],
            'en' => [
                'greetingName' => 'Hello %s,', 'greeting' => 'Hello,',
                'introduction' => 'Thank you for your enquiry.', 'proposal' => 'Technical proposal',
                'pricing' => 'Quotation', 'description' => 'Description', 'price' => 'Price',
                'item' => 'Item', 'total' => 'Total', 'option' => 'Option', 'alternative' => 'Alternative',
                'totalWithOptions' => 'Total with all options',
                'optionalDelivery' => 'Shipping within Belgium - option',
                'vat' => 'VAT not applicable - Belgian small-business exemption scheme.',
                'leadTime' => 'Expected lead time after approval', 'notIncluded' => 'Not included',
                'questions' => 'To finalise the quotation', 'signoff' => 'Kind regards,',
            ],
            'de' => [
                'greetingName' => 'Guten Tag %s,', 'greeting' => 'Guten Tag,',
                'introduction' => 'Vielen Dank für Ihre Anfrage.', 'proposal' => 'Technischer Vorschlag',
                'pricing' => 'Angebot', 'description' => 'Beschreibung', 'price' => 'Preis',
                'item' => 'Position', 'total' => 'Gesamt', 'option' => 'Option', 'alternative' => 'Alternative',
                'totalWithOptions' => 'Gesamt mit allen Optionen',
                'optionalDelivery' => 'Versand innerhalb Belgiens - optional',
                'vat' => 'Keine Mehrwertsteuer - belgische Kleinunternehmerregelung.',
                'leadTime' => 'Voraussichtliche Lieferzeit nach Freigabe', 'notIncluded' => 'Nicht enthalten',
                'questions' => 'Zur Fertigstellung', 'signoff' => 'Mit freundlichen Grüßen,',
            ],
            default => [
                'greetingName' => 'Dag %s,', 'greeting' => 'Hallo,',
                'introduction' => 'Bedankt voor je aanvraag.', 'proposal' => 'Technisch voorstel',
                'pricing' => 'Offerte', 'description' => 'Omschrijving', 'price' => 'Prijs',
                'item' => 'Offertepost', 'total' => 'Totaal', 'option' => 'Optie', 'alternative' => 'Alternatief',
                'totalWithOptions' => 'Totaal met alle opties',
                'optionalDelivery' => 'Verzending in België - optie',
                'vat' => 'Btw niet van toepassing - Belgische vrijstellingsregeling voor kleine ondernemingen.',
                'leadTime' => 'Verwachte doorlooptijd na goedkeuring', 'notIncluded' => 'Niet inbegrepen',
                'questions' => 'Om de offerte af te ronden', 'signoff' => 'Met vriendelijke groeten,',
            ],
        };
    }

    private function money(float $value): string
    {
        return number_format($value, 2, ',', '.');
    }

    private function firstName(string $fullName): string
    {
        if ($fullName === '') {
            return '';
        }

        return trim((string) preg_split('/\s+/u', $fullName, 2)[0]);
    }

    private function number(float $value, int $decimals = 2): string
    {
        return number_format($value, $decimals, ',', '.');
    }
}
