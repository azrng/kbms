---
title: 提示词与效率工具
lang: zh-CN
date: 2026-10-12
publish: true
author: azrng
isOriginal: true
category:
  - ai
tag:
  - 提示词
  - 效率工具
---

## prompt-optimizer

Prompt Optimizer 是一个强大的 AI 提示词优化工具，帮助你编写更好的 AI 提示词，提升 AI 输出质量。支持 Web 应用和 Chrome 插件两种使用方式。

仓库地址：[https://github.com/linshenkx/prompt-optimizer](https://github.com/linshenkx/prompt-optimizer)

### docker 部署

```shell
# 运行容器（默认配置）
docker run -d -p 80:80 --restart unless-stopped --name prompt-optimizer linshen/prompt-optimizer

# 运行容器（配置API密钥和访问密码）
docker run -d -p 80:80 \
  -e VITE_OPENAI_API_KEY=your_key \
  -e ACCESS_USERNAME=your_username \  # 可选，默认为"admin"
  -e ACCESS_PASSWORD=your_password \  # 设置访问密码
  --restart unless-stopped \
  --name prompt-optimizer \
  linshen/prompt-optimizer
```

## headroom

你在用 LLM 处理日志、文件、RAG 分块时，大部分内容其实都是废话。headroom 在你把文本喂给模型之前，先把它们压缩一遍，号称能砍掉 60% 到 95% 的 token 量，答案质量不变。如果你每天跟 LLM API 账单较劲，或者跑 RAG 时感觉 token 烧得心疼，这个直接装。

仓库地址：[https://github.com/chopratejas/headroom](https://github.com/chopratejas/headroom)

```shell
pip install headroom
```

它是 Python 库，附带 MCP 服务器，可以接进你已有的 Agent 流程。

## Hyperbrowser

[https://www.hyperbrowser.ai](https://www.hyperbrowser.ai)

为 AI 代理提供稳定的浏览器基础设施服务，支持无头浏览器、指纹识别、代理池等功能，提供从免费到企业级的灵活定价方案。
