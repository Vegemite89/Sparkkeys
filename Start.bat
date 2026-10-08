@echo off
cd /d "%~dp0"
echo Starting SparkKeys...
echo Keep this window open while you use the app.
echo Browser opens after the server is ready.
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
if errorlevel 1 pause
