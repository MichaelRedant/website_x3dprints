<?php
declare(strict_types=1);

require_once __DIR__ . '/crm-common.php';

crmRequireAuth();

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    crmRespond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

$type = trim((string) ($_GET['type'] ?? ''));
$map = [
    'logs' => 'contact-log.json',
    'replies' => 'contact-replies.json',
    'material-stock' => 'material-stock.json',
];

if (!isset($map[$type])) {
    crmRespond(400, ['ok' => false, 'error' => 'Invalid type']);
}

$fileName = $map[$type];
$payload = crmReadJsonFile(crmDataPath($fileName));

$download = isset($_GET['download']) && $_GET['download'] === '1';
if ($download) {
    header('Content-Type: application/json; charset=utf-8');
    header('Content-Disposition: attachment; filename="' . $fileName . '"');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

crmRespond(200, $payload);

