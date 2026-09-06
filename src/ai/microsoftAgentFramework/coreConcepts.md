---
title: 核心概念
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
  - 核心概念
---

# 核心概念

## AIAgent（抽象基类）

`AIAgent` 是框架的核心抽象，位于 `Microsoft.Agents.AI` 命名空间（`Microsoft.Agents.AI.Abstractions` 只是承载这些类型的包/程序集名，并不是命名空间）。

```csharp
public abstract class AIAgent
{
    // 身份信息（Id 默认为随机 Guid；派生类可重写 IdCore 提供自定义 ID）
    public string Id { get; }
    protected virtual string? IdCore { get; }
    public virtual string? Name { get; }
    public virtual string? Description { get; }

    // 会话管理（公共具体实现，派生类重写对应的受保护抽象 *CoreAsync 方法）
    public ValueTask<AgentSession> CreateSessionAsync(CancellationToken cancellationToken = default);
    public ValueTask<JsonElement> SerializeSessionAsync(AgentSession session, JsonSerializerOptions? jsonSerializerOptions = null, CancellationToken cancellationToken = default);
    public ValueTask<AgentSession> DeserializeSessionAsync(JsonElement serializedState, JsonSerializerOptions? jsonSerializerOptions = null, CancellationToken cancellationToken = default);

    // 执行方法（各 4 个公共重载，内部委托给受保护的抽象 RunCoreAsync / RunCoreStreamingAsync）
    public Task<AgentResponse> RunAsync(string message, AgentSession? session = null, AgentRunOptions? options = null, CancellationToken cancellationToken = default);
    public Task<AgentResponse> RunAsync(ChatMessage message, AgentSession? session = null, AgentRunOptions? options = null, CancellationToken cancellationToken = default);
    public Task<AgentResponse> RunAsync(IEnumerable<ChatMessage> messages, AgentSession? session = null, AgentRunOptions? options = null, CancellationToken cancellationToken = default);
    public Task<AgentResponse> RunAsync(AgentSession? session = null, AgentRunOptions? options = null, CancellationToken cancellationToken = default);

    // 流式执行（同样 4 个重载）
    public IAsyncEnumerable<AgentResponseUpdate> RunStreamingAsync(...);

    // 扩展性（派生类重写 RunCoreAsync / RunCoreStreamingAsync，而不是重写公共 Run 方法）
    protected abstract Task<AgentResponse> RunCoreAsync(IEnumerable<ChatMessage> messages, AgentSession? session = null, AgentRunOptions? options = null, CancellationToken cancellationToken = default);
    protected abstract IAsyncEnumerable<AgentResponseUpdate> RunCoreStreamingAsync(IEnumerable<ChatMessage> messages, AgentSession? session = null, AgentRunOptions? options = null, CancellationToken cancellationToken = default);

    // 服务定位（无 class 约束）
    public TService? GetService<TService>(object? serviceKey = null);

    // 当前运行的上下文（跨 async 流动）
    public static AgentRunContext? CurrentRunContext { get; protected set; }
}
```

### 主要实现类

| 类 | 说明 |
| --- | --- |
| `ChatClientAgent` | 基于 `IChatClient` 的实现，最常用 |
| `DelegatingAIAgent` | 装饰器模式，用于构建中间件管道 |
| `FoundryAgent` | Microsoft Foundry 集成 |
| `A2AAgent` | Agent-to-Agent 协议 |
| `CopilotStudioAgent` | Copilot Studio 集成 |
| `GitHubCopilotAgent` | GitHub Copilot 集成 |
| `HarnessAgent` | 一站式预配置 Agent（位于独立包 `Microsoft.Agents.AI.Harness`，命名空间仍是 `Microsoft.Agents.AI`） |

## ChatClientAgent

`ChatClientAgent` 是最常用的 Agent 实现，封装任意 `IChatClient`。

```csharp
using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;

// 基础创建
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

// 使用扩展方法快速创建
AIAgent agent = chatClient.AsAIAgent(
    instructions: "你是一个助手",
    name: "MyAgent"
);
```

### ChatClientAgentOptions 配置项

```csharp
new ChatClientAgentOptions
{
    Id = "my-agent",
    Name = "MyAgent",
    Description = "Agent 描述",
    ChatOptions = new ChatOptions
    {
        Instructions = "系统提示词",
        Temperature = 0.7f,
        MaxOutputTokens = 2000,
        // 可添加工具
        Tools = [AIFunctionFactory.Create(GetWeather)]
    },
    // 对话历史存储（单个实例，详见 conversations.md）
    ChatHistoryProvider = new InMemoryChatHistoryProvider(),
    // 上下文注入（AIContextProvider 列表）
    AIContextProviders = [new TimeContextProvider()],

    // 每次服务调用持久化（崩溃恢复）
    RequirePerServiceCallChatHistoryPersistence = true,

    // 消息注入（运行中动态注入消息）
    EnableMessageInjection = true,

    // ChatHistoryProvider 冲突处理（底层服务自带历史管理时）
    ClearOnChatHistoryProviderConflict = true,
    WarnOnChatHistoryProviderConflict = true,
    ThrowOnChatHistoryProviderConflict = true
}
```

> 注意：`LoggerFactory` / `Services` 不是 `ChatClientAgentOptions` 的属性，它们是 `ChatClientAgent` 构造函数的参数。

## AgentSession（会话状态）

`AgentSession` 管理多轮对话的状态。

```csharp
// 创建新会话
AgentSession session = await agent.CreateSessionAsync();

// 序列化会话状态（返回 JsonElement，用于持久化）
JsonElement serializedState = await agent.SerializeSessionAsync(session);

// 从序列化状态恢复
AgentSession restoredSession = await agent.DeserializeSessionAsync(serializedState);
```

### StateBag

```csharp
// AgentSession 包含 StateBag（AgentSessionStateBag），以类型安全的方式存储任意键值对，
// 并随会话一起序列化
session.StateBag.SetValue("userPreference", "concise");

string? preference = session.StateBag.GetValue<string>("userPreference");
if (session.StateBag.TryGetValue<string>("userPreference", out var value)) { /* ... */ }
session.StateBag.TryRemoveValue("userPreference");
```

## AgentResponseUpdate（流式响应）

```csharp
public class AgentResponseUpdate
{
    public string Text { get; }
    public override string ToString() => this.Text;
    public string? AuthorName { get; set; }
    public ChatRole? Role { get; set; }
    public IList<AIContent> Contents { get; set; }
    public object? RawRepresentation { get; set; }
    public AdditionalPropertiesDictionary? AdditionalProperties { get; set; }
    public string? AgentId { get; set; }
    public string? ResponseId { get; set; }
    public string? MessageId { get; set; }
    public DateTimeOffset? CreatedAt { get; set; }
    public ChatFinishReason? FinishReason { get; set; }
    public ResponseContinuationToken? ContinuationToken { get; set; }  // 用于后台响应/断点续传
}
```

> 注意：`ContinuationToken` 的类型是 `ResponseContinuationToken?`（不是 string）。相关类型带有实验特性标记（MAAI001），使用时可能需要抑制警告。

## DelegatingAIAgent（装饰器）

装饰器模式的 Agent，包装内部 `AIAgent` 并转发调用。是中间件管道的基础。

```csharp
public abstract class DelegatingAIAgent : AIAgent
{
    protected DelegatingAIAgent(AIAgent innerAgent);
    protected AIAgent InnerAgent { get; }
}
```

内置的 `DelegatingAIAgent` 实现：

| 实现 | 说明 |
| --- | --- |
| `LoggingAgent` | 日志记录中间件 |
| `OpenTelemetryAgent` | OpenTelemetry 遥测 |
| `FunctionInvocationDelegatingAgent` | 函数调用处理（internal，由框架在构建管道时自动挂载，非公共类型） |
| `ToolApprovalAgent` | 工具审批（"Don't ask again" 规则），位于核心包的 Harness/ToolApproval/ 下 |

## AIAgentBuilder（管道构建器）

通过 Builder 模式构建 Agent 中间件管道。

```csharp
using Microsoft.Agents.AI;

var agent = chatClientAgent.AsBuilder()
    .Use(async (messages, session, options, next, ct) =>
    {
        // 前置处理
        Console.WriteLine("调用前...");
        // next 不接收 agent、返回 Task（响应结果由内层 agent 产生）
        await next(messages, session, options, ct);
        // 后置处理
        Console.WriteLine("调用后...");
    })
    .Build();
```

`Use` 还有一个分离重载，分别为非流式和流式提供实现（第 4 个参数是管道中的内层 agent）。下面是一个把调用原样转发给内层 agent 的透传中间件：

```csharp
var agent = chatClientAgent.AsBuilder()
    .Use(
        (messages, session, options, innerAgent, ct) => innerAgent.RunAsync(messages, session, options, ct),
        (messages, session, options, innerAgent, ct) => innerAgent.RunStreamingAsync(messages, session, options, ct))
    .Build();
```

### UseAIContextProviders

`AIAgentBuilder.UseAIContextProviders` 只接受 `params MessageAIContextProvider[]`：

```csharp
var agent = chatClientAgent.AsBuilder()
    .UseAIContextProviders(new TimeContextProvider(), new CustomRagProvider()) // MessageAIContextProvider
    .Build();
```

如果要使用任意 `AIContextProvider`，有两个选择：

```csharp
// 方式一：在 ChatClientBuilder 上注册（接受 AIContextProvider[]）
IChatClient chatClient = new ChatClientBuilder(innerClient)
    .UseAIContextProviders(timeProvider, ragProvider)
    .Build();

// 方式二：通过 ChatClientAgentOptions.AIContextProviders 属性传入
ChatClientAgent agent = new(chatClient, new ChatClientAgentOptions
{
    AIContextProviders = [timeProvider, ragProvider]
});
```

### 内置中间件扩展

```csharp
var agent = chatClientAgent.AsBuilder()
    .UseOpenTelemetry()        // OpenTelemetry 遥测
    .UseToolApproval()         // 工具审批（支持 "Don't ask again"）
    .UseLogging(loggerFactory) // 日志记录
    .Build();
```

## 关键命名空间

```csharp
// Agent Framework 核心
// AIAgent、AgentSession、AgentResponse、ChatHistoryProvider、AIAgentBuilder、ChatClientAgent
// 等核心类型都在这个命名空间。
// 注意：Microsoft.Agents.AI.Abstractions 是承载这些类型的包/程序集名，
// 并不存在 using Microsoft.Agents.AI.Abstractions; 这样的命名空间。
using Microsoft.Agents.AI;

// Extensions.AI（统一抽象层）
using Microsoft.Extensions.AI;  // IChatClient, ChatMessage, ChatRole, ChatOptions

// Harness 一站式 Agent（独立包 Microsoft.Agents.AI.Harness，但命名空间仍是 Microsoft.Agents.AI，
// 无需额外的 using，安装包后直接使用 HarnessAgent 即可）

// Hyperlight 沙箱执行
using Microsoft.Agents.AI.Hyperlight;  // HyperlightCodeActProvider

// OpenAI SDK
using OpenAI;
using OpenAI.Chat;
```
