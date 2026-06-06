---
title: Agent 提供商
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
  - 提供商
---

# Agent 提供商

框架支持多种 Agent 提供商，通过统一的 `AIAgent` 抽象实现跨提供商切换。

## OpenAI ChatCompletion

```csharp
using OpenAI;
using Microsoft.Agents.AI;

AIAgent agent = new OpenAIClient(apiKey)
    .GetChatClient("gpt-5.4-mini")
    .AsAIAgent(
        instructions: "你是一个助手。",
        name: "MyAgent"
    );
```

## Azure OpenAI ChatCompletion

```csharp
using Azure.AI.OpenAI;
using Azure.Identity;
using Microsoft.Agents.AI;

AIAgent agent = new AzureOpenAIClient(
    new Uri(endpoint),
    new AzureCliCredential())
    .GetChatClient("gpt-5.4-mini")
    .AsAIAgent(
        instructions: "你是一个助手。",
        name: "MyAgent"
    );
```

## OpenAI Responses API

```csharp
using OpenAI.Responses;
using Microsoft.Agents.AI.OpenAI;

AIAgent agent = new OpenAIClient(apiKey)
    .GetResponsesClient()
    .AsAIAgent(
        instructions: "你是一个助手。",
        name: "MyAgent"
    );
```

## Azure OpenAI Responses

```csharp
AIAgent agent = new AzureOpenAIClient(endpoint, credential)
    .GetResponsesClient()
    .AsAIAgent(
        instructions: "你是一个助手。",
        name: "MyAgent"
    );
```

## OpenAI 原生 SDK 类型

v1.9.0 新增对 OpenAI 原生 SDK 类型的直接支持，无需经过 `Microsoft.Extensions.AI.Abstractions` 转换。

```csharp
using Microsoft.Agents.AI.OpenAI;

// OpenAI ChatCompletion 原生客户端
var openAIChatAgent = new OpenAIChatClientAgent(openAIClient, "gpt-5.4-mini",
    instructions: "你是一个助手",
    name: "MyAgent");

// OpenAI Responses API 原生客户端
var openAIResponseAgent = new OpenAIResponseClientAgent(openAIClient, "gpt-5.4-mini",
    instructions: "你是一个助手",
    name: "MyAgent");
```

## Microsoft Foundry

```csharp
using Microsoft.Agents.AI.Foundry;

// 通过 AIProjectClient
AIAgent agent = aiProjectClient
    .AsAIAgent(
        instructions: "你是一个助手。",
        name: "MyAgent"
    );

// 或使用 FoundryAgent（提供更多 Foundry 专属功能）
FoundryAgent agent = new FoundryAgent(
    aiProjectClient,
    new FoundryAgentOptions { ... }
);
```

### Foundry 专属功能

Foundry 提供额外的 27 个示例步骤，包括：
- 代码解释器（Code Interpreter）+ 文件下载
- 计算机使用（Computer Use）
- 文件搜索（File Search）
- OpenAPI 工具、Bing 搜索、SharePoint、Microsoft Fabric
- Web 搜索、Memory Search
- 本地 MCP
- Foundry Toolbox MCP（非托管 Agent 也可使用）

## Anthropic Claude

```xml
<PackageReference Include="Microsoft.Agents.AI.Anthropic" Version="1.9.0" />
```

```csharp
using Microsoft.Agents.AI.Anthropic;

AIAgent agent = anthropicClient
    .AsAIAgent(
        instructions: "你是一个助手。",
        name: "MyAgent"
    );
```

## Azure AI Persistent Agents

v1.9.0 新增，集成 Azure AI Agents Persistent 服务，支持跨会话的持久化 Agent 对话。

```xml
<PackageReference Include="Microsoft.Agents.AI.AzureAI.Persistent" Version="1.9.0" />
```

```csharp
using Microsoft.Agents.AI.AzureAI.Persistent;

// 使用 Azure.AI.Agents.Persistent 客户端
AIAgent agent = persistentAgentsClient
    .AsAIAgent(
        instructions: "你是一个助手。",
        name: "MyAgent"
    );
```

## Google Gemini

通过提供商集成包支持 Google Gemini。

```xml
<PackageReference Include="Google.GenAI" Version="1.6.0" />
```

## Ollama（本地模型）

支持通过 Ollama 运行本地模型。

## ONNX Runtime

支持通过 ONNX Runtime 进行本地推理。

## GitHub Copilot

```csharp
using Microsoft.Agents.AI.GitHub.Copilot;

// GitHub Copilot Agent
```

## A2A（Agent-to-Agent 协议）

```csharp
using Microsoft.Agents.AI.A2A;

// A2A Agent，支持 Agent 间通信
A2AAgent agent = new A2AAgent(...);
```

A2A 支持两种交互模式：
- **Message 模式**：直接消息传递
- **Task 模式**：基于任务的交互，支持轮询完成状态

## HarnessAgent（一站式 Agent）

预配置的完整 Agent 管道，自动组装：
- `FunctionInvokingChatClient`（自动函数调用）
- `MessageInjectingChatClient`（运行中消息注入）
- `PerServiceCallChatHistoryPersistingChatClient`（每次调用持久化）
- `CompactionProvider`（上下文窗口压缩）
- `ToolApprovalAgent`（工具审批规则）
- `OpenTelemetryAgent`（遥测）
- 内置 `HostedWebSearchTool`（Web 搜索）

```xml
<PackageReference Include="Microsoft.Agents.AI.Harness" Version="1.9.0" />
```

```csharp
using Microsoft.Agents.AI;

// 通过扩展方法创建
var agent = chatClient.AsHarnessAgent(
    maxContextWindowTokens: 1_050_000,
    maxOutputTokens: 128_000,
    options: new HarnessAgentOptions
    {
        Name = "MyAgent",
        ChatOptions = new ChatOptions
        {
            Instructions = "你是一个全能助手"
        }
    });
```

内置上下文提供者：
- `TodoProvider` — 待办事项管理
- `AgentModeProvider` — 计划/执行模式切换
- `FileMemoryProvider` — 基于文件的会话记忆
- `FileAccessProvider` — 共享文件访问
- `AgentSkillsProvider` — 技能发现和加载

## 自定义实现

实现 `AIAgent` 抽象类创建自定义 Agent：

```csharp
using Microsoft.Agents.AI.Abstractions;

public class MyCustomAgent : AIAgent
{
    public override async Task<AgentResponse> RunAsync(
        string message,
        AgentSession? session = null,
        AgentRunOptions? options = null,
        CancellationToken cancellationToken = default)
    {
        // 自定义实现逻辑
    }

    // ... 其他抽象方法
}
```

## 切换提供商

切换提供商只需替换 ChatClient 创建方式，其余代码不变：

```csharp
// OpenAI
var chatClient = new OpenAIClient(apiKey).GetChatClient(model);

// Azure OpenAI
var chatClient = new AzureOpenAIClient(endpoint, credential).GetChatClient(deployment);

// 以下代码完全相同
AIAgent agent = chatClient.AsAIAgent(instructions: "...", name: "...");
var response = await agent.RunAsync("Hello");
```

## 提供商包一览

| 包名 | 提供商 |
| --- | --- |
| `Microsoft.Agents.AI.OpenAI` | OpenAI ChatCompletion + Responses |
| `Microsoft.Agents.AI.Foundry` | Microsoft Foundry |
| `Microsoft.Agents.AI.Foundry.Hosting` | Foundry 托管工具箱 |
| `Microsoft.Agents.AI.Anthropic` | Anthropic Claude |
| `Microsoft.Agents.AI.AzureAI.Persistent` | Azure AI Persistent Agents |
| `Microsoft.Agents.AI.A2A` | A2A 协议 |
| `Microsoft.Agents.AI.CopilotStudio` | Copilot Studio |
| `Microsoft.Agents.AI.GitHub.Copilot` | GitHub Copilot |
| `Microsoft.Agents.AI.Harness` | 一站式预配置 Agent |
| `Microsoft.Agents.AI.Hyperlight` | Hyperlight 沙箱代码执行 |
