---
title: AI 生态总览
lang: zh-CN
date: 2026-10-12
publish: true
author: azrng
isOriginal: true
category:
  - ai
tag:
  - 生态
---

# 生态总览

围绕编码代理（Claude Code / Copilot CLI / Gemini CLI 等）的扩展生态，目前主要有四种相互配合的扩展形态：**Skill、MCP、Slash Command、Subagent**。它们分别回答"AI 该怎么做事"、"AI 如何连上外部世界"、"常用操作如何一键触发"、"任务如何拆分并行"四个不同的问题。

## 边界对比

| 概念 | 本质 | 解决什么问题 | 典型场景 | 何时用 |
| --- | --- | --- | --- | --- |
| Skill | 打包给 AI 的工作流与知识包（说明 + 脚本，按需加载） | 沉淀"某类事情该怎么做"的流程与领域知识，避免遗漏和返工 | docx/pdf/pptx/xlsx 文档处理、taste-skill 设计规范、superpowers 全生命周期工作流、TDD | 需要流程纪律、领域知识或固定输出规范时；先查是否有适用 Skill，哪怕只有 1% 的可能性 |
| MCP | Anthropic 推出的开放协议，AI 应用的"USB-C 接口" | 打破数据孤岛，让 LLM 安全连接外部数据源（数据库、文件、API）并调用工具执行任务 | Context7 文档查询、BrowserTools 读取浏览器调试信息、CodeGraph 代码库索引、Cloudflare 部署 | 需要 AI 访问自身之外的外部系统、数据或实时环境时 |
| Slash Command | 会话中以 `/xxx` 触发的快捷指令入口 | 把高频固定操作收敛为一键触发，减少重复输入 | `/mcp` 确认 MCP 连接、`/clear` 释放上下文、`/init` 更新记忆、`/plugin` 插件市场安装 | 操作步骤固定、且需要用户主动掌握触发时机时 |
| Subagent | 由主代理派生、在独立上下文中执行子任务的代理 | 上下文隔离与并行加速，保持主会话上下文清洁 | `dispatching-parallel-agents`（2+ 个可独立执行的任务）、`subagent-driven-development`（子代理驱动开发） | 子任务可独立执行、并行有收益，或产出只需汇总回主会话时 |

## 如何选择

1. 要让 AI 掌握一套做事方法、领域知识或输出规范 → **Skill**（可从 [Skills 商城](https://skillsmp.com/zh)获取，或用 skill-creator 自己编写）。
2. 要接入外部系统、数据源或本地工具 → **MCP**（从 MCP 商店安装，或自行开发 Server，见 [MCP](./mcp.md)）。
3. 要把一串固定操作固化成快捷入口 → **Slash Command**。
4. 要并行处理相互独立的任务，或避免子任务污染主会话上下文 → **Subagent**。

## 四者的协作关系

四者并不互斥，一条典型的执行链路是：用 **Slash Command** 触发入口 → 主代理按 **Skill** 的流程纪律推进（如先写计划、先写测试）→ 过程中通过 **MCP** 调用外部工具与数据（文档、浏览器、代码索引）→ 把可独立执行的部分派给 **Subagent** 并行完成，结果汇总回主会话。

## 本目录内容

- [Skills](./skills.md)：技能商城、Superpowers 工作流体系与各领域 Skill 清单。
- [MCP](./mcp.md)：MCP 协议概述、商店、SDK 与 Claude Code 下的常用 MCP 配置。
