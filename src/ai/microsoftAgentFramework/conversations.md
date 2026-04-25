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
// 同步调用
string response = await agent.RunAsync("给我讲个关于程序员的笑话");
Console.WriteLine(response);

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

// 序列化会话状态
string serializedState = await agent.SerializeSessionAsync(session);

// 存储 serializedState 到数据库、Redis 等...

// 恢复会话
AgentSession restoredSession = await agent.CreateSessionAsync(serializedState);
await agent.RunAsync("继续对话", restoredSession);
```

## ChatHistoryProvider（对话存储）

`ChatHistoryProvider` 是对话历史的抽象存储层。

### 内置实现

| 提供者 | 说明 |
| --- | --- |
| `InMemoryChatHistoryProvider` | 内存存储，用于测试 |
| `CosmosChatHistoryProvider` | Azure Cosmos DB 持久化存储 |

### 注册使用

```csharp
// 使用 Cosmos DB 存储
builder.Services.AddSingleton<ChatHistoryProvider, CosmosChatHistoryProvider>();

// 使用内存存储（开发/测试）
builder.Services.AddSingleton<ChatHistoryProvider, InMemoryChatHistoryProvider>();
```

### 第三方存储

框架支持自定义 `ChatHistoryProvider`，可以将对话存储到任意后端：

```csharp
using Microsoft.Agents.AI.Abstractions;

public class RedisChatHistoryProvider : ChatHistoryProvider
{
    public override async Task SaveAsync(string sessionId, IList<ChatMessage> messages, CancellationToken ct = default)
    {
        // 保存到 Redis
    }

    public override async Task<IList<ChatMessage>> LoadAsync(string sessionId, CancellationToken ct = default)
    {
        // 从 Redis 加载
    }
}
```

## 后台响应（Background Responses）

用于长时间运行的任务，支持断点续传。

```csharp
var options = new ChatClientAgentRunOptions
{
    AllowBackgroundResponses = true
};

await foreach (var update in agent.RunStreamingAsync(
    "开始一个长时间运行的分析任务",
    options: options))
{
    Console.Write(update.Text);

    // 保存 continuation token 用于后续恢复
    if (update.ContinuationToken is not null)
    {
        // 保存 token，稍后恢复
    }
}
```

## 会话管理最佳实践

- 每个用户会话创建独立的 `AgentSession`
- 使用 `SerializeSessionAsync` / `DeserializeSessionAsync` 持久化会话
- 定期清理过期的会话状态
- 生产环境使用 `ChatHistoryProvider` 而非内存存储
