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
- OpenAI、Azure OpenAI 或 Microsoft Foundry 的接入凭据

## 安装 NuGet 包

```xml
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.20.0" />
```

## 创建第一个 Agent

### 方式一：使用 OpenAI

```csharp
using Microsoft.Agents.AI;
using OpenAI;

AIAgent agent = new OpenAIClient(apiKey)
    .GetChatClient("gpt-5.4-mini")
    .AsAIAgent(
        instructions: "你是一个有用的助手。",
        name: "MyAgent"
    );

// 同步调用（RunAsync 返回 Task<AgentResponse>，通过 .Text 获取文本结果）
AgentResponse response = await agent.RunAsync("给我讲个笑话");
Console.WriteLine(response.Text);
```

### 方式二：使用 Microsoft Foundry（官方入门示例的默认方式）

官方示例 `dotnet/samples/01-get-started/01_hello_agent/` 现已默认使用 Foundry：通过 `AIProjectClient`（`Azure.AI.Projects`）+ `AsAIAgent` 扩展创建 Agent，环境变量为 `FOUNDRY_PROJECT_ENDPOINT` 和 `FOUNDRY_MODEL`（默认模型 `gpt-5.4-mini`）。

需额外安装 `Microsoft.Agents.AI.Foundry`（扩展方法就定义在其中）和 `Azure.Identity`：

```xml
<PackageReference Include="Microsoft.Agents.AI.Foundry" Version="1.20.0" />
<PackageReference Include="Azure.Identity" Version="1.21.0" />
```

```csharp
using Azure.AI.Projects;
using Azure.Identity;
using Microsoft.Agents.AI;

AIAgent agent = new AIProjectClient(
        new Uri(Environment.GetEnvironmentVariable("FOUNDRY_PROJECT_ENDPOINT")!),
        new DefaultAzureCredential())
    .AsAIAgent(
        model: Environment.GetEnvironmentVariable("FOUNDRY_MODEL") ?? "gpt-5.4-mini",
        instructions: "你是一个笑话讲述专家。",
        name: "Joker");

AgentResponse response = await agent.RunAsync("给我讲个笑话");
Console.WriteLine(response.Text);
```

> 说明：`AsAIAgent(this AIProjectClient, model, instructions, name, ...)` 扩展方法位于 `Azure.AI.Projects` 命名空间（由 `Microsoft.Agents.AI.Foundry` 包提供），因此只需 `using Azure.AI.Projects;` 即可调用；`Azure.Identity` 仅用于提供 `DefaultAzureCredential`。

### 方式三：使用 Azure OpenAI

```csharp
using Azure.AI.OpenAI;
using Azure.Identity;
using Microsoft.Agents.AI;

AIAgent agent = new AzureOpenAIClient(
    new Uri(endpoint),
    new AzureCliCredential())
    .GetChatClient("gpt-5.4-mini")
    .AsAIAgent(
        instructions: "你是一个笑话讲述专家。",
        name: "Joker"
    );
```

### 方式四：使用 ChatClientAgent（推荐，提供更多控制）

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

`HarnessAgent` 是一站式预配置 Agent，内置函数调用、消息注入、压缩、工具审批和遥测。注意：token 上限等配置已全部收进 `HarnessAgentOptions`，`AsHarnessAgent` 扩展方法定义在 `Microsoft.Extensions.AI` 命名空间。

```csharp
using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;  // AsHarnessAgent 扩展方法所在命名空间

// 方式一：通过构造函数创建
var harnessAgent = new HarnessAgent(chatClient, new HarnessAgentOptions
{
    Name = "MyAgent",
    ChatOptions = new ChatOptions
    {
        Instructions = "你是一个有用的助手。"
    },
    MaxContextWindowTokens = 1_050_000,  // 模型上下文窗口大小
    MaxOutputTokens = 128_000            // 最大输出 token 数
});

// 方式二：通过扩展方法创建
var harnessAgent = chatClient.AsHarnessAgent(new HarnessAgentOptions
{
    Name = "MyAgent",
    ChatOptions = new ChatOptions
    {
        Instructions = "你是一个有用的助手。"
    },
    MaxContextWindowTokens = 1_050_000,
    MaxOutputTokens = 128_000
});

await foreach (var update in harnessAgent.RunStreamingAsync("给我讲个笑话"))
{
    Console.Write(update.Text);
}
```

`HarnessAgentOptions` 还提供了大量开箱可用的开关：

- `CompactionStrategy` / `DisableCompaction`：上下文压缩策略（默认关闭压缩）
- `HarnessInstructions`：Harness 内置指令的补充/覆盖
- `ToolApprovalAgentOptions` / `DisableToolAutoApproval`：工具审批行为
- `LoopEvaluators`：循环内评估器，可提前终止迭代
- `DisableWebSearch` / `DisableTodoProvider` / `DisableAgentModeProvider`：按需关闭内置的 Web 搜索、Todo、Agent 模式等上下文提供器
- `FileMemoryStore` / `FileAccessStore`：文件记忆与文件访问的持久化存储

## 下一步

- [核心概念](coreConcepts.md) - 深入了解 AIAgent、AgentSession 等核心类型
- [函数工具](functionTools.md) - CodeAct 沙箱执行、工具审批、Agent 即工具
- [工作流](workflows.md) - 构建复杂的多步骤工作流
- [高级特性](advancedFeatures.md) - HarnessAgent、Hyperlight 沙箱、评估框架
