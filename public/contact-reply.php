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
$mailerPath = __DIR__ . "/bff/src/Mailer.php";
if (!file_exists($mailerPath)) {
  $mailerPath = __DIR__ . "/../bff/src/Mailer.php";
}
require_once $mailerPath;

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

if (empty($_SESSION["crm_auth"])) {
  http_response_code(401);
  echo json_encode(["error" => "Unauthorized"]);
  exit;
}

$payload = readJsonBody();
$to = trim((string)($payload["to"] ?? ""));
$subject = trim((string)($payload["subject"] ?? ""));
$html = trim((string)($payload["html"] ?? ""));
$text = trim((string)($payload["text"] ?? ""));

if ($to === "" || $subject === "") {
  http_response_code(400);
  echo json_encode(["error" => "Missing payload"]);
  exit;
}

$mailer = SmtpMailer::fromEnv();
if (!$mailer) {
  http_response_code(500);
  echo json_encode(["error" => "SMTP not configured"]);
  exit;
}

$from = env("MAIL_FROM");
$admin = env("MAIL_TO");
if (!$from || !$admin) {
  http_response_code(500);
  echo json_encode(["error" => "Mail config missing"]);
  exit;
}

$file = crmDataPath("crm-replies.json");

$entry = [
  "ts" => gmdate("c"),
  "to" => $to,
  "subject" => $subject,
  "html" => $html,
  "text" => $text,
  "sent" => false,
];

try {
  $mailer->send([
    "from" => $from,
    "to" => $to,
    "replyTo" => $admin,
    "subject" => $subject,
    "text" => $text ?: strip_tags($html),
    "html" => $html ?: nl2br(htmlspecialchars($text, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8")),
  ]);
  $entry["sent"] = true;
} catch (Throwable $error) {
  logError("crm_reply_failed", ["message" => $error->getMessage()]);
}

$current = crmReadJsonFile($file);
$current[] = $entry;
crmWriteJsonFile($file, $current);

echo json_encode(["ok" => $entry["sent"]]);
