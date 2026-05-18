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

> 学习来源：`D:\SourceCode\AISample\MirosoftAgent\agent-framework\dotnet`
>
> 学习案例：`D:\SourceCode\AISample\MirosoftAgent\Agent-Framework-Samples`
>
> 官方文档：[Microsoft Agent Framework](https://github.com/microsoft/agents)
>
> 当前版本：**1.6.1**，要求 .NET 10.0 SDK

## 概述

Microsoft Agent Framework 是一个用于构建 AI Agent 的高级框架，提供统一的抽象层，可在不同 AI 提供商（OpenAI、Azure OpenAI、Anthropic、Google Gemini、Foundry 等）之间自由切换。

### 主要特性

- **统一抽象**：`AIAgent` 和 `IChatClient` 提供跨提供商的统一接口
- **流式响应**：原生支持流式 AI 响应
- **会话管理**：内置多轮对话状态管理，支持持久化
- **工具调用**：支持函数调用、工具审批、MCP 工具
- **工作流引擎**：支持复杂的多步骤工作流编排（扇出/扇入、条件路由、可视化）
- **可观测性**：内置 OpenTelemetry、Aspire Dashboard、Grafana 支持
- **中间件管道**：通过 `AIAgentBuilder` 构建处理管道
- **声明式定义**：支持 YAML 定义 Agent 和工作流
- **托管部署**：支持 Azure Functions、Durable Task、M365、AG-UI 等部署方式
- **代码执行沙箱**：通过 Hyperlight 实现安全的 CodeAct 模式
- **评估框架**：内置质量评估、Red Teaming、多模态评估
- **Harness 一站式 Agent**：预配置管道，集成函数调用、压缩、工具审批、遥测等

## 文档目录

| 文档 | 说明 |
| --- | --- |
| [快速入门](gettingStarted.md) | 创建第一个 Agent，基础用法 |
| [核心概念](coreConcepts.md) | AIAgent、ChatClientAgent、AgentSession 等核心类型 |
| [Agent 提供商](agentProviders.md) | OpenAI、Azure、Foundry、Anthropic、A2A 等提供商集成 |
| [对话与会话](conversations.md) | 多轮对话、会话持久化、ChatHistoryProvider |
| [函数工具](functionTools.md) | AIFunctionFactory、CodeAct、工具审批、Agent 即工具 |
| [工作流](workflows.md) | WorkflowBuilder、扇出/扇入、条件路由、可视化 |
| [中间件](middleware.md) | AIAgentBuilder 管道、日志、OpenTelemetry、DevUI |
| [记忆与 RAG](memoryAndRag.md) | AIContextProvider、向量存储、GraphRAG、压缩管道 |
| [托管部署](hosting.md) | Azure Functions、Durable Task、M365、OAuth、AG-UI 托管 |
| [高级特性](advancedFeatures.md) | 结构化输出、Skills、声明式、Harness、沙箱执行、压缩管道 |
| [评估与可观测性](evaluationAndObservability.md) | 评估框架、OpenTelemetry、Aspire Dashboard、Grafana、Red Teaming |
| [实战案例](realWorldCases.md) | 营销内容生成、旅行助手、Foundry Local、M365 Agent 等生产案例 |
| [项目集成](projectIntegration.md) | 实际项目中的集成示例 |

## 核心 NuGet 包

```xml
<!-- Agent Framework 核心 -->
<PackageReference Include="Microsoft.Agents.AI" Version="1.6.1" />
<PackageReference Include="Microsoft.Agents.AI.Abstractions" Version="1.6.1" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.6.1" />

<!-- 工作流 -->
<PackageReference Include="Microsoft.Agents.AI.Workflows" Version="1.6.1" />

<!-- 托管 -->
<PackageReference Include="Microsoft.Agents.AI.Hosting" Version="1.6.1" />
<PackageReference Include="Microsoft.Agents.AI.Hosting.AzureFunctions" Version="1.6.1" />

<!-- 高级功能 -->
<PackageReference Include="Microsoft.Agents.AI.Harness" Version="1.6.1" />
<PackageReference Include="Microsoft.Agents.AI.Hyperlight" Version="1.6.1" />
<PackageReference Include="Microsoft.Agents.AI.AzureAI.Persistent" Version="1.6.1" />
<PackageReference Include="Microsoft.Agents.AI.Foundry.Hosting" Version="1.6.1" />
```

## 官方示例路径

```
agent-framework/dotnet/
├── samples/
│   ├── 01-get-started/              # 6 步入门教程
│   ├── 02-agents/                   # Agent 深入
│   │   ├── Agents/                  # Agent 核心 API（21 步）
│   │   ├── AgentProviders/          # 多提供商
│   │   ├── AgentsWithFoundry/       # Foundry 专项（27 步）
│   │   ├── AgentSkills/             # 技能系统（5 步）
│   │   ├── AgentWithMemory/         # 记忆功能（5 步）
│   │   ├── AgentWithRAG/            # RAG 集成（5 步）
│   │   ├── AgentWithCodeAct/        # CodeAct 沙箱执行（3 步）
│   │   ├── AgentOpenTelemetry/      # OpenTelemetry 集成
│   │   ├── AgentWithAnthropic/      # Anthropic Claude
│   │   ├── AgentWithOpenAI/         # OpenAI 原生 SDK（6 步）
│   │   ├── AGUI/                    # Agent UI 协议
│   │   ├── A2A/                     # Agent-to-Agent 协议
│   │   ├── DeclarativeAgents/       # 声明式 Agent
│   │   ├── DevUI/                   # 开发调试界面
│   │   ├── Evaluation/              # Agent 评估
│   │   ├── Harness/                 # Harness 预配置 Agent
│   │   └── ModelContextProtocol/    # MCP（4 个示例）
│   ├── 03-workflows/                # 工作流模式
│   │   ├── _StartHere/              # 入门（7 步）
│   │   ├── Agents/                  # Agent 工作流
│   │   ├── Checkpoint/              # 检查点
│   │   ├── Concurrent/              # 并发
│   │   ├── ConditionalEdges/        # 条件边
│   │   ├── Declarative/             # 声明式工作流
│   │   ├── Evaluation/              # 工作流评估
│   │   ├── HumanInTheLoop/          # 人工介入
│   │   ├── Loop/                    # 循环
│   │   ├── Observability/           # 可观测性
│   │   ├── Orchestration/           # 编排
│   │   ├── SharedStates/            # 共享状态
│   │   └── Visualization/           # 可视化
│   ├── 04-hosting/                  # 部署
│   │   ├── DurableAgents/           # Durable Agent
│   │   ├── DurableWorkflows/        # Durable 工作流
│   │   └── FoundryHostedAgents/     # Foundry 托管
│   └── 05-end-to-end/              # 端到端应用
│       ├── A2AClientServer/         # A2A 客户端/服务端
│       ├── AGUIClientServer/        # AG-UI 客户端/服务端
│       ├── AGUIWebChat/             # AG-UI Web 聊天
│       ├── AgentWebChat/            # Agent Web 聊天
│       ├── AgentWithPurview/        # Purview 治理
│       ├── AspNetAgentAuthorization/ # OAuth 授权
│       ├── DevUIAspireIntegration/  # DevUI Aspire 集成
│       ├── Evaluation/              # 端到端评估
│       └── M365Agent/               # M365 Agent
└── src/                             # 35+ NuGet 包源码
```

## 学习案例路径

```
Agent-Framework-Samples/
├── 00.ForBeginners/         # AI Agent 基础概念
│   ├── 01-intro-to-ai-agents
│   ├── 02-explore-agentic-frameworks
│   ├── 03-agentic-design-patterns
│   ├── 04-tool-use
│   ├── 05-agentic-rag
│   ├── 07-planning-design
│   └── 08-multi-agent
├── 01.AgentFoundation/      # Agent 基础
├── 02.CreateYourFirstAgent/ # 创建第一个 Agent
├── 03.ExploerAgentFramework/ # 框架探索
├── 04.Tools/                # 工具使用
├── 05.Providers/            # 提供商
├── 06.RAGs/                 # RAG 集成
├── 07.Workflow/             # 工作流
├── 08.EvaluationAndTracing/ # 评估与追踪
└── 09.Cases/                # 实战案例
    ├── AgenticMarketingContentGen/  # 营销内容生成
    ├── FoundryLocalPipeline/        # Foundry Local
    ├── GHModel.AI/                  # 旅行助手
    ├── MicrosoftFoundryWithAITKAndMAF/ # Foundry 全生命周期
    ├── maf_harness_managed_agent/   # Managed Agent
    └── maf_harness_managed_hosted_agent/ # 托管 Managed Agent
```
