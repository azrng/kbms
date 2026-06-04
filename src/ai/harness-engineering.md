---
title: Harness Engineering 详解
lang: zh-CN
date: 2026-06-04
publish: true
author: 圣杰
isOriginal: false
category:
  - soft
tag:
  - 大模型
  - .NET
  - MAF
  - 智能体
  - Harness
---

# Harness Engineering：智能体工程化的关键概念

![封面](/ai/730c3aaa-62df-48ab-ae7c-784bb900128b.jpg)

> 本文整理自 [向 AI 而行](https://mp.weixin.qq.com/s/D2MQw67Z9yOyC-ShY6DsLQ) 的文章，系统介绍 Harness Engineering 的核心概念和在 MAF 1.4 中的实现。

## 什么是 Harness Engineering

很多人第一次看到 Harness 这个词，会把它理解成一个新功能，或者一个新的任务编排组件。

这样理解不算错，但只停在这里，基本会把它看小。

因为当智能体还只是"调一次模型，回一段答案"的时候，Prompt、Tool Calling、Memory 这些词确实差不多够用了。但一旦智能体开始进入真实任务，比如连续执行多步操作、访问文件系统、管理中间状态、处理中断、接受审批，甚至把部分任务委托给子智能体，问题就变了。

这时候真正决定系统能不能落地的，往往已经不是模型本身，而是模型外面那层执行骨架。

**这层骨架，就是 Harness。**

### 核心定义

Harness Engineering 本质上是在模型外面补一层"可执行的脚手架"，把 AI 的能力约束成稳定产出。它不只是让模型更聪明，而是让系统更可执行。

再直白一点：

> Harness Engineering 关心的，不是"模型会不会回答"，而是"智能体能不能稳定把事情做完"。

如果按现有 Wiki 里的定义来压缩，它至少要满足四件事：**有输入、有步骤、有验收、有兜底**。

### Harness 解决的核心问题

智能体一旦进入真实世界，马上就会遇到几类很具体的问题：

1. **它怎么接任务**
   不是所有输入都应该直接扔给模型。有些是业务任务，有些是控制命令，有些只是环境反馈。

2. **它怎么拆任务**
   复杂任务不能全靠模型一口气想完。你得拆步骤，知道先做什么、后做什么。

3. **它怎么管理状态**
   任务做到一半，当前进度是什么，已经产出了什么，中间文件在哪，哪些步骤完成了，这些都不能只靠上下文硬记。

4. **它怎么安全访问环境**
   只要智能体开始读写文件、调用外部工具、修改资源，就一定会碰到权限边界、路径校验、审批和回滚。

5. **它怎么处理长上下文**
   短对话里模型还能勉强记住过程。长任务一跑起来，上下文越来越长，噪声越来越多，没有压缩和收敛机制，最后大概率会跑偏。

6. **它怎么失败后恢复**
   如果每次出错都只能整段重来，那这个系统就谈不上工程价值。

![Harness 概念图](/ai/f7242e30-48b5-4dc5-9a47-840d163d006b.png)

## Harness vs Prompt Engineering

如果说 **Prompt Engineering** 更接近"怎么提问"，那么 **Harness Engineering** 更接近"怎么让系统按流程、安全、稳定地执行"。

模型当然还是核心能力源，但真正让它变成工程系统的，是外面这层 Harness。

Harness Engineering 不是给智能体多装一个功能插件，而是在给智能体补一套"可执行、可治理、可验收"的运行壳。它解决的不是"模型答得好不好"，而是"系统跑得稳不稳"。

## MAF 1.4 中的 Harness 实现

MAF 1.4 不是简单"支持了 Harness"，而是开始把智能体开发从"能力拼装"往"执行系统工程化"推。

### Skills 与 Harness 的关系

MAF 之前已经在补另一条线，就是 **Skills**。

- **Skills** 更像能力包。它解决的是：智能体会什么。比如给它一套 instructions、scripts、references、assets，让它具备某个领域能力。
- **Harness** 解决的是另一件事：智能体怎么干。

这两者不是替代关系，而是前后关系：

> Skills 解决"会什么"。
> Harness 解决"怎么稳定地把事做完"。

换句话说，**Skills 更像能力封装层，Harness 更像运行时执行层**。

### 四大核心机制

![Harness 架构概览](/ai/1282fdf9-67ad-4228-afe0-f2c303e47cf4.png)

#### 1. 命令平面：把任务输入和控制输入分开

MAF 在 Harness 相关实现里引入了 `ICommandHandler` 这样的控制接口，同时暴露了像 `/mode`、`/todos` 这样的命令入口。

这意味着框架开始明确区分两类输入：
- 要交给智能体执行的**任务输入**
- 要交给运行时处理的**控制命令**

这个区分非常关键。因为一旦所有输入都被当成自然语言 prompt，系统就永远停留在"聊天盒子"阶段。你没法让用户清晰地查看模式、检查待办、切换执行状态，也很难构建稳定的运行时交互。

但一旦有了命令平面，智能体就不再只是一个对话对象，而是一个可被操控的执行单元。

#### 2. 状态平面：把状态从上下文里解耦出来

一批 Provider 的出现或增强，比如：
- `TodoProvider`
- `AgentModeProvider`
- `FileMemoryProvider`
- `FileAccessProvider`

这不是在单纯扩 API，而是在把原本可能混在上下文里的东西，拆成独立可治理的状态模块。

很多智能体 demo 都有一个通病：所有东西都塞进聊天历史。任务计划塞进去、中间结果塞进去、执行状态塞进去、文件访问记录也塞进去。短任务还能撑住，任务一长，系统就开始失真。

而这些 Provider 的意义，就是把"任务计划""当前模式""外部文件状态"这些要素，从对话历史中拆出来，变成显式管理对象。

这说明 MAF 正在从"单轮推理器"往"带状态机的执行体"走。

#### 3. 上下文治理：开始正面处理长任务问题

**Context Compaction Strategy** 的引入，意味着任务长了，上下文不能无上限膨胀，必须有压缩、摘要和收敛机制。

很多人现在谈智能体，还停留在"模型上下文变长了，所以长任务就能解决"的想象里。真正做过的人都知道，不是这样。

长上下文不是银弹。上下文一长，真正的问题会变成：
- 历史信息越来越多
- 噪声越来越多
- 模型开始抓不住重点
- 前面做过的决策和后面的执行越来越容易脱节

所以一个能跑长任务的系统，必须主动处理上下文膨胀。不是一股脑全塞进去，而是要知道什么该保留，什么该摘要，什么该收敛成状态。

#### 4. 环境边界与委托能力

一些明显的边界治理信号：
- `path validation`
- `approval helpers`
- `FileAccessProvider`
- `subagents provider`

智能体真正进入环境执行层后，问题不再是"它能不能调用工具"，而是"它能不能在边界内、安全地调用工具"。

会调用工具，只说明模型有动作能力。
会在权限边界内调用工具，才说明系统具备工程能力。

同样，`subagents provider` 也不是简单"支持多 Agent"这么轻描淡写。它真正说明的是：框架开始为任务分工、委托执行和协同收敛预留统一入口。

这意味着 Harness 不只是单体 Agent 的壳，更是在为执行网络做准备。

## 代码示例：Harness 的价值

### 场景

给定多个研究主题，先收集原始材料，再生成摘要。

这个场景看起来不复杂，但很适合说明 Harness 的价值。因为它天然包含两个阶段：
1. 收集信息
2. 汇总结果

### 1. 定义两个最小子能力

```csharp
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

public class ResearchAgent
{
    public Task<string[]> CollectAsync(string[] topics, CancellationToken cancellationToken)
    {
        var results = topics
            .Select(topic => $"Collected raw information about: {topic}")
            .ToArray();

        return Task.FromResult(results);
    }
}

public class SummaryAgent
{
    public Task<string[]> SummarizeAsync(string[] rawResults, CancellationToken cancellationToken)
    {
        var summaries = rawResults
            .Select(item => $"Summary => {item}")
            .ToArray();

        return Task.FromResult(summaries);
    }
}
```

ResearchAgent 负责"收集原始信息"。
SummaryAgent 负责"汇总成摘要"。

### 2. 用 Harness 把任务注册起来

```csharp
using Microsoft.MAF.Harness;

public class ResearchHarness : TaskHarness
{
    public ResearchHarness()
    {
        RegisterTaskHandler<string[], string[]>(
            "ResearchAndSummarize",
            async (topics, token) =>
            {
                var researcher = new ResearchAgent();
                var summarizer = new SummaryAgent();

                var rawResults = await researcher.CollectAsync(topics, token);
                var summaries = await summarizer.SummarizeAsync(rawResults, token);

                return summaries;
            });
    }
}
```

这段代码里有 4 个关键点：

1. **任务名被显式定义了**
   不是"随手调一个方法"，而是注册了一个明确的任务：`ResearchAndSummarize`。因为任务一旦被命名，后面你才能围绕它做日志、状态、监控、审批和调度。

2. **输入输出边界被显式定义了**
   输入是 `string[] topics`，输出是 `string[] summaries`。系统知道这个任务吃什么、吐什么。

3. **步骤结构被显式固化了**
   先 `CollectAsync`，再 `SummarizeAsync`。Harness 的价值之一，就是把那些已经稳定下来的执行骨架显式化。

4. **后续扩展点变清楚了**
   后面可以加：中间状态持久化、人工审批、todo 更新、上下文压缩、subagent 并行执行等。

### 3. 统一执行入口

```csharp
var harness = new ResearchHarness();

var topics = new[]
{
    "Microsoft Agent Framework",
    "Harness Engineering",
    ".NET Agent Runtime"
};

var summaries = await harness.ExecuteTaskAsync<string[], string[]>(
    "ResearchAndSummarize",
    topics,
    CancellationToken.None);

Console.WriteLine("Final Summaries:");
foreach (var summary in summaries)
{
    Console.WriteLine(summary);
}
```

### 为什么比普通方法调用更"工程化"

很多人看到这种示例，第一反应会是："这不就是把普通方法包了一层吗？"

从代码行数看，确实像。但从工程视角看，不是：

| 对比维度 | 普通方法调用 | Harness 注册 |
|---------|------------|-------------|
| 任务身份 | 不明确 | 显式命名 |
| 执行结构 | 未被系统化管理 | 框架托管 |
| 治理入口 | 需要自己东拼西补 | 天然具备扩展点 |
| 演进能力 | 难以扩展 | 适合往"控制面"演进 |

Harness 的价值，不在于让一个简单 demo 看起来更高级，而在于让它从"一次性脚本"变成"可扩展的任务运行单元"。

## 总结

如果让我用一句话总结 Harness Engineering 的意义：

> **Harness Engineering 真正补上的，不是一个新功能，而是智能体从"会做事"走向"能稳定做成事"的那层工程骨架。**

有 Skills，智能体才不至于空心。
有 Harness，智能体才不至于失控。

没有 Skills，智能体可能什么都不会。
没有 Harness，智能体可能什么都想干，但干不稳。

---

*参考来源：[.NET+AI | Harness | MAF 1.4 发布，Harness Engineering 如约而至，智能体工程化更进一步](https://mp.weixin.qq.com/s/D2MQw67Z9yOyC-ShY6DsLQ)*
