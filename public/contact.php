<?php
declare(strict_types=1);

require_once __DIR__ . '/crm-common.php';

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
$requestContext = sanitize((string)($_POST['requestContext'] ?? ''), 120);
$source = sanitize((string)($_POST['source'] ?? ''), 40);
$localeRaw = strtolower(sanitize((string)($_POST['locale'] ?? ''), 8));
$locale = $localeRaw === 'en' ? 'en' : 'nl';

if ($name === '' || $email === '' || $message === '') {
    respond(400, ['success' => false, 'error' => 'Naam, e-mail en bericht zijn verplicht.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, ['success' => false, 'error' => 'Ongeldig e-mailadres.']);
}

// Hard target: verzenden naar michael@xinudesign.be (override via MAIL_TO indien echt nodig)
$to = cleanLine(getenv('MAIL_TO') ?: 'michael@xinudesign.be');
$fromHeader = cleanLine(getenv('MAIL_FROM') ?: 'X3DPrints <michael@xinudesign.be>');

// Admin subject
$subjectParts = array_filter([
    '[Contact]',
    $source === 'shop' ? 'Shop' : null,
    $requestContext !== '' ? $requestContext : null,
    $material !== '' ? $material : null,
    $name,
]);
$subject = encodeHeader(implode(' ', $subjectParts));

// Tekstversie (geen HTML nodig voor deliverability)
$textLines = [
    "Naam: {$name}",
    "E-mail: {$email}",
    "Aantal: " . ($quantity !== '' ? $quantity : '-'),
    "Materiaal: " . ($material !== '' ? $material : '-'),
    "Product/context: " . ($requestContext !== '' ? $requestContext : '-'),
    "Bron: " . ($source !== '' ? $source : '-'),
];
if ($quote !== '') {
    $textLines[] = "Indicatieve schatting:";
    $textLines[] = $quote;
}
$textLines[] = '';
$textLines[] = 'Bericht:';
$textLines[] = $message;
$textBody = implode("\n", $textLines);

// Bevestigingsmail (multipart: tekst + lichte HTML met inline styles)
$confirmation = x3dBuildCustomerConfirmation([
    'name' => $name,
    'message' => $message,
    'quantity' => $quantity,
    'material' => $material,
    'requestContext' => $requestContext,
    'locale' => $locale,
]);
$confirmSubject = encodeHeader($confirmation['subject']);
$confirmText = $confirmation['text'];
$confirmHtml = $confirmation['html'];
$vacationAutoReply = $confirmation['vacationAutoReply'];

function x3dVacationAutoReplyActive(): bool {
    $tz = new DateTimeZone('Europe/Brussels');
    $now = new DateTimeImmutable('now', $tz);
    $start = new DateTimeImmutable('2026-08-12 00:00:00', $tz);
    $end = new DateTimeImmutable('2026-08-21 00:00:00', $tz);
    return $now >= $start && $now < $end;
}

function x3dHtml(string $value): string {
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function x3dNl2brEscaped(string $value): string {
    return nl2br(x3dHtml($value), false);
}

function x3dBuildConfirmationHtml(string $lang, string $title, string $intro, ?string $badge, array $payload, string $signoffHtml, ?string $ps = null): string {
    $labels = $lang === 'en'
        ? [
            'product' => 'Product/context',
            'material' => 'Material',
            'quantity' => 'Quantity',
            'message' => 'Your message',
        ]
        : [
            'product' => 'Product/context',
            'material' => 'Materiaal',
            'quantity' => 'Aantal',
            'message' => 'Je bericht',
        ];

    $badgeRow = $badge !== null
        ? '<tr><td style="padding-top:14px;"><span style="display:inline-block;border-radius:999px;background:rgba(14,165,233,0.14);border:1px solid rgba(125,211,252,0.35);color:#bae6fd;font-size:12px;font-weight:700;padding:7px 10px;">'.x3dHtml($badge).'</span></td></tr>'
        : '';
    $psRow = $ps !== null
        ? '<tr><td style="padding-top:10px;font-size:12px;color:#94a3b8;">'.x3dHtml($ps).'</td></tr>'
        : '';

    return '<!doctype html><html lang="'.x3dHtml($lang).'"><head><meta charset="UTF-8"><title>'.x3dHtml($title).'</title></head><body style="margin:0;padding:0;background:#0b1224;font-family:Segoe UI,Arial,sans-serif;color:#e5e7eb;">'
        . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:radial-gradient(140% 120% at 50% 0%, rgba(99,102,241,0.12), rgba(11,18,36,1));padding:24px 12px;">'
        . '<tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:linear-gradient(150deg, rgba(17,24,39,0.94), rgba(15,23,42,0.96));border:1px solid rgba(148,163,184,0.18);border-radius:16px;padding:22px;box-shadow:0 16px 50px rgba(0,0,0,0.25);">'
        . '<tr><td style="font-size:14px;letter-spacing:0.3px;color:#a5b4fc;font-weight:600;">X3DPrints</td></tr>'
        . '<tr><td style="padding-top:6px;"><div style="font-size:22px;font-weight:800;color:#f8fafc;line-height:1.25;">'.x3dHtml($title).'</div></td></tr>'
        . $badgeRow
        . '<tr><td style="padding-top:12px;font-size:14px;color:#cbd5e1;line-height:1.6;">'.x3dHtml($intro).'</td></tr>'
        . '<tr><td style="padding-top:18px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0 8px;">'
        . '<tr><td width="140" style="color:#94a3b8;font-size:13px;">'.$labels['product'].'</td><td style="color:#e2e8f0;font-size:14px;font-weight:600;">'.x3dHtml($payload['requestContext'] !== '' ? $payload['requestContext'] : '-').'</td></tr>'
        . '<tr><td width="140" style="color:#94a3b8;font-size:13px;">'.$labels['material'].'</td><td style="color:#e2e8f0;font-size:14px;font-weight:600;">'.x3dHtml($payload['material'] !== '' ? $payload['material'] : '-').'</td></tr>'
        . '<tr><td width="140" style="color:#94a3b8;font-size:13px;">'.$labels['quantity'].'</td><td style="color:#e2e8f0;font-size:14px;">'.x3dHtml($payload['quantity'] !== '' ? $payload['quantity'] : '-').'</td></tr>'
        . '<tr><td width="140" style="color:#94a3b8;font-size:13px;vertical-align:top;padding-top:6px;">'.$labels['message'].'</td><td style="padding-top:6px;"><div style="background:#0f172a;border:1px solid rgba(148,163,184,0.25);border-radius:10px;padding:12px 14px;color:#e2e8f0;font-size:14px;line-height:1.55;">'.x3dNl2brEscaped($payload['message']).'</div></td></tr>'
        . '</table></td></tr>'
        . '<tr><td style="padding-top:18px;font-size:14px;color:#cbd5e1;">'.$signoffHtml.'</td></tr>'
        . $psRow
        . '</table></td></tr></table></body></html>';
}

function x3dBuildCustomerConfirmation(array $payload): array {
    $product = $payload['requestContext'] !== '' ? $payload['requestContext'] : '-';
    $materialValue = $payload['material'] !== '' ? $payload['material'] : '-';
    $quantityValue = $payload['quantity'] !== '' ? $payload['quantity'] : '-';
    $isVacation = x3dVacationAutoReplyActive();

    if ($payload['locale'] === 'en') {
        if ($isVacation) {
            $subject = 'Your request was received - limited follow-up until 20/08';
            $text = "Hi {$payload['name']},\n\n"
                . "Thanks for your message. Your request was received.\n\n"
                . "I am on holiday from 12 August through 20 August 2026. New requests will therefore be followed up a little slower than usual. From 21 August I will pick requests back up and come back with pricing, timing or extra questions.\n\n"
                . "Summary:\n- Product/context: {$product}\n- Material: {$materialValue}\n- Quantity: {$quantityValue}\n\n"
                . "Your message:\n{$payload['message']}\n\n"
                . "If you have extra info, photos, STL/STEP files or a deadline in the meantime, feel free to reply to this email so everything is grouped together when I review your request.\n\n"
                . "Talk soon,\nMichael from X3DPrints";

            return [
                'subject' => $subject,
                'text' => $text,
                'html' => x3dBuildConfirmationHtml(
                    'en',
                    'Your request was received',
                    'I am on holiday from 12 August through 20 August 2026. New requests will be followed up a little slower than usual. From 21 August I will pick requests back up and come back with pricing, timing or extra questions.',
                    'Holiday mode: 12/08 - 20/08',
                    $payload,
                    'Talk soon,<br>Michael from X3DPrints'
                ),
                'vacationAutoReply' => true,
            ];
        }

        $subject = 'We received your request';
        $text = "Hi {$payload['name']},\n\n"
            . "Thanks for your message. We will review your request and send a concrete reply with pricing and timing soon.\n\n"
            . "Summary:\n- Product/context: {$product}\n- Material: {$materialValue}\n- Quantity: {$quantityValue}\n\n"
            . "Your message:\n{$payload['message']}\n\n"
            . "Talk soon,\nMichael from X3DPrints";

        return [
            'subject' => $subject,
            'text' => $text,
            'html' => x3dBuildConfirmationHtml(
                'en',
                'Thanks for your request',
                'We will review your request and send a concrete proposal with pricing and timing soon. Here is the summary.',
                null,
                $payload,
                'Talk soon,<br>Michael from X3DPrints'
            ),
            'vacationAutoReply' => false,
        ];
    }

    if ($isVacation) {
        $subject = 'Je aanvraag is ontvangen - beperkte opvolging t.e.m. 20/08';
        $text = "Hey {$payload['name']},\n\n"
            . "Bedankt voor je bericht! Je aanvraag is goed ontvangen.\n\n"
            . "Ik ben met vakantie van 12 augustus t.e.m. 20 augustus 2026. Daardoor worden nieuwe aanvragen iets trager opgevolgd dan gewoonlijk. Vanaf 21 augustus neem ik de aanvragen opnieuw verder op en kom ik terug met prijs, timing of bijkomende vragen.\n\n"
            . "Samenvatting:\n- Product/context: {$product}\n- Materiaal: {$materialValue}\n- Aantal: {$quantityValue}\n\n"
            . "Je bericht:\n{$payload['message']}\n\n"
            . "Heb je intussen extra info, foto's, STL/STEP-bestanden of een deadline? Antwoord gerust op deze mail, dan zit alles meteen samen wanneer ik je aanvraag bekijk.\n\n"
            . "Tot snel,\nMichael van X3DPrints";

        return [
            'subject' => $subject,
            'text' => $text,
            'html' => x3dBuildConfirmationHtml(
                'nl',
                'Je aanvraag is ontvangen',
                'Ik ben met vakantie van 12 augustus t.e.m. 20 augustus 2026. Daardoor worden nieuwe aanvragen iets trager opgevolgd dan gewoonlijk. Vanaf 21 augustus neem ik de aanvragen opnieuw verder op en kom ik terug met prijs, timing of bijkomende vragen.',
                'Vakantiemodus: 12/08 - 20/08',
                $payload,
                'Tot snel,<br>Michael van X3DPrints'
            ),
            'vacationAutoReply' => true,
        ];
    }

    $subject = 'We hebben je aanvraag ontvangen';
    $text = "Hey {$payload['name']},\n\n"
        . "Bedankt voor je bericht! We bekijken je aanvraag en sturen snel een reactie met prijs en timing.\n\n"
        . "Samenvatting:\n- Product/context: {$product}\n- Materiaal: {$materialValue}\n- Aantal: {$quantityValue}\n\n"
        . "Je bericht:\n{$payload['message']}\n\n"
        . "Tot snel,\nMichael van X3DPrints\n\n"
        . "P.S. Geen stress als je bestand 'final_v3_definitief.stl' heet, dat zien we wel vaker ;)";

    return [
        'subject' => $subject,
        'text' => $text,
        'html' => x3dBuildConfirmationHtml(
            'nl',
            'Bedankt voor je aanvraag',
            'We bekijken je vraag en sturen snel een concreet voorstel met prijs en timing. Hieronder de samenvatting.',
            null,
            $payload,
            'Tot snel,<br>Michael van X3DPrints',
            'P.S. Geen stress als je bestand "final_v3_definitief.stl" heet, dat zien we wel vaker ;)'
        ),
        'vacationAutoReply' => false,
    ];
}

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
        // probeer met envelope -f; bij falen fallback zonder -f (sommige hosts blokkeren dit)
        if (@mail($to, $subject, $body, $headers, "-f {$envelopeFrom}")) {
            return true;
        }
    }
    return @mail($to, $subject, $body, $headers);
}

function sendMultipartMail(string $to, string $subject, string $textBody, string $htmlBody, string $replyTo, string $fromHeader): bool {
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

function saveLog(array $entry): void {
    $file = crmDataPath('contact-log.json');
    $existing = crmReadJsonFile($file);
    array_unshift($existing, $entry);
    if (count($existing) > 1000) {
        $existing = array_slice($existing, 0, 1000);
    }
    crmWriteJsonFile($file, $existing);
}

// Stuur altijd adminmail; bevestiging proberen maar admin heeft prioriteit
$adminSent = sendTextMail($to, $subject, $textBody, $email, $fromHeader);
$confirmSent = $email ? sendMultipartMail($email, $confirmSubject, $confirmText, $confirmHtml, $to, $fromHeader) : false;

// Log de poging lokaal voor fallback/CRM
$logEntry = [
    'ts' => date('c'),
    'name' => $name,
    'email' => $email,
    'message' => $message,
    'quantity' => $quantity,
    'material' => $material,
    'quote' => $quote,
    'requestContext' => $requestContext,
    'source' => $source,
    'adminSent' => $adminSent,
    'confirmSent' => $confirmSent,
    'vacationAutoReply' => $vacationAutoReply,
    'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
    'ua' => $_SERVER['HTTP_USER_AGENT'] ?? '',
];
saveLog($logEntry);

if ($adminSent) {
    respond(200, ['success' => true, 'confirmationSent' => $confirmSent]);
}

respond(500, ['success' => false, 'error' => 'Versturen mislukt. Probeer later opnieuw.']);
