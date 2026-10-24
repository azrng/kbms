---
title: 其他终端智能体
lang: zh-CN
date: 2026-10-12
publish: true
author: azrng
isOriginal: true
category:
  - ai
tag:
  - 编码智能体
  - 终端工具
---

## pi

仓库地址：https://github.com/earendil-works/pi

### 扩展

#### @narumitw/pi-plan-mode

规划模式，锁死写权限逼我先想清楚

```
pi install npm:@narumitw/pi-plan-mode
```

#### pi-memory

把记忆存成 markdown 文件，跨会话不忘事

```
pi install npm:pi-memory
```

#### pi-web-access

提供网页搜索、正文抓取、来源核验、GitHub 仓库读取、PDF 提取，以及 YouTube 和本地视频理解。

```bash
pi install npm:pi-web-access
```

#### pi-mcp-adapter

一个代理工具接整个 MCP 生态

```
pi install npm:pi-mcp-adapter
```

#### pi-subagents

派子 agent 干审查、侦察这类活

```
pi install npm:pi-subagents
```

#### @narumitw/pi-btw

旁路提问，不打断主线任务

```
pi install npm:@narumitw/pi-btw
```

#### @narumitw/pi-file-context

圈精确文件行喂上下文，不整文件刷屏

```
pi install npm:@narumitw/pi-file-context
```

## omp

### 安装

```
irm https://omp.sh/install.ps1 | iex
```

### 配置主题

```
omp config set theme.dark catppuccin-macchiato
omp config get theme.dark
```

### 全局设置中文

查询安装目录

```
omp config path
```

然后去这个目录下增加AGENTS.md，加入内容

```
# 全局语言规范

1. 默认使用简体中文与用户交流。
2. 任务计划、执行说明、分析摘要、问题诊断、
   代码修改说明、测试结果及最终总结均使用中文。
3. 不要无故输出英文标题、英文解释或英文总结。
4. 代码、类名、方法名、API、命令、文件路径及
   日志原文保留原始语言。
5. 英文报错应保留原文，并提供中文原因分析。
6. 代码注释和 XML 文档注释优先使用简体中文，
   除非项目已有明确的语言规范。
7. 用户明确指定其他语言时，以用户要求为准。

# 语言强制规则

所有面向用户的自然语言说明默认使用简体中文。
保留代码、命令、接口名称及日志原文的原始格式。
```

### 性能处理

#### 关闭 OMP 终端标题动画

在 OMP 外部的 PowerShell 运行：

```
omp config set tui.titleState false
```

随后关闭 OMP，重新启动。

这会禁用终端标题中的运行状态动画，不会关闭 Agent 的任务执行能力。尤其适合排查 Windows 任务栏卡顿问题

### 自定义模型配置

两个配置文件分工：

| 文件 | 作用 |
|---|---|
| `~/.omp/agent/models.yml` | 配置模型、API、能力、上下文、Token 限制 |
| `~/.omp/agent/config.yml` | 配置默认模型、视觉模型等角色 |

#### models.yml 推荐配置

```yaml
providers:
  gitlab-gateway:
    name: gitlab-gateway
    baseUrl: http://aihubgateway-5718-main.sy/v1

    # 根据网关实际支持的 API 选择
    api: openai-responses
    apiKey: GITLAB_GATEWAY_API_KEY
    authHeader: true

    models:
      - id: glm-flash
        name: glm-flash
        reasoning: true
        input:
          - text
          - image
        supportsTools: true
        contextWindow: 1000000
        maxTokens: 128000
```

注意：`image`、`reasoning`、`supportsTools` 及 Token 上限必须与实际模型能力一致。`apiKey` 示例采用环境变量名称，需提前设置。

#### API 协议选择（重要）

`api` 必须与网关实际支持的接口协议一致：

| 网关支持的接口 | OMP 配置 |
|---|---|
| `/v1/responses` | `api: openai-responses` |
| `/v1/chat/completions` | `api: openai-completions` |

网关只支持 `/v1/chat/completions` 时，必须使用 `api: openai-completions`；网关支持 `/v1/responses` 时，可以使用 `api: openai-responses`。

注意：

- `baseUrl` 通常保留 `/v1`，不要重复拼接完整接口路径。
- 不能因为网关兼容 OpenAI，就认定它支持 Responses API。
- 如果两种协议都支持，应优先选择功能完整、兼容性更好的协议。
- 协议选择错误，可能导致请求失败、工具调用异常或推理信息无法正确处理。

#### 重要配置项

| 配置 | 说明 |
|---|---|
| `id` | 模型真实 ID，必须与网关一致 |
| `api` | `openai-responses` 或 `openai-completions` |
| `apiKey` | API 密钥或环境变量名称 |
| `authHeader` | 是否通过 Authorization 请求头传递密钥 |
| `reasoning` | 模型是否支持推理 |
| `input` | 支持 `text`、`image` 等输入 |
| `supportsTools` | 是否支持 Agent 工具调用 |
| `contextWindow` | 上下文窗口大小 |
| `maxTokens` | 最大输出 Token 数量 |

可选高级配置：

- `thinking`：设置推理等级，如 low、medium、high，需后端支持。
- `cost`：配置输入、输出及缓存 Token 价格，便于成本统计。
- `discovery`：通过 `/v1/models` 自动发现模型。
- `compat`：适配部分非标准 OpenAI 兼容网关。
- `imageInputDecoder`：处理特定图片格式兼容问题，例如 WebP。

#### 视觉模型配置

在 `~/.omp/agent/config.yml` 中设置：

```yaml
modelRoles:
  default: gitlab-gateway/glm-flash
  vision: gitlab-gateway/glm-flash
```

只有模型实际支持识图时，才可以配置为 `vision`。

常见报错：

```text
Resolved model xxx does not support image input.
Configure a vision-capable model for modelRoles.vision.
```

排查顺序：

1. 检查 `models.yml` 的 `input` 是否包含 `image`。
2. 检查模型本身及网关是否真正支持图片输入。
3. 检查 `config.yml` 的 `modelRoles.vision`。
4. 检查模型 ID 是否一致，例如 `glm-flash` 与 `glm-5.3-flash`。
5. 检查 `api` 是否匹配网关支持的接口协议。
6. 检查网关是否支持对应的图片传输格式。

#### 常用检查命令

```bash
# 查看 Provider 下的模型
omp models gitlab-gateway

# 查找指定模型
omp models find glm-flash

# 查看模型角色配置
omp config get modelRoles
```

重点确认模型是否正确加载、图片支持状态及视觉模型的实际绑定。

#### 核心原则

OMP 模型配置应当真实反映后端能力，而不是把所有参数都打开：

- 必配：`id`、`api`、`apiKey`、`input`、`contextWindow`、`maxTokens`。
- 重点检查：`reasoning`、`supportsTools`、`modelRoles.vision`。
- 按需配置：`thinking`、`cost`、`discovery`、`compat`。
- 网关只支持 `/v1/chat/completions` 时使用 `openai-completions`；支持 `/v1/responses` 时可使用 `openai-responses`。
- 不要虚报上下文长度或图片能力，否则可能导致请求失败或上下文管理异常。

一句话总结：`models.yml` 负责声明模型能做什么、通过什么协议调用；`config.yml` 负责决定 OMP 用哪个模型做什么，两者必须与网关实际能力保持一致。

## Cursor

[Cursor生成的UI太丑？四种方法减少UI拉扯](https://mp.weixin.qq.com/s/0yY6N5M4vulBS46y0MuKKg)

## Personal AI Infrastructure (PAI)

Daniel Miessler（Fabric 项目作者）打造的个人 AI 基础设施框架，帮你组织 AI 工具链、管理 prompt、让不同 AI 协作。不是装了就完事的工具，而是一套配置模板和最佳实践——如果你觉得"AI 工具太多，不知道怎么串起来"，这个项目就是答案。

- 仓库地址：https://github.com/danielmiessler/Personal_AI_Infrastructure

### 安装

```bash
curl -sSL https://ourpai.ai/install.sh | bash
```
