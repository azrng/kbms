---
title: AI项目
lang: zh-CN
date: 2024-07-20
publish: true
author: azrng
isOriginal: true
category:
  - ai
tag:
  - ai
  - project
---

## 代码知识库项目

### opendeep

https://opendeep.wiki/

OpenDeepWiki是一款基于 .NET 10 和 AgentFramework 构建的 AI 驱动代码知识库系统，通过人工智能技术将代码仓库自动转换为结构化的知识库，帮助开发者更好地理解代码仓库，提供代码分析、文档生成和知识图谱构建等功能。

### KoalaWiki

一个AI驱动的代码知识库系统，能够自动分析代码仓库并生成详细的文档。

在线演示：https://koala.token-ai.cn/

### CodeGraph

为 Claude Code 提供代码库全局索引的 MCP 工具，适合处理大代码库和做重构的开发者，省时间也省 token。

安装配置只需三步：

1. 执行安装命令：`npx @colbymchenry/codegraph`，交互式安装程序会自动完成全局安装、配置 Claude Code 的 MCP 服务、设置权限等操作
2. 重启 Claude Code，加载 MCP 服务
3. 进入目标项目目录，执行初始化命令：`codegraph init -i`

初始化完成后，Claude Code 检测到项目下的 `.codegraph` 目录，会自动调用 CodeGraph 的工具完成代码探索，不需要额外给 AI 发指令。

> 注意：目前官方只做了 Claude Code 的适配，暂未兼容其他 AI 编码工具。如果索引速度慢，可能是使用了 WASM 版本的 SQLite（比原生版本低 5-10 倍），安装对应系统的 C 编译工具后重新编译 better-sqlite3 即可切换到原生后端，大幅提升索引速度。

开源地址：https://github.com/colbymchenry/codegraph

## 网站设计

### readdy

https://readdy.ai/

## 照片上色

### DeOldify

关于给黑白照片上色的软件DeOldify，是基于AI深度学习技术开发的开源软件，功能强大，大小仅123MB，免安装便携版。

Github：[https://github.com/jantic/DeOldify](https://github.com/jantic/DeOldify)

参考说明文档：[https://mp.weixin.qq.com/s/-fP9RE90-A9sblOu-RTwPA](https://mp.weixin.qq.com/s/-fP9RE90-A9sblOu-RTwPA)

## 换脸

### Deep-Live-Cam

基于换脸+LivePortrait的技术路线，https://github.com/hacksider/Deep-Live-Cam


## 浏览器基础设施

### Hyperbrowser

https://www.hyperbrowser.ai

为AI代理提供稳定的浏览器基础设施服务，支持无头浏览器、指纹识别、代理池等功能，提供从免费到企业级的灵活定价方案。


## 其他资料

https://mp.weixin.qq.com/s/oNTfflVQuXiRQnAmumBo4w | 实测 Manus：首个真干活 AI，中国造（附50个用例 + 拆解）
https://mp.weixin.qq.com/s/moAjXd0X_mU6hhPaQiAkqg | 告别重复操作！这款开源浏览器AI自动化神器，效率提升300%，所有浏览器操作一键搞定

https://mp.weixin.qq.com/s/90GTaLd9nbt_gwLcU1Td_Q | 如何让一个不懂提示词的人优化提示词？AI提示词优化指南


https://mp.weixin.qq.com/s/-gmkvqYjVruL63lP-fonuw | 使用vLLM部署工具加速QWQ，推理速度比ollama更快、并发更高
