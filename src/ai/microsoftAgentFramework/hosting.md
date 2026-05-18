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

框架提供多种部署方式，从控制台应用到 Azure Functions、M365 Agent 生产部署。

## 核心托管包

| 包 | 说明 |
| --- | --- |
| `Microsoft.Agents.AI.Hosting` | 核心托管基础设施 |
| `Microsoft.Agents.AI.Hosting.AzureFunctions` | Azure Functions 部署 |
| `Microsoft.Agents.AI.Hosting.A2A` | A2A 协议托管 |
| `Microsoft.Agents.AI.Hosting.A2A.AspNetCore` | ASP.NET Core A2A 端点 |
| `Microsoft.Agents.AI.Hosting.AGUI.AspNetCore` | ASP.NET Core AG-UI SSE 端点 |
| `Microsoft.Agents.AI.Hosting.OpenAI` | OpenAI 兼容 API 托管 |
| `Microsoft.Agents.AI.Foundry.Hosting` | Foundry 托管工具箱（v1.6.1 新增） |
| `Aspire.Hosting.AgentFramework.DevUI` | Aspire DevUI 集成（v1.6.1 新增） |

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
<PackageReference Include="Microsoft.Agents.AI.DurableTask" Version="1.6.1" />
<PackageReference Include="Microsoft.Agents.AI.Hosting.AzureFunctions" Version="1.6.1" />
```

```csharp
using Microsoft.Agents.AI.DurableTask;

// DurableAIAgent 支持长时间运行的 Agent 编排
var durableAgent = new DurableAIAgent(agent);
```

### Azure Functions 示例

框架提供 Azure Functions 部署示例：
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

## Foundry 托管（v1.6.1 新增）

```xml
<PackageReference Include="Microsoft.Agents.AI.Foundry.Hosting" Version="1.6.1" />
```

Foundry Hosting 提供完整的托管基础设施：

- **Foundry 工具箱集成**：内存提供者、会话存储、工具审批系统
- **会话存储**：内存和文件系统两种实现
- **Bearer Token 认证**：Foundry 服务安全集成
- **FoundryAgentProvider**：声明式工作流中的 Foundry Agent 预配

```csharp
using Microsoft.Agents.AI.Foundry.Hosting;

// Foundry 托管 Agent 配置
```

## M365 Agent（v1.6.1 新增）

集成 Microsoft 365 Agents SDK，将 Agent 部署到 Teams 和 Copilot。

```csharp
// M365 Agent 示例
// - ASP.NET Core 托管
// - Adaptive Cards 响应
// - 多轮对话
// - Azure Bot 部署 + devtunnels
// - Agents Playground 集成
```

M365 Agent 特性：
- Teams 频道集成
- Copilot 扩展
- Adaptive Cards 富交互
- devtunnels 本地调试
- Agents Playground 测试

## OAuth 授权（v1.6.1 新增）

基于 OAuth 2.0 scope 的 Agent 和工具级授权。

```csharp
// AspNetAgentAuthorization 示例
// - 端点级授权（agent.chat scope）
// - 工具级授权（expenses.view, expenses.approve scope）
// - Keycloak 集成（可替换为 Microsoft Entra ID）
// - Docker Compose 一键部署
```

架构：
```
WebClient → AgentService (OAuth protected) → AI Model
                ↓
         Keycloak / Entra ID (认证服务)
```

支持场景：
- 端点级授权：只有持有 `agent.chat` scope 的用户可访问
- 工具级授权：查看费用只需 `expenses.view`，审批需要 `expenses.approve`

## A2A 托管

### ASP.NET Core A2A 端点

```xml
<PackageReference Include="Microsoft.Agents.AI.Hosting.A2A.AspNetCore" Version="1.6.1" />
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
<PackageReference Include="Microsoft.Agents.AI.Hosting.AGUI.AspNetCore" Version="1.6.1" />
```

```csharp
// 注册 AG-UI SSE 端点
// 支持 Agent UI 协议的实时流式通信
```

### AG-UI WebChat（v1.6.1 新增）

```csharp
// AG-UI Web Chat 客户端
// 完整的 Web 聊天界面实现
// SSE 实时流式通信
```

## OpenAI 兼容 API 托管

```xml
<PackageReference Include="Microsoft.Agents.AI.Hosting.OpenAI" Version="1.6.1" />
```

```csharp
// 托管 OpenAI 兼容的 ChatCompletions、Responses、Conversations API
// 允许现有 OpenAI 客户端直接调用你的 Agent
```

## Cosmos DB 持久化

```xml
<PackageReference Include="Microsoft.Agents.AI.CosmosNoSql" Version="1.6.1" />
```

```csharp
// Cosmos DB 用于对话历史和检查点存储
builder.Services.AddSingleton<ChatHistoryProvider, CosmosChatHistoryProvider>();
```

## Microsoft Purview 治理

```xml
<PackageReference Include="Microsoft.Agents.AI.Purview" Version="1.6.1" />
```

```csharp
// Microsoft Purview 集成
// 提供 AI 治理、合规性监控
```

## DevUI Aspire 集成（v1.6.1 新增）

```xml
<PackageReference Include="Aspire.Hosting.AgentFramework.DevUI" Version="1.6.1" />
```

```csharp
// 在 .NET Aspire 中注册 DevUI
// 多 Agent 统一调试界面
// Azure AI Foundry 集成
var builder = DistributedApplication.CreateBuilder(args);
builder.AddAgentFrameworkDevUI("devui");
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
