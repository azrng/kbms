---
title: Agent 提供商
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
  - 提供商
---

# Agent 提供商

框架支持多种 Agent 提供商，通过统一的 `AIAgent` 抽象实现跨提供商切换。

## OpenAI ChatCompletion

```csharp
using OpenAI;
using OpenAI.Chat;              // ChatClient 的 AsAIAgent 扩展定义在 OpenAI.Chat 命名空间
using Microsoft.Agents.AI;

AIAgent agent = new OpenAIClient(apiKey)
    .GetChatClient("gpt-5.4-mini")
    .AsAIAgent(
        instructions: "你是一个助手。",
        name: "MyAgent"
    );
```

`AsAIAgent` 扩展由 `Microsoft.Agents.AI.OpenAI` 包提供，返回统一的 `ChatClientAgent`。

## Azure OpenAI ChatCompletion

```csharp
using Azure.AI.OpenAI;
using Azure.Identity;
using OpenAI.Chat;              // ChatClient 的 AsAIAgent 扩展定义在 OpenAI.Chat 命名空间
using Microsoft.Agents.AI;

AIAgent agent = new AzureOpenAIClient(
    new Uri(endpoint),
    new AzureCliCredential())
    .GetChatClient("gpt-5.4-mini")
    .AsAIAgent(
        instructions: "你是一个助手。",
        name: "MyAgent"
    );
```

## OpenAI Responses API

```csharp
using OpenAI;
using OpenAI.Responses;         // ResponsesClient 的 AsAIAgent 扩展定义在 OpenAI.Responses 命名空间
using Microsoft.Agents.AI;

AIAgent agent = new OpenAIClient(apiKey)
    .GetResponsesClient()
    .AsAIAgent(
        model: "gpt-5.4-mini",  // 直连 OpenAI 时需要指定模型
        instructions: "你是一个助手。",
        name: "MyAgent"
    );
```

注意：`ResponsesClient` 的 `AsAIAgent` 扩展目前仍标记为实验性（诊断号 `OPENAI001`），项目里需要通过 `<NoWarn>OPENAI001</NoWarn>` 或 `#pragma warning disable` 消除提示。

## Azure OpenAI Responses

```csharp
using OpenAI;
using OpenAI.Responses;
using Microsoft.Agents.AI;

AIAgent agent = new AzureOpenAIClient(endpoint, credential)
    .GetResponsesClient()
    .AsAIAgent(
        instructions: "你是一个助手。",
        name: "MyAgent"
    );
```

## OpenAI 原生 SDK 类型

澄清一个常见误解：框架里从来不存在 `OpenAIChatClientAgent` / `OpenAIResponseClientAgent` 这样的公开类型（早期快照中它们只是 samples 里的示例包装类）。OpenAI 原生 SDK 类型的接入方式是 `Microsoft.Agents.AI.OpenAI` 包提供的 `AsAIAgent` 扩展方法——内部先调用 `AsIChatClient()` 把原生客户端转换为 `Microsoft.Extensions.AI` 的 `IChatClient`，再包装为统一的 `ChatClientAgent`：

```csharp
using Microsoft.Agents.AI;       // ChatClientAgent
using Microsoft.Extensions.AI;

// ChatCompletion：ChatClient.AsAIAgent(...) → ChatClientAgent
// 扩展方法位于 OpenAI.Chat 命名空间
ChatClientAgent chatAgent = chatClient.AsAIAgent(
    instructions: "你是一个助手",
    name: "MyAgent");

// Responses：ResponsesClient.AsAIAgent(...) → ChatClientAgent
// 扩展方法位于 OpenAI.Responses 命名空间
ChatClientAgent responseAgent = responsesClient.AsAIAgent(
    model: "gpt-5.4-mini",
    instructions: "你是一个助手",
    name: "MyAgent");
```

两个扩展都提供 `ChatClientAgentOptions` 重载，可进一步配置 `ChatOptions`、会话工厂等。

与具体 SDK 无关的通用写法，是核心包（`Microsoft.Agents.AI`）中 `Microsoft.Extensions.AI` 命名空间的 `ChatClientExtensions.AsAIAgent(this IChatClient, ...)`——任意 `IChatClient`（先用 `.AsIChatClient()` 从原生客户端转换）都可以这样包装：

```csharp
using Microsoft.Agents.AI;       // ChatClientAgent
using Microsoft.Extensions.AI;

ChatClientAgent agent = someNativeClient
    .AsIChatClient()                // 原生客户端 → IChatClient
    .AsAIAgent(instructions: "...", name: "...");
```

## Microsoft Foundry

```csharp
using Azure.AI.Projects;        // AIProjectClient 的 AsAIAgent 扩展定义在 Azure.AI.Projects 命名空间
using Azure.Identity;
using Microsoft.Agents.AI;

// 常用方式：模型 + 指令直接创建（走项目 Responses API，返回 ChatClientAgent）
AIAgent agent = new AIProjectClient(new Uri(endpoint), new DefaultAzureCredential())
    .AsAIAgent(
        model: "gpt-5.4-mini",
        instructions: "你是一个助手。",
        name: "MyAgent"
    );
```

`AIProjectClientExtensions.AsAIAgent` 共 6 个重载：

| 重载参数 | 返回类型 | 说明 |
| --- | --- | --- |
| `(string model, string instructions, ...)` | `ChatClientAgent` | 模型 + 指令直接创建，`instructions` 是必填的位置参数 |
| `(ChatClientAgentOptions?)` | `ChatClientAgent` | 完整选项创建，选项中必须指定 `ModelId` |
| `(AgentReference)` | `FoundryAgent` | 引用服务端已有 Agent（可固定版本） |
| `(Uri agentEndpoint)` | `FoundryAgent` | 通过 Agent 专属 endpoint URL 调用托管 Agent |
| `(ProjectsAgentRecord)` / `(ProjectsAgentVersion)` | `FoundryAgent` | 包装原生 SDK 拿到的服务端 Agent 记录/版本 |

也可以直接 `new FoundryAgent(...)`，两个公开构造函数：

```csharp
// 直连 Responses API 路径
new FoundryAgent(Uri projectEndpoint, AuthenticationTokenProvider credential,
    string model, string instructions, ...);

// 通过 Agent 专属 endpoint 调用已有托管 Agent
new FoundryAgent(Uri agentEndpoint, AuthenticationTokenProvider credential, ...);
```

### Foundry 专属功能

Foundry 的入门示例现共 **16 个步骤**（`GettingStarted/FoundryAgents/`，Step01.1 ~ Step15），覆盖运行基础、多轮对话、函数工具（含审批）、结构化输出、持久会话、可观测性、依赖注入、MCP 工具、图像输入、Agent 作为函数工具、中间件、插件、代码解释器（Code Interpreter，含文件下载）、计算机使用（Computer Use）等场景。

此外 `Microsoft.Agents.AI.Foundry` 包在本版本扩张了不少能力：

- Foundry Memory：`FoundryMemoryProvider`（基于 Foundry 服务端的记忆）
- 托管会话（hosted session）与用户身份（user identity）透传
- Adaptive evals（`Foundry/Evaluation/`）
- `HostedMcpToolboxAITool`（Foundry Toolbox MCP，非托管 Agent 也可使用）
- `FoundryAgent` 扩展方法：`UploadFileAsync` / `CreateVectorStoreAsync` / `ToPromptAgentAsync`
- 底层依赖升级到 Azure.AI.Projects 3.0.0-beta

`Microsoft.Agents.AI.Foundry.Hosting` 同步扩张：

- `FoundryToolboxService` / `FoundryToolboxHealthCheck`：托管工具箱接入与健康检查
- `AgentSessionStore` 会话持久化抽象，内置 Foundry / 文件系统（`FileSystemAgentSessionStore`）/ 内存三种实现
- `HostedSessionContext`：托管环境下的会话隔离
- Foundry Memory provider 注册扩展
- stored-output 兼容探针与健康检查

## Anthropic Claude

```xml
<PackageReference Include="Microsoft.Agents.AI.Anthropic" Version="1.20.0" />
```

```csharp
using Anthropic;                // IAnthropicClient 与 AsAIAgent 扩展位于 Anthropic 命名空间
using Microsoft.Agents.AI;

// 注意：model 是必填的第一个参数
AIAgent agent = anthropicClient.AsAIAgent(
    model: "claude-haiku-4-5",
    instructions: "你是一个助手。",
    name: "MyAgent"
);
```

说明：
- 底层依赖 Anthropic 官方 NuGet 包 `Anthropic`（仓库当前引用 12.43.0）
- `defaultMaxTokens` 默认 4096，可通过参数或静态属性 `AnthropicClientExtensions.DefaultMaxTokens` 调整
- 另有 `AnthropicBetaServiceExtensions` 用于启用 beta 特性

## Azure AI Persistent Agents

集成 Azure AI Agents Persistent 服务，支持跨会话的持久化 Agent 对话。

```xml
<PackageReference Include="Microsoft.Agents.AI.AzureAI.Persistent" Version="1.20.0" />
```

```csharp
using Azure.AI.Agents.Persistent;   // 扩展方法定义在 Azure.AI.Agents.Persistent 命名空间
using Microsoft.Agents.AI;

// 包装服务端已有 Agent（从原生 SDK 响应/元数据转换），返回 ChatClientAgent
ChatClientAgent agent = persistentAgentsClient.AsAIAgent(persistentAgentResponse);

// 按 id 获取服务端已有 Agent
ChatClientAgent existing = await persistentAgentsClient.GetAIAgentAsync(agentId);

// 在服务端创建 Agent 并返回本地包装
ChatClientAgent created = await persistentAgentsClient.CreateAIAgentAsync(
    model: "gpt-5.4-mini",
    name: "MyAgent",
    instructions: "你是一个助手。");
```

注意：该包的这些扩展目前均已标记 `[Obsolete]`，官方建议迁移到最新 Foundry Agents 服务（`Microsoft.Agents.AI.AzureAI` 包）。

## Google Gemini

.NET 侧目前没有官方的 `Microsoft.Agents.AI.*` Gemini 提供商包（官方 provider 仅在 Python 侧提供）。.NET 中使用 Gemini 的方式是借助 `Microsoft.Extensions.AI` 生态的社区集成：安装实现了 `IChatClient` 的 Gemini 客户端库（如 `Google.GenAI`），再通过通用的 `AsAIAgent` 扩展包装：

```xml
<PackageReference Include="Google.GenAI" Version="1.6.0" />
```

```csharp
using Microsoft.Agents.AI;       // ChatClientAgent
using Microsoft.Extensions.AI;

ChatClientAgent agent = geminiChatClient   // 社区集成提供的 IChatClient
    .AsAIAgent(instructions: "你是一个助手。", name: "MyAgent");
```

## Ollama（本地模型）

.NET 侧没有官方 `Microsoft.Agents.AI.*` Ollama 包。通过 `Microsoft.Extensions.AI` 生态的社区集成（如 Ollama 的 `IChatClient` 适配实现，例如 OllamaSharp）接入本地模型，再包装为 Agent 即可，用法与上面相同。

## ONNX Runtime

.NET 侧同样没有官方 `Microsoft.Agents.AI.*` ONNX 包。可通过 `Microsoft.Extensions.AI` 生态的社区集成进行本地推理，包装方式与上面相同。

## GitHub Copilot

已从实验性/RC 转正为 stable，底层 SDK 迁移到官方 `GitHub.Copilot.SDK` 包（v1.0.0+）。

```csharp
using GitHub.Copilot;           // CopilotClient 与 AsAIAgent 扩展位于 GitHub.Copilot 命名空间
using Microsoft.Agents.AI;

// 创建并启动 Copilot 客户端
await using CopilotClient copilotClient = new();
await copilotClient.StartAsync();

// 通过扩展方法创建 Agent（返回 AIAgent）
AIAgent agent = copilotClient.AsAIAgent(
    ownsClient: true,           // Agent 负责释放客户端
    name: "MyAgent");
```

`AsAIAgent` 完整签名为 `(SessionConfig? sessionConfig = null, bool ownsClient = false, string? id = null, string? name = null, string? description = null)`。通过 `SessionConfig` 可以配置权限审批回调（`OnPermissionRequest`）、会话模型等行为。

## Copilot Studio

```csharp
using Microsoft.Agents.AI.CopilotStudio;
using Microsoft.Agents.CopilotStudio.Client;

// 直接实例化，没有 AsAIAgent 扩展
var agent = new CopilotStudioAgent(copilotClient);

// 可通过 conversationId 继续已有会话
var session = await agent.CreateSessionAsync(conversationId);
```

依赖 `Microsoft.Agents.CopilotStudio.Client` 包提供的 `CopilotClient`。

## A2A（Agent-to-Agent 协议）

依赖 A2A 官方 NuGet SDK（`A2A` 包），推荐通过扩展方法创建：

```csharp
using A2A;                      // AsAIAgent 扩展位于 A2A 命名空间
using Microsoft.Agents.AI.A2A;  // A2AAgent 位于 Microsoft.Agents.AI.A2A 命名空间

// 推荐：扩展方法
AIAgent agent = a2aClient.AsAIAgent(
    id: "my-agent",
    name: "MyAgent",
    description: "远程 A2A Agent");

// 或直接构造
A2AAgent agent2 = new A2AAgent(a2aClient, id: "...", name: "...", description: "...");
// 也支持选项对象：new A2AAgent(a2aClient, new A2AAgentOptions { ... });
```

A2A 支持两种交互模式：
- **Message 模式**：直接消息传递
- **Task 模式**：基于任务的交互，支持轮询完成状态

## HarnessAgent（一站式 Agent）

已从实验性转正（无 `Experimental` 标记）。预配置的完整 Agent 管道，自动组装：
- `FunctionInvokingChatClient`（自动函数调用）
- `MessageInjectingChatClient`（运行中消息注入）
- `PerServiceCallChatHistoryPersistingChatClient`（每次调用持久化）
- `CompactionProvider`（上下文窗口压缩，默认关闭）
- `ToolApprovalAgent`（工具审批规则）
- `OpenTelemetryAgent`（遥测）
- `LoopAgent`（循环执行，仅在提供 `LoopEvaluators` 时启用）
- 内置 `HostedWebSearchTool`（Web 搜索）

```xml
<PackageReference Include="Microsoft.Agents.AI.Harness" Version="1.20.0" />
```

```csharp
using Microsoft.Agents.AI;        // HarnessAgentOptions
using Microsoft.Extensions.AI;    // AsHarnessAgent 扩展

// 通过扩展方法创建，token 上限已移入 HarnessAgentOptions
var agent = chatClient.AsHarnessAgent(new HarnessAgentOptions
{
    Name = "MyAgent",
    ChatOptions = new ChatOptions
    {
        Instructions = "你是一个全能助手"
    },
    MaxContextWindowTokens = 1_050_000,
    MaxOutputTokens = 128_000
});
```

要点：
- `AsHarnessAgent` 签名为 `(this IChatClient, HarnessAgentOptions? options = null, ILoggerFactory?, IServiceProvider?)`
- 压缩默认关闭：仅当 `MaxContextWindowTokens` 与 `MaxOutputTokens` 同时提供（或显式指定 `CompactionStrategy`）时启用，也可用 `DisableCompaction` 强制关闭
- `HarnessAgentOptions` 新增大量配置：`HarnessInstructions`、`DisableToolAutoApproval`、`ToolApprovalAgentOptions`、`DisableApprovalResponseBinding`、`DisableFileMemory`、`FileMemoryStore`、`LoopEvaluators`、`LoopAgentOptions`、`MaximumIterationsPerRequest`、`BackgroundAgents` 等
- 集成 `LoopAgent` 与循环评估器（如 `TodoCompletionLoopEvaluator`），Agent 会反复执行直到评估器满足条件
- 文件访问改为 opt-in：设置 `FileAccessStore` 才会启用 `FileAccessProvider`

内置上下文提供者：
- `TodoProvider` — 待办事项管理
- `AgentModeProvider` — 计划/执行模式切换
- `FileMemoryProvider` — 基于文件的会话记忆
- `FileAccessProvider` — 共享文件访问（opt-in，需设置 `FileAccessStore`）
- `AgentSkillsProvider` — 技能发现和加载

## 自定义实现

实现 `AIAgent` 抽象类创建自定义 Agent：

```csharp
using Microsoft.Agents.AI.Abstractions;

public class MyCustomAgent : AIAgent
{
    public override async Task<AgentResponse> RunAsync(
        string message,
        AgentSession? session = null,
        AgentRunOptions? options = null,
        CancellationToken cancellationToken = default)
    {
        // 自定义实现逻辑
    }

    // ... 其他抽象方法
}
```

## 切换提供商

切换提供商只需替换 ChatClient 创建方式，其余代码不变：

```csharp
// OpenAI
var chatClient = new OpenAIClient(apiKey).GetChatClient(model);

// Azure OpenAI
var chatClient = new AzureOpenAIClient(endpoint, credential).GetChatClient(deployment);

// 以下代码完全相同
AIAgent agent = chatClient.AsAIAgent(instructions: "...", name: "...");
var response = await agent.RunAsync("Hello");
```

## 提供商包一览

| 包名 | 提供商 |
| --- | --- |
| `Microsoft.Agents.AI.OpenAI` | OpenAI ChatCompletion + Responses |
| `Microsoft.Agents.AI.Foundry` | Microsoft Foundry |
| `Microsoft.Agents.AI.Foundry.Hosting` | Foundry 托管工具箱 |
| `Microsoft.Agents.AI.Anthropic` | Anthropic Claude |
| `Microsoft.Agents.AI.AzureAI.Persistent` | Azure AI Persistent Agents |
| `Microsoft.Agents.AI.A2A` | A2A 协议 |
| `Microsoft.Agents.AI.CopilotStudio` | Copilot Studio |
| `Microsoft.Agents.AI.GitHub.Copilot` | GitHub Copilot |
| `Microsoft.Agents.AI.Harness` | 一站式预配置 Agent |
| `Microsoft.Agents.AI.Hyperlight` | Hyperlight 沙箱代码执行 |
