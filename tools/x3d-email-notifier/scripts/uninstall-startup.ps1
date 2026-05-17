$ErrorActionPreference = "Stop"

$startupDir = [Environment]::GetFolderPath("Startup")
$launcherPaths = @(
  (Join-Path $startupDir "X3DPrints Email Notifier.vbs"),
  (Join-Path $startupDir "X3DPrints Email Notifier.cmd")
)

foreach ($launcherPath in $launcherPaths) {
  if (Test-Path -LiteralPath $launcherPath) {
    Remove-Item -LiteralPath $launcherPath -Force
    Write-Host "Removed startup launcher: $launcherPath"
  } else {
    Write-Host "Startup launcher not found: $launcherPath"
  }
}
