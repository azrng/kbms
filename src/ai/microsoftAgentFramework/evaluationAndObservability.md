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

v1.9.0 新增完整的评估体系，使用 `Microsoft.Extensions.AI.Evaluation` 对 Agent 和工作流进行自动化质量评估。

### 质量评估器

使用内置评估器衡量 Agent 输出质量：

| 评估器 | 说明 |
| --- | --- |
| Relevance | 回答与问题的相关性 |
| Coherence | 回答的连贯性和逻辑性 |
| Fluency | 语言流畅性 |

```csharp
// 使用 Foundry 质量评估器
// 自动评分并生成评估报告
```

### 自定义评估

针对特定业务领域创建自定义评估检查：

```csharp
// 领域特定的评估逻辑
// 如：合规性检查、格式验证、安全评估
```

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

多轮对话的不同分割策略评估：

| 策略 | 说明 |
| --- | --- |
| LastTurn | 仅评估最后一轮 |
| Full | 评估完整对话 |
| PerTurnItems | 逐轮评估 |

```csharp
// 选择不同的分割策略
// 对比不同策略下的评估结果
```

### 多提供者评估

组合本地和云端评估器：

```csharp
// 本地评估器 + 云端评估器
// 单次调用中同时使用多种评估器
// 综合多个评估维度的结果
```

### Red Teaming（对抗测试）

系统性对抗测试，验证 Agent 安全性和鲁棒性：

```csharp
// 自动生成对抗性输入
// 测试越狱（jailbreak）抵抗能力
// 验证有害内容过滤
// 生成安全评估报告
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
```

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
<PackageReference Include="Microsoft.Agents.AI.DevUI" Version="1.9.0" />
```

### 独立使用

```csharp
// 启动 DevUI Web 界面
// 实时查看 Agent 执行
// 调试工具调用
```

### Aspire 集成

```xml
<PackageReference Include="Aspire.Hosting.AgentFramework.DevUI" Version="1.9.0" />
```

```csharp
var builder = DistributedApplication.CreateBuilder(args);

// 注册多个 Agent
var writer = builder.AddProject<Projects.AgentService>("writer")
    .WithAgentService("WriterAgent");
var editor = builder.AddProject<Projects.AgentService>("editor")
    .WithAgentService("EditorAgent");

// DevUI 自动发现所有注册的 Agent
builder.AddDevUI("devui");
```

### 功能

- 自动发现注册的 Agent
- 实时可视化 Agent 执行过程
- 工具调用追踪
- 多 Agent 统一调试界面
- Azure AI Foundry 集成

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
