<?php

declare(strict_types=1);

require dirname(__DIR__) . '/files/custom/Espo/Modules/X3dAiQuote/Services/PricingService.php';

use Espo\Modules\X3dAiQuote\Services\PricingService;

function assertSameValue(mixed $expected, mixed $actual, string $label): void
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

$service = new PricingService();

$print = $service->calculate([
    'printing' => [[
        'description' => 'Testonderdeel',
        'material' => 'PLA_BASIC',
        'quantity' => 2,
        'weightGramsPerUnit' => 100,
        'printHoursPerUnit' => 2,
        'quality' => 'standard',
    ]],
    'scanType' => null,
    'modelingHours' => null,
    'delivery' => 'pickup',
    'discountPercent' => null,
    'extraCost' => null,
    'missingInformation' => [],
]);

assertSameValue(21.47, $print['totalExclVat'], 'PLA Basic print total matches website calculator');
assertSameValue(0.00, $print['vatAmount'], 'small-business VAT exemption');
assertSameValue(21.47, $print['totalInclVat'], 'VAT-exempt total');
assertSameValue(true, $print['readyForReview'], 'complete print can be reviewed');

$scanAndModel = $service->calculate([
    'printing' => [],
    'scanType' => 'technical-object',
    'modelingHours' => 2,
    'delivery' => 'post',
    'discountPercent' => null,
    'extraCost' => null,
    'missingInformation' => [],
]);

assertSameValue(192.50, $scanAndModel['totalExclVat'], 'scan, modeling and delivery total');
assertSameValue(192.50, $scanAndModel['totalInclVat'], 'VAT-exempt scan and modeling total');
assertSameValue(
    'Eenmalige kost. De klant ontvangt ook het digitale 3D-scanbestand.',
    $scanAndModel['lineItems'][0]['details'],
    'scan deliverable sales message'
);

$incomplete = $service->calculate([
    'printing' => [[
        'description' => 'Onbekend onderdeel',
        'material' => null,
        'quantity' => 1,
        'weightGramsPerUnit' => null,
        'printHoursPerUnit' => null,
        'quality' => null,
    ]],
    'scanType' => null,
    'modelingHours' => null,
    'delivery' => 'pickup',
    'discountPercent' => null,
    'extraCost' => null,
    'missingInformation' => [],
]);

assertSameValue(false, $incomplete['canSave'], 'incomplete print is not priced');
assertSameValue(false, $incomplete['readyForReview'], 'incomplete print is not review-ready');
assertSameValue(4, count($incomplete['missingInformation']), 'all missing price inputs reported');

$deliveryOnly = $service->calculate([
    'printing' => [],
    'delivery' => 'post',
    'deliveryIsOptional' => false,
]);

assertSameValue(7.50, $deliveryOnly['totalExclVat'], 'delivery can still be calculated');
assertSameValue(false, $deliveryOnly['canSave'], 'delivery-only result cannot become a quote');
assertSameValue(false, $deliveryOnly['readyForReview'], 'delivery-only result cannot be reviewed');
assertSameValue(
    'Geen prijsbare 3D-print-, scan- of modelleerdienst herkend.',
    $deliveryOnly['missingInformation'][0],
    'delivery-only result explains the missing service'
);

$multiMaterialProject = $service->calculate([
    'printing' => [
        [
            'description' => 'Productie 5 lichtbakletters',
            'pricingRole' => 'base',
            'quantity' => 1,
            'materials' => [
                [
                    'material' => 'PETG',
                    'weightGramsPerUnit' => 543,
                    'pricePerKgOverride' => 25.99,
                ],
                [
                    'material' => 'PLA_WOOD',
                    'weightGramsPerUnit' => 95,
                    'pricePerKgOverride' => 27.99,
                ],
            ],
            'printHoursPerUnit' => 19.6,
            'printerPowerKw' => 2,
            'quality' => 'standard',
            'printJobs' => 6,
            'dryingMode' => 'auto',
            'commercialPriceOverride' => 105,
            'commercialRationale' => 'Afronding productieprijs.',
        ],
        [
            'description' => 'Decoratieve lijn',
            'pricingRole' => 'option',
            'quantity' => 1,
            'materials' => [
                [
                    'material' => 'PETG',
                    'weightGramsPerUnit' => 187,
                    'pricePerKgOverride' => 25.99,
                ],
                [
                    'material' => 'PLA_WOOD',
                    'weightGramsPerUnit' => 25,
                    'pricePerKgOverride' => 27.99,
                ],
            ],
            'printHoursPerUnit' => 7.1,
            'printerPowerKw' => 2,
            'quality' => 'standard',
            'printJobs' => null,
            'dryingMode' => 'shared',
            'commercialPriceOverride' => 35,
            'commercialRationale' => 'Segmentering en extra handling.',
        ],
    ],
    'scanType' => null,
    'scanPricingRole' => 'base',
    'modelingRequested' => true,
    'modelingDescription' => 'Technisch ontwerp en voorbereiding',
    'modelingPricingRole' => 'base',
    'modelingHours' => 2.5,
    'modelingRatePerHourOverride' => 40,
    'modelingFixedPrice' => 100,
    'delivery' => 'post',
    'deliveryCostOverride' => 7.5,
    'deliveryIsOptional' => true,
    'discountPercent' => null,
    'extraCosts' => [],
    'missingInformation' => [],
]);

assertSameValue(34.44, $multiMaterialProject['baseLineItems'][0]['breakdown']['directCost'], 'drying is included before factor x3');
assertSameValue(103.33, $multiMaterialProject['baseLineItems'][0]['breakdown']['calculatedPrice'], 'multi-material production calculation');
assertSameValue(105.00, $multiMaterialProject['baseLineItems'][0]['total'], 'explicit commercial production price');
assertSameValue(205.00, $multiMaterialProject['totalExclVat'], 'base quote excludes options and optional delivery');
assertSameValue(35.00, $multiMaterialProject['optionsTotal'], 'project option total');
assertSameValue(240.00, $multiMaterialProject['totalWithOptions'], 'total with project options');
assertSameValue(7.50, $multiMaterialProject['optionalDeliveryCost'], 'optional delivery remains outside quote total');

$materialAlternative = $service->calculate([
    'printing' => [
        [
            'description' => 'K3-stand in PETG zwart',
            'pricingRole' => 'base',
            'quantity' => 1,
            'materials' => [[
                'material' => 'PETG',
                'weightGramsPerUnit' => 336.49,
                'pricePerKgOverride' => null,
            ]],
            'printHoursPerUnit' => 10.65,
            'printerPowerKw' => 1,
            'quality' => 'standard',
            'printJobs' => 2,
            'dryingMode' => 'none',
            'commercialPriceOverride' => null,
            'samePriceAsBase' => false,
        ],
        [
            'description' => 'K3-stand in PLA Matte zwart',
            'pricingRole' => 'alternative',
            'quantity' => 1,
            'materials' => [[
                'material' => 'PLA_MATTE',
                'weightGramsPerUnit' => 336.49,
                'pricePerKgOverride' => null,
            ]],
            'printHoursPerUnit' => 10.65,
            'printerPowerKw' => 1,
            'quality' => 'standard',
            'printJobs' => 2,
            'dryingMode' => 'none',
            'commercialPriceOverride' => null,
            'samePriceAsBase' => true,
        ],
    ],
    'delivery' => 'pickup',
    'deliveryIsOptional' => true,
    'missingInformation' => ['Bevestig afhaling of verzending.'],
]);

assertSameValue(5.10, $materialAlternative['baseLineItems'][0]['breakdown']['dryingCost'], 'PETG drying cannot be skipped by AI');
assertSameValue(54.13, $materialAlternative['totalExclVat'], 'PETG base price includes drying before factor x3');
assertSameValue(54.13, $materialAlternative['alternativeLineItems'][0]['total'], 'same-price material alternative follows base price');
assertSameValue(0.00, $materialAlternative['optionsTotal'], 'alternative is not added as an option');
assertSameValue(54.13, $materialAlternative['totalWithOptions'], 'alternative does not double the quote total');
assertSameValue(true, $materialAlternative['readyForReview'], 'non-pricing delivery question does not block review');

$commercialProjectPrice = $service->calculate([
    'printing' => [[
        'description' => 'Xone K3 standaarden in PETG zwart',
        'pricingRole' => 'base',
        'quantity' => 1,
        'materials' => [[
            'material' => 'PETG',
            'weightGramsPerUnit' => 336.49,
            'pricePerKgOverride' => null,
        ]],
        'printHoursPerUnit' => 10.65,
        'printerPowerKw' => 1,
        'quality' => 'standard',
        'printJobs' => 2,
        'dryingMode' => 'auto',
        'commercialPriceOverride' => null,
        'samePriceAsBase' => false,
    ]],
    'delivery' => 'pickup',
    'deliveryIsOptional' => true,
    'commercialTotalOverride' => 45,
]);

assertSameValue(54.13, $commercialProjectPrice['calculatedTotalExclVat'], 'calculated price remains auditable');
assertSameValue(-9.13, $commercialProjectPrice['commercialAdjustment'], 'commercial adjustment is explicit');
assertSameValue(45.00, $commercialProjectPrice['totalExclVat'], 'commercial project total is applied');
assertSameValue(45.00, $commercialProjectPrice['baseLineItems'][0]['total'], 'single production line shows customer price');

$smallReplacement = $service->calculate([
    'isReplacementPart' => true,
    'printing' => [[
        'description' => 'IKEA ENJE vervangonderdeel in PETG',
        'pricingRole' => 'base',
        'quantity' => 1,
        'materials' => [[
            'material' => 'PETG',
            'weightGramsPerUnit' => 5.72,
            'pricePerKgOverride' => null,
        ]],
        'printHoursPerUnit' => 41 / 60,
        'printerPowerKw' => 1,
        'quality' => 'standard',
        'printJobs' => 1,
        'dryingMode' => 'auto',
        'commercialPriceOverride' => null,
        'samePriceAsBase' => false,
    ]],
    'scanType' => null,
    'modelingRequested' => false,
    'delivery' => 'post',
    'deliveryIsOptional' => false,
    'extraCosts' => [],
]);

assertSameValue(23.66, $smallReplacement['calculatedTotalExclVat'], 'small replacement keeps normal calculation visible');
assertSameValue(-6.16, $smallReplacement['commercialAdjustment'], 'small replacement service-rate adjustment');
assertSameValue(10.00, $smallReplacement['baseLineItems'][0]['total'], 'small replacement fixed production rate');
assertSameValue(7.50, $smallReplacement['deliveryCost'], 'standard PostNL shipping rate');
assertSameValue(17.50, $smallReplacement['totalExclVat'], 'small replacement customer total');
assertSameValue(
    'small-replacement-part',
    $smallReplacement['baseLineItems'][0]['breakdown']['automaticCommercialRule'],
    'small replacement rule is auditable'
);

fwrite(STDOUT, "Pricing tests passed.\n");
