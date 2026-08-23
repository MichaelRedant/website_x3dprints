<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function x3dRespond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    x3dRespond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

$configFile = __DIR__ . '/contact-config.php';
if (!is_file($configFile)) {
    x3dRespond(503, ['ok' => false, 'error' => 'CRM automation unavailable']);
}

$config = require $configFile;
if (!is_array($config)) {
    x3dRespond(503, ['ok' => false, 'error' => 'CRM automation unavailable']);
}

$apiBaseUrl = rtrim(trim((string) ($config['espoApiBaseUrl'] ?? '')), '/');
$apiKey = trim((string) ($config['espoApiKey'] ?? ''));
$webhookId = trim((string) ($config['espoEmailWebhookId'] ?? ''));
$webhookSecret = trim((string) ($config['espoEmailWebhookSecret'] ?? ''));
if (
    $apiBaseUrl !== 'https://crm.x3dprints.be/api/v1' ||
    $apiKey === '' ||
    $webhookId === '' ||
    $webhookSecret === ''
) {
    x3dRespond(503, ['ok' => false, 'error' => 'CRM automation unavailable']);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 1048576) {
    x3dRespond(413, ['ok' => false, 'error' => 'Payload too large']);
}

$rawPayload = file_get_contents('php://input');
if (!is_string($rawPayload) || $rawPayload === '') {
    x3dRespond(400, ['ok' => false, 'error' => 'Empty payload']);
}

$providedSignature = trim((string) ($_SERVER['HTTP_SIGNATURE'] ?? ''));
$expectedSignature = base64_encode($webhookId . ':' . hash_hmac('sha256', $rawPayload, $webhookSecret));
if ($providedSignature === '' || !hash_equals($expectedSignature, $providedSignature)) {
    x3dRespond(401, ['ok' => false, 'error' => 'Invalid signature']);
}

$records = json_decode($rawPayload, true);
if (!is_array($records) || !array_is_list($records) || count($records) > 50) {
    x3dRespond(400, ['ok' => false, 'error' => 'Invalid payload']);
}

function x3dLower(string $value): string
{
    return mb_strtolower($value, 'UTF-8');
}

function x3dCleanText(string $value, int $maxLength = 10000): string
{
    $value = html_entity_decode(strip_tags($value), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $value = preg_replace('/\r\n?|\x{2028}|\x{2029}/u', "\n", $value) ?? $value;
    $value = preg_replace('/[\t ]+/u', ' ', $value) ?? $value;
    $value = preg_replace('/\n{3,}/u', "\n\n", $value) ?? $value;
    return mb_substr(trim($value), 0, $maxLength, 'UTF-8');
}

function x3dExtractAddress(mixed $value): string
{
    if (is_array($value)) {
        foreach ($value as $item) {
            $address = x3dExtractAddress($item);
            if ($address !== '') {
                return $address;
            }
        }
        return '';
    }

    $value = trim((string) $value);
    if (preg_match('/<([^>]+)>/', $value, $matches) === 1) {
        $value = trim($matches[1]);
    }
    $value = filter_var($value, FILTER_SANITIZE_EMAIL);
    return filter_var($value, FILTER_VALIDATE_EMAIL) ? x3dLower($value) : '';
}

function x3dOwnOrAutomatedSender(string $email): bool
{
    $localPart = x3dLower((string) strstr($email, '@', true));
    $domain = x3dLower((string) substr(strrchr($email, '@') ?: '', 1));
    if (in_array($domain, ['x3dprints.be', 'www.x3dprints.be', 'xinudesign.be'], true)) {
        return true;
    }

    foreach (['mailer-daemon', 'postmaster', 'no-reply', 'noreply', 'do-not-reply', 'donotreply'] as $blocked) {
        if (str_contains($localPart, $blocked)) {
            return true;
        }
    }
    return false;
}

function x3dIsAutomatedMessage(array $record, string $subject, string $body): bool
{
    if (($record['isAutoReply'] ?? false) === true) {
        return true;
    }

    $haystack = x3dLower($subject . "\n" . mb_substr($body, 0, 1200, 'UTF-8'));
    $patterns = [
        '/\b(out of office|automatic reply|auto-?reply|afwezigheidsbericht|automatisch antwoord)\b/u',
        '/\b(delivery status notification|undeliverable|mail delivery failed|failure notice)\b/u',
        '/\b(unsubscribe|uitschrijven)\b/u',
    ];
    foreach ($patterns as $pattern) {
        if (preg_match($pattern, $haystack) === 1) {
            return true;
        }
    }
    return false;
}

function x3dInquiryScore(string $subject, string $body, bool $hasAttachment): int
{
    $haystack = x3dLower($subject . "\n" . mb_substr($body, 0, 6000, 'UTF-8'));

    $vendorSpam = [
        '/\b(guest post|backlink|domain authority|seo service|web design service)\b/u',
        '/\b(outsourc(?:e|ing)|development team|virtual assistant|lead generation service)\b/u',
        '/\b(crypto|forex|casino|investment opportunity)\b/u',
    ];
    foreach ($vendorSpam as $pattern) {
        if (preg_match($pattern, $haystack) === 1 && preg_match('/\b(3d|stl|step|prototype|printen|scannen)\b/u', $haystack) !== 1) {
            return -10;
        }
    }

    $score = $hasAttachment ? 1 : 0;
    $groups = [
        3 => [
            '/\b(offerte|prijsopgave|aanvraag|quotation|quote|estimate)\b/u',
            '/\b3d[\s-]*(print(?:en|ing)?|scan(?:nen|ning)?|modell?er(?:en|ing))\b/u',
        ],
        2 => [
            '/\b(stl|step|stp|3mf|obj|cad)\b/u',
            '/\b(printen|geprint|prototype|onderdeel|reserveonderdeel|maquette|miniatuur|buste|personenscan)\b/u',
        ],
        1 => [
            '/\b(prijs|kost|kosten|price|cost|deadline|levertermijn|delivery time)\b/u',
            '/\b(is het mogelijk|kan (u|je)|kunnen jullie|would like|could you|interested in)\b/u',
        ],
    ];
    foreach ($groups as $points => $patterns) {
        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $haystack) === 1) {
                $score += $points;
            }
        }
    }

    if (preg_match('/^(re|fw|fwd|antw):/iu', trim($subject)) === 1 && $score < 3) {
        $score--;
    }
    return $score;
}

function x3dApiRequest(string $method, string $path, ?array $payload = null): array
{
    global $apiBaseUrl, $apiKey;

    $url = $apiBaseUrl . '/' . ltrim($path, '/');
    $body = $payload === null ? null : json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($payload !== null && $body === false) {
        throw new RuntimeException('Unable to encode CRM payload.');
    }

    $headers = [
        'Accept: application/json',
        'Content-Type: application/json',
        'X-Api-Key: ' . $apiKey,
    ];
    if (function_exists('curl_init')) {
        $curl = curl_init($url);
        if ($curl === false) {
            throw new RuntimeException('Unable to initialize CRM request.');
        }
        curl_setopt_array($curl, [
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => 4,
            CURLOPT_TIMEOUT => 9,
        ]);
        if ($body !== null) {
            curl_setopt($curl, CURLOPT_POSTFIELDS, $body);
        }

        $response = curl_exec($curl);
        $status = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
        $error = curl_errno($curl);
        curl_close($curl);
        if ($response === false || $error !== 0 || $status < 200 || $status >= 300) {
            throw new RuntimeException('CRM request failed with status ' . $status . '.');
        }
    } else {
        $context = stream_context_create([
            'http' => [
                'method' => $method,
                'header' => implode("\r\n", $headers) . "\r\n",
                'content' => $body ?? '',
                'timeout' => 9,
                'ignore_errors' => true,
            ],
        ]);
        $response = @file_get_contents($url, false, $context);
        $statusLine = $http_response_header[0] ?? '';
        preg_match('/\s(\d{3})\s/', $statusLine, $statusMatch);
        $status = (int) ($statusMatch[1] ?? 0);
        if ($response === false || $status < 200 || $status >= 300) {
            throw new RuntimeException('CRM request failed with status ' . $status . '.');
        }
    }

    if ($response === '' || $status === 204) {
        return [];
    }
    $decoded = json_decode($response, true);
    if (!is_array($decoded)) {
        throw new RuntimeException('CRM returned an invalid response.');
    }
    return $decoded;
}

function x3dSearchOne(string $entityType, string $email): ?array
{
    $search = [
        'select' => ['id', 'name', 'emailAddress', 'accountId', 'stage', 'createdAt'],
        'maxSize' => 1,
        'where' => [[
            'type' => 'equals',
            'attribute' => 'emailAddress',
            'value' => $email,
        ]],
    ];
    $path = $entityType . '?searchParams=' . rawurlencode((string) json_encode($search));
    $result = x3dApiRequest('GET', $path);
    $first = $result['list'][0] ?? null;
    return is_array($first) ? $first : null;
}

function x3dFindActiveProject(string $accountId): ?array
{
    if ($accountId === '') {
        return null;
    }
    $search = [
        'select' => ['id', 'name', 'stage', 'accountId', 'createdAt'],
        'maxSize' => 10,
        'orderBy' => 'createdAt',
        'order' => 'desc',
        'where' => [[
            'type' => 'equals',
            'attribute' => 'accountId',
            'value' => $accountId,
        ]],
    ];
    $path = 'Opportunity?searchParams=' . rawurlencode((string) json_encode($search));
    $result = x3dApiRequest('GET', $path);
    foreach (($result['list'] ?? []) as $project) {
        if (!is_array($project)) {
            continue;
        }
        $stage = (string) ($project['stage'] ?? '');
        if (!in_array($stage, ['Closed Won', 'Closed Lost'], true)) {
            return $project;
        }
    }
    return null;
}

function x3dSplitName(string $displayName, string $email): array
{
    $displayName = trim(preg_replace('/[<>"\']/', '', $displayName) ?? '');
    if ($displayName === '' || filter_var($displayName, FILTER_VALIDATE_EMAIL)) {
        $displayName = str_replace(['.', '_', '-'], ' ', (string) strstr($email, '@', true));
    }
    $parts = preg_split('/\s+/u', trim($displayName)) ?: [];
    $parts = array_values(array_filter($parts, static fn(string $part): bool => $part !== ''));
    if (count($parts) <= 1) {
        return ['', mb_substr($parts[0] ?? 'Onbekend', 0, 80, 'UTF-8')];
    }
    $firstName = mb_substr((string) array_shift($parts), 0, 80, 'UTF-8');
    return [$firstName, mb_substr(implode(' ', $parts), 0, 100, 'UTF-8')];
}

function x3dLeadDescription(array $record, string $email, string $subject, string $body): string
{
    $lines = [
        'Aanvraag via directe e-mail',
        '',
        'X3DImport-compatibel e-mailadres: ' . $email,
        'Onderwerp: ' . ($subject !== '' ? $subject : '(geen onderwerp)'),
        'Ontvangen: ' . ((string) ($record['dateSent'] ?? $record['createdAt'] ?? 'onbekend')),
        'Espo e-mail-ID: ' . ((string) ($record['id'] ?? '')),
        '',
        'Origineel bericht:',
        $body !== '' ? $body : '(geen tekstinhoud)',
    ];
    return mb_substr(implode("\n", $lines), 0, 12000, 'UTF-8');
}

function x3dLinkEmail(string $emailId, string $parentType, string $parentId): void
{
    x3dApiRequest('PUT', 'Email/' . rawurlencode($emailId), [
        'parentType' => $parentType,
        'parentId' => $parentId,
    ]);
}

$stats = [
    'received' => count($records),
    'linkedProject' => 0,
    'linkedKnown' => 0,
    'linkedLead' => 0,
    'createdLead' => 0,
    'skipped' => 0,
];

try {
    foreach ($records as $record) {
        if (!is_array($record)) {
            $stats['skipped']++;
            continue;
        }
        $emailId = trim((string) ($record['id'] ?? ''));
        $status = trim((string) ($record['status'] ?? ''));
        if ($emailId === '' || $status !== 'Archived' || !empty($record['parentId'])) {
            $stats['skipped']++;
            continue;
        }

        $fromAddress = x3dExtractAddress($record['fromAddress'] ?? $record['from'] ?? '');
        if ($fromAddress === '' || x3dOwnOrAutomatedSender($fromAddress)) {
            $stats['skipped']++;
            continue;
        }

        $subject = x3dCleanText((string) ($record['name'] ?? ''), 240);
        $body = x3dCleanText((string) ($record['bodyPlain'] ?? $record['body'] ?? ''), 10000);
        if (x3dIsAutomatedMessage($record, $subject, $body)) {
            $stats['skipped']++;
            continue;
        }

        $contact = x3dSearchOne('Contact', $fromAddress);
        if ($contact !== null) {
            $project = x3dFindActiveProject((string) ($contact['accountId'] ?? ''));
            if ($project !== null) {
                x3dLinkEmail($emailId, 'Opportunity', (string) $project['id']);
                $stats['linkedProject']++;
            } else {
                x3dLinkEmail($emailId, 'Contact', (string) $contact['id']);
                $stats['linkedKnown']++;
            }
            continue;
        }

        $account = x3dSearchOne('Account', $fromAddress);
        if ($account !== null) {
            $project = x3dFindActiveProject((string) ($account['id'] ?? ''));
            if ($project !== null) {
                x3dLinkEmail($emailId, 'Opportunity', (string) $project['id']);
                $stats['linkedProject']++;
            } else {
                x3dLinkEmail($emailId, 'Account', (string) $account['id']);
                $stats['linkedKnown']++;
            }
            continue;
        }

        $lead = x3dSearchOne('Lead', $fromAddress);
        if ($lead !== null) {
            x3dLinkEmail($emailId, 'Lead', (string) $lead['id']);
            $stats['linkedLead']++;
            continue;
        }

        $hasAttachment = (bool) ($record['hasAttachment'] ?? false);
        if (x3dInquiryScore($subject, $body, $hasAttachment) < 2) {
            $stats['skipped']++;
            continue;
        }

        [$firstName, $lastName] = x3dSplitName((string) ($record['fromName'] ?? ''), $fromAddress);
        $newLead = x3dApiRequest('POST', 'Lead', [
            'firstName' => $firstName !== '' ? $firstName : null,
            'lastName' => $lastName,
            'emailAddress' => $fromAddress,
            'status' => 'New',
            'source' => 'Email',
            'description' => x3dLeadDescription($record, $fromAddress, $subject, $body),
        ]);
        $leadId = trim((string) ($newLead['id'] ?? ''));
        if ($leadId === '') {
            throw new RuntimeException('CRM did not return a lead ID.');
        }
        x3dLinkEmail($emailId, 'Lead', $leadId);
        $stats['createdLead']++;
    }
} catch (Throwable $error) {
    error_log('[x3d-email-lead] ' . $error->getMessage());
    x3dRespond(503, ['ok' => false, 'error' => 'CRM temporarily unavailable']);
}

x3dRespond(200, ['ok' => true, 'stats' => $stats]);
