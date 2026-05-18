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

`AIContextProvider` 是上下文注入的抽象基类，提供两阶段生命周期：`InvokingAsync`（调用前）和 `InvokedAsync`（调用后）。

```csharp
using Microsoft.Agents.AI.Abstractions;

public class TimeContextProvider : AIContextProvider
{
    public override async Task InvokingAsync(AgentRunContext context, IList<ChatMessage> messages, CancellationToken ct)
    {
        // 调用前：注入额外消息、工具、上下文
        messages.Add(new ChatMessage(ChatRole.System,
            $"当前时间: {DateTime.Now:yyyy-MM-dd HH:mm:ss}"));
    }

    public override async Task InvokedAsync(AgentRunContext context, AgentResponse response, CancellationToken ct)
    {
        // 调用后：处理响应
    }
}
```

### MessageAIContextProvider

`MessageAIContextProvider` 是常用的派生类，用于注入消息上下文。

```csharp
var provider = new MessageAIContextProvider(
    new ChatMessage(ChatRole.System, "用户偏好: 简洁回答"));
```

### 注册 AIContextProvider

```csharp
// 通过 AIAgentBuilder
var agent = new AIAgentBuilder()
    .UseAIContextProviders(new TimeContextProvider())
    .Build(chatClientAgent);

// 通过 ChatClientAgentOptions
```

## 记忆提供者

### ChatHistoryMemoryProvider

将对话历史作为记忆源。

```csharp
using Microsoft.Agents.AI;

var memoryProvider = new ChatHistoryMemoryProvider(chatHistoryProvider);
```

### 内置记忆类型

| 类型 | 说明 |
| --- | --- |
| 对话历史记忆 | 基于对话历史提供上下文 |
| Mem0 服务 | 第三方记忆服务集成 |
| Foundry 记忆 | Microsoft Foundry 记忆服务 |
| 有界对话历史 | 带溢出控制的对话历史 |
| FileMemoryProvider | 基于文件的会话记忆（v1.6.1 新增） |

### Mem0 记忆服务

```xml
<PackageReference Include="Microsoft.Agents.AI.Mem0" Version="1.6.1" />
```

```csharp
using Microsoft.Agents.AI.Mem0;

// 集成 Mem0 记忆服务
```

### FileMemoryProvider（v1.6.1 新增）

Harness 内置的基于文件的会话记忆提供者。

```csharp
using Microsoft.Agents.AI.Harness;

// Harness 自动集成 FileMemoryProvider
// 基于文件系统存储会话记忆
// 支持跨请求持久化
```

### 自定义记忆提供者

```csharp
using Microsoft.Agents.AI.Abstractions;

public class RedisMemoryProvider : AIContextProvider
{
    public override async Task InvokingAsync(AgentRunContext context, IList<ChatMessage> messages, CancellationToken ct)
    {
        var userId = context.StateBag["userId"]?.ToString();
        var memories = await _redis.GetAsync($"memories:{userId}");
        if (memories != null)
        {
            messages.Add(new ChatMessage(ChatRole.System, $"用户记忆: {memories}"));
        }
    }
}
```

## RAG（检索增强生成）

框架提供多种 RAG 模式的示例。

### 基础文本 RAG

```csharp
using Microsoft.Agents.AI;

// 文本搜索提供者
var searchProvider = new TextSearchProvider(documents);
```

### 向量存储（Vector Store）

```csharp
// 使用自定义 Schema 的向量存储
```

### 自定义 RAG 数据源

```csharp
using Microsoft.Agents.AI.Abstractions;

public class CustomRagProvider : AIContextProvider
{
    public override async Task InvokingAsync(AgentRunContext context, IList<ChatMessage> messages, CancellationToken ct)
    {
        var query = messages.Last(m => m.Role == ChatRole.User).Text;
        var relevantDocs = await _vectorStore.SearchAsync(query, topK: 5);

        var ragContext = string.Join("\n\n", relevantDocs.Select(d => d.Content));
        messages.Insert(0, new ChatMessage(ChatRole.System,
            $"参考资料:\n{ragContext}"));
    }
}
```

### Foundry VectorStore

```csharp
// Microsoft Foundry 内置向量存储
```

### Foundry Memory Search（v1.6.1 新增）

非托管 Agent 也可通过 Foundry Toolbox MCP 使用 Foundry 记忆搜索。

```csharp
// 通过 Foundry Toolbox MCP 访问 Foundry Memory Search
```

### Neo4j GraphRAG

```csharp
// 使用 Neo4j 图数据库进行 GraphRAG
// 支持基于知识图谱的检索增强
```

## TextSearchProvider

`TextSearchProvider` 是框架内置的文本搜索提供者。

```csharp
using Microsoft.Agents.AI;

var provider = new TextSearchProvider(
    new[] { "文档1内容", "文档2内容", "文档3内容" }
);
```

## 压缩管道（Compaction Pipeline）

v1.6.1 大幅增强压缩管道，管理长对话的 token 消耗。

### 压缩策略

| 策略 | 说明 |
| --- | --- |
| 工具结果压缩 | 压缩工具返回的大结果 |
| 摘要（Summarization） | 用 AI 生成对话摘要 |
| 滑动窗口（Sliding Window） | 保留最近 N 条消息 |
| 截断（Truncation） | 截断过长的消息 |
| 聊天缩减（Chat Reduction） | 智能裁剪对话历史 |

```csharp
// 配置压缩管道
// 多策略组合使用，自动在 token 接近上限时触发
```

## 记忆与 RAG 架构图

```
用户输入
    ↓
AIContextProvider.InvokingAsync()
    ├── 注入记忆（Memory Provider）
    │   ├── ChatHistoryMemoryProvider
    │   ├── FileMemoryProvider
    │   └── Mem0 服务
    ├── 注入检索结果（RAG Provider）
    │   ├── TextSearchProvider
    │   ├── VectorStore
    │   └── GraphRAG
    └── 注入额外上下文
    ↓
ChatClientAgent.RunAsync()
    ↓
压缩管道（Compaction Pipeline）
    ├── 工具结果压缩
    ├── 摘要压缩
    ├── 滑动窗口
    └── 截断
    ↓
AIContextProvider.InvokedAsync()
    ├── 保存记忆
    └── 记录响应
    ↓
返回响应
```
