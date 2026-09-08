<?php

declare(strict_types=1);

require dirname(__DIR__) . '/files/custom/Espo/Modules/X3dAiQuote/Services/ProjectDraftService.php';

use Espo\Modules\X3dAiQuote\Services\ProjectDraftService;

function assertProjectValue(mixed $expected, mixed $actual, string $label): void
{
    if ($expected !== $actual) {
        fwrite(STDERR, sprintf("FAIL %s\nExpected: %s\nActual: %s\n", $label, var_export($expected, true), var_export($actual, true)));
        exit(1);
    }
}

$draft = (new ProjectDraftService())->build([
    'quoteTitle' => 'Allen & Heath Xone K3 Controller Stands',
    'requestSummary' => 'Set standaarden voor een Xone K3-controller.',
    'customerName' => 'Peter Verschueren',
    'customerCompany' => null,
    'scanType' => null,
    'modelingRequested' => false,
    'delivery' => 'pickup',
    'technicalProposal' => ['PETG zwart aanbevolen wegens hogere taaiheid.'],
    'customerQuestions' => ['Bevestig PETG of PLA Matte.'],
], [
    'baseLineItems' => [[
        'type' => 'printing',
        'pricingRole' => 'base',
        'quantity' => 1,
        'breakdown' => [
            'printHoursPerUnit' => 10.65,
            'printJobs' => 2,
            'electricityCostPerUnit' => 2.45,
            'dryingCost' => 5.10,
            'materials' => [[
                'label' => 'PETG',
                'weightGramsPerUnit' => 336.49,
                'rawCostPerUnit' => 7.87,
            ]],
        ],
    ]],
    'calculatedTotalExclVat' => 50.97,
    'commercialAdjustment' => -5.97,
    'totalExclVat' => 45.00,
    'deliveryCost' => 0,
]);

assertProjectValue('3D Print', $draft['fields']['x3dProjectType'], 'project type');
assertProjectValue('PETG Basic', $draft['fields']['x3dMaterial'], 'project material enum');
assertProjectValue(336.49, $draft['fields']['x3dWeightGrams'], 'project weight');
assertProjectValue(10.65, $draft['fields']['x3dPrintTimeHours'], 'project print time');
assertProjectValue(2, $draft['fields']['x3dNumberOfPrintBeds'], 'project print jobs');
assertProjectValue(50.97, $draft['fields']['x3dQuoteAmountEur'], 'calculated quote amount');
assertProjectValue(5.97, $draft['fields']['x3dDiscountAmountEur'], 'commercial discount');
assertProjectValue(45.00, $draft['fields']['x3dFinalAmountEur'], 'commercial final amount');

fwrite(STDOUT, "Project draft tests passed.\n");
