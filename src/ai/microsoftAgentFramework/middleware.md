---
title: 中间件
lang: zh-CN
date: 2025-04-25
update: 2026-06-06
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

## 从 ASP.NET Core Middleware 说起

如果你有 ASP.NET Core 的开发经验，那么你其实已经掌握了理解 Agent Middleware 所需的 **80% 关键知识**。

无论是 Web 应用还是 AI Agent，本质上都面临同一个问题：

> **如何在不侵入核心业务逻辑的前提下，引入日志、审计、监控等横切能力？**

在 ASP.NET Core 中，请求依次经过一条中间件管道（Pipeline）：

```
Request → Logging → Authentication → Authorization → MVC → Response
```

这种设计的核心价值：

- 将日志、鉴权、异常处理、限流等横切关注点从业务代码中剥离
- 每个中间件只关注自己的职责
- 是否继续执行后续逻辑，由当前中间件通过 `next()` 决定

本质上是一种 **AOP（面向切面编程）模型**。

### ASP.NET Core Middleware 示例

```csharp
public sealed class RequestMetricsMiddleware
{
    private static long _requestCount = 0;
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestMetricsMiddleware> _logger;

    public RequestMetricsMiddleware(RequestDelegate next, ILogger<RequestMetricsMiddleware> _logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var requestId = Interlocked.Increment(ref _requestCount);
        var start = Stopwatch.GetTimestamp();

        _logger.LogInformation("Request #{RequestId} started: {Method} {Path}",
            requestId, context.Request.Method, context.Request.Path);

        await _next(context); // 调用下一个中间件

        var elapsedMs = (Stopwatch.GetTimestamp() - start) * 1000d / Stopwatch.Frequency;
        _logger.LogInformation("Request #{RequestId} finished in {Elapsed} ms", requestId, elapsedMs);
    }
}
```

### 概念映射

| Web 世界 | AI Agent 世界 |
| --- | --- |
| HttpContext | AgentSession / ChatMessage |
| HTTP Request | 用户输入消息 |
| HTTP Response | Agent 输出响应 |
| RequestMetricsMiddleware | Agent Middleware |

## 三条 Pipeline = 三个治理边界

ASP.NET Core 只有一条 HTTP Pipeline，但 Agent Framework 需要同时治理三个不同层面的问题：

1. **模型推理边界（IChatClient Middleware）** — 治理 Agent 与 LLM 之间的请求与响应
2. **行为决策与执行边界（Function Calling Middleware）** — 治理"模型想做什么，系统是否允许"
3. **Agent 运行生命周期边界（Agent Run Middleware）** — 治理一次完整 Agent 运行的整体输入与输出

```
┌─────────────────── Agent Run Middleware ───────────────────┐
│  ┌───────────────── Function Calling MW ────────────────┐  │
│  │  ┌───────────────── IChatClient MW ────────────────┐ │  │
│  │  │              LLM 推理调用                        │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

## AIAgentBuilder 管道

`AIAgentBuilder` 使用中间件模式构建 Agent 处理管道，每个中间件可以在请求前后执行自定义逻辑。

```csharp
using Microsoft.Agents.AI;

var agent = new AIAgentBuilder()
    .Use(async (innerAgent, messages, session, options, ct, next) =>
    {
        // 前置处理
        Console.WriteLine($"请求消息数: {messages.Count()}");
        var response = await next(innerAgent, messages, session, options, ct);
        // 后置处理
        Console.WriteLine("响应完成");
        return response;
    })
    .Build(chatClientAgent);
```

## 链式中间件

多个中间件按注册顺序形成处理链：

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
        messages = messages.Append(new ChatMessage(ChatRole.System, "当前时间: " + DateTime.Now));

        var response = await next(innerAgent, messages, session, options, ct);

        // 修改响应
        return response;
    })
    .Build(chatClientAgent);
```

## 1. IChatClient Middleware（模型推理级）

最底层、最靠近模型的一层，拦截 Agent 与 LLM 之间的请求与响应。

**作用范围：**
- 直接包裹对 LLM 的推理调用
- 拦截发送给模型的 Prompt（ChatMessage）
- 拦截模型返回的原始响应（ChatResponse）

**典型用途：**
- Prompt 审计与日志
- Token / Latency 统计
- 模型调用配额与限流
- 调试真实发送给模型的内容

### 定义

```csharp
async Task<ChatResponse> ChatClientMiddleware(
    IEnumerable<ChatMessage> messages,
    ChatOptions? options,
    IChatClient innerChatClient,
    CancellationToken cancellationToken)
{
    Console.WriteLine("Chat Client Middleware - Pre-Chat");

    var response = await innerChatClient.GetResponseAsync(messages, options, cancellationToken);

    Console.WriteLine("Chat Client Middleware - Post-Chat");
    return response;
}
```

### 注册

IChatClient 中间件在构建 Agent 时注入到底层 ChatClient：

```csharp
var originalAgent = azureOpenAIClient.AsIChatClient()
    .AsBuilder()
    .Use(getResponseFunc: ChatClientMiddleware, getStreamingResponseFunc: null)
    .BuildAIAgent(
        instructions: "You are an AI assistant that helps people find information.",
        tools: [AIFunctionFactory.Create(GetDateTime, name: nameof(GetDateTime))]);
```

除了在 `IChatClient` 级别通过 `AsBuilder().Use()` 注入，还可以通过 DI 管道方式：

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

## 2. Function Calling Middleware（函数调用级）

当模型完成推理后，拦截并治理每一次函数（Tool）调用。

**作用范围：**
- 作用于每一次函数调用，一次 Agent Run 内可能触发 0..N 次
- 拦截并治理结构化的函数名、参数与返回值

**典型用途：**
- 权限控制（Allow/Deny、参数白名单/黑名单）
- 行为审计（函数名、参数、结果、耗时）
- Mock / 结果覆写（沙箱、回放、故障注入）
- Human-in-the-Loop（人工审批/拒绝/修改参数）

### 定义

```csharp
// 审计型：记录函数执行前后信息
async ValueTask<object?> FunctionCallMiddleware(
    AIAgent agent,
    FunctionInvocationContext context,
    Func<FunctionInvocationContext, CancellationToken, ValueTask<object?>> next,
    CancellationToken cancellationToken)
{
    Console.WriteLine($"Function Name: {context!.Function.Name} - Middleware 1 Pre-Invoke");

    var result = await next(context, cancellationToken);

    Console.WriteLine($"Function Name: {context!.Function.Name} - Middleware 1 Post-Invoke");
    return result;
}

// 结果覆写型：对指定函数结果进行覆写
async ValueTask<object?> FunctionCallOverrideWeather(
    AIAgent agent,
    FunctionInvocationContext context,
    Func<FunctionInvocationContext, CancellationToken, ValueTask<object?>> next,
    CancellationToken cancellationToken)
{
    Console.WriteLine($"Function Name: {context!.Function.Name} - Middleware 2 Pre-Invoke");

    var result = await next(context, cancellationToken);

    if (context.Function.Name == nameof(GetWeather))
    {
        result = "The weather is sunny with a high of 25°C.";
    }

    Console.WriteLine($"Function Name: {context!.Function.Name} - Middleware 2 Post-Invoke");
    return result;
}
```

### 注册

```csharp
var agent = originalAgent
    .AsBuilder()
    .Use(FunctionCallMiddleware)          // 先审计
    .Use(FunctionCallOverrideWeather)     // 后覆写
    .Build();

// 执行链：
// FunctionCallMiddleware (Before)
//   → FunctionCallOverrideWeather (Before)
//     → 实际函数执行
//   ← FunctionCallOverrideWeather (After)
// ← FunctionCallMiddleware (After)
```

## 3. Agent Run Middleware（Agent 生命周期级）

最外层，拦截一次完整 Agent Run 的输入消息和最终输出结果。

**作用范围：**
- 处于最外层，最贴近业务语义
- 不关心函数内部发生了什么
- 治理"这一轮 Agent 运行，对外是否合规"

**典型用途：**
- 输入/输出双向 PII 脱敏
- 内容合规（Guardrails）
- 统一审计、兜底与结果转换

### PII 脱敏中间件

```csharp
async Task<AgentResponse> PIIMiddleware(
    IEnumerable<ChatMessage> messages,
    AgentSession? session,
    AgentRunOptions? options,
    AIAgent innerAgent,
    CancellationToken cancellationToken)
{
    var filteredMessages = FilterMessages(messages);
    Console.WriteLine("PII Middleware - Filtered Messages Pre-Run");

    var response = await innerAgent.RunAsync(filteredMessages, session, options, cancellationToken)
        .ConfigureAwait(false);

    response.Messages = FilterMessages(response.Messages);
    Console.WriteLine("PII Middleware - Filtered Messages Post-Run");

    return response;

    static IList<ChatMessage> FilterMessages(IEnumerable<ChatMessage> messages)
        => messages.Select(m => new ChatMessage(m.Role, FilterPii(m.Text))).ToList();

    static string FilterPii(string content)
    {
        Regex[] piiPatterns =
        [
            new(@"\b\d{3}-\d{3}-\d{4}\b", RegexOptions.Compiled),       // 电话号码
            new(@"\b[\w\.-]+@[\w\.-]+\.\w+\b", RegexOptions.Compiled),  // 邮箱
            new(@"\b[A-Z][a-z]+\s[A-Z][a-z]+\b", RegexOptions.Compiled) // 全名
        ];

        foreach (var pattern in piiPatterns)
            content = pattern.Replace(content, "[REDACTED: PII]");

        return content;
    }
}
```

### 内容合规中间件

```csharp
async Task<AgentResponse> GuardrailMiddleware(
    IEnumerable<ChatMessage> messages,
    AgentSession? session,
    AgentRunOptions? options,
    AIAgent innerAgent,
    CancellationToken cancellationToken)
{
    var filteredMessages = FilterMessages(messages);
    Console.WriteLine("Guardrail Middleware - Filtered messages Pre-Run");

    var response = await innerAgent.RunAsync(filteredMessages, session, options, cancellationToken);

    response.Messages = FilterMessages(response.Messages);
    Console.WriteLine("Guardrail Middleware - Filtered messages Post-Run");

    return response;

    List<ChatMessage> FilterMessages(IEnumerable<ChatMessage> messages)
        => messages.Select(m => new ChatMessage(m.Role, FilterContent(m.Text))).ToList();

    static string FilterContent(string content)
    {
        foreach (var keyword in new[] { "harmful", "illegal", "violence" })
        {
            if (content.Contains(keyword, StringComparison.OrdinalIgnoreCase))
                return "[REDACTED: Forbidden content]";
        }
        return content;
    }
}
```

### 注册

```csharp
var middlewareEnabledAgent = originalAgent
    .AsBuilder()
    .Use(FunctionCallMiddleware)           // 函数调用中间件
    .Use(FunctionCallOverrideWeather)      // 函数调用中间件
    .Use(PIIMiddleware, null)              // Agent Run 中间件（非流式, 流式为 null）
    .Use(GuardrailMiddleware, null)        // Agent Run 中间件
    .Build();
```

::: tip 一句话定位
- Agent Run Middleware 管 **"说什么"**
- Function Calling Middleware 管 **"做不做"**
- IChatClient Middleware 管 **"模型怎么调"**
:::

## Streaming Middleware（流式中间件）

`Use` 方法的第二个参数 `runStreamingFunc` 用于注册流式中间件。建议非流式与流式成对注册，否则 Streaming 可能退化为非流式执行。

```csharp
var agent = originalAgent
    .AsBuilder()
    .Use(
        runFunc: PIIMiddleware,                     // 非流式
        runStreamingFunc: PIIMiddlewareStreaming)    // 流式
    .Build();
```

如果只提供 `runFunc` 而不提供 `runStreamingFunc`，框架会将 `RunStreamingAsync` 的调用退化为先执行 `runFunc`，再将结果拆分为 `AgentResponseUpdate` 逐条返回。

## Per-Request Middleware（按请求中间件）

通过 `ChatClientAgentRunOptions` 的 `ChatClientFactory` 属性，可以为单次请求注入额外的中间件管道。

### 按请求的 ChatClient 中间件

```csharp
var optionsWithMiddleware = new ChatClientAgentRunOptions(new()
{
    Tools = [AIFunctionFactory.Create(GetWeather, name: nameof(GetWeather))]
})
{
    ChatClientFactory = (chatClient) => chatClient
        .AsBuilder()
        .Use(PerRequestChatClientMiddleware, null) // 仅对此次请求生效
        .Build()
};
```

### 按请求的 Function Calling 中间件

```csharp
var response = await originalAgent
    .AsBuilder()
    .Use(PerRequestFunctionCallingMiddleware)  // 按请求的函数调用中间件
    .Use(ConsolePromptingApprovalMiddleware, null)  // 人工审批中间件
    .Build()
    .RunAsync("What's the weather?", session, optionsWithMiddleware);
```

## Human-in-the-Loop 审批

框架内置了函数调用审批机制，允许在模型决定调用工具后由人工确认。

### 使用 ApprovalRequiredAIFunction

将需要审批的函数包装为 `ApprovalRequiredAIFunction`：

```csharp
var optionsWithApproval = new ChatClientAgentRunOptions(new()
{
    Tools = [new ApprovalRequiredAIFunction(AIFunctionFactory.Create(GetWeather, name: nameof(GetWeather)))],
});
```

### 控制台审批中间件

```csharp
async Task<AgentResponse> ConsolePromptingApprovalMiddleware(
    IEnumerable<ChatMessage> messages,
    AgentSession? session,
    AgentRunOptions? options,
    AIAgent innerAgent,
    CancellationToken cancellationToken)
{
    AgentResponse response = await innerAgent.RunAsync(messages, session, options, cancellationToken);

    // 检查是否有待审批的函数调用请求
    List<ToolApprovalRequestContent> approvalRequests = response.Messages
        .SelectMany(m => m.Contents)
        .OfType<ToolApprovalRequestContent>()
        .ToList();

    while (approvalRequests.Count > 0)
    {
        // 逐一请求用户审批
        response.Messages = approvalRequests.ConvertAll(req =>
        {
            Console.WriteLine($"The agent would like to invoke: {((FunctionCallContent)req.ToolCall).Name}");
            Console.WriteLine("Reply Y to approve:");
            bool approved = Console.ReadLine()?.Equals("Y", StringComparison.OrdinalIgnoreCase) ?? false;
            return new ChatMessage(ChatRole.User, [req.CreateResponse(approved)]);
        });

        response = await innerAgent.RunAsync(response.Messages, session, options, cancellationToken);
        approvalRequests = response.Messages
            .SelectMany(m => m.Contents)
            .OfType<ToolApprovalRequestContent>()
            .ToList();
    }

    return response;
}
```

## AIContextProvider Middleware（上下文注入）

`UseAIContextProviders` 扩展方法用于在 Agent 调用前注入额外的上下文消息。

### Agent 级别

```csharp
var contextProviderAgent = originalAgent
    .AsBuilder()
    .UseAIContextProviders(new DateTimeContextProvider())
    .Build();

// 自定义 Provider
internal sealed class DateTimeContextProvider : MessageAIContextProvider
{
    protected override ValueTask<IEnumerable<ChatMessage>> ProvideMessagesAsync(
        InvokingContext context,
        CancellationToken cancellationToken = default)
    {
        Console.WriteLine("DateTimeContextProvider - Injecting current date/time context");
        return new ValueTask<IEnumerable<ChatMessage>>(
            [new ChatMessage(ChatRole.User, $"For reference, the current date and time is: {DateTimeOffset.Now}")]);
    }
}
```

### ChatClient 级别

AIContextProvider 也可以在 ChatClient 管道中使用，不仅能注入消息，还能丰富 tools 和 instructions：

```csharp
var chatClientProviderAgent = azureOpenAIClient.AsIChatClient()
    .AsBuilder()
    .UseAIContextProviders(new DateTimeContextProvider())
    .BuildAIAgent(instructions: "You are an AI assistant.");
```

## DelegatingAIAgent（装饰器模式）

`DelegatingAIAgent` 是装饰器模式的基类，用于创建可组合的 Agent 中间件。所有通过 `AIAgentBuilder.Use()` 注册的中间件最终都被包装为 `AnonymousDelegatingAIAgent`，它继承自 `DelegatingAIAgent`。

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
        IEnumerable<ChatMessage> messages,
        AgentSession? session = null,
        AgentRunOptions? options = null,
        CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Agent 请求: {MessageCount}", messages.Count());
        var response = await InnerAgent.RunAsync(messages, session, options, cancellationToken);
        _logger.LogInformation("Agent 响应完成");
        return response;
    }
}
```

### 内置的 DelegatingAIAgent 实现

| 实现 | 说明 |
| --- | --- |
| `LoggingAgent` | 日志记录中间件 |
| `OpenTelemetryAgent` | OpenTelemetry 遥测 |
| `FunctionInvokingAgent` | 函数调用处理 |
| `ToolApprovalAgent` | 工具审批（v1.6.1 新增） |

### AIAgentBuilder 内部机制

```csharp
// AIAgentBuilder.Build() 内部按逆序应用工厂，确保第一个注册的中间件是最外层
public AIAgent Build(IServiceProvider? services = null)
{
    var agent = this._innerAgentFactory(services);
    if (this._agentFactories is not null)
    {
        for (var i = this._agentFactories.Count - 1; i >= 0; i--)
            agent = this._agentFactories[i](agent, services);
    }
    return agent;
}
```

### Use 方法的多种重载

```csharp
// 重载 1：共享函数（同时处理 Run 和 Streaming）
AIAgentBuilder Use(Func<Messages, Session, Options, Func<...>, CT, Task> sharedFunc)

// 重载 2：分离的 Run / Streaming 函数
AIAgentBuilder Use(
    Func<Messages, Session, Options, AIAgent, CT, Task<AgentResponse>>? runFunc,
    Func<Messages, Session, Options, AIAgent, CT, IAsyncEnumerable<AgentResponseUpdate>>? runStreamingFunc)

// 重载 3：直接传入 Agent 工厂
AIAgentBuilder Use(Func<AIAgent, AIAgent> agentFactory)

// 重载 4：Function Calling 中间件
// 通过 .Use(FunctionCallMiddleware) 注册，签名自动匹配
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
        messages = messages.Prepend(new ChatMessage(ChatRole.System,
            $"当前用户: {GetCurrentUser()}, 时间: {DateTime.Now}"));

        var response = await next(innerAgent, messages, session, options, ct);

        // 后处理响应
        return response;
    })
    .Build(chatClientAgent);
```

## 完整示例

以下示例展示三类中间件在一次 Agent Run 中协同工作：

```csharp
// 定义工具函数
[Description("Get the weather for a given location.")]
static string GetWeather([Description("The location to get the weather for.")] string location)
    => $"The weather in {location} is cloudy with a high of 15°C.";

[Description("The current datetime offset.")]
static string GetDateTime() => DateTimeOffset.Now.ToString();

// 1. 构建 originalAgent（注入 IChatClient 中间件）
var originalAgent = azureOpenAIClient.AsIChatClient()
    .AsBuilder()
    .Use(getResponseFunc: ChatClientMiddleware, getStreamingResponseFunc: null)
    .BuildAIAgent(
        instructions: "You are an AI assistant that helps people find information.",
        tools: [AIFunctionFactory.Create(GetDateTime, name: nameof(GetDateTime))]);

// 2. 添加 Agent 级别中间件
var middlewareEnabledAgent = originalAgent
    .AsBuilder()
    .Use(FunctionCallMiddleware)           // Function Calling 中间件
    .Use(FunctionCallOverrideWeather)      // Function Calling 结果覆写
    .Use(PIIMiddleware, null)              // Agent Run PII 脱敏
    .Use(GuardrailMiddleware, null)        // Agent Run 内容合规
    .Build();

var session = await middlewareEnabledAgent.CreateSessionAsync();

// 示例 1：内容合规
var guardRailedResponse = await middlewareEnabledAgent.RunAsync("Tell me something harmful.");
Console.WriteLine($"Guard railed response: {guardRailedResponse}");

// 示例 2：PII 检测
var piiResponse = await middlewareEnabledAgent.RunAsync(
    "My name is John Doe, call me at 123-456-7890 or email me at john@something.com");
Console.WriteLine($"PII filtered response: {piiResponse}");

// 示例 3：函数调用中间件
var options = new ChatClientAgentRunOptions(new()
{
    Tools = [AIFunctionFactory.Create(GetWeather, name: nameof(GetWeather))]
});
var functionCallResponse = await middlewareEnabledAgent
    .RunAsync("What's the current time and the weather in Seattle?", session, options);
Console.WriteLine($"Function calling response: {functionCallResponse}");
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

## 总结

| 中间件类型 | 治理层面 | 关注点 | 典型用途 |
| --- | --- | --- | --- |
| IChatClient Middleware | 模型推理边界 | 模型调用是否可控 | Prompt 审计、Token 统计、限流 |
| Function Calling Middleware | 行为决策/执行边界 | 行为是否可审计 | 权限控制、审计、Mock、人工审批 |
| Agent Run Middleware | 业务语义层面 | 输入输出是否合规 | PII 脱敏、Guardrails、结果转换 |

Agent Framework 的 Middleware 不是为了"让 Agent 更复杂"，而是让复杂性被 **有序地隔离**。通过将横切关注点拆分到不同层次，开发者可以在不侵入 Agent 核心逻辑的前提下，构建一个可治理、可审计、可扩展的企业级 AI 系统。
