---
title: 对话与会话
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
  - 对话
---

# 对话与会话

## 单轮对话

```csharp
// 非流式调用
AgentResponse response = await agent.RunAsync("给我讲个关于程序员的笑话");
Console.WriteLine(response.Text);

// 流式调用
await foreach (var update in agent.RunStreamingAsync("给我讲个笑话"))
{
    Console.Write(update.Text);
}
```

## 多轮对话

通过 `AgentSession` 管理多轮对话的上下文。

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
    "现在加上表情符号，用海盗鹦鹉的语调再讲一遍", session))
{
    Console.Write(update.Text);
}
```

## 使用对话历史

直接传入消息列表，跳过会话管理：

```csharp
using Microsoft.Extensions.AI;

var messages = new List<ChatMessage>
{
    new ChatMessage(ChatRole.System, "你是一个日志分析专家"),
    new ChatMessage(ChatRole.User, "分析以下日志...")
};

await foreach (var update in agent.RunStreamingAsync(messages))
{
    Console.Write(update.Text);
}
```

## 会话持久化

`AgentSession` 支持序列化和反序列化，用于持久化存储。

```csharp
// 创建会话
AgentSession session = await agent.CreateSessionAsync();

// 使用会话
await agent.RunAsync("第一轮对话", session);

// 序列化会话状态（返回 JsonElement）
JsonElement serializedState = await agent.SerializeSessionAsync(session);

// 存储 serializedState 到数据库、Redis 等...
// 可以用 JsonSerializer.Serialize(serializedState) 转为字符串存储

// 恢复会话（还可传入可选的 JsonSerializerOptions 定制反序列化行为）
AgentSession restoredSession = await agent.DeserializeSessionAsync(serializedState);
await agent.RunAsync("继续对话", restoredSession);
```

## ChatHistoryProvider（对话存储）

`ChatHistoryProvider` 是对话历史的抽象存储层，适用于底层 AI 服务自身不管理聊天历史的场景。

### 内置实现

| 提供者 | 说明 |
| --- | --- |
| `InMemoryChatHistoryProvider` | 内存存储（消息保存在 `AgentSession.StateBag` 中），支持通过 `IChatReducer` 压缩历史 |
| `CosmosChatHistoryProvider` | Azure Cosmos DB 持久化存储（位于独立包 `Microsoft.Agents.AI.CosmosNoSql`） |

`InMemoryChatHistoryProvider` 的构造函数接受可选的 `InMemoryChatHistoryProviderOptions`，可配置：

- `ChatReducer`（`IChatReducer`）：历史压缩/精简逻辑
- `ReducerTriggerEvent`：触发压缩的时机（检索前 `BeforeMessagesRetrieval` / 追加后 `AfterMessageAdded`）

`InMemoryChatHistoryProvider` 本身还暴露公共方法 `GetMessages(session)` / `SetMessages(session, messages)`（在 provider 上，不在 Options 里），可直接读写指定会话的消息列表。

### 注册使用

`ChatHistoryProvider` 实例不是通过 DI 容器按类型解析的，而是作为**单个实例**通过 `ChatClientAgentOptions.ChatHistoryProvider` 属性注入：

```csharp
// 使用 Cosmos DB 存储（安装 Microsoft.Agents.AI.CosmosNoSql 包）
ChatClientAgent agent = new ChatClientAgent(
    chatClient,
    new ChatClientAgentOptions
    {
        Name = "MyAgent",
        ChatHistoryProvider = new CosmosChatHistoryProvider(cosmosClient, databaseName: "agentdb", containerName: "history")
    });

// 使用内存存储（开发/测试）
ChatClientAgent devAgent = new ChatClientAgent(
    chatClient,
    new ChatClientAgentOptions
    {
        Name = "MyAgent",
        ChatHistoryProvider = new InMemoryChatHistoryProvider()
    });
```

> 注意：同一个 `ChatHistoryProvider` 实例会被多个会话共用，因此不要在 provider 的实例字段中保存会话相关的状态；会话级状态应存入 `AgentSession.StateBag`。

### 第三方存储

自定义 `ChatHistoryProvider` 时，推荐重写两个受保护的虚方法（相关类型带有实验特性标记 MAAI001）：

- `ProvideChatHistoryAsync(InvokingContext)`：调用前提供历史消息，**旧消息在前**
- `StoreChatHistoryAsync(InvokedContext)`：调用后存储本次新增的消息

会话状态通过重写 `StateKeys` 属性声明使用的键，并经 `AgentSession.StateBag` 持久化（随会话序列化/反序列化）：

```csharp
using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;
using StackExchange.Redis;

public sealed class RedisChatHistoryProvider : ChatHistoryProvider
{
    private readonly IDatabase _redis;

    public RedisChatHistoryProvider(IDatabase redis) => _redis = redis;

    // 声明本 provider 在 StateBag 中使用的键（默认为具体类型名）
    public override IReadOnlyList<string> StateKeys => ["redis:lastSync"];

    // 调用前：提供历史消息（按时间正序，旧消息在前）
    protected override async ValueTask<IEnumerable<ChatMessage>> ProvideChatHistoryAsync(
        ChatHistoryProvider.InvokingContext context,
        CancellationToken cancellationToken = default)
    {
        // 会话级状态可经 context.Session.StateBag 读取
        // 从 Redis 加载历史消息并返回（旧消息在前）
        return [];
    }

    // 调用后：存储本次新增的消息
    protected override async ValueTask StoreChatHistoryAsync(
        ChatHistoryProvider.InvokedContext context,
        CancellationToken cancellationToken = default)
    {
        // context.RequestMessages 为本次请求消息，context.ResponseMessages 为生成的响应消息
        // 将两者追加保存到 Redis
        await Task.CompletedTask;
    }
}
```

基类构造函数还可传入三个可选过滤器，分别用于过滤"提供给模型的历史消息"、"存入历史的请求消息"、"存入历史的响应消息"：

```csharp
public RedisChatHistoryProvider(IDatabase redis)
    : base(
        provideOutputMessageFilter: msgs => msgs.TakeLast(50), // 只提供最近 50 条
        storeInputRequestMessageFilter: null,                  // 默认排除来源为 ChatHistory 的消息
        storeInputResponseMessageFilter: null)                 // 默认保留全部响应消息
    => _redis = redis;
```

如需完全控制消息的合并、过滤与失败处理，也可以重写 protected virtual 的 `InvokingCoreAsync` / `InvokedCoreAsync`（公共入口 `InvokingAsync(InvokingContext)` / `InvokedAsync(InvokedContext)` 不是 virtual，无法直接重写；默认实现中，调用失败时不会执行存储）。

## 后台响应（Background Responses）

用于长时间运行的任务，支持断点续传。`AllowBackgroundResponses`（`bool?`）定义在基类 `AgentRunOptions` 上，所有 Agent 实现通用。

```csharp
ResponseContinuationToken? savedToken = null;
var options = new AgentRunOptions
{
    AllowBackgroundResponses = true
};

await foreach (var update in agent.RunStreamingAsync(
    "开始一个长时间运行的分析任务",
    options: options))
{
    Console.Write(update.Text);

    // 保存 continuation token（类型为 ResponseContinuationToken）用于断点续传
    // 注意：最后一个 update 的 token 为 null
    if (update.ContinuationToken is not null)
    {
        savedToken = update.ContinuationToken;
    }
}

// 流中断后，将 token 传入 AgentRunOptions.ContinuationToken 恢复流式输出（实验特性）
var resumeOptions = new AgentRunOptions { ContinuationToken = savedToken };
await foreach (var update in agent.RunStreamingAsync(options: resumeOptions))
{
    Console.Write(update.Text);
}
```

## 会话管理最佳实践

- 每个用户会话创建独立的 `AgentSession`
- 使用 `SerializeSessionAsync` / `DeserializeSessionAsync` 持久化会话
- 定期清理过期的会话状态
- 生产环境使用 `ChatHistoryProvider` 而非内存存储

## 聊天压缩与记忆（补充）

除了自己实现压缩策略，框架还内置了两个相关组件（细节见其他文档）：

- **Compaction 框架**（`CompactionProvider` + `CompactionStrategy`）：提供截断、滑动窗口、摘要等多种内置压缩策略，可组合成管道，自动压缩过长的聊天历史。
- **`ChatHistoryMemoryProvider`**：在聊天历史之外叠加长期记忆存储，自动提取并回填跨会话记忆。

## Per-Service-Call 持久化（崩溃恢复）

v1.9.0 新增每次服务调用级别的聊天历史持久化，支持崩溃后恢复。

```csharp
ChatClientAgent agent = new ChatClientAgent(
    chatClient,
    new ChatClientAgentOptions
    {
        Name = "MyAgent",
        RequirePerServiceCallChatHistoryPersistence = true, // 启用每次调用持久化
        ChatOptions = new ChatOptions
        {
            Instructions = "你是一个助手..."
        }
    }
);

// 如果服务在处理过程中崩溃，下次启动时可从上次检查点恢复
```
