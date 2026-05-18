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

框架 v1.6.1 技能系统支持多种定义方式。

### 文件型技能（File-based Skills）

通过目录结构定义技能，包含资源和脚本。

```csharp
using Microsoft.Agents.AI;

// 从文件系统加载技能
var skillSource = new AgentFileSkillsSource(new AgentFileSkillsSourceOptions
{
    Directory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "skills")
});
```

### 代码定义技能（Code-defined Skills）

在代码中直接定义技能。

```csharp
// 通过代码创建技能
```

### 类型技能（Class-based Skills）

使用属性标注定义技能资源和脚本。

```csharp
using Microsoft.Agents.AI;

public class MySkill
{
    [AgentSkillResource("prompt.md")]
    public string GetPrompt() => "你是一个专家...";

    [AgentSkillScript("analyze")]
    public async Task<string> Analyze(string input)
    {
        return $"分析结果: {input}";
    }
}
```

### 混合技能

组合多种技能定义方式。

### 技能与 DI

技能系统支持依赖注入。

```csharp
// 在 DI 容器中注册技能
builder.Services.AddAgentSkill<MySkill>();
```

## 声明式定义（Declarative）

通过 YAML 文件定义 Agent 和工作流，无需编译。

```xml
<PackageReference Include="Microsoft.Agents.AI.Declarative" Version="1.6.1" />
<PackageReference Include="Microsoft.Agents.AI.Workflows.Declarative" Version="1.6.1" />
```

### 声明式 Agent

```yaml
# agent.yaml
name: MyAgent
instructions: 你是一个专业的助手
model: gpt-4o-mini
```

```csharp
using Microsoft.Agents.AI.Declarative;

var factory = new PromptAgentFactory();
var agent = await factory.CreateAsync("agent.yaml");
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
<PackageReference Include="Microsoft.Agents.AI.Workflows.Generators" Version="1.6.1" />
```

### Foundry 声明式（v1.6.1 新增）

```xml
<PackageReference Include="Microsoft.Agents.AI.Workflows.Declarative.Foundry" Version="1.6.1" />
```

```csharp
// Foundry 声明式工作流
// AzureAgentProvider：基于 Foundry 的 Agent 预配
```

## Hyperlight 沙箱执行（v1.6.1 新增）

通过 Hyperlight 实现 VM 级隔离的安全代码执行。

```xml
<PackageReference Include="Microsoft.Agents.AI.Hyperlight" Version="1.6.1" />
```

### 特性

- **沙箱 Python 解释器**：在隔离 VM 中执行 Python 代码
- **工具编排**：Guest 代码可通过 `call_tool(...)` 调用宿主工具
- **快照/恢复**：每次运行干净状态
- **安全控制**：可选文件系统挂载、网络白名单
- **审批模式**：`NeverRequire` / `AlwaysRequire`

### 3 步示例

1. 基础 Python 解释器
2. 工具编排 CodeAct
3. 手动注册 `HyperlightExecuteCodeFunction`

详见 [函数工具 - CodeAct 模式](functionTools.md#codeact-模式沙箱代码执行)

## HarnessAgent（v1.6.1 新增）

一站式预配置 Agent，自动组装完整管道。

```xml
<PackageReference Include="Microsoft.Agents.AI.Harness" Version="1.6.1" />
```

### 管道组成

```
HarnessAgent
├── FunctionInvokingChatClient    # 自动函数调用
├── MessageInjectingChatClient    # 运行中消息注入
├── PerServiceCallChatHistoryPersistingChatClient  # 每次调用持久化
├── CompactionProvider            # 上下文窗口压缩
├── ToolApprovalAgent            # 工具审批规则
├── OpenTelemetryAgent           # 遥测
└── HostedWebSearchTool          # 内置 Web 搜索
```

### 内置上下文提供者

| 提供者 | 说明 |
| --- | --- |
| `TodoProvider` | 待办事项管理 |
| `AgentModeProvider` | 计划/执行模式切换 |
| `FileMemoryProvider` | 基于文件的会话记忆 |
| `FileAccessProvider` | 共享文件访问（如 CSV 数据处理） |
| `AgentSkillsProvider` | 技能发现和加载 |
| `SubAgentsProvider` | 子 Agent 委派 |

### 使用示例

```csharp
using Microsoft.Agents.AI.Harness;

var agent = HarnessAgent.Create(chatClient, options =>
{
    options.Name = "MyAgent";
    options.Instructions = "你是一个全能助手";
});

await foreach (var update in agent.RunStreamingAsync("帮我分析这份数据"))
{
    Console.Write(update.Text);
}
```

## Managed Agent 模式（v1.6.1 新增）

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

## 评估框架（v1.6.1 新增）

框架新增完整的评估体系，支持多种评估方式。

### 质量评估器

使用 Microsoft.Extensions.AI.Evaluation 的内置评估器：

```csharp
// Relevance（相关性）
// Coherence（连贯性）
// Fluency（流畅性）
```

### 自定义评估

```csharp
// 领域特定的自定义评估检查
// 如：合规性检查、安全评估、格式验证
```

### 预期输出评估

```csharp
// 与 Ground Truth 对比
// 自动评分和差异分析
```

### 多模态评估

```csharp
// 图片、文件等多模态内容的评估
```

### 对话分割评估

```csharp
// 多轮对话的不同分割策略
// LastTurn / Full / PerTurnItems
```

### Red Teaming（对抗测试）

```csharp
// 系统性对抗测试
// 安全性和合规性验证
```

详见 [评估与可观测性](evaluationAndObservability.md)

## 压缩管道（Compaction Pipeline）

管理长对话的 token 消耗，支持多种压缩策略。

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
// 多策略组合使用
```

## 后台响应（Background Responses）

用于长时间运行的任务，支持 continuation token 续传。

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

    if (update.ContinuationToken is not null)
    {
        // 保存 token
        SaveToken(userId, update.ContinuationToken);
    }
}

// 稍后使用 continuation token 恢复
```

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
<PackageReference Include="Microsoft.Agents.AI.AGUI" Version="1.6.1" />
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

v1.6.1 新增深度研究模式。

```csharp
// Deep Research Tool
// - o3-deep-reasoning 模型
// - Bing grounding 搜索
// - 多轮自动搜索和推理
// - 生成研究报告
```

## 动态函数工具（v1.6.1 新增）

运行时动态创建和注册函数工具。

```csharp
// 根据用户输入或配置动态添加工具
// 无需预编译，运行时生成
```

## Per-Service-Call 检查点（v1.6.1 新增）

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
