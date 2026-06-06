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
<PackageReference Include="Microsoft.Agents.AI.Workflows" Version="1.9.0" />
```

## WorkflowBuilder

`WorkflowBuilder` 的构造函数需要一个起始 Executor（执行器）。`AIAgent` 可以隐式转换为 `ExecutorBinding`，所以可以直接传入 Agent。

```csharp
using Microsoft.Agents.AI.Workflows;

// 定义执行器（可以是 Agent 或自定义 Executor）
AIAgent step1Agent = chatClient.AsAIAgent(instructions: "处理第一步");
AIAgent step2Agent = chatClient.AsAIAgent(instructions: "处理第二步");

// 构建工作流：起始执行器 → step1 → step2
var workflow = new WorkflowBuilder(step1Agent)
    .AddEdge(step1Agent, step2Agent)  // step1 完成后执行 step2
    .Build();
```

## 在工作流中使用 Agent

Agent 可以直接作为工作流的执行器，通过 `AddEdge` 连接：

```csharp
AIAgent writerAgent = chatClient.AsAIAgent(instructions: "你是一个专业的写作助手");
AIAgent reviewerAgent = chatClient.AsAIAgent(instructions: "你是一个文章审查专家");

var workflow = new WorkflowBuilder(writerAgent)
    .AddEdge(writerAgent, reviewerAgent)
    .Build();

// 执行工作流
await using StreamingRun run = await InProcessExecution.RunStreamingAsync(
    workflow, new ChatMessage(ChatRole.User, "写一篇关于 AI Agent 开发的文章"));

await run.TrySendMessageAsync(new TurnToken(emitEvents: true));
await foreach (WorkflowEvent evt in run.WatchStreamAsync())
{
    if (evt is AgentResponseUpdateEvent update)
        Console.Write(update.Data);
}
```

## 流式工作流

```csharp
await using StreamingRun run = await InProcessExecution.RunStreamingAsync(workflow, input);
await run.TrySendMessageAsync(new TurnToken(emitEvents: true));
await foreach (WorkflowEvent evt in run.WatchStreamAsync())
{
    if (evt is AgentResponseUpdateEvent update)
        Console.Write(update.Data);
}
```

## 并发执行（Fan-out/Fan-in）

### 基本并发

```csharp
// 使用占位符 ID 定义执行器，稍后绑定
var workflow = new WorkflowBuilder("start")
    .BindExecutor(startExecutor)
    .BindExecutor(taskA)
    .BindExecutor(taskB)
    .BindExecutor(taskC)
    .BindExecutor(merge)
    .AddEdge("start", "taskA")
    .AddEdge("start", "taskB")
    .AddEdge("start", "taskC")
    .AddEdge("taskA", "merge")
    .AddEdge("taskB", "merge")
    .AddEdge("taskC", "merge")
    .Build();
```

### Fan-out/Fan-in Edge（v1.9.0 新增）

```csharp
var workflow = new WorkflowBuilder()
    .AddExecutor("start", ...)
    .AddExecutor("process", ...)  // 多个实例并发处理
    .AddExecutor("merge", ...)
    .AddFanOutEdge("start", "process")       // 扇出：分发到多个实例
    .AddFanInBarrierEdge("process", "merge") // 扇入：等待所有完成后合并
    .Build();
```

## MapReduce 模式

```csharp
// 将任务分发到多个并行 Agent，然后汇总结果
```

## 条件边（Conditional Edges）

使用泛型 `AddEdge<T>` 方法，通过 `condition` 参数实现条件路由：

```csharp
var workflow = new WorkflowBuilder(classifier)
    .AddEdge(classifier, handleA, (string? result) => result == "typeA")
    .AddEdge(classifier, handleB, (string? result) => result == "typeB")
    .Build();
```

也可以使用 `AddSwitch` 实现更清晰的多分支路由：

```csharp
var workflow = new WorkflowBuilder(classifier)
    .AddSwitch(classifier, switch_ => switch_
        .AddCase(result => result == "typeA", handleA)
        .AddCase(result => result == "typeB", handleB))
    .Build();
```

## Switch-Case 模式

使用 `AddSwitch` 实现多分支路由：

```csharp
var workflow = new WorkflowBuilder(router)
    .AddSwitch(router, switch_ => switch_
        .AddCase(result => result.Category == "技术问题", techAgent)
        .AddCase(result => result.Category == "销售咨询", salesAgent)
        .AddCase(result => result.Category == "投诉", supportAgent))
    .Build();
```

## Chain 模式

使用 `AddChain` 快速构建顺序执行链：

```csharp
var workflow = new WorkflowBuilder(step1)
    .AddChain(step1, [step2, step3, step4])
    .Build();
```

## 消息转发

使用泛型扩展方法实现消息类型过滤和转发：

```csharp
// 转发指定类型的消息
.ForwardMessage<ChatMessage>(step1, step2)

// 转发除指定类型外的所有消息
.ForwardExcept<ErrorMessage>(step1, step2)

// 外部系统调用（需要指定请求和响应类型）
.AddExternalCall<Request, Response>(step1, "externalPort")
```

## 混合工作流（Agent + Executor）

Agent 和自定义 Executor 可以在同一工作流中混合使用。Agent 通过隐式转换为 `ExecutorBinding` 参与工作流。

```csharp
// Agent 作为执行器
AIAgent aiAgent = chatClient.AsAIAgent(instructions: "分析内容");

// 自定义函数执行器
ExecutorBinding postProcess = ((Func<string, ValueTask<string>>)(async input =>
    $"处理后的: {input}")).BindAsExecutor("postProcess");

var workflow = new WorkflowBuilder(aiAgent)
    .AddEdge(aiAgent, postProcess)
    .Build();
```

混合工作流示例：
- 内容审核管道（jailbreak 检测 + AI 分析）
- 安全筛查 + 分类处理
- 异构组件的顺序处理

## 检查点（Checkpointing）

工作流支持检查点，可暂停和恢复长时间运行的工作流。

```csharp
// 执行工作流并保存检查点
await using StreamingRun run = await InProcessExecution.RunStreamingAsync(workflow, input);
var checkpoint = await run.SaveCheckpointAsync();

// 从检查点恢复执行
await using StreamingRun resumedRun = await InProcessExecution.RunStreamingAsync(workflow, checkpoint);
```

### 检查点 + 人工介入（HITL）

```csharp
// 工作流暂停等待人工审批
// 审批后从检查点恢复执行
```

## 子工作流（Sub-workflows）

子工作流通过 `BindAsExecutor()` 转换为执行器后嵌入主工作流：

```csharp
// 构建子工作流
var subWorkflow = new WorkflowBuilder(sub1)
    .AddEdge(sub1, sub2)
    .Build();

// 将子工作流绑定为执行器
ExecutorBinding subExecutor = subWorkflow.BindAsExecutor("subProcess");

// 构建主工作流
var mainWorkflow = new WorkflowBuilder(start)
    .AddEdge(start, subExecutor)
    .AddEdge(subExecutor, end)
    .Build();
```

## 可视化（v1.9.0 新增）

框架支持工作流可视化，生成流程图。

```csharp
// Mermaid 格式（可在浏览器中查看）
string mermaid = workflow.ToMermaidString();
Console.WriteLine(mermaid);
// 可粘贴到 https://mermaid.live 编辑器查看

// DOT/Graphviz 格式
string dot = workflow.ToDotString();
Console.WriteLine(dot);
// 可使用 Graphviz 工具渲染
```

支持的可视化格式：
- **Mermaid**：适合 Markdown 文档、Mermaid Live Editor
- **DOT**：适合 Graphviz 渲染、复杂图形

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

工作流中的 Executor 可以通过 `IWorkflowContext` 共享状态：

```csharp
// 自定义 Executor 使用共享状态
public class Step1Executor : Executor<string>
{
    public Step1Executor() : base("step1") { }

    protected override ValueTask HandleAsync(string input, IWorkflowContext context, CancellationToken ct)
    {
        context.State["key1"] = "value1";
        return default;
    }
}
```

## Writer-Critic 工作流

Writer-Critic 模式支持迭代优化和质量关卡。

```csharp
AIAgent writerAgent = chatClient.AsAIAgent(instructions: "你是一个专业的写作助手");
AIAgent criticAgent = chatClient.AsAIAgent(instructions: "你是一个严格的文章审查专家");

// Writer 生成内容 → Critic 审查 → 循环直到满足质量标准
var workflow = new WorkflowBuilder(writerAgent)
    .AddEdge(writerAgent, criticAgent)
    .AddEdge(criticAgent, writerAgent, (string? feedback) => !IsQualityMet(feedback))
    .Build();
```

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
| 混合（Mixed） | Agent + Executor 混用 |
