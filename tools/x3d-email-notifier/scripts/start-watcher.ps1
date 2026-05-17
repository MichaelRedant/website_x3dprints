$ErrorActionPreference = "Stop"

$toolDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$nodeProcess = Get-CimInstance Win32_Process | Where-Object {
  $_.Name -eq "node.exe" -and
  ($_.CommandLine -like "*src\notifier.mjs*" -or $_.CommandLine -like "*src/notifier.mjs*")
}

if ($nodeProcess) {
  exit 0
}

Start-Process node.exe -WorkingDirectory $toolDir -ArgumentList "src\notifier.mjs" -WindowStyle Hidden | Out-Null
