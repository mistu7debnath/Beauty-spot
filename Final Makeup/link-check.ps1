# Simple link checker for local HTML files
# Scans href/src attributes for local files and reports missing targets

$root = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
Set-Location $root

Write-Host "Scanning HTML files in: $root`n"

$htmlFiles = Get-ChildItem -Path $root -Filter *.html -File
$missing = @()
$totalLinks = 0

$hrefRegex = 'href\s*=\s*"([^"]+)"'
$srcRegex = 'src\s*=\s*"([^"]+)"'

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    $matches = @()
    $matches += [regex]::Matches($content, $hrefRegex) | ForEach-Object { $_.Groups[1].Value }
    $matches += [regex]::Matches($content, $srcRegex) | ForEach-Object { $_.Groups[1].Value }

    foreach ($m in $matches) {
        # ignore external links and mailto/tel and anchors and javascript
        if ($m -match '^(https?:|mailto:|tel:|#|javascript:)' ) { continue }

        # Treat querystrings/anchors: strip them
        $clean = $m -replace '\?.*$', '' -replace '\#.*$', ''

        # If it's a folder path ending with /, normalize to index.html
        if ($clean -match '/$') { $clean = $clean + 'index.html' }

        # Build absolute path
        $targetPath = Join-Path $root $clean

        $totalLinks++
        if (-not (Test-Path $targetPath)) {
            $missing += [PSCustomObject]@{
                Source = $file.Name
                Link = $m
                Resolved = $targetPath
            }
        }
    }
}

if ($totalLinks -eq 0) { Write-Host "No local links found to check."; exit 0 }

Write-Host "Checked $totalLinks local link(s).`n"

if ($missing.Count -eq 0) {
    Write-Host "All local links resolved successfully.`n" -ForegroundColor Green
    exit 0
} else {
    Write-Host "Missing link targets:`n" -ForegroundColor Red
    $missing | Format-Table -AutoSize
    exit 2
}
