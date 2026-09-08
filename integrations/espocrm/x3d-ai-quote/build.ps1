param(
    [string]$Php = 'C:\xampp\php\php.exe'
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$dist = Join-Path $root 'dist'
$staging = Join-Path $dist 'package'
$zip = Join-Path $dist 'X3DPrints-AI-Quote-1.3.5.zip'
$resolvedRoot = [IO.Path]::GetFullPath($root).TrimEnd([IO.Path]::DirectorySeparatorChar)
$resolvedStaging = [IO.Path]::GetFullPath($staging)

if (-not $resolvedStaging.StartsWith($resolvedRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
    throw "Unsafe staging path: $resolvedStaging"
}

if (-not (Test-Path -LiteralPath $Php)) {
    throw "PHP executable not found: $Php"
}

Get-ChildItem -LiteralPath $root -Recurse -Filter '*.php' -File | ForEach-Object {
    & $Php -l $_.FullName | Out-Host
    if ($LASTEXITCODE -ne 0) {
        throw "PHP lint failed: $($_.FullName)"
    }
}

Get-ChildItem -LiteralPath (Join-Path $root 'files') -Recurse -Filter '*.json' -File |
    ForEach-Object { Get-Content -LiteralPath $_.FullName -Raw | ConvertFrom-Json | Out-Null }
Get-Content -LiteralPath (Join-Path $root 'manifest.json') -Raw | ConvertFrom-Json | Out-Null

if (Test-Path -LiteralPath $staging) {
    Remove-Item -LiteralPath $staging -Recurse -Force
}
New-Item -ItemType Directory -Path $staging -Force | Out-Null
Copy-Item -LiteralPath (Join-Path $root 'manifest.json') -Destination $staging
Copy-Item -LiteralPath (Join-Path $root 'files') -Destination $staging -Recurse
Copy-Item -LiteralPath (Join-Path $root 'scripts') -Destination $staging -Recurse

if (Test-Path -LiteralPath $zip) {
    Remove-Item -LiteralPath $zip -Force
}
Compress-Archive -Path (Join-Path $staging '*') -DestinationPath $zip -CompressionLevel Optimal

Write-Host "Built $zip"
