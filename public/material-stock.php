<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$dataDir = __DIR__ . '/data';
$dataFile = $dataDir . '/material-stock.json';

function respond(int $status, array $payload): void {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!file_exists($dataFile)) {
        respond(200, new stdClass());
    }
    $json = file_get_contents($dataFile);
    $parsed = json_decode($json, true);
    if (!is_array($parsed)) $parsed = [];
    respond(200, $parsed);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['error' => 'Method not allowed']);
}

$input = file_get_contents('php://input');
$decoded = json_decode($input, true);
if (!$decoded || !isset($decoded['key'], $decoded['label'])) {
    respond(400, ['error' => 'Invalid payload, expected { key, label, inStock|reset }']);
}

$key = trim((string)$decoded['key']);
$label = trim((string)$decoded['label']);
$reset = isset($decoded['reset']) ? (bool)$decoded['reset'] : false;
$inStock = $reset ? null : filter_var($decoded['inStock'] ?? null, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);

if ($key === '' || $label === '' || (!$reset && $inStock === null)) {
    respond(400, ['error' => 'Ongeldige waarden voor key/label/inStock']);
}

if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}

$current = [];
if (file_exists($dataFile)) {
    $json = file_get_contents($dataFile);
    $parsed = json_decode($json, true);
    if (is_array($parsed)) $current = $parsed;
}

if (!isset($current[$key]) || !is_array($current[$key])) {
    $current[$key] = [];
}

if ($reset) {
    unset($current[$key][$label]);
    if (empty($current[$key])) {
        unset($current[$key]);
    }
} else {
    $current[$key][$label] = (bool)$inStock;
}

$payload = json_encode($current, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
if ($payload === false) {
    respond(500, ['error' => 'Kon data niet serialiseren']);
}

$written = @file_put_contents($dataFile, $payload, LOCK_EX);
if ($written === false) {
    respond(500, ['error' => 'Kon material-stock.json niet wegschrijven (check bestandspermissies).']);
}
@chmod($dataFile, 0664);

respond(200, ['ok' => true, 'overrides' => $current]);
