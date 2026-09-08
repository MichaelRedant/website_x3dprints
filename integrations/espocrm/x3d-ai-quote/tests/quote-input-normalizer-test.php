<?php

declare(strict_types=1);

require dirname(__DIR__) . '/files/custom/Espo/Modules/X3dAiQuote/Services/QuoteInputNormalizer.php';

use Espo\Modules\X3dAiQuote\Services\QuoteInputNormalizer;

function assertNormalizerValue(mixed $expected, mixed $actual, string $label): void
{
    if ($expected !== $actual) {
        fwrite(STDERR, sprintf(
            "FAIL %s\nExpected: %s\nActual: %s\n",
            $label,
            var_export($expected, true),
            var_export($actual, true)
        ));
        exit(1);
    }
}

$service = new QuoteInputNormalizer();
$source = <<<'TEXT'
Naam: Wim Verheirstraeten
Aantal: 1
Bericht:
Graag een offerte voor een vervangonderdeel van een IKEA ENJE rolgordijn.
https://www.printables.com/model/1428082-ikea-enje-roller-cog-replacement
Graag inclusief per post verzenden.
TEXT;

$first = $service->normalize([
    'quoteTitle' => 'IKEA ENJE roller cog',
    'printing' => [[
        'description' => 'IKEA ENJE vervangonderdeel in PETG',
        'printHoursPerUnit' => 41,
    ]],
    'delivery' => 'pickup',
    'deliveryIsOptional' => true,
    'modelingRequested' => true,
    'modelingHours' => 1,
], $source, '5.72gram, 41m petg basic');

$second = $service->normalize($first['analysis'], $source, '5.72gram, 41m petg basic');
$printing = $first['analysis']['printing'][0];

assertNormalizerValue(true, $first['normalization']['applied'], 'exact slicer data is normalized');
assertNormalizerValue(5.72, $printing['materials'][0]['weightGramsPerUnit'], 'decimal grams');
assertNormalizerValue(0.6833, $printing['printHoursPerUnit'], '41m means minutes, never hours');
assertNormalizerValue('PETG', $printing['materials'][0]['material'], 'PETG Basic mapping');
assertNormalizerValue(1, $printing['quantity'], 'quantity from request');
assertNormalizerValue(true, $first['analysis']['isReplacementPart'], 'replacement-part rule');
assertNormalizerValue('post', $first['analysis']['delivery'], 'post delivery detected');
assertNormalizerValue(false, $first['analysis']['deliveryIsOptional'], 'requested delivery is included');
assertNormalizerValue(false, $first['analysis']['modelingRequested'], 'existing Printables model needs no CAD');
assertNormalizerValue($first['analysis']['printing'], $second['analysis']['printing'], 'same input is deterministic');

$k3 = $service->normalize([], 'Aantal: 1', '336,49 gram en 10u39m in PETG Basic');
assertNormalizerValue(336.49, $k3['analysis']['printing'][0]['materials'][0]['weightGramsPerUnit'], 'comma weight');
assertNormalizerValue(10.65, $k3['analysis']['printing'][0]['printHoursPerUnit'], 'hours and minutes');

$ambiguous = $service->normalize([], 'Aantal: 1', '100 g PETG en PLA Matte, 2 uur');
assertNormalizerValue(false, $ambiguous['normalization']['applied'], 'multiple materials stay for manual or AI review');

$petgCf = $service->normalize([], 'Aantal: 1', '100 g PETG-CF, 2 uur');
assertNormalizerValue('PETG_CF', $petgCf['normalization']['material'], 'specialized PETG is not reduced to basic PETG');

$support = $service->normalize([], 'Aantal: 1', '20 g Support for PLA/PETG, 1 uur');
assertNormalizerValue('SUPPORT_PLA_PETG', $support['normalization']['material'], 'support material is recognized separately');

fwrite(STDOUT, "Quote input normalizer tests passed.\n");
