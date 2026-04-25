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

`AIAgent` 是框架的核心抽象，位于 `Microsoft.Agents.AI.Abstractions` 命名空间。

```csharp
public abstract class AIAgent
{
    // 身份信息
    public string Id { get; }
    public string Name { get; }
    public string Description { get; }

    // 会话管理
    public abstract Task<AgentSession> CreateSessionAsync(string? serializedState = null, CancellationToken cancellationToken = default);
    public abstract Task<string> SerializeSessionAsync(AgentSession session, CancellationToken cancellationToken = default);
    public abstract Task<AgentSession> DeserializeSessionAsync(string serializedState, CancellationToken cancellationToken = default);

    // 执行方法（4 个重载）
    public abstract Task<AgentResponse> RunAsync(string message, AgentSession? session = null, AgentRunOptions? options = null, CancellationToken cancellationToken = default);
    public abstract Task<AgentResponse> RunAsync(ChatMessage message, AgentSession? session = null, AgentRunOptions? options = null, CancellationToken cancellationToken = default);
    public abstract Task<AgentResponse> RunAsync(IList<ChatMessage> messages, AgentSession? session = null, AgentRunOptions? options = null, CancellationToken cancellationToken = default);
    public abstract Task<AgentResponse> RunAsync(AgentSession? session = null, AgentRunOptions? options = null, CancellationToken cancellationToken = default);

    // 流式执行
    public abstract IAsyncEnumerable<AgentResponseUpdate> RunStreamingAsync(...);

    // 扩展性
    public T? GetService<T>() where T : class;
    public static AsyncLocal<AgentRunContext> CurrentRunContext { get; }
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
    LoggerFactory = loggerFactory,
    Services = new Dictionary<Type, object>()
}
```

## AgentSession（会话状态）

`AgentSession` 管理多轮对话的状态。

```csharp
// 创建新会话
AgentSession session = await agent.CreateSessionAsync();

// 从序列化状态恢复
AgentSession restoredSession = await agent.CreateSessionAsync(serializedState);

// 序列化会话状态（用于持久化）
string serializedState = await agent.SerializeSessionAsync(session);
```

### StateBag

```csharp
// AgentSession 包含 StateBag，存储任意键值对
session.StateBag["userPreference"] = "concise";
```

## AgentResponseUpdate（流式响应）

```csharp
public class AgentResponseUpdate
{
    public string Text { get; }
    public override string ToString() => this.Text;
    public ChatRole? Role { get; set; }
    public IList<AIContent> Contents { get; set; }
    public string? MessageId { get; set; }
    public string? ResponseId { get; set; }
    public string? ContinuationToken { get; set; }  // 用于后台响应恢复
}
```

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
- `LoggingAgent` - 日志记录
- `OpenTelemetryAgent` - 遥测
- `FunctionInvokingAgent` - 函数调用

## AIAgentBuilder（管道构建器）

通过 Builder 模式构建 Agent 中间件管道。

```csharp
using Microsoft.Agents.AI;

var agent = new AIAgentBuilder()
    .Use(async (agent, messages, session, options, ct, next) =>
    {
        // 前置处理
        Console.WriteLine("调用前...");
        var response = await next(agent, messages, session, options, ct);
        // 后置处理
        Console.WriteLine("调用后...");
        return response;
    })
    .UseAIContextProviders(contextProvider)
    .Build(chatClientAgent);
```

## 关键命名空间

```csharp
// Agent Framework 核心抽象
using Microsoft.Agents.AI.Abstractions;  // AIAgent, AgentSession, AgentResponse

// Agent Framework 实现
using Microsoft.Agents.AI;  // ChatClientAgent, AIAgentBuilder

// Extensions.AI（统一抽象层）
using Microsoft.Extensions.AI;  // IChatClient, ChatMessage, ChatRole, ChatOptions

// OpenAI SDK
using OpenAI;
using OpenAI.Chat;
```
