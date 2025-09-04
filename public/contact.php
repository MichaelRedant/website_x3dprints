<?php
// public/contact.php
// Beperkte mail relay voor static hosting (Vimexx). Gebruik PHPMailer voor betrouwbare verzending via SMTP.

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(200);
  exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["ok" => false, "error" => "Method not allowed"]);
  exit;
}

$autoload = __DIR__ . '/../php/vendor/autoload.php';
if (!file_exists($autoload)) {
  http_response_code(500);
  echo json_encode(["ok" => false, "error" => "Server misconfigured (autoload not found)"]);
  exit;
}
require $autoload;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if (!function_exists('str_ends_with')) {
  function str_ends_with($haystack, $needle) {
    $len = strlen($needle);
    if ($len === 0) { return true; }
    return substr($haystack, -$len) === $needle;
  }
}

$smtpHost = getenv('SMTP_HOST');
$smtpUser = getenv('SMTP_USER');
$smtpPass = getenv('SMTP_PASS');
$smtpPort = (int)(getenv('SMTP_PORT') ?: 587);
$smtpSecure = getenv('SMTP_SECURE') ?: 'tls';
$debug = getenv('APP_DEBUG');

// Honeypot
if (!empty($_POST["hp"])) {
  echo json_encode(["ok" => true]); exit;
}

function sanitize_filename($name) {
  return preg_replace('/[^a-zA-Z0-9.\-_]/', '_', $name ?? 'upload');
}

$allowed_ext = [".stl",".step",".stp",".igs",".iges"];
$max_files = 6;
$max_total_mb = 30;

$name = $_POST["name"] ?? "";
$email = $_POST["email"] ?? "";
$message = $_POST["message"] ?? "";
$type = $_POST["type"] ?? "private";
$company = $_POST["company"] ?? "";
$vat = $_POST["vat"] ?? "";
$address = $_POST["address"] ?? "";
$quantity = $_POST["quantity"] ?? "";
$material = $_POST["material"] ?? "";

if (!$name || !$email || !$message) {
  http_response_code(400);
  echo json_encode(["ok"=>false,"error"=>"Naam, e-mail en bericht zijn verplicht."]);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(["ok"=>false,"error"=>"Ongeldig e-mailadres."]);
  exit;
}

if (!empty($_FILES["files"]) && isset($_FILES["files"]["error"]) && $_FILES["files"]["error"][0] !== UPLOAD_ERR_NO_FILE) {
  if (count($_FILES["files"]["name"]) > $max_files) {
    http_response_code(400);
    echo json_encode(["ok"=>false,"error"=>"Max $max_files bestanden toegestaan."]);
    exit;
  }
  $total_bytes = 0;
  for ($i=0; $i<count($_FILES["files"]["name"]); $i++) {
    if ($_FILES["files"]["error"][$i] !== UPLOAD_ERR_OK) { continue; }
    $n = sanitize_filename($_FILES["files"]["name"][$i]);
    $ok = false;
    foreach ($allowed_ext as $ext) {
      if (str_ends_with(strtolower($n), $ext)) { $ok = true; break; }
    }
    if (!$ok) {
      http_response_code(400);
      echo json_encode(["ok"=>false,"error"=>"Ongeldig bestandstype voor $n."]);
      exit;
    }
    $tmp = $_FILES["files"]["tmp_name"][$i];
    if (is_uploaded_file($tmp)) {
      $total_bytes += filesize($tmp);
    }
  }
  if ($total_bytes > $max_total_mb * 1024 * 1024) {
    http_response_code(400);
    echo json_encode(["ok"=>false,"error"=>"Totaal te groot (limiet $max_total_mb MB)."]);
    exit;
  }
}

try {
  $mail = new PHPMailer(true);

  if ($smtpHost) {
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->Port = $smtpPort;
    if ($smtpSecure === 'ssl') {
      $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } else {
      $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    }
    if ($smtpUser) {
      $mail->SMTPAuth = true;
      $mail->Username = $smtpUser;
      $mail->Password = $smtpPass;
    }
  }

  $mail->setFrom('no-reply@x3dprints.be', 'X3DPrints');
  $mail->addAddress('info@x3dprints.be');
  $mail->addReplyTo($email, $name);
  $mail->isHTML(true);
  $mail->Subject = '[Contact] ' . ($type === 'business' ? 'Bedrijf' : 'Particulier') . ' — ' . $name;

  $body = '<h2>Nieuwe contactaanvraag</h2>';
  $body .= '<ul>';
  $body .= '<li><strong>Naam:</strong> ' . htmlspecialchars($name) . '</li>';
  $body .= '<li><strong>E-mail:</strong> ' . htmlspecialchars($email) . '</li>';
  $body .= '<li><strong>Type:</strong> ' . htmlspecialchars($type) . '</li>';
  if ($company) $body .= '<li><strong>Bedrijf:</strong> ' . htmlspecialchars($company) . '</li>';
  if ($vat) $body .= '<li><strong>BTW:</strong> ' . htmlspecialchars($vat) . '</li>';
  if ($address) $body .= '<li><strong>Adres:</strong> ' . htmlspecialchars($address) . '</li>';
  if ($quantity) $body .= '<li><strong>Aantal:</strong> ' . htmlspecialchars($quantity) . '</li>';
  if ($material) $body .= '<li><strong>Materiaal:</strong> ' . htmlspecialchars($material) . '</li>';
  $body .= '</ul>';
  $body .= '<p><strong>Bericht:</strong></p>';
  $body .= '<pre style="white-space:pre-wrap;font-family:ui-monospace,Menlo,monospace">' . htmlspecialchars($message) . '</pre>';
  $mail->Body = $body;

  if (!empty($_FILES['files']) && isset($_FILES['files']['error']) && $_FILES['files']['error'][0] !== UPLOAD_ERR_NO_FILE) {
    for ($i=0; $i<count($_FILES['files']['name']); $i++) {
      if ($_FILES['files']['error'][$i] !== UPLOAD_ERR_OK) { continue; }
      $tmp = $_FILES['files']['tmp_name'][$i];
      $filename = sanitize_filename($_FILES['files']['name'][$i]);
      if (is_uploaded_file($tmp)) {
        $mail->addAttachment($tmp, $filename);
      }
    }
  }

  $mail->send();
  echo json_encode(['ok' => true]);
} catch (Exception $e) {
  http_response_code(500);
  $err = 'Mail verzenden mislukt.';
  if ($debug) {
    $err .= ' ' . $mail->ErrorInfo . ' ' . $e->getMessage();
  }
  error_log($e->getMessage());
  echo json_encode(['ok' => false, 'error' => $err]);
}
