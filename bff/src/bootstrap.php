<?php
declare(strict_types=1);

define("BFF_ROOT", dirname(__DIR__));

loadEnv(BFF_ROOT . "/.env");

function loadEnv(string $path): void
{
  if (!file_exists($path)) {
    return;
  }

  $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
  if (!$lines) {
    return;
  }

  foreach ($lines as $line) {
    $trimmed = trim($line);
    if ($trimmed === "" || substr($trimmed, 0, 1) === "#") {
      continue;
    }
    $parts = explode("=", $trimmed, 2);
    if (count($parts) !== 2) {
      continue;
    }
    $key = trim($parts[0]);
    $value = trim($parts[1]);
    if ($value !== "" && ($value[0] === "\"" || $value[0] === "'")) {
      $value = trim($value, "\"'");
    }
    if ($key !== "") {
      putenv($key . "=" . $value);
      $_ENV[$key] = $value;
    }
  }
}

function env(string $key, ?string $default = null): ?string
{
  $value = getenv($key);
  if ($value === false || $value === "") {
    return $default;
  }
  return $value;
}

function envBool(string $key, bool $default = false): bool
{
  $value = env($key);
  if ($value === null) {
    return $default;
  }
  return in_array(strtolower($value), ["1", "true", "yes", "on"], true);
}

function jsonResponse(array $payload, int $status = 200): void
{
  header("Content-Type: application/json; charset=utf-8");
  http_response_code($status);
  echo json_encode($payload, JSON_UNESCAPED_SLASHES);
  exit;
}

function currentRequestId(): string
{
  static $requestId = null;
  if ($requestId !== null) {
    return $requestId;
  }

  $incoming = trim((string)($_SERVER["HTTP_X_REQUEST_ID"] ?? ""));
  if ($incoming !== "" && preg_match("/^[A-Za-z0-9._:-]{8,120}$/", $incoming)) {
    $requestId = $incoming;
    return $requestId;
  }

  try {
    $requestId = bin2hex(random_bytes(8));
  } catch (Throwable $error) {
    $requestId = substr(str_replace(".", "", (string)microtime(true)), -16);
  }

  return $requestId;
}

function isSensitiveLogKey(string $key): bool
{
  $normalized = strtolower(trim($key));
  if ($normalized === "") {
    return false;
  }
  if (preg_match("/pass(word)?|token|secret|authorization|api[_-]?key|cookie|session/i", $normalized)) {
    return true;
  }
  return (bool)preg_match("/(^|[_-])key$/i", $normalized);
}

function sanitizeLogValue($value, int $depth = 0)
{
  if ($depth >= 5) {
    return "[max-depth]";
  }

  if (is_array($value)) {
    $sanitized = [];
    $count = 0;
    foreach ($value as $key => $item) {
      if ($count >= 50) {
        $sanitized["..."] = "[truncated]";
        break;
      }
      $stringKey = is_string($key) ? $key : (string)$key;
      if (isSensitiveLogKey($stringKey)) {
        $sanitized[$key] = "[redacted]";
      } else {
        $sanitized[$key] = sanitizeLogValue($item, $depth + 1);
      }
      $count++;
    }
    return $sanitized;
  }

  if (is_object($value)) {
    return sanitizeLogValue((array)$value, $depth + 1);
  }

  if (is_string($value) && strlen($value) > 2000) {
    return substr($value, 0, 2000) . "...[truncated]";
  }

  if (is_resource($value)) {
    return "[resource]";
  }

  return $value;
}

function sanitizeLogContext(array $context): array
{
  return sanitizeLogValue($context, 0);
}

function logEvent(string $event, array $context = [], string $level = "info"): void
{
  $logPath = env("BFF_LOG_PATH", BFF_ROOT . "/storage/logs/bff.log");
  $dir = dirname($logPath);
  if (!is_dir($dir)) {
    @mkdir($dir, 0775, true);
  }

  $entry = [
    "time" => gmdate("c"),
    "level" => strtolower($level),
    "event" => $event,
    "requestId" => currentRequestId(),
    "path" => $_SERVER["REQUEST_URI"] ?? null,
    "method" => $_SERVER["REQUEST_METHOD"] ?? null,
  ];
  if ($context) {
    $entry["context"] = sanitizeLogContext($context);
  }

  @file_put_contents($logPath, json_encode($entry, JSON_UNESCAPED_SLASHES) . PHP_EOL, FILE_APPEND);
}

function logInfo(string $event, array $context = []): void
{
  logEvent($event, $context, "info");
}

function logWarning(string $event, array $context = []): void
{
  logEvent($event, $context, "warning");
}

function logError(string $event, array $context = []): void
{
  logEvent($event, $context, "error");
}

function sanitizeHeaderLine(string $value): string
{
  return str_replace(["\r", "\n"], " ", trim($value));
}

function extractEmailAddress(string $value): ?string
{
  $trimmed = sanitizeHeaderLine($value);
  if ($trimmed === "") {
    return null;
  }
  if (preg_match("/<([^>]+)>/", $trimmed, $matches)) {
    $trimmed = sanitizeHeaderLine($matches[1]);
  }
  return filter_var($trimmed, FILTER_VALIDATE_EMAIL) ? $trimmed : null;
}

function dispatchAlertEmail(array $payload, string $recipient): bool
{
  $to = sanitizeHeaderLine($recipient);
  $toEmail = extractEmailAddress($to);
  if ($toEmail === null) {
    logWarning("alert_email_config_invalid", [
      "event" => $payload["event"] ?? null,
      "reason" => "invalid_to",
    ]);
    return false;
  }

  $from = sanitizeHeaderLine((string)(env("ALERT_EMAIL_FROM", env("MAIL_FROM", "X3DPrints <michael@xinudesign.be>") ?? "") ?? ""));
  $fromEmail = extractEmailAddress($from);
  if ($fromEmail === null) {
    logWarning("alert_email_config_invalid", [
      "event" => $payload["event"] ?? null,
      "reason" => "invalid_from",
    ]);
    return false;
  }

  $severity = strtoupper((string)($payload["severity"] ?? "ERROR"));
  $event = (string)($payload["event"] ?? "unknown_event");
  $subject = sanitizeHeaderLine("[X3DPrints alert][" . $severity . "] " . $event);

  $contextJson = json_encode($payload["context"] ?? [], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  if ($contextJson === false) {
    $contextJson = "{}";
  }

  $textBody = implode("\n", [
    "Alert from X3DPrints",
    "Time: " . (string)($payload["time"] ?? gmdate("c")),
    "Severity: " . (string)($payload["severity"] ?? "error"),
    "Event: " . $event,
    "Request ID: " . (string)($payload["requestId"] ?? ""),
    "Message: " . (string)($payload["message"] ?? ""),
    "",
    "Context:",
    $contextJson,
  ]);

  $htmlBody = "<h2>X3DPrints Alert</h2>"
    . "<p><strong>Time:</strong> " . htmlspecialchars((string)($payload["time"] ?? gmdate("c")), ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8") . "</p>"
    . "<p><strong>Severity:</strong> " . htmlspecialchars((string)($payload["severity"] ?? "error"), ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8") . "</p>"
    . "<p><strong>Event:</strong> " . htmlspecialchars($event, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8") . "</p>"
    . "<p><strong>Request ID:</strong> " . htmlspecialchars((string)($payload["requestId"] ?? ""), ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8") . "</p>"
    . "<p><strong>Message:</strong> " . nl2br(htmlspecialchars((string)($payload["message"] ?? ""), ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8")) . "</p>"
    . "<p><strong>Context:</strong></p>"
    . "<pre style=\"white-space:pre-wrap;word-break:break-word;background:#f8fafc;border:1px solid #e2e8f0;padding:12px;border-radius:8px;\">"
    . htmlspecialchars($contextJson, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8")
    . "</pre>";

  if (!class_exists("SmtpMailer")) {
    $mailerPath = __DIR__ . "/Mailer.php";
    if (file_exists($mailerPath)) {
      require_once $mailerPath;
    }
  }

  if (class_exists("SmtpMailer")) {
    try {
      $mailer = SmtpMailer::fromEnv();
      if ($mailer) {
        $mailer->send([
          "from" => $from,
          "to" => $to,
          "replyTo" => $to,
          "subject" => $subject,
          "text" => $textBody,
          "html" => $htmlBody,
        ]);
        return true;
      }
    } catch (Throwable $error) {
      logWarning("alert_email_dispatch_failed", [
        "event" => $event,
        "transport" => "smtp",
        "error" => $error->getMessage(),
      ]);
      return false;
    }
  }

  $headers = "From: " . $from . "\r\n";
  $headers .= "Reply-To: " . $to . "\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
  $headers .= "Content-Transfer-Encoding: 8bit\r\n";
  $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

  ini_set("sendmail_from", $fromEmail);
  $sent = @mail($toEmail, $subject, $textBody, $headers, "-f " . $fromEmail);
  if (!$sent) {
    $sent = @mail($toEmail, $subject, $textBody, $headers);
  }
  if (!$sent) {
    logWarning("alert_email_dispatch_failed", [
      "event" => $event,
      "transport" => "mail",
    ]);
  }

  return $sent;
}

function alertEvent(string $event, string $message, array $context = [], string $severity = "error"): void
{
  $webhookUrl = trim((string)(env("ALERT_WEBHOOK_URL", "") ?? ""));
  $emailRecipient = trim((string)(env("ALERT_EMAIL_TO", env("MAIL_TO", "michael@xinudesign.be") ?? "") ?? ""));
  if ($webhookUrl === "" && $emailRecipient === "") {
    return;
  }

  $payload = [
    "time" => gmdate("c"),
    "severity" => strtolower($severity),
    "event" => $event,
    "message" => $message,
    "requestId" => currentRequestId(),
    "context" => sanitizeLogContext($context),
  ];

  if ($webhookUrl !== "") {
    $body = json_encode($payload, JSON_UNESCAPED_SLASHES);
    if ($body !== false && function_exists("curl_init")) {
      $ch = curl_init($webhookUrl);
      curl_setopt($ch, CURLOPT_POST, true);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
      curl_setopt($ch, CURLOPT_TIMEOUT, 4);
      curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
      $response = curl_exec($ch);
      $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
      $error = curl_error($ch);
      curl_close($ch);

      if ($response === false || $status >= 400) {
        logWarning("alert_dispatch_failed", [
          "event" => $event,
          "status" => $status,
          "error" => $error !== "" ? $error : null,
          "transport" => "webhook-curl",
        ]);
      }
    } else if ($body !== false) {
      $contextOptions = stream_context_create([
        "http" => [
          "method" => "POST",
          "header" => "Content-Type: application/json\r\n",
          "content" => $body,
          "timeout" => 4,
          "ignore_errors" => true,
        ],
      ]);
      $result = @file_get_contents($webhookUrl, false, $contextOptions);
      if ($result === false) {
        logWarning("alert_dispatch_failed", [
          "event" => $event,
          "transport" => "webhook-stream",
        ]);
      }
    } else {
      logWarning("alert_dispatch_failed", [
        "event" => $event,
        "transport" => "webhook-json",
      ]);
    }
  }

  if ($emailRecipient !== "") {
    dispatchAlertEmail($payload, $emailRecipient);
  }
}

function errorResponse(string $message, int $status = 400, ?string $details = null): void
{
  $payload = ["error" => $message];
  if ($details) {
    $payload["details"] = $details;
  }
  jsonResponse($payload, $status);
}

function readJsonBody(): array
{
  $contentType = $_SERVER["CONTENT_TYPE"] ?? "";
  if ($contentType !== "" && stripos($contentType, "application/json") === false) {
    return [];
  }
  $raw = file_get_contents("php://input") ?: "";
  if (trim($raw) === "") {
    return [];
  }
  $decoded = json_decode($raw, true);
  if (!is_array($decoded)) {
    errorResponse("Invalid JSON", 400);
  }
  return $decoded;
}

function applyCors(): void
{
  $allowlist = array_filter(array_map("trim", explode(",", env("BFF_CORS_ALLOWLIST", ""))));
  if (!$allowlist) {
    $allowlist = [
      "https://x3dprints.be",
      "https://www.x3dprints.be",
      "http://localhost:3000",
    ];
  }

  $origin = $_SERVER["HTTP_ORIGIN"] ?? "";
  if ($origin && in_array($origin, $allowlist, true)) {
    header("Access-Control-Allow-Origin: " . $origin);
    header("Vary: Origin");
  }

  header("Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
  header("Access-Control-Max-Age: 86400");
  header("X-Robots-Tag: noindex, nofollow");
  header("X-Content-Type-Options: nosniff");
}

function getPdo(): PDO
{
  static $pdo = null;
  if ($pdo instanceof PDO) {
    return $pdo;
  }

  $dsn = env("BFF_DB_DSN");
  if (!$dsn) {
    $host = env("BFF_DB_HOST");
    $name = env("BFF_DB_NAME");
    if ($host && $name) {
      $dsn = "mysql:host=" . $host . ";dbname=" . $name . ";charset=utf8mb4";
    }
  }

  if (!$dsn) {
    errorResponse("Database not configured", 500);
  }

  $user = env("BFF_DB_USER", "");
  $pass = env("BFF_DB_PASS", "");

  $pdo = new PDO($dsn, $user, $pass, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ]);

  return $pdo;
}

function shopProductsHasDeletedColumn(PDO $pdo): bool
{
  static $cache = null;
  if ($cache !== null) {
    return $cache;
  }
  try {
    $stmt = $pdo->query("SHOW COLUMNS FROM shop_products LIKE 'is_deleted'");
    $cache = (bool)$stmt->fetch();
  } catch (Throwable $error) {
    $cache = false;
  }
  return $cache;
}

function shopProductsHasTagsColumn(PDO $pdo): bool
{
  static $cache = null;
  if ($cache !== null) {
    return $cache;
  }
  try {
    $stmt = $pdo->query("SHOW COLUMNS FROM shop_products LIKE 'tags'");
    $cache = (bool)$stmt->fetch();
  } catch (Throwable $error) {
    $cache = false;
  }
  return $cache;
}

function shopProductsHasStockCountColumn(PDO $pdo): bool
{
  static $cache = null;
  if ($cache !== null) {
    return $cache;
  }
  try {
    $stmt = $pdo->query("SHOW COLUMNS FROM shop_products LIKE 'stock_count'");
    $cache = (bool)$stmt->fetch();
  } catch (Throwable $error) {
    $cache = false;
  }
  return $cache;
}

function shopProductsHasPurchaseModeColumn(PDO $pdo): bool
{
  static $cache = null;
  if ($cache !== null) {
    return $cache;
  }
  try {
    $stmt = $pdo->query("SHOW COLUMNS FROM shop_products LIKE 'purchase_mode'");
    $cache = (bool)$stmt->fetch();
  } catch (Throwable $error) {
    $cache = false;
  }
  return $cache;
}

function shopCategoriesTableExists(PDO $pdo): bool
{
  static $cache = null;
  if ($cache !== null) {
    return $cache;
  }
  try {
    $stmt = $pdo->query("SHOW TABLES LIKE 'shop_categories'");
    $cache = (bool)$stmt->fetch();
  } catch (Throwable $error) {
    $cache = false;
  }
  return $cache;
}

function shopProductsHasSkuColumn(PDO $pdo): bool
{
  static $cache = null;
  if ($cache !== null) {
    return $cache;
  }
  try {
    $stmt = $pdo->query("SHOW COLUMNS FROM shop_products LIKE 'sku'");
    $cache = (bool)$stmt->fetch();
  } catch (Throwable $error) {
    $cache = false;
  }
  return $cache;
}

function shopProductsHasCategoryIdColumn(PDO $pdo): bool
{
  static $cache = null;
  if ($cache !== null) {
    return $cache;
  }
  try {
    $stmt = $pdo->query("SHOW COLUMNS FROM shop_products LIKE 'category_id'");
    $cache = (bool)$stmt->fetch();
  } catch (Throwable $error) {
    $cache = false;
  }
  return $cache;
}

function shopProductsHasStockQtyColumn(PDO $pdo): bool
{
  static $cache = null;
  if ($cache !== null) {
    return $cache;
  }
  try {
    $stmt = $pdo->query("SHOW COLUMNS FROM shop_products LIKE 'stock_qty'");
    $cache = (bool)$stmt->fetch();
  } catch (Throwable $error) {
    $cache = false;
  }
  return $cache;
}

function shopProductsHasStockStatusColumn(PDO $pdo): bool
{
  static $cache = null;
  if ($cache !== null) {
    return $cache;
  }
  try {
    $stmt = $pdo->query("SHOW COLUMNS FROM shop_products LIKE 'stock_status'");
    $cache = (bool)$stmt->fetch();
  } catch (Throwable $error) {
    $cache = false;
  }
  return $cache;
}

if (envBool("APP_DEBUG", false)) {
  ini_set("display_errors", "1");
  ini_set("display_startup_errors", "1");
  error_reporting(E_ALL);
}
