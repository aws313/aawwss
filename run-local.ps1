#!/usr/bin/env pwsh
# run-local.ps1 — Install deps (if needed), start dev server, open browser
Set-StrictMode -Version Latest

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location $scriptDir

function Ensure-Node {
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Error "Node.js not found. Install Node.js (https://nodejs.org/) and rerun this script."
        exit 1
    }
}

function Ensure-Pnpm {
    if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
        Write-Host "pnpm not found. Installing pnpm globally via npm..."
        npm install -g pnpm
        if ($LASTEXITCODE -ne 0) { Write-Error "Failed to install pnpm."; exit 1 }
    }
}

Ensure-Node
Ensure-Pnpm

Write-Host "Installing dependencies (pnpm install)..."
pnpm install
if ($LASTEXITCODE -ne 0) { Write-Error "pnpm install failed; inspect output above."; exit 1 }

Write-Host "Starting dev server in a new terminal window..."
Start-Process -FilePath "cmd.exe" -ArgumentList "/k pnpm dev"
Start-Sleep -Seconds 2

$url = 'http://localhost:3000'
Write-Host "Opening $url in default browser..."
Start-Process $url

Pop-Location
