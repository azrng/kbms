---
title: 托管部署
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
  - 部署
  - Azure Functions
---

# 托管部署

框架提供多种部署方式，从控制台应用到 Azure Functions 生产部署。

## 核心托管包

| 包 | 说明 |
| --- | --- |
| `Microsoft.Agents.AI.Hosting` | 核心托管基础设施 |
| `Microsoft.Agents.AI.Hosting.AzureFunctions` | Azure Functions 部署 |
| `Microsoft.Agents.AI.Hosting.A2A` | A2A 协议托管 |
| `Microsoft.Agents.AI.Hosting.A2A.AspNetCore` | ASP.NET Core A2A 端点 |
| `Microsoft.Agents.AI.Hosting.AGUI.AspNetCore` | ASP.NET Core AG-UI SSE 端点 |
| `Microsoft.Agents.AI.Hosting.OpenAI` | OpenAI 兼容 API 托管 |

## HostedAgentBuilder

```csharp
using Microsoft.Agents.AI.Hosting;

// 注册托管 Agent
builder.Services.AddHostedAgent("my-agent", builder => builder
    .WithInstructions("你是一个助手")
    .WithName("MyAgent")
    .WithChatClient(chatClient));
```

## HostedWorkflowBuilder

```csharp
// 注册托管工作流
builder.Services.AddHostedWorkflow("my-workflow", builder => builder
    .AddExecutor("step1", ...)
    .AddExecutor("step2", ...)
    .AddEdge("step1", "step2"));
```

## Azure Functions 部署

### Durable Task Agent

```xml
<PackageReference Include="Microsoft.Agents.AI.DurableTask" Version="1.1.0" />
<PackageReference Include="Microsoft.Agents.AI.Hosting.AzureFunctions" Version="1.1.0" />
```

```csharp
using Microsoft.Agents.AI.DurableTask;

// DurableAIAgent 支持长时间运行的 Agent 编排
var durableAgent = new DurableAIAgent(agent);
```

### Azure Functions 示例

框架提供 8 个 Azure Functions 部署示例：
1. 单个 Agent
2. 编排-链式
3. 编排-并发
4. 编排-条件
5. 人工介入（HITL）
6. 长时间运行工具
7. Agent 即 MCP 工具
8. 可靠流式传输

### 可靠流式传输

```csharp
// Azure Functions 中的可靠流式传输
// 支持断点续传和故障恢复
```

## A2A 托管

### ASP.NET Core A2A 端点

```xml
<PackageReference Include="Microsoft.Agents.AI.Hosting.A2A.AspNetCore" Version="1.1.0" />
```

```csharp
// 注册 A2A 端点
builder.Services.AddA2AEndpoints();
```

### A2A Agent 即函数工具

```csharp
// 将 Agent 暴露为 A2A 工具
// 支持轮询任务完成状态
```

## AG-UI 托管

### ASP.NET Core AG-UI SSE 端点

```xml
<PackageReference Include="Microsoft.Agents.AI.Hosting.AGUI.AspNetCore" Version="1.1.0" />
```

```csharp
// 注册 AG-UI SSE 端点
// 支持 Agent UI 协议的实时流式通信
```

## OpenAI 兼容 API 托管

```xml
<PackageReference Include="Microsoft.Agents.AI.Hosting.OpenAI" Version="1.1.0" />
```

```csharp
// 托管 OpenAI 兼容的 ChatCompletions、Responses、Conversations API
// 允许现有 OpenAI 客户端直接调用你的 Agent
```

## Cosmos DB 持久化

```xml
<PackageReference Include="Microsoft.Agents.AI.CosmosNoSql" Version="1.1.0" />
```

```csharp
// Cosmos DB 用于对话历史和检查点存储
builder.Services.AddSingleton<ChatHistoryProvider, CosmosChatHistoryProvider>();
```

## Microsoft Purview 治理

```xml
<PackageReference Include="Microsoft.Agents.AI.Purview" Version="1.1.0" />
```

```csharp
// Microsoft Purview 集成
// 提供 AI 治理、合规性监控
```

## 控制台应用示例

框架同时提供控制台应用版本的部署示例（7 个），便于本地开发和调试：
1. 单个 Agent
2. 编排-链式
3. 编排-并发
4. 编排-条件边
5. 工作流事件
6. 共享状态
7. 子工作流
