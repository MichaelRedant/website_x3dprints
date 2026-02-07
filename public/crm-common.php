<?php
declare(strict_types=1);

if (basename(__FILE__) === basename((string) ($_SERVER['SCRIPT_FILENAME'] ?? ''))) {
    http_response_code(404);
    exit;
}

function crmRespond(int $status, array $payload): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function crmDataDir(): string
{
    $fromEnv = trim((string) (getenv('CRM_DATA_DIR') ?: ''));
    if ($fromEnv !== '') {
        return rtrim($fromEnv, DIRECTORY_SEPARATOR);
    }
    // Keep CRM data outside web root by default.
    return dirname(__DIR__) . DIRECTORY_SEPARATOR . 'storage' . DIRECTORY_SEPARATOR . 'crm';
}

function crmDataPath(string $fileName): string
{
    return crmDataDir() . DIRECTORY_SEPARATOR . ltrim($fileName, DIRECTORY_SEPARATOR);
}

function crmEnsureDataDir(): void
{
    $dir = crmDataDir();
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
}

function crmReadJsonFile(string $filePath): array
{
    if (!file_exists($filePath)) {
        return [];
    }
    $raw = file_get_contents($filePath);
    $decoded = json_decode((string) $raw, true);
    return is_array($decoded) ? $decoded : [];
}

function crmWriteJsonFile(string $filePath, array $payload): bool
{
    crmEnsureDataDir();
    $json = json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if ($json === false) {
        return false;
    }
    $written = @file_put_contents($filePath, $json, LOCK_EX);
    if ($written === false) {
        return false;
    }
    @chmod($filePath, 0664);
    return true;
}

function crmSessionStart(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $isSecure = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    session_name('x3dcrm');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $isSecure,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);

    session_start([
        'use_strict_mode' => 1,
        'cookie_httponly' => 1,
        'cookie_secure' => $isSecure ? 1 : 0,
        'cookie_samesite' => 'Strict',
    ]);
}

function crmIsAuthenticated(): bool
{
    crmSessionStart();
    return !empty($_SESSION['crm_auth']) && $_SESSION['crm_auth'] === true;
}

function crmRequireAuth(): void
{
    if (!crmIsAuthenticated()) {
        crmRespond(401, ['ok' => false, 'error' => 'Unauthorized']);
    }
}
