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

框架 v1.1.0 大幅增强了技能系统，支持多种定义方式。

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
<PackageReference Include="Microsoft.Agents.AI.Declarative" Version="1.1.0" />
<PackageReference Include="Microsoft.Agents.AI.Workflows.Declarative" Version="1.1.0" />
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
<PackageReference Include="Microsoft.Agents.AI.Workflows.Generators" Version="1.1.0" />
```

## 压缩管道（Compaction Pipeline）

管理长对话的 token 消耗，支持多种压缩策略。

### 压缩策略

| 策略 | 说明 |
| --- | --- |
| 聊天缩减（Chat Reduction） | 智能裁剪对话历史 |
| 截断（Truncation） | 截断过长的消息 |
| 摘要（Summarization） | 用 AI 生成对话摘要 |
| 滑动窗口（Sliding Window） | 保留最近 N 条消息 |
| 工具结果策略 | 压缩工具返回的大结果 |

```csharp
// 配置压缩管道
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

### 5 个 AG-UI 示例

1. 入门指南
2. 后端工具
3. 前端工具
4. 人工介入（Human-in-the-Loop）
5. 状态管理

```xml
<PackageReference Include="Microsoft.Agents.AI.AGUI" Version="1.1.0" />
```

## A2A（Agent-to-Agent 协议）

支持 Agent 间的标准通信协议。

```csharp
using Microsoft.Agents.AI.A2A;

// 创建 A2A Agent
var a2aAgent = new A2AAgent(...);

// Agent 间通信
// 支持轮询任务完成
```

## 深度研究（Deep Research）

框架提供深度研究模式的 Agent 示例。

## Agent 即函数循环（In-Function Loop）

支持在 Azure Functions 中实现 Agent 循环，带检查点支持。
