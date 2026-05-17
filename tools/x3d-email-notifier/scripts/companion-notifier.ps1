param(
  [string]$Monitor = "1",
  [string]$Edge = "left",
  [int]$TopOffset = 28,
  [int]$DurationMs = 12000,
  [string]$OpenUrl = "https://web0147.zxcs.be/roundcube/?_task=mail&_mbox=INBOX",
  [string]$LatestPath = "",
  [int]$MaxNotificationAgeSeconds = 300,
  [switch]$ResetPosition
)

Add-Type -AssemblyName PresentationFramework
Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase
Add-Type -AssemblyName System.Windows.Forms

Add-Type @"
using System;
using System.Runtime.InteropServices;

public static class X3DCompanionWin32 {
  [DllImport("user32.dll")]
  public static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);

  public static readonly IntPtr HWND_TOPMOST = new IntPtr(-1);
  public const UInt32 SWP_NOSIZE = 0x0001;
  public const UInt32 SWP_NOMOVE = 0x0002;
  public const UInt32 SWP_SHOWWINDOW = 0x0040;
}
"@

$toolDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$dataDir = Join-Path $toolDir "data"
if (-not (Test-Path -LiteralPath $dataDir)) {
  New-Item -ItemType Directory -Force -Path $dataDir | Out-Null
}
if ([string]::IsNullOrWhiteSpace($LatestPath)) {
  $LatestPath = Join-Path $dataDir "latest-notification.json"
}
$positionPath = Join-Path $dataDir "companion-position.json"
$logPath = Join-Path $dataDir "companion.log"

function Write-CompanionLog {
  param([string]$Message)
  try {
    Add-Content -LiteralPath $logPath -Value ("{0} {1}" -f (Get-Date -Format "s"), $Message)
  } catch {
  }
}

$created = $false
$mutex = New-Object System.Threading.Mutex($true, "Global\X3DPrintsEmailNotifierCompanion", [ref]$created)
if (-not $created) {
  Write-CompanionLog "existing instance detected; exiting"
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

function Read-LatestNotification {
  if (-not (Test-Path -LiteralPath $LatestPath)) { return $null }
  try {
    $notification = Get-Content -LiteralPath $LatestPath -Raw | ConvertFrom-Json
    if ($null -ne $notification.createdAt) {
      $createdAt = [DateTimeOffset]::Parse([string]$notification.createdAt)
      $ageSeconds = ([DateTimeOffset]::UtcNow - $createdAt.ToUniversalTime()).TotalSeconds
      if ($ageSeconds -gt [Math]::Max(30, $MaxNotificationAgeSeconds)) {
        return $null
      }
    }
    return $notification
  } catch {
    return $null
  }
}

function Clear-LatestNotification {
  try {
    if (Test-Path -LiteralPath $LatestPath) {
      Remove-Item -LiteralPath $LatestPath -Force
    }
  } catch {
  }
}

[xml]$xaml = @"
<Window
  xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
  xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
  Width="440"
  Height="214"
  Title="X3DPrints Mail"
  WindowStyle="None"
  AllowsTransparency="True"
  Background="Transparent"
  ShowInTaskbar="False"
  Topmost="True"
  ShowActivated="False"
  ResizeMode="NoResize">
  <Window.Resources>
    <Style x:Key="PrimaryButtonStyle" TargetType="Button">
      <Setter Property="Template">
        <Setter.Value>
          <ControlTemplate TargetType="Button">
            <Border x:Name="ButtonChrome" Background="{TemplateBinding Background}" BorderBrush="{TemplateBinding BorderBrush}" BorderThickness="1" CornerRadius="14" Padding="{TemplateBinding Padding}">
              <ContentPresenter HorizontalAlignment="Center" VerticalAlignment="Center" />
            </Border>
            <ControlTemplate.Triggers>
              <Trigger Property="IsMouseOver" Value="True">
                <Setter TargetName="ButtonChrome" Property="Background" Value="#0B1220" />
              </Trigger>
              <Trigger Property="IsPressed" Value="True">
                <Setter TargetName="ButtonChrome" Property="Opacity" Value="0.86" />
              </Trigger>
            </ControlTemplate.Triggers>
          </ControlTemplate>
        </Setter.Value>
      </Setter>
    </Style>
    <Style x:Key="ClosePillButtonStyle" TargetType="Button">
      <Setter Property="Template">
        <Setter.Value>
          <ControlTemplate TargetType="Button">
            <Border x:Name="ButtonChrome" Background="{TemplateBinding Background}" CornerRadius="10">
              <ContentPresenter HorizontalAlignment="Center" VerticalAlignment="Center" />
            </Border>
            <ControlTemplate.Triggers>
              <Trigger Property="IsMouseOver" Value="True">
                <Setter TargetName="ButtonChrome" Property="Background" Value="#EEF2F7" />
              </Trigger>
              <Trigger Property="IsPressed" Value="True">
                <Setter TargetName="ButtonChrome" Property="Opacity" Value="0.75" />
              </Trigger>
            </ControlTemplate.Triggers>
          </ControlTemplate>
        </Setter.Value>
      </Setter>
    </Style>
  </Window.Resources>
  <Grid Background="Transparent">
    <Border x:Name="Card" Margin="16" Padding="18" CornerRadius="28" Background="#F7FFFFFF" BorderBrush="#D9FFFFFF" BorderThickness="1" Cursor="Arrow">
      <Border.Effect>
        <DropShadowEffect BlurRadius="34" ShadowDepth="12" Opacity="0.24" Color="#1B2430" />
      </Border.Effect>
      <Grid>
        <Grid.ColumnDefinitions>
          <ColumnDefinition Width="52" />
          <ColumnDefinition Width="*" />
          <ColumnDefinition Width="30" />
        </Grid.ColumnDefinitions>

        <Border Width="42" Height="42" CornerRadius="21" Background="#111827" VerticalAlignment="Top">
          <Grid>
            <Ellipse Fill="#22D3EE" Opacity="0.20" Width="30" Height="30" HorizontalAlignment="Right" VerticalAlignment="Top" />
            <TextBlock Text="X3D" Foreground="White" FontFamily="Segoe UI" FontSize="10" FontWeight="SemiBold" HorizontalAlignment="Center" VerticalAlignment="Center" />
          </Grid>
        </Border>

        <StackPanel Grid.Column="1" Margin="2,0,10,0">
          <DockPanel LastChildFill="True">
            <TextBlock x:Name="TitleText" DockPanel.Dock="Left" Text="X3DPrints" Foreground="#667085" FontFamily="Segoe UI" FontSize="12" FontWeight="SemiBold" TextTrimming="CharacterEllipsis" />
            <Border DockPanel.Dock="Right" Margin="8,0,0,0" Padding="8,3" CornerRadius="99" Background="#EAFBF6">
              <TextBlock x:Name="StatusPillText" Text="mail" Foreground="#047857" FontFamily="Segoe UI" FontSize="10" FontWeight="SemiBold" />
            </Border>
          </DockPanel>
          <TextBlock x:Name="SenderText" Margin="0,5,0,0" Foreground="#111827" FontFamily="Segoe UI" FontSize="14" FontWeight="SemiBold" TextTrimming="CharacterEllipsis" />
          <TextBlock x:Name="SubjectText" Margin="0,3,0,0" Foreground="#111827" FontFamily="Segoe UI" FontSize="16" FontWeight="SemiBold" TextWrapping="Wrap" MaxHeight="46" />
          <TextBlock x:Name="PreviewText" Margin="0,7,0,0" Foreground="#667085" FontFamily="Segoe UI" FontSize="12" TextTrimming="CharacterEllipsis" />
          <StackPanel Orientation="Horizontal" Margin="0,14,0,0">
            <Button x:Name="OpenButton" Content="Email openen" Style="{StaticResource PrimaryButtonStyle}" Padding="14,8" FontFamily="Segoe UI" FontSize="12" FontWeight="SemiBold" Foreground="White" Background="#111827" BorderBrush="#111827" BorderThickness="1" Cursor="Hand" />
          </StackPanel>
        </StackPanel>

        <Button x:Name="CloseButton" Grid.Column="2" Width="26" Height="26" VerticalAlignment="Top" Content="x" FontFamily="Segoe UI" FontSize="12" Foreground="#667085" Background="#00FFFFFF" BorderThickness="0" Cursor="Hand" />
      </Grid>
    </Border>

    <Border x:Name="WakeTab" Width="150" Height="56" Margin="274,78,0,0" HorizontalAlignment="Left" VerticalAlignment="Top" CornerRadius="0,20,20,0" Background="#F7FFFFFF" BorderBrush="#DCE8F0F8" BorderThickness="1" Opacity="0" Cursor="Hand" IsHitTestVisible="False">
      <Border.Effect>
        <DropShadowEffect BlurRadius="22" ShadowDepth="8" Opacity="0.18" Color="#1B2430" />
      </Border.Effect>
      <Grid>
        <Rectangle x:Name="WakeAccent" Width="4" Fill="#22D3EE" HorizontalAlignment="Left" RadiusX="2" RadiusY="2" />
        <StackPanel Margin="16,8,14,8">
          <DockPanel>
            <TextBlock Text="X3D" Foreground="#111827" FontFamily="Segoe UI" FontSize="13" FontWeight="Bold" />
            <Ellipse x:Name="WakeDot" Width="8" Height="8" Fill="#22D3EE" DockPanel.Dock="Right" Margin="10,5,0,0" />
          </DockPanel>
          <TextBlock x:Name="WakeStateText" Text="Mail standby" Foreground="#667085" FontFamily="Segoe UI" FontSize="11.5" Margin="0,4,0,0" />
        </StackPanel>
        <Button x:Name="WakeCloseButton" AutomationProperties.Name="Notifier sluiten" Width="22" Height="22" HorizontalAlignment="Right" VerticalAlignment="Top" Margin="0,5,7,0" Content="x" Style="{StaticResource ClosePillButtonStyle}" FontFamily="Segoe UI" FontSize="11" Foreground="#64748B" Background="#00FFFFFF" BorderThickness="0" Cursor="Hand" />
      </Grid>
    </Border>
  </Grid>
</Window>
"@

$reader = New-Object System.Xml.XmlNodeReader $xaml
$window = [Windows.Markup.XamlReader]::Load($reader)

$card = $window.FindName("Card")
$wakeTab = $window.FindName("WakeTab")
$wakeAccent = $window.FindName("WakeAccent")
$wakeDot = $window.FindName("WakeDot")
$wakeStateText = $window.FindName("WakeStateText")
$wakeCloseButton = $window.FindName("WakeCloseButton")
$titleText = $window.FindName("TitleText")
$senderText = $window.FindName("SenderText")
$subjectText = $window.FindName("SubjectText")
$previewText = $window.FindName("PreviewText")
$statusPillText = $window.FindName("StatusPillText")
$closeButton = $window.FindName("CloseButton")
$openButton = $window.FindName("OpenButton")

$script:closing = $false
$script:collapsed = $false
$script:hasActiveNotification = $false
$script:latestId = ""
$script:currentOpenUrl = $OpenUrl
$script:targetLeft = 0.0
$script:collapsedLeft = 0.0
$script:targetTop = 0.0
$script:edgeValue = "left"
$script:timer = New-Object System.Windows.Threading.DispatcherTimer
$script:timer.Interval = [TimeSpan]::FromMilliseconds([Math]::Max(5000, $DurationMs))
$script:pollTimer = New-Object System.Windows.Threading.DispatcherTimer
$script:pollTimer.Interval = [TimeSpan]::FromMilliseconds(900)

function Get-WorkAreaDip {
  $screen = Get-TargetScreen
  $work = $screen.WorkingArea
  $source = [System.Windows.PresentationSource]::FromVisual($window)

  if ($null -ne $source -and $null -ne $source.CompositionTarget) {
    $transform = $source.CompositionTarget.TransformFromDevice
    $topLeft = $transform.Transform([System.Windows.Point]::new($work.Left, $work.Top))
    $bottomRight = $transform.Transform([System.Windows.Point]::new($work.Right, $work.Bottom))
    return [pscustomobject]@{
      Left = $topLeft.X
      Top = $topLeft.Y
      Right = $bottomRight.X
      Bottom = $bottomRight.Y
    }
  }

  $scale = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds.Width / [System.Windows.SystemParameters]::PrimaryScreenWidth
  if ($scale -le 0) { $scale = 1 }
  return [pscustomobject]@{
    Left = $work.Left / $scale
    Top = $work.Top / $scale
    Right = $work.Right / $scale
    Bottom = $work.Bottom / $scale
  }
}

function Save-Position {
  try {
    [pscustomobject]@{
      left = $window.Left
      top = $window.Top
      monitor = $Monitor
      edge = $Edge
      savedAt = (Get-Date).ToString("o")
    } | ConvertTo-Json | Set-Content -LiteralPath $positionPath -Encoding UTF8
  } catch {
  }
}

function Load-SavedPosition {
  if ($ResetPosition -or -not (Test-Path -LiteralPath $positionPath)) { return $false }
  try {
    $stored = Get-Content -LiteralPath $positionPath -Raw | ConvertFrom-Json
    if ($null -ne $stored.left -and $null -ne $stored.top) {
      $script:targetLeft = [double]$stored.left
      $script:targetTop = [double]$stored.top
      return $true
    }
  } catch {
  }
  return $false
}

function Set-WindowTargets {
  $work = Get-WorkAreaDip
  $edgeValue = $Edge
  if ([string]::IsNullOrWhiteSpace($edgeValue)) { $edgeValue = "left" }
  $edgeValue = $edgeValue.Trim().ToLowerInvariant()
  $script:edgeValue = $edgeValue

  if ($edgeValue -eq "right") {
    $wakeTab.Margin = [System.Windows.Thickness]::new(16, 78, 0, 0)
    $wakeTab.CornerRadius = [System.Windows.CornerRadius]::new(20, 0, 0, 20)
    $wakeAccent.HorizontalAlignment = [System.Windows.HorizontalAlignment]::Right
  } else {
    $wakeTab.Margin = [System.Windows.Thickness]::new(274, 78, 0, 0)
    $wakeTab.CornerRadius = [System.Windows.CornerRadius]::new(0, 20, 20, 0)
    $wakeAccent.HorizontalAlignment = [System.Windows.HorizontalAlignment]::Left
  }

  if (-not (Load-SavedPosition)) {
    if ($edgeValue -eq "right") {
      $script:targetLeft = $work.Right - $window.Width - 22
    } else {
      $script:targetLeft = $work.Left + 22
    }
    $script:targetTop = $work.Top + [Math]::Max(0, $TopOffset)
  }

  if ($edgeValue -eq "right") {
    $script:collapsedLeft = $work.Right - 166
  } else {
    $script:collapsedLeft = $work.Left - 274
  }
}

function Bring-ToFront {
  $window.Topmost = $false
  $window.Topmost = $true
  $handle = (New-Object System.Windows.Interop.WindowInteropHelper($window)).Handle
  if ($handle -ne [IntPtr]::Zero) {
    [X3DCompanionWin32]::SetWindowPos($handle, [X3DCompanionWin32]::HWND_TOPMOST, 0, 0, 0, 0, [X3DCompanionWin32]::SWP_NOMOVE -bor [X3DCompanionWin32]::SWP_NOSIZE -bor [X3DCompanionWin32]::SWP_SHOWWINDOW) | Out-Null
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

function Set-Standby {
  $script:hasActiveNotification = $false
  $wakeStateText.Text = "Mail standby"
  $wakeDot.Fill = [System.Windows.Media.Brushes]::SlateGray
  $statusPillText.Text = "mail"
}

function Collapse-Notification {
  if ($script:closing -or $script:collapsed) { return }
  $script:timer.Stop()
  $script:collapsed = $true
  $wakeTab.IsHitTestVisible = $true
  $card.IsHitTestVisible = $false
  Bring-ToFront
  Animate-Opacity $card 0 120
  Animate-Opacity $wakeTab 1 180
  Animate-Left $script:collapsedLeft 440
}

function Expand-Notification {
  if ($script:closing -or -not $script:hasActiveNotification) { return }
  Bring-ToFront
  if (-not $script:collapsed) { return }
  $script:collapsed = $false
  $card.IsHitTestVisible = $true
  Animate-Opacity $card 1 160
  Animate-Opacity $wakeTab 0 160
  $wakeTab.IsHitTestVisible = $false
  Animate-Left $script:targetLeft 360
  $script:timer.Stop()
  $script:timer.Start()
}

function Dismiss-Notification {
  $script:timer.Stop()
  Clear-LatestNotification
  Set-Standby
  if (-not $script:collapsed) {
    Collapse-Notification
  } else {
    $wakeStateText.Text = "Mail standby"
    $wakeDot.Fill = [System.Windows.Media.Brushes]::SlateGray
  }
}

function Close-Window {
  if ($script:closing) { return }
  $script:closing = $true
  Clear-LatestNotification
  $script:timer.Stop()
  $script:pollTimer.Stop()
  $window.Close()
}

function Apply-Notification {
  param($Notification)
  if ($null -eq $Notification) { return }

  $script:latestId = [string]$Notification.id
  $script:currentOpenUrl = if ([string]::IsNullOrWhiteSpace($Notification.openUrl)) { $OpenUrl } else { [string]$Notification.openUrl }
  $script:hasActiveNotification = $true

  $titleText.Text = Limit-Text ([string]$Notification.title) 54
  $senderText.Text = Limit-Text ([string]$Notification.sender) 72
  $subjectText.Text = Limit-Text ([string]$Notification.subject) 110
  $previewText.Text = Limit-Text ([string]$Notification.preview) 84
  $wakeStateText.Text = "Nieuwe mail"
  $wakeDot.Fill = [System.Windows.Media.Brushes]::Cyan
  $statusPillText.Text = "nieuw"

  Bring-ToFront
  $script:collapsed = $true
  Expand-Notification
}

$script:timer.Add_Tick({ Collapse-Notification })

$script:pollTimer.Add_Tick({
  $notification = Read-LatestNotification
  if ($null -ne $notification -and [string]$notification.id -ne $script:latestId) {
    Apply-Notification $notification
  }
})

$wakeTab.Add_MouseLeftButtonUp({ Expand-Notification })
$wakeCloseButton.Add_Click({
  param($sender, $eventArgs)
  $eventArgs.Handled = $true
  Close-Window
})
$card.Add_MouseLeftButtonUp({
  if ($script:collapsed) { Expand-Notification }
})

$card.Add_MouseLeftButtonDown({
  if (-not $script:collapsed -and $_.ChangedButton -eq [System.Windows.Input.MouseButton]::Left) {
    try {
      $window.DragMove()
      Save-Position
    } catch {
    }
  }
})

$closeButton.Add_Click({
  Dismiss-Notification
})

$openButton.Add_Click({
  if (-not [string]::IsNullOrWhiteSpace($script:currentOpenUrl)) {
    Start-Process $script:currentOpenUrl
  }
  Close-Window
})

$window.Add_SourceInitialized({
  Set-WindowTargets
  $window.Left = $script:targetLeft - 34
  $window.Top = $script:targetTop
  $window.Opacity = 1

  Bring-ToFront
  Write-CompanionLog ("shown left={0} top={1} targetLeft={2} collapsedLeft={3} monitor={4} edge={5}" -f $window.Left, $window.Top, $script:targetLeft, $script:collapsedLeft, $Monitor, $Edge)

  $notification = Read-LatestNotification
  if ($null -ne $notification) {
    Apply-Notification $notification
  } else {
    Set-Standby
    Collapse-Notification
  }
  $script:pollTimer.Start()
})

try {
  [void]$window.ShowDialog()
} finally {
  $script:timer.Stop()
  $script:pollTimer.Stop()
  $mutex.ReleaseMutex() | Out-Null
  $mutex.Dispose()
}
