<?php
declare(strict_types=1);

require_once __DIR__ . '/model-preview-common.php';

const MODEL_PREVIEW_CHUNK_BYTES = 1048576;
const MODEL_PREVIEW_MAX_BYTES = 262144000;
const MODEL_PREVIEW_MAX_ACTIVE_UPLOADS = 3;
const MODEL_PREVIEW_MAX_ACTIVE_PREVIEWS = 200;
const MODEL_PREVIEW_DISK_RESERVE_BYTES = 104857600;

modelPreviewSessionStart();
if (!modelPreviewIsAuthenticated()) modelPreviewJson(401, ['ok' => false, 'error' => 'Log eerst in.']);

$csrf = (string) ($_SESSION['model_preview_csrf'] ?? '');
if ($csrf === '') {
    $csrf = bin2hex(random_bytes(24));
    $_SESSION['model_preview_csrf'] = $csrf;
}

function modelPreviewRequireCsrf(): void
{
    $expected = (string) ($_SESSION['model_preview_csrf'] ?? '');
    $received = (string) ($_SERVER['HTTP_X_CSRF_TOKEN'] ?? '');
    if ($expected === '' || $received === '' || !hash_equals($expected, $received)) {
        modelPreviewJson(403, ['ok' => false, 'error' => 'Beveiligingscontrole mislukt. Vernieuw de pagina.']);
    }
}

function modelPreviewBody(): array
{
    $contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
    if ($contentLength > 32768) modelPreviewJson(413, ['ok' => false, 'error' => 'Het verzoek is te groot.']);
    $stream = fopen('php://input', 'rb');
    if ($stream === false) return [];
    $raw = stream_get_contents($stream, 32769);
    fclose($stream);
    if ($raw === false || strlen($raw) > 32768) {
        modelPreviewJson(413, ['ok' => false, 'error' => 'Het verzoek is te groot.']);
    }
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function modelPreviewClean(string $value, int $max): string
{
    return mb_substr(trim(str_replace(["\r", "\n"], ' ', $value)), 0, $max);
}

function modelPreviewUploadOwner(): string
{
    return hash('sha256', session_id());
}

function modelPreviewUploadsRoot(): string
{
    return modelPreviewRoot() . DIRECTORY_SEPARATOR . '.uploads';
}

function modelPreviewUploadDirectory(string $uploadId): string
{
    return modelPreviewUploadsRoot() . DIRECTORY_SEPARATOR . $uploadId;
}

function modelPreviewLoadUpload(string $uploadId): ?array
{
    if (preg_match('/^[a-f0-9]{32}$/', $uploadId) !== 1) return null;
    $path = modelPreviewUploadDirectory($uploadId) . DIRECTORY_SEPARATOR . 'upload.json';
    if (!is_file($path)) return null;
    $decoded = json_decode((string) @file_get_contents($path), true);
    if (!is_array($decoded) || !hash_equals((string) ($decoded['owner'] ?? ''), modelPreviewUploadOwner())) return null;
    if (!modelPreviewValidId((string) ($decoded['id'] ?? ''))) return null;
    if (!modelPreviewValidId((string) ($decoded['projectId'] ?? ''))) return null;
    if (!in_array((string) ($decoded['format'] ?? ''), ['stl', 'obj', 'glb'], true)) return null;
    $size = (int) ($decoded['size'] ?? 0);
    $expectedChunks = (int) ($decoded['expectedChunks'] ?? 0);
    if ($size < 1 || $size > MODEL_PREVIEW_MAX_BYTES) return null;
    if ($expectedChunks !== (int) ceil($size / MODEL_PREVIEW_CHUNK_BYTES)) return null;
    return $decoded;
}

function modelPreviewCountActiveUploads(): int
{
    $root = modelPreviewUploadsRoot();
    if (!is_dir($root)) return 0;
    $owner = modelPreviewUploadOwner();
    $count = 0;
    foreach ((array) scandir($root) as $uploadId) {
        if (preg_match('/^[a-f0-9]{32}$/', (string) $uploadId) !== 1) continue;
        $decoded = json_decode((string) @file_get_contents($root . DIRECTORY_SEPARATOR . $uploadId . DIRECTORY_SEPARATOR . 'upload.json'), true);
        if (is_array($decoded) && hash_equals((string) ($decoded['owner'] ?? ''), $owner)) $count++;
    }
    return $count;
}

function modelPreviewList(): array
{
    $items = [];
    $root = modelPreviewRoot();
    if (!is_dir($root)) return $items;
    foreach ((array) scandir($root) as $id) {
        if (!modelPreviewValidId((string) $id)) continue;
        $directory = $root . DIRECTORY_SEPARATOR . $id;
        $manifest = modelPreviewManifest($directory);
        if ($manifest === null) continue;
        $state = modelPreviewState($directory);
        $file = basename((string) ($manifest['file'] ?? ''));
        $path = $directory . DIRECTORY_SEPARATOR . $file;
        $items[] = [
            'id' => $id,
            'projectId' => modelPreviewValidId((string) ($manifest['projectId'] ?? '')) ? (string) $manifest['projectId'] : $id,
            'revisionId' => modelPreviewValidId((string) ($manifest['revisionId'] ?? '')) ? (string) $manifest['revisionId'] : $id,
            'title' => (string) ($manifest['title'] ?? '3D-ontwerp'),
            'client' => (string) ($manifest['client'] ?? ''),
            'clientEmail' => (string) ($manifest['clientEmail'] ?? ''),
            'version' => (string) ($manifest['version'] ?? 'V1'),
            'unit' => (string) ($manifest['unit'] ?? 'mm'),
            'note' => (string) ($manifest['note'] ?? ''),
            'createdAt' => (string) ($manifest['createdAt'] ?? ''),
            'expiresAt' => (string) ($manifest['expiresAt'] ?? ''),
            'size' => is_file($path) ? filesize($path) : 0,
            'lastViewedAt' => (string) ($state['lastViewedAt'] ?? ''),
            'decision' => (string) ($state['decision'] ?? ''),
            'decisionAt' => (string) ($state['decisionAt'] ?? ''),
            'decisionName' => (string) ($state['decisionName'] ?? ''),
            'revokedAt' => (string) ($state['revokedAt'] ?? ''),
        ];
    }
    usort($items, static fn(array $a, array $b): int => strcmp($b['createdAt'], $a['createdAt']));
    return $items;
}

function modelPreviewContainsExternalUri(mixed $value, string $key = ''): bool
{
    if (is_array($value)) {
        foreach ($value as $childKey => $childValue) {
            if (modelPreviewContainsExternalUri($childValue, (string) $childKey)) return true;
        }
        return false;
    }
    if (!is_string($value) || strtolower($key) !== 'uri') return false;
    return !str_starts_with(strtolower(trim($value)), 'data:');
}

function modelPreviewValidateModel(string $path, string $format): bool
{
    $size = filesize($path);
    if ($size === false || $size < 1) return false;
    $handle = fopen($path, 'rb');
    if ($handle === false) return false;

    if ($format === 'glb') {
        $header = fread($handle, 12);
        if ($header === false || strlen($header) !== 12) {
            fclose($handle);
            return false;
        }
        $parsed = unpack('a4magic/Vversion/Vlength', $header);
        if (!is_array($parsed)
            || ($parsed['magic'] ?? '') !== 'glTF'
            || (int) ($parsed['version'] ?? 0) !== 2
            || (int) ($parsed['length'] ?? 0) !== $size) {
            fclose($handle);
            return false;
        }
        $chunkHeader = fread($handle, 8);
        if ($chunkHeader === false || strlen($chunkHeader) !== 8) {
            fclose($handle);
            return false;
        }
        $chunk = unpack('Vlength/Vtype', $chunkHeader);
        $jsonLength = (int) ($chunk['length'] ?? 0);
        if ((int) ($chunk['type'] ?? 0) !== 0x4E4F534A || $jsonLength < 2 || $jsonLength > 16777216 || $jsonLength > $size - 20) {
            fclose($handle);
            return false;
        }
        $jsonRaw = fread($handle, $jsonLength);
        fclose($handle);
        if ($jsonRaw === false || strlen($jsonRaw) !== $jsonLength) return false;
        $json = json_decode(rtrim($jsonRaw, " \t\r\n\0"), true);
        return is_array($json) && !modelPreviewContainsExternalUri($json);
    }

    if ($format === 'stl') {
        $header = fread($handle, 84);
        if ($header !== false && strlen($header) === 84) {
            $triangleData = unpack('Vcount', substr($header, 80, 4));
            $triangleCount = (int) ($triangleData['count'] ?? -1);
            if ($triangleCount >= 0 && 84 + ($triangleCount * 50) === $size) {
                fclose($handle);
                return true;
            }
        }
        rewind($handle);
        $sample = fread($handle, min($size, 1048576));
        fclose($handle);
        return is_string($sample)
            && strpos($sample, "\0") === false
            && preg_match('/^\s*solid\b/i', $sample) === 1
            && preg_match('/\bfacet\s+normal\b/i', $sample) === 1;
    }

    if ($format === 'obj') {
        $sample = fread($handle, min($size, 2097152));
        fclose($handle);
        return is_string($sample)
            && strpos($sample, "\0") === false
            && preg_match('/^\s*v\s+[-+0-9.eE]+\s+[-+0-9.eE]+\s+[-+0-9.eE]+/m', $sample) === 1
            && preg_match('/^\s*f\s+\S+\s+\S+\s+\S+/m', $sample) === 1;
    }

    fclose($handle);
    return false;
}

function modelPreviewAbortUpload(string $directory, int $status, string $message): void
{
    modelPreviewDeleteDirectory($directory);
    modelPreviewJson($status, ['ok' => false, 'error' => $message]);
}

function modelPreviewMailHeader(string $value): string
{
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

function modelPreviewEnvelopeAddress(string $header): ?string
{
    if (preg_match('/<([^>]+)>/', $header, $matches)) {
        return filter_var($matches[1], FILTER_VALIDATE_EMAIL) ? $matches[1] : null;
    }
    return filter_var($header, FILTER_VALIDATE_EMAIL) ? $header : null;
}

function modelPreviewSendLink(string $email, array $manifest, string $id): bool
{
    $title = modelPreviewClean((string) ($manifest['title'] ?? '3D-ontwerp'), 160);
    $version = modelPreviewClean((string) ($manifest['version'] ?? 'V1'), 40);
    $url = 'https://www.x3dprints.be/model-preview/?id=' . rawurlencode($id);
    $subject = modelPreviewMailHeader("3D-ontwerp bekijken: {$title} {$version}");
    $body = implode("\n", [
        'Beste,',
        '',
        "Via onderstaande privélink kunt u {$title} ({$version}) interactief bekijken, de buitenmaten controleren en het ontwerp goedkeuren of een wijziging vragen:",
        '',
        $url,
        '',
        'De link is persoonlijk. Deel hem alleen met personen die het ontwerp mogen bekijken.',
        '',
        'Met vriendelijke groeten,',
        'Michaël',
        'X3DPrints',
    ]);
    $from = modelPreviewClean((string) (getenv('MAIL_FROM') ?: 'X3DPrints <michael@xinudesign.be>'), 200);
    $headers = [
        "From: {$from}",
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ];
    $envelope = modelPreviewEnvelopeAddress($from);
    if ($envelope !== null && @mail($email, $subject, $body, implode("\r\n", $headers), "-f {$envelope}")) return true;
    return @mail($email, $subject, $body, implode("\r\n", $headers));
}

$method = (string) ($_SERVER['REQUEST_METHOD'] ?? 'GET');
$action = strtolower((string) ($_GET['action'] ?? 'list'));
modelPreviewCleanupExpired();

if ($method === 'GET') {
    modelPreviewJson(200, ['ok' => true, 'csrf' => $csrf, 'items' => modelPreviewList()]);
}
if ($method !== 'POST') modelPreviewJson(405, ['ok' => false, 'error' => 'Method not allowed']);
modelPreviewRequireCsrf();

if ($action === 'start') {
    $body = modelPreviewBody();
    $title = modelPreviewClean((string) ($body['title'] ?? ''), 160);
    $client = modelPreviewClean((string) ($body['client'] ?? ''), 120);
    $clientEmail = modelPreviewClean((string) ($body['clientEmail'] ?? ''), 160);
    $version = modelPreviewClean((string) ($body['version'] ?? 'V1'), 40);
    $projectId = strtolower(modelPreviewClean((string) ($body['projectId'] ?? ''), 64));
    $note = mb_substr(trim((string) ($body['note'] ?? '')), 0, 1000);
    $format = strtolower(modelPreviewClean((string) ($body['format'] ?? ''), 8));
    $unit = strtolower(modelPreviewClean((string) ($body['unit'] ?? 'mm'), 4));
    $days = max(1, min(90, (int) ($body['days'] ?? 14)));
    $size = (int) ($body['size'] ?? 0);
    if ($title === '') modelPreviewJson(400, ['ok' => false, 'error' => 'Vul een projectnaam in.']);
    if ($clientEmail !== '' && !filter_var($clientEmail, FILTER_VALIDATE_EMAIL)) modelPreviewJson(400, ['ok' => false, 'error' => 'Vul een geldig klant-e-mailadres in.']);
    if ($projectId !== '' && !modelPreviewValidId($projectId)) modelPreviewJson(400, ['ok' => false, 'error' => 'Ongeldig project.']);
    if (!in_array($format, ['stl', 'obj', 'glb'], true)) modelPreviewJson(400, ['ok' => false, 'error' => 'Dit bestandsformaat wordt niet ondersteund.']);
    if (!in_array($unit, ['mm', 'cm', 'm'], true)) modelPreviewJson(400, ['ok' => false, 'error' => 'Ongeldige maateenheid.']);
    if ($size < 1 || $size > MODEL_PREVIEW_MAX_BYTES) modelPreviewJson(400, ['ok' => false, 'error' => 'Het model mag maximaal 250 MB groot zijn.']);
    if (count(modelPreviewList()) >= MODEL_PREVIEW_MAX_ACTIVE_PREVIEWS) {
        modelPreviewJson(409, ['ok' => false, 'error' => 'Er staan te veel actieve previews. Verwijder eerst een oude preview.']);
    }
    if (modelPreviewCountActiveUploads() >= MODEL_PREVIEW_MAX_ACTIVE_UPLOADS) {
        modelPreviewJson(429, ['ok' => false, 'error' => 'Er zijn al meerdere uploads bezig. Rond die eerst af of probeer later opnieuw.']);
    }

    $uploadsRoot = modelPreviewUploadsRoot();
    if (!modelPreviewProtectDirectory($uploadsRoot)) {
        modelPreviewJson(500, ['ok' => false, 'error' => 'De beveiligde uploadmap kon niet worden gemaakt.']);
    }
    $freeSpace = @disk_free_space(modelPreviewRoot());
    if (is_float($freeSpace) && $freeSpace < $size + MODEL_PREVIEW_DISK_RESERVE_BYTES) {
        modelPreviewJson(507, ['ok' => false, 'error' => 'Er is onvoldoende vrije opslagruimte voor deze preview.']);
    }

    $id = bin2hex(random_bytes(16));
    if ($projectId === '') $projectId = bin2hex(random_bytes(16));
    $uploadId = bin2hex(random_bytes(16));
    $uploadDirectory = modelPreviewUploadDirectory($uploadId);
    if (!modelPreviewProtectDirectory($uploadDirectory)) {
        modelPreviewJson(500, ['ok' => false, 'error' => 'De beveiligde uploadsessie kon niet worden gemaakt.']);
    }
    $metadata = [
        'id' => $id,
        'projectId' => $projectId,
        'owner' => modelPreviewUploadOwner(),
        'title' => $title,
        'client' => $client,
        'clientEmail' => $clientEmail,
        'version' => $version ?: 'V1',
        'note' => $note,
        'format' => $format,
        'unit' => $unit,
        'days' => $days,
        'size' => $size,
        'expectedChunks' => (int) ceil($size / MODEL_PREVIEW_CHUNK_BYTES),
        'createdAt' => gmdate('c'),
    ];
    $encoded = json_encode($metadata, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($encoded === false || file_put_contents($uploadDirectory . DIRECTORY_SEPARATOR . 'upload.json', $encoded, LOCK_EX) === false) {
        modelPreviewAbortUpload($uploadDirectory, 500, 'De uploadsessie kon niet worden bewaard.');
    }
    modelPreviewJson(200, ['ok' => true, 'uploadId' => $uploadId]);
}

if ($action === 'chunk') {
    $uploadId = strtolower((string) ($_GET['uploadId'] ?? ''));
    $indexRaw = (string) ($_GET['index'] ?? '');
    if (preg_match('/^[a-f0-9]{32}$/', $uploadId) !== 1 || preg_match('/^\d+$/', $indexRaw) !== 1) {
        modelPreviewJson(400, ['ok' => false, 'error' => 'Ongeldig uploaddeel.']);
    }
    $index = (int) $indexRaw;
    $metadata = modelPreviewLoadUpload($uploadId);
    if ($metadata === null) modelPreviewJson(404, ['ok' => false, 'error' => 'Uploadsessie verlopen of ongeldig.']);
    $expectedChunks = (int) $metadata['expectedChunks'];
    if ($index >= $expectedChunks) modelPreviewJson(400, ['ok' => false, 'error' => 'Ongeldig uploaddeel.']);

    $expectedBytes = $index === $expectedChunks - 1
        ? (int) $metadata['size'] - ($index * MODEL_PREVIEW_CHUNK_BYTES)
        : MODEL_PREVIEW_CHUNK_BYTES;
    $contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
    if ($contentLength > 0 && $contentLength !== $expectedBytes) {
        modelPreviewJson(400, ['ok' => false, 'error' => 'Uploaddeel heeft een ongeldige grootte.']);
    }
    $stream = fopen('php://input', 'rb');
    $chunk = $stream !== false ? stream_get_contents($stream, $expectedBytes + 1) : false;
    if ($stream !== false) fclose($stream);
    if ($chunk === false || strlen($chunk) !== $expectedBytes) {
        modelPreviewJson(400, ['ok' => false, 'error' => 'Uploaddeel is onvolledig of te groot.']);
    }

    $directory = modelPreviewUploadDirectory($uploadId);
    $path = $directory . DIRECTORY_SEPARATOR . sprintf('chunk-%05d.part', $index);
    if (file_put_contents($path, $chunk, LOCK_EX) !== $expectedBytes) {
        modelPreviewJson(500, ['ok' => false, 'error' => 'Uploaddeel kon niet volledig worden bewaard.']);
    }
    @touch($directory);
    modelPreviewJson(200, ['ok' => true]);
}

if ($action === 'finish') {
    $body = modelPreviewBody();
    $uploadId = strtolower((string) ($body['uploadId'] ?? ''));
    $count = (int) ($body['chunks'] ?? 0);
    $metadata = modelPreviewLoadUpload($uploadId);
    if ($metadata === null) modelPreviewJson(404, ['ok' => false, 'error' => 'Uploadsessie verlopen of ongeldig.']);
    if ($count !== (int) $metadata['expectedChunks']) {
        modelPreviewJson(400, ['ok' => false, 'error' => 'Het aantal uploaddelen klopt niet.']);
    }

    $uploadDirectory = modelPreviewUploadDirectory($uploadId);
    $id = (string) $metadata['id'];
    $directory = modelPreviewRoot() . DIRECTORY_SEPARATOR . $id;
    if (!modelPreviewProtectDirectory($directory)) {
        modelPreviewAbortUpload($uploadDirectory, 500, 'De beveiligde previewmap kon niet worden gemaakt.');
    }
    $fileName = 'model.' . $metadata['format'];
    $partialPath = $directory . DIRECTORY_SEPARATOR . $fileName . '.partial';
    $finalPath = $directory . DIRECTORY_SEPARATOR . $fileName;
    $target = fopen($partialPath, 'xb');
    if ($target === false) {
        modelPreviewDeleteDirectory($directory);
        modelPreviewAbortUpload($uploadDirectory, 500, 'Modelbestand kon niet veilig worden gemaakt.');
    }

    $written = 0;
    for ($index = 0; $index < $count; $index++) {
        $chunkPath = $uploadDirectory . DIRECTORY_SEPARATOR . sprintf('chunk-%05d.part', $index);
        $expectedBytes = $index === $count - 1
            ? (int) $metadata['size'] - ($index * MODEL_PREVIEW_CHUNK_BYTES)
            : MODEL_PREVIEW_CHUNK_BYTES;
        if (!is_file($chunkPath) || filesize($chunkPath) !== $expectedBytes) {
            fclose($target);
            modelPreviewDeleteDirectory($directory);
            modelPreviewAbortUpload($uploadDirectory, 400, 'Niet alle uploaddelen zijn correct ontvangen.');
        }
        $source = fopen($chunkPath, 'rb');
        $copied = $source !== false ? stream_copy_to_stream($source, $target) : false;
        if ($source !== false) fclose($source);
        if ($copied !== $expectedBytes) {
            fclose($target);
            modelPreviewDeleteDirectory($directory);
            modelPreviewAbortUpload($uploadDirectory, 500, 'Het model kon niet volledig worden samengesteld.');
        }
        $written += $copied;
    }
    if (!fflush($target)) {
        fclose($target);
        modelPreviewDeleteDirectory($directory);
        modelPreviewAbortUpload($uploadDirectory, 500, 'Het model kon niet veilig worden opgeslagen.');
    }
    fclose($target);

    if ($written !== (int) $metadata['size'] || filesize($partialPath) !== (int) $metadata['size']) {
        modelPreviewDeleteDirectory($directory);
        modelPreviewAbortUpload($uploadDirectory, 400, 'Het ontvangen bestand is niet volledig. Probeer opnieuw.');
    }
    if (!modelPreviewValidateModel($partialPath, (string) $metadata['format'])) {
        modelPreviewDeleteDirectory($directory);
        modelPreviewAbortUpload($uploadDirectory, 400, 'De inhoud is geen geldig 3D-bestand van het gekozen type.');
    }
    if (!@rename($partialPath, $finalPath)) {
        modelPreviewDeleteDirectory($directory);
        modelPreviewAbortUpload($uploadDirectory, 500, 'Het model kon niet worden geactiveerd.');
    }

    try {
        $created = new DateTimeImmutable((string) $metadata['createdAt']);
    } catch (Throwable) {
        modelPreviewDeleteDirectory($directory);
        modelPreviewAbortUpload($uploadDirectory, 500, 'De uploadgegevens zijn beschadigd.');
    }
    $manifest = [
        'projectId' => $metadata['projectId'],
        'revisionId' => $id,
        'title' => $metadata['title'],
        'client' => $metadata['client'] ?: null,
        'clientEmail' => $metadata['clientEmail'] ?: null,
        'version' => $metadata['version'],
        'unit' => $metadata['unit'],
        'note' => $metadata['note'] ?: null,
        'createdAt' => $created->format(DATE_ATOM),
        'expiresAt' => $created->modify('+' . (int) $metadata['days'] . ' days')->format(DATE_ATOM),
        'file' => $fileName,
        'format' => $metadata['format'],
        'size' => (int) $metadata['size'],
    ];
    if (!modelPreviewAtomicWriteJson($directory . DIRECTORY_SEPARATOR . 'manifest.json', $manifest)) {
        modelPreviewDeleteDirectory($directory);
        modelPreviewAbortUpload($uploadDirectory, 500, 'De previewgegevens konden niet worden bewaard.');
    }
    if (!modelPreviewWriteState($directory, [
        'lastViewedAt' => null,
        'decision' => null,
        'decisionAt' => null,
        'decisionName' => null,
        'decisionEmail' => null,
        'decisionComment' => null,
        'decisionRevisionId' => null,
        'revokedAt' => null,
    ])) {
        modelPreviewDeleteDirectory($directory);
        modelPreviewAbortUpload($uploadDirectory, 500, 'De revisiestatus kon niet worden bewaard.');
    }
    modelPreviewDeleteDirectory($uploadDirectory);
    modelPreviewJson(200, ['ok' => true, 'id' => $id, 'url' => 'https://www.x3dprints.be/model-preview/?id=' . $id]);
}

if ($action === 'cancel') {
    $body = modelPreviewBody();
    $uploadId = strtolower((string) ($body['uploadId'] ?? ''));
    if (modelPreviewLoadUpload($uploadId) === null) {
        modelPreviewJson(404, ['ok' => false, 'error' => 'Uploadsessie verlopen of ongeldig.']);
    }
    modelPreviewDeleteDirectory(modelPreviewUploadDirectory($uploadId));
    modelPreviewJson(200, ['ok' => true]);
}

if (in_array($action, ['extend', 'revoke', 'reactivate', 'resend'], true)) {
    $body = modelPreviewBody();
    $id = strtolower((string) ($body['id'] ?? ''));
    if (!modelPreviewValidId($id)) modelPreviewJson(400, ['ok' => false, 'error' => 'Ongeldige preview.']);
    $directory = modelPreviewRoot() . DIRECTORY_SEPARATOR . $id;
    $manifest = modelPreviewManifest($directory);
    if ($manifest === null) modelPreviewJson(404, ['ok' => false, 'error' => 'Deze revisie bestaat niet meer.']);
    $state = modelPreviewState($directory);

    if ($action === 'extend') {
        $days = max(1, min(90, (int) ($body['days'] ?? 14)));
        $currentExpiry = strtotime((string) ($manifest['expiresAt'] ?? ''));
        $base = max(time(), $currentExpiry !== false ? $currentExpiry : time());
        $manifest['expiresAt'] = gmdate('c', $base + ($days * 86400));
        if (!modelPreviewAtomicWriteJson($directory . DIRECTORY_SEPARATOR . 'manifest.json', $manifest)) {
            modelPreviewJson(500, ['ok' => false, 'error' => 'De vervaldatum kon niet worden aangepast.']);
        }
        modelPreviewJson(200, ['ok' => true, 'expiresAt' => $manifest['expiresAt']]);
    }

    if ($action === 'revoke' || $action === 'reactivate') {
        $updated = modelPreviewUpdateState($directory, static function (array $current) use ($action): array {
            $current['revokedAt'] = $action === 'revoke' ? gmdate('c') : null;
            return $current;
        });
        if ($updated === null) {
            modelPreviewJson(500, ['ok' => false, 'error' => 'De linkstatus kon niet worden aangepast.']);
        }
        modelPreviewJson(200, ['ok' => true]);
    }

    if (modelPreviewIsRevoked($state)) {
        modelPreviewJson(409, ['ok' => false, 'error' => 'Deze link is ingetrokken. Activeer hem opnieuw voor u hem verstuurt.']);
    }
    $email = modelPreviewClean((string) ($body['email'] ?? $manifest['clientEmail'] ?? ''), 160);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        modelPreviewJson(400, ['ok' => false, 'error' => 'Vul eerst een geldig klant-e-mailadres in.']);
    }
    $manifest['clientEmail'] = $email;
    if (!modelPreviewAtomicWriteJson($directory . DIRECTORY_SEPARATOR . 'manifest.json', $manifest)) {
        modelPreviewJson(500, ['ok' => false, 'error' => 'Het klant-e-mailadres kon niet worden bewaard.']);
    }
    if (!modelPreviewSendLink($email, $manifest, $id)) {
        modelPreviewJson(502, ['ok' => false, 'error' => 'De link kon niet per e-mail worden verstuurd. Het adres is wel bewaard.']);
    }
    modelPreviewJson(200, ['ok' => true]);
}

if ($action === 'delete') {
    $body = modelPreviewBody();
    $id = strtolower((string) ($body['id'] ?? ''));
    if (!modelPreviewValidId($id)) modelPreviewJson(400, ['ok' => false, 'error' => 'Ongeldige preview.']);
    modelPreviewDeleteDirectory(modelPreviewRoot() . DIRECTORY_SEPARATOR . $id);
    modelPreviewJson(200, ['ok' => true]);
}

modelPreviewJson(400, ['ok' => false, 'error' => 'Onbekende actie.']);
