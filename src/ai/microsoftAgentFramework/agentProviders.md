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

框架支持 14 种 Agent 提供商，通过统一的 `AIAgent` 抽象实现跨提供商切换。

## OpenAI ChatCompletion

```csharp
using OpenAI;
using Microsoft.Agents.AI;

AIAgent agent = new OpenAIClient(apiKey)
    .GetChatClient("gpt-4o-mini")
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
    .GetChatClient("gpt-4o-mini")
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

Foundry 提供额外的 24 个示例步骤，包括：
- 代码解释器（Code Interpreter）
- 计算机使用（Computer Use）
- 文件搜索（File Search）
- OpenAPI 工具、Bing 搜索、SharePoint、Microsoft Fabric
- Web 搜索、Memory Search
- 本地 MCP

## Anthropic Claude

```xml
<PackageReference Include="Microsoft.Agents.AI.Anthropic" Version="1.1.0" />
```

```csharp
using Microsoft.Agents.AI.Anthropic;

AIAgent agent = anthropicClient
    .AsAIAgent(
        instructions: "你是一个助手。",
        name: "MyAgent"
    );
```

## Google Gemini

通过提供商集成包支持 Google Gemini。

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
| `Microsoft.Agents.AI.Anthropic` | Anthropic Claude |
| `Microsoft.Agents.AI.A2A` | A2A 协议 |
| `Microsoft.Agents.AI.CopilotStudio` | Copilot Studio |
| `Microsoft.Agents.AI.GitHub.Copilot` | GitHub Copilot |
