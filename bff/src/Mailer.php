<?php
declare(strict_types=1);

class SmtpMailer
{
  private string $host;
  private int $port;
  private ?string $user;
  private ?string $pass;
  private bool $useTls;
  private bool $useSsl;

  public function __construct(string $host, int $port, ?string $user, ?string $pass, bool $useTls, bool $useSsl)
  {
    $this->host = $host;
    $this->port = $port;
    $this->user = $user;
    $this->pass = $pass;
    $this->useTls = $useTls;
    $this->useSsl = $useSsl;
  }

  public static function fromEnv(): ?self
  {
    $host = env("SMTP_HOST");
    $port = (int)(env("SMTP_PORT") ?? 0);
    if (!$host || !$port) {
      return null;
    }

    $user = env("SMTP_USER");
    $pass = env("SMTP_PASS");

    $useSsl = envBool("SMTP_SSL", $port === 465);
    $useTls = envBool("SMTP_STARTTLS", $port === 587 && !$useSsl);

    return new self($host, $port, $user ?: null, $pass ?: null, $useTls, $useSsl);
  }

  public function send(array $message): void
  {
    $from = $message["from"] ?? null;
    $to = $message["to"] ?? null;
    $subject = $message["subject"] ?? "";
    $text = $message["text"] ?? "";
    $html = $message["html"] ?? "";
    $replyTo = $message["replyTo"] ?? null;

    if (!$from || !$to) {
      throw new RuntimeException("Missing mail sender or recipient");
    }

    $boundary = "bff-" . bin2hex(random_bytes(8));
    $headers = [
      "From: " . $from,
      "To: " . $to,
      "Subject: " . $this->encodeHeader((string)$subject),
      "MIME-Version: 1.0",
      "Content-Type: multipart/alternative; boundary=\"" . $boundary . "\"",
    ];
    if ($replyTo) {
      $headers[] = "Reply-To: " . $replyTo;
    }

    $body = "--" . $boundary . "\r\n";
    $body .= "Content-Type: text/plain; charset=utf-8\r\n\r\n";
    $body .= $text . "\r\n";
    $body .= "--" . $boundary . "\r\n";
    $body .= "Content-Type: text/html; charset=utf-8\r\n\r\n";
    $body .= $html . "\r\n";
    $body .= "--" . $boundary . "--\r\n";

    $this->sendRaw($from, $to, $headers, $body);
  }

  private function sendRaw(string $from, string $to, array $headers, string $body): void
  {
    $address = $this->useSsl ? "ssl://" . $this->host : $this->host;
    $socket = fsockopen($address, $this->port, $errno, $errstr, 20);
    if (!$socket) {
      throw new RuntimeException("SMTP connect failed: " . $errstr);
    }

    $this->expect($socket, 220);
    $this->command($socket, "EHLO " . $this->host, 250);

    if ($this->useTls) {
      $this->command($socket, "STARTTLS", 220);
      if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
        throw new RuntimeException("SMTP TLS failed");
      }
      $this->command($socket, "EHLO " . $this->host, 250);
    }

    if ($this->user && $this->pass) {
      $this->command($socket, "AUTH LOGIN", 334);
      $this->command($socket, base64_encode($this->user), 334);
      $this->command($socket, base64_encode($this->pass), 235);
    }

    $this->command($socket, "MAIL FROM:<" . $this->extractEmail($from) . ">", 250);
    $this->command($socket, "RCPT TO:<" . $this->extractEmail($to) . ">", 250);
    $this->command($socket, "DATA", 354);

    $data = implode("\r\n", $headers) . "\r\n\r\n" . $body;
    $data = str_replace("\r\n.\r\n", "\r\n..\r\n", $data);
    fwrite($socket, $data . "\r\n.\r\n");
    $this->expect($socket, 250);
    $this->command($socket, "QUIT", 221);

    fclose($socket);
  }

  private function command($socket, string $command, int $expect): void
  {
    fwrite($socket, $command . "\r\n");
    $this->expect($socket, $expect);
  }

  private function expect($socket, int $expect): void
  {
    $response = "";
    while ($line = fgets($socket, 515)) {
      $response .= $line;
      if (preg_match("/^\\d{3} /", $line)) {
        break;
      }
    }
    if (substr($response, 0, 3) !== (string)$expect) {
      throw new RuntimeException("SMTP error: " . trim($response));
    }
  }

  private function encodeHeader(string $value): string
  {
    if ($value === "") {
      return "";
    }
    return "=?UTF-8?B?" . base64_encode($value) . "?=";
  }

  private function extractEmail(string $address): string
  {
    if (preg_match("/<([^>]+)>/", $address, $matches)) {
      return trim($matches[1]);
    }
    return trim($address);
  }
}
