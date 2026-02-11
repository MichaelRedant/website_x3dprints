<?php
declare(strict_types=1);

$bootstrap = __DIR__ . "/bff/src/bootstrap.php";
if (!file_exists($bootstrap)) {
  $bootstrap = __DIR__ . "/../bff/src/bootstrap.php";
}
if (!file_exists($bootstrap)) {
  http_response_code(500);
  header("Content-Type: application/json; charset=utf-8");
  echo json_encode(["error" => "CRM bootstrap not found"]);
  exit;
}

require $bootstrap;
require_once __DIR__ . "/crm-common.php";

header("Content-Type: application/json; charset=utf-8");
header("X-Robots-Tag: noindex, nofollow");

crmSessionStart();

$method = $_SERVER["REQUEST_METHOD"] ?? "GET";

if ($method === "GET") {
  echo json_encode(["authed" => crmIsAuthenticated()]);
  exit;
}

if ($method === "DELETE") {
  crmLogout();
  echo json_encode(["ok" => true]);
  exit;
}

if ($method !== "POST") {
  http_response_code(405);
  echo json_encode(["error" => "Method not allowed"]);
  exit;
}

$payload = readJsonBody();
$password = (string)($payload["password"] ?? "");

$hash = env("CRM_PASSWORD_HASH");
if (!$hash) {
  http_response_code(500);
  echo json_encode(["error" => "CRM password hash not configured"]);
  exit;
}

$maxAttempts = (int)(env("CRM_AUTH_MAX_ATTEMPTS") ?? 5);
if ($maxAttempts < 1) {
  $maxAttempts = 5;
}
$windowSeconds = (int)(env("CRM_AUTH_WINDOW_SEC") ?? 300);
if ($windowSeconds < 60) {
  $windowSeconds = 300;
}
$rateFile = crmDataPath("crm-auth-rate.json");
$rateState = crmReadJsonFile($rateFile);
if (!is_array($rateState)) {
  $rateState = [];
}
$rateKey = hash("sha256", crmClientIp());
$now = time();
$entry = $rateState[$rateKey] ?? ["count" => 0, "resetAt" => $now + $windowSeconds];
if (!isset($entry["resetAt"]) || (int)$entry["resetAt"] <= $now) {
  $entry = ["count" => 0, "resetAt" => $now + $windowSeconds];
}
if (($entry["count"] ?? 0) >= $maxAttempts) {
  $retryAfter = max(1, (int)$entry["resetAt"] - $now);
  header("Retry-After: " . $retryAfter);
  http_response_code(429);
  echo json_encode(["ok" => false, "error" => "Te veel pogingen. Probeer later opnieuw."]);
  exit;
}

$ok = password_verify($password, $hash);

if (!$ok) {
  $entry["count"] = (int)($entry["count"] ?? 0) + 1;
  $rateState[$rateKey] = $entry;
  crmWriteJsonFile($rateFile, $rateState);
  http_response_code(401);
  echo json_encode(["ok" => false, "error" => "Wachtwoord klopt niet."]);
  exit;
}

unset($rateState[$rateKey]);
crmWriteJsonFile($rateFile, $rateState);
crmLogin();
echo json_encode(["ok" => true]);
