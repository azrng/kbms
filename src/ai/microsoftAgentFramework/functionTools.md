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

对于敏感操作，可以设置工具需要人工审批。支持 "Don't ask again" 规则和自动审批规则。

```csharp
// 方式一：通过 AIAgentBuilder（推荐）
var agent = chatClientAgent.AsBuilder()
    .UseToolApproval(new ToolApprovalAgentOptions
    {
        // 自动审批规则：通过启发式函数决定是否自动批准
        AutoApprovalRules =
        [
            // 例：自动批准所有只读操作（函数名以 "Get" 开头的）
            call => new ValueTask<bool>(call.Name.StartsWith("Get"))
        ]
    })
    .Build();

// 方式二：ToolApprovalAgent 装饰器
var agent = new ToolApprovalAgent(chatClientAgent, new ToolApprovalAgentOptions
{
    AutoApprovalRules =
    [
        call => new ValueTask<bool>(call.Name.StartsWith("Get"))
    ]
});

// AI 调用工具前会请求审批
// 用户可选择 "Don't ask again" 记住审批决策
```

## CodeAct 模式（沙箱代码执行）

v1.9.0 新增 Hyperlight 沙箱执行，Agent 可在安全隔离的 VM 中执行代码。

```xml
<PackageReference Include="Microsoft.Agents.AI.Hyperlight" Version="1.9.0" />
```

### 基础 CodeAct

```csharp
using Microsoft.Agents.AI.Hyperlight;

// 通过 AIContextProvider 注入 execute_code 工具
var codeActProvider = new HyperlightCodeActProvider(new HyperlightCodeActProviderOptions
{
    // 沙箱配置
});

var agent = chatClientAgent.AsBuilder()
    .UseAIContextProviders(codeActProvider)
    .Build();

// Agent 现在可以自主编写并执行代码
await foreach (var update in agent.RunStreamingAsync("写一个 Python 函数计算斐波那契数列"))
{
    Console.Write(update.Text);
}
```

### 手动注册 CodeAct 工具

```csharp
// 直接作为 Agent 工具使用
var executeCode = new HyperlightExecuteCodeFunction(new HyperlightExecuteCodeOptions
{
    ApprovalMode = CodeActApprovalMode.NeverRequire  // 或 AlwaysRequire
});

AIAgent agent = chatClient.AsAIAgent(
    instructions: "你可以执行代码来解决问题",
    tools: [executeCode.AsAITool()]
);
```

### 沙箱安全配置

```csharp
var provider = new HyperlightCodeActProvider(new HyperlightCodeActProviderOptions
{
    // 文件系统挂载
    MountPaths = ["/data"],

    // 网络白名单
    AllowedHosts = ["api.example.com"],

    // 审批模式
    ApprovalMode = CodeActApprovalMode.AlwaysRequire
});
```

沙箱特性：
- 每次运行快照/恢复，确保干净状态
- 支持宿主工具在沙箱内调用（`call_tool(...)`）
- 可选文件系统和网络访问
- VM 级隔离，安全执行不受信代码

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
<PackageReference Include="Microsoft.Agents.AI.Workflows.Declarative.Mcp" Version="1.9.0" />
```

### MCP Server 示例

框架提供 4 个 MCP 相关示例：
- MCP Server 基础
- MCP Server 带认证
- Foundry 托管 MCP
- Response Agent 托管 MCP

### Foundry Toolbox MCP

非托管 Agent 也可通过 MCP 使用 Foundry 工具箱：

```csharp
// 通过 Foundry Toolbox MCP 访问 Foundry 工具
```

## 动态函数工具

v1.9.0 新增动态创建函数工具的能力。

```csharp
// 运行时动态创建和注册工具
// 允许根据用户输入或配置动态添加工具
```

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

## Deep Research 工具

v1.9.0 新增深度研究模式，使用 o3 深度推理模型 + Bing grounding。

```csharp
// Deep Research 工具支持多轮 Web 搜索
// 自动归纳、推理、生成研究报告
```
