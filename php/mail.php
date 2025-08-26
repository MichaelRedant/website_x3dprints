<?php
require __DIR__ . '/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$input = stream_get_contents(STDIN);
$data = json_decode($input, true);
if (!is_array($data)) {
    fwrite(STDERR, "Invalid input\n");
    exit(1);
}

$mail = new PHPMailer(true);
try {
    // Configure basic mail settings (adjust as needed)
    $mail->setFrom($data['email'] ?? '', $data['name'] ?? '');
    $mail->addAddress('info@example.com'); // TODO: change to actual recipient
    $mail->Subject = 'Nieuw bericht via contactformulier';

    $body = "Naam: " . ($data['name'] ?? '') . "\n";
    $body .= "Email: " . ($data['email'] ?? '') . "\n";
    $body .= "Type: " . ($data['type'] ?? '') . "\n";
    if (($data['type'] ?? '') === 'business') {
        $body .= "Bedrijfsnaam: " . ($data['company'] ?? '') . "\n";
        $body .= "BTW-nummer: " . ($data['vat'] ?? '') . "\n";
    } else {
        $body .= "Adres: " . ($data['address'] ?? '') . "\n";
    }
    $body .= "Aantal: " . ($data['quantity'] ?? '') . "\n";
    $body .= "Materiaal: " . ($data['material'] ?? '') . "\n";
    $body .= "Bericht: " . ($data['message'] ?? '') . "\n";

    $mail->Body = $body;
    $mail->send();
    exit(0);
} catch (Exception $e) {
    fwrite(STDERR, $e->getMessage());
    exit(1);
}
