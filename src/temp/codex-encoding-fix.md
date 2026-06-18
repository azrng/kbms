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

在使用 OpenAI Codex 进行代码生成、终端命令执行或文件读写时，中文乱码通常不是模型本身“生成乱码”，而是本地终端、文件编码、脚本管道或 Git 提交信息处理链路中的编码不一致。本文梳理常见成因，并提供可操作的规避方案。

## 问题表现

| 类型 | 具体表现 |
|------|----------|
| 中文字符异常 | 生成的中文显示为方块或问号 |
| 特殊符号丢失 | 代码注释、字符串内容出现乱码 |
| 编码格式不一致 | 输入与输出的编码格式不匹配 |

## 成因分析

### 编码格式不匹配

Codex、现代 API 与多数开发工具通常按 UTF-8 处理文本。当本地文件、终端或脚本仍使用 GBK、GB2312、Windows ANSI 代码页等编码时，文本在读取、显示或再次写入时可能被错误解码。

### 终端编码不兼容

中文 Windows 环境中，旧版 Windows PowerShell 5.x / cmd 常见活动代码页是 `936`（GBK），但实际值取决于系统区域设置和终端配置。若终端代码页与工具输出编码不一致，中文就可能显示为问号、方块或其它异常字符。

### 接口响应处理不当

调用 OpenAI API 或其它接口时，如果客户端、日志系统或中间脚本未按 UTF-8 处理响应体，也可能导致中文字符显示或落盘异常。

### 文件读写编码问题

读取或写入文件时未指定正确的编码格式。

## 解决方案

### 方案一：安装 PowerShell 7（推荐）

PowerShell 7 默认使用 UTF-8（无 BOM）输出文本，能显著减少跨平台文件读写和终端管道中的编码差异，是优先推荐的方案。

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
   - x86_64 / AMD64：`PowerShell-7.x.x-win-x64.msi`
   - ARM64：`PowerShell-7.x.x-win-arm64.msi`

> 将 `7.x.x` 替换为发布页中的实际版本号。
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
chcp 65001
[Console]::InputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [Console]::OutputEncoding
```

> 注意：此方案仅对当前会话有效，重启终端后需重新执行。

### 方案三：配置编码规范

在项目的 `AGENTS.md` 中添加 Codex 协作规范，约束 AI Agent 在读取、修改中文文件和提交信息时的行为。若团队同时使用 Claude 等其它 Agent，可在对应的 `CLAUDE.md` 等说明文件中同步相同规则。

```markdown
## 编码与文档规则
- 所有源码、配置、文档统一使用 `UTF-8`
- 读取或修改含中文文件时，如出现乱码，先判断是显示问题还是文件损坏，未确认前禁止覆盖
- Windows / PowerShell 下读取中文文件时，必要时显式指定 `UTF-8`
- Windows / PowerShell 下处理中文 Git 提交信息时，优先使用 `git commit -m` / 多个 `-m` 参数，或使用 `UTF-8` 编码文件配合 `git commit -F <file>`
- 避免通过标准输入管道直接传递中文提交信息，如 `git commit -F -`、here-string 管道等，防止编码链路把中文写成 `?`
- 避免使用可能隐式改变编码的方式直接改写源码文件，如 shell 重定向、`Out-File`、`Set-Content`
- 修改含中文内容后，必须重新读取确认关键中文显示正常
```

**优点**：可降低 AI Agent 协作中的乱码风险，让团队在同一仓库中复用一致的操作约束。

**注意**：该方案不能替代编辑器、Git、终端和脚本层面的编码配置。对不使用 AI Agent 的成员，应配合 `.editorconfig`、`.gitattributes`、Git hooks 或 CI 检查来统一文件编码和换行规则。

### 补充建议：仓库级编码约束

若希望对所有开发者生效，建议在仓库中加入 `.editorconfig` 和 `.gitattributes`，把编码与换行规则固化到编辑器和 Git 层面：

```ini
# .editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
```

```gitattributes
# .gitattributes
* text=auto eol=lf
*.md text eol=lf
*.cs text eol=lf
*.json text eol=lf
```

`.editorconfig` 主要约束支持该规范的编辑器，`.gitattributes` 主要约束 Git 归一化换行；它们不能自动修复所有历史编码问题，但能降低后续新增乱码和换行差异的概率。

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
| PowerShell 7 | 默认 UTF-8，能减少终端和脚本链路中的编码差异 | 需安装额外软件；仍需配合编辑器和 Git 配置 |
| 临时修改编码 | 无需安装，立即生效 | 仅当前会话有效 |
| 配置编码规范 | 团队统一 AI Agent 操作习惯，无需改终端环境 | 需维护 AGENTS.md 文件；对不使用 AI Agent 的成员无约束力；不能替代编辑器、Git、CI 等强制约束 |
| 仓库级编码约束 | 对所有开发者更通用，可减少换行和编辑器差异 | 需维护配置；不能自动修复所有历史文件 |
