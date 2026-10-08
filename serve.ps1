$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

$prefix = 'http://127.0.0.1:8765/'
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
try {
  $listener.Prefixes.Add('http://localhost:8765/')
} catch {}

try {
  $listener.Start()
} catch {
  Write-Host "Failed to start server on port 8765."
  Write-Host $_.Exception.Message
  Write-Host "Is another SparkKeys window already open? Close it and try again."
  Read-Host "Press Enter to close"
  exit 1
}

Write-Host "SparkKeys is running at $prefix"
Write-Host "Keep this window open. Close it to stop."
Start-Process $prefix

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $req = $context.Request
  $res = $context.Response
  try {
    $path = $req.Url.LocalPath
    if ($path -eq '/') { $path = '/index.html' }
    $rel = ($path.TrimStart('/') -replace '/', '\')
    $file = Join-Path (Get-Location) $rel
    if (Test-Path $file -PathType Leaf) {
      $bytes = [IO.File]::ReadAllBytes($file)
      $ext = [IO.Path]::GetExtension($file).ToLower()
      $res.ContentType = switch ($ext) {
        '.html' { 'text/html; charset=utf-8' }
        '.css'  { 'text/css; charset=utf-8' }
        '.js'   { 'application/javascript; charset=utf-8' }
        '.json' { 'application/json' }
        '.png'  { 'image/png' }
        '.jpg'  { 'image/jpeg' }
        '.jpeg' { 'image/jpeg' }
        '.svg'  { 'image/svg+xml' }
        '.ico'  { 'image/x-icon' }
        '.mp3'  { 'audio/mpeg' }
        '.ogg'  { 'audio/ogg' }
        '.wav'  { 'audio/wav' }
        '.wasm' { 'application/wasm' }
        default { 'application/octet-stream' }
      }
      $res.ContentLength64 = $bytes.LongLength
      $res.StatusCode = 200
      if ($req.HttpMethod -ne 'HEAD') {
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
      }
    } else {
      $res.StatusCode = 404
      $msg = [Text.Encoding]::UTF8.GetBytes('Not found')
      $res.ContentLength64 = $msg.LongLength
      if ($req.HttpMethod -ne 'HEAD') {
        $res.OutputStream.Write($msg, 0, $msg.Length)
      }
    }
  } catch {
    try { $res.StatusCode = 500 } catch {}
  } finally {
    try { $res.OutputStream.Close() } catch {}
    try { $res.Close() } catch {}
  }
}
