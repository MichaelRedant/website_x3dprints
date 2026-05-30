param(
  [string]$Monitor = "1",
  [string]$Edge = "left",
  [int]$TopOffset = 28,
  [int]$DurationMs = 12000,
  [string]$OpenUrl = "https://web0147.zxcs.be/roundcube/?_task=mail&_mbox=INBOX",
  [string]$LatestPath = "",
  [int]$MaxNotificationAgeSeconds = 300
)

$toolDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$companionScript = Join-Path $PSScriptRoot "companion-notifier.ps1"
if ([string]::IsNullOrWhiteSpace($LatestPath)) {
  $LatestPath = Join-Path $toolDir "data\latest-notification.json"
}

$arguments = @(
  "-Sta",
  "-WindowStyle",
  "Hidden",
  "-NoProfile",
  "-ExecutionPolicy",
  "Bypass",
  "-File",
  $companionScript,
  "-Monitor",
  $Monitor,
  "-Edge",
  $Edge,
  "-TopOffset",
  [string]$TopOffset,
  "-DurationMs",
  [string]$DurationMs,
  "-OpenUrl",
  $OpenUrl,
  "-LatestPath",
  $LatestPath,
  "-MaxNotificationAgeSeconds",
  [string]$MaxNotificationAgeSeconds
)

Start-Process powershell.exe -WorkingDirectory $toolDir -ArgumentList $arguments -WindowStyle Hidden | Out-Null
