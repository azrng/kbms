---
title: MCP
lang: zh-CN
date: 2025-04-03
publish: true
author:  azrng
isOriginal: true
category:
  - ai
tag:
  - mcp
---

## 概述

MCP（Model Context Protocol，模型上下文协议）是一种开放协议，由 Anthropic 在 2024 年推出。它就像 AI 应用的“USB-C 接口”，让大型语言模型（LLM）能够安全、高效地连接外部数据源和工具。通过 MCP，AI 应用可以访问数据库、文件、API 等资源，还能调用各种工具来执行任务。简单来说，MCP 就是 AI 的“通用翻译器”，让 AI 能更好地与外部世界互动。



MCP 的主要目的在于解决当前 AI 模型因数据孤岛限制而无法充分发挥潜力的难题，MCP 使得 AI 应用能够安全地访问和操作本地及远程数据，为 AI 应用提供了连接万物的接口。

MCP 官方文档：https://modelcontextprotocol.io/introduction

各个 clients 对 MCP 的支持情况：https://modelcontextprotocol.io/clients



MCP 之后又一 AI Agent 协议刷屏了：AG-UI 协议架构设计剖析：https://mp.weixin.qq.com/s/69WNlIh2E6kr6BiSRFMpuA

模型上下文协议（MCP）：基于Python的端到端实践教程：https://mp.weixin.qq.com/s/5kaMv46SOTxvuWe8itq6kQ

## Mcp商店

mcpstore：[https://www..site/](https://www.mcpstore.site/)

smithery：https://smithery.ai/

魔塔社区：https://modelscope.cn/mcp

AIbase：https://mcp.aibase.cn/explore

## mcp-containers

`mcp-containers` 通过容器化封装实现 MCP 服务器的工业化部署，其技术特性包括：分钟级服务部署能力、持续集成支持的版本更新机制、符合企业级要求的安全架构。该方案已成为 AI 开发者实现复杂系统集成的基础设施，有效支撑从原型验证到生产部署的全流程需求。

仓库地址：https://github.com/metorial/mcp-containers

## 代码使用

### Python Sdk

MCP Python SDK：MCP Client 和 Server 官方 SDK：https://github.com/modelcontextprotocol/python-sdk



安装依赖包

```shell
uv add "mcp[cli]"
```

### .Net Sdk

官方 C# SDK 由原来的 mcpdotnet 发展而来，基于 Microsoft.Extensions.AI 实现。

仓库地址：[https://github.com/modelcontextprotocol/csharp-sdk](https://github.com/modelcontextprotocol/csharp-sdk)

文档地址：[https://modelcontextprotocol.github.io/csharp-sdk/api/ModelContextProtocol.html](https://modelcontextprotocol.github.io/csharp-sdk/api/ModelContextProtocol.html)



[Semantic Kernel也能充当MCP Client](https://mp.weixin.qq.com/s/FTXTZUWwU45sefqMjq6fUw)

如何把ASP.NET Core WebApi打造成Mcp Server：https://mp.weixin.qq.com/s/0fygcmuxZKWBIuAS2oSK4g

## Claude Code MCP 配置

```shell
# 查询mcp列表
claude mcp list
```

### Context7

地址：https://context7.com/dashboard

当前项目可用：

```bash
claude mcp add --transport http context7 https://mcp.context7.com/mcp --header "CONTEXT7_API_KEY: your_api_key"
```

全局可用：

```bash
claude mcp add -s user --transport http context7 https://mcp.context7.com/mcp --header "CONTEXT7_API_KEY: your_api_key"
```

⚠️ 注意：`your_api_key` 需要到 Context7 官网申请

### BrowserTools MCP

让 Claude 直接读取调试信息

地址：https://browsertools.agentdesk.ai/installation

1、 **安装与配置 BrowserTools**
   a. 下载浏览器插件压缩包并解压至本地。
   b. 浏览器扩展页面 → 开启"开发者模式" → **加载未打包扩展程序** → 选择解压文件夹。
   c. 在 VS终端安装服务端并启动（占用端口 **3025**）：
   \- **安装命令**：`claude mcp add browser-tools npx @agentdeskai/browser-tools-mcp@latest`
   \- **启动命令**：`npx @agentdeskai/browser-tools-server@1.2.0`
   d. `claude -c` 继续会话 → `/mcp` 确认 BrowserTools 已连接。
   e. 浏览器 DevTools → 插件设置页：
   \- **截图路径**：
   \- **端口号**：`3025` → 点击 **Test Connection** 显示 "连接成功"。

 2、**自动调试流程**

- Claude 通过 BrowserTools 抓取错误日志 → 自动定位并修复代码。
- 多轮"刷新网页 → 获取日志 → 修复"直至错误提示消失。
- 调试完成：执行 `/clear` 释放上下文 → `/init` 更新记忆 → Git **存档**当前状态。

3、**元素选取器优化界面**

- 可以直接选择制定区域的内容然后咨询模型

### CodeGraph

为 Claude Code 提供代码库全局索引的 MCP 工具，适合处理大代码库和做重构的开发者，省时间也省 token。

安装配置只需三步：

1. 执行安装命令：`npx @colbymchenry/codegraph`，交互式安装程序会自动完成全局安装、配置 Claude Code 的 MCP 服务、设置权限等操作
2. 重启 Claude Code，加载 MCP 服务
3. 进入目标项目目录，执行初始化命令：`codegraph init -i`

初始化完成后，Claude Code 检测到项目下的 `.codegraph` 目录，会自动调用 CodeGraph 的工具完成代码探索，不需要额外给 AI 发指令。

> 注意：目前官方只做了 Claude Code 的适配，暂未兼容其他 AI 编码工具。如果索引速度慢，可能是使用了 WASM 版本的 SQLite（比原生版本低 5-10 倍），安装对应系统的 C 编译工具后重新编译 better-sqlite3 即可切换到原生后端，大幅提升索引速度。

开源地址：https://github.com/colbymchenry/codegraph

### 智谱视频理解

当前项目可用：

```bash
claude mcp add zai-mcp-server --env Z_AI_API_KEY=your_api_key -- npx -y @z_ai/mcp-server
```

全局可用：

```bash
claude mcp add -s user zai-mcp-server --env Z_AI_API_KEY=your_api_key -- npx -y @z_ai/mcp-server
```

⚠️ 注意：`your_api_key` 需替换为你在智谱中生成的 API Key。

### Cloudflare部署

```shell
# 设置环境变量
export CLOUDFLARE_API_TOKEN="你的令牌"

# 文档查询服务
claude mcp add cloudflare-docs --transport sse https://docs.mcp.cloudflare.com/sse

# 部署服务器
claude mcp add cloudflare-builds https://builds.mcp.cloudflare.com/sse --transport sse -e CLOUDFLARE_API_TOKEN=$CLOUDFLARE_API_TOKEN

# 安装资源绑定服务器
claude mcp add cloudflare-bindings https://bindings.mcp.cloudflare.com/sse --transport sse -e CLOUDFLARE_API_TOKEN=$CLOUDFLARE_API_TOKEN
```

可以参考这个：https://www.yuque.com/xiaoyou-nwu1w/ooi105/vl8z9ff4espztcks
