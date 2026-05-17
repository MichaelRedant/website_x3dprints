param(
  [string]$Title = "X3DPrints",
  [string]$Sender = "Nieuwe e-mail",
  [string]$Subject = "Je hebt een nieuw bericht",
  [string]$Preview = "",
  [int]$DurationMs = 12000,
  [string]$OpenUrl = "https://web0147.zxcs.be/roundcube/?_task=mail&_mbox=INBOX",
  [string]$Monitor = "1",
  [string]$Edge = "left",
  [int]$TopOffset = 28,
  [switch]$ScreenInfo,
  [switch]$Sound
)

Add-Type -AssemblyName PresentationFramework
Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase
Add-Type -AssemblyName System.Windows.Forms

Add-Type @"
using System;
using System.Runtime.InteropServices;

public static class X3DWin32 {
  [DllImport("user32.dll")]
  public static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);

  public static readonly IntPtr HWND_TOPMOST = new IntPtr(-1);
  public const UInt32 SWP_NOSIZE = 0x0001;
  public const UInt32 SWP_NOMOVE = 0x0002;
  public const UInt32 SWP_SHOWWINDOW = 0x0040;
}
"@

if ($ScreenInfo) {
  $screens = [System.Windows.Forms.Screen]::AllScreens
  for ($i = 0; $i -lt $screens.Count; $i++) {
    $screen = $screens[$i]
    [pscustomobject]@{
      Number = $i + 1
      Primary = $screen.Primary
      DeviceName = $screen.DeviceName
      Bounds = "$($screen.Bounds.X),$($screen.Bounds.Y) $($screen.Bounds.Width)x$($screen.Bounds.Height)"
      WorkingArea = "$($screen.WorkingArea.X),$($screen.WorkingArea.Y) $($screen.WorkingArea.Width)x$($screen.WorkingArea.Height)"
    }
  }
  exit 0
}

function Limit-Text {
  param([string]$Value, [int]$Max = 110)
  if ([string]::IsNullOrWhiteSpace($Value)) { return "" }
  $clean = ($Value -replace "\s+", " ").Trim()
  if ($clean.Length -le $Max) { return $clean }
  return $clean.Substring(0, $Max - 1) + "..."
}

function Get-TargetScreen {
  $screens = [System.Windows.Forms.Screen]::AllScreens
  $monitorValue = $Monitor
  if ([string]::IsNullOrWhiteSpace($monitorValue)) { $monitorValue = "primary" }
  $monitorValue = $monitorValue.Trim().ToLowerInvariant()

  if ($monitorValue -eq "cursor") {
    return [System.Windows.Forms.Screen]::FromPoint([System.Windows.Forms.Cursor]::Position)
  }

  if ($monitorValue -match '^\d+$') {
    $index = [Math]::Max(0, [int]$monitorValue - 1)
    if ($index -lt $screens.Count) { return $screens[$index] }
  }

  if ($monitorValue -eq "primary") {
    foreach ($screen in $screens) {
      if ($screen.Primary) { return $screen }
    }
  }

  return [System.Windows.Forms.Screen]::PrimaryScreen
}

function New-Ease {
  param([System.Windows.Media.Animation.EasingMode]$Mode)
  $ease = New-Object System.Windows.Media.Animation.CubicEase
  $ease.EasingMode = $Mode
  return $ease
}

if ($Sound) {
  [System.Media.SystemSounds]::Asterisk.Play()
}

[xml]$xaml = @"
<Window
  xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
  xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
  Width="440"
  SizeToContent="Height"
  WindowStyle="None"
  AllowsTransparency="True"
  Background="Transparent"
  ShowInTaskbar="False"
  Topmost="True"
  ResizeMode="NoResize">
  <Border x:Name="Card" Margin="16" Padding="18" CornerRadius="28" Background="#F7FFFFFF" BorderBrush="#D9FFFFFF" BorderThickness="1">
    <Border.Effect>
      <DropShadowEffect BlurRadius="34" ShadowDepth="12" Opacity="0.24" Color="#1B2430" />
    </Border.Effect>
    <Grid>
      <Grid.ColumnDefinitions>
        <ColumnDefinition Width="52" />
        <ColumnDefinition Width="*" />
        <ColumnDefinition Width="30" />
      </Grid.ColumnDefinitions>
      <Border x:Name="WakeTab" Grid.ColumnSpan="3" Width="150" Height="92" Margin="274,32,0,0" HorizontalAlignment="Left" VerticalAlignment="Top" CornerRadius="24,0,0,24" Background="#111827" Opacity="0" IsHitTestVisible="False">
        <Grid>
          <Rectangle Width="5" Fill="#22D3EE" HorizontalAlignment="Left" />
          <StackPanel Margin="20,16,16,12">
            <DockPanel>
              <TextBlock Text="X3D" Foreground="White" FontFamily="Segoe UI" FontSize="15" FontWeight="Bold" />
              <Ellipse Width="9" Height="9" Fill="#22D3EE" DockPanel.Dock="Right" Margin="14,5,0,0" />
            </DockPanel>
            <TextBlock Text="Nieuwe mail" Foreground="#CBD5E1" FontFamily="Segoe UI" FontSize="12" Margin="0,6,0,0" />
          </StackPanel>
        </Grid>
      </Border>
      <Border Width="42" Height="42" CornerRadius="21" Background="#111827" VerticalAlignment="Top">
        <Grid>
          <Ellipse Fill="#22D3EE" Opacity="0.20" Width="30" Height="30" HorizontalAlignment="Right" VerticalAlignment="Top" />
          <TextBlock Text="X3D" Foreground="White" FontFamily="Segoe UI" FontSize="10" FontWeight="SemiBold" HorizontalAlignment="Center" VerticalAlignment="Center" />
        </Grid>
      </Border>
      <StackPanel Grid.Column="1" Margin="2,0,10,0">
        <DockPanel LastChildFill="True">
          <TextBlock x:Name="TitleText" DockPanel.Dock="Left" Foreground="#667085" FontFamily="Segoe UI" FontSize="12" FontWeight="SemiBold" TextTrimming="CharacterEllipsis" />
          <Border DockPanel.Dock="Right" Margin="8,0,0,0" Padding="8,3" CornerRadius="99" Background="#EAFBF6">
            <TextBlock Text="mail" Foreground="#047857" FontFamily="Segoe UI" FontSize="10" FontWeight="SemiBold" />
          </Border>
        </DockPanel>
        <TextBlock x:Name="SenderText" Margin="0,5,0,0" Foreground="#111827" FontFamily="Segoe UI" FontSize="14" FontWeight="SemiBold" TextTrimming="CharacterEllipsis" />
        <TextBlock x:Name="SubjectText" Margin="0,3,0,0" Foreground="#111827" FontFamily="Segoe UI" FontSize="16" FontWeight="SemiBold" TextWrapping="Wrap" MaxHeight="46" />
        <TextBlock x:Name="PreviewText" Margin="0,7,0,0" Foreground="#667085" FontFamily="Segoe UI" FontSize="12" TextTrimming="CharacterEllipsis" />
        <StackPanel Orientation="Horizontal" Margin="0,14,0,0">
          <Button x:Name="OpenButton" Content="Email openen" Padding="14,8" FontFamily="Segoe UI" FontSize="12" FontWeight="SemiBold" Foreground="White" Background="#111827" BorderBrush="#111827" BorderThickness="1" Cursor="Hand" />
        </StackPanel>
      </StackPanel>
      <Button x:Name="CloseButton" Grid.Column="2" Width="26" Height="26" VerticalAlignment="Top" Content="x" FontFamily="Segoe UI" FontSize="12" Foreground="#667085" Background="#00FFFFFF" BorderThickness="0" Cursor="Hand" />
    </Grid>
  </Border>
</Window>
"@

$reader = New-Object System.Xml.XmlNodeReader $xaml
$window = [Windows.Markup.XamlReader]::Load($reader)

$card = $window.FindName("Card")
$wakeTab = $window.FindName("WakeTab")
$titleText = $window.FindName("TitleText")
$senderText = $window.FindName("SenderText")
$subjectText = $window.FindName("SubjectText")
$previewText = $window.FindName("PreviewText")
$closeButton = $window.FindName("CloseButton")
$openButton = $window.FindName("OpenButton")

$titleText.Text = Limit-Text $Title 54
$senderText.Text = Limit-Text $Sender 72
$subjectText.Text = Limit-Text $Subject 110
$previewText.Text = Limit-Text $Preview 84

$script:closing = $false
$script:collapsed = $false
$script:targetLeft = 0.0
$script:collapsedLeft = 0.0
$script:timer = New-Object System.Windows.Threading.DispatcherTimer
$script:timer.Interval = [TimeSpan]::FromMilliseconds([Math]::Max(5000, $DurationMs))

function Bring-ToFront {
  $window.Topmost = $false
  $window.Topmost = $true
  $window.Activate() | Out-Null
  $handle = (New-Object System.Windows.Interop.WindowInteropHelper($window)).Handle
  if ($handle -ne [IntPtr]::Zero) {
    [X3DWin32]::SetWindowPos($handle, [X3DWin32]::HWND_TOPMOST, 0, 0, 0, 0, [X3DWin32]::SWP_NOMOVE -bor [X3DWin32]::SWP_NOSIZE -bor [X3DWin32]::SWP_SHOWWINDOW) | Out-Null
  }
}

function Animate-Left {
  param([double]$To, [int]$Ms = 360)
  $animation = New-Object System.Windows.Media.Animation.DoubleAnimation
  $animation.From = $window.Left
  $animation.To = $To
  $animation.Duration = [System.Windows.Duration]::new([TimeSpan]::FromMilliseconds($Ms))
  $animation.EasingFunction = New-Ease ([System.Windows.Media.Animation.EasingMode]::EaseOut)
  $window.BeginAnimation([System.Windows.Window]::LeftProperty, $animation)
}

function Animate-Opacity {
  param($Element, [double]$To, [int]$Ms = 180)
  $animation = New-Object System.Windows.Media.Animation.DoubleAnimation
  $animation.From = $Element.Opacity
  $animation.To = $To
  $animation.Duration = [System.Windows.Duration]::new([TimeSpan]::FromMilliseconds($Ms))
  $animation.EasingFunction = New-Ease ([System.Windows.Media.Animation.EasingMode]::EaseOut)
  $Element.BeginAnimation([System.Windows.UIElement]::OpacityProperty, $animation)
}

function Collapse-Notification {
  if ($script:closing -or $script:collapsed) { return }
  $script:timer.Stop()
  $script:collapsed = $true
  $wakeTab.IsHitTestVisible = $true
  Bring-ToFront
  Animate-Opacity $wakeTab 1 180
  Animate-Left $script:collapsedLeft 440
}

function Expand-Notification {
  if ($script:closing) { return }
  Bring-ToFront
  if (-not $script:collapsed) { return }
  $script:collapsed = $false
  Animate-Opacity $wakeTab 0 160
  $wakeTab.IsHitTestVisible = $false
  Animate-Left $script:targetLeft 360
  $script:timer.Stop()
  $script:timer.Start()
}

function Close-Animated {
  if ($script:closing) { return }
  $script:closing = $true
  $script:timer.Stop()
  $window.Close()
}

$script:timer.Add_Tick({ Collapse-Notification })

$card.Add_MouseLeftButtonUp({
  if ($script:collapsed) { Expand-Notification }
})

$closeButton.Add_Click({ Close-Animated })

$openButton.Add_Click({
  if (-not [string]::IsNullOrWhiteSpace($OpenUrl)) {
    Start-Process $OpenUrl
  }
  Close-Animated
})

$window.Add_SourceInitialized({
  $screen = Get-TargetScreen
  $work = $screen.WorkingArea
  $edgeValue = $Edge
  if ([string]::IsNullOrWhiteSpace($edgeValue)) { $edgeValue = "left" }
  $edgeValue = $edgeValue.Trim().ToLowerInvariant()

  $scale = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds.Width / [System.Windows.SystemParameters]::PrimaryScreenWidth
  if ($scale -le 0) { $scale = 1 }

  $leftDip = $work.Left / $scale
  $rightDip = $work.Right / $scale
  $topDip = $work.Top / $scale
  $visibleStrip = 150.0

  if ($edgeValue -eq "right") {
    $script:targetLeft = $rightDip - $window.Width - 22
    $script:collapsedLeft = $rightDip - $visibleStrip
    $window.Left = $script:targetLeft + 34
  } else {
    $script:targetLeft = $leftDip + 22
    $script:collapsedLeft = $leftDip - $window.Width + $visibleStrip
    $window.Left = $script:targetLeft - 34
  }
  $window.Top = $topDip + [Math]::Max(0, $TopOffset)
  $window.Opacity = 1

  Bring-ToFront
  Animate-Left $script:targetLeft 360
  $script:timer.Start()
})

[void]$window.ShowDialog()
