---
title: 快速入门
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
  - 入门
---

# 快速入门

## 前置条件

- .NET 10.0 SDK
- OpenAI 或 Azure OpenAI API Key

## 安装 NuGet 包

```xml
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.6.1" />
```

## 创建第一个 Agent

### 方式一：使用 OpenAI

```csharp
using Microsoft.Agents.AI;
using OpenAI;

AIAgent agent = new OpenAIClient(apiKey)
    .GetChatClient("gpt-4o-mini")
    .AsAIAgent(
        instructions: "你是一个有用的助手。",
        name: "MyAgent"
    );

// 同步调用
string response = await agent.RunAsync("给我讲个笑话");
Console.WriteLine(response);
```

### 方式二：使用 Azure OpenAI

```csharp
using Azure.AI.OpenAI;
using Azure.Identity;
using Microsoft.Agents.AI;

AIAgent agent = new AzureOpenAIClient(
    new Uri(endpoint),
    new AzureCliCredential())
    .GetChatClient("gpt-4o-mini")
    .AsAIAgent(
        instructions: "你是一个笑话讲述专家。",
        name: "Joker"
    );
```

### 方式三：使用 ChatClientAgent（推荐，提供更多控制）

```csharp
using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;

ChatClientAgent agent = new ChatClientAgent(
    chatClient,
    new ChatClientAgentOptions
    {
        Name = "MyAgent",
        Description = "一个有用的 AI 助手",
        ChatOptions = new ChatOptions
        {
            Instructions = "你是一个专业的助手...",
            Temperature = 0.7f,
            MaxOutputTokens = 2000
        }
    }
);
```

## 流式响应

```csharp
await foreach (var update in agent.RunStreamingAsync("给我讲个笑话"))
{
    Console.Write(update.Text);
}
```

## 多轮对话

```csharp
// 创建会话
AgentSession session = await agent.CreateSessionAsync();

// 第一轮
await foreach (var update in agent.RunStreamingAsync("讲个关于海盗的笑话", session))
{
    Console.Write(update.Text);
}

// 第二轮（会话保留上下文）
await foreach (var update in agent.RunStreamingAsync(
    "现在用海盗鹦鹉的语调再讲一遍", session))
{
    Console.Write(update.Text);
}
```

## 使用函数工具

```csharp
using System.ComponentModel;
using Microsoft.Extensions.AI;

[Description("获取当前天气")]
public string GetWeather([Description("城市名称")] string city)
{
    return $"{city} 今天晴天，温度 25°C";
}

// 创建带工具的 Agent
AIAgent agent = chatClient.AsAIAgent(
    instructions: "你是一个有用的助手，可以查询天气信息。",
    tools: [AIFunctionFactory.Create(GetWeather)]
);

await foreach (var update in agent.RunStreamingAsync("北京今天天气怎么样？"))
{
    Console.Write(update.Text);
}
```

## 使用 Harness 快速创建（推荐用于生产）

`HarnessAgent` 是一站式预配置 Agent，内置函数调用、消息注入、压缩、工具审批和遥测。

```csharp
using Microsoft.Agents.AI.Harness;

// Harness 从 IChatClient 自动组装完整管道
var harnessAgent = HarnessAgent.Create(chatClient, options =>
{
    options.Name = "MyAgent";
    options.Instructions = "你是一个有用的助手。";
});

await foreach (var update in harnessAgent.RunStreamingAsync("给我讲个笑话"))
{
    Console.Write(update.Text);
}
```

## 下一步

- [核心概念](coreConcepts.md) - 深入了解 AIAgent、AgentSession 等核心类型
- [函数工具](functionTools.md) - CodeAct 沙箱执行、工具审批、Agent 即工具
- [工作流](workflows.md) - 构建复杂的多步骤工作流
- [高级特性](advancedFeatures.md) - HarnessAgent、Hyperlight 沙箱、评估框架
