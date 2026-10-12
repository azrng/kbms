---
title: Codex
lang: zh-CN
date: 2026-10-12
publish: true
author: azrng
isOriginal: true
category:
  - ai
tag:
  - 编码智能体
  - Codex
---

## 安装

```shell
npm i -g @openai/codex --registry=https://registry.npmmirror.com

codex --version
```

## 中文乱码问题解决

使用 Codex 时可能遇到中文显示为方块或问号的问题，本质是编码格式在传输链路中"对不上"。

### 常见成因

| 类型 | 原因 |
|------|------|
| 编码格式不匹配 | UTF-8 与 GBK 的"鸡同鸭讲" |
| 终端编码不兼容 | 旧版 PowerShell 5.x 默认代码页 936（GBK） |
| 接口响应处理不当 | 中间环节未按 UTF-8 处理响应体 |
| 文件读写未指定编码 | 系统默认值在不同环境下不一致 |

### 解决方案

**方案一：安装 PowerShell 7（强烈推荐）**

PowerShell 7 默认使用 UTF-8，能从根源上减少编码差异：

```powershell
winget install --id Microsoft.PowerShell --source winget --accept-source-agreements --accept-package-agreements
```

安装后需配置 VS Code 默认终端：
1. `Ctrl+Shift+P` → `Terminal: Select Default Profile`
2. 选择 `PowerShell (pwsh)` 或 `PowerShell 7`

**方案二：临时修改编码（应急用）**

```powershell
chcp 65001
[Console]::InputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [Console]::OutputEncoding
```

> 仅对当前会话有效，重启终端后需重新执行。

**方案三：在 AGENTS.md 中配置编码规范**

```markdown
## 编码与文档规则
- 所有源码、配置、文档统一使用 `UTF-8`
- 读取或修改含中文文件时，如出现乱码，先判断是显示问题还是文件损坏，未确认前禁止覆盖
- Windows / PowerShell 下读取中文文件时，必要时显式指定 `UTF-8`
- 避免通过标准输入管道直接传递中文提交信息
- 避免使用可能隐式改变编码的方式直接改写源码文件
```

**方案四：仓库级编码约束**

`.editorconfig` 配置：

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
```

`.gitattributes` 配置：

```gitattributes
* text=auto eol=lf
*.md text eol=lf
*.cs text eol=lf
*.json text eol=lf
```

> **记住一个原则：UTF-8 一路到底，乱码自然无处遁形。**
