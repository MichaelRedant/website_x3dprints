<?php
declare(strict_types=1);

require_once __DIR__ . '/crm-common.php';

$dataFile = crmDataPath('material-stock.json');
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    crmRespond(200, crmReadJsonFile($dataFile));
}

if ($method !== 'POST') {
    crmRespond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

crmRequireAuth();

$input = file_get_contents('php://input');
$decoded = json_decode((string) $input, true);
if (!is_array($decoded) || !isset($decoded['key'], $decoded['label'])) {
    crmRespond(400, ['ok' => false, 'error' => 'Invalid payload, expected { key, label, inStock|reset }']);
}

$key = trim((string) $decoded['key']);
$label = trim((string) $decoded['label']);
$reset = isset($decoded['reset']) ? (bool) $decoded['reset'] : false;
$inStock = $reset
    ? null
    : filter_var($decoded['inStock'] ?? null, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);

if ($key === '' || $label === '' || (!$reset && $inStock === null)) {
    crmRespond(400, ['ok' => false, 'error' => 'Invalid key/label/inStock values']);
}

$current = crmReadJsonFile($dataFile);
if (!isset($current[$key]) || !is_array($current[$key])) {
    $current[$key] = [];
}

if ($reset) {
    unset($current[$key][$label]);
    if (empty($current[$key])) {
        unset($current[$key]);
    }
} else {
    $current[$key][$label] = (bool) $inStock;
}

if (!crmWriteJsonFile($dataFile, $current)) {
    crmRespond(500, ['ok' => false, 'error' => 'Could not write material stock file']);
}

crmRespond(200, ['ok' => true, 'overrides' => $current]);
