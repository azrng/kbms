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
<PackageReference Include="Microsoft.Agents.AI.Workflows" Version="1.20.0" />
```

## WorkflowBuilder

`WorkflowBuilder` 的构造函数需要一个起始 Executor（执行器）。`AIAgent` 可以隐式转换为 `ExecutorBinding`，所以可以直接传入 Agent；字符串 ID 会隐式转换为占位符（`ExecutorPlaceholder`），之后用 `BindExecutor` 绑定真实执行器。

```csharp
using Microsoft.Agents.AI.Workflows;

// 定义执行器（可以是 Agent 或自定义 Executor）
AIAgent step1Agent = chatClient.AsAIAgent(instructions: "处理第一步");
AIAgent step2Agent = chatClient.AsAIAgent(instructions: "处理第二步");

// 构建工作流：起始执行器 → step2
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
        Console.Write(update.Update.Text);  // Update 是 AgentResponseUpdate 对象，取 .Text 得到增量文本
}
```

## 流式与非流式运行

### 流式运行（StreamingRun）

```csharp
await using StreamingRun run = await InProcessExecution.RunStreamingAsync(workflow, input);
await run.TrySendMessageAsync(new TurnToken(emitEvents: true));
await foreach (WorkflowEvent evt in run.WatchStreamAsync())
{
    if (evt is AgentResponseUpdateEvent update)
        Console.Write(update.Update.Text);
}
```

`StreamingRun` 还提供 `SessionId`、`GetStatusAsync()`、`CancelRunAsync()`，以及一站式驱动扩展 `RunToCompletionAsync`：

```csharp
// 自动消费全部事件直到工作流结束；回调返回非 null 的 ExternalResponse 时会自动回传给工作流
await run.RunToCompletionAsync(evt =>
    evt is RequestInfoEvent req ? req.Request.CreateResponse("自动同意") : null);
```

### 非流式运行（Run）

不订阅事件流时，可用 `RunAsync` 拿到一个 `Run` 对象，工作流执行到等待点（halt）或结束后返回控制权：

```csharp
Run run = await InProcessExecution.RunAsync(workflow, input);

Console.WriteLine(run.SessionId);
RunStatus status = await run.GetStatusAsync();

// OutgoingEvents：本次运行累积的全部事件
foreach (WorkflowEvent evt in run.OutgoingEvents) { ... }

// NewEvents：只取自上次访问以来新增的事件（带书签，可反复消费增量）
foreach (WorkflowEvent evt in run.NewEvents) { ... }

// 用外部响应恢复执行（见下文 HITL 一节）
bool hadOutput = await run.ResumeAsync([request.CreateResponse("同意")]);
```

### 执行环境

`InProcessExecution` 内置三种执行环境，可通过 `OpenStreamingAsync`/`RunStreamingAsync` 等方法的环境重载使用：

- `InProcessExecution.OffThread`（默认）：SuperStep 在后台线程执行，事件随发生随流出；
- `InProcessExecution.Concurrent`：允许同一 workflow 实例并发运行多个 Run；
- `InProcessExecution.Lockstep`：SuperStep 在事件消费线程上执行，每个 SuperStep 的事件在该步完成后批量流出。

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

### Fan-out/Fan-in Edge

```csharp
var workflow = new WorkflowBuilder("start")
    .BindExecutor(startExecutor)
    .BindExecutor(process)   // 多个实例并发处理
    .BindExecutor(merge)
    .AddFanOutEdge("start", ["process1", "process2", "process3"]) // 扇出：分发到多个实例
    .AddFanInBarrierEdge(["process1", "process2", "process3"], "merge") // 扇入：等待所有完成后合并
    .Build();
```

`AddFanOutEdge` 还支持 `targetSelector` 重载，可在运行时按输入动态选择目标子集。

## MapReduce 模式

最直接的写法是上面的 Fan-out/Fan-in 组合：分发器把任务拆给多个并行工作器，屏障边（`AddFanInBarrierEdge`）等全部完成后汇入聚合器。

如果参与者都是 Agent，用高层 API 更省事（见下文"高层编排"）：

```csharp
// 多个 Agent 并发处理同一输入，再聚合各自输出
Workflow workflow = AgentWorkflowBuilder.BuildConcurrent(
    [researcherA, researcherB, researcherC],
    aggregator: lists => lists.SelectMany(m => m).ToList());
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

使用 `AddSwitch` 实现多分支路由，`WithDefault` 指定没有任何 Case 命中时的默认分支：

```csharp
var workflow = new WorkflowBuilder(router)
    .AddSwitch(router, switch_ => switch_
        .AddCase(result => result.Category == "技术问题", techAgent)
        .AddCase(result => result.Category == "销售咨询", salesAgent)
        .AddCase(result => result.Category == "投诉", supportAgent)
        .WithDefault(otherAgent))  // 兜底分支
    .Build();
```

## Chain 模式

使用 `AddChain` 快速构建顺序执行链；`allowRepetition: true` 允许同一执行器在链中重复出现（用于构建循环链）：

```csharp
var workflow = new WorkflowBuilder(step1)
    .AddChain(step1, [step2, step3, step4], allowRepetition: false)
    .Build();
```

## 消息转发

使用泛型扩展方法实现消息类型过滤和转发：

```csharp
// 转发指定类型的消息
.ForwardMessage<ChatMessage>(step1, step2)

// 转发除指定类型外的所有消息
.ForwardExcept<ErrorMessage>(step1, step2)
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

## 外部交互与 HITL（人工介入）

工作流通过**请求端口**（`RequestPort`）与外部世界交互：执行器把请求发给端口，工作流随即暂停（halt）并抛出 `RequestInfoEvent`，外部系统处理后回传 `ExternalResponse`，工作流继续执行。

```csharp
// 创建端口：请求类型 string（提问），响应类型 bool（审批结果）
RequestPort approvalPort = RequestPort.Create<string, bool>("approval");

var workflow = new WorkflowBuilder(worker)
    .AddEdge(worker, approvalPort)   // 请求发往端口
    .AddEdge(approvalPort, worker)   // 响应送回执行器
    .Build();

await using StreamingRun run = await InProcessExecution.RunStreamingAsync(workflow, input);
await run.TrySendMessageAsync(new TurnToken(emitEvents: true));

await foreach (WorkflowEvent evt in run.WatchStreamAsync())
{
    if (evt is RequestInfoEvent requestEvent)
    {
        ExternalRequest request = requestEvent.Request;
        if (request.TryGetDataAs<string>(out string? question))
        {
            bool approved = await AskHumanAsync(question);  // 人工处理
            await run.SendResponseAsync(request.CreateResponse(approved));  // 回传后工作流恢复
        }
    }
}
```

说明：

- `RequestInfoEvent.Request` 是公开的 `ExternalRequest`（携带 `RequestId`、`PortInfo` 和 `Data`）；旧版的 `RequestHaltEvent` 已转为内部类型。
- 流式运行用 `run.SendResponseAsync(response)` 回传；非流式运行用 `run.ResumeAsync(responses)` 批量回传。
- `ExternalRequest.CreateResponse(data)` 会自动带上正确的 `RequestId` 和端口信息，推荐用它构造响应。
- 快捷方式 `AddExternalCall<TRequest, TResponse>(source, "portId")` 仍可用，它等价于把端口的双向两条边一次加好。
- 执行器内部也可以调用 `IWorkflowContext.RequestHaltAsync()` 在当前 SuperStep 结束时主动请求暂停。

### 检查点 + 人工介入

长时间等待人工审批的场景，可以先落检查点再退出进程，之后从检查点恢复：

```csharp
CheckpointManager checkpoints = CheckpointManager.CreateInMemory();

// 运行到 halt（等待审批）时，检查点已自动保存
await using StreamingRun run = await InProcessExecution.RunStreamingAsync(workflow, input, checkpoints, sessionId: "order-1");

// 记下最新检查点后即可结束进程
CheckpointInfo? saved = run.LastCheckpoint;

// 之后（甚至换个进程）从检查点恢复执行
await using StreamingRun resumed = await InProcessExecution.ResumeStreamingAsync(
    workflow, saved!, checkpoints);
```

## 检查点（Checkpointing）

检查点能力由 `CheckpointManager` 提供，在**启动运行时传入**即可启用（不再有 `run.SaveCheckpointAsync()` 之类的运行对象方法）：

```csharp
CheckpointManager checkpoints = CheckpointManager.CreateInMemory();

// 流式：RunStreamingAsync(workflow, input, checkpointManager, sessionId)
await using StreamingRun run = await InProcessExecution.RunStreamingAsync(
    workflow, input, checkpoints, sessionId: "session-1");

// 非流式：RunAsync(workflow, input, checkpointManager)
Run run2 = await InProcessExecution.RunAsync(workflow, input, checkpoints);
```

运行对象（`Run`/`StreamingRun` 共同基类 `CheckpointableRunBase`）提供检查点查询与回滚：

```csharp
bool enabled = run.IsCheckpointingEnabled;          // 是否已启用检查点
IReadOnlyList<CheckpointInfo> all = run.Checkpoints; // 已保存的检查点列表
CheckpointInfo? latest = run.LastCheckpoint;         // 最近一次检查点

await run.RestoreCheckpointAsync(all[0]);            // 把当前运行回滚到指定检查点
```

从检查点恢复：

```csharp
// 流式恢复
await using StreamingRun resumed = await InProcessExecution.ResumeStreamingAsync(
    workflow, latest!, checkpoints);

// 非流式恢复
Run resumed2 = await InProcessExecution.ResumeAsync(workflow, latest!, checkpoints);
```

持久化到文件系统时，用 `FileSystemJsonCheckpointStore` + `CheckpointManager.CreateJson`：

```csharp
using Microsoft.Agents.AI.Workflows.Checkpointing;

var store = new FileSystemJsonCheckpointStore(new DirectoryInfo("./checkpoints"));
CheckpointManager checkpoints = CheckpointManager.CreateJson(store);
// 消息/状态中含自定义类型时，给 CreateJson 传入定制的 JsonSerializerOptions
```

`CheckpointManager` 的三个入口：`CreateInMemory()`（内存）、`CreateJson(ICheckpointStore<JsonElement>)`（JSON 存储，可接文件系统或自定义存储）、`Default`（默认内存实例）。

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

子工作流内部的错误会以 `SubworkflowErrorEvent` 的形式冒泡到主工作流。

## 高层编排（AgentWorkflowBuilder）

对于常见的多 Agent 编排模式，`AgentWorkflowBuilder` 提供了无需手搭边的高层入口：

### 顺序（Sequential）

```csharp
// 默认把累积的完整对话传给下一个 Agent
Workflow workflow = AgentWorkflowBuilder.BuildSequential(translateAgent, polishAgent, summarizeAgent);

// chainOnlyAgentResponses: true 时只传上一个 Agent 的输出消息（输出也只含最后一个 Agent 的消息）
Workflow workflow2 = AgentWorkflowBuilder.BuildSequential(chainOnlyAgentResponses: true, a, b, c);
```

### 并发（Concurrent）

```csharp
// 同一输入分发给所有 Agent，输出聚合为一条消息列表；不传 aggregator 时默认收集各 Agent 的最后一条消息
Workflow workflow = AgentWorkflowBuilder.BuildConcurrent(
    [researcherA, researcherB, researcherC],
    aggregator: lists => lists.SelectMany(m => m).ToList());
```

### Handoff（交接）

```csharp
var workflow = AgentWorkflowBuilder.CreateHandoffBuilderWith(triageAgent)  // 初始接收输入的 Agent
    .AddParticipants(billingAgent, supportAgent)
    .WithHandoff(triageAgent, billingAgent, "账单类问题转给 billing")      // 显式声明交接关系
    .WithTerminationCondition(msgs => msgs.Count > 10)
    .Build();
```

交接通过 Agent 的工具调用实现（框架自动注册 `handoff_to_*` 工具），Agent 必须支持工具调用才能完成交接。`HandoffWorkflowBuilder` 还提供 `EnableReturnToPrevious()`（允许退回上一个 Agent）、`WithAutonomousMode(...)`（自主运行）等配置。

### Group Chat（群聊）

```csharp
var workflow = AgentWorkflowBuilder
    .CreateGroupChatBuilderWith(agents => new RoundRobinGroupChatManager(agents) { MaximumIterationCount = 6 })
    .AddParticipants(writer, reviewer, factChecker)
    .Build();
```

`managerFactory` 接收参与者列表并返回 `GroupChatManager`，由它决定下一个发言者与终止条件；内置 `RoundRobinGroupChatManager`（轮询），也可以继承 `GroupChatManager` 自定义选人逻辑。

### MapReduce 风格的并发聚合

`CreateConcurrentBuilderWith(...)` / `SequentialWorkflowBuilder` / `ConcurrentWorkflowBuilder` 提供逐步配置的等价形式，例如 `ConcurrentWorkflowBuilder.WithAggregator(...)` 自定义聚合、`SequentialWorkflowBuilder.WithChainOnlyAgentResponses(...)` 控制消息传递策略。

## Magentic-One 编排

`MagenticWorkflowBuilder` 实现 Magentic-One 模式：一个 LLM 驱动的管理者负责动态任务规划、进度跟踪与自适应重规划。

```csharp
AIAgent manager = chatClient.AsAIAgent(name: "coordinator", instructions: "你负责协调团队完成任务");

var workflow = AgentWorkflowBuilder.CreateMagenticBuilderWith(manager)
    .AddParticipants(researcher, coder, writer)  // 团队成员
    .WithMaxRounds(10)      // 最大协调轮数（null 为不限）
    .WithMaxStalls(3)       // 连续无进展的最大轮数，超过则重规划（默认 3）
    .WithMaxResets(2)       // 最大重置次数
    .RequirePlanSignoff()   // 计划需人工签核后才执行（默认开启）
    .Build();
```

实验性能力：`WithResponseLanguage("Chinese")` 强制管理者的内部生成消息（任务账本、进度账本、最终答案）使用指定语言；`WithPromptOverrides(...)` 可覆写内部提示词模板（进度账本模板必须包含 `{schema}` 占位符）。两者均标记了 `[Experimental]`。

## 工作流即 Agent

任何工作流都可以包装成 `AIAgent`，直接用消息驱动（`includeWorkflowOutputsInResponse: true` 时工作流输出会转换为响应内容）：

```csharp
AIAgent pipelineAgent = workflow.AsAIAgent(
    name: "content-pipeline",
    description: "写作-审校流水线",
    includeWorkflowOutputsInResponse: true);

AgentResponse response = await pipelineAgent.RunAsync("写一篇关于 blazor 的短文");

// 宿主侧可重定向检查点存储（返回副本，不影响原 Agent）
AIAgent hosted = pipelineAgent.WithCheckpointing(checkpointManager);
```

## 构建器元数据与输出控制

```csharp
var workflow = new WorkflowBuilder("start")
    .BindExecutor(startExecutor)
    .AddEdge("start", "end")
    .WithName("内容审核管道")                    // 工作流名称
    .WithDescription("先审查再处理的内容管道")   // 工作流描述
    .WithOutputFrom(finalExecutor)              // 指定哪些执行器的输出作为工作流输出
    .WithIntermediateOutputFrom([midExecutor])  // 输出标记为中间输出（OutputTag.Intermediate）
    .Build(validateOrphans: true);              // 默认校验无出边的孤立执行器
```

`Workflow` 支持运行时反射与协议描述：

```csharp
Dictionary<string, HashSet<EdgeInfo>> edges = workflow.ReflectEdges();       // 边
Dictionary<string, RequestPortInfo> ports = workflow.ReflectPorts();         // 请求端口
Dictionary<string, ExecutorBinding> executors = workflow.ReflectExecutors(); // 执行器

ProtocolDescriptor protocol = await workflow.DescribeProtocolAsync();        // 输入/输出协议
```

## 可观测性（OpenTelemetry）

```csharp
var workflow = new WorkflowBuilder(start)
    .AddEdge(start, end)
    .WithOpenTelemetry(cfg => cfg.EnableSensitiveData = false)  // 默认关闭遥测，需显式启用
    .Build();
```

启用后提供工作流执行的分布式追踪、执行器调用与消息路由 Span、构建校验 Span 以及错误追踪；默认使用名为 `Microsoft.Agents.AI.Workflows` 的 ActivitySource，也可传入自己的实例。

## 自定义执行器

除了单输入的 `Executor<TInput>`，还可以用 `Executor<TInput, TOutput>` 声明式地表达输出类型；构造函数可传 `ExecutorOptions` 配置，`declareCrossRunShareable: true` 声明执行器可被多个 Run 并发共享：

```csharp
public class UpperCaseExecutor : Executor<string, string>
{
    public UpperCaseExecutor() : base("upper") { }

    public override ValueTask<string> HandleAsync(string message, IWorkflowContext context,
        CancellationToken cancellationToken = default)
        => new(message.ToUpperInvariant());
}
```

基类提供三个生命周期钩子，可按需覆写：

- `InitializeAsync(context)`：执行器初始化；
- `OnCheckpointingAsync(context)`：检查点保存前回调；
- `OnCheckpointRestoredAsync(context)`：检查点恢复后回调。

### StatefulExecutor：自动状态管理

`StatefulExecutor<TState>`、`StatefulExecutor<TState, TInput>`、`StatefulExecutor<TState, TInput, TOutput>` 把状态读写模板化，状态随检查点自动持久化：

```csharp
public class CounterExecutor : StatefulExecutor<int, string>
{
    public CounterExecutor() : base("counter", () => 0) { }  // 初始状态 0

    public override async ValueTask HandleAsync(string message, IWorkflowContext context,
        CancellationToken cancellationToken = default)
    {
        int count = await this.ReadStateAsync(context);
        await this.QueueStateUpdateAsync(count + 1, context);
    }
}
```

## 共享状态

工作流中的 Executor 可以通过 `IWorkflowContext` 的状态 API 共享数据（均带可选 `scopeName` 作用域参数）：

```csharp
public class Step1Executor : Executor<string>
{
    public Step1Executor() : base("step1") { }

    public override async ValueTask HandleAsync(string input, IWorkflowContext context,
        CancellationToken cancellationToken = default)
    {
        // 写入状态（本执行器立即可见，其他执行器下一个 SuperStep 可见）
        await context.QueueStateUpdateAsync("key1", "value1", cancellationToken: cancellationToken);

        // 读取状态；不存在时用工厂初始化
        int counter = await context.ReadOrInitStateAsync("counter", () => 0, cancellationToken: cancellationToken);

        // 读取（可能为 null）
        string? value = await context.ReadStateAsync<string>("key1", cancellationToken: cancellationToken);

        // 读取当前作用域的所有键
        HashSet<string> keys = await context.ReadStateKeysAsync(cancellationToken: cancellationToken);

        // 清空整个作用域（默认为本执行器的默认作用域）
        await context.QueueClearScopeAsync(cancellationToken: cancellationToken);
    }
}
```

注意：状态写入是"排队"语义，写入方立即可见，其他执行器要等下一个 SuperStep 才能看到新值。

## 事件体系

除 `AgentResponseUpdateEvent` 外，引擎还发出一组生命周期事件，可在 `WatchStreamAsync` 循环中按类型分发：

| 事件 | 触发时机 |
| --- | --- |
| `WorkflowStartedEvent` | 工作流启动 |
| `SuperStepStartedEvent` / `SuperStepCompletedEvent` | 每个 SuperStep 开始/结束（带步号） |
| `ExecutorInvokedEvent` | 执行器被调用（携带入站消息） |
| `ExecutorCompletedEvent` | 执行器处理完成（携带结果） |
| `ExecutorFailedEvent` | 执行器处理失败（携带异常） |
| `WorkflowErrorEvent` | 工作流出错（携带异常） |
| `WorkflowWarningEvent` | 非致命警告 |
| `SubworkflowErrorEvent` | 子工作流出错（继承自 `WorkflowErrorEvent`） |
| `WorkflowOutputEvent` | 执行器产出输出（`AgentResponseUpdateEvent` 等都是它的子类） |

`WorkflowOutputEvent` 自带输出元数据：

```csharp
if (evt is WorkflowOutputEvent output)
{
    Console.WriteLine(output.ExecutorId);        // 产出该输出的执行器 ID
    if (output.Is<string>())                     // 判断并取值
        Console.WriteLine(output.As<string>());
    if (output.HasTag(OutputTag.Intermediate))   // 是否为中间输出（需开启特性开关）
        Console.WriteLine("中间输出");
}
```

输出打标与过滤依赖特性开关 `Futures.EnableAgentResponseOutputTaggingAndFiltering = true`（开启后 Agent 响应类输出也参与 `WithOutputFrom` 的过滤与打标）。

## 可视化

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

## 声明式工作流（Declarative）

声明式子包支持用 JSON 定义工作流，并提供多个生态集成包：

```xml
<PackageReference Include="Microsoft.Agents.AI.Workflows.Declarative" Version="1.20.0" />
<PackageReference Include="Microsoft.Agents.AI.Workflows.Declarative.Foundry" Version="1.20.0" />
<PackageReference Include="Microsoft.Agents.AI.Workflows.Declarative.Mcp" Version="1.20.0" />
<PackageReference Include="Microsoft.Agents.AI.Workflows.Declarative.AzureAI" Version="1.20.0" />
```

- `DeclarativeWorkflowJsonOptions` 面向 AOT 友好地控制 JSON 反序列化行为；
- 内置 PowerFx 表达式支持，可在声明式定义中编写表达式逻辑。

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
| Magentic-One | LLM 管理者动态规划协调 |
| 混合（Mixed） | Agent + Executor 混用 |
