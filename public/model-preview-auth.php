<?php
declare(strict_types=1);

require_once __DIR__ . '/model-preview-common.php';

modelPreviewSessionStart();
$method = (string) ($_SERVER['REQUEST_METHOD'] ?? 'GET');

if ($method === 'GET') {
    modelPreviewJson(200, ['ok' => true, 'authed' => modelPreviewIsAuthenticated()]);
}
if ($method === 'DELETE') {
    modelPreviewLogout();
    modelPreviewJson(200, ['ok' => true]);
}
if ($method !== 'POST') modelPreviewJson(405, ['ok' => false, 'error' => 'Method not allowed']);

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength < 1 || $contentLength > 4096) {
    modelPreviewJson(400, ['ok' => false, 'error' => 'Ongeldig verzoek.']);
}
$body = json_decode((string) file_get_contents('php://input'), true);
$password = is_array($body) ? (string) ($body['password'] ?? '') : '';
$password = mb_substr($password, 0, 256);
$ip = preg_replace('/[^a-fA-F0-9:.]/', '', (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
if (!modelPreviewConsumeRateSlot('auth', $ip, 5, 300)) {
    header('Retry-After: 300');
    modelPreviewJson(429, ['ok' => false, 'error' => 'Te veel pogingen. Probeer over enkele minuten opnieuw.']);
}

// Configureerbaar via hostingomgeving; de fallback bevat uitsluitend een sterke wachtwoordhash.
$passwordHash = trim((string) (getenv('MODEL_PREVIEW_PASSWORD_HASH') ?: '$2y$10$kKhFl5D1M4TWJb8sXF22KugazeLspJcMOOqjR4u9mEE5Q/q6mEfc2'));
if ($password === '' || !password_verify($password, $passwordHash)) {
    modelPreviewJson(401, ['ok' => false, 'error' => 'Wachtwoord klopt niet.']);
}

modelPreviewClearRateLimit('auth', $ip);
modelPreviewLogin();
modelPreviewJson(200, ['ok' => true]);
