---
title: Microsoft Agent Framework 概述
lang: zh-CN
date: 2025-04-25
publish: true
author: azrng
isOriginal: true
category:
  - ai
  - agent
tag:
  - Agent
  - Microsoft
---

# Microsoft Agent Framework 学习笔记

> 学习来源：`D:\SourceCode\AISample\agent-framework\dotnet`
>
> 官方文档：[Microsoft Agent Framework](https://github.com/microsoft/agents)
>
> 当前版本：**1.1.0**，要求 .NET 10.0 SDK

## 概述

Microsoft Agent Framework 是一个用于构建 AI Agent 的高级框架，提供统一的抽象层，可在不同 AI 提供商（OpenAI、Azure OpenAI、Anthropic、Google Gemini、Foundry 等）之间自由切换。

### 主要特性

- **统一抽象**：`AIAgent` 和 `IChatClient` 提供跨提供商的统一接口
- **流式响应**：原生支持流式 AI 响应
- **会话管理**：内置多轮对话状态管理，支持持久化
- **工具调用**：支持函数调用、工具审批、MCP 工具
- **工作流引擎**：支持复杂的多步骤工作流编排
- **可观测性**：内置 OpenTelemetry、日志记录支持
- **中间件管道**：通过 `AIAgentBuilder` 构建处理管道
- **声明式定义**：支持 YAML 定义 Agent 和工作流
- **托管部署**：支持 Azure Functions、Durable Task 等部署方式

## 文档目录

| 文档 | 说明 |
| --- | --- |
| [快速入门](gettingStarted.md) | 创建第一个 Agent，基础用法 |
| [核心概念](coreConcepts.md) | AIAgent、ChatClientAgent、AgentSession 等核心类型 |
| [Agent 提供商](agentProviders.md) | OpenAI、Azure、Foundry、Anthropic、A2A 等提供商集成 |
| [对话与会话](conversations.md) | 多轮对话、会话持久化、ChatHistoryProvider |
| [函数工具](functionTools.md) | AIFunctionFactory、工具审批、Agent 即工具 |
| [工作流](workflows.md) | WorkflowBuilder、并发、条件边、检查点 |
| [中间件](middleware.md) | AIAgentBuilder 管道、日志、OpenTelemetry |
| [记忆与 RAG](memoryAndRag.md) | AIContextProvider、向量存储、GraphRAG |
| [托管部署](hosting.md) | Azure Functions、Durable Task、A2A、AG-UI 托管 |
| [高级特性](advancedFeatures.md) | 结构化输出、Skills、声明式、压缩管道 |
| [项目集成](projectIntegration.md) | 实际项目中的集成示例 |

## 核心 NuGet 包

```xml
<!-- Agent Framework 核心 -->
<PackageReference Include="Microsoft.Agents.AI" Version="1.1.0" />
<PackageReference Include="Microsoft.Agents.AI.Abstractions" Version="1.1.0" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.1.0" />

<!-- 工作流 -->
<PackageReference Include="Microsoft.Agents.AI.Workflows" Version="1.1.0" />

<!-- 托管 -->
<PackageReference Include="Microsoft.Agents.AI.Hosting" Version="1.1.0" />
<PackageReference Include="Microsoft.Agents.AI.Hosting.AzureFunctions" Version="1.1.0" />
```

## 官方示例路径

```
agent-framework/dotnet/
├── samples/
│   ├── 01-get-started/          # 6 步入门教程
│   ├── 02-agents/               # Agent 深入（19 个步骤）
│   │   ├── Agents/              # Agent 核心 API
│   │   ├── AgentProviders/      # 14 个提供商
│   │   ├── AgentsWithFoundry/   # Foundry 专项（24 步）
│   │   ├── AgentSkills/         # 技能系统（5 步）
│   │   ├── AgentWithMemory/     # 记忆功能（5 步）
│   │   ├── AgentWithRAG/        # RAG 集成（5 步）
│   │   ├── AGUI/                # Agent UI 协议
│   │   └── ModelContextProtocol/ # MCP（4 个示例）
│   ├── 03-workflows/            # 工作流模式（12 类）
│   ├── 04-hosting/              # 部署（Azure Functions、Durable Task）
│   └── 05-end-to-end/           # 端到端应用
└── src/                         # 30+ NuGet 包源码
```
