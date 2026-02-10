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

header("Content-Type: application/json; charset=utf-8");
header("X-Robots-Tag: noindex, nofollow");

$secure = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off");
session_name("x3dprints_crm");
session_set_cookie_params([
  "lifetime" => 0,
  "path" => "/",
  "secure" => $secure,
  "httponly" => true,
  "samesite" => "Strict",
]);
session_start();

$method = $_SERVER["REQUEST_METHOD"] ?? "GET";

if ($method === "GET") {
  echo json_encode(["authed" => !empty($_SESSION["crm_auth"])]);
  exit;
}

if ($method === "DELETE") {
  $_SESSION = [];
  if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), "", time() - 42000, $params["path"], $params["domain"] ?? "", $params["secure"], $params["httponly"]);
  }
  session_destroy();
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

$plain = env("CRM_PASSWORD");
$hash = env("CRM_PASSWORD_HASH");
if (!$plain && !$hash) {
  http_response_code(500);
  echo json_encode(["error" => "CRM password not configured"]);
  exit;
}

$ok = false;
if ($hash) {
  $ok = password_verify($password, $hash);
} elseif ($plain) {
  $ok = hash_equals($plain, $password);
}

if (!$ok) {
  http_response_code(401);
  echo json_encode(["ok" => false, "error" => "Wachtwoord klopt niet."]);
  exit;
}

$_SESSION["crm_auth"] = true;
echo json_encode(["ok" => true]);
