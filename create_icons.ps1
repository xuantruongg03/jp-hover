# PowerShell Script tạo bộ biểu tượng chất lượng cao cho JP Furigana Hover
Add-Type -AssemblyName System.Drawing

$iconSizes = @(16, 32, 48, 128)
$iconsDir = Join-Path $PSScriptRoot "icons"

if (-not (Test-Path $iconsDir)) {
    New-Item -ItemType Directory -Path $iconsDir -Force | Out-Null
}

foreach ($size in $iconSizes) {
    $bmp = New-Object System.Drawing.Bitmap $size, $size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.Clear([System.Drawing.Color]::Transparent)
    
    # Nền gradient bo tròn tối thời thượng
    $rect = New-Object System.Drawing.Rectangle 0, 0, $size, $size
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $radius = [int]($size * 0.22)
    $diameter = $radius * 2
    
    $arcRect = New-Object System.Drawing.Rectangle 0, 0, $diameter, $diameter
    $path.AddArc($arcRect, 180, 90)
    $arcRect.X = $size - $diameter
    $path.AddArc($arcRect, 270, 90)
    $arcRect.Y = $size - $diameter
    $path.AddArc($arcRect, 0, 90)
    $arcRect.X = 0
    $path.AddArc($arcRect, 90, 90)
    $path.CloseFigure()
    
    # Nền chuyển sắc Navy / Cyan
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $rect,
        [System.Drawing.Color]::FromArgb(255, 15, 23, 42),
        [System.Drawing.Color]::FromArgb(255, 30, 41, 59),
        [System.Drawing.Drawing2D.LinearGradientMode]::ForwardDiagonal
    )
    $g.FillPath($brush, $path)
    
    # Viền vi diệu
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 56, 189, 248), [Math]::Max(1, [int]($size * 0.04)))
    $g.DrawPath($pen, $path)
    
    # Chấm tròn đỏ mặt trời Nhật Bản
    $sunRadius = [int]($size * 0.24)
    $sunX = [int](($size - $sunRadius * 2) / 2)
    $sunY = [int](($size - $sunRadius * 2) / 2)
    $sunBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 239, 68, 68))
    $g.FillEllipse($sunBrush, $sunX, $sunY, $sunRadius * 2, $sunRadius * 2)
    
    # Ký tự chữ "日" (Nhật) ở giữa
    $fontSize = [Math]::Max(7, [int]($size * 0.44))
    $font = New-Object System.Drawing.Font("MS Gothic", $fontSize, [System.Drawing.FontStyle]::Bold)
    $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
    
    $textRect = New-Object System.Drawing.RectangleF 0, 0, $size, ($size * 1.05)
    $g.DrawString("日", $font, $textBrush, $textRect, $sf)
    
    # Lưu file
    $outPath = Join-Path $iconsDir "icon$size.png"
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Created icon: $outPath"
}
