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

## 文档与办公

### docx

- **说明**：创建、编辑和分析 Word 文档，支持批注、修订、格式保留与文本提取。
- **来源**：GitHub：https://github.com/anthropics/skills/tree/main/skills/docx

### pdf

- **说明**：处理 PDF 的提取、生成、拆分、合并和表单填写，适合批量文档任务。
- **来源**：GitHub：https://github.com/anthropics/skills/tree/main/skills/pdf

### pptx

- **说明**：用于创建、修改和分析 PowerPoint 演示文稿，适合自动化生成或整理幻灯片。
- **来源**：GitHub：https://github.com/anthropics/skills/tree/main/skills/pptx

### xlsx

- **说明**：创建、编辑和分析电子表格，支持公式、格式、图表和多表数据处理。
- **来源**：GitHub：https://github.com/anthropics/skills/tree/main/skills/xlsx

## 前端、UI 与浏览器

### frontend-design

- **说明**：生成高质量前端页面与组件，强调视觉表现、创意细节和可落地代码。
- **来源**：GitHub：https://github.com/anthropics/skills/tree/main/skills/frontend-design

### webapp-testing

- **说明**：基于 Playwright 的本地 Web 应用测试工具集，支持前端功能验证、UI 调试、页面截图及浏览器控制台日志采集。
- **安装**：`npx skillsauth add alter123-zz/RaccoonClaw webapp-testing`

### Agent-browser

- **说明**：浏览器自动化，用于在浏览器中打开、导航、检查、截图或测试本地与远程页面。
- **来源**：GitHub：https://github.com/vercel-labs/agent-browser/tree/main/skills/agent-browser

## 联网、搜索与数据处理

### web-access

- **说明**：统一处理联网操作，如搜索、抓取、登录后网页交互和动态页面访问。
- **来源**：GitHub：https://github.com/eze-is/web-access

### summarize

- **说明**：汇总网页、PDF、图片、音频或视频内容，快速产出简洁摘要。
- **安装**：`brew install steipete/tap/summarize`

## 开发、调试与平台协作

### aspnet-core

- **说明**：用于 `ASP.NET Core` 项目的设计、重构、排错与升级，覆盖 API、Blazor、鉴权等场景。
- **来源**：GitHub：https://github.com/openai/skills/blob/main/skills/.curated/aspnet-core/SKILL.md

### github

- **说明**：通过 `gh` CLI 操作 GitHub，适合处理 Issue、PR、Actions 和仓库查询。
- **安装**：`npx clawhub@latest install github`

### pua

- **说明**：用于优化提示表达、强化约束和执行一致性，适合提升代理对需求的理解与落地质量。
- **来源**：GitHub：https://github.com/tanweai/pua

### openspec

- **说明**：围绕需求、规格与计划展开，适合先写设计说明再实施的规范化开发流程。

### chinese-code-review

- **说明**：中文代码审查规范，保持专业严谨的同时用符合国内团队文化的方式给出反馈。

### chinese-commit-conventions

- **说明**：中文 Git 提交规范，适配国内团队的 commit message 规范和 changelog 自动化。

### chinese-documentation

- **说明**：中文技术文档写作规范，排版、术语、结构一步到位，告别机翻味。

### chinese-git-workflow

- **说明**：适配国内 Git 平台和团队习惯的工作流规范，覆盖 Gitee、Coding、极狐 GitLab、CNB。

## Agent 能力与工作流

### skill-creator

- **说明**：用于设计和编写新 skill，适合沉淀专用工作流、知识和工具接入。
- **来源**：GitHub：https://github.com/anthropics/skills/tree/main/skills/skill-creator

### find-skills

- **说明**：用于发现、比较和安装 skills，适合不知道该用哪个 skill 时先检索。
- **安装**：`npx clawhub@latest install find-skills`

### proactive-agent

- **说明**：偏主动推进型代理，适合自动发现下一步事项、风险点和可执行建议。
- **安装**：`npx clawhub@latest install proactive-agent`

### self-improving-agent

- **说明**：用于复盘执行效果并持续优化提示、流程和行为策略。
- **来源**：GitHub：https://github.com/peterskoett/self-improving-agent


- **说明**：在 Claude Code / OpenClaw / Cursor 中直接运行 agency-orchestrator YAML 工作流，无需 API key。

## 内容、生活与个人效率

### blog-author

- **说明**：用于深度调研、博客提纲与长文写作，可输出结构化 Markdown 文章。
- **来源**：GitHub：https://github.com/AIDotNet/OpenCowork

### news-summary

- **说明**：抓取可信新闻源并生成新闻简报，适合日报、快讯和世界动态摘要。
- **安装**：`npx clawhub@latest install news-summary`

### tailored-resume-generator

- **说明**：分析岗位描述并生成针对性简历，突出相关经验、技能和成果以提升面试机会。
- **安装**：`npx skills i ComposioHQ/awesome-claude-skills/tailored-resume-generator`

### weather-advisor

- **说明**：查询实时天气和短期预报，并给出穿衣、出行和活动建议。
- **安装**：`npx skillsauth add alter123-zz/RaccoonClaw weather-advisor`

### wechat-ui-sender

- **说明**：通过桌面微信界面自动发送消息，适合无官方 API 时的消息触达。

## 参考资料

* https://github.com/ComposioHQ/awesome-codex-skills
* https://github.com/anthropics/skills
* [TRAE 用户都在用哪些 Skills](https://mp.weixin.qq.com/s/fSKD92UFm2diFN4UYgqgSQ?scene=1&click_id=4)
