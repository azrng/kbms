---
title: 项目集成
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
  - 集成
---

# 项目集成

## ASP.NET Core 集成示例

### Program.cs 配置

```csharp
using OpenAI;
using OpenAI.Chat;
using Microsoft.Extensions.AI;

var builder = WebApplication.CreateBuilder(args);

// 读取配置
var endpoint = builder.Configuration["LLM:APIURL"] ?? string.Empty;
var apiKey = builder.Configuration["LLM:APIKEY"] ?? string.Empty;
var modelId = builder.Configuration["LLM:ModelId"] ?? string.Empty;

// 创建 ChatClient
var chatClient = new OpenAIClient(new ApiKeyCredential(apiKey),
        new OpenAIClientOptions { Endpoint = new Uri(endpoint) })
    .GetChatClient(modelId);

// 注册 IChatClient
builder.Services.AddChatClient(chatClient.AsIChatClient());

// 注册 Agent 服务
builder.Services.AddSingleton<AgentFactoryService>();
```

### AgentFactoryService 实现

```csharp
using LogAnalyzer.Server.Models;
using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;

namespace LogAnalyzer.Server.Services.AI;

public class AgentFactoryService
{
    private readonly ChatClientAgent _logAnalysisAgent;
    private readonly ILogger<AgentFactoryService> _logger;

    public AgentFactoryService(
        ILogger<AgentFactoryService> logger,
        IChatClient chatClient)
    {
        _logger = logger;

        _logAnalysisAgent = new ChatClientAgent(
            chatClient,
            new ChatClientAgentOptions
            {
                Name = "LogAnalyzer",
                ChatOptions = new ChatOptions
                {
                    Instructions = @"你是一个专业的日志分析专家助手。你的任务是：

1. 深入分析用户提供的日志内容
2. 识别所有错误、警告和异常
3. 提取错误发生的上下文证据
4. 生成清晰、可操作的日志摘要
5. 为每个问题提供具体的解决方案

输出要求：
- 使用 Markdown 格式
- 提供结构化的分析结果
- 代码示例要完整且可运行
- 解决方案要具体、可操作",
                    Temperature = 0.3f,
                    MaxOutputTokens = 4000
                }
            }
        );
    }

    public async IAsyncEnumerable<string> AnalyzeLogStreamAsync(LogAnalysisRequest request)
    {
        _logger.LogInformation("开始流式分析日志，文件名: {FileName}", request.FileName);

        var userPrompt = $@"请分析以下日志文件：

文件名：{request.FileName}

日志内容：
{request.LogContent}

请按照以下要求分析：
1. 生成日志摘要（时间范围、级别分布、关键发现）
2. 对日志进行归类整理
3. 识别所有错误和异常，提取上下文证据
4. 为每个错误提供解决方案建议

以 Markdown 格式返回完整的分析结果。";

        await foreach (var update in _logAnalysisAgent.RunStreamingAsync(userPrompt))
        {
            yield return update.Text;
        }

        _logger.LogInformation("流式日志分析完成");
    }
}
```

### API Controller

```csharp
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class LogAnalysisController : ControllerBase
{
    private readonly AgentFactoryService _agentService;

    public LogAnalysisController(AgentFactoryService agentService)
    {
        _agentService = agentService;
    }

    [HttpPost("analyze")]
    public async IAsyncEnumerable<string> AnalyzeLog([FromBody] LogAnalysisRequest request)
    {
        await foreach (var chunk in _agentService.AnalyzeLogStreamAsync(request))
        {
            yield return chunk;
        }
    }
}
```

## 使用 DI 注册多个 Agent

```csharp
// 注册命名 Agent
builder.Services.AddKeyedSingleton<AIAgent>("logAnalyzer", (sp, _) =>
    sp.GetRequiredService<IChatClient>().AsAIAgent(
        instructions: "你是日志分析专家",
        name: "LogAnalyzer"));

builder.Services.AddKeyedSingleton<AIAgent>("codeReviewer", (sp, _) =>
    sp.GetRequiredService<IChatClient>().AsAIAgent(
        instructions: "你是代码审查专家",
        name: "CodeReviewer"));

// 使用
public class MyService(
    [FromKeyedServices("logAnalyzer")] AIAgent logAnalyzer,
    [FromKeyedServices("codeReviewer")] AIAgent codeReviewer)
{
    public async Task<string> Analyze(string input)
    {
        return await logAnalyzer.RunAsync(input);
    }
}
```

## OAuth 授权集成（v1.9.0 新增）

基于 OAuth 2.0 scope 的 Agent 和工具级授权。

```csharp
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/[controller]")]
[Authorize(Policy = "agent.chat")]  // 端点级授权
public class AgentController : ControllerBase
{
    private readonly AIAgent _agent;

    [HttpPost("chat")]
    public async IAsyncEnumerable<string> Chat([FromBody] ChatRequest request)
    {
        await foreach (var chunk in _agent.RunStreamingAsync(request.Message))
        {
            yield return chunk;
        }
    }
}

// 工具级授权
[Description("审批费用报销")]
[Authorize(Policy = "expenses.approve")]  // 需要审批权限
public bool ApproveExpense([Description("报销ID")] string expenseId)
{
    return true;
}

// 查看费用只需查看权限
[Description("查看费用列表")]
[Authorize(Policy = "expenses.view")]
public string ListExpenses()
{
    return "费用列表...";
}
```

OAuth 配置支持 Keycloak（开发环境）和 Microsoft Entra ID（生产环境）。

## M365 Agent 集成（v1.9.0 新增）

将 Agent 部署到 Microsoft Teams 和 Copilot。

```csharp
// ASP.NET Core 托管 M365 Agent
// - 支持多轮对话
// - Adaptive Cards 富交互响应
// - devtunnels 本地调试
// - Azure Bot Service 部署
// - Agents Playground 测试
```

## OpenTelemetry + Aspire 监控集成（v1.9.0 新增）

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

// 添加 OpenTelemetry
builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing
        .AddSource("Microsoft.Agents.AI")
        .AddOtlpExporter())
    .WithMetrics(metrics => metrics
        .AddMeter("Microsoft.Agents.AI")
        .AddOtlpExporter());

// 添加 Agent 并启用遥测
builder.Services.AddChatClient(chatClient)
    .UseOpenTelemetry()
    .UseLogging();

// 或通过 AIAgentBuilder
var agent = chatClientAgent.AsBuilder()
    .UseOpenTelemetry()
    .Build();
```

监控选项：
- **Aspire Dashboard**：本地开发实时查看追踪、指标
- **Grafana**：自定义仪表盘（Agent Overview、Workflow Overview）
- **Application Insights**：Azure 生产环境监控

## 错误处理最佳实践

```csharp
public async IAsyncEnumerable<string> SafeAnalyzeStreamAsync(string input)
{
    try
    {
        await foreach (var update in _agent.RunStreamingAsync(input))
        {
            yield return update.Text;
        }
    }
    catch (HttpRequestException ex)
    {
        _logger.LogError(ex, "API 请求失败");
        yield return "[错误] AI 服务暂时不可用，请稍后重试。";
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Agent 调用失败");
        throw;
    }
}
```

## 性能优化

- 使用流式响应提供更好的用户体验
- 对于大批量处理，考虑使用后台响应（Background Responses）
- 合理设置 `MaxOutputTokens` 和 `Temperature`
- 使用 `ChatHistoryProvider` 管理对话历史，避免无限增长
- 启用压缩管道（Compaction Pipeline）管理 token 消耗
- 对于重复请求，考虑实现缓存层
- 生产环境启用 `RequirePerServiceCallChatHistoryPersistence` 支持崩溃恢复
