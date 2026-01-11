<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
mb_language('uni');
mb_internal_encoding('UTF-8');

function respond(int $status, array $data): void {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['success' => false, 'error' => 'Method not allowed']);
}

// Honeypot veld (hp of website) blokkeert bots stilletjes
$hp = trim((string)($_POST['hp'] ?? ''));
$website = trim((string)($_POST['website'] ?? ''));
if ($hp !== '' || $website !== '') {
    respond(200, ['success' => true]);
}

function clamp(string $value, int $max): string {
    return mb_substr($value, 0, $max);
}

function cleanLine(string $value): string {
    return str_replace(["\r", "\n"], ' ', trim($value));
}

function sanitize(string $value, int $max): string {
    return clamp(cleanLine($value), $max);
}

function parseFromAddress(string $from): ?string {
    $plain = trim($from);
    if (strpos($plain, '<') !== false && preg_match('/<([^>]+)>/', $plain, $matches)) {
        $plain = $matches[1];
    }
    $plain = cleanLine($plain);
    return filter_var($plain, FILTER_VALIDATE_EMAIL) ? $plain : null;
}

$name = sanitize((string)($_POST['name'] ?? ''), 80);
$emailRaw = cleanLine((string)($_POST['email'] ?? ''));
$email = filter_var($emailRaw, FILTER_SANITIZE_EMAIL);
$message = clamp(trim((string)($_POST['message'] ?? '')), 3000);
$quantity = sanitize((string)($_POST['quantity'] ?? ''), 20);
$material = sanitize((string)($_POST['material'] ?? ''), 60);
$quote = trim((string)($_POST['quote'] ?? ''));
$quote = $quote !== '' ? clamp($quote, 800) : '';

if ($name === '' || $email === '' || $message === '') {
    respond(400, ['success' => false, 'error' => 'Naam, e-mail en bericht zijn verplicht.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, ['success' => false, 'error' => 'Ongeldig e-mailadres.']);
}

// Hard target: verzenden naar michael@xinudesign.be (override via MAIL_TO indien echt nodig)
$to = cleanLine(getenv('MAIL_TO') ?: 'michael@xinudesign.be');
$fromHeader = cleanLine(getenv('MAIL_FROM') ?: 'michael@xinudesign.be');

// Admin subject
$subjectParts = array_filter(['[Contact]', $material !== '' ? $material : null, $name]);
$subject = encodeHeader(implode(' ', $subjectParts));

// Tekstversie (geen HTML nodig voor deliverability)
$textLines = [
    "Naam: {$name}",
    "E-mail: {$email}",
    "Aantal: " . ($quantity !== '' ? $quantity : '-'),
    "Materiaal: " . ($material !== '' ? $material : '-'),
];
if ($quote !== '') {
    $textLines[] = "Indicatieve schatting:";
    $textLines[] = $quote;
}
$textLines[] = '';
$textLines[] = 'Bericht:';
$textLines[] = $message;
$textBody = implode("\n", $textLines);

// Bevestigingsmail (plaintext voor deliverability)
$confirmSubject = encodeHeader('We hebben je aanvraag ontvangen');
$confirmText = "Hey {$name},\n\nBedankt voor je bericht! We bekijken je aanvraag en sturen snel een reactie met prijs en timing.\n\nSamenvatting:\n- Materiaal: ".($material !== '' ? $material : '-')."\n- Aantal: ".($quantity !== '' ? $quantity : '-')."\n\nJe bericht:\n{$message}\n\nGroeten,\nMichael - X3DPrints";

function encodeHeader(string $text): string {
    if (function_exists('mb_encode_mimeheader')) {
        return mb_encode_mimeheader($text, 'UTF-8', 'B');
    }
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

function sendTextMail(string $to, string $subject, string $body, string $replyTo, string $fromHeader): bool {
    $headers = "From: {$fromHeader}\r\n";
    if ($replyTo !== '') {
        $headers .= "Reply-To: {$replyTo}\r\n";
    }
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

    $envelopeFrom = parseFromAddress($fromHeader) ?: null;
    if ($envelopeFrom) {
        ini_set('sendmail_from', $envelopeFrom);
    }

    return $envelopeFrom
        ? mail($to, $subject, $body, $headers, "-f {$envelopeFrom}")
        : mail($to, $subject, $body, $headers);
}

// Stuur altijd adminmail; bevestiging proberen maar admin heeft prioriteit
$adminSent = sendTextMail($to, $subject, $textBody, $email, $fromHeader);
$confirmSent = $email ? sendTextMail($email, $confirmSubject, $confirmText, $to, $fromHeader) : false;

if ($adminSent) {
    respond(200, ['success' => true, 'confirmationSent' => $confirmSent]);
}

respond(500, ['success' => false, 'error' => 'Versturen mislukt. Probeer later opnieuw.']);
