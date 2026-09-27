<?php
declare(strict_types=1);

if (basename(__FILE__) === basename((string) ($_SERVER['SCRIPT_FILENAME'] ?? ''))) {
    http_response_code(404);
    exit;
}

function modelPreviewRoot(): string
{
    return __DIR__ . DIRECTORY_SEPARATOR . 'model-previews';
}

function modelPreviewSessionStart(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) return;
    $isSecure = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    session_name('x3dprints_model_preview');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $isSecure,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start([
        'use_strict_mode' => 1,
        'use_only_cookies' => 1,
        'cookie_httponly' => 1,
        'cookie_secure' => $isSecure ? 1 : 0,
        'cookie_samesite' => 'Strict',
    ]);
}

function modelPreviewIsAuthenticated(): bool
{
    modelPreviewSessionStart();
    if (($_SESSION['model_preview_auth'] ?? false) !== true) return false;
    $now = time();
    $loginAt = (int) ($_SESSION['model_preview_login_at'] ?? 0);
    $lastSeen = (int) ($_SESSION['model_preview_last_seen'] ?? 0);
    if ($loginAt < $now - 28800 || $lastSeen < $now - 7200) {
        modelPreviewLogout();
        return false;
    }
    $_SESSION['model_preview_last_seen'] = $now;
    return true;
}

function modelPreviewLogin(): void
{
    modelPreviewSessionStart();
    session_regenerate_id(true);
    $_SESSION['model_preview_auth'] = true;
    $_SESSION['model_preview_login_at'] = time();
    $_SESSION['model_preview_last_seen'] = time();
}

function modelPreviewLogout(): void
{
    modelPreviewSessionStart();
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'] ?? '', $params['secure'], $params['httponly']);
    }
    session_destroy();
}

function modelPreviewValidId(string $id): bool
{
    return preg_match('/^[a-z0-9][a-z0-9_-]{7,63}$/', $id) === 1;
}

function modelPreviewSecurityHeaders(): void
{
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('Referrer-Policy: no-referrer');
    header('Permissions-Policy: camera=(), microphone=(), geolocation=()');
    header('Cross-Origin-Resource-Policy: same-origin');
    header("Content-Security-Policy: frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'");
    if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
        header('Strict-Transport-Security: max-age=31536000');
    }
}

function modelPreviewProtectDirectory(string $directory): bool
{
    if (!is_dir($directory) && !@mkdir($directory, 0755, true) && !is_dir($directory)) return false;
    $rules = "Options -Indexes\n"
        . "<IfModule mod_authz_core.c>\n  Require all denied\n</IfModule>\n"
        . "<IfModule !mod_authz_core.c>\n  Order allow,deny\n  Deny from all\n</IfModule>\n";
    return @file_put_contents($directory . DIRECTORY_SEPARATOR . '.htaccess', $rules, LOCK_EX) !== false;
}

function modelPreviewRateFile(string $scope, string $key): string
{
    return sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'x3d-model-' . preg_replace('/[^a-z0-9_-]/i', '', $scope)
        . '-' . hash('sha256', $key) . '.json';
}

function modelPreviewConsumeRateSlot(string $scope, string $key, int $limit, int $window): bool
{
    $path = modelPreviewRateFile($scope, $key);
    $handle = @fopen($path, 'c+');
    if ($handle === false) return false;
    if (!flock($handle, LOCK_EX)) {
        fclose($handle);
        return false;
    }
    $raw = stream_get_contents($handle);
    $stored = json_decode((string) $raw, true);
    $now = time();
    $attempts = is_array($stored)
        ? array_values(array_filter($stored, static fn($stamp): bool => is_int($stamp) && $stamp > $now - $window))
        : [];
    $allowed = count($attempts) < $limit;
    if ($allowed) $attempts[] = $now;
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, (string) json_encode($attempts));
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
    return $allowed;
}

function modelPreviewClearRateLimit(string $scope, string $key): void
{
    @unlink(modelPreviewRateFile($scope, $key));
}

function modelPreviewDeleteDirectory(string $directory): void
{
    $root = realpath(modelPreviewRoot());
    $resolved = realpath($directory);
    if ($root === false || $resolved === false || !str_starts_with($resolved, $root . DIRECTORY_SEPARATOR)) {
        return;
    }
    $entries = scandir($resolved);
    if (is_array($entries)) {
        foreach ($entries as $entry) {
            if ($entry === '.' || $entry === '..') continue;
            $path = $resolved . DIRECTORY_SEPARATOR . $entry;
            if (is_dir($path)) modelPreviewDeleteDirectory($path);
            else @unlink($path);
        }
    }
    @rmdir($resolved);
}

function modelPreviewManifest(string $directory): ?array
{
    $path = $directory . DIRECTORY_SEPARATOR . 'manifest.json';
    if (!is_file($path)) return null;
    $decoded = json_decode((string) file_get_contents($path), true);
    return is_array($decoded) ? $decoded : null;
}

function modelPreviewAtomicWriteJson(string $path, array $payload): bool
{
    $encoded = json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($encoded === false) return false;
    $temporary = $path . '.tmp-' . bin2hex(random_bytes(6));
    if (@file_put_contents($temporary, $encoded, LOCK_EX) === false) {
        @unlink($temporary);
        return false;
    }
    if (!@rename($temporary, $path)) {
        @unlink($temporary);
        return false;
    }
    return true;
}

function modelPreviewState(string $directory): array
{
    $path = $directory . DIRECTORY_SEPARATOR . 'state.json';
    if (!is_file($path)) return [];
    $decoded = json_decode((string) @file_get_contents($path), true);
    return is_array($decoded) ? $decoded : [];
}

function modelPreviewWriteState(string $directory, array $state): bool
{
    return modelPreviewAtomicWriteJson($directory . DIRECTORY_SEPARATOR . 'state.json', $state);
}

function modelPreviewUpdateState(string $directory, callable $mutator): ?array
{
    $lock = @fopen($directory . DIRECTORY_SEPARATOR . '.state.lock', 'c+');
    if ($lock === false || !flock($lock, LOCK_EX)) {
        if (is_resource($lock)) fclose($lock);
        return null;
    }
    $state = modelPreviewState($directory);
    $updated = $mutator($state);
    $success = is_array($updated) && modelPreviewWriteState($directory, $updated);
    flock($lock, LOCK_UN);
    fclose($lock);
    return $success ? $updated : null;
}

function modelPreviewIsRevoked(array $state): bool
{
    return trim((string) ($state['revokedAt'] ?? '')) !== '';
}

function modelPreviewRecordView(string $directory, array $state): array
{
    $lastViewed = strtotime((string) ($state['lastViewedAt'] ?? ''));
    if ($lastViewed !== false && $lastViewed > time() - 300) return $state;
    $updated = modelPreviewUpdateState($directory, static function (array $current): array {
        $lastViewed = strtotime((string) ($current['lastViewedAt'] ?? ''));
        if ($lastViewed === false || $lastViewed <= time() - 300) $current['lastViewedAt'] = gmdate('c');
        return $current;
    });
    return $updated ?? $state;
}

function modelPreviewIsExpired(array $manifest, ?int $now = null): bool
{
    $expiresAt = strtotime((string) ($manifest['expiresAt'] ?? ''));
    return $expiresAt !== false && $expiresAt <= ($now ?? time());
}

function modelPreviewCleanupExpired(): int
{
    $root = modelPreviewRoot();
    if (!is_dir($root)) return 0;
    $deleted = 0;
    $entries = scandir($root);
    if (!is_array($entries)) return 0;
    foreach ($entries as $id) {
        if (!modelPreviewValidId($id)) continue;
        $directory = $root . DIRECTORY_SEPARATOR . $id;
        if (!is_dir($directory)) continue;
        $manifest = modelPreviewManifest($directory);
        if ($manifest !== null && modelPreviewIsExpired($manifest)) {
            modelPreviewDeleteDirectory($directory);
            $deleted++;
        } elseif ($manifest === null && filemtime($directory) < time() - 86400) {
            modelPreviewDeleteDirectory($directory);
        }
    }
    $uploadsRoot = $root . DIRECTORY_SEPARATOR . '.uploads';
    if (is_dir($uploadsRoot)) {
        foreach ((array) scandir($uploadsRoot) as $uploadId) {
            if (preg_match('/^[a-f0-9]{32}$/', (string) $uploadId) !== 1) continue;
            $uploadDirectory = $uploadsRoot . DIRECTORY_SEPARATOR . $uploadId;
            if (is_dir($uploadDirectory) && filemtime($uploadDirectory) < time() - 7200) {
                modelPreviewDeleteDirectory($uploadDirectory);
            }
        }
    }
    return $deleted;
}

function modelPreviewJson(int $status, array $payload): void
{
    http_response_code($status);
    modelPreviewSecurityHeaders();
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Robots-Tag: noindex, nofollow, noarchive');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
