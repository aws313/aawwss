@echo off
:: start-dev.bat — quick double-click to run the project on Windows
cd /d %~dp0
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js not found. Install Node.js from https://nodejs.org/ and rerun.
  pause
  exit /b 1
)
where pnpm >nul 2>nul
if errorlevel 1 (
  echo pnpm not found. Installing pnpm globally via npm...
  npm install -g pnpm
)

echo Installing dependencies...
pnpm install

echo Starting dev server in new window...
start cmd /k "pnpm dev"

echo Opening http://localhost:3000 ...
start http://localhost:3000

exit /b 0