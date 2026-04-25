---
title: 函数工具
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
  - 工具
---

# 函数工具

## 基本用法

### 定义函数

```csharp
using System.ComponentModel;
using Microsoft.Extensions.AI;

[Description("获取当前天气")]
public string GetWeather([Description("城市名称")] string city)
{
    return $"{city} 今天晴天，温度 25°C";
}

[Description("获取股票价格")]
public decimal GetStockPrice([Description("股票代码")] string symbol)
{
    return 150.25m;
}
```

### 创建带工具的 Agent

```csharp
using Microsoft.Agents.AI;

// 方式一：通过 AsAIAgent 扩展方法
AIAgent agent = chatClient.AsAIAgent(
    instructions: "你是一个有用的助手，可以查询天气信息。",
    tools: [AIFunctionFactory.Create(GetWeather)]
);

// 方式二：通过 ChatClientAgentOptions
ChatClientAgent agent = new ChatClientAgent(
    chatClient,
    new ChatClientAgentOptions
    {
        Name = "MyAgent",
        ChatOptions = new ChatOptions
        {
            Instructions = "你是一个有用的助手。",
            Tools = [
                AIFunctionFactory.Create(GetWeather),
                AIFunctionFactory.Create(GetStockPrice)
            ]
        }
    }
);
```

### 使用

```csharp
await foreach (var update in agent.RunStreamingAsync("北京今天天气怎么样？"))
{
    Console.Write(update.Text);
}
```

## 工具审批（Tool Approvals）

对于敏感操作，可以设置工具需要人工审批。

```csharp
// 配置需要审批的工具
var options = new AgentRunOptions
{
    // 工具审批回调
};

// AI 调用工具前会请求审批
// 审批通过后才执行
```

## Agent 即工具（Agent as Tool）

一个 Agent 可以被包装为工具供其他 Agent 调用。

```csharp
// 创建专家 Agent
AIAgent weatherAgent = chatClient.AsAIAgent(
    instructions: "你是天气专家",
    name: "WeatherExpert"
);

// 将 Agent 包装为工具
AIAgent orchestrator = chatClient.AsAIAgent(
    instructions: "你是调度员，可以调用天气专家查询天气。",
    tools: [weatherAgent.AsAITool()]
);

var response = await orchestrator.RunAsync("北京天气怎么样？");
```

## MCP 工具（Model Context Protocol）

框架内置 MCP 支持，可以将 MCP 服务器作为工具源。

```xml
<PackageReference Include="Microsoft.Agents.AI.Workflows.Declarative.Mcp" Version="1.1.0" />
```

### MCP Server 示例

框架提供 4 个 MCP 相关示例：
- MCP Server 基础
- MCP Server 带认证
- Foundry 托管 MCP
- Response Agent 托管 MCP

## AIFunctionFactory 高级用法

```csharp
// 从静态方法创建
AITool tool1 = AIFunctionFactory.Create(typeof(MyHelpers).GetMethod("GetWeather")!);

// 从 Lambda 创建
AITool tool2 = AIFunctionFactory.Create((string city) => $"{city}: 25°C",
    name: "get_weather",
    description: "获取天气");

// 带复杂参数
AITool tool3 = AIFunctionFactory.Create((WeatherRequest request) => "...",
    name: "get_detailed_weather",
    description: "获取详细天气信息");
```

## 流式响应中的工具调用

```csharp
await foreach (var update in agent.RunStreamingAsync("北京和上海的天气"))
{
    // update 可能包含工具调用结果
    // 框架自动处理工具调用循环
    Console.Write(update.Text);
}
```
