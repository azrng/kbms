---
title: Flutter Android 环境配置指南（Windows）
lang: zh-CN
date: 2026-06-01
publish: true
author: azrng
isOriginal: true
category:
  - flutter
tag:
  - install
  - flutter
# 是否显示到列表
article: false
---

### 导读
如果你正在 Windows 上尝试 Flutter 开发，并希望在安卓真机上运行你的第一个 App，那么环境配置绝对是第一个需要翻越的大山。😅
这篇文章将为你提供一条 **“最小化、不依赖 Android Studio”** 的配置路径。我会用清晰的步骤，带你从下载 SDK 到成功在手机上看到 App 运行，帮你**一次性跑通全流程**，避开常见的配置深坑。🚀

---

### 🚀 先读这个：你需要知道的
我们的目标非常明确，就是让你能**快速完成这三件事**，而不是成为 Android 专家：
1.  在 Windows 上安装好 Flutter。
2.  仅安装 Android SDK 命令行工具，**不依赖庞大的 Android Studio**。
3.  用 USB 连接手机，通过 `flutter run` 将项目部署到真机。

#### 🛠️ 这次要装什么？
下面表格列出了我们需要安装的核心组件，以及 Android Studio 的定位：

| 工具 | 作用 | 是否必须 |
| --- | --- | --- |
| **Flutter SDK** | 提供 `flutter` 和 `dart` 命令，是开发的核心 | ✅ 必须 |
| **JDK** | Android 构建环境依赖的 Java 工具包 | ✅ 必须 |
| **Android Command-line Tools** | 提供 `sdkmanager`，用于管理 SDK | ✅ 必须 |
| **Android SDK Platform** | 特定版本的 Android 平台 API | ✅ 必须 |
| **Android SDK Build-Tools** | 用于打包生成 APK 的工具 | ✅ 必须 |
| **Android Platform-Tools** | 提供 `adb` 命令，用于连接和调试手机 | ✅ 必须 |
| **Android Studio** | 图形化 IDE、模拟器、Logcat 等 | ❌ 非必须 |

#### 📝 本文约定
*   **所有命令**均在 **Windows PowerShell** 中执行。
*   为避免权限问题，**路径中请勿包含中文、空格或系统目录**（如 `C:\Program Files`）。本文示例使用 `D:\Soft` 作为工具目录。
*   本文配置的是**用户级环境变量**，无需管理员权限。
*   如果公司或学校网络无法访问 Google 源，可以先使用**Flutter 中国镜像**，文中会提供配置命令。

---

### 第 0 步：打开 PowerShell，我们开始！
后续所有操作都在 PowerShell 中进行。

**打开方式**：按 `Win` 键，输入 `PowerShell`，点击打开即可，**无需以管理员身份运行**。

先运行下面命令，确认 PowerShell 工作正常：
```powershell
$PSVersionTable.PSVersion
```
能看到版本号输出，我们就可以继续了。✅

### 第 1 步：规划你的专属目录
一个清晰的目录结构能避免很多后续麻烦。我们建议使用以下目录：

| 用途 | 示例路径 |
| --- | --- |
| Flutter SDK | `D:\Soft\flutter` |
| Pub 缓存 | `D:\Soft\flutter_pub_cache` |
| Android SDK | `D:\Soft\Android\Sdk` |
| Android SDK 临时下载目录 | `D:\Soft\Android\tmp` |
| 你的 Flutter 项目 | `D:\Code\your_flutter_app` |

现在，运行命令一键创建这些目录：
```powershell
New-Item -ItemType Directory -Force -Path `
  D:\Soft, `
  D:\Soft\Android\Sdk, `
  D:\Soft\Android\tmp, `
  D:\Soft\flutter_pub_cache, `
  D:\Code
```
看到创建目录的输出就说明成功了。如果提示目录已存在，也完全正常，可以继续。

### 第 2 步：下载并解压 Flutter SDK
**首先，去官网下载 SDK 压缩包。**

推荐从以下页面获取：
*   **Flutter 中国站（推荐）**：<https://docs.flutter.cn/install/manual>
*   **Flutter SDK 存档页**：<https://docs.flutter.cn/release/archive>

在发布页，请选择：
1.  操作系统：**Windows**
2.  渠道：**Stable**（稳定版）
3.  下载 **ZIP** 压缩包

下载的文件名通常类似 `flutter_windows_x.x.x-stable.zip`。**本文假设你已将其下载到 `D:\Soft\` 目录下。**

**然后，执行解压命令：**
```powershell
Expand-Archive `
  -LiteralPath D:\Soft\flutter_windows_3.41.9-stable.zip `
  -DestinationPath D:\Soft `
  -Force
```
⚠️ **注意**：请将命令中的文件名替换为你**实际下载的文件名**。

**验证解压结果：**
```powershell
Test-Path D:\Soft\flutter\bin\flutter.bat
```
输出 `True` 说明成功。如果输出 `False`，请检查 `D:\Soft` 目录下是否直接存在 `flutter` 文件夹，路径必须正确。

### 第 3 步：配置 Flutter 环境变量（关键步骤）
这一步是为了让你在任何目录下都能直接使用 `flutter` 命令。

**运行以下命令，将 Flutter 和 Dart 加入系统 PATH，并设置缓存目录：**
```powershell
$flutterBin = 'D:\Soft\flutter\bin'
$pubCache = 'D:\Soft\flutter_pub_cache'

$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
$parts = @()
if (-not [string]::IsNullOrWhiteSpace($userPath)) {
    $parts = $userPath -split ';' | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
}
if ($parts -notcontains $flutterBin) {
    $parts += $flutterBin
}

[Environment]::SetEnvironmentVariable('Path', ($parts -join ';'), 'User')
[Environment]::SetEnvironmentVariable('PUB_CACHE', $pubCache, 'User')
```
💡 `PUB_CACHE` 是 Dart 的包缓存目录，单独设置可以避免权限问题。

**如果你在国内网络，强烈建议配置镜像，加速后续包下载：**
```powershell
[Environment]::SetEnvironmentVariable('PUB_HOSTED_URL', 'https://pub.flutter-io.cn', 'User')
[Environment]::SetEnvironmentVariable('FLUTTER_STORAGE_BASE_URL', 'https://storage.flutter-io.cn', 'User')
```
**为了让当前 PowerShell 窗口立即生效，执行：**
```powershell
$env:Path = (([Environment]::GetEnvironmentVariable('Path', 'Machine')), ([Environment]::GetEnvironmentVariable('Path', 'User'))) -join ';'
$env:PUB_CACHE = [Environment]::GetEnvironmentVariable('PUB_CACHE', 'User')
$env:PUB_HOSTED_URL = [Environment]::GetEnvironmentVariable('PUB_HOSTED_URL', 'User')
$env:FLUTTER_STORAGE_BASE_URL = [Environment]::GetEnvironmentVariable('FLUTTER_STORAGE_BASE_URL', 'User')
```
**最后，验证安装：**
```powershell
flutter --version
dart --version
```
看到版本号输出，恭喜你，Flutter 已就绪！🎉 如果提示命令未找到，请**关闭并重新打开一个 PowerShell 窗口**再试。

### 第 4 步：准备 Java 环境（JDK）
Android 构建离不开 Java。请先检查电脑是否已有 Java 环境：
```powershell
where.exe java
java -version
```
如果能看到路径和版本，可以跳过安装。如果没有，你需要安装 **JDK 17 或更高版本**。

本文示例使用 Visual Studio 自带的 OpenJDK。**请根据你的实际情况修改下面的 `$javaHome` 路径：**
```powershell
$javaHome = 'D:\Program Files\Microsoft Visual Studio\Shared\Android\openjdk\jdk-21.0.8'

[Environment]::SetEnvironmentVariable('JAVA_HOME', $javaHome, 'User')

$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
$parts = @()
if (-not [string]::IsNullOrWhiteSpace($userPath)) {
    $parts = $userPath -split ';' | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
}
$javaBin = Join-Path $javaHome 'bin'
if ($parts -notcontains $javaBin) {
    $parts += $javaBin
}
[Environment]::SetEnvironmentVariable('Path', ($parts -join ';'), 'User')
```
**让当前窗口生效并验证：**
```powershell
$env:JAVA_HOME = [Environment]::GetEnvironmentVariable('JAVA_HOME', 'User')
$env:Path = (([Environment]::GetEnvironmentVariable('Path', 'Machine')), ([Environment]::GetEnvironmentVariable('Path', 'User'))) -join ';'

echo $env:JAVA_HOME
java -version
```
`JAVA_HOME` 变量输出正确路径，`java -version` 输出版本号，即表示成功。

### 第 5 步 & 第 6 步：下载并安装 Android Command-line Tools
**我们不需要安装完整的 Android Studio，只需命令行工具。**

**下载**：访问 [Android Studio 官网下载页](https://developer.android.com/studio)，找到「Command line tools only」部分，下载 Windows 版本。

**下载后，请将文件重命名并移动到** `D:\Soft\Android\tmp\commandlinetools-win.zip`。你也可以用命令下载：
```powershell
$url = 'https://dl.google.com/android/repository/commandlinetools-win-14742923_latest.zip'
$zip = 'D:\Soft\Android\tmp\commandlinetools-win.zip'

curl.exe -L --fail --retry 5 --retry-delay 5 --connect-timeout 30 --output $zip $url
```
⚠️ **检查 ZIP 是否完整**：如果打开 ZIP 文件报错，说明下载不完整，请删除后重下。

**解压到规范目录**：Android 命令行工具**必须**放在 `Sdk\cmdline-tools\latest` 这个特定路径下。运行以下命令完成解压和移动：
```powershell
$sdk = 'D:\Soft\Android\Sdk'
$zip = 'D:\Soft\Android\tmp\commandlinetools-win.zip'
$extract = 'D:\Soft\Android\tmp\cmdline-extract'
$latest = Join-Path $sdk 'cmdline-tools\latest'

Remove-Item -LiteralPath $extract -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -LiteralPath $latest -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path $extract, (Split-Path $latest -Parent) | Out-Null

Expand-Archive -LiteralPath $zip -DestinationPath $extract -Force
Move-Item -LiteralPath (Join-Path $extract 'cmdline-tools') -Destination $latest
```
**验证 `sdkmanager` 命令：**
```powershell
Test-Path D:\Soft\Android\Sdk\cmdline-tools\latest\bin\sdkmanager.bat
```
输出 `True` 即成功。

### 第 7 步：配置 Android SDK 环境变量
**同样，我们需要让系统找到 `adb` 和 `sdkmanager`。**
```powershell
$sdk = 'D:\Soft\Android\Sdk'

[Environment]::SetEnvironmentVariable('ANDROID_SDK_ROOT', $sdk, 'User')
[Environment]::SetEnvironmentVariable('ANDROID_HOME', $sdk, 'User')

$addPaths = @(
  (Join-Path $sdk 'platform-tools'),
  (Join-Path $sdk 'cmdline-tools\latest\bin')
)

$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
$parts = @()
if (-not [string]::IsNullOrWhiteSpace($userPath)) {
    $parts = $userPath -split ';' | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
}
foreach ($path in $addPaths) {
    if ($parts -notcontains $path) {
        $parts += $path
    }
}
[Environment]::SetEnvironmentVariable('Path', ($parts -join ';'), 'User')
```
**让当前窗口生效：**
```powershell
$env:ANDROID_SDK_ROOT = [Environment]::GetEnvironmentVariable('ANDROID_SDK_ROOT', 'User')
$env:ANDROID_HOME = [Environment]::GetEnvironmentVariable('ANDROID_HOME', 'User')
$env:JAVA_HOME = [Environment]::GetEnvironmentVariable('JAVA_HOME', 'User')
$env:Path = (([Environment]::GetEnvironmentVariable('Path', 'Machine')), ([Environment]::GetEnvironmentVariable('Path', 'User'))) -join ';'
```
💡 `ANDROID_SDK_ROOT` 和 `ANDROID_HOME` 通常设置为相同值。
**验证配置：**
```powershell
echo $env:ANDROID_SDK_ROOT
sdkmanager --version
```
看到 SDK 路径和版本号，环境变量配置完成。

### 第 8 步：安装必要的 Android SDK 组件
**首先，接受所有 SDK 许可协议：**
```powershell
1..30 | ForEach-Object { 'y' } | sdkmanager --licenses
```
看到 `All SDK package licenses accepted` 即可。

**然后，安装真机调试和构建所需的组件：**
```powershell
sdkmanager "platform-tools" "platforms;android-36" "build-tools;36.0.0" "build-tools;28.0.3"
```
💡 这条命令安装了 `adb`（platform-tools）、Android 36 平台和对应的构建工具。`build-tools;28.0.3` 是为了兼容一些旧项目。

**最后，告诉 Flutter 使用我们刚安装好的 SDK：**
```powershell
flutter config --android-sdk D:\Soft\Android\Sdk
```

### 第 9 步：最终检查 —— `flutter doctor`
**这是验证所有配置是否成功的“终极考试”。**

⚠️ **重要提示**：如果刚刚配置了环境变量，**强烈建议关闭当前 PowerShell，再重新打开一个新的窗口**执行以下检查，否则可能读不到最新配置。

**运行诊断命令：**
```powershell
flutter doctor -v
adb version
flutter devices
```
你需要重点关注 `flutter doctor -v` 输出中 **`Android toolchain`** 这一项。

**理想状态是：**
```text
[√] Android toolchain - develop for Android devices
```
如果 Chrome 那一项有叉号，请忽略，它只影响 Flutter Web 开发。

### 第 10 步：连接你的 Android 手机！
手机端操作很简单：

1.  **开启开发者选项**：进入手机「设置」->「关于手机」，连续点击「版本号」7次。
2.  **开启 USB 调试**：回到「设置」->「开发者选项」，开启「USB 调试」。**强烈建议同时开启「USB安装」或「允许通过USB安装应用」等相关选项**。
3.  **连接电脑**：使用**数据线**连接手机和电脑。手机通知栏将 USB 用途改为「文件传输」。当手机弹出授权提示时，勾选「一律允许」并点击「允许」。

如果没有弹出授权窗口，可以尝试：
```powershell
adb kill-server
adb start-server
adb devices -l
```

### 第 11 步：确认电脑识别手机
**运行命令查看设备列表：**
```powershell
adb devices -l
```
你可能会看到以下几种情况：

| 输出状态 | 含义 | 下一步 |
| --- | --- | --- |
| `device` | 🟢 手机已授权，连接成功！ | 可以运行 `flutter run` |
| `unauthorized` | 🟡 手机连接但未授权 | 查看手机弹窗，点击允许 |
| 空列表 | 🔴 电脑未识别到手机 | 检查USB线、USB模式、开发者选项 |

**成功连接的输出类似：**
```text
List of devices attached
ABCDEF123456 device product:xxx model:xxx device:xxx transport_id:1
```

### 第 12 步：运行你的第一个 Flutter 项目到真机！
**终于到了激动人心的时刻！**

1.  **进入你的项目目录**：
    ```powershell
    cd D:\Code\your_flutter_app
    ```
    请确保该目录下存在 `pubspec.yaml`、`lib` 和 `android` 文件夹。

2.  **获取项目依赖**：
    ```powershell
    flutter pub get
    ```

3.  **查看可用设备**：
    ```powershell
    flutter devices
    ```
    你应该能看到你的 Android 手机出现在列表中。

4.  **启动 App**：
    ```powershell
    flutter run
    ```
    🚀 **首次运行会比较慢**，因为需要下载 Gradle 和依赖并编译 Android 工程，请耐心等待。

**运行成功后**，手机上会自动安装并打开 App，你的 PowerShell 会进入调试控制台。

### 第 13 步 & 第 14 步：调试与日志
在 `flutter run` 的调试控制台中，你可以：
*   按 `r`：**Hot reload**，用于更新 UI 代码。
*   按 `R`：**Hot restart**，用于重启应用。
*   按 `q`：退出调试。

**查看日志**：
*   查看 Flutter 日志：`flutter logs`
*   查看 Android 系统日志：`adb logcat`

### 第 15 步：手动构建与安装 APK
你也可以不依赖 `flutter run`，手动构建和安装：
```powershell
# 构建 Debug APK
flutter build apk --debug

# 安装到手机（-r 表示覆盖安装）
adb install -r .\build\app\outputs\flutter-apk\app-debug.apk
```

---

### ❓ 常见问题与排错指南
遇到问题别慌，这里汇总了高频坑点和解决方案：

#### 1. `flutter`/`sdkmanager`/`java` 命令找不到
**原因**：环境变量未生效。
**解决**：**关闭并重新打开 PowerShell**，或者执行刷新命令：
```powershell
$env:Path = (([Environment]::GetEnvironmentVariable('Path', 'Machine')), ([Environment]::GetEnvironmentVariable('Path', 'User'))) -join ';'
# 其他相关变量也需要刷新，参考第9步
```

#### 2. `flutter doctor` 找不到 Android SDK
**解决**：明确告诉 Flutter SDK 路径：
```powershell
flutter config --android-sdk D:\Soft\Android\Sdk
flutter doctor -v
```

#### 3. `adb devices` 是空列表或显示 `unauthorized`
**解决**：
1.  换一根**确认能传文件的 USB 线**和电脑 USB 口。
2.  手机 USB 模式选「文件传输」。
3.  确认「开发者选项」和「USB 调试」已开启。
4.  对于 `unauthorized`，检查手机屏幕是否有授权弹窗。
5.  尝试在开发者选项中「撤销 USB 调试授权」，然后重新插线授权。

#### 4. 首次 `flutter run` 超时或卡住（网络问题）
这是国内开发者最常见的问题！下载 Gradle、Maven 依赖需要科学上网。

**解决方案：**
*   **确保已配置国内镜像**（第3步的 `PUB_HOSTED_URL` 和 `FLUTTER_STORAGE_BASE_URL`）。
*   **为 Gradle Wrapper 配置国内镜像**（修改项目 `android/gradle/wrapper/gradle-wrapper.properties`）：
    ```properties
    # 将 distributionUrl 改为腾讯镜像
    distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-8.9-all.zip
    ```
*   **用详细日志定位问题**：
    ```powershell
    flutter build apk --debug -v
    ```
*   **提前安装 NDK**，避免构建时自动下载失败：
    ```powershell
    sdkmanager "ndk;28.2.13676358"  # 版本号参考 flutter doctor 提示
    ```

#### 5. 构建报错 `[CXX1101] NDK ... did not have a source.properties file`
**原因**：NDK 文件损坏。
**解决**：删除损坏的目录，让 Gradle 自动重新下载。
```powershell
Remove-Item -LiteralPath "D:\Soft\Android\Sdk\ndk\28.2.13676358" -Recurse -Force
```

#### 6. 手机提示禁止 USB 安装
在「开发者选项」或「安全设置」中，寻找并开启：
*   USB 安装
*   允许通过USB安装应用
*   USB调试（安全设置）

---

### ✅ 最小验证清单
完成所有配置后，请确保以下命令都能成功执行：

```powershell
# 1. 确认基本命令
flutter --version
java -version
sdkmanager --version
adb version

# 2. 全面诊断
flutter doctor -v

# 3. 连接手机后检查
adb devices -l
flutter devices

# 4. 最终试跑（进入你的项目目录）
cd D:\Code\your_flutter_app
flutter run
```
**成功标准**：`flutter doctor` 的 Android toolchain 通过，`adb devices` 看到手机状态为 `device`，`flutter run` 能将 App 成功安装到手机并启动。

---

### 写在最后
恭喜你！🎉 按照这篇指南，你已经成功搭建了一套轻量、高效的 Flutter Android 开发环境，无需被庞大的 Android Studio 所困扰。现在，你可以尽情享受在真机上调试和运行 Flutter App 的乐趣了。

**如果这篇文章帮你省下了数小时甚至数天的配置时间，希望你能点个 👍「赞」和 🌟「在看」，或者把它分享给更多需要的朋友。** 如果在配置过程中遇到了文中未提及的新问题，**欢迎在评论区留言**，我们一起交流解决！

Happy Fluttering! 🚀