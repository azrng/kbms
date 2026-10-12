---
title: 其他终端智能体
lang: zh-CN
date: 2026-10-12
publish: true
author: azrng
isOriginal: true
category:
  - ai
tag:
  - 编码智能体
  - 终端工具
---

## pi

仓库地址：https://github.com/earendil-works/pi

### 扩展

#### @narumitw/pi-plan-mode

规划模式，锁死写权限逼我先想清楚

```
pi install npm:@narumitw/pi-plan-mode
```

#### pi-memory

把记忆存成 markdown 文件，跨会话不忘事

```
pi install npm:pi-memory
```

#### pi-web-access

提供网页搜索、正文抓取、来源核验、GitHub 仓库读取、PDF 提取，以及 YouTube 和本地视频理解。

```bash
pi install npm:pi-web-access
```

#### pi-mcp-adapter

一个代理工具接整个 MCP 生态

```
pi install npm:pi-mcp-adapter
```

#### pi-subagents

派子 agent 干审查、侦察这类活

```
pi install npm:pi-subagents
```

#### @narumitw/pi-btw

旁路提问，不打断主线任务

```
pi install npm:@narumitw/pi-btw
```

#### @narumitw/pi-file-context

圈精确文件行喂上下文，不整文件刷屏

```
pi install npm:@narumitw/pi-file-context
```

## omp

### 安装

```
irm https://omp.sh/install.ps1 | iex
```

### 配置主题

```
omp config set theme.dark catppuccin-macchiato
omp config get theme.dark
```

### 全局设置中文

查询安装目录

```
omp config path
```

然后去这个目录下增加AGENTS.md，加入内容

```
# 全局语言规范

1. 默认使用简体中文与用户交流。
2. 任务计划、执行说明、分析摘要、问题诊断、
   代码修改说明、测试结果及最终总结均使用中文。
3. 不要无故输出英文标题、英文解释或英文总结。
4. 代码、类名、方法名、API、命令、文件路径及
   日志原文保留原始语言。
5. 英文报错应保留原文，并提供中文原因分析。
6. 代码注释和 XML 文档注释优先使用简体中文，
   除非项目已有明确的语言规范。
7. 用户明确指定其他语言时，以用户要求为准。

# 语言强制规则

所有面向用户的自然语言说明默认使用简体中文。
保留代码、命令、接口名称及日志原文的原始格式。
```

### 性能处理

#### 关闭 OMP 终端标题动画

在 OMP 外部的 PowerShell 运行：

```
omp config set tui.titleState false
```

随后关闭 OMP，重新启动。

这会禁用终端标题中的运行状态动画，不会关闭 Agent 的任务执行能力。尤其适合排查 Windows 任务栏卡顿问题

## Cursor

[Cursor生成的UI太丑？四种方法减少UI拉扯](https://mp.weixin.qq.com/s/0yY6N5M4vulBS46y0MuKKg)

## Personal AI Infrastructure (PAI)

Daniel Miessler（Fabric 项目作者）打造的个人 AI 基础设施框架，帮你组织 AI 工具链、管理 prompt、让不同 AI 协作。不是装了就完事的工具，而是一套配置模板和最佳实践——如果你觉得"AI 工具太多，不知道怎么串起来"，这个项目就是答案。

- 仓库地址：https://github.com/danielmiessler/Personal_AI_Infrastructure

### 安装

```bash
curl -sSL https://ourpai.ai/install.sh | bash
```
