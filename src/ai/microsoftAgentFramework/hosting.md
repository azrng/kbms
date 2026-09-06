---
title: 托管部署
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
  - 部署
  - Azure Functions
---

# 托管部署

框架提供多种部署方式：ASP.NET Core 自托管、OpenAI 兼容 API 端点、A2A/AG-UI 协议端点、Foundry 托管、M365 Agent 生产部署等。Azure Functions（Durable Task）集成已迁出到独立扩展仓库（见下文）。

> 本文基于 2026-09 源码快照 `2c49f50cf`（包版本 1.20.0）整理。

## 核心托管包

| 包 | 说明 |
| --- | --- |
| `Microsoft.Agents.AI.Hosting` | 核心托管基础设施：`AddAIAgent`/`AddWorkflow` 注册、`AgentSessionStore` 抽象、会话隔离体系 |
| `Microsoft.Agents.AI.Hosting.AspNetCore` | ASP.NET Core 托管支持：基于声明的隔离 key 提供方（`UseClaimsBasedAgentIsolation`） |
| `Microsoft.Agents.AI.Hosting.AzureStorage` | Azure Blob 会话持久化（1.20 新增，2026-08-20） |
| `Microsoft.Agents.AI.Hosting.A2A` | A2A 协议托管（A2AServer 注册） |
| `Microsoft.Agents.AI.Hosting.A2A.AspNetCore` | ASP.NET Core A2A 端点（MapA2AJsonRpc/MapA2AHttpJson） |
| `Microsoft.Agents.AI.Hosting.AGUI.AspNetCore` | ASP.NET Core AG-UI SSE 端点（客户端包 `Microsoft.Agents.AI.AGUI` 已删除，协议移交官方 AG-UI C# SDK） |
| `Microsoft.Agents.AI.Hosting.OpenAI` | OpenAI 兼容 API 托管 |
| `Microsoft.Agents.AI.Foundry.Hosting` | Foundry 托管（实验性，`MAAI001`） |
| `Aspire.Hosting.AgentFramework.DevUI` | Aspire DevUI 集成 |
| `Microsoft.Agents.AI.Valkey` | Valkey 聊天历史持久化（基于 IConnectionMultiplexer；目前仅聊天历史，无独立检索 provider） |
| `Microsoft.Agents.AI.DurableTask` / `Microsoft.Agents.AI.Hosting.AzureFunctions` | Azure Functions / Durable Task 集成（已迁出主仓库，见下文） |

## 注册托管 Agent（AddAIAgent）

托管注册 API 是 `AddAIAgent`（`IHostApplicationBuilder`/`IServiceCollection` 扩展），instructions 和 chat client 都是方法参数，返回 `IHostedAgentBuilder` 供继续配置；不存在 `.WithInstructions().WithName()` 这类链式 API。

```csharp
using Microsoft.Agents.AI.Hosting;

// 方式一：仅名称 + 指令，chat client 从 DI 解析（要求已注册 IChatClient）
builder.AddAIAgent("my-agent", "你是一个助手");

// 方式二：直接传入 IChatClient
IHostedAgentBuilder agentBuilder = builder.AddAIAgent("MyAgent", "你是一个助手", chatClient);

// 方式三：通过 keyed service 指定 chat client
builder.AddAIAgent("MyAgent", "你是一个助手", chatClientServiceKey: "fast-model");

// 方式四：工厂委托自行构造 AIAgent（agent.Name 必须与注册名一致）
builder.AddAIAgent("MyAgent", (sp, name) =>
    new ChatClientAgent(sp.GetRequiredService<IChatClient>(), name: name));
```

所有重载都带可选参数 `ServiceLifetime lifetime = ServiceLifetime.Singleton`。`IHostedAgentBuilder` 暴露 `Name`、`ServiceCollection`、`Lifetime`，可在其上继续调用：

```csharp
builder.AddAIAgent("weather", "天气助手", chatClient)
    .WithAITool(AIFunctionFactory.Create(GetWeather))       // 添加单个 AI 工具
    .WithAITools(tool1, tool2)                              // 或批量添加
    .WithInMemorySessionStore();                            // 配置会话存储（见下节）
```

## 会话存储与隔离

### AgentSessionStore 抽象

`Microsoft.Agents.AI.Hosting` 提供会话持久化抽象 `AgentSessionStore`，三个核心方法：

```csharp
public abstract class AgentSessionStore
{
    public abstract ValueTask SaveSessionAsync(AIAgent agent, string sessionStoreId, AgentSession session, CancellationToken cancellationToken = default);
    public abstract ValueTask<AgentSession> GetSessionAsync(AIAgent agent, string sessionStoreId, CancellationToken cancellationToken = default);
    public abstract ValueTask DeleteSessionAsync(AIAgent agent, string sessionStoreId, CancellationToken cancellationToken = default);
}
```

内置实现：

- `NoopAgentSessionStore`：空实现，会话不持久化（A2A/AG-UI 托管端点未注册存储时的默认值）
- `DelegatingAgentSessionStore`：装饰器基类
- `IsolationKeyScopedAgentSessionStore`：隔离包装器（见下）
- `InMemoryAgentSessionStore`：内存存储
- `AzureBlobAgentSessionStore`（`Microsoft.Agents.AI.Hosting.AzureStorage`）：Blob 持久化

注意接口的信任模型：`sessionStoreId` 通常来自网络（如 AG-UI 的 `ThreadId`、A2A 的 `contextId`），它是**链恢复标识而不是授权凭证**，`(agent, sessionStoreId)` 元组本身不含用户维度——任何知道或猜到他人 id 的调用者都能恢复对方的会话。

### 配置会话存储

```csharp
// 内存存储，默认会包一层隔离（withIsolation: true）
agentBuilder.WithInMemorySessionStore();

// 自定义实现：传入实例或工厂
agentBuilder.WithSessionStore(myStore, withIsolation: true);
agentBuilder.WithSessionStore((sp, agentName) => new MyStore(), ServiceLifetime.Singleton, withIsolation: true);
```

### 多用户部署必须配置会话隔离

`AgentIsolationKeyProvider` 负责把"当前调用者身份"合成进存储键，`IsolationKeyScopedAgentSessionStore` 据此改写 `sessionStoreId`。`Microsoft.Agents.AI.Hosting.AspNetCore` 提供基于声明的实现：

```csharp
builder.Services.AddHttpContextAccessor();          // 前置要求
builder.Services.UseClaimsBasedAgentIsolation();    // 默认取 ClaimTypes.NameIdentifier（可用 options.ClaimType 覆盖）
```

未注册隔离提供方时，存储退化为单一命名空间——只适合单用户/原型场景。A2A 侧注册 `AgentIsolationKeyProvider` 后，session store 和 task store 都会自动套上租户隔离（`IsolationKeyScopedTaskStore`）。

### Azure Blob 会话持久化（1.20 新增）

```xml
<PackageReference Include="Microsoft.Agents.AI.Hosting.AzureStorage" Version="1.20.0" />
```

```csharp
// 传入容器客户端
agentBuilder.WithAzureBlobSessionStore(
    new BlobContainerClient(connectionString, "agent-sessions"),
    withIsolation: true);

// 或工厂重载：WithAzureBlobSessionStore((sp, agentName) => ..., options, lifetime, withIsolation)
```

## 托管工作流（AddWorkflow）

`AddHostedWorkflow` 不存在，实际 API 是 `AddWorkflow`：工作流由工厂委托构造，框架校验返回的 `Workflow.Name` 与注册名一致（不一致抛 `InvalidOperationException`）。返回的 `IHostedWorkflowBuilder` 仅用于进一步配置，没有 AddExecutor/AddEdge 链。

```csharp
using Microsoft.Agents.AI.Hosting;
using Microsoft.Agents.AI.Workflows;

builder.AddWorkflow("review-workflow", (sp, key) =>
{
    var assistant = sp.GetRequiredKeyedService<AIAgent>("assistant");
    var reviewer = sp.GetRequiredKeyedService<AIAgent>("reviewer");
    return AgentWorkflowBuilder.BuildSequential(workflowName: key, agents: [assistant, reviewer]);
});
```

需要把工作流当作 Agent 暴露时，用 `AddAsAIAgent()`（返回 `IHostedAgentBuilder`，可再挂协议端点）：

```csharp
builder.AddWorkflow("review-workflow", (sp, key) => ...)
    .AddAsAIAgent();
```

## Azure Functions / Durable Task（已迁出主仓库）

2026-08 起，`Microsoft.Agents.AI.DurableTask` 与 `Microsoft.Agents.AI.Hosting.AzureFunctions` 已整体迁出到独立仓库 [microsoft/agent-framework-durable-extension](https://github.com/microsoft/agent-framework-durable-extension)（主仓库 `dotnet/src/` 下仅剩空壳目录）。`DurableAIAgent` 等类型的文档和 NuGet 包请到该仓库获取。

主仓库保留的 Azure Functions 示例主题（`dotnet/samples/AzureFunctions/`）：

1. 单个 Agent
2. 编排-链式
3. 编排-并发
4. 编排-条件
5. 人工介入（HITL）
6. 长时间运行工具
7. Agent 即 MCP 工具

（`08_ReliableStreaming` 已随集成一并迁出；`04-hosting/DurableAgents`、`04-hosting/DurableWorkflows` 目录也只剩指向新仓库的 README。）

## Foundry 托管

```xml
<PackageReference Include="Microsoft.Agents.AI.Foundry.Hosting" Version="1.20.0" />
```

`Microsoft.Agents.AI.Foundry.Hosting`（实验性 `MAAI001`）核心 API（`FoundryHostingExtensions`）：

- `AddFoundryResponses(...)`：注册 Responses 协议服务，可传 `AIAgent` + `AgentSessionStore` + `FoundryResponsesOptions` 配置
- `AddFoundryToolboxes(TokenCredential credential, ...)`：连接 Foundry 工具箱 MCP 代理，**强制显式传入 TokenCredential**（不再从 DI 解析）
- `MapFoundryResponses(prefix)`：映射端点

会话存储有三种：`InMemoryAgentSessionStore`、`FileSystemAgentSessionStore` 与默认的 `FoundryAgentSessionStore`（Foundry durable state；本地回退到 AgentServer SDK 状态存储）。协议层已迁移到 Azure.AI.AgentServer 2.0.0。

近期新能力：

- **Resilient 长时运行后台响应**：`FoundryResponsesOptions.ResilientBackground`，后台响应可跨进程重启恢复
- Steerable hosted agents、hosted agent 状态持久化
- 工具箱 OAuth consent（按会话征得用户同意后调用工具）
- `HostedSessionContext`、健康检查（工具箱/存储输出/工作流检查点）

端到端示例：`dotnet/samples/04-hosting/FoundryHostedAgents/`（responses / invocations 两组）。

```csharp
using Microsoft.Agents.AI.Foundry.Hosting;

builder.Services.AddFoundryResponses(agent, configure: o => o.ResilientBackground = true);
builder.Services.AddFoundryToolboxes(credential, "my-toolbox");

var app = builder.Build();
app.MapFoundryResponses();
```

## M365 Agent

集成 Microsoft 365 Agents SDK，将 Agent 部署到 Teams 和 Copilot。

```csharp
// M365 Agent 示例
// - ASP.NET Core 托管
// - Adaptive Cards 响应
// - 多轮对话
// - Azure Bot 部署 + devtunnels
// - Agents Playground 集成
```

M365 Agent 特性：

- Teams 频道集成
- Copilot 扩展
- Adaptive Cards 富交互
- devtunnels 本地调试
- Agents Playground 测试

端到端示例：`dotnet/samples/05-end-to-end/M365Agent/`。

## OAuth 授权

基于 OAuth 2.0 scope 的 Agent 和工具级授权。

```csharp
// AspNetAgentAuthorization 示例
// - 端点级授权（agent.chat scope）
// - 工具级授权（expenses.view, expenses.approve scope）
// - Keycloak 集成（可替换为 Microsoft Entra ID）
// - Docker Compose 一键部署
```

架构：

```
WebClient → AgentService (OAuth protected) → AI Model
                ↓
         Keycloak / Entra ID (认证服务)
```

支持场景：

- 端点级授权：只有持有 `agent.chat` scope 的用户可访问
- 工具级授权：查看费用只需 `expenses.view`，审批需要 `expenses.approve`

端到端示例：`dotnet/samples/05-end-to-end/AspNetAgentAuthorization/`。

## A2A 托管

不存在 `AddA2AEndpoints()`。当前是"先注册 A2AServer，再映射端点"两步，且相关 API 带 `Experimental(MEAI001)` 标注（与 MEAI 实验 API 共用同一诊断 ID，项目里抑制一次即可）。

### 1. 注册 A2AServer

```csharp
// 方式一：挂在 agentBuilder 上（keyed by agent 名）
builder.AddAIAgent("policy-agent", instructions, chatClient)
    .AddA2AServer(options =>
    {
        // AgentCard 经 A2AServerRegistrationOptions.ServerOptions（A2AServerOptions）配置
        options.ServerOptions = new A2AServerOptions { /* AgentCard 元数据等 */ };
    });

// 方式二：直接在 builder/services 上按 agent 名注册
builder.AddA2AServer("policy-agent", options => { ... });
```

### 2. 映射协议端点

```csharp
var app = builder.Build();

// JSON-RPC 绑定；MapA2AHttpJson 为 HTTP+JSON 绑定
// 参数支持 agentName、AIAgent 或 IHostedAgentBuilder 三种重载
app.MapA2AJsonRpc("policy-agent", "/a2a");
app.MapA2AHttpJson("policy-agent", "/a2a");
```

注意：

- 若对应 agent 名没有注册 `A2AServer`，`MapA2A*` 在启动时直接抛 `InvalidOperationException`
- 默认使用 `NoopAgentSessionStore`（会话不跨请求持久化），需要多轮会话时显式注册 `AgentSessionStore`
- 多用户部署配合 `UseClaimsBasedAgentIsolation`（task store 会自动变成 `IsolationKeyScopedTaskStore`）

近期新能力（简列）：任务状态跟踪、task store 隔离 key 作用域（`IsolationKeyScopedTaskStore`）、`MessageSendParams.Configuration` 透传、run modes 行为澄清。

端到端示例：`dotnet/samples/05-end-to-end/A2AClientServer/`。

### 消费远程 A2A Agent

客户端侧（`Microsoft.Agents.AI.A2A`）：用 `AgentCard.AsAIAgent(...)` 或 `A2ACardResolver.GetAIAgentAsync(...)` 把远程 Agent 变成本地 `AIAgent`，再通过 `agent.AsAIFunction()` 即可将其当作函数工具挂到其他 Agent 上（内部支持轮询任务完成状态）。

## AG-UI 托管

客户端包 `Microsoft.Agents.AI.AGUI` **已删除**，AG-UI 协议（事件、消息、工具、SSE/protobuf 传输）移交官方 AG-UI C# SDK（NuGet 上的 `AGUI.Client`/`AGUI.Server`/`AGUI.Abstractions`/`AGUI.Protobuf`/`AGUI.Formatting`）。主仓库只保留 ASP.NET 托管胶水包 `Microsoft.Agents.AI.Hosting.AGUI.AspNetCore`（命名空间 `Microsoft.Agents.AI.Hosting.AGUI.AspNetCore`），基于 SDK 的 `RunAgentInput`/`BaseEvent`，流式转换由 SDK 的 `ChatResponseUpdateAGUIExtensions.AsAGUIEventStreamAsync` 提供。

```csharp
builder.Services.AddAGUIServer();

var app = builder.Build();

// 参数支持 IHostedAgentBuilder 或 agentName（从 DI 解析 keyed AIAgent），也可直接传 agent 实例
app.MapAGUIServer("my-agent", "/");
```

会话按 AG-UI `ThreadId` 经 keyed `AgentSessionStore`（agent 名为 key）持久化；未注册存储时退化为 `NoopAgentSessionStore`（会话即弃）。同样建议配合 `UseClaimsBasedAgentIsolation` 做多用户隔离。

端到端示例：`dotnet/samples/05-end-to-end/AGUIClientServer/`、`05-end-to-end/AGUIWebChat/`（完整 Web 聊天界面，SSE 实时流式通信）。

## OpenAI 兼容 API 托管

```xml
<PackageReference Include="Microsoft.Agents.AI.Hosting.OpenAI" Version="1.20.0" />
```

服务注册与端点映射成对出现，允许现有 OpenAI 客户端直接调用你的 Agent：

```csharp
builder.Services.AddOpenAIResponses();
builder.Services.AddOpenAIChatCompletions();
builder.Services.AddOpenAIConversations();

var app = builder.Build();

// 全量映射（自动聚合所有 keyed agent），或指定单个 agent：app.MapOpenAIResponses(agentBuilder)
app.MapOpenAIResponses();
app.MapOpenAIChatCompletions();
app.MapOpenAIConversations();
```

低层协议 helper（自管路由时用）：应用自己持有 ASP.NET Core 路由时，可用 `OpenAIResponses` 的静态方法做协议转换——`ToAgentRunRequest(JsonElement)` 解析请求、`GetSessionStoreId(...)` 取续接 id、`WriteResponse(...)`/`WriteResponseStreamAsync(...)` 渲染响应、`CreateResponseId()` 生成响应 id。路由、认证、会话存储全部由应用自己掌控。

示例：`dotnet/samples/04-hosting/af-hosting/`（`local_responses`、`local_responses_workflow`，演示应用自管 `/responses` 路由）。

## Cosmos DB 持久化

```xml
<PackageReference Include="Microsoft.Agents.AI.CosmosNoSql" Version="1.20.0" />
```

```csharp
// Cosmos DB 用于对话历史和检查点存储
builder.Services.AddSingleton<ChatHistoryProvider, CosmosChatHistoryProvider>();
```

## Microsoft Purview 治理

```xml
<PackageReference Include="Microsoft.Agents.AI.Purview" Version="1.20.0" />
```

```csharp
// Microsoft Purview 集成
// 提供 AI 治理、合规性监控
```

端到端示例：`dotnet/samples/05-end-to-end/AgentWithPurview/`。

## DevUI Aspire 集成

```xml
<PackageReference Include="Aspire.Hosting.AgentFramework.DevUI" Version="1.20.0" />
```

```csharp
var builder = DistributedApplication.CreateBuilder(args);

var writerAgent = builder.AddProject<Projects.WriterAgent>("writer-agent");
var editorAgent = builder.AddProject<Projects.EditorAgent>("editor-agent");

// AddDevUI(name, int? port = null)
builder.AddDevUI("devui")
    .WithAgentService(writerAgent, agents: [new AgentEntityInfo("writer")])
    .WithAgentService(editorAgent, agents: [new AgentEntityInfo("editor")])
    .WaitFor(writerAgent)
    .WaitFor(editorAgent);
```

`WithAgentService<T>()` 把多个后端服务聚合进同一个 DevUI：聚合器以 **AppHost 内进程反向代理**运行，无需容器镜像（偏向 HTTPS 后端）；后端需暴露 OpenAI Responses/Conversations 端点（`MapOpenAIResponses`/`MapOpenAIConversations`）。通过 `agents` 声明实体列表时后端不需要 `/v1/entities` 端点。DevUI 仅用于开发，不会进入部署清单。

端到端示例：`dotnet/samples/05-end-to-end/DevUIAspireIntegration/`。

## 控制台应用示例

框架同时提供控制台应用版本的部署示例（7 个），便于本地开发和调试：

1. 单个 Agent
2. 编排-链式
3. 编排-并发
4. 编排-条件边
5. 工作流事件
6. 共享状态
7. 子工作流
