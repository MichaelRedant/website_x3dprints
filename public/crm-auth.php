<?php
declare(strict_types=1);

require_once __DIR__ . '/crm-common.php';

function crmPasswordIsValid(string $input): bool
{
    $hash = trim((string) (getenv('CRM_PASSWORD_HASH') ?: ''));
    if ($hash === '') {
        return false;
    }
    return password_verify($input, $hash);
}

function crmConfigReady(): bool
{
    $hash = trim((string) (getenv('CRM_PASSWORD_HASH') ?: ''));
    return $hash !== '';
}

function clearCrmSession(): void
{
    crmSessionStart();
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params['path'] ?? '/',
            $params['domain'] ?? '',
            (bool) ($params['secure'] ?? false),
            (bool) ($params['httponly'] ?? true),
        );
    }
    session_destroy();
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if (!crmConfigReady()) {
    crmRespond(500, ['ok' => false, 'error' => 'CRM auth is not configured']);
}

if ($method === 'GET') {
    crmRespond(200, ['ok' => true, 'authed' => crmIsAuthenticated()]);
}

if ($method === 'DELETE') {
    clearCrmSession();
    crmRespond(200, ['ok' => true, 'authed' => false]);
}

if ($method !== 'POST') {
    crmRespond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

crmSessionStart();
$now = time();
$attemptWindow = 15 * 60;
$maxAttempts = 8;

$firstAttempt = (int) ($_SESSION['crm_login_first_attempt'] ?? 0);
$attempts = (int) ($_SESSION['crm_login_attempts'] ?? 0);

if ($firstAttempt > 0 && ($now - $firstAttempt) > $attemptWindow) {
    $firstAttempt = 0;
    $attempts = 0;
}

if ($attempts >= $maxAttempts) {
    crmRespond(429, ['ok' => false, 'error' => 'Too many attempts, try again later']);
}

$raw = file_get_contents('php://input');
$payload = json_decode((string) $raw, true);
$password = trim((string) ($payload['password'] ?? ''));

if ($password === '') {
    crmRespond(400, ['ok' => false, 'error' => 'Password is required']);
}

if (!crmPasswordIsValid($password)) {
    if ($firstAttempt === 0) {
        $firstAttempt = $now;
    }
    $_SESSION['crm_login_first_attempt'] = $firstAttempt;
    $_SESSION['crm_login_attempts'] = $attempts + 1;
    crmRespond(401, ['ok' => false, 'error' => 'Invalid credentials']);
}

session_regenerate_id(true);
$_SESSION['crm_auth'] = true;
unset($_SESSION['crm_login_first_attempt'], $_SESSION['crm_login_attempts']);

crmRespond(200, ['ok' => true, 'authed' => true]);
