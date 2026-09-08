<?php

declare(strict_types=1);

namespace Espo\Modules\X3dAiQuote\Services;

class ProjectDraftService
{
    /**
     * @param array<string, mixed> $analysis
     * @param array<string, mixed> $quote
     * @return array{summary: string, fields: array<string, mixed>}
     */
    public function build(array $analysis, array $quote): array
    {
        $printingItems = array_values(array_filter(
            is_array($quote['baseLineItems'] ?? null) ? $quote['baseLineItems'] : [],
            static fn (mixed $item): bool => is_array($item) && ($item['type'] ?? '') === 'printing'
        ));

        $weight = 0.0;
        $hours = 0.0;
        $printJobs = 0;
        $materialCost = 0.0;
        $electricityCost = 0.0;
        $dryingCost = 0.0;
        $material = null;

        foreach ($printingItems as $item) {
            $quantity = max(1, (int) ($item['quantity'] ?? 1));
            $breakdown = is_array($item['breakdown'] ?? null) ? $item['breakdown'] : [];
            $hours += (float) ($breakdown['printHoursPerUnit'] ?? 0) * $quantity;
            $electricityCost += (float) ($breakdown['electricityCostPerUnit'] ?? 0) * $quantity;
            $dryingCost += (float) ($breakdown['dryingCost'] ?? 0);
            $printJobs += max(1, (int) ($breakdown['printJobs'] ?? $quantity));

            foreach (($breakdown['materials'] ?? []) as $materialItem) {
                if (!is_array($materialItem)) {
                    continue;
                }
                $weight += (float) ($materialItem['weightGramsPerUnit'] ?? 0) * $quantity;
                $materialCost += (float) ($materialItem['rawCostPerUnit'] ?? 0) * $quantity;
                if ($material === null) {
                    $material = $this->projectMaterial((string) ($materialItem['label'] ?? ''));
                }
            }
        }

        $calculatedTotal = (float) ($quote['calculatedTotalExclVat'] ?? $quote['totalExclVat'] ?? 0);
        $finalTotal = (float) ($quote['totalExclVat'] ?? 0);
        $discount = max(0.0, $calculatedTotal - $finalTotal);
        $quantity = $printingItems !== []
            ? array_sum(array_map(static fn (array $item): int => max(1, (int) ($item['quantity'] ?? 1)), $printingItems))
            : 1;

        $fields = [
            'name' => trim((string) ($analysis['quoteTitle'] ?? 'Nieuw X3DPrints-project')),
            'amount' => $this->round($finalTotal),
            'amountCurrency' => 'EUR',
            'x3dProjectStatus' => 'Offerte berekend',
            'x3dProjectType' => $this->projectType($analysis, $printingItems),
            'x3dQuoteAmountEur' => $this->round($calculatedTotal),
            'x3dDiscountAmountEur' => $this->round($discount),
            'x3dFinalAmountEur' => $this->round($finalTotal),
            'x3dVatIncluded' => false,
        ];

        if ($printingItems !== []) {
            $fields['x3dQuantity'] = max(1, $quantity);
            $fields['x3dWeightGrams'] = $this->round($weight);
            $fields['x3dPrintTimeHours'] = $this->round($hours);
            $fields['x3dNumberOfPrintBeds'] = max(1, $printJobs);
            $fields['x3dMaterialCostEur'] = $this->round($materialCost);
            $fields['x3dElectricityCostEur'] = $this->round($electricityCost);
            $fields['x3dDryerCostEur'] = $this->round($dryingCost);
        }

        if ($material !== null) {
            $fields['x3dMaterial'] = $material;
        }

        $delivery = (string) ($analysis['delivery'] ?? 'pickup');
        $fields['x3dShippingRequired'] = $delivery !== 'pickup';
        $fields['x3dDeliveryMethod'] = $delivery === 'pickup' ? 'Afhaling' : 'PostNL';
        $fields['x3dDeliveryCostEur'] = $this->round((float) ($quote['deliveryCost'] ?? 0));

        return [
            'summary' => $this->summary($analysis, $quote, $fields),
            'fields' => $fields,
        ];
    }

    /** @param array<string, mixed> $analysis @param array<int, array<string, mixed>> $printingItems */
    private function projectType(array $analysis, array $printingItems): string
    {
        if (($analysis['scanType'] ?? null) !== null) {
            return '3D Scan';
        }
        if ($printingItems === [] && (bool) ($analysis['modelingRequested'] ?? false)) {
            $description = mb_strtolower((string) ($analysis['modelingDescription'] ?? ''));
            return str_contains($description, 'reverse') ? 'Reverse Engineering' : '3D Ontwerp';
        }

        return '3D Print';
    }

    private function projectMaterial(string $label): ?string
    {
        return match ($label) {
            'PETG' => 'PETG Basic',
            'TPU' => 'TPU 85/90A',
            'PC', 'PC FR', 'PLA Basic', 'PLA Basic Gradient', 'PLA Matte', 'PLA Glow',
            'PLA Marble', 'PLA Sparkle', 'PLA Metal', 'PLA Galaxy', 'PLA Aero', 'PLA Silk+',
            'PLA Silk Multi-Color', 'PLA-CF', 'PLA Wood', 'PLA Translucent', 'PLA Tough+' => $label,
            default => null,
        };
    }

    /** @param array<string, mixed> $analysis @param array<string, mixed> $quote @param array<string, mixed> $fields */
    private function summary(array $analysis, array $quote, array $fields): string
    {
        $lines = [
            'CRM-SAMENVATTING - ' . (string) ($fields['name'] ?? 'Project'),
            '',
            'Aanvraag: ' . trim((string) ($analysis['requestSummary'] ?? '')),
            'Projecttype: ' . (string) ($fields['x3dProjectType'] ?? ''),
        ];

        $customerName = trim((string) ($analysis['customerName'] ?? ''));
        $customerCompany = trim((string) ($analysis['customerCompany'] ?? ''));
        if ($customerName !== '' || $customerCompany !== '') {
            $lines[] = 'Klant: ' . trim($customerName . ($customerCompany !== '' ? ' - ' . $customerCompany : ''));
        }
        if (isset($fields['x3dMaterial'])) {
            $lines[] = 'Materiaal: ' . (string) $fields['x3dMaterial'];
        }
        if ((float) ($fields['x3dWeightGrams'] ?? 0) > 0) {
            $lines[] = sprintf(
                'Productie: %s g, %s uur, %d printjob(s)',
                $this->number((float) $fields['x3dWeightGrams']),
                $this->number((float) $fields['x3dPrintTimeHours']),
                (int) $fields['x3dNumberOfPrintBeds']
            );
        }

        $lines[] = 'Berekende prijs: ' . $this->money((float) ($quote['calculatedTotalExclVat'] ?? 0)) . ' EUR';
        if (abs((float) ($quote['commercialAdjustment'] ?? 0)) >= 0.005) {
            $lines[] = 'Commerciële aanpassing: ' . $this->money((float) $quote['commercialAdjustment']) . ' EUR';
        }
        $lines[] = 'Offertebedrag: ' . $this->money((float) ($quote['totalExclVat'] ?? 0)) . ' EUR';

        $this->appendList($lines, 'Technisch voorstel', $analysis['technicalProposal'] ?? []);
        $this->appendList($lines, 'Nog te bevestigen', $analysis['customerQuestions'] ?? []);

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

    private function round(float $value): float
    {
        return round($value, 2);
    }

    private function money(float $value): string
    {
        return number_format($value, 2, ',', '.');
    }

    private function number(float $value): string
    {
        return number_format($value, 2, ',', '.');
    }
}
