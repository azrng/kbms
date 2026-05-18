---
title: 实战案例
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
  - 案例
  - 实战
---

# 实战案例

## 1. AgenticMarketingContentGen（营销内容生成）

多 Agent 自动化营销内容生成系统。

### 架构

```
用户输入（营销主题）
    ↓
StrategyAgent（策略制定）
    ↓
CopywritingAgent（文案撰写）
    ↓
    ├── ImageAgent（图片生成 - FLUX）
    └── VideoAgent（视频生成 - Sora-2）
    ↓
Deep Research Executor（多轮 Web 搜索）
    ↓
CampaignPackage（结构化输出）
```

### 特性

- 4 个专业化 Agent（策略、文案、图片、视频）
- Deep Research Executor 执行多轮 Web 搜索
- AI 内容生成（FLUX 图片、Sora-2 视频）
- 结构化输出 `CampaignPackage` 模型
- CLI 参数控制（deep research、image/video 生成、debug 模式）

### 使用场景

- 营销活动策划
- 社交媒体内容生成
- 品牌推广素材制作

## 2. GHModel.AI（旅行助手）

多 Agent 旅行助手应用，展示 AG-UI、DevUI 和 OpenTelemetry 集成。

### 架构

```
用户请求（旅行咨询）
    ↓
FrontDeskAgent（前台接待）
    ├── 基本咨询处理
    └── 复杂需求委派
        ↓
ConciergeAgent（礼宾服务）
    ├── 深度推荐
    └── 个性化建议
```

### 特性

- 多语言实现（Python + .NET）
- AG-UI 协议集成（SSE 流式、Human-in-the-Loop）
- DevUI 本地调试
- OpenTelemetry 可观测性（Aspire Dashboard、Application Insights）
- CopilotKit 前端集成

### 使用场景

- 客服机器人
- 咨询类应用
- 多 Agent 前后端集成参考

## 3. FoundryLocalPipeline（本地 AI 推理）

使用 Microsoft Foundry Local + Deep Research 的本地 AI 管道。

### 架构

```
用户输入
    ↓
Foundry Local（本地 SLM 推理）
    ├── Qwen2.5-1.5B
    └── 本地模型
    ↓
Deep Research Workflow
    ├── 多轮 Web 搜索
    └── 迭代推理
    ↓
Red Teaming 评估（安全性验证）
    ↓
MAF DevUI（交互式调试）
```

### 特性

- 本地 SLM 推理（Qwen2.5-1.5B），无需云端 API
- Red Teaming 安全评估
- 迭代 Deep Research 工作流
- .NET Aspire 可观测性集成

### 使用场景

- 离线环境 AI 应用
- 数据敏感场景（数据不出本地）
- 安全性要求高的 AI 应用

## 4. MicrosoftFoundryWithAITKAndMAF（全生命周期开发）

展示从概念到部署的完整 AI Agent 开发生命周期。

### 三阶段开发流程

```
Phase 1: 低代码设计
    ├── AI Toolkit for VS Code
    └── 可视化工作流设计
        ↓
Phase 2: VS Code 同步
    ├── YAML 配置即代码
    └── 招聘场景工作流
        ↓
Phase 3: Agent Framework 部署
    ├── RecruiterAgent（招聘者）
    ├── ApplicantAgent（应聘者）
    └── 生产环境部署
```

### 特性

- 低代码 → 代码的平滑过渡
- YAML "配置即代码"
- 招聘场景完整示例（Recruiter + Applicant Agent）
- 从可视化设计到生产部署

### 使用场景

- 团队协作开发 AI Agent
- 从原型到生产的快速迭代
- 非 AI 专业人员的低代码入口

## 5. maf_harness_managed_agent（Managed Agent 架构）

Anthropic Managed Agent 架构模式的实现，Brain/Hands/Session 三层分离。

### 架构

```
┌──────────────────────────────────────┐
│          Managed Agent               │
│                                      │
│  ┌─────────────────┐  (Brain)        │
│  │ AgentHarness     │  无状态推理核心  │
│  └────────┬────────┘                 │
│           │                          │
│  ┌────────┴────────┐  (Memory)       │
│  │ SessionLog       │  持久会话日志    │
│  └────────┬────────┘                 │
│           │                          │
│  ┌────────┴────────┐  (Hands)        │
│  │ Sandbox          │  安全执行层     │
│  └─────────────────┘                 │
└──────────────────────────────────────┘
```

### 核心概念

- **Brain（AgentHarness）**：无状态推理核心，只负责思考和决策
- **Memory（SessionLog）**：Durable 持久化会话日志
- **Hands（Sandbox）**：沙箱执行层，安全执行代码和工具

### 崩溃恢复

```csharp
// wake(session_id) 从上次检查点恢复
// 即使服务崩溃，会话日志保证状态不丢失
```

### 扩展点

| 扩展 | 实现 |
| --- | --- |
| 会话持久化 | Cosmos DB |
| 文件存储 | Blob Storage |
| 凭证管理 | Key Vault |

### Many-Brains-Many-Hands 编排

```
多个 Brain 实例 ←→ 共享 SessionLog ←→ 多个 Hands 沙箱
```

支持水平扩展，多个 Brain 实例并发处理请求。

### 使用场景

- 长时间运行的 Agent 任务
- 需要高可靠性的生产系统
- 需要崩溃恢复的关键业务

## 6. maf_harness_managed_hosted_agent（托管 Managed Agent）

在 Foundry 托管环境中的 Managed Agent 实现。

### 特性

- Brain/Hands/Session 虚拟化
- 通用 `execute(name, input_json)` 工具
- Credential Vault 安全凭证管理
- Cattle 式沙箱预配（无状态，可水平扩展）
- OpenAI Responses 协议支持
- 全面的测试用例覆盖

### 与 Managed Agent 的区别

| 特性 | Managed Agent | Hosted Managed Agent |
| --- | --- | --- |
| 运行环境 | 自托管（Azure Functions/FastAPI） | Foundry 托管 |
| 沙箱管理 | 自行管理 | Foundry 托管 |
| 认证 | 自定义 | Credential Vault |
| 协议 | 自定义 | OpenAI Responses |

### 使用场景

- 已使用 Azure AI Foundry 的团队
- 需要完全托管的无运维方案
- 企业级凭证安全管理

## 案例选择指南

| 需求 | 推荐案例 |
| --- | --- |
| 多 Agent 内容生成 | AgenticMarketingContentGen |
| 前后端集成 | GHModel.AI |
| 本地/离线部署 | FoundryLocalPipeline |
| 从低代码到生产 | MicrosoftFoundryWithAITKAndMAF |
| 高可靠性长任务 | maf_harness_managed_agent |
| 全托管部署 | maf_harness_managed_hosted_agent |
| 安全评估验证 | FoundryLocalPipeline (Red Teaming) |
| OAuth 授权 | AspNetAgentAuthorization |
| M365/Teams 集成 | M365Agent |
