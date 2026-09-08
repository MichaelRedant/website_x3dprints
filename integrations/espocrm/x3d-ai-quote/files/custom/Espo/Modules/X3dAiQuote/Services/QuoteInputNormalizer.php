<?php

declare(strict_types=1);

namespace Espo\Modules\X3dAiQuote\Services;

class QuoteInputNormalizer
{
    /**
     * Exact slicer values supplied by the user take precedence over AI interpretation.
     *
     * @param array<string, mixed> $analysis
     * @return array{analysis: array<string, mixed>, normalization: array<string, mixed>}
     */
    public function normalize(array $analysis, string $sourceText, string $corrections): array
    {
        $input = trim($corrections) !== '' ? $corrections : $sourceText;
        $weight = $this->extractWeightGrams($input) ?? $this->extractWeightGrams($sourceText);
        $hours = $this->extractPrintHours($input) ?? $this->extractPrintHours($sourceText);
        $material = $this->extractSingleMaterial($input) ?? $this->extractSingleMaterial($sourceText);

        $normalization = [
            'applied' => false,
            'weightGrams' => $weight,
            'printHours' => $hours,
            'material' => $material,
        ];

        if ($weight !== null && $hours !== null && $material !== null) {
            $existingPrinting = is_array($analysis['printing'] ?? null) ? $analysis['printing'] : [];
            $firstPrinting = isset($existingPrinting[0]) && is_array($existingPrinting[0])
                ? $existingPrinting[0]
                : [];
            $quantity = $this->extractQuantity($sourceText) ?? 1;
            $description = trim((string) ($firstPrinting['description'] ?? $analysis['quoteTitle'] ?? '3D-printwerk'));

            $analysis['printing'] = [[
                'description' => $description !== '' ? $description : '3D-printwerk',
                'pricingRole' => 'base',
                'quantity' => $quantity,
                'materials' => [[
                    'material' => $material,
                    'weightGramsPerUnit' => $weight,
                    'pricePerKgOverride' => null,
                ]],
                'printHoursPerUnit' => $hours,
                'printerPowerKw' => null,
                'quality' => 'standard',
                'printJobs' => $this->extractPrintJobs($input) ?? $quantity,
                'dryingMode' => 'auto',
                'commercialPriceOverride' => null,
                'commercialRationale' => null,
                'samePriceAsBase' => false,
            ]];

            $normalization['applied'] = true;
            $normalization['quantity'] = $quantity;
        }

        $combinedText = $sourceText . "\n" . $corrections;
        if (preg_match('/\b(vervangonderdeel|vervangstuk|replacement\s+part|roller\s+cog)\b/iu', $combinedText) === 1) {
            $analysis['isReplacementPart'] = true;
        }
        if (preg_match('/\b(per\s+post|verzend(?:en|ing)|opsturen|postnl)\b/iu', $combinedText) === 1) {
            $analysis['delivery'] = 'post';
            $analysis['deliveryIsOptional'] = false;
        }
        if (
            preg_match('~https?://(?:www\.)?printables\.com/~iu', $combinedText) === 1 &&
            preg_match('/\b(aanpass(?:en|ing)|wijzig(?:en|ing)|ontwerp(?:en|werk)|cad)\b/iu', $corrections) !== 1
        ) {
            $analysis['modelingRequested'] = false;
            $analysis['modelingHours'] = null;
            $analysis['modelingFixedPrice'] = null;
        }

        return ['analysis' => $analysis, 'normalization' => $normalization];
    }

    private function extractWeightGrams(string $text): ?float
    {
        if (preg_match_all('/(?<![\d.,])(\d+(?:[.,]\d+)?)\s*(?:gram(?:men)?|gr|g)\b/iu', $text, $matches) !== 1) {
            return null;
        }

        return $this->positiveNumber($matches[1][0] ?? null);
    }

    private function extractPrintHours(string $text): ?float
    {
        if (preg_match('/(?<!\d)(\d+)\s*(?:u|h|uur|uren)\s*(\d{1,2})\s*(?:m|min|minuten?)?\b/iu', $text, $match) === 1) {
            return round(((float) $match[1]) + (((float) $match[2]) / 60), 4);
        }
        if (preg_match('/(?<!\d)(\d+(?:[.,]\d+)?)\s*(?:uur|uren|hours?|hrs?)\b/iu', $text, $match) === 1) {
            return $this->positiveNumber($match[1] ?? null);
        }
        if (preg_match('/(?<!\d)(\d+(?:[.,]\d+)?)\s*(?:m|min|minuten?|minutes?)\b/iu', $text, $match) === 1) {
            $minutes = $this->positiveNumber($match[1] ?? null);
            return $minutes === null ? null : round($minutes / 60, 4);
        }

        return null;
    }

    private function extractSingleMaterial(string $text): ?string
    {
        $patterns = [
            'SUPPORT_PLA_PETG' => '/\bsupport\s+(?:for\s+)?pla\s*\/\s*petg\b/iu',
            'SUPPORT_PLA' => '/\bsupport\s+(?:for\s+)?pla\b(?!\s*\/)/iu',
            'SUPPORT_ABS' => '/\bsupport\s+(?:for\s+)?abs\b/iu',
            'PETG_TRANSLUCENT' => '/\bpetg\s+translucent\b/iu',
            'PETG_CF' => '/\bpetg\s*[- ]?cf\b/iu',
            'PETG_HF' => '/\bpetg\s+(?:hf|high[ -]?flow)\b/iu',
            'PAHT_CF' => '/\bpaht\s*[- ]?cf\b/iu',
            'PA6_GF' => '/\bpa6\s*[- ]?gf\b/iu',
            'PA6_CF' => '/\bpa6\s*[- ]?cf\b/iu',
            'PET_CF' => '/\bpet\s*[- ]?cf\b/iu',
            'ABS_GF' => '/\babs\s*[- ]?gf\b/iu',
            'ASA_AERO' => '/\basa\s+aero\b/iu',
            'ASA_CF' => '/\basa\s*[- ]?cf\b/iu',
            'PPA_CF' => '/\bppa\s*[- ]?cf\b/iu',
            'PPS_CF' => '/\bpps\s*[- ]?cf\b/iu',
            'TPU_AMS' => '/\btpu\s+(?:for\s+)?ams\b/iu',
            'TPU_85_90A' => '/\btpu\s+(?:85|90)a\b/iu',
            'PC_FR' => '/\bpc\s*[- ]?fr\b/iu',
            'PLA_BASIC_GRADIENT' => '/\bpla\s+basic\s+gradient\b/iu',
            'PLA_TRANSLUCENT' => '/\bpla\s+translucent\b/iu',
            'PLA_SILK_MULTI_COLOR' => '/\bpla\s+silk\s+multi[ -]?colou?r\b/iu',
            'PLA_SILK_PLUS' => '/\bpla\s+silk(?:\+|\s+plus)?(?=\s|,|;|$)/iu',
            'PLA_TOUGH_PLUS' => '/\bpla\s+tough(?:\+|\s+plus)?(?=\s|,|;|$)/iu',
            'PLA_MATTE' => '/\bpla\s+matte\b/iu',
            'PLA_WOOD' => '/\bpla\s+wood\b/iu',
            'PLA_GLOW' => '/\bpla\s+glow\b/iu',
            'PLA_MARBLE' => '/\bpla\s+marble\b/iu',
            'PLA_SPARKLE' => '/\bpla\s+sparkle\b/iu',
            'PLA_METAL' => '/\bpla\s+metal\b/iu',
            'PLA_GALAXY' => '/\bpla\s+galaxy\b/iu',
            'PLA_AERO' => '/\bpla\s+aero\b/iu',
            'PLA_CF' => '/\bpla\s*[- ]?cf\b/iu',
            'PLA_BASIC' => '/\bpla(?:\s+basic)?\b(?!(?:\s+|-)(?:basic\s+gradient|gradient|translucent|silk|tough|matte|wood|glow|marble|sparkle|metal|galaxy|aero|cf))/iu',
            'PETG' => '/\bpetg(?:\s+basic)?\b(?!(?:\s+|-)(?:cf|hf|high[ -]?flow|translucent))/iu',
            'ABS' => '/\babs\b(?!\s*[- ]?gf)/iu',
            'ASA' => '/\basa\b(?!(?:\s+|-)(?:cf|aero))/iu',
            'TPU' => '/\btpu\b(?!\s+(?:for\s+)?ams|\s+(?:85|90)a)/iu',
            'PC' => '/\bpc\b(?!\s*[- ]?fr)/iu',
            'PVA' => '/\bpva\b/iu',
        ];
        $found = [];

        foreach ($patterns as $material => $pattern) {
            if (preg_match($pattern, $text) === 1) {
                $found[] = $material;
            }
        }

        $found = array_values(array_unique($found));

        if (array_intersect($found, ['SUPPORT_PLA', 'SUPPORT_PLA_PETG', 'SUPPORT_ABS']) !== []) {
            $found = array_values(array_diff($found, ['PLA_BASIC', 'PETG', 'ABS']));
        }

        return count($found) === 1 ? $found[0] : null;
    }

    private function extractQuantity(string $text): ?int
    {
        if (preg_match('/\baantal\s*:\s*(\d+)\b/iu', $text, $match) !== 1) {
            return null;
        }

        $quantity = (int) $match[1];
        return $quantity > 0 ? $quantity : null;
    }

    private function extractPrintJobs(string $text): ?int
    {
        if (preg_match('/\b(\d+)\s*(?:printjobs?|jobs?)\b/iu', $text, $match) !== 1) {
            return null;
        }

        $jobs = (int) $match[1];
        return $jobs > 0 ? $jobs : null;
    }

    private function positiveNumber(mixed $value): ?float
    {
        if (!is_scalar($value)) {
            return null;
        }

        $number = (float) str_replace(',', '.', trim((string) $value));
        return $number > 0 ? $number : null;
    }
}
