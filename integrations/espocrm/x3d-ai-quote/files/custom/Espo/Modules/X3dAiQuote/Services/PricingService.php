<?php

declare(strict_types=1);

namespace Espo\Modules\X3dAiQuote\Services;

use InvalidArgumentException;

class PricingService
{
    public const RULES_VERSION = 'x3d-pricing-2026-08-30-v7';

    private const MATERIAL_PRICE_PER_KG = [
        'PLA_BASIC' => 25.99,
        'PLA_BASIC_GRADIENT' => 27.99,
        'PLA_MATTE' => 25.99,
        'PLA_GLOW' => 27.99,
        'PLA_MARBLE' => 27.99,
        'PLA_SPARKLE' => 27.99,
        'PLA_METAL' => 27.99,
        'PLA_GALAXY' => 27.99,
        'PLA_AERO' => 49.99,
        'PLA_SILK_PLUS' => 25.99,
        'PLA_SILK_MULTI_COLOR' => 27.99,
        'PLA_CF' => 26.99,
        'PLA_WOOD' => 27.99,
        'PLA_TRANSLUCENT' => 25.99,
        'PLA_TOUGH_PLUS' => 26.99,
        'PETG' => 25.99,
        'PETG_CF' => 35.99,
        'PETG_HF' => 25.99,
        'PETG_TRANSLUCENT' => 25.99,
        'ABS' => 25.99,
        'ABS_GF' => 31.99,
        'PA6_GF' => 62.99,
        'PA6_CF' => 82.99,
        'PAHT_CF' => 101.99,
        'PET_CF' => 90.99,
        'PC' => 42.99,
        'PC_FR' => 56.99,
        'ASA' => 24.99,
        'ASA_CF' => 38.99,
        'ASA_AERO' => 51.99,
        'PPA_CF' => 207.99,
        'PPS_CF' => 178.65,
        'TPU_AMS' => 35.99,
        'TPU_85_90A' => 43.99,
        'TPU' => 43.99,
        'SUPPORT_PLA' => 51.98,
        'SUPPORT_PLA_PETG' => 73.98,
        'SUPPORT_ABS' => 33.98,
        'PVA' => 83.98,
    ];

    private const MATERIAL_LABEL = [
        'PLA_BASIC' => 'PLA Basic',
        'PLA_BASIC_GRADIENT' => 'PLA Basic Gradient',
        'PLA_MATTE' => 'PLA Matte',
        'PLA_GLOW' => 'PLA Glow',
        'PLA_MARBLE' => 'PLA Marble',
        'PLA_SPARKLE' => 'PLA Sparkle',
        'PLA_METAL' => 'PLA Metal',
        'PLA_GALAXY' => 'PLA Galaxy',
        'PLA_AERO' => 'PLA Aero',
        'PLA_SILK_PLUS' => 'PLA Silk+',
        'PLA_SILK_MULTI_COLOR' => 'PLA Silk Multi-Color',
        'PLA_CF' => 'PLA-CF',
        'PLA_WOOD' => 'PLA Wood',
        'PLA_TRANSLUCENT' => 'PLA Translucent',
        'PLA_TOUGH_PLUS' => 'PLA Tough+',
        'PETG' => 'PETG',
        'PETG_CF' => 'PETG-CF',
        'PETG_HF' => 'PETG HF',
        'PETG_TRANSLUCENT' => 'PETG Translucent',
        'ABS' => 'ABS',
        'ABS_GF' => 'ABS-GF',
        'PA6_GF' => 'PA6-GF',
        'PA6_CF' => 'PA6-CF',
        'PAHT_CF' => 'PAHT-CF',
        'PET_CF' => 'PET-CF',
        'PC' => 'PC',
        'PC_FR' => 'PC FR',
        'ASA' => 'ASA',
        'ASA_CF' => 'ASA-CF',
        'ASA_AERO' => 'ASA Aero',
        'PPA_CF' => 'PPA-CF',
        'PPS_CF' => 'PPS-CF',
        'TPU_AMS' => 'TPU for AMS',
        'TPU_85_90A' => 'TPU 85/90A',
        'TPU' => 'TPU 85/90A',
        'SUPPORT_PLA' => 'Support for PLA',
        'SUPPORT_PLA_PETG' => 'Support for PLA/PETG',
        'SUPPORT_ABS' => 'Support for ABS',
        'PVA' => 'PVA supportmateriaal',
    ];

    private const QUALITY_MULTIPLIER = [
        'standard' => 1.00,
        'fine' => 1.15,
        'ultra' => 1.25,
    ];

    private const SCAN_PRICES = [
        'small-object' => ['label' => '3D-scan klein object', 'price' => 45.00],
        'medium-object' => ['label' => '3D-scan middelgroot object', 'price' => 75.00],
        'large-object' => ['label' => '3D-scan groot object', 'price' => 125.00],
        'technical-object' => ['label' => '3D-scan technisch object', 'price' => 95.00],
        'event-scan' => ['label' => '3D-scannen op beurs of event', 'price' => 225.00],
        'person-bust' => ['label' => '3D-scan buste', 'price' => 95.00],
        'full-body' => ['label' => '3D-scan full body', 'price' => 250.00],
    ];

    private const DRYING_MATERIALS = [
        'TPU', 'TPU_AMS', 'TPU_85_90A', 'PLA_WOOD', 'PETG', 'PETG_CF', 'PETG_HF',
        'PETG_TRANSLUCENT', 'PC', 'PC_FR', 'PA6_GF', 'PA6_CF', 'PAHT_CF', 'PET_CF',
        'PPA_CF', 'PPS_CF', 'PVA',
    ];
    private const MATERIAL_MARKUP = 0.20;
    private const PROFIT_FACTOR = 3.00;
    private const ELECTRICITY_PER_KWH = 0.23;
    private const PRINTER_POWER_KW = 1.00;
    private const MODELING_RATE_PER_HOUR = 45.00;
    private const VAT_RATE = 0.00;
    private const SMALL_REPLACEMENT_MAX_WEIGHT_GRAMS = 15.00;
    private const SMALL_REPLACEMENT_MAX_PRINT_HOURS = 1.50;
    private const SMALL_REPLACEMENT_PRICE = 10.00;
    private const VAT_STATEMENT = 'Btw niet van toepassing - Belgische vrijstellingsregeling voor kleine ondernemingen.';

    /**
     * @param array<string, mixed> $analysis
     * @return array<string, mixed>
     */
    public function calculate(array $analysis): array
    {
        $baseItems = [];
        $optionItems = [];
        $alternativeItems = [];
        $optionalDeliveryItems = [];
        $missing = [];
        $printing = is_array($analysis['printing'] ?? null) ? $analysis['printing'] : [];
        $dryingFixedCharged = false;
        $lastBasePrintingTotal = null;

        usort($printing, static function (mixed $left, mixed $right): int {
            $leftRole = is_array($left) ? ($left['pricingRole'] ?? 'base') : 'base';
            $rightRole = is_array($right) ? ($right['pricingRole'] ?? 'base') : 'base';
            $rank = static fn (mixed $role): int => match ($role) {
                'base' => 0,
                'alternative' => 1,
                default => 2,
            };

            return $rank($leftRole) <=> $rank($rightRole);
        });

        foreach ($printing as $index => $item) {
            if (!is_array($item)) {
                continue;
            }

            $description = trim((string) ($item['description'] ?? '3D-printwerk'));
            $role = $this->pricingRole($item['pricingRole'] ?? null);
            $quality = $this->nullableString($item['quality'] ?? null) ?? 'standard';
            $quantity = $this->nullablePositiveInt($item['quantity'] ?? null);
            $hours = $this->nullablePositiveFloat($item['printHoursPerUnit'] ?? null);
            $power = $this->nullablePositiveFloat($item['printerPowerKw'] ?? null) ?? self::PRINTER_POWER_KW;
            $printJobs = $this->nullablePositiveInt($item['printJobs'] ?? null) ?? $quantity;
            $requestedDryingMode = $this->nullableString($item['dryingMode'] ?? null) ?? 'auto';
            $materials = $this->normalizeMaterials($item);
            $label = sprintf('Printregel %d (%s)', $index + 1, $description);

            if ($quantity === null) {
                $missing[] = $label . ': aantal ontbreekt.';
            }
            if ($hours === null) {
                $missing[] = $label . ': printtijd per stuk of productieset ontbreekt.';
            }
            if (!isset(self::QUALITY_MULTIPLIER[$quality])) {
                $missing[] = $label . ': kwaliteitsniveau is ongeldig.';
            }
            if ($materials === []) {
                $missing[] = $label . ': materiaal en filamentgewicht ontbreken.';
            }

            $materialBreakdown = [];
            $materialCostWithMarkupPerUnit = 0.0;
            $requiresDrying = false;

            foreach ($materials as $materialIndex => $materialItem) {
                $material = $this->nullableString($materialItem['material'] ?? null);
                $weight = $this->nullablePositiveFloat($materialItem['weightGramsPerUnit'] ?? null);

                $materialIsValid = $material !== null && isset(self::MATERIAL_PRICE_PER_KG[$material]);

                if (!$materialIsValid) {
                    $missing[] = sprintf('%s, materiaal %d: geldig materiaal ontbreekt.', $label, $materialIndex + 1);
                }
                if ($weight === null) {
                    $materialLabel = $materialIsValid
                        ? self::MATERIAL_LABEL[$material]
                        : sprintf('materiaal %d', $materialIndex + 1);
                    $missing[] = sprintf('%s, %s: filamentgewicht ontbreekt.', $label, $materialLabel);
                }
                if (!$materialIsValid || $weight === null) {
                    continue;
                }

                $priceOverride = $this->nullablePositiveFloat($materialItem['pricePerKgOverride'] ?? null);
                $pricePerKg = $priceOverride ?? self::MATERIAL_PRICE_PER_KG[$material];
                $rawCost = ($weight / 1000) * $pricePerKg;
                $withMarkup = $rawCost * (1 + self::MATERIAL_MARKUP);
                $materialCostWithMarkupPerUnit += $withMarkup;
                $requiresDrying = $requiresDrying || in_array($material, self::DRYING_MATERIALS, true);
                $materialBreakdown[] = [
                    'material' => $material,
                    'label' => self::MATERIAL_LABEL[$material],
                    'weightGramsPerUnit' => $this->round($weight),
                    'pricePerKg' => $this->round($pricePerKg),
                    'priceOverridden' => $priceOverride !== null,
                    'rawCostPerUnit' => $this->round($rawCost),
                    'costWithMarkupPerUnit' => $this->round($withMarkup),
                ];
            }

            if (
                $quantity === null ||
                $hours === null ||
                !isset(self::QUALITY_MULTIPLIER[$quality]) ||
                count($materialBreakdown) !== count($materials) ||
                $materials === []
            ) {
                continue;
            }

            $effectiveHoursPerUnit = $hours * self::QUALITY_MULTIPLIER[$quality];
            $electricityPerUnit = $effectiveHoursPerUnit * $power * self::ELECTRICITY_PER_KWH;
            $dryingCost = 0.0;

            $dryingMode = $requiresDrying
                ? ($requestedDryingMode === 'shared' ? 'shared' : 'auto')
                : 'none';

            if ($requiresDrying && $dryingMode === 'auto') {
                if ($role === 'alternative' || !$dryingFixedCharged) {
                    $dryingCost += 5.00;
                    if ($role !== 'alternative') {
                        $dryingFixedCharged = true;
                    }
                }
                $dryingCost += 0.05 * ($printJobs ?? $quantity);
            }

            $directCost = (($materialCostWithMarkupPerUnit + $electricityPerUnit) * $quantity) + $dryingCost;
            $calculatedPrice = $directCost * self::PROFIT_FACTOR;
            $commercialPrice = $this->nullablePositiveFloat($item['commercialPriceOverride'] ?? null);
            $samePriceAsBase = $role === 'alternative' && (bool) ($item['samePriceAsBase'] ?? false);
            $total = $samePriceAsBase && $lastBasePrintingTotal !== null
                ? $lastBasePrintingTotal
                : ($commercialPrice ?? $calculatedPrice);
            $lineItem = [
                'type' => 'printing',
                'pricingRole' => $role,
                'description' => $description,
                'quantity' => $quantity,
                'unitPrice' => $this->round($total / $quantity),
                'total' => $this->round($total),
                'details' => sprintf(
                    '%s kwaliteit, %.2f uur, %.2f kW%s',
                    $quality,
                    $hours,
                    $power,
                    $samePriceAsBase
                        ? ', zelfde prijs als basisuitvoering'
                        : ($commercialPrice !== null ? ', commercieel afgerond' : '')
                ),
                'breakdown' => [
                    'materials' => $materialBreakdown,
                    'quality' => $quality,
                    'qualityMultiplier' => self::QUALITY_MULTIPLIER[$quality],
                    'printHoursPerUnit' => $this->round($hours),
                    'effectiveHoursPerUnit' => $this->round($effectiveHoursPerUnit),
                    'printJobs' => $printJobs,
                    'printerPowerKw' => $this->round($power),
                    'electricityPerKwh' => self::ELECTRICITY_PER_KWH,
                    'electricityCostPerUnit' => $this->round($electricityPerUnit),
                    'dryingCost' => $this->round($dryingCost),
                    'dryingMode' => $dryingMode,
                    'directCost' => $this->round($directCost),
                    'profitFactor' => self::PROFIT_FACTOR,
                    'calculatedPrice' => $this->round($calculatedPrice),
                    'commercialPriceOverride' => $commercialPrice === null ? null : $this->round($commercialPrice),
                    'commercialRationale' => trim((string) ($item['commercialRationale'] ?? '')),
                    'samePriceAsBase' => $samePriceAsBase,
                ],
            ];
            if ($role === 'base') {
                $lastBasePrintingTotal = $total;
            }
            $this->appendByRole($lineItem, $role, $baseItems, $optionItems, $alternativeItems);
        }

        $scanType = $this->nullableString($analysis['scanType'] ?? null);
        if ($scanType !== null) {
            if (!isset(self::SCAN_PRICES[$scanType])) {
                $missing[] = 'Het herkende type 3D-scan is ongeldig.';
            } else {
                $scan = self::SCAN_PRICES[$scanType];
                $role = $this->pricingRole($analysis['scanPricingRole'] ?? null);
                $lineItem = [
                    'type' => 'scanning',
                    'pricingRole' => $role,
                    'description' => $scan['label'],
                    'quantity' => 1,
                    'unitPrice' => $scan['price'],
                    'total' => $scan['price'],
                    'details' => 'Eenmalige kost. De klant ontvangt ook het digitale 3D-scanbestand.',
                ];
                $this->appendByRole($lineItem, $role, $baseItems, $optionItems, $alternativeItems);
            }
        }

        $modelingRequested = (bool) ($analysis['modelingRequested'] ?? false);
        $modelingHours = $this->nullablePositiveFloat($analysis['modelingHours'] ?? null);
        $modelingRateOverride = $this->nullablePositiveFloat($analysis['modelingRatePerHourOverride'] ?? null);
        $modelingFixedPrice = $this->nullablePositiveFloat($analysis['modelingFixedPrice'] ?? null);

        if ($modelingRequested && $modelingHours === null && $modelingFixedPrice === null) {
            $missing[] = 'Ontwerp/CAD is nodig, maar uren of een vaste ontwerpprijs ontbreken.';
        }
        if ($modelingHours !== null || $modelingFixedPrice !== null) {
            $role = $this->pricingRole($analysis['modelingPricingRole'] ?? null);
            $rate = $modelingRateOverride ?? self::MODELING_RATE_PER_HOUR;
            $total = $modelingFixedPrice ?? ($modelingHours * $rate);
            $description = trim((string) ($analysis['modelingDescription'] ?? 'Technisch ontwerp en 3D-modellering'));
            $lineItem = [
                'type' => 'modeling',
                'pricingRole' => $role,
                'description' => $description !== '' ? $description : 'Technisch ontwerp en 3D-modellering',
                'quantity' => $modelingFixedPrice !== null ? 1 : $modelingHours,
                'unitPrice' => $modelingFixedPrice !== null ? $this->round($modelingFixedPrice) : $this->round($rate),
                'total' => $this->round($total),
                'details' => $modelingFixedPrice !== null
                    ? 'Eenmalige vaste kost binnen deze offerte.'
                    : sprintf('Eenmalige kost: %.2f uur aan %.2f EUR/uur.', $modelingHours, $rate),
            ];
            $this->appendByRole($lineItem, $role, $baseItems, $optionItems, $alternativeItems);
        }

        $extraCosts = is_array($analysis['extraCosts'] ?? null) ? $analysis['extraCosts'] : [];
        foreach ($extraCosts as $extra) {
            if (!is_array($extra)) {
                continue;
            }
            $amount = $this->nullablePositiveFloat($extra['amount'] ?? null);
            if ($amount === null) {
                continue;
            }
            $role = $this->pricingRole($extra['pricingRole'] ?? null);
            $lineItem = [
                'type' => 'extra',
                'pricingRole' => $role,
                'description' => trim((string) ($extra['description'] ?? 'Extra werk of materiaal')),
                'quantity' => 1,
                'unitPrice' => $this->round($amount),
                'total' => $this->round($amount),
                'details' => 'Expliciet opgenomen extra offertepost.',
            ];
            $this->appendByRole($lineItem, $role, $baseItems, $optionItems, $alternativeItems);
        }

        $this->applySmallReplacementRate($analysis, $baseItems, $optionItems, $alternativeItems);

        $baseSubtotalBeforeDelivery = $this->sumItems($baseItems);
        $delivery = $this->nullableString($analysis['delivery'] ?? null) ?? 'pickup';
        $deliveryOverride = $this->nullablePositiveFloat($analysis['deliveryCostOverride'] ?? null);
        $deliveryCost = $deliveryOverride ?? $this->deliveryCost($delivery, $baseSubtotalBeforeDelivery);

        if ($deliveryCost > 0) {
            $lineItem = [
                'type' => 'delivery',
                'pricingRole' => (bool) ($analysis['deliveryIsOptional'] ?? false) ? 'delivery-option' : 'base',
                'description' => $this->deliveryLabel($delivery),
                'quantity' => 1,
                'unitPrice' => $this->round($deliveryCost),
                'total' => $this->round($deliveryCost),
                'details' => $deliveryOverride !== null ? 'Expliciet opgegeven verzendkost.' : '',
            ];
            if ((bool) ($analysis['deliveryIsOptional'] ?? false)) {
                $optionalDeliveryItems[] = $lineItem;
            } else {
                $baseItems[] = $lineItem;
            }
        }

        $subtotalBeforeDiscount = $this->sumItems($baseItems);
        $calculatedSubtotalBeforeDiscount = $this->sumCalculatedItems($baseItems);
        $discountPercent = min(100.0, max(0.0, (float) ($analysis['discountPercent'] ?? 0)));
        $discountValue = $subtotalBeforeDiscount * ($discountPercent / 100);
        if ($discountValue > 0) {
            $baseItems[] = [
                'type' => 'discount',
                'pricingRole' => 'base',
                'description' => sprintf('Korting %.2f%%', $discountPercent),
                'quantity' => 1,
                'unitPrice' => -$this->round($discountValue),
                'total' => -$this->round($discountValue),
                'details' => 'Alleen toegepast omdat deze korting expliciet vermeld werd.',
            ];
        }

        $pricedTotalBeforeGlobalOverride = max(0.0, $subtotalBeforeDiscount - $discountValue);
        $calculatedTotalExclVat = max(0.0, $calculatedSubtotalBeforeDiscount - $discountValue);
        $commercialTotalOverride = $this->nullablePositiveFloat($analysis['commercialTotalOverride'] ?? null);
        $commercialAdjustment = $pricedTotalBeforeGlobalOverride - $calculatedTotalExclVat;

        if ($commercialTotalOverride !== null) {
            $adjustmentToApply = $commercialTotalOverride - $pricedTotalBeforeGlobalOverride;
            $commercialAdjustment = $commercialTotalOverride - $calculatedTotalExclVat;

            if (abs($adjustmentToApply) >= 0.005) {
                $adjustableIndexes = [];
                foreach ($baseItems as $index => $item) {
                    if (($item['type'] ?? '') === 'printing' && ($item['pricingRole'] ?? 'base') === 'base') {
                        $adjustableIndexes[] = $index;
                    }
                }

                if (count($adjustableIndexes) === 1) {
                    $index = $adjustableIndexes[0];
                    $adjustedLineTotal = (float) ($baseItems[$index]['total'] ?? 0) + $adjustmentToApply;

                    if ($adjustedLineTotal > 0) {
                        $quantity = max(1, (int) ($baseItems[$index]['quantity'] ?? 1));
                        $baseItems[$index]['details'] = trim(
                            (string) ($baseItems[$index]['details'] ?? '') . ', commerciële projectprijs toegepast',
                            ' ,'
                        );
                        $baseItems[$index]['originalTotal'] = $this->round((float) $baseItems[$index]['total']);
                        $baseItems[$index]['total'] = $this->round($adjustedLineTotal);
                        $baseItems[$index]['unitPrice'] = $this->round($adjustedLineTotal / $quantity);
                        if (is_array($baseItems[$index]['breakdown'] ?? null)) {
                            $baseItems[$index]['breakdown']['commercialProjectAdjustment'] =
                                $this->round($commercialAdjustment);
                            $baseItems[$index]['breakdown']['commercialProjectTotal'] =
                                $this->round($commercialTotalOverride);
                        }
                    } else {
                        $baseItems[] = $this->commercialAdjustmentItem($adjustmentToApply);
                    }
                } else {
                    $baseItems[] = $this->commercialAdjustmentItem($adjustmentToApply);
                }
            }
        }

        $totalExclVat = $commercialTotalOverride ?? $pricedTotalBeforeGlobalOverride;
        $optionsTotal = $this->sumItems($optionItems);
        $totalWithOptions = $totalExclVat + $optionsTotal;
        $vatAmount = 0.0;
        $missing = array_values(array_unique(array_filter(array_map('trim', $missing))));
        $lineItems = array_merge($baseItems, $alternativeItems, $optionItems, $optionalDeliveryItems);

        $hasBaseService = count(array_filter(
            $baseItems,
            static fn (array $item): bool => in_array(
                (string) ($item['type'] ?? ''),
                ['printing', 'scanning', 'modeling'],
                true
            )
        )) > 0;

        if (!$hasBaseService) {
            $missing[] = 'Geen prijsbare 3D-print-, scan- of modelleerdienst herkend.';
            $missing = array_values(array_unique($missing));
        }

        return [
            'rulesVersion' => self::RULES_VERSION,
            'currency' => 'EUR',
            'vatRate' => self::VAT_RATE,
            'vatStatement' => self::VAT_STATEMENT,
            'lineItems' => $lineItems,
            'baseLineItems' => $baseItems,
            'alternativeLineItems' => $alternativeItems,
            'optionLineItems' => $optionItems,
            'optionalDeliveryItems' => $optionalDeliveryItems,
            'subtotalBeforeDelivery' => $this->round($baseSubtotalBeforeDelivery),
            'deliveryCost' => (bool) ($analysis['deliveryIsOptional'] ?? false) ? 0.0 : $this->round($deliveryCost),
            'optionalDeliveryCost' => (bool) ($analysis['deliveryIsOptional'] ?? false) ? $this->round($deliveryCost) : 0.0,
            'discountValue' => $this->round($discountValue),
            'calculatedTotalExclVat' => $this->round($calculatedTotalExclVat),
            'commercialTotalOverride' => $commercialTotalOverride === null
                ? null
                : $this->round($commercialTotalOverride),
            'commercialAdjustment' => $this->round($commercialAdjustment),
            'totalExclVat' => $this->round($totalExclVat),
            'optionsTotal' => $this->round($optionsTotal),
            'totalWithOptions' => $this->round($totalWithOptions),
            'vatAmount' => $vatAmount,
            'totalInclVat' => $this->round($totalExclVat),
            'missingInformation' => $missing,
            'canSave' => $hasBaseService,
            'readyForReview' => $hasBaseService && $missing === [],
        ];
    }

    /** @param array<string, mixed> $item @return array<int, array<string, mixed>> */
    private function normalizeMaterials(array $item): array
    {
        if (is_array($item['materials'] ?? null) && $item['materials'] !== []) {
            return array_values(array_filter($item['materials'], 'is_array'));
        }

        if (array_key_exists('material', $item) || array_key_exists('weightGramsPerUnit', $item)) {
            return [[
                'material' => $item['material'] ?? null,
                'weightGramsPerUnit' => $item['weightGramsPerUnit'] ?? null,
                'pricePerKgOverride' => null,
            ]];
        }

        return [];
    }

    /**
     * @param array<string, mixed> $item
     * @param array<int, array<string, mixed>> $baseItems
     * @param array<int, array<string, mixed>> $optionItems
     * @param array<int, array<string, mixed>> $alternativeItems
     */
    private function appendByRole(
        array $item,
        string $role,
        array &$baseItems,
        array &$optionItems,
        array &$alternativeItems
    ): void
    {
        if ($role === 'alternative') {
            $alternativeItems[] = $item;
            return;
        }
        if ($role === 'option') {
            $optionItems[] = $item;
            return;
        }

        $baseItems[] = $item;
    }

    /** @param array<int, array<string, mixed>> $items */
    private function sumItems(array $items): float
    {
        return array_reduce(
            $items,
            static fn (float $sum, array $item): float => $sum + (float) ($item['total'] ?? 0),
            0.0
        );
    }

    /** @param array<int, array<string, mixed>> $items */
    private function sumCalculatedItems(array $items): float
    {
        return array_reduce(
            $items,
            static fn (float $sum, array $item): float =>
                $sum + (float) ($item['originalTotal'] ?? $item['total'] ?? 0),
            0.0
        );
    }

    /**
     * @param array<string, mixed> $analysis
     * @param array<int, array<string, mixed>> $baseItems
     * @param array<int, array<string, mixed>> $optionItems
     * @param array<int, array<string, mixed>> $alternativeItems
     */
    private function applySmallReplacementRate(
        array $analysis,
        array &$baseItems,
        array $optionItems,
        array &$alternativeItems
    ): void {
        if (
            !(bool) ($analysis['isReplacementPart'] ?? false) ||
            $this->nullablePositiveFloat($analysis['commercialTotalOverride'] ?? null) !== null ||
            ($analysis['scanType'] ?? null) !== null ||
            (bool) ($analysis['modelingRequested'] ?? false) ||
            $optionItems !== [] ||
            count($baseItems) !== 1 ||
            ($baseItems[0]['type'] ?? '') !== 'printing' ||
            (int) ($baseItems[0]['quantity'] ?? 0) !== 1
        ) {
            return;
        }

        $breakdown = is_array($baseItems[0]['breakdown'] ?? null) ? $baseItems[0]['breakdown'] : [];
        if (($breakdown['commercialPriceOverride'] ?? null) !== null) {
            return;
        }

        $weight = array_reduce(
            is_array($breakdown['materials'] ?? null) ? $breakdown['materials'] : [],
            static fn (float $sum, mixed $material): float =>
                $sum + (is_array($material) ? (float) ($material['weightGramsPerUnit'] ?? 0) : 0.0),
            0.0
        );
        $hours = (float) ($breakdown['printHoursPerUnit'] ?? 0);

        if (
            $weight <= 0 ||
            $weight > self::SMALL_REPLACEMENT_MAX_WEIGHT_GRAMS ||
            $hours <= 0 ||
            $hours > self::SMALL_REPLACEMENT_MAX_PRINT_HOURS
        ) {
            return;
        }

        $baseItems[0]['originalTotal'] = $this->round((float) ($baseItems[0]['total'] ?? 0));
        $baseItems[0]['unitPrice'] = self::SMALL_REPLACEMENT_PRICE;
        $baseItems[0]['total'] = self::SMALL_REPLACEMENT_PRICE;
        $baseItems[0]['details'] = trim(
            (string) ($baseItems[0]['details'] ?? '') . ', vast servicetarief voor klein vervangonderdeel',
            ' ,'
        );
        $baseItems[0]['breakdown']['commercialPriceOverride'] = self::SMALL_REPLACEMENT_PRICE;
        $baseItems[0]['breakdown']['commercialRationale'] =
            'Vast servicetarief inclusief voorbereiding, drying en handling.';
        $baseItems[0]['breakdown']['automaticCommercialRule'] = 'small-replacement-part';

        foreach ($alternativeItems as &$item) {
            if ((bool) ($item['breakdown']['samePriceAsBase'] ?? false)) {
                $item['originalTotal'] = $this->round((float) ($item['total'] ?? 0));
                $item['unitPrice'] = self::SMALL_REPLACEMENT_PRICE;
                $item['total'] = self::SMALL_REPLACEMENT_PRICE;
            }
        }
        unset($item);
    }

    /** @return array<string, mixed> */
    private function commercialAdjustmentItem(float $adjustment): array
    {
        return [
            'type' => 'commercial-adjustment',
            'pricingRole' => 'base',
            'description' => $adjustment < 0
                ? 'Commerciële projectkorting'
                : 'Commerciële prijsaanpassing',
            'quantity' => 1,
            'unitPrice' => $this->round($adjustment),
            'total' => $this->round($adjustment),
            'details' => 'Expliciet ingestelde commerciële eindprijs.',
        ];
    }

    private function pricingRole(mixed $value): string
    {
        $role = $this->nullableString($value);

        return in_array($role, ['option', 'alternative'], true) ? $role : 'base';
    }

    private function deliveryCost(string $delivery, float $subtotal): float
    {
        return match ($delivery) {
            '24h' => 20.00,
            '48h' => 15.00,
            'post' => 7.50,
            'pickup' => 0.00,
            default => throw new InvalidArgumentException('Ongeldige levermethode.'),
        };
    }

    private function deliveryLabel(string $delivery): string
    {
        return match ($delivery) {
            '24h' => 'Spoedlevering binnen 24 uur',
            '48h' => 'Spoedlevering binnen 48 uur',
            'post' => 'Verzending in Belgie',
            default => 'Afhaling in Herzele',
        };
    }

    /** @return string[] */
    private function stringList(mixed $value): array
    {
        if (!is_array($value)) {
            return [];
        }

        return array_values(array_filter(array_map(
            static fn (mixed $item): string => is_scalar($item) ? trim((string) $item) : '',
            $value
        )));
    }

    private function nullableString(mixed $value): ?string
    {
        if (!is_scalar($value)) {
            return null;
        }

        $value = trim((string) $value);
        return $value === '' ? null : $value;
    }

    private function nullablePositiveFloat(mixed $value): ?float
    {
        if ($value === null || $value === '' || !is_numeric($value)) {
            return null;
        }

        $number = (float) $value;
        return $number > 0 ? $number : null;
    }

    private function nullablePositiveInt(mixed $value): ?int
    {
        if ($value === null || $value === '' || !is_numeric($value)) {
            return null;
        }

        $number = (int) $value;
        return $number > 0 ? $number : null;
    }

    private function round(float $value): float
    {
        return round($value, 2);
    }
}
