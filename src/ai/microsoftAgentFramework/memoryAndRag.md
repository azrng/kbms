---
title: 记忆与 RAG
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
  - 记忆
  - RAG
---

# 记忆与 RAG

## AIContextProvider（上下文注入）

`AIContextProvider` 是上下文注入的抽象基类，提供两阶段生命周期。公开入口是 `InvokingAsync(InvokingContext)`（调用前）和 `InvokedAsync(InvokedContext)`（调用后），推荐的覆写点是 `ProvideAIContextAsync` / `StoreAIContextAsync`（需要完全接管输入过滤、上下文合并、来源戳或错误处理时，才覆写 `InvokingCoreAsync` / `InvokedCoreAsync`）：
- `ProvideAIContextAsync`（调用前）：返回额外的上下文（消息、工具、指令）
- `StoreAIContextAsync`（调用后）：处理调用结果

1.20.0 补充：
- 构造函数接受三个可选的消息过滤器委托（provide 输入 / store 请求 / store 响应），默认只把 `AgentRequestMessageSourceType.External` 来源的消息交给 provider，避免把聊天历史或其他 provider 注入的内容再次当作输入；
- provider 返回的消息会被自动打上 `AIContextProvider` 来源戳，多个 provider 管道式合并（后一个 provider 能看到前一个返回的上下文），防止注入内容互相"串台"；
- `StateKeys` 虚属性声明 provider 在 `AgentSession.StateBag` 中占用的状态键；`GetService` 用于向外暴露强类型服务。

```csharp
using Microsoft.Agents.AI;

public class TimeContextProvider : AIContextProvider
{
    protected override ValueTask<AIContext> ProvideAIContextAsync(
        InvokingContext context,
        CancellationToken cancellationToken = default)
    {
        // 调用前：返回额外的上下文
        return new ValueTask<AIContext>(new AIContext
        {
            Messages = [new ChatMessage(ChatRole.User,
                $"当前时间: {DateTime.Now:yyyy-MM-dd HH:mm:ss}")]
        });
    }

    protected override ValueTask StoreAIContextAsync(
        InvokedContext context,
        CancellationToken cancellationToken = default)
    {
        // 调用后：处理响应（可选）
        return default;
    }
}
```

### MessageAIContextProvider

`MessageAIContextProvider` 是 `AIContextProvider` 的抽象派生类，用于只注入消息的场景。注意它是抽象类、构造函数是 protected（三个可选消息过滤器委托），不能直接 `new`；正确用法是派生并覆写 `ProvideMessagesAsync`：

```csharp
using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;

public sealed class UserPreferenceProvider : MessageAIContextProvider
{
    protected override ValueTask<IEnumerable<ChatMessage>> ProvideMessagesAsync(
        InvokingContext context,
        CancellationToken cancellationToken = default)
    {
        return new ValueTask<IEnumerable<ChatMessage>>(
        [
            new ChatMessage(ChatRole.System, "用户偏好: 简洁回答")
        ]);
    }
}
```

### 注册 AIContextProvider

1.20.0 两条接线方式要区分清楚：
- `AIAgentBuilder.UseAIContextProviders` 只接受消息型 provider（`params MessageAIContextProvider[]`），传自定义的完整型 `AIContextProvider` 编译不过；
- 完整型 provider（可以同时返回消息、工具与指令）走 `ChatClientBuilder.UseAIContextProviders` 或 `ChatClientAgentOptions.AIContextProviders`。

```csharp
// 方式一：AIAgentBuilder —— 只接受 MessageAIContextProvider 派生类
var agent = chatClientAgent.AsBuilder()
    .UseAIContextProviders(new UserPreferenceProvider())
    .Build();

// 方式二：ChatClientAgentOptions —— 接受任意 AIContextProvider（包括完整型）
var options = new ChatClientAgentOptions
{
    AIContextProviders =
    [
        new TimeContextProvider(),   // 完整型：可返回消息 + 工具 + 指令
        new UserPreferenceProvider() // 消息型也可以放这里
    ]
};
var agent2 = new ChatClientAgent(chatClient, options);

// 方式三：ChatClientBuilder —— 挂在 IChatClient 管道中，可同时增强工具与指令
// chatClient = innerClient.AsBuilder()
//     .UseAIContextProviders(new TimeContextProvider())
//     .Build();
```

## 记忆提供者

### ChatHistoryMemoryProvider

将对话历史作为记忆源：基于 Microsoft.Extensions.VectorData 把消息存入向量存储，后续调用时按语义相似度检索相关历史注入上下文。它是一个 `MessageAIContextProvider`。

```csharp
public ChatHistoryMemoryProvider(
    VectorStore vectorStore,                     // Microsoft.Extensions.VectorData 抽象
    string collectionName,                       // 向量集合名
    int vectorDimensions,                        // 嵌入向量维度
    Func<AgentSession?, State> stateInitializer, // 初始化存储/检索范围
    ChatHistoryMemoryProviderOptions? options = null,
    ILoggerFactory? loggerFactory = null)
```

```csharp
using Microsoft.Agents.AI;

var memoryProvider = new ChatHistoryMemoryProvider(
    vectorStore,
    "chat-history-memories",
    vectorDimensions: 1536,
    session => new ChatHistoryMemoryProvider.State(
        new ChatHistoryMemoryProviderScope { UserId = "user1" }));
```

说明：
- `State` 持有 `StorageScope` 与 `SearchScope`（`ChatHistoryMemoryProviderScope`，字段 `ApplicationId` / `AgentId` / `UserId` / `SessionId`），经 `ProviderSessionState<TState>` 存入 `AgentSession.StateBag`；检索范围省略时复用存储范围；
- `ChatHistoryMemoryProviderOptions`：`SearchTime`（默认 `BeforeAIInvoke`，或 `OnDemandFunctionCalling` 改为向模型暴露检索工具）、`MaxResults`（默认 3）、`ContextPrompt`、`FunctionToolName` / `FunctionToolDescription`、`Redactor` / `EnableSensitiveTelemetryData`（日志默认脱敏）、`StateKey` 以及三个输入过滤器；
- 注意：经 `AIAgentBuilder.UseAIContextProviders`（消息型路径）使用时，`SearchTime = OnDemandFunctionCalling` 会抛 `InvalidOperationException`——该路径不支持工具，只能走 `BeforeAIInvoke`。

### 内置记忆类型

| 类型 | 说明 |
| --- | --- |
| 对话历史记忆 | ChatHistoryMemoryProvider：存入向量存储并语义检索相关历史 |
| Mem0 服务 | 第三方记忆服务集成 |
| Foundry 记忆 | Microsoft Foundry 记忆服务 |
| 有界对话历史 | 由 `ChatHistoryProvider` 抽象 + `InMemoryChatHistoryProvider` 实现，溢出裁剪通过 `InMemoryChatHistoryProviderOptions.ChatReducer`（IChatReducer）+ `ChatReducerTriggerEvent` 完成 |
| FileMemoryProvider | 基于文件的会话记忆（见下文） |

### Mem0 记忆服务

```xml
<PackageReference Include="Microsoft.Agents.AI.Mem0" Version="1.20.0" />
```

```csharp
using Microsoft.Agents.AI.Mem0;

// Mem0Provider : MessageAIContextProvider，把对话内容写入 Mem0 并按语义检索相关记忆注入上下文
var mem0Provider = new Mem0Provider(
    httpClient,                                   // BaseAddress 需指向 Mem0 服务
    session => new Mem0Provider.State(
        new Mem0ProviderScope { UserId = "user1" }));
```

说明：
- 构造函数：`(HttpClient, Func<AgentSession?, State> stateInitializer, Mem0ProviderOptions? options = null, ILoggerFactory? loggerFactory = null)`；`State` 同样含 `StorageScope` / `SearchScope`，`Mem0ProviderScope` 字段为 `ApplicationId` / `AgentId` / `ThreadId` / `UserId`；
- `Mem0ProviderOptions` 含 `ContextPrompt`、`StateKey`、`Redactor` / `EnableSensitiveTelemetryData` 及三个输入过滤器。

### FileMemoryProvider

1.20.0 中 `FileMemoryProvider` 位于 `Microsoft.Agents.AI` 核心包（Harness 功能区，命名空间仍是 `Microsoft.Agents.AI`），并不在单独的 Harness 包里——`Microsoft.Agents.AI.Harness` 只含 `HarnessAgent` / `HarnessAgentOptions` / `ChatClientHarnessExtensions`，由 `HarnessAgent` 在内部组合这些能力。

它基于 `AgentFileStore` 抽象（可插拔：`InMemoryAgentFileStore` / `FileSystemAgentFileStore` 等），向 agent 暴露 `file_memory_write / read / delete / ls / grep / replace / replace_lines` 工具，让模型自主以文件形式存取跨会话记忆：

```csharp
using Microsoft.Agents.AI;

var fileMemory = new FileMemoryProvider(
    new FileSystemAgentFileStore("./agent-memory"),   // 或 InMemoryAgentFileStore
    options: new FileMemoryProviderOptions());        // 可自定义注入给模型的 Instructions
```

### Valkey 聊天历史持久化（1.20.0 新增）

`Microsoft.Agents.AI.Valkey` 包提供 `ValkeyChatHistoryProvider : ChatHistoryProvider`，把聊天历史持久化到 Valkey/Redis：

```csharp
public ValkeyChatHistoryProvider(
    IConnectionMultiplexer connection,
    Func<AgentSession?, State> stateInitializer,
    ValkeyChatHistoryProviderOptions? options = null,
    ILoggerFactory? loggerFactory = null)
```

`ValkeyChatHistoryProviderOptions`：`KeyPrefix`（默认 `chat_history`）、`MaxMessages`、`MaxMessagesToRetrieve`、`StateKey`、`JsonSerializerOptions` 及三个消息过滤器。注意该包目前只提供聊天历史持久化，没有独立的全文检索 provider。

### CosmosNoSql（增强）

`CosmosChatHistoryProvider : ChatHistoryProvider`（`Microsoft.Agents.AI.CosmosNoSql` 包）在 1.20.0 增强：
- 新增 `GetMessagesAsync` / `GetMessageCountAsync` / `ClearMessagesAsync`，便于外部查看与管理会话消息；
- 新增 `MaxMessagesToRetrieve` 选项，限制每次读取的消息条数；
- `MessageTtlSeconds` 设为 `null` 时不写 TTL；
- 同包还提供 `CosmosCheckpointStore`，用于工作流检查点持久化。

### 通用状态与安全

所有 provider 的会话级状态遵循同一套模式：
- 状态存 `AgentSession.StateBag`（provider 实例会被多个会话共享，不要把会话状态放实例字段），推荐用 `ProviderSessionState<TState>` 封装（`GetOrInitializeState` / `SaveState`，按 `StateKey` 序列化到 StateBag）；
- `AIContextProvider.StateKeys` 声明占用的键，状态随会话序列化/恢复；
- 输入默认按 `External` 来源过滤，provider 注入的消息自动打上 `AIContextProvider` 来源戳，避免多 provider 互相串扰；
- 敏感数据默认脱敏：各 provider 选项的 `Redactor`（默认替换为 `<redacted>`）与 `EnableSensitiveTelemetryData`（默认 `false`）控制日志中查询与结果的呈现。

### 自定义记忆提供者

1.20.0 中不存在 `InvokingAsync(AgentRunContext, IList<ChatMessage>, ...)` 这样的覆写点，context 上也没有 `StateBag`；正确写法是覆写 `ProvideAIContextAsync(InvokingContext)` 并返回 `AIContext`（合并、来源戳由基类负责）：

```csharp
using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;
using StackExchange.Redis;

public sealed class RedisMemoryProvider : AIContextProvider
{
    private readonly IConnectionMultiplexer _redis;

    public RedisMemoryProvider(IConnectionMultiplexer redis) => this._redis = redis;

    // 调用前：返回额外的上下文
    protected override async ValueTask<AIContext> ProvideAIContextAsync(
        InvokingContext context,
        CancellationToken cancellationToken = default)
    {
        // 会话级状态存 AgentSession.StateBag，不要放 provider 实例字段
        context.Session?.StateBag.TryGetValue("userId", out string? userId);

        var memories = await this._redis.GetDatabase().StringGetAsync($"memories:{userId}");
        if (memories.IsNullOrEmpty)
        {
            return new AIContext();
        }

        return new AIContext
        {
            Messages = [new ChatMessage(ChatRole.System, $"用户记忆: {memories}")]
        };
    }

    // 调用后（可选）：处理调用结果
    protected override ValueTask StoreAIContextAsync(
        InvokedContext context,
        CancellationToken cancellationToken = default) => default;
}
```

## RAG（检索增强生成）

框架提供多种 RAG 模式的实现与示例。

### 基础文本 RAG

```csharp
// TextSearchProvider 需要传入一个检索委托（见下文 TextSearchProvider 一节）
var searchProvider = new TextSearchProvider(
    (query, ct) => SearchDocumentsAsync(query, ct));
```

### 向量存储（Vector Store）

```csharp
// 使用自定义 Schema 的向量存储
```

### 自定义 RAG 数据源

同样覆写 `ProvideAIContextAsync`，把检索结果作为上下文返回，而不是直接改写请求消息列表：

```csharp
using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;

public sealed class CustomRagProvider(VectorStore vectorStore) : AIContextProvider
{
    protected override async ValueTask<AIContext> ProvideAIContextAsync(
        InvokingContext context,
        CancellationToken cancellationToken = default)
    {
        // context.AIContext.Messages 默认已按 External 来源过滤
        var query = context.AIContext.Messages?.LastOrDefault(m => m.Role == ChatRole.User)?.Text;
        if (string.IsNullOrWhiteSpace(query))
        {
            return new AIContext();
        }

        var relevantDocs = await vectorStore.SearchAsync(query, topK: 5, cancellationToken);
        var ragContext = string.Join("\n\n", relevantDocs.Select(d => d.Content));

        return new AIContext
        {
            Instructions = "回答时请优先依据以下参考资料。",
            Messages = [new ChatMessage(ChatRole.System, $"参考资料:\n{ragContext}")]
        };
    }
}
```

### Foundry VectorStore

```csharp
// Microsoft Foundry 内置向量存储
```

### Foundry Memory Search（1.20.0）

非托管 Agent 可通过 Foundry Toolbox MCP 使用 Foundry 记忆搜索（`HostedMcpToolboxAITool(toolboxName, version?)`）。1.20.0 还提供托管封装 `FoundryMemoryProvider : AIContextProvider`（`Microsoft.Agents.AI.Foundry` 包）：

```csharp
public FoundryMemoryProvider(
    AIProjectClient client,          // Azure.AI.Projects 的项目客户端
    string memoryStoreName,
    Func<AgentSession?, State> stateInitializer,
    FoundryMemoryProviderOptions? options = null,
    ILoggerFactory? loggerFactory = null)
```

`FoundryMemoryProviderOptions` 含 `MaxMemories`（默认 5）、`UpdateDelay`（秒，默认 0 即立即更新，调大可让服务批量合并更新）、`ContextPrompt`。

### Neo4j GraphRAG

```csharp
// 使用 Neo4j 图数据库进行 GraphRAG
// 支持基于知识图谱的检索增强
```

## TextSearchProvider

`TextSearchProvider` 是框架内置的文本搜索提供者（`MessageAIContextProvider` 派生）。1.20.0 只有唯一构造：传入检索委托，不接受字符串数组或文档集合：

```csharp
using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;

var provider = new TextSearchProvider(
    (query, ct) => SearchDocumentsAsync(query, ct),   // Func<string, CancellationToken, Task<IEnumerable<TextSearchResult>>>
    new TextSearchProviderOptions
    {
        SearchTime = TextSearchProviderOptions.TextSearchBehavior.BeforeAIInvoke, // 默认；或 OnDemandFunctionCalling
        RecentMessageMemoryLimit = 5  // 保留最近 N 条消息拼接为多轮检索上下文
    });
```

说明：
- `TextSearchProviderOptions`：`SearchTime`（`TextSearchBehavior.BeforeAIInvoke` 默认 / `OnDemandFunctionCalling`）、`RecentMessageMemoryLimit`、`RecentMessageRolesIncluded`、`ContextPrompt`、`CitationsPrompt`、`ContextFormatter`、`FunctionToolName` / `FunctionToolDescription`、`Redactor` / `EnableSensitiveTelemetryData`、`StateKey` 及三个输入过滤器；
- 检索结果 `TextSearchProvider.TextSearchResult` 含 `SourceName` / `SourceLink` / `Text` / `RawRepresentation`。

## 压缩管道（Compaction Pipeline）

v1.20.0 大幅增强压缩管道，管理长对话的 token 消耗。压缩由 `CompactionProvider : AIContextProvider` 承载，在 Invoking/Invoked 两阶段内完成（调用前压缩请求上下文、调用后写回压缩状态），而不是模型调用之后的独立步骤。

### 压缩策略

| 策略 | 说明 |
| --- | --- |
| 工具结果压缩 | 压缩工具返回的大结果 |
| 摘要（Summarization） | 用 AI 生成对话摘要 |
| 滑动窗口（Sliding Window） | 保留最近 N 条消息 |
| 截断（Truncation） | 截断过长的消息 |
| 聊天缩减（Chat Reduction） | 智能裁剪对话历史 |

1.20.0 共七个 `CompactionStrategy`：ToolResult / Summarization / SlidingWindow / Truncation / ChatReducer / ContextWindow / Pipeline（组合多个策略，按从温和到激进排序）；触发条件用 `CompactionTriggers` 工厂（`Always` / `Never` / `TokensBelow` / `TokensExceed` / `MessagesExceed` / `TurnsExceed` / `GroupsExceed` / `HasToolCalls`，以及 `All` / `Any` 组合）。

```csharp
using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;

PipelineCompactionStrategy pipeline = new(
    new ToolResultCompactionStrategy(CompactionTriggers.MessagesExceed(7)),   // 1. 温和：压缩旧工具结果
    new SummarizationCompactionStrategy(summarizerChatClient,                 // 2. 中等：LLM 摘要
        CompactionTriggers.TokensExceed(1280)),
    new SlidingWindowCompactionStrategy(CompactionTriggers.TurnsExceed(4)),   // 3. 激进：滑动窗口
    new TruncationCompactionStrategy(CompactionTriggers.TokensExceed(32768)));// 4. 兜底：截断

var agent = chatClient
    .AsBuilder()
    // CompactionProvider(strategy, stateKey?, loggerFactory?)，挂在客户端管道可覆盖工具调用循环
    .UseAIContextProviders(new CompactionProvider(pipeline))
    .BuildAIAgent(new ChatClientAgentOptions { Name = "ShoppingAssistant" });
```

使用 `HarnessAgent` 时也可以直接通过 `HarnessAgentOptions.CompactionStrategy` / `DisableCompaction` 配置压缩。

## 记忆与 RAG 架构图

```
用户输入
    ↓
AIContextProvider.InvokingAsync()（调用前）
    ├── 聊天历史注入（ChatHistoryProvider：InMemory / CosmosNoSql / Valkey）
    ├── 记忆注入（MessageAIContextProvider：ChatHistoryMemoryProvider / Mem0）
    ├── 检索结果注入（RAG：TextSearchProvider / VectorStore / GraphRAG）
    ├── 额外上下文注入（自定义 AIContextProvider / FoundryMemoryProvider）
    └── 压缩管道（CompactionProvider：压缩在 Invoking/Invoked 两阶段内执行）
    ↓
ChatClientAgent.RunAsync()（模型调用）
    ↓
AIContextProvider.InvokedAsync()（调用后）
    ├── 保存记忆（StoreAIContextAsync：写向量库 / Mem0 / 文件）
    └── CompactionProvider 写回压缩状态
    ↓
返回响应
```
