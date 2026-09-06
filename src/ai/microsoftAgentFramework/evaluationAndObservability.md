---
title: 评估与可观测性
lang: zh-CN
date: 2025-05-18
publish: true
author: azrng
isOriginal: true
category:
  - ai
  - agent
tag:
  - Agent
  - Microsoft
  - 评估
  - OpenTelemetry
  - 可观测性
---

# 评估与可观测性

## 评估框架

完整的评估体系，对 Agent 和工作流进行自动化质量评估。主 API 位于 `Microsoft.Agents.AI` 命名空间：`IAgentEvaluator`（评估器接口）、`LocalEvaluator`（本地确定性评估）、`EvalChecks.KeywordCheck`/`ToolCalledCheck` 等检查、`AgentEvaluationExtensions.EvaluateAsync` 扩展；`Microsoft.Extensions.AI.Evaluation` 仅通过内部适配器（MeaiEvaluatorAdapter）桥接，业务代码一般无需直接依赖。

### 质量评估器

Foundry 内置评估器（常量定义在 `Microsoft.Agents.AI.Foundry` 的 `FoundryEvals` 中）覆盖质量、Agent 行为、工具使用和安全四大类，默认组合为 relevance、coherence、task_adherence：

| 类别 | 评估器 | 说明 |
| --- | --- | --- |
| 质量 | Relevance | 回答与问题的相关性 |
| 质量 | Coherence | 回答的连贯性和逻辑性 |
| 质量 | Fluency | 语言流畅性 |
| 质量 | Groundedness | 回答是否忠于给定上下文 |
| 质量 | ResponseCompleteness | 回答完整度 |
| 质量 | Similarity | 与预期输出的相似度 |
| Agent 行为 | IntentResolution | 用户意图解析是否正确 |
| Agent 行为 | TaskAdherence | 是否遵循任务指令 |
| Agent 行为 | TaskCompletion | 是否完成任务 |
| 工具使用 | ToolCallAccuracy | 工具调用准确性 |
| 工具使用 | ToolSelection / ToolInputAccuracy / ToolOutputUtilization / ToolCallSuccess | 工具选择、入参、输出利用与调用成功率 |
| 安全 | Violence / SelfHarm / Sexual / HateUnfairness | 暴力、自残、性内容、仇恨与不公平内容检测 |

```csharp
// 使用 Foundry 质量评估器（云端 LLM 评分，结果带 Foundry 门户报告链接）
var evals = new FoundryEvals(projectClient, modelDeploymentName,
    FoundryEvals.Relevance, FoundryEvals.Coherence, FoundryEvals.TaskAdherence);
var results = await evals.EvaluateAsync(items);
results.AssertAllPassed();
```

### 自定义评估

用 `LocalEvaluator` 组合内置检查，实现确定性的领域特定评估（无 LLM 参与）：

```csharp
// 本地评估器：关键词检查 + 工具调用检查
var evaluator = new LocalEvaluator(
    EvalChecks.KeywordCheck("退款"),
    EvalChecks.ToolCalledCheck("process_refund"));

var results = await evaluator.EvaluateAsync(items);
```

也可以实现 `IAgentEvaluator` 接口编写完全自定义的评估逻辑（如：合规性检查、格式验证、安全评估）。

### Foundry Adaptive Evals（自适应/rubric 评估）

v1.20 起支持 Foundry 自适应评估：在 Foundry 门户（或其 SDK）中生成 rubric 评估器后，.NET 侧通过 `GeneratedEvaluatorRef` 按名称引用即可打分，框架本身不创建或修改评估器定义：

```csharp
// 引用 Foundry 中已注册的 rubric 评估器（建议固定版本保证评估可复现）
var evals = new FoundryEvals(projectClient, modelDeploymentName,
    GeneratedEvaluatorRef.Latest("reservation-policy-rubric"));

var results = await evals.EvaluateAsync(items, evalName: "预订政策合规评估");

// CI 断言辅助（AgentEvaluationResults 新增）
results.AssertScoreAtLeast(0.80);                    // 每个评估器分数不低于阈值
results.AssertDimensionScoreAtLeast("accuracy", 4);  // 指定 rubric 维度分数下限
results.AssertNoFailedItems();                       // 无失败/出错项
```

rubric 评估器按维度返回 `RubricScore`（维度 ID、1-5 分、是否适用、权重、理由），附加在 `EvalScoreResult.Dimensions` 上；非 rubric 评估器该属性为 `null`。相关类型位于 `Microsoft.Agents.AI.Evaluation`（如 `RubricScore.cs`、`GeneratedEvaluatorRef.cs`）与 `Microsoft.Agents.AI.Foundry.Evaluation`（`FoundryEvals.cs`）。

### 预期输出评估

与 Ground Truth（标准答案）对比，自动评分：

```csharp
// 提供预期输出
// 自动对比并计算匹配度
// 生成差异分析报告
```

### 多模态评估

评估图片、文件等多模态内容的质量：

```csharp
// 图片描述准确性
// 文件内容理解度
// 多模态输出的综合评分
```

### 对话分割评估

多轮对话评估时，内置分割策略只有两种（`ConversationSplitters`）：

| 策略 | 说明 |
| --- | --- |
| LastTurn | 以最后一条用户消息为界，之前为查询、之后为响应（默认策略） |
| Full | 以第一条用户消息为界，评估完整对话轨迹 |

逐轮评估不是分割策略，而是通过 `EvalItem.PerTurnItems(...)` 静态工厂把多轮对话拆成多个 `EvalItem`（每个用户消息开启新一轮，查询包含截至该消息的完整上下文）；也可以实现 `IConversationSplitter` 接口定义自定义分割逻辑。

```csharp
// 选择不同的分割策略
// 对比不同策略下的评估结果
// 多轮对话逐轮评估：EvalItem.PerTurnItems(conversation)
```

### 多提供者评估

组合本地和云端评估器：

```csharp
// 本地评估器 + 云端评估器
// 单次调用中同时使用多种评估器
// 综合多个评估维度的结果
```

`FoundryEvals` 的评估器参数支持混用内置评估器名称和 `GeneratedEvaluatorRef`（rubric 评估器引用），本地 `LocalEvaluator` 与云端 `FoundryEvals` 均实现同一 `IAgentEvaluator` 接口。

### Red Teaming（对抗测试）

注意：.NET SDK 侧（dotnet/src）当前不提供内置的 red-team API，系统性对抗测试能力目前只在 Python 侧提供（自动生成对抗性输入、越狱抵抗测试、有害内容过滤验证等），也可参考案例仓库（如 FoundryLocalPipeline 的 Red Teaming 安全评估）。

.NET 侧可组合安全类评估器做基础的安全验证：

```csharp
// 组合 Foundry 安全类评估器
var evals = new FoundryEvals(projectClient, modelDeploymentName,
    FoundryEvals.Violence, FoundryEvals.HateUnfairness, FoundryEvals.SelfHarm, FoundryEvals.Sexual);
// 复杂的自动对抗输入生成与越狱测试，当前需使用 Python 侧工具
```

### 工作流评估

针对多 Agent 工作流的评估：

```csharp
// 每个独立 Agent 的评估
// 端到端工作流结果评估
// 与预期工作流输出对比
```

## OpenTelemetry 集成

### 启用遥测

```csharp
using Microsoft.Agents.AI;

// 通过 AIAgentBuilder
var agent = chatClientAgent.AsBuilder()
    .UseOpenTelemetry()
    .Build();

// 通过 DI 管道
builder.Services.AddChatClient(chatClient)
    .UseOpenTelemetry();
```

### 分布式追踪

```csharp
// 自动记录 Agent 调用链
// 跨服务追踪
// 函数调用耗时分析
// 工具调用发出独立的 execute_tool span
```

OpenTelemetry 集成现已位于 `FunctionInvokingChatClient` 之下，因此工具调用会发出独立的 `execute_tool` span，与 Agent span 同属 `Experimental.Microsoft.Agents.AI` 这个 ActivitySource，可在分布式追踪中完整看到"Agent → 模型 → 工具"调用链。

### 指标收集

```csharp
// Token 使用量
// 请求延迟
// 工具调用频率
// 错误率
```

## .NET Aspire Dashboard

本地开发环境实时查看遥测数据。

### 启动方式

```powershell
# 使用 PowerShell 脚本自动启动
.\start-demo.ps1

# Docker 部署 Aspire Dashboard
docker run -d -p 18888:18888 ...aspire-dashboard
```

### 功能

- 实时追踪查看
- 指标可视化
- 日志聚合
- Agent 调用链分析

## Grafana 仪表盘

生产环境监控 Agent 和工作流。

### 预置面板

| 面板 | 说明 |
| --- | --- |
| Agent Overview | Agent 调用概览 |
| Workflow Overview | 工作流执行概览 |
| Token Usage | Token 使用趋势 |
| Error Rate | 错误率监控 |

## Application Insights

Azure 生产环境监控。

```csharp
// 自动集成 Azure Monitor
// Application Insights 遥测收集
// 生产环境追踪、指标和日志
```

## DevUI（开发调试界面）

交互式 Web 调试界面，实时可视化 Agent 执行过程。

```xml
<PackageReference Include="Microsoft.Agents.AI.DevUI" Version="1.20.0" />
```

### 独立使用

```csharp
// 启动 DevUI Web 界面
// 实时查看 Agent 执行
// 调试工具调用
```

### Aspire 集成

```xml
<PackageReference Include="Aspire.Hosting.AgentFramework.DevUI" Version="1.20.0" />
```

```csharp
var builder = DistributedApplication.CreateBuilder(args);

// 注册 Agent 服务项目
var writerAgent = builder.AddProject<Projects.WriterAgent>("writer-agent");
var editorAgent = builder.AddProject<Projects.EditorAgent>("editor-agent");

// WithAgentService 是 IResourceBuilder<DevUIResource> 的扩展方法，
// 必须链在 AddDevUI 之后；agents 可选，缺省时默认以服务资源名单个 Agent 声明
builder.AddDevUI("devui")
    .WithAgentService(writerAgent, agents: [new AgentEntityInfo("writer", "Writes short stories")])
    .WithAgentService(editorAgent, agents: [new AgentEntityInfo("editor", "Edits and formats stories")])
    .WaitFor(writerAgent)
    .WaitFor(editorAgent);
```

### 功能

- 自动发现注册的 Agent
- 实时可视化 Agent 执行过程
- 工具调用追踪
- 多 Agent 统一调试界面
- Microsoft Foundry 集成

## 可观测性架构

```
Agent/Workflow 执行
    ↓
OpenTelemetry 自动收集
    ├── 追踪（Traces）
    ├── 指标（Metrics）
    └── 日志（Logs）
    ↓
导出到多种后端
    ├── Aspire Dashboard（开发环境）
    ├── Grafana（自建监控）
    ├── Application Insights（Azure 生产）
    └── OTLP 兼容后端
```
