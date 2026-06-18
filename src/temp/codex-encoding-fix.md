---
title: Codex 乱码问题解决方案
lang: zh-CN
date: 2026-06-18
publish: true
author: azrng
isOriginal: true
category:
  - ai
  - codex
tag:
  - Codex
  - 乱码
  - 编码
---

## 导读

在使用 OpenAI Codex 进行代码生成或处理时，输出内容中的乱码问题屡见不鲜，尤以中文场景最为典型。本文系统梳理该问题的成因，并提供切实可行的解决方案。

## 问题表现

| 类型 | 具体表现 |
|------|----------|
| 中文字符异常 | 生成的中文显示为方块或问号 |
| 特殊符号丢失 | 代码注释、字符串内容出现乱码 |
| 编码格式不一致 | 输入与输出的编码格式不匹配 |

## 成因分析

### 编码格式不匹配

Codex 默认采用 UTF-8 编码。当输入数据使用 GBK、GB2312 等其他编码格式时，即会产生乱码。

### 终端编码不兼容

Windows 系统默认终端（PowerShell 5.x / cmd）使用 GBK 编码，而 Codex 输出为 UTF-8，两者不兼容导致中文显示异常。

### API 响应处理不当

接收 Codex API 响应时未正确处理编码，致使中文字符无法正常显示。

### 文件读写编码问题

读取或写入文件时未指定正确的编码格式。

## 解决方案

### 方案一：安装 PowerShell 7（推荐）

PowerShell 7 默认使用 UTF-8 编码，是根治乱码问题的首选方案。

#### 安装步骤

**方式一：winget 安装**

以管理员身份打开 PowerShell，执行：

```powershell
winget install --id Microsoft.PowerShell --source winget --accept-source-agreements --accept-package-agreements
```

**方式二：手动安装**

若 winget 不可用，可按以下步骤操作：

1. 访问 [PowerShell 官方发布页](https://github.com/PowerShell/PowerShell/releases/latest)
2. 在 Assets 区域下载对应架构的安装包：
   - x86_64/AMD64：`PowerShell-7.x.x-win-x64.msi`
   - ARM64：`PowerShell-7.x.x-win-arm64.msi`

> 将 `7.x.x` 替换为实际版本号，如 `7.6.3`
3. 双击安装包，按默认选项完成安装

#### 验证安装

关闭所有终端窗口，重新打开后执行：

```powershell
pwsh --version
```

输出 `7.x.x` 即表明安装成功。

#### 配置 Windows Terminal

1. 打开 Windows Terminal
2. 点击下拉箭头 → 设置（`Ctrl+,`）
3. 左侧选择「启动」
4. 「默认配置文件」选择带黑底图标的 PowerShell（对应 PowerShell 7）
5. 保存并重启终端

验证版本：

```powershell
$PSVersionTable.PSVersion
```

Major 值应为 7。

#### 配置 VS Code 终端

这是解决"已安装 PS7 仍乱码"的关键：

1. 按 `Ctrl+Shift+P` 打开命令面板
2. 输入并选择 `Terminal: Select Default Profile`
3. 选择 `PowerShell (pwsh)` 或 `PowerShell 7`
4. 关闭当前终端标签，按 ``Ctrl+` `` 新建终端

验证版本：

```powershell
$PSVersionTable.PSVersion
```

### 方案二：临时修改编码

若暂无法安装 PowerShell 7，可临时修改当前终端编码：

```powershell
$OutputEncoding = [System.Text.Encoding]::UTF8
chcp 65001
```

> 注意：此方案仅对当前会话有效，重启终端后需重新执行。

## 常见问题

### 如何查看当前 PowerShell 版本？

**PowerShell 窗口中：**

```powershell
$PSVersionTable.PSVersion
```

- `7.x.x` → PowerShell 7
- `5.1.x` → 旧版 Windows PowerShell

**cmd 中：**

```cmd
pwsh --version
```

### winget 命令不可用？

系统未安装 winget 或未加入 PATH。请采用手动安装方式。

### 安装后仍然乱码？

1. 确认已关闭所有终端窗口并重新打开
2. 确认 VS Code 默认终端已切换至 PowerShell 7
3. 检查系统环境变量中 PowerShell 7 路径是否正确

## 方案对比

| 方案 | 优点 | 缺点 |
|------|------|------|
| PowerShell 7 | 一劳永逸，全局生效 | 需安装额外软件 |
| 临时修改编码 | 无需安装，立即生效 | 仅当前会话有效 |

**推荐方案一**，从根本上解决编码问题。
