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

> 源码快照：`fa9e0865`（2026-06-06），可通过 `git diff fa9e08657` 查看后续变更
>
> 示例代码：`agent-framework/dotnet/samples/02-agents/Agents/Agent_Step11_Middleware/`
>
> 源码路径：`agent-framework/dotnet/src/Microsoft.Agents.AI/`

## 从 ASP.NET Core Middleware 说起

如果你有 ASP.NET Core 的开发经验，理解 Agent Middleware 就简单多了——它们背后是同一个思路。

核心问题就一个：

> **怎样在不改核心业务代码的情况下，把日志、鉴权、限流这些"横切关注点"加上去？**

在 ASP.NET Core 中，请求依次经过一条中间件管道：

```
请求进来 → 记日志 → 验身份 → 验权限 → 处理业务 → 返回响应
```

每个中间件只干一件事，通过调用 `next()` 把请求传给下一个。这本质上就是 **AOP（面向切面编程）** 的思想。

### ASP.NET Core Middleware 示例

```csharp
public sealed class RequestMetricsMiddleware
{
    private static long _requestCount = 0;
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestMetricsMiddleware> _logger;

    public RequestMetricsMiddleware(RequestDelegate next, ILogger<RequestMetricsMiddleware> logger)
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

简单来说，Web 请求和 Agent 请求的处理流程是一一对应的：

| Web 世界 | AI Agent 世界 |
| --- | --- |
| HttpContext | AgentSession / ChatMessage |
| HTTP Request | 用户输入消息 |
| HTTP Response | Agent 输出响应 |
| RequestMetricsMiddleware | Agent Middleware |

## 三条 Pipeline = 三个治理边界

Web 应用只有一条管道，但 Agent 的情况更复杂——一次 Agent 运行涉及三个不同层面的问题：

1. **模型调用层（IChatClient Middleware）** — 管理和 LLM 之间的对话，比如记录发给模型的 Prompt、统计 Token 用量
2. **工具调用层（Function Calling Middleware）** — 管理模型决定要调用工具时的行为，比如"这个操作允许执行吗？"
3. **Agent 运行层（Agent Run Middleware）** — 管理整体输入输出，比如脱敏个人信息、过滤违规内容

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

`AIAgentBuilder` 是构建中间件管道的核心。每个中间件就像洋葱皮一样包裹在 Agent 外面，请求进来时先经过"前置处理"，调用 `next()` 穿透到下一层，返回时再经过"后置处理"。

```csharp
using Microsoft.Agents.AI;

var agent = chatClientAgent.AsBuilder()
    .Use(async (innerAgent, messages, session, options, ct, next) =>
    {
        // 前置处理：请求还没到 Agent 之前
        Console.WriteLine($"请求消息数: {messages.Count()}");

        var response = await next(innerAgent, messages, session, options, ct);

        // 后置处理：Agent 返回结果之后
        Console.WriteLine("响应完成");
        return response;
    })
    .Build();
```

## 链式中间件

可以连续注册多个中间件，形成一条处理链：

```csharp
var agent = chatClientAgent.AsBuilder()
    .Use(LoggingMiddleware)    // 最先执行（最外层）
    .Use(RetryMiddleware)
    .Use(CachingMiddleware)    // 最后执行（最内层，靠近 Agent）
    .Build();

// 请求进来：Logging -> Retry -> Caching -> Agent
// 响应返回：Agent -> Caching -> Retry -> Logging
```

## 内置中间件扩展

框架已经内置了常用的中间件，开箱即用：

```csharp
var agent = chatClientAgent.AsBuilder()
    .UseOpenTelemetry()        // 分布式追踪、指标、日志
    .UseToolApproval(          // 工具审批（支持自动审批规则）
        new ToolApprovalAgentOptions
        {
            AutoApprovalRules =
            [
                // 例：自动批准所有只读操作（函数名以 "Get" 开头的）
                call => new ValueTask<bool>(call.Name.StartsWith("Get"))
            ]
        })
    .UseAIContextProviders(     // 上下文注入（自动注入时间、用户信息等）
        new TimeContextProvider(),
        new CustomRagProvider())
    .UseLogging(loggerFactory) // 日志记录
    .Build();
```

`UseToolApproval()` 支持三种审批机制：

1. **Standing Rule**：用户手动审批后选择"Don't ask again"，后续同类调用自动放行
2. **Auto-Approval Rules**：通过 `ToolApprovalAgentOptions.AutoApprovalRules` 配置启发式规则，满足条件的自动放行
3. **手动审批**：每次都需要用户确认（默认行为）

## 自定义中间件

```csharp
// 使用匿名中间件
var agent = chatClientAgent.AsBuilder()
    .Use(async (innerAgent, messages, session, options, ct, next) =>
    {
        // 修改请求：注入当前时间
        messages = messages.Append(new ChatMessage(ChatRole.System, "当前时间: " + DateTime.Now));

        var response = await next(innerAgent, messages, session, options, ct);

        // 修改响应：这里可以做后处理
        return response;
    })
    .Build();
```

## 1. IChatClient Middleware（模型推理级）

这是最底层的中间件，直接包裹对 LLM 的调用。你可以理解为：它能拦截"发给模型的内容"和"模型返回的内容"。

**能做什么：**
- 记录发给模型的 Prompt（方便排查问题）
- 统计 Token 用量和响应耗时
- 限制调用频率（防止超配额）
- 调试：看清楚到底发了什么给模型

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

当模型决定调用某个工具时，这个中间件就能介入。比如模型想调用 `GetWeather("北京")`，你可以在真正执行之前拦截它。

**能做什么：**
- 权限控制：哪些工具能用、哪些参数不允许
- 审计记录：记录每次工具调用的函数名、参数、结果
- 结果覆写：沙箱模式下替换工具返回值（比如测试时返回假数据）
- 人工审批：某些敏感操作需要人工确认后才执行

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

这是最外层的中间件，包裹整个 Agent 运行过程。它不关心中间调用了几次模型、用了哪些工具，只关心"用户说了什么"和"Agent 最终回了什么"。

**能做什么：**
- 个人信息脱敏：自动把手机号、邮箱、姓名替换成 `[REDACTED: PII]`
- 内容合规：检测并屏蔽违规关键词（如"有害""暴力"等）
- 统一审计：记录每轮对话的输入输出，方便合规审查

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

如果 Agent 使用了流式输出（类似打字机效果），中间件也需要支持流式模式。`Use` 方法的第二个参数就是流式版本：

```csharp
var agent = originalAgent
    .AsBuilder()
    .Use(
        runFunc: PIIMiddleware,                     // 非流式版本
        runStreamingFunc: PIIMiddlewareStreaming)    // 流式版本
    .Build();
```

::: warning 建议成对注册
如果只注册了非流式版本，框架会把流式输出"攒"起来等全部返回后再处理，用户体验会退化（看不到逐字输出的效果）。所以建议非流式和流式始终成对注册。
:::

## Per-Request Middleware（按请求中间件）

有时候你不想给所有请求都加中间件，只想对某一次特定请求生效。可以通过 `ChatClientAgentRunOptions` 的 `ChatClientFactory` 来实现：

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

也可以给 Agent 临时加上按请求的函数调用中间件：

```csharp
var response = await originalAgent
    .AsBuilder()
    .Use(PerRequestFunctionCallingMiddleware)     // 按请求的函数调用中间件
    .Use(ConsolePromptingApprovalMiddleware, null) // 人工审批中间件
    .Build()
    .RunAsync("What's the weather?", session, optionsWithMiddleware);
```

## Human-in-the-Loop 审批

有些操作太敏感（比如删除数据、发送邮件），不能让模型自己决定就执行了。框架内置了审批机制：模型想调用工具时，先暂停，等人确认后才继续。

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

`DelegatingAIAgent` 是中间件的底层实现模式——你可以把它理解为"代理的代理"。每注册一层中间件，就会在外面包一层 `DelegatingAIAgent`，层层嵌套。所有通过 `AIAgentBuilder.Use()` 注册的中间件，底层都是这个模式。

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

框架已经帮你写好了几个常用的装饰器，不需要自己从头写：

| 实现 | 干什么用 | 对应的注册方法 |
| --- | --- | --- |
| `LoggingAgent` | 记录请求和响应日志 | `.UseLogging()` |
| `OpenTelemetryAgent` | 采集分布式追踪和指标 | `.UseOpenTelemetry()` |
| `FunctionInvokingAgent` | 处理函数调用循环 | 自动集成 |
| `ToolApprovalAgent` | 工具审批（支持自动规则） | `.UseToolApproval()` |

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
var agent = chatClientAgent.AsBuilder()
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
    .Build();
```

## 请求/响应修改

```csharp
var agent = chatClientAgent.AsBuilder()
    .Use(async (innerAgent, messages, session, options, ct, next) =>
    {
        // 注入额外上下文
        messages = messages.Prepend(new ChatMessage(ChatRole.System,
            $"当前用户: {GetCurrentUser()}, 时间: {DateTime.Now}"));

        var response = await next(innerAgent, messages, session, options, ct);

        // 后处理响应
        return response;
    })
    .Build();
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
var agent = chatClientAgent.AsBuilder()
    .UseLogging(loggerFactory)
    .Build();

// 方式三：通过 DI 管道
builder.Services.AddChatClient(chatClient)
    .UseLogging();
```

## OpenTelemetry

框架提供了完整的 OpenTelemetry 集成，支持分布式追踪、指标和日志。

### 基础使用

```csharp
// 通过 AIAgentBuilder
var agent = chatClientAgent.AsBuilder()
    .UseOpenTelemetry()
    .Build();

// 通过 DI
builder.Services.AddChatClient(chatClient)
    .UseOpenTelemetry();
```

::: tip 自动接入 ChatClient 级别遥测
从最新源码开始，`OpenTelemetryAgent` 会自动把底层的 `IChatClient` 也包装上 `OpenTelemetryChatClient`，这样 Agent 级别和 ChatClient 级别的遥测会自动关联，不需要手动配置两次。

如果不想自动包装，可以在 `ChatClientAgentOptions` 中设置 `UseProvidedChatClientAsIs = true`。
:::

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
<PackageReference Include="Microsoft.Agents.AI.DevUI" Version="1.9.0" />
```

### DevUI + Aspire 集成（v1.9.0 新增）

```xml
<PackageReference Include="Aspire.Hosting.AgentFramework.DevUI" Version="1.9.0" />
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
builder.AddDevUI("devui");
```

DevUI 特性：
- 自动发现注册的 Agent
- 实时可视化 Agent 执行
- 多 Agent 统一调试界面
- 支持 Azure AI Foundry 集成

## 总结

三层中间件各管各的事，互不干扰：

| 中间件类型 | 管什么 | 典型场景 |
| --- | --- | --- |
| IChatClient Middleware | 和模型之间的对话 | 记录 Prompt、统计 Token、限流 |
| Function Calling Middleware | 工具调用行为 | 权限控制、审计、Mock、人工审批 |
| Agent Run Middleware | 整体输入输出 | PII 脱敏、内容合规、结果转换 |

Agent Framework 的 Middleware 不是为了"让 Agent 更复杂"，而是让复杂性被 **有序地隔离**。通过将横切关注点拆分到不同层次，开发者可以在不侵入 Agent 核心逻辑的前提下，构建一个可治理、可审计、可扩展的企业级 AI 系统。

## 近期重要变更

| 变更 | Commit | 说明 |
| --- | --- | --- |
| ToolApproval 自动审批规则 | `6bd2cfec` | `UseToolApproval()` 新增 `AutoApprovalRules`，支持通过启发式函数自动批准工具调用 |
| OpenTelemetry 自动接入 | `37a043a7` | `OpenTelemetryAgent` 现在自动把底层 `IChatClient` 也包装上遥测，Agent 和 ChatClient 级别的 span 自动关联 |
| IChatMessageInjector | `0557b578` | 新增消息注入能力，支持在函数调用循环中注入额外消息 |
