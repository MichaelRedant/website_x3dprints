<?php
declare(strict_types=1);

require_once __DIR__ . '/model-preview-common.php';

modelPreviewSecurityHeaders();
modelPreviewCleanupExpired();

$id = strtolower(trim((string) ($_GET['id'] ?? '')));
$file = basename((string) ($_GET['file'] ?? ''));
if (!modelPreviewValidId($id) || preg_match('/^(manifest\.json|model\.(stl|obj|glb))$/', $file) !== 1) {
    http_response_code(404);
    exit;
}

$directory = modelPreviewRoot() . DIRECTORY_SEPARATOR . $id;
$manifest = modelPreviewManifest($directory);
if ($manifest === null || modelPreviewIsExpired($manifest)) {
    if (is_dir($directory)) modelPreviewDeleteDirectory($directory);
    http_response_code(410);
    header('Cache-Control: no-store');
    exit;
}
$state = modelPreviewState($directory);
if (modelPreviewIsRevoked($state)) {
    http_response_code(410);
    header('Cache-Control: no-store');
    exit;
}

$manifestFile = basename((string) ($manifest['file'] ?? ''));
if ($file !== 'manifest.json' && $file !== $manifestFile) {
    http_response_code(404);
    exit;
}

$path = $directory . DIRECTORY_SEPARATOR . $file;
if (!is_file($path)) {
    http_response_code(404);
    exit;
}
if ($file === 'manifest.json') modelPreviewRecordView($directory, $state);

$extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));
$types = [
    'json' => 'application/json; charset=utf-8',
    'stl' => 'model/stl',
    'obj' => 'text/plain; charset=utf-8',
    'glb' => 'model/gltf-binary',
    'gltf' => 'model/gltf+json',
    '3mf' => 'model/3mf',
];
header('Content-Type: ' . ($types[$extension] ?? 'application/octet-stream'));
header('Content-Length: ' . (string) filesize($path));
header('Cache-Control: private, no-store, max-age=0');
header('X-Robots-Tag: noindex, nofollow, noarchive');
readfile($path);
