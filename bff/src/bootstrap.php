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

function logError(string $message, array $context = []): void
{
  $logPath = env("BFF_LOG_PATH", BFF_ROOT . "/storage/logs/bff.log");
  $dir = dirname($logPath);
  if (!is_dir($dir)) {
    @mkdir($dir, 0775, true);
  }
  $entry = [
    "time" => gmdate("c"),
    "message" => $message,
  ];
  if ($context) {
    $entry["context"] = $context;
  }
  @file_put_contents($logPath, json_encode($entry, JSON_UNESCAPED_SLASHES) . PHP_EOL, FILE_APPEND);
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

if (envBool("APP_DEBUG", false)) {
  ini_set("display_errors", "1");
  ini_set("display_startup_errors", "1");
  error_reporting(E_ALL);
}
