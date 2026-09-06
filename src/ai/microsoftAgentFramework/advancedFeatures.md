---
title: 高级特性
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
  - 高级特性
---

# 高级特性

## 结构化输出

```csharp
// 定义输出结构
public class WeatherReport
{
    public string City { get; set; }
    public int Temperature { get; set; }
    public string Condition { get; set; }
}

// 使用泛型 RunAsync 获取结构化结果
var agent = chatClient.AsAIAgent(
    name: "WeatherAgent",
    instructions: "提供天气报告"
);

var result = await agent.RunAsync<WeatherReport>("北京今天的天气");
Console.WriteLine($"{result.City}: {result.Temperature}°C, {result.Condition}");
```

## Skills（技能系统）

技能系统（Skills API 已转正，不再是实验特性）支持多种定义方式，最终由 `AgentSkillsProvider`（一个 `AIContextProvider`）注入 Agent，实现"按需发现、按需加载"的动态能力。

### 文件型技能（File-based Skills）

通过目录结构定义技能（`SKILL.md` + 资源 + 脚本），也支持 archive 打包形态的技能。

```csharp
using Microsoft.Agents.AI;

// 从文件系统发现技能：构造函数接收技能搜索路径，
// options 只控制发现行为（搜索深度、资源/脚本扩展名白名单、过滤器等）
var skillSource = new AgentFileSkillsSource(
    Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "skills"),
    options: new AgentFileSkillsSourceOptions
    {
        SearchDepth = 2
    });
```

### 代码定义技能（Inline/Programmatic Skills）

在代码中直接构造技能，资源与脚本以值或委托内联提供。

```csharp
using Microsoft.Agents.AI;

var inlineSkill = new AgentInlineSkill(
    name: "analyze",
    description: "数据分析技能",
    instructions: "按步骤分析用户提供的数据……");

// 资源与脚本通过 AddResource / AddScript 追加：
// （注意 AgentInlineSkillResource / AgentInlineSkillScript 是 internal 类型，不能直接 new）
inlineSkill.AddResource("参考数据……");
inlineSkill.AddScript(async (input, ct) => "脚本执行结果");
```

### 类型技能（Class-based Skills）

继承 `AgentClassSkill<TSelf>`，用 attribute 标注成员即可被反射发现（Native AOT 兼容）。注意区分：底层抽象基类 `AgentSkillResource` / `AgentSkillScript` 的构造是 `(name, description?)`，需要继承并实现 `ReadAsync` / `RunAsync`；`[AgentSkillResource]` / `[AgentSkillScript]` 只是 `AgentClassSkill<TSelf>` 提供的便捷发现方式，不能脱离该基类单独使用。

```csharp
using Microsoft.Agents.AI;

public sealed class MySkill : AgentClassSkill<MySkill>
{
    public override AgentSkillFrontmatter Frontmatter { get; } = new("my-skill", "一个示例技能");
    protected override string Instructions => "Use this skill to do something.";

    [AgentSkillResource("reference-data")]
    [Description("技能的参考内容")]
    public string ReferenceData => "……";

    [AgentSkillScript("analyze")]
    [Description("分析输入")]
    private static string Analyze(string input) => $"分析结果: {input}";
}
```

### 技能源（AgentSkillsSource）与装饰器

`AgentSkillsSource` 是技能来源的抽象（核心方法 `GetSkillsAsync(AgentSkillsSourceContext, CancellationToken)`），围绕它提供了一组装饰器与组合件：

| 类型 | 说明 |
| --- | --- |
| `AgentFileSkillsSource` | 文件系统技能源 |
| `AgentInMemorySkillsSource` | 内存技能源（`IEnumerable<AgentSkill>`） |
| `CachingAgentSkillsSource` | 缓存装饰器 |
| `DeduplicatingAgentSkillsSource` | 去重装饰器 |
| `FilteringAgentSkillsSource` | 过滤装饰器 |
| `AggregatingAgentSkillsSource` | 聚合多个技能源 |

### 组装 Provider

用 `AgentSkillsProviderBuilder` 把技能源组装成 `AgentSkillsProvider`，再挂到 Agent 上：

```csharp
var skillsProvider = new AgentSkillsProviderBuilder()
    .UseSource(skillSource)
    .UseSkill(inlineSkill)
    .UseFilter((skill, _) => skill.Name != "internal-only")
    .Build();

var agent = new ChatClientAgent(chatClient, new ChatClientAgentOptions
{
    Instructions = "你是一个助手",
    AIContextProviders = [skillsProvider]
});
```

## 声明式定义（Declarative）

通过 YAML 文件定义 Agent 和工作流，无需编译。

```xml
<PackageReference Include="Microsoft.Agents.AI.Declarative" Version="1.20.0" />
<PackageReference Include="Microsoft.Agents.AI.Workflows.Declarative" Version="1.20.0" />
```

### 声明式 Agent

```yaml
# agent.yaml
name: MyAgent
instructions: 你是一个专业的助手
model: gpt-5.4-mini
```

::: warning 工厂 API 变更
`PromptAgentFactory` 现在是**抽象类**，其 `CreateAsync` 接收 Foundry 的 `GptComponentMetadata`（组件定义），不再接收 YAML 文件路径。YAML 入口是扩展方法 `CreateFromYamlAsync(this PromptAgentFactory, string agentYaml, ...)`（参数是 YAML **字符串**），具体工厂为 `ChatClientPromptAgentFactory(IChatClient, functions?, engine?, configuration?, loggerFactory?)`。
:::

```csharp
using Microsoft.Agents.AI;

var factory = new ChatClientPromptAgentFactory(chatClient);
var agent = await factory.CreateFromYamlAsync(File.ReadAllText("agent.yaml"));
```

### 声明式工作流

```yaml
# workflow.yaml
executors:
  - name: step1
    agent: MyAgent
    prompt: "处理 {input}"
  - name: step2
    agent: ReviewAgent
    prompt: "审查 {input}"
edges:
  - from: step1
    to: step2
```

### 代码生成

声明式工作流支持代码生成和 PowerFx 表达式。

```xml
<PackageReference Include="Microsoft.Agents.AI.Workflows.Generators" Version="1.20.0" />
```

### Foundry 声明式（v1.9.0 新增）

```xml
<PackageReference Include="Microsoft.Agents.AI.Workflows.Declarative.Foundry" Version="1.20.0" />
```

```csharp
// Foundry 声明式工作流
// AzureAgentProvider：基于 Foundry 的 Agent 预配
```

## Hyperlight 沙箱执行（v1.9.0 新增）

通过 Hyperlight 实现 VM 级隔离的安全代码执行。

```xml
<PackageReference Include="Microsoft.Agents.AI.Hyperlight" Version="1.20.0" />
```

### 特性

- **沙箱 Python 解释器**：在隔离 VM 中执行 Python 代码
- **工具编排**：Guest 代码可通过 `call_tool(...)` 调用宿主工具
- **快照/恢复**：每次运行干净状态；工具注册表更新后会自动重建沙箱
- **安全控制**：可选文件系统挂载、网络白名单
- **审批模式**：`NeverRequire` / `AlwaysRequire`

### 3 步示例

1. 基础 Python 解释器
2. 工具编排 CodeAct
3. 手动注册 `HyperlightExecuteCodeFunction`

详见 [函数工具 - CodeAct 模式](functionTools.md#codeact-模式沙箱代码执行)

## HarnessAgent

一站式预配置 Agent，自动组装完整管道。

```xml
<PackageReference Include="Microsoft.Agents.AI.Harness" Version="1.20.0" />
```

### 管道组成

```
HarnessAgent（从外到内）
├── LoopAgent                        # 最外层循环，仅提供 LoopEvaluators 时挂载
├── OpenTelemetryAgent               # 遥测（DisableOpenTelemetry 可关）
├── ToolApprovalAgent                # 工具审批/"Don't ask again"（DisableToolAutoApproval 可关）
└── ChatClientAgent
    ├── AIContextProvider 管道（默认启用，可逐个关闭）
    │   ├── TodoProvider             # 待办事项管理（DisableTodoProvider）
    │   ├── AgentModeProvider        # plan/execute 模式切换（DisableAgentModeProvider）
    │   ├── FileMemoryProvider       # 基于文件的会话记忆（DisableFileMemory）
    │   ├── AgentSkillsProvider      # 技能发现和加载（DisableAgentSkillsProvider）
    │   ├── FileAccessProvider       # 共享文件访问（设 FileAccessStore 时才挂载，opt-in）
    │   └── BackgroundAgentsProvider # 后台代理委派（设 BackgroundAgents 时才挂载）
    └── ChatClient 管道（内 → 外）
        ├── FunctionInvokingChatClient    # 自动函数调用
        ├── MessageInjectingChatClient    # 运行中消息注入
        ├── PerServiceCallChatHistoryPersistingChatClient  # 每次服务调用持久化
        └── AIContextProviderChatClient + CompactionProvider  # 上下文压缩（见下）
HostedWebSearchTool                # 内置 Web 搜索（注入 ChatOptions.Tools，DisableWebSearch 可关）
```

注意：`CompactionProvider` 只在 `MaxContextWindowTokens` 与 `MaxOutputTokens` **同时提供**时才挂载（未设置自定义 `CompactionStrategy` 且未 `DisableCompaction`），否则压缩默认关闭。

### 常用选项（HarnessAgentOptions）

| 选项 | 说明 |
| --- | --- |
| `MaxContextWindowTokens` / `MaxOutputTokens` | 两者同时提供时构建默认 `ContextWindowCompactionStrategy`；`MaxOutputTokens` 还会作为 `ChatOptions.MaxOutputTokens` 的默认值 |
| `CompactionStrategy` / `DisableCompaction` | 自定义压缩策略 / 完全关闭压缩 |
| `LoopEvaluators` / `LoopAgentOptions` | 提供评估器时把 Agent 包进最外层 `LoopAgent` 循环 |
| `MaximumIterationsPerRequest` | 传给 `FunctionInvokingChatClient.MaximumIterationsPerRequest` |
| `ToolApprovalAgentOptions` / `DisableToolAutoApproval` | 审批配置（含自动审批规则）/ 关闭自动审批中间件 |
| `ChatOptions` / `HarnessInstructions` | agent 级配置与 harness 级使用说明（harness 在前、agent 在后合并） |
| `ChatHistoryProvider` / `AIContextProviders` | 自定义历史提供者 / 追加自定义上下文提供者 |
| `FileMemoryStore` / `FileAccessStore` / `FileAccessProviderOptions` | 文件记忆存储 / 文件访问（opt-in）及其选项 |
| `AgentSkillsSource` | 自定义技能源（默认从当前工作目录做文件技能发现） |
| `BackgroundAgents` / `BackgroundAgentsProviderOptions` | 可委派的后台代理集合（名称必须非空且唯一）及其配置 |
| `DisableWebSearch` / `DisableTodoProvider` / `DisableAgentModeProvider` / `DisableAgentSkillsProvider` / `DisableFileMemory` | 逐个关闭内置能力 |
| `DisableOpenTelemetry` / `OpenTelemetrySourceName` | 遥测开关与 ActivitySource 名称 |

### 使用示例

```csharp
using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;  // AsHarnessAgent 扩展方法在 Microsoft.Extensions.AI 命名空间

var agent = chatClient.AsHarnessAgent(new HarnessAgentOptions
{
    Name = "MyAgent",
    ChatOptions = new ChatOptions
    {
        Instructions = "你是一个全能助手"
    },
    // 两者同时提供才会挂载默认的 ContextWindowCompactionStrategy
    MaxContextWindowTokens = 1_050_000,
    MaxOutputTokens = 128_000
});

await foreach (var update in agent.RunStreamingAsync("帮我分析这份数据"))
{
    Console.Write(update.Text);
}
```

### Loop 循环与后台代理

提供 `LoopEvaluators` 时，HarnessAgent 最外层会包一个 `LoopAgent`：每一轮迭代都是一次完整的 Agent run（含工具审批与遥测），直到评估器满足才退出。内置评估器：

- `TodoCompletionLoopEvaluator`：基于 TodoProvider，待办全部完成即结束循环
- `BackgroundTaskCompletionLoopEvaluator`：等待委派的后台任务全部完成
- `CompletionMarkerLoopEvaluator` / `AIJudgeLoopEvaluator` / `DelegateLoopEvaluator`：完成标记 / AI 评审 / 委托判断

后台代理方面，`BackgroundAgents` 提供一组可委派的 `AIAgent`，由 `BackgroundAgentsProvider` 注入对应工具，让主 Agent 能启动、监控并收取后台任务结果；宿主在会话结束后应调用 `BackgroundAgentsProvider.ReleaseSessionAsync` 取消并等待在途任务、完成状态清理。

## Managed Agent 模式（v1.9.0 新增）

Anthropic 的 Managed Agent 架构模式实现，将 Agent 分解为三个组件：

```
┌─────────────────────────────────────┐
│          Managed Agent              │
│                                     │
│  ┌──────────┐  (Brain - 无状态)     │
│  │ AgentHarness │                    │
│  └──────┬──────┘                    │
│         │                           │
│  ┌──────┴──────┐  (Memory - 持久)   │
│  │ SessionLog  │                    │
│  └──────┬──────┘                    │
│         │                           │
│  ┌──────┴──────┐  (Hands - 沙箱)    │
│  │ Sandbox     │                    │
│  └─────────────┘                    │
└─────────────────────────────────────┘
```

### 核心概念

- **Brain（AgentHarness）**：无状态 Agent 核心，处理推理和决策
- **Memory（SessionLog）**：持久化会话日志，支持崩溃恢复
- **Hands（Sandbox）**：沙箱执行层，安全执行代码和工具

### 崩溃恢复

```csharp
// 使用 session_id 恢复中断的会话
// wake(session_id) 从上次检查点继续执行
```

### 扩展点

- Cosmos DB 持久化
- Blob Storage 文件存储
- Key Vault 凭证管理

## 评估框架

框架内置一套评估体系（`Microsoft.Agents.AI.Evaluation` 命名空间），核心类型：

- `IAgentEvaluator` / `LocalEvaluator`：评估器抽象与本地实现
- `MeaiEvaluatorAdapter`：把 Microsoft.Extensions.AI.Evaluation 的评估器接入 Agent 评估管道（Relevance 相关性、Coherence 连贯性、Fluency 流畅性等内置检查）
- `EvalChecks` / `EvalCheck`：声明式评估检查
- `RubricScore` / `CheckResult`：评分与检查结果
- `IConversationSplitter`：多轮对话分割策略（LastTurn / Full / PerTurnItems 等）
- `ExpectedToolCall`：预期工具调用断言

同时支持对接 Azure AI Foundry 的 Adaptive evals（把评估定义托管到 Foundry 侧执行）。

详见 [评估与可观测性](evaluationAndObservability.md)

## 压缩管道（Compaction Pipeline）

管理长对话的 token 消耗。核心抽象是 `CompactionStrategy`（`Microsoft.Agents.AI.Compaction` 命名空间，实验特性），子类实现 `CompactCoreAsync(CompactionMessageIndex, ILogger, CancellationToken)`；何时压缩由 `CompactionTrigger` 委托决定，`CompactionTriggers` 静态工厂提供常用条件：`Always` / `Never` / `TokensBelow` / `TokensExceed` / `MessagesExceed` / `TurnsExceed` / `GroupsExceed` / `HasToolCalls`，并可用 `All` / `Any` 组合成复合条件。

### 压缩策略

| 策略 | 构造要点 |
| --- | --- |
| 工具结果压缩 `ToolResultCompactionStrategy` | `(trigger, minimumPreservedGroups, target?)`，把过大的工具结果替换为格式化摘要 |
| 摘要 `SummarizationCompactionStrategy` | `(IChatClient, trigger, minimumPreservedGroups, summarizationPrompt?, target?)`，用 LLM 生成对话摘要 |
| 滑动窗口 `SlidingWindowCompactionStrategy` | `(trigger, minimumPreservedTurns, target?)`，保留最近 N 个用户轮次 |
| 截断 `TruncationCompactionStrategy` | `(trigger, minimumPreservedGroups, target?)`，直接截断过早的消息组 |
| 聊天缩减 `ChatReducerCompactionStrategy` | `(IChatReducer, trigger)`，复用 MEAI 的 `IChatReducer` |
| `ContextWindowCompactionStrategy` | `(maxContextWindowTokens, maxOutputTokens, ...)`，"工具结果淘汰 + 截断"的默认组合策略 |
| `PipelineCompactionStrategy` | `(params CompactionStrategy[])`，多策略按顺序组合 |

```csharp
using Microsoft.Agents.AI.Compaction;

var strategy = new PipelineCompactionStrategy(
    new ToolResultCompactionStrategy(
        trigger: CompactionTriggers.TokensExceed(20_000),
        minimumPreservedGroups: 2),
    new TruncationCompactionStrategy(
        trigger: CompactionTriggers.TokensExceed(40_000),
        minimumPreservedGroups: 2));

// 作为 AIContextProvider 挂到 Agent 上（每次调用前压缩）
var agent = new ChatClientAgent(chatClient, new ChatClientAgentOptions
{
    Instructions = "你是一个助手",
    AIContextProviders = [new CompactionProvider(strategy)]
});

// 也可以对任意消息列表做一次性压缩（不走 Provider 管道）
var compacted = await CompactionProvider.CompactAsync(strategy, messages);
```

`CompactionProvider(strategy, stateKey?, loggerFactory?)` 的状态存放在 `AgentSession.StateBag`；同一会话要跑多个不同策略的 Agent 时，需给各自显式 `stateKey`。安全提示：`SummarizationCompactionStrategy` 与 `ChatReducerCompactionStrategy` 会用外部 LLM 生成的内容替换历史，存在提示注入风险，需自行评估。

在 HarnessAgent 中压缩默认关闭：只有同时提供 `MaxContextWindowTokens` 与 `MaxOutputTokens`（且未设置 `CompactionStrategy`、未 `DisableCompaction`）才会挂载默认的 `ContextWindowCompactionStrategy`。

## 后台响应（Background Responses）

用于长时间运行的任务，支持 continuation token 续传。

```csharp
// AllowBackgroundResponses 是基类 AgentRunOptions 上的 bool? 属性
// ChatClientAgentRunOptions 构造的 ChatOptions 参数是可选的（不传则用默认值）
var options = new ChatClientAgentRunOptions(new ChatOptions())
{
    AllowBackgroundResponses = true
};

await foreach (var update in agent.RunStreamingAsync(
    "开始一个长时间运行的分析任务",
    options: options))
{
    Console.Write(update.Text);

    // AgentResponseUpdate.ContinuationToken，类型为 ResponseContinuationToken?
    if (update.ContinuationToken is not null)
    {
        // 保存 token
        SaveToken(userId, update.ContinuationToken);
    }
}

// 稍后把 token 放进 AgentRunOptions.ContinuationToken 即可恢复/轮询任务
```

## AgentHooks 拦截协议（实验性）

`Microsoft.Agents.AI.AgentHooks` 包（实验特性，基于 AGENT-HOOKS-0.1 拦截协议）在默认管道之前安装强制拦截层：围绕每一次模型服务调用与工具调用发出拦截点，由注册的拦截器给出 verdict（放行 / 拒绝 / 改写），并严格执行 **verdict-before-durability**——被拒绝的内容永远不会写入持久化历史，改写后的内容以改写后的形态持久化。

### 入口与配置

```csharp
using AgentHooks;                      // IInterceptor、EnforcementMode 等协议类型
using Microsoft.Agents.AI.AgentHooks;  // AsAIAgentWithAgentHooks、AgentHooksOptions

// 至少注册一个拦截器（零拦截器的 emitter 会 fail-closed）
var hooksOptions = new AgentHooksOptions();
hooksOptions.AddInterceptor(new AuditInterceptor(), "audit");
hooksOptions.Mode = EnforcementMode.Enforce;      // 默认强制执行
hooksOptions.Timeout = TimeSpan.FromSeconds(5);   // 单拦截器超时（默认 5s）
hooksOptions.RecordSink = record => Console.WriteLine(record); // 可选：接收全部拦截记录

var agent = chatClient.AsAIAgentWithAgentHooks(hooksOptions);
```

`AgentHooksOptions` 还支持 `Resolver`（可提升拒绝的审批解析器）、`Composition`（组合策略与熔断配置）、`IdentityProvider`（记录身份绑定）。拦截点覆盖三个层面：

- **Agent 层**：`agent_startup` / `input` / `output` / `agent_shutdown`
- **Chat 层**：`pre_model_call` / `post_model_call`（位于函数调用循环之下，每次模型服务调用都被单独包夹）
- **工具层**：`pre_tool_call` / `post_tool_call`（宿主执行的工具；托管工具只在 `post_model_call` 投影中出现）

使用限制：传入的 `IChatClient` 不能已包含 `FunctionInvokingChatClient`（否则工具会在 verdict 之下执行，工厂直接抛异常）；不支持 `UseProvidedChatClientAsIs`；运行期 `ChatClientFactory` 回调同样被拒绝。另有 host-owned 重载（传入自建的 `InterceptionEmitter` + `AgentContextBuilder`），由宿主负责 `agent_startup` / `agent_shutdown` 会话边界。

## AG-UI（Agent UI Protocol）

框架支持 Agent UI 协议，提供前后端实时交互。

### AG-UI 事件类型

| 事件类型 | 说明 |
| --- | --- |
| TextMessageStart/End/Content | 文本消息流 |
| ToolCallStart/End/Result | 工具调用事件 |
| ReasoningStart/End/Content | 推理过程事件 |
| StateSnapshot/Delta | 状态同步事件 |
| RunStarted/Finished/Error | 运行生命周期事件 |

### AG-UI 示例（5 个）

1. 入门指南
2. 后端工具
3. 前端工具
4. 人工介入（Human-in-the-Loop）
5. 状态管理

```xml
<PackageReference Include="Microsoft.Agents.AI.AGUI" Version="1.20.0" />
```

## A2A（Agent-to-Agent 协议）

支持 Agent 间的标准通信协议。

```csharp
using Microsoft.Agents.AI.A2A;

// 创建 A2A Agent
var a2aAgent = new A2AAgent(...);

// 交互模式
// - Message 模式：直接消息传递
// - Task 模式：基于任务的交互，支持轮询完成状态

// 流式支持（SSE）
// 后台响应 + continuation token
// 会话管理（context/task tracking）
```

## Deep Research（深度研究）

v1.9.0 新增深度研究模式。

```csharp
// Deep Research Tool
// - o3-deep-reasoning 模型
// - Bing grounding 搜索
// - 多轮自动搜索和推理
// - 生成研究报告
```

## 动态函数工具（v1.9.0 新增）

运行时动态创建和注册函数工具。

```csharp
// 根据用户输入或配置动态添加工具
// 无需预编译，运行时生成
```

## Per-Service-Call 检查点（v1.9.0 新增）

每次服务调用级别的聊天历史持久化，支持崩溃恢复。

```csharp
ChatClientAgent agent = new ChatClientAgent(
    chatClient,
    new ChatClientAgentOptions
    {
        RequirePerServiceCallChatHistoryPersistence = true
    }
);
```

## Agent 即函数循环（In-Function Loop）

支持在 Azure Functions 中实现 Agent 循环，带检查点支持。
