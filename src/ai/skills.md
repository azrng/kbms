---
title: Skills
lang: zh-CN
date: 2026-04-12
publish: true
author: azrng
isOriginal: true
category:
  - ai
  - skill
tag:
  - 辅助
---

# Skills 分类说明

本文整理常用 skills 的用途，并按使用场景分类，方便快速查找。每个 skill 的说明都控制在 100 字以内。

## Superpowers 详解

`superpowers` 是一套面向编码代理（Claude Code / Copilot CLI / Gemini CLI）的完整开发工作流体系，由多个子 Skill 组成，覆盖从构思到交付的全生命周期。它的核心理念是：**在任何操作之前先检查是否有适用的 Skill，用流程化的方式避免遗漏和返工。** 仓库地址：https://github.com/jnMetaCode/superpowers-zh

### 使用原则

1. **Skill 优先**：收到任务后，先判断是否有相关 Skill，哪怕只有 1% 的可能性也应先调用查看。
2. **流程纪律**：刚性 Skill（如 TDD、调试）必须严格遵循；柔性 Skill（如模式参考）可根据实际场景灵活运用。
3. **用户指令至上**：当 Skill 建议与用户明确指令冲突时，以用户指令为准。

### 子 Skill 一览

| 子 Skill | 触发场景 | 简要说明 |
| --- | --- | --- |
| `superpowers:brainstorming` | 开始任何创造性工作（新功能、组件、行为修改）前 | 探索用户意图、需求与设计，确保在动手前充分理解目标。 |
| `superpowers:writing-plans` | 有明确需求或规格，准备多步骤实施前 | 编写结构化的实施计划，明确步骤、关键文件和架构取舍。 |
| `superpowers:executing-plans` | 已有书面计划，需要在独立会话中逐步执行时 | 按计划逐步执行，设置检查点进行阶段性评审。 |
| `superpowers:test-driven-development` | 实现任何功能或修复 Bug，在写实现代码前 | 先写测试、再写实现，确保代码可验证、可回归。 |
| `superpowers:systematic-debugging` | 遇到 Bug、测试失败或意外行为时 | 系统化定位根因，避免盲目猜测和反复试错。 |
| `superpowers:requesting-code-review` | 完成任务、实现主要功能或准备合并前 | 发起代码评审，验证工作是否满足需求并符合标准。 |
| `superpowers:receiving-code-review` | 收到代码评审反馈，准备实施建议前 | 对反馈做技术严谨性验证，避免盲从或漏判。 |
| `superpowers:dispatching-parallel-agents` | 面对 2+ 个可独立执行的并行任务时 | 拆分任务并行分派，加速执行。 |
| `superpowers:subagent-driven-development` | 在当前会话中执行含独立任务的实施计划时 | 用子代理驱动开发，保持主会话上下文清洁。 |
| `superpowers:using-git-worktrees` | 开始需要与当前工作区隔离的功能开发或计划执行前 | 创建隔离的 Git Worktree，避免影响主分支。 |
| `superpowers:finishing-a-development-branch` | 实现完成、测试通过，需要决定如何集成工作时 | 引导完成开发分支的收尾工作（合并、PR 或清理）。 |
| `superpowers:verification-before-completion` | 准备声明工作完成、已修复或测试通过前 | 先运行验证命令并确认输出，做到"先有证据再断言"。 |
| `superpowers:writing-skills` | 创建新 Skill、编辑现有 Skill 或部署前验证时 | 指导 Skill 的编写、测试与发布流程。 |
| `superpowers:using-superpowers` | 任何对话开始时 | 建立 Skill 发现与使用机制，确保在首次响应前完成 Skill 检查。 |

### 典型工作流

```
需求分析 → brainstorming → writing-plans → (using-git-worktrees) →
test-driven-development / subagent-driven-development →
verification-before-completion → requesting-code-review →
finishing-a-development-branch
```

遇到问题时随时插入 `systematic-debugging`，收到反馈时使用 `receiving-code-review`。

## 开发流程与规范

| Skill | 简单说明 |
| --- | --- |
| `pua` | 用于优化提示表达、强化约束和执行一致性，适合提升代理对需求的理解与落地质量。 |
| `openspec` | 围绕需求、规格与计划展开，适合先写设计说明再实施的规范化开发流程。 |
| `superpowers` | 一套面向编码代理的完整开发工作流，覆盖规划、调试、评审、验证与收尾。 |
| `proactive-agent` | 偏主动推进型代理，适合自动发现下一步事项、风险点和可执行建议。 |
| `self-improving-agent` | 用于复盘执行效果并持续优化提示、流程和行为策略。 |

## 中文开发规范

| Skill | 简单说明 |
| --- | --- |
| `chinese-code-review` | 中文代码审查规范，保持专业严谨的同时用符合国内团队文化的方式给出反馈。 |
| `chinese-commit-conventions` | 中文 Git 提交规范，适配国内团队的 commit message 规范和 changelog 自动化。 |
| `chinese-documentation` | 中文技术文档写作规范，排版、术语、结构一步到位，告别机翻味。 |
| `chinese-git-workflow` | 适配国内 Git 平台和团队习惯的工作流规范，覆盖 Gitee、Coding、极狐 GitLab、CNB。 |

## 仓库协作与 Git 流程

| Skill | 简单说明 |
| --- | --- |
| `gitnexus` | 面向 Git 仓库的上下文导航与关系梳理，便于理解分支、提交和代码关联。 |
| `gitnexus-exploring` | 偏重代码库探索和依赖追踪，适合先摸清结构再继续开发或排障。 |
| `opsx:sync` | 同步任务状态、上下文和工作结果，适合多步骤或多代理协作场景。 |
| `opsx:verify` | 对执行结果做核验与完成度检查，避免遗漏约束、步骤或交付项。 |
| `github` | 通过 `gh` CLI 操作 GitHub，适合处理 Issue、PR、Actions 和仓库查询。 |

## 技能发现与构建

| Skill | 简单说明 |
| --- | --- |
| `find-skills` | 用于发现、比较和安装 skills，适合不知道该用哪个 skill 时先检索。 |
| `skill-creator` | 用于设计和编写新 skill，适合沉淀专用工作流、知识和工具接入。 |
| `mcp-builder` | MCP 服务器构建方法论，系统化构建生产级 MCP 工具，让 AI 助手连接外部能力。 |
| `workflow-runner` | 在 Claude Code / OpenClaw / Cursor 中直接运行 agency-orchestrator YAML 工作流，无需 API key。 |

## 应用开发与界面

| Skill | 简单说明 |
| --- | --- |
| `aspnet-core` | 用于 `ASP.NET Core` 项目的设计、重构、排错与升级，覆盖 API、Blazor、鉴权等场景。 |
| `frontend-design` | 生成高质量前端页面与组件，强调视觉表现、创意细节和可落地代码。 |

## 内容创作与信息整理

| Skill | 简单说明 |
| --- | --- |
| `blog-author` | 用于深度调研、博客提纲与长文写作，可输出结构化 Markdown 文章。 |
| `news-summary` | 抓取可信新闻源并生成新闻简报，适合日报、快讯和世界动态摘要。 |
| `summarize` | 汇总网页、PDF、图片、音频或视频内容，快速产出简洁摘要。 |

## 文档与数据处理

| Skill | 简单说明 |
| --- | --- |
| `csv-pipeline` | 处理 CSV、TSV、JSON 数据，支持过滤、聚合、转换、去重和报表输出。 |
| `docx` | 创建、编辑和分析 Word 文档，支持批注、修订、格式保留与文本提取。 |
| `pdf` | 处理 PDF 的提取、生成、拆分、合并和表单填写，适合批量文档任务。 |
| `pptx` | 用于创建、修改和分析 PowerPoint 演示文稿，适合自动化生成或整理幻灯片。 |
| `xlsx` | 创建、编辑和分析电子表格，支持公式、格式、图表和多表数据处理。 |

## 联网访问与采集

| Skill | 简单说明 |
| --- | --- |
| `tavily-search` | 基于 Tavily 做联网搜索与结果整理，适合研究型问答和资料收集。 |
| `weather-advisor` | 查询实时天气和短期预报，并给出穿衣、出行和活动建议。 |
| `web-access` | 统一处理联网操作，如搜索、抓取、登录后网页交互和动态页面访问。 |
| `web-scraper` | 用 Python 抓取网页与结构化内容，适合搜索、采集链接和页面解析。 |

## 自动化触达

| Skill | 简单说明 |
| --- | --- |
| `wechat-ui-sender` | 通过桌面微信界面自动发送消息，适合无官方 API 时的消息触达。 |

