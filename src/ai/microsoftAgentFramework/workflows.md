---
title: 工作流
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
  - 工作流
---

# 工作流

`Microsoft.Agents.AI.Workflows` 提供了强大的工作流引擎，用于编排复杂的多步骤 AI 工作流。

```xml
<PackageReference Include="Microsoft.Agents.AI.Workflows" Version="1.1.0" />
```

## WorkflowBuilder

```csharp
using Microsoft.Agents.AI.Workflows;

var workflow = new WorkflowBuilder()
    .AddExecutor("step1", async (context, ct) =>
    {
        // 第一步处理
        return new ExecutorResult { Output = "步骤1完成" };
    })
    .AddExecutor("step2", async (context, ct) =>
    {
        // 第二步处理
        return new ExecutorResult { Output = "步骤2完成" };
    })
    .AddEdge("step1", "step2")  // 步骤1完成后执行步骤2
    .Build();
```

## 在工作流中使用 Agent

```csharp
var workflow = new WorkflowBuilder()
    .AddAgentExecutor("writer", writerAgent, "写一篇关于 {topic} 的文章")
    .AddAgentExecutor("reviewer", reviewerAgent, "审查以下文章并给出修改建议：{input}")
    .AddEdge("writer", "reviewer")
    .Build();

var session = await workflow.RunAsync(new Dictionary<string, object>
{
    ["topic"] = "AI Agent 开发"
});
```

## 流式工作流

```csharp
await foreach (var update in workflow.RunStreamingAsync(input))
{
    Console.Write(update.Text);
}
```

## 并发执行（Fan-out/Fan-in）

```csharp
var workflow = new WorkflowBuilder()
    .AddExecutor("start", ...)
    .AddExecutor("taskA", ...)  // 并发
    .AddExecutor("taskB", ...)  // 并发
    .AddExecutor("taskC", ...)  // 并发
    .AddExecutor("merge", ...)  // 汇总
    .AddEdge("start", "taskA")
    .AddEdge("start", "taskB")
    .AddEdge("start", "taskC")
    .AddEdge("taskA", "merge")
    .AddEdge("taskB", "merge")
    .AddEdge("taskC", "merge")
    .Build();
```

## MapReduce 模式

```csharp
// 将任务分发到多个并行 Agent，然后汇总结果
```

## 条件边（Conditional Edges）

```csharp
var workflow = new WorkflowBuilder()
    .AddExecutor("classifier", ...)
    .AddExecutor("handleA", ...)
    .AddExecutor("handleB", ...)
    .AddConditionalEdge("classifier", result =>
    {
        return result.Output switch
        {
            "typeA" => "handleA",
            "typeB" => "handleB",
            _ => "handleA"
        };
    })
    .Build();
```

## Switch-Case 模式

```csharp
.AddConditionalEdge("router", result => result.Category,
    new Dictionary<string, string>
    {
        ["技术问题"] = "techAgent",
        ["销售咨询"] = "salesAgent",
        ["投诉"] = "supportAgent"
    })
```

## 检查点（Checkpointing）

工作流支持检查点，可暂停和恢复长时间运行的工作流。

```csharp
// 保存检查点
var checkpoint = await workflow.SaveCheckpointAsync(session);

// 从检查点恢复
var restoredSession = await workflow.RestoreCheckpointAsync(checkpoint);
```

### 检查点 + 人工介入（HITL）

```csharp
// 工作流暂停等待人工审批
// 审批后从检查点恢复执行
```

## 子工作流（Sub-workflows）

```csharp
var subWorkflow = new WorkflowBuilder()
    .AddExecutor("sub1", ...)
    .AddExecutor("sub2", ...)
    .AddEdge("sub1", "sub2")
    .Build();

var mainWorkflow = new WorkflowBuilder()
    .AddExecutor("start", ...)
    .AddSubWorkflow("subProcess", subWorkflow)
    .AddExecutor("end", ...)
    .AddEdge("start", "subProcess")
    .AddEdge("subProcess", "end")
    .Build();
```

## Group Chat

```csharp
// 多个 Agent 在群聊中协作
// 支持工具审批的群聊
```

## Handoff 模式

```csharp
// Agent 之间的任务交接
// 一个 Agent 完成自己的部分后交接给下一个 Agent
```

## 共享状态

```csharp
// 工作流中的 Executor 共享状态
var workflow = new WorkflowBuilder()
    .AddExecutor("step1", async (context, ct) =>
    {
        context.State["key1"] = "value1";
        return new ExecutorResult { Output = "..." };
    })
    .AddExecutor("step2", async (context, ct) =>
    {
        var value = context.State["key1"];
        return new ExecutorResult { Output = "..." };
    })
    .AddEdge("step1", "step2")
    .Build();
```

## 可视化

框架支持工作流可视化，生成流程图。

## 工作流模式一览

| 模式 | 说明 |
| --- | --- |
| 顺序（Sequential） | 步骤按顺序执行 |
| 并发（Concurrent） | 多个步骤并行执行 |
| 条件（Conditional） | 根据条件选择不同路径 |
| 循环（Loop） | 重复执行某些步骤 |
| MapReduce | 分发-汇总模式 |
| Writer-Critic | 写作-审查循环 |
| 子工作流 | 工作流嵌套 |
| 群聊（Group Chat） | 多 Agent 协作 |
| 交接（Handoff） | Agent 间任务交接 |
