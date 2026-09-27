<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/model-preview-common.php';

function respond(int $status, array $payload): void {
    http_response_code($status);
    modelPreviewSecurityHeaders();
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function cleanLine(string $value, int $max): string {
    $value = str_replace(["\r", "\n"], ' ', trim($value));
    return mb_substr($value, 0, $max);
}

function encodeHeader(string $value): string {
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

function fromAddress(string $header): ?string {
    if (preg_match('/<([^>]+)>/', $header, $matches)) {
        return filter_var($matches[1], FILTER_VALIDATE_EMAIL) ? $matches[1] : null;
    }
    return filter_var($header, FILTER_VALIDATE_EMAIL) ? $header : null;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['success' => false, 'error' => 'Method not allowed']);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength < 1 || $contentLength > 8192) {
    respond(413, ['success' => false, 'error' => 'Het verzoek is ongeldig of te groot.']);
}
$fetchSite = strtolower((string) ($_SERVER['HTTP_SEC_FETCH_SITE'] ?? ''));
if ($fetchSite !== '' && !in_array($fetchSite, ['same-origin', 'none'], true)) {
    respond(403, ['success' => false, 'error' => 'Dit verzoek mag alleen vanaf de previewpagina worden verstuurd.']);
}

if (trim((string)($_POST['website'] ?? '')) !== '') {
    respond(200, ['success' => true]);
}

$id = strtolower(cleanLine((string)($_POST['id'] ?? ''), 64));
$revisionId = strtolower(cleanLine((string)($_POST['revisionId'] ?? ''), 64));
$action = cleanLine((string)($_POST['action'] ?? ''), 16);
$name = cleanLine((string)($_POST['name'] ?? ''), 80);
$emailRaw = cleanLine((string)($_POST['email'] ?? ''), 160);
$comment = mb_substr(trim((string)($_POST['comment'] ?? '')), 0, 1500);

if (!preg_match('/^[a-z0-9][a-z0-9_-]{7,63}$/', $id)) {
    respond(400, ['success' => false, 'error' => 'Ongeldige previewlink.']);
}
if (!preg_match('/^[a-z0-9][a-z0-9_-]{7,63}$/', $revisionId)) {
    respond(400, ['success' => false, 'error' => 'De revisie ontbreekt of is ongeldig. Vernieuw de pagina.']);
}
if (!in_array($action, ['approve', 'changes'], true)) {
    respond(400, ['success' => false, 'error' => 'Ongeldige keuze.']);
}
if ($name === '') {
    respond(400, ['success' => false, 'error' => 'Vul je naam in.']);
}
if ($action === 'changes' && $comment === '') {
    respond(400, ['success' => false, 'error' => 'Beschrijf kort wat er aangepast moet worden.']);
}

$email = '';
if ($emailRaw !== '') {
    $email = filter_var($emailRaw, FILTER_SANITIZE_EMAIL);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        respond(400, ['success' => false, 'error' => 'Vul een geldig e-mailadres in.']);
    }
}

$directory = modelPreviewRoot() . DIRECTORY_SEPARATOR . $id;
$manifestPath = $directory . DIRECTORY_SEPARATOR . 'manifest.json';
if (!is_file($manifestPath)) {
    respond(404, ['success' => false, 'error' => 'Deze modelpreview bestaat niet meer.']);
}

$manifestRaw = file_get_contents($manifestPath);
$manifest = $manifestRaw !== false ? json_decode($manifestRaw, true) : null;
if (!is_array($manifest)) {
    respond(500, ['success' => false, 'error' => 'De previewgegevens konden niet worden gelezen.']);
}
if (modelPreviewIsExpired($manifest)) {
    modelPreviewDeleteDirectory(dirname($manifestPath));
    respond(410, ['success' => false, 'error' => 'Deze modelpreview is verlopen.']);
}
$manifestRevisionId = modelPreviewValidId((string) ($manifest['revisionId'] ?? ''))
    ? (string) $manifest['revisionId']
    : $id;
if (!hash_equals($manifestRevisionId, $revisionId)) {
    respond(409, ['success' => false, 'error' => 'Deze beslissing hoort niet bij de geopende revisie. Vernieuw de pagina.']);
}
// Maximaal tien reacties per uur per IP-adres om het publieke formulier rustig te houden.
$ip = cleanLine((string)($_SERVER['REMOTE_ADDR'] ?? 'unknown'), 64);
if (!modelPreviewConsumeRateSlot('approval', $ip, 10, 3600)) {
    respond(429, ['success' => false, 'error' => 'Te veel reacties. Probeer later opnieuw.']);
}

$title = cleanLine((string)($manifest['title'] ?? '3D-ontwerp'), 160);
$version = cleanLine((string)($manifest['version'] ?? '-'), 40);
$client = cleanLine((string)($manifest['client'] ?? ''), 120);
$decision = $action === 'approve' ? 'GOEDGEKEURD' : 'WIJZIGING GEVRAAGD';
$previewUrl = 'https://www.x3dprints.be/model-preview/?id=' . rawurlencode($id);

$subject = encodeHeader("[Modelpreview] {$decision} - {$title}");
$body = implode("\n", [
    "Beslissing: {$decision}",
    "Project: {$title}",
    "Versie: {$version}",
    "Klant in preview: " . ($client !== '' ? $client : '-'),
    "Reactie van: {$name}",
    "E-mail: " . ($email !== '' ? $email : '-'),
    "Preview: {$previewUrl}",
    '',
    'Opmerking:',
    $comment !== '' ? $comment : '-',
]);

$stateResult = 'saved';
$updatedState = modelPreviewUpdateState($directory, static function (array $current) use (
    &$stateResult,
    $action,
    $name,
    $email,
    $comment,
    $manifestRevisionId
): array {
    if (modelPreviewIsRevoked($current)) {
        $stateResult = 'revoked';
        return $current;
    }
    $existing = (string) ($current['decision'] ?? '');
    if ($existing !== '') {
        $stateResult = hash_equals($existing, $action) ? 'already' : 'conflict';
        return $current;
    }
    $current['decision'] = $action;
    $current['decisionAt'] = gmdate('c');
    $current['decisionName'] = $name;
    $current['decisionEmail'] = $email !== '' ? $email : null;
    $current['decisionComment'] = $comment !== '' ? $comment : null;
    $current['decisionRevisionId'] = $manifestRevisionId;
    return $current;
});
if ($updatedState === null) {
    respond(500, ['success' => false, 'error' => 'Uw beslissing kon niet veilig worden bewaard. Probeer opnieuw.']);
}
if ($stateResult === 'revoked') {
    respond(410, ['success' => false, 'error' => 'Deze previewlink is ingetrokken. Vraag X3DPrints om een nieuwe link.']);
}
if ($stateResult === 'already') {
    respond(200, ['success' => true, 'decision' => $action, 'alreadyRecorded' => true]);
}
if ($stateResult === 'conflict') {
    respond(409, ['success' => false, 'error' => 'Voor deze revisie is al een beslissing geregistreerd. Vraag een nieuwe versie aan voor verdere wijzigingen.']);
}

$to = cleanLine((string)(getenv('MAIL_TO') ?: 'michael@xinudesign.be'), 160);
$from = cleanLine((string)(getenv('MAIL_FROM') ?: 'X3DPrints <michael@xinudesign.be>'), 200);
$headers = [
    "From: {$from}",
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];
if ($email !== '') $headers[] = "Reply-To: {$email}";

$sent = false;
$envelopeFrom = fromAddress($from);
if ($envelopeFrom !== null) {
    $sent = @mail($to, $subject, $body, implode("\r\n", $headers), "-f {$envelopeFrom}");
}
if (!$sent) {
    $sent = @mail($to, $subject, $body, implode("\r\n", $headers));
}
if (!$sent) {
    respond(200, [
        'success' => true,
        'decision' => $action,
        'notified' => false,
        'warning' => 'Uw beslissing is bewaard, maar de e-mailmelding aan X3DPrints kon niet worden verstuurd.',
    ]);
}

respond(200, ['success' => true, 'decision' => $action, 'notified' => true]);
