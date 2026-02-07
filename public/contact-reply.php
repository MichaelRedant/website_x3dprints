<?php
declare(strict_types=1);

require_once __DIR__ . '/crm-common.php';

mb_language('uni');
mb_internal_encoding('UTF-8');

crmRequireAuth();

$dataFile = crmDataPath('contact-replies.json');

function parseFromAddress(string $from): ?string
{
    $plain = trim($from);
    if (strpos($plain, '<') !== false && preg_match('/<([^>]+)>/', $plain, $matches)) {
        $plain = $matches[1];
    }
    $plain = str_replace(["\r", "\n"], ' ', $plain);
    return filter_var($plain, FILTER_VALIDATE_EMAIL) ? $plain : null;
}

function sendMultipartMail(string $to, string $subject, string $textBody, string $htmlBody, string $replyTo, string $fromHeader): bool
{
    $boundary = 'b' . bin2hex(random_bytes(12));
    $headers = "From: {$fromHeader}\r\n";
    if ($replyTo !== '') {
        $headers .= "Reply-To: {$replyTo}\r\n";
    }
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/alternative; boundary=\"{$boundary}\"\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

    $body = "--{$boundary}\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $textBody . "\r\n";
    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $htmlBody . "\r\n";
    $body .= "--{$boundary}--";

    $envelopeFrom = parseFromAddress($fromHeader) ?: null;
    if ($envelopeFrom) {
        ini_set('sendmail_from', $envelopeFrom);
        if (@mail($to, $subject, $body, $headers, "-f {$envelopeFrom}")) {
            return true;
        }
    }
    return @mail($to, $subject, $body, $headers);
}

function saveReply(array $entry, string $file): void
{
    $existing = crmReadJsonFile($file);
    array_unshift($existing, $entry);
    if (count($existing) > 300) {
        $existing = array_slice($existing, 0, 300);
    }
    crmWriteJsonFile($file, $existing);
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    crmRespond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

$raw = file_get_contents('php://input');
$data = json_decode((string) $raw, true);
if (!is_array($data)) {
    crmRespond(400, ['ok' => false, 'error' => 'Invalid JSON']);
}

$to = filter_var(trim((string) ($data['to'] ?? '')), FILTER_SANITIZE_EMAIL);
$subject = trim((string) ($data['subject'] ?? ''));
$html = trim((string) ($data['html'] ?? ''));
$text = trim((string) ($data['text'] ?? ''));

if ($to === '' || !filter_var($to, FILTER_VALIDATE_EMAIL) || $subject === '' || ($html === '' && $text === '')) {
    crmRespond(400, ['ok' => false, 'error' => 'to, subject and body are required']);
}

$fromHeader = getenv('MAIL_FROM') ?: 'X3DPrints <michael@xinudesign.be>';
$replyTo = getenv('MAIL_REPLY_TO') ?: $fromHeader;

$sent = sendMultipartMail($to, $subject, $text ?: $html, $html ?: nl2br($text), $replyTo, $fromHeader);

$entry = [
    'ts' => date('c'),
    'to' => $to,
    'subject' => $subject,
    'html' => $html,
    'text' => $text,
    'sent' => $sent,
];
saveReply($entry, $dataFile);

if ($sent) {
    crmRespond(200, ['ok' => true]);
}

crmRespond(500, ['ok' => false, 'error' => 'Send failed']);

