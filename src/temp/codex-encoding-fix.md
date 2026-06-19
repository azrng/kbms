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

> 你用 OpenAI Codex 生成代码、跑脚本、写 Git 提交，一切看起来都很丝滑——直到某天，中文注释变成了满屏的 `???`，中文文件名显示成方块，Git 提交记录里的中文也面目全非。

别慌。**这不是模型在"胡言乱语"，而是你的本地环境——终端、文件编码、脚本管道或 Git 提交链路——在某个环节"翻译"出了岔子。**

这篇文章就来帮你：搞清楚乱码从哪来，并提供一套**可直接落地**的解决方案。

---

## 📋 一图看懂问题表现

先对号入座，看看你遇到的属于哪种情况：

| 类型 | 具体表现 |
|------|----------|
| 中文字符异常 | 生成的中文显示为方块或问号 |
| 特殊符号丢失 | 代码注释、字符串内容出现乱码 |
| 编码格式不一致 | 输入与输出的编码格式不匹配 |

如果你中了以上任意一条，请继续往下看。

---

## 🔍 乱码从哪来？四大常见成因

### ① 编码格式不匹配：UTF-8 与 GBK 的"鸡同鸭讲"

Codex、现代 API 以及大多数开发工具，**默认按 UTF-8 处理文本**。然而，如果你的本地文件、终端或脚本仍在使用 GBK、GB2312、Windows ANSI 代码页等编码，那么文本在读取、显示或再次写入时，就可能被"错误翻译"，乱码由此产生。

### ② 终端编码不兼容：旧版 PowerShell 的历史包袱

在中文 Windows 环境中，**旧版 Windows PowerShell 5.x / cmd 的活动代码页通常是 `936`（即 GBK）**——具体值取决于系统区域设置和终端配置。

当终端代码页与工具的输出编码不一致时，中文就会变成问号、方块或其它"外星文字"。

### ③ 接口响应处理不当：中间环节"丢了翻译"

调用 OpenAI API 或其它接口时，如果你的客户端、日志系统或中间脚本**没有按 UTF-8 处理响应体**，中文字符也可能在显示或写入文件时出现异常。

### ④ 文件读写未指定编码

这是最容易被忽略的一点：**读取或写入文件时，如果没有显式指定编码格式**，系统可能按"默认值"行事——而这个默认值，在不同环境下并不一致。

---

## 🛠️ 四套解决方案，总有一款适合你

### ✅ 方案一：安装 PowerShell 7（强烈推荐）

**PowerShell 7 默认使用 UTF-8（无 BOM）输出文本**，能从根源上大幅减少跨平台文件读写和终端管道中的编码差异——这是优先推荐的方案。

#### 📦 安装步骤

**方式一：winget 安装（最快捷）**

以管理员身份打开 PowerShell，执行以下命令：

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

3. 双击安装包，按默认选项完成安装。

#### 🔍 验证安装

关闭所有终端窗口，重新打开后执行：

```powershell
pwsh --version
```

输出 `7.x.x` 即表明安装成功。

#### ⚙️ 配置 Windows Terminal

安装完成后，别忘了把默认终端切换过来：

1. 打开 Windows Terminal
2. 点击下拉箭头 → 设置（`Ctrl+,`）
3. 左侧选择「启动」
4. 「默认配置文件」选择带**黑底图标**的 PowerShell（对应 PowerShell 7）
5. 保存并重启终端

验证版本：

```powershell
$PSVersionTable.PSVersion
```

Major 值应为 **7**。

#### ⚙️ 配置 VS Code 终端

> ⚠️ **这是解决"已安装 PS7 仍乱码"的关键步骤！** 很多人安装了 PowerShell 7 却忘记切换 VS Code 的默认终端，导致问题依旧。

1. 按 `Ctrl+Shift+P` 打开命令面板
2. 输入并选择 `Terminal: Select Default Profile`
3. 选择 `PowerShell (pwsh)` 或 `PowerShell 7`
4. 关闭当前终端标签，按 ``Ctrl+` `` 新建终端

验证版本：

```powershell
$PSVersionTable.PSVersion
```

---

### ⚡ 方案二：临时修改编码（应急用）

如果你暂时无法安装 PowerShell 7，可以在当前终端会话中**临时切换为 UTF-8 编码**：

```powershell
chcp 65001
[Console]::InputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [Console]::OutputEncoding
```

> ⚠️ **注意**：此方案**仅对当前会话有效**，重启终端后需重新执行。

---

### 📝 方案三：在 AGENTS.md 中配置编码规范

如果你的团队使用 Codex、Claude 等 AI Agent，可以在项目的 `AGENTS.md` 中添加协作规范，**从制度层面约束 Agent 的行为**。若团队同时使用 Claude 等其它 Agent，可在对应的 `CLAUDE.md` 等说明文件中同步相同规则。

将以下内容添加到你的 `AGENTS.md` 文件中：

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

**✅ 优点**：可降低 AI Agent 协作中的乱码风险，让团队在同一仓库中复用一致的操作约束。

> ⚠️ **注意**：该方案**不能替代**编辑器、Git、终端和脚本层面的编码配置。对不使用 AI Agent 的团队成员，应配合 `.editorconfig`、`.gitattributes`、Git hooks 或 CI 检查来统一文件编码和换行规则。

---

### 🏗️ 补充建议：仓库级编码约束

如果你希望编码规则对**所有开发者**生效（而不仅是 AI Agent），建议在仓库中加入 `.editorconfig` 和 `.gitattributes`，把编码与换行规则固化到编辑器和 Git 层面。

**`.editorconfig` 配置：**

```ini
# .editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
```

**`.gitattributes` 配置：**

```gitattributes
# .gitattributes
* text=auto eol=lf
*.md text eol=lf
*.cs text eol=lf
*.json text eol=lf
```

简单说明一下分工：

- **`.editorconfig`** → 主要约束支持该规范的**编辑器**（如 VS Code、JetBrains 系列）
- **`.gitattributes`** → 主要约束 **Git** 的换行符归一化行为

它们虽然不能自动修复所有历史编码问题，但能有效**降低后续新增乱码和换行差异的概率**。

---

## ❓ 常见问题

### Q1：如何查看当前 PowerShell 版本？

**在 PowerShell 窗口中：**

```powershell
$PSVersionTable.PSVersion
```

- `7.x.x` → PowerShell 7 ✅
- `5.1.x` → 旧版 Windows PowerShell ❌

**在 cmd 中：**

```cmd
pwsh --version
```

### Q2：winget 命令不可用？

系统未安装 winget 或未加入 PATH。请采用上面的**手动安装方式**。

### Q3：安装 PowerShell 7 后仍然乱码？

按以下顺序排查：

1. ✅ 确认已**关闭所有终端窗口**并重新打开
2. ✅ 确认 **VS Code 默认终端**已切换至 PowerShell 7（这是最常见的遗漏）
3. ✅ 检查系统环境变量中 **PowerShell 7 路径**是否正确

---

## 📊 四套方案对比一览

| 方案 | 优点 | 缺点 |
|------|------|------|
| **PowerShell 7** | 默认 UTF-8，能减少终端和脚本链路中的编码差异 | 需安装额外软件；仍需配合编辑器和 Git 配置 |
| **临时修改编码** | 无需安装，立即生效 | 仅当前会话有效 |
| **配置编码规范** | 团队统一 AI Agent 操作习惯，无需改终端环境 | 需维护 AGENTS.md 文件；对不使用 AI Agent 的成员无约束力；不能替代编辑器、Git、CI 等强制约束 |
| **仓库级编码约束** | 对所有开发者更通用，可减少换行和编辑器差异 | 需维护配置；不能自动修复所有历史文件 |

---

## 💡 总结

中文乱码的本质，是编码格式在传输链路中的某处"对不上"。解决思路也很清晰：

1. **首选**安装 PowerShell 7，从终端层面统一为 UTF-8
2. **别忘了**切换 VS Code 默认终端（这一步最容易被忽略）
3. **应急**可用临时编码切换命令
4. **长效**通过 AGENTS.md + `.editorconfig` + `.gitattributes` 构建多层防线

**记住一个原则：UTF-8 一路到底，乱码自然无处遁形。** 🎯

---

> 📌 如果这篇文章帮到了你，欢迎**点赞、在看、转发**三连！
>
> 你在用 Codex 或其它 AI 编程工具时还遇到过什么坑？欢迎在评论区留言交流 👇