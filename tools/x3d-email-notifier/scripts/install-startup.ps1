$ErrorActionPreference = "Stop"

$toolDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$startupDir = [Environment]::GetFolderPath("Startup")
$legacyLauncherPath = Join-Path $startupDir "X3DPrints Email Notifier.cmd"
$launcherPath = Join-Path $startupDir "X3DPrints Email Notifier.vbs"
$watcherScript = Join-Path $toolDir "scripts\start-watcher.ps1"

$content = @"
Set shell = CreateObject("WScript.Shell")
shell.Run "powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File ""$watcherScript""", 0, False
"@

if (Test-Path -LiteralPath $legacyLauncherPath) {
  Remove-Item -LiteralPath $legacyLauncherPath -Force
}

[System.IO.File]::WriteAllText($launcherPath, $content, [System.Text.Encoding]::ASCII)
Write-Host "Installed startup launcher: $launcherPath"
