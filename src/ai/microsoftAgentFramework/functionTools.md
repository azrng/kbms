---
title: 函数工具
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
  - 工具
---

# 函数工具

## 基本用法

### 定义函数

```csharp
using System.ComponentModel;
using Microsoft.Extensions.AI;

[Description("获取当前天气")]
public string GetWeather([Description("城市名称")] string city)
{
    return $"{city} 今天晴天，温度 25°C";
}

[Description("获取股票价格")]
public decimal GetStockPrice([Description("股票代码")] string symbol)
{
    return 150.25m;
}
```

### 创建带工具的 Agent

```csharp
using Microsoft.Agents.AI;

// 方式一：通过 AsAIAgent 扩展方法
AIAgent agent = chatClient.AsAIAgent(
    instructions: "你是一个有用的助手，可以查询天气信息。",
    tools: [AIFunctionFactory.Create(GetWeather)]
);

// 方式二：通过 ChatClientAgentOptions
ChatClientAgent agent = new ChatClientAgent(
    chatClient,
    new ChatClientAgentOptions
    {
        Name = "MyAgent",
        ChatOptions = new ChatOptions
        {
            Instructions = "你是一个有用的助手。",
            Tools = [
                AIFunctionFactory.Create(GetWeather),
                AIFunctionFactory.Create(GetStockPrice)
            ]
        }
    }
);
```

### 使用

```csharp
await foreach (var update in agent.RunStreamingAsync("北京今天天气怎么样？"))
{
    Console.Write(update.Text);
}
```

## 工具审批（Tool Approvals）

对于敏感操作，可以设置工具需要人工审批。审批原语（`ToolApprovalRequestContent`/`ToolApprovalResponseContent`/`ApprovalRequiredAIFunction`）已下沉到 Microsoft.Extensions.AI；MAF 在核心包 `Microsoft.Agents.AI` 中提供 `ToolApprovalAgent` 中间件实现 "Don't ask again"（不再询问）与自动审批规则（该 API 已从 Experimental 转正）。

### 让工具需要审批

最直接的方式是用 MEAI 的 `ApprovalRequiredAIFunction` 包装任意 `AIFunction`，被包装的工具每次调用前都会产生审批请求：

```csharp
using Microsoft.Extensions.AI;

AIAgent agent = chatClient.AsAIAgent(
    instructions: "你是一个有用的助手。",
    tools: [new ApprovalRequiredAIFunction(AIFunctionFactory.Create(GetWeather))]);
```

有些工具自身默认要求审批，例如后面介绍的 `ShellExecutor.AsAIFunction()`（默认 `requireApproval: true`）。

### 处理审批请求

需要审批的工具不会立即执行，而是在响应消息中携带 `ToolApprovalRequestContent`。把审批结果传回 Agent 时，响应必须绑定已抛给调用方的那个请求（`RequestId`），用 `request.CreateResponse(...)` 创建即可保证绑定正确：

```csharp
AgentSession session = await agent.CreateSessionAsync();
AgentResponse response = await agent.RunAsync("北京天气怎么样？", session);

var approvalRequests = response.Messages
    .SelectMany(m => m.Contents)
    .OfType<ToolApprovalRequestContent>()
    .ToList();

while (approvalRequests.Count > 0)
{
    var responses = approvalRequests.ConvertAll(request =>
    {
        Console.WriteLine($"Agent 请求调用 {((FunctionCallContent)request.ToolCall).Name}，请输入 Y 批准：");
        return new ChatMessage(ChatRole.User,
            [request.CreateResponse(approved: Console.ReadLine()?.Equals("Y", StringComparison.OrdinalIgnoreCase) ?? false)]);
    });

    // 回传审批结果，Agent 继续执行
    response = await agent.RunAsync(responses, session);
    approvalRequests = response.Messages
        .SelectMany(m => m.Contents)
        .OfType<ToolApprovalRequestContent>()
        .ToList();
}
```

### "Don't ask again"：审批长期规则

接入 `ToolApprovalAgent` 中间件后，用户可以用 `AlwaysApproveToolApprovalResponseContent` 记录长期审批规则，后续匹配的工具调用会被自动批准、不再打扰用户。规则保存在会话状态（`AgentSessionStateBag`）中，同一会话内的多次运行都生效。两类规则：

- 按工具名：批准该工具的所有调用（`request.CreateAlwaysApproveToolResponse()`）
- 按工具名 + 精确参数：仅批准参数完全一致的调用（`request.CreateAlwaysApproveToolWithArgumentsResponse()`）

```csharp
// 方式一：通过 AIAgentBuilder（options 参数可选）
var agent = chatClientAgent.AsBuilder()
    .UseToolApproval(new ToolApprovalAgentOptions
    {
        // 自动审批规则：启发式函数决定是否自动批准，
        // 上下文包含 FunctionCallContent、Agent、Session、RequestMessages、RunOptions
        AutoApprovalRules =
        [
            // 例：自动批准所有函数名以 "Get" 开头的调用
            ctx => new ValueTask<bool>(ctx.FunctionCallContent.Name.StartsWith("Get"))
        ],
        // 防止模型反复请求某个已自动批准的工具导致无限循环（每轮都会计费）。
        // 达到上限后，剩余审批请求会直接抛给调用方人工决定
        MaxAutoApprovalIterations = 50
    })
    .Build();

// 方式二：ToolApprovalAgent 装饰器
var agent = new ToolApprovalAgent(chatClientAgent, new ToolApprovalAgentOptions
{
    AutoApprovalRules =
    [
        ctx => new ValueTask<bool>(ctx.FunctionCallContent.Name.StartsWith("Get"))
    ]
});
```

`ToolApprovalAgentOptions` 还提供 `JsonSerializerOptions`（规则序列化与状态持久化用，默认 `AgentJsonUtilities.DefaultOptions`）。另外有个现成的全量放行规则 `ToolApprovalAgent.AllToolsAutoApprovalRule`（自动批准一切工具调用，仅限完全可信环境）。默认 `MaxAutoApprovalIterations` 为 40（`ToolApprovalAgent.DefaultMaxAutoApprovalIterations`）。

用户侧产生长期规则的方式——批准时改用扩展方法返回 `AlwaysApproveToolApprovalResponseContent`：

```csharp
// "批准，并且以后该工具都不再询问"
new ChatMessage(ChatRole.User, [request.CreateAlwaysApproveToolResponse()]);

// "批准，并且以后该工具用相同参数时不再询问"
new ChatMessage(ChatRole.User, [request.CreateAlwaysApproveToolWithArgumentsResponse()]);
```

::: warning 注意
自动审批规则只按函数名匹配，可能与其它功能注册的同名工具发生碰撞，导致不该放行的工具被自动批准。为工具取名时避免与规则中批准的名字重复。
:::

### 并发工具调用

`ChatClientAgentOptions.AllowConcurrentInvocation` 默认为 `false`（工具调用串行执行）；设为 `true` 后多个工具调用可以并发执行（opt-in）。使用自定义 `FunctionInvokingChatClient` 时，直接在其上设置 `AllowConcurrentInvocation`。

## Shell 工具（Microsoft.Agents.AI.Tools.Shell）

该包提供开箱即用的 shell 工具：`ShellExecutor.AsAIFunction()` 生成一个可注册给 Agent 的 shell 工具，**且默认强制审批**（`requireApproval: true`，每次执行前都会产生审批请求）。两种实现：

- `LocalShellExecutor`：直接在宿主机上执行真实 shell 命令（审批即安全边界）
- `DockerShellExecutor`：在容器中执行，带资源限制、网络隔离和非 root 用户

```csharp
using Microsoft.Agents.AI.Tools.Shell;

// ShellMode.Stateless：每次调用新起一个 shell；ShellMode.Persistent：长驻 shell，
// 工作目录、导出的环境变量跨调用保留
await using var shell = new LocalShellExecutor(new() { Mode = ShellMode.Stateless, AcknowledgeUnsafe = true });

var agent = chatClient.AsAIAgent(new ChatClientAgentOptions
{
    ChatOptions = new()
    {
        Instructions = "你是一个可以执行 shell 命令的助手。",
        Tools = [shell.AsAIFunction()] // 默认 requireApproval: true
    },
    // AIContextProvider：探测真实 shell 环境并在系统提示中注入 OS/shell 版本、CWD 等信息
    AIContextProviders = [new ShellEnvironmentProvider(shell)]
});
```

说明：

- `AsAIFunction(name: "run_shell", description: null, requireApproval: true)`：要生成一个**不带**审批包装的工具，必须构造时显式传 `AcknowledgeUnsafe = true`，否则 `AsAIFunction` 拒绝返回非审批版本。
- `ShellEnvironmentProvider(executor)` 继承 `AIContextProvider`，让模型用正确的 shell 方言（PowerShell vs POSIX）发命令。
- 执行器与单个会话绑定：Persistent 模式下 shell 进程携带可变状态，不要跨用户/并发会话共享实例，DI 中请按会话注册。

## CodeAct 模式（沙箱代码执行）

v1.20.0 中 Hyperlight 沙箱执行持续演进，Agent 可在安全隔离的 VM 中执行代码。

```xml
<PackageReference Include="Microsoft.Agents.AI.Hyperlight" Version="1.20.0" />
```

### 基础 CodeAct

```csharp
using Microsoft.Agents.AI.Hyperlight;

// 通过 AIContextProvider 注入 execute_code 工具
using var codeActProvider = new HyperlightCodeActProvider(
    HyperlightCodeActProviderOptions.CreateForJavaScript());
// Python/Wasm 后端：HyperlightCodeActProviderOptions.CreateForWasm(pythonGuestPath)

var agent = chatClient.AsAIAgent(new ChatClientAgentOptions
{
    Instructions = "遇到计算问题就写代码并调用 execute_code，不要瞎猜。",
    AIContextProviders = [codeActProvider]
});

// Agent 现在可以自主编写并执行代码
await foreach (var update in agent.RunStreamingAsync("写一段 JavaScript 计算斐波那契数列前 10 项"))
{
    Console.Write(update.Text);
}
```

::: warning
`AIAgentBuilder.UseAIContextProviders` 现在只接受 `params MessageAIContextProvider[]`，不能再传 `HyperlightCodeActProvider`（它是 `AIContextProvider` 派生类）。推荐用 `ChatClientAgentOptions.AIContextProviders` 接线，如上所示；`ChatClientBuilder.UseAIContextProviders(params AIContextProvider[])` 仍然可用。
:::

### 手动注册 CodeAct 工具

`HyperlightExecuteCodeFunction` 直接继承 `AIFunction`，本身就是 `AITool`，可以直接放进 tools，无需 `.AsAITool()` 包装。适合不需要 `AIContextProvider` 生命周期的静态接线场景：

```csharp
var executeCode = new HyperlightExecuteCodeFunction(new HyperlightCodeActProviderOptions
{
    ApprovalMode = CodeActApprovalMode.NeverRequire  // 默认值；或 AlwaysRequire
});

AIAgent agent = chatClient.AsAIAgent(
    instructions: "你可以执行代码来解决问题",
    tools: [executeCode]
);
```

`CodeActApprovalMode.NeverRequire` 的语义不是"从不审批"：它表示由 provider 注册的工具是否包含 `ApprovalRequiredAIFunction` 来决定 `execute_code` 是否需要审批（任一配置的工具需要审批，`execute_code` 也跟着需要）。`AlwaysRequire` 则是无条件审批。

### 沙箱安全配置

```csharp
var provider = new HyperlightCodeActProvider(new HyperlightCodeActProviderOptions
{
    // 宿主目录暴露为沙箱内 /input
    HostInputDirectory = "/host/input",

    // 文件挂载：宿主路径 -> 沙箱内路径
    FileMounts = [new FileMount("/data/input.csv", "/input/data.csv")],

    // 出站网络白名单（可限制 HTTP 方法）
    AllowedDomains = [new AllowedDomain("https://api.example.com", ["GET"])],

    // 宿主工具注册进沙箱，模型通过 call_tool(...) 调用
    Tools = [AIFunctionFactory.Create(GetWeather)],

    // guest 堆/栈大小，支持 "50Mi"、"2Gi" 等写法
    HeapSize = "50Mi",
    StackSize = "35Mi",

    // 审批模式
    ApprovalMode = CodeActApprovalMode.AlwaysRequire
});
```

沙箱特性：
- 每次运行快照/恢复，确保干净状态
- 支持宿主工具在沙箱内调用（`call_tool(...)`）
- 可选文件系统和网络访问
- VM 级隔离，安全执行不受信代码

## 本地代码执行（Microsoft.Agents.AI.LocalCodeAct，预览）

如果不需要 Hyperlight 的 VM 隔离，预览包 `Microsoft.Agents.AI.LocalCodeAct` 用本机 Python 解释器执行模型生成的代码：默认开启 AST 白名单校验，然后启动子进程运行，可配置资源上限。**它不是沙箱**，必须部署在已提供进程/文件系统/网络隔离的环境中（容器、专用 VM 等）。

```csharp
using Microsoft.Agents.AI.LocalCodeAct;

var codeAct = new LocalCodeActProvider("/usr/bin/python3", new LocalCodeActProviderOptions
{
    ExecutionLimits = new ProcessExecutionLimits
    {
        TimeoutSeconds = 5          // 子进程最长执行时间，默认 30
    }
});

var agent = chatClient.AsAIAgent(new ChatClientAgentOptions
{
    AIContextProviders = [codeAct]
});
```

## Agent 即工具（Agent as Tool）

一个 Agent 可以被包装为工具供其他 Agent 调用。

```csharp
// 创建专家 Agent
AIAgent weatherAgent = chatClient.AsAIAgent(
    instructions: "你是天气专家",
    name: "WeatherExpert"
);

// 将 Agent 包装为工具：.NET 侧没有 agent.AsAITool() 这类扩展（Python 侧才有 as_tool），
// 通用做法是用委托包一层 AIFunctionFactory.Create
AIFunction weatherTool = AIFunctionFactory.Create(
    async (string question, CancellationToken ct) =>
    {
        AgentResponse response = await weatherAgent.RunAsync(question, cancellationToken: ct);
        return response.Text;
    },
    name: "ask_weather_expert",
    description: "向天气专家提问并返回回答");

AIAgent orchestrator = chatClient.AsAIAgent(
    instructions: "你是调度员，可以调用天气专家查询天气。",
    tools: [weatherTool]
);

var response = await orchestrator.RunAsync("北京天气怎么样？");
```

## MCP 工具（Model Context Protocol）

.NET 侧接入 MCP 工具的入口是 C# MCP SDK 的 **`ModelContextProtocol.Client`** 包（注意：MAF 的 `Microsoft.Agents.AI.Workflows.Declarative.*` 是声明式工作流相关包，与 MCP 工具接入无关；早期 Python 侧的 `McpToolUtils`/`CreateToolFromMcp` 在 .NET 中不存在）。

```xml
<!-- ModelContextProtocol 伞包已包含 ModelContextProtocol.Client（命名空间同名） -->
<PackageReference Include="ModelContextProtocol" Version="2.1.0" />
```

### 连接 MCP 服务器并列出工具

`McpClient.CreateAsync(transport)` 建立连接，`ListToolsAsync()` 返回 `IList<McpClientTool>`，可直接作为 Agent 的 tools 传入（`McpClientTool` 就是 `AITool`）：

```csharp
using ModelContextProtocol.Client;

// 通过 stdio 连接一个 MCP 服务器
await using var mcpClient = await McpClient.CreateAsync(new StdioClientTransport(new()
{
    Name = "MCPServer",
    Command = "npx",
    Arguments = ["-y", "@modelcontextprotocol/server-github"]
}));

// 拉取服务器提供的工具列表
var mcpTools = await mcpClient.ListToolsAsync();

AIAgent agent = chatClient.AsAIAgent(
    instructions: "你只回答与 GitHub 仓库相关的问题。",
    tools: [.. mcpTools.Cast<AITool>()]);
```

### MCP Tasks 与技能源（Microsoft.Agents.AI.Mcp）

MAF 自己的 `Microsoft.Agents.AI.Mcp` 包不是 MCP 工具入口，它提供两块增值能力：

- **MCP Tasks**：`McpClientTaskExtensions.ListAgentToolsWithTasksAsync(...)` 用 `TaskAwareMcpClientAIFunction` 包装工具，透明驱动 MCP Tasks 扩展（`tools/call` 返回任务句柄 → 轮询 `tasks/get` 直到完成），长耗时工具无需应用层自己写轮询循环；行为可用 `McpTaskOptions` 调整（轮询间隔、输入请求上限、本地取消时是否取消远端任务等）。
- **技能源**：`AgentMcpSkillsSource`（配合 `AgentSkillsProviderBuilder.UseMcpSkills(...)`）从 MCP 服务器加载 Agent 技能。

### 官方示例

`dotnet/samples/02-agents/ModelContextProtocol/` 下现有 6 个示例：

- Agent_MCP_Server：stdio 连接 MCP 服务器（本文示例的基础）
- Agent_MCP_Server_Auth：带认证的 MCP 服务器
- Agent_MCP_LongRunningTask_Client：MCP Tasks 长耗时任务
- Agent_MCP_PerRun_AuthHeaders：每次运行动态注入认证头
- FoundryAgent_Hosted_MCP：Foundry 托管 MCP
- ResponseAgent_Hosted_MCP：Response Agent 托管 MCP

## 动态函数工具

"动态函数工具"对应 MEAI `AIFunctionFactory.Create(Delegate, AIFunctionFactoryOptions)` 新重载：把任意委托（方法组、Lambda、闭包）在运行时包装成工具，并通过 `AIFunctionFactoryOptions` 精细控制行为（`Name`、`Description`、`SerializerOptions`、`JsonSchemaCreateOptions`、`MarshalResult`、`ConfigureParameterBinding`、`ExcludeResultSchema` 等）：

```csharp
// 运行时根据配置动态生成工具，而不是编译期写死方法签名
var tools = new List<AITool>();
foreach (var api in _config.Apis)
{
    tools.Add(AIFunctionFactory.Create(
        (string query) => api.Invoke(query),
        new AIFunctionFactoryOptions
        {
            Name = api.ToolName,
            Description = api.Description
        }));
}
```

## AIFunctionFactory 高级用法

```csharp
// 从静态方法创建
AITool tool1 = AIFunctionFactory.Create(typeof(MyHelpers).GetMethod("GetWeather")!);

// 从 Lambda 创建
AITool tool2 = AIFunctionFactory.Create((string city) => $"{city}: 25°C",
    name: "get_weather",
    description: "获取天气");

// 带复杂参数
AITool tool3 = AIFunctionFactory.Create((WeatherRequest request) => "...",
    name: "get_detailed_weather",
    description: "获取详细天气信息");
```

## 流式响应中的工具调用

```csharp
await foreach (var update in agent.RunStreamingAsync("北京和上海的天气"))
{
    // update 可能包含工具调用结果
    // 框架自动处理工具调用循环
    Console.Write(update.Text);
}
```

## Deep Research 工具

"Deep Research" 不是 MAF .NET 包内的 API，而是 **Foundry 服务端工具**：通过 `Azure.AI.Agents.Persistent` 的 `DeepResearchToolDefinition` 在 Foundry Agent 服务上创建带深度研究能力的 Agent（o3-deep-research 推理模型 + Bing grounding），由服务端执行多轮 Web 搜索、归纳与推理（示例 `Agent_Step15_DeepResearch`）：

```csharp
using Azure.AI.Agents.Persistent;

var persistentAgentsClient = new PersistentAgentsClient(
    endpoint, new DefaultAzureCredential());

// 定义 Deep Research 工具（Bing 连接 + 推理模型部署）
DeepResearchToolDefinition deepResearchTool = new(new DeepResearchDetails(
    bingGroundingConnections: [new(bingConnectionId)],
    model: "o3-deep-research"));

// 在 Foundry 上创建服务端 Agent
AIAgent agent = await persistentAgentsClient.CreateAIAgentAsync(
    model: "gpt-4o",
    name: "DeepResearchAgent",
    instructions: "你是一个协助科学研究的助手。",
    tools: [deepResearchTool]);
```

深度研究任务耗时长，建议调大 `PersistentAgentsAdministrationClientOptions.Retry.NetworkTimeout`（示例中设为 20 分钟）。
