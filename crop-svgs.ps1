# Fix SVG viewBox - generous bounds to capture EVERYTHING

# Light-text logo (for dark backgrounds)
$content2 = Get-Content -Path 'd:\roots-9\roots\no bg 2.svg' -Raw
$content2 = $content2.Replace('viewBox="270 280 1300 400" width="1300" height="400"', 'viewBox="250 260 1350 470" width="1350" height="470"')
Set-Content -Path 'd:\roots-9\roots\public\logo-nobg2.svg' -Value $content2 -Encoding UTF8

# Dark-text logo (for light backgrounds) 
$content1 = Get-Content -Path 'd:\roots-9\roots\no bg 1 (1).svg' -Raw
$content1 = $content1.Replace('viewBox="270 280 1300 400" width="1300" height="400"', 'viewBox="250 260 1350 470" width="1350" height="470"')
Set-Content -Path 'd:\roots-9\roots\public\logo-nobg1.svg' -Value $content1 -Encoding UTF8

Write-Host "SVGs re-cropped with generous bounds"
