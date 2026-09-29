Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\HP\.gemini\antigravity\brain\63967193-5f2e-4528-b021-a0c3571fe6fe\.user_uploaded\media_1790176001162.jpg"
$destPng = "d:\PORTFOLIO\Premium Digital Portfolio\public\favicon.png"
$destPng32 = "d:\PORTFOLIO\Premium Digital Portfolio\public\favicon-32x32.png"
$destPng16 = "d:\PORTFOLIO\Premium Digital Portfolio\public\favicon-16x16.png"
$destPngApple = "d:\PORTFOLIO\Premium Digital Portfolio\public\apple-touch-icon.png"

$img = [System.Drawing.Image]::FromFile($srcPath)
$w = $img.Width
$h = $img.Height

# Extra Zoom: focus right on the pink curves and mouse cursor arrow
# Perfectly centered on the symbol to fill the circle edge-to-edge
$cropX = 160
$cropY = 160
$cropSize = 704

function Generate-Favicon($targetSize, $targetPath, $applyCircularClip) {
    $bmp = New-Object System.Drawing.Bitmap($targetSize, $targetSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    if ($applyCircularClip) {
        $path = New-Object System.Drawing.Drawing2D.GraphicsPath
        $path.AddEllipse(0, 0, $targetSize, $targetSize)
        $g.SetClip($path)
    }

    # Draw cropped section filling 100% of destination
    $destRect = [System.Drawing.Rectangle]::new(0, 0, $targetSize, $targetSize)
    $g.DrawImage($img, $destRect, $cropX, $cropY, $cropSize, $cropSize, [System.Drawing.GraphicsUnit]::Pixel)

    if ($applyCircularClip) {
        $g.ResetClip()
        $path.Dispose()
    }

    $g.Dispose()
    $bmp.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
}

# 512x512
Generate-Favicon 512 $destPng $true
# 180x180 (Apple touch)
Generate-Favicon 180 $destPngApple $true
# 32x32
Generate-Favicon 32 $destPng32 $true
# 16x16
Generate-Favicon 16 $destPng16 $true

$img.Dispose()
Write-Host "Extra-zoomed favicons generated successfully!"
