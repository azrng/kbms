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
<PackageReference Include="Microsoft.Agents.AI.Workflows" Version="1.6.1" />
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

### 基本并发

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

### Fan-out/Fan-in Edge（v1.6.1 新增）

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

## Switch-Case 模式（v1.6.1 新增）

```csharp
var workflow = new WorkflowBuilder()
    .AddExecutor("router", ...)
    .AddExecutor("techAgent", ...)
    .AddExecutor("salesAgent", ...)
    .AddExecutor("supportAgent", ...)
    .AddSwitch("router", result => result.Category,
        new Dictionary<string, string>
        {
            ["技术问题"] = "techAgent",
            ["销售咨询"] = "salesAgent",
            ["投诉"] = "supportAgent"
        })
    .Build();
```

## Chain 模式（v1.6.1 新增）

```csharp
// 快速构建顺序执行链
var workflow = new WorkflowBuilder()
    .AddChain("step1", "step2", "step3", "step4")
    .Build();
```

## 消息转发（v1.6.1 新增）

```csharp
// 转发所有消息
.ForwardMessage("step1", "step2")

// 转发除指定类型外的所有消息
.ForwardExcept("step1", "step2", typeof(ErrorMessage))

// 外部系统调用
.AddExternalCall("step1", "http://api.example.com/process")
```

## 混合工作流（Agent + Executor）

v1.6.1 新增适配器模式，允许 Agent 和 Executor 在同一工作流中混合使用。

```csharp
// 使用适配器将 Agent 的 ChatMessage 输出转换为 Executor 需要的 string
var workflow = new WorkflowBuilder()
    .AddAgentExecutor("aiAgent", myAgent, "分析以下内容")
    .AddExecutor("postProcess", async (context, ct) =>
    {
        // 类型转换适配器
        var input = context.State["aiAgent_output"]?.ToString();
        return new ExecutorResult { Output = $"处理后的: {input}" };
    })
    .AddEdge("aiAgent", "postProcess")
    .Build();
```

混合工作流示例：
- 内容审核管道（jailbreak 检测 + AI 分析）
- 安全筛查 + 分类处理
- 异构组件的顺序处理

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

## 可视化（v1.6.1 新增）

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

## Writer-Critic 工作流

v1.6.1 新增 Writer-Critic 工作流完整示例，支持迭代优化和质量关卡。

```csharp
// Writer 生成内容 → Critic 审查 → 质量关卡检查
// 可设置安全限制（最大迭代次数）
var workflow = new WorkflowBuilder()
    .AddAgentExecutor("writer", writerAgent, "写一篇文章关于 {topic}")
    .AddAgentExecutor("critic", criticAgent, "审查并改进：{input}")
    .AddEdge("writer", "critic")
    // 迭代循环直到满足质量标准
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
