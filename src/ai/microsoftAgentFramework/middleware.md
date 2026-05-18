---
title: 中间件
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
  - 中间件
---

# 中间件与可观测性

## AIAgentBuilder 管道

`AIAgentBuilder` 使用中间件模式构建 Agent 处理管道，每个中间件可以在请求前后执行自定义逻辑。

```csharp
using Microsoft.Agents.AI;

var agent = new AIAgentBuilder()
    .Use(async (innerAgent, messages, session, options, ct, next) =>
    {
        // 前置处理
        Console.WriteLine($"请求消息数: {messages.Count}");
        var response = await next(innerAgent, messages, session, options, ct);
        // 后置处理
        Console.WriteLine("响应完成");
        return response;
    })
    .Build(chatClientAgent);
```

## 链式中间件

```csharp
var agent = new AIAgentBuilder()
    .Use(LoggingMiddleware)
    .Use(RetryMiddleware)
    .Use(CachingMiddleware)
    .Build(chatClientAgent);

// 执行顺序：Logging -> Retry -> Caching -> ChatClientAgent
```

## 内置中间件扩展（v1.6.1）

```csharp
var agent = new AIAgentBuilder()
    .UseOpenTelemetry()        // OpenTelemetry 遥测（分布式追踪、指标、日志）
    .UseToolApproval()         // 工具审批（"Don't ask again" 规则）
    .UseAIContextProviders(     // 上下文注入
        new TimeContextProvider(),
        new CustomRagProvider())
    .UseLogging(loggerFactory) // 日志记录
    .Build(chatClientAgent);
```

## 自定义中间件

```csharp
// 使用匿名中间件
var agent = new AIAgentBuilder()
    .Use(async (innerAgent, messages, session, options, ct, next) =>
    {
        // 修改请求
        messages.Add(new ChatMessage(ChatRole.System, "当前时间: " + DateTime.Now));

        var response = await next(innerAgent, messages, session, options, ct);

        // 修改响应
        return response;
    })
    .Build(chatClientAgent);
```

## DelegatingAIAgent

`DelegatingAIAgent` 是装饰器模式的基类，用于创建可组合的 Agent 中间件。

```csharp
using Microsoft.Agents.AI.Abstractions;

public class LoggingAgent : DelegatingAIAgent
{
    private readonly ILogger _logger;

    public LoggingAgent(AIAgent innerAgent, ILogger logger) : base(innerAgent)
    {
        _logger = logger;
    }

    public override async Task<AgentResponse> RunAsync(
        string message,
        AgentSession? session = null,
        AgentRunOptions? options = null,
        CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Agent 请求: {Message}", message);
        var response = await InnerAgent.RunAsync(message, session, options, cancellationToken);
        _logger.LogInformation("Agent 响应完成");
        return response;
    }
}
```

内置的 `DelegatingAIAgent` 实现：

| 实现 | 说明 |
| --- | --- |
| `LoggingAgent` | 日志记录中间件 |
| `OpenTelemetryAgent` | OpenTelemetry 遥测 |
| `FunctionInvokingAgent` | 函数调用处理 |
| `ToolApprovalAgent` | 工具审批（v1.6.1 新增） |

## IChatClient 中间件

除了 Agent 级别的中间件，还可以在 `IChatClient` 级别添加中间件：

```csharp
using Microsoft.Extensions.AI;

// 方式一：通过 AsAIAgent
var agent = chatClient
    .AsIChatClient()
    .AsAIAgent(instructions: "你是一个助手");

// 方式二：通过 DI 管道
builder.Services.AddChatClient(chatClient)
    .UseLogging()
    .UseOpenTelemetry();
```

## 日志记录

```csharp
// 方式一：在创建 Agent 时传入 LoggerFactory
ChatClientAgent agent = new ChatClientAgent(
    chatClient,
    new ChatClientAgentOptions
    {
        LoggerFactory = loggerFactory
    }
);

// 方式二：通过 AIAgentBuilder
var agent = new AIAgentBuilder()
    .UseLogging(loggerFactory)
    .Build(chatClientAgent);

// 方式三：通过 DI 管道
builder.Services.AddChatClient(chatClient)
    .UseLogging();
```

## OpenTelemetry

v1.6.1 提供了完整的 OpenTelemetry 集成，支持分布式追踪、指标和日志。

### 基础使用

```csharp
// 通过 AIAgentBuilder
var agent = new AIAgentBuilder()
    .UseOpenTelemetry()
    .Build(chatClientAgent);

// 通过 DI
builder.Services.AddChatClient(chatClient)
    .UseOpenTelemetry();
```

### Aspire Dashboard 集成

```csharp
// 使用 .NET Aspire Dashboard 实时查看 Agent 遥测
// Docker 部署 Aspire Dashboard
// PowerShell 自动化脚本启动 demo
```

### Grafana 仪表盘

```csharp
// 自定义 Grafana 仪表盘
// Agent Overview 面板
// Workflow Overview 面板
```

### Application Insights

```csharp
// 生产环境使用 Azure Monitor Application Insights
// 自动收集追踪、指标和日志
```

## 重试中间件

```csharp
var agent = new AIAgentBuilder()
    .Use(async (innerAgent, messages, session, options, ct, next) =>
    {
        int retryCount = 0;
        const int maxRetries = 3;

        while (retryCount < maxRetries)
        {
            try
            {
                return await next(innerAgent, messages, session, options, ct);
            }
            catch (HttpRequestException ex) when (retryCount < maxRetries - 1)
            {
                retryCount++;
                await Task.Delay(TimeSpan.FromSeconds(Math.Pow(2, retryCount)), ct);
            }
        }

        throw new InvalidOperationException("超过最大重试次数");
    })
    .Build(chatClientAgent);
```

## 请求/响应修改

```csharp
var agent = new AIAgentBuilder()
    .Use(async (innerAgent, messages, session, options, ct, next) =>
    {
        // 注入额外上下文
        messages.Insert(0, new ChatMessage(ChatRole.System,
            $"当前用户: {GetCurrentUser()}, 时间: {DateTime.Now}"));

        var response = await next(innerAgent, messages, session, options, ct);

        // 后处理响应
        return response;
    })
    .Build(chatClientAgent);
```

## DevUI（开发调试界面）

框架提供 `Microsoft.Agents.AI.DevUI` 包，提供交互式 Web 调试界面。

```xml
<PackageReference Include="Microsoft.Agents.AI.DevUI" Version="1.6.1" />
```

### DevUI + Aspire 集成（v1.6.1 新增）

```xml
<PackageReference Include="Aspire.Hosting.AgentFramework.DevUI" Version="1.6.1" />
```

```csharp
// 在 Aspire AppHost 中注册 DevUI
var builder = DistributedApplication.CreateBuilder(args);

// 添加多个 Agent 服务
var agent1 = builder.AddProject<Projects.AgentService>("agent1")
    .WithAgentService("WriterAgent");
var agent2 = builder.AddProject<Projects.AgentService>("agent2")
    .WithAgentService("EditorAgent");

// DevUI 自动发现所有注册的 Agent
builder.AddAgentFrameworkDevUI("devui");
```

DevUI 特性：
- 自动发现注册的 Agent
- 实时可视化 Agent 执行
- 多 Agent 统一调试界面
- 支持 Azure AI Foundry 集成
