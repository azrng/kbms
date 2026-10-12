---
title: AI 设计与生成工具
lang: zh-CN
date: 2026-10-12
publish: true
author: azrng
isOriginal: true
category:
  - ai
tag:
  - 设计
  - 生成工具
---

## Google Stitch

Google Labs 孵化的实验性 AI UI 设计工具，2025 年 Google I/O 首次亮相，底层由 Gemini 驱动。输入文字/草图/截图即可生成 UI 界面设计和前端代码。

网址：[https://stitch.withgoogle.com/](https://stitch.withgoogle.com/)

### 核心能力

| 功能 | 说明 |
| --- | --- |
| 文字转 UI | 描述"一个外卖首页"→ 秒出高保真界面 |
| 图/草图转 UI | 上传餐巾纸草图或线框图 → 数字化 UI |
| 生成代码 | 输出干净的 HTML/CSS，可导出给开发用 |
| 导出到 Figma | 一键粘贴进 Figma，保留图层结构继续精修 |
| 交互原型 | 多屏链接 → 可点击走通用户流程 |
| 模式选择 | Gemini 2.5 Flash（快速）/ Gemini 2.5 Pro（精细） |

### 适用场景

从 0 到 1 快速出界面原型/前端代码，省掉手动拉线的过程。适合创业者做 MVP、PM 画原型、开发者省写样式的时间。

> 目前仍是 Google Labs 实验项目，免费、Beta 状态，用 Google 账号登录直接使用。

## Google AI Studio Apps

Google AI Studio 的 App 构建工作台，用自然语言描述需求即可直接生成可运行的 App。

网址：[https://aistudio.google.com/apps](https://aistudio.google.com/apps)

### 核心能力

- **自然语言生成 App**：用中文/英文写提示词描述需求，AI 自动生成原生应用（非网页套壳）
- **Build an Android**：输入提示词后自动生成原生 Android 应用，支持在线预览、生成 APK 下载安装、推送至 Google Play 内部测试轨道
- **完整产品链路**：输出的不仅是界面，而是带业务逻辑的完整 App 产品，包含打包和发布流程
- **多模态处理**：支持文字、图片、音频、视频、PDF、CSV 等多种输入格式
- **Gemini 模型驱动**：基于最新 Gemini 多模态生成式 AI 模型，支持最高 100 万 token 上下文窗口

### 适用人群

不会写代码的普通人 / 独立开发者，无需编程基础即可创建可运行的原生应用。

### 两者对比

| 维度 | AI Studio Apps | Stitch |
| --- | --- | --- |
| 产出物 | 完整可运行的 App（Android APK） | UI 界面 + 前端代码（HTML/CSS） |
| 核心场景 | "我要做一个 App 产品" | "我要把这个界面/原型画出来" |
| 是否包含逻辑 | 有（AI 写业务逻辑） | 主要是界面层 |

## readdy

[https://readdy.ai/](https://readdy.ai/)

AI 设计工具，可生成专业界面。Claude Code 结合 Readdy 的用法：Claude 生成精简需求文档 → 粘贴到 Readdy，Readdy AI 生成专业深色界面，可用 Selector 逐块微调，下载前端代码并与后端融合（收费）。

## ppt-master

AI 将文档或主题转化为真实的原生 PowerPoint 演示文稿——配备原生形状、过渡和动画，按需提供数据支持的图表和表格，演讲者笔记的音频解说，并支持您自己的 .pptx 模板。

github：[https://github.com/hugohe3/ppt-master](https://github.com/hugohe3/ppt-master)

## DeOldify

关于给黑白照片上色的软件 DeOldify，是基于 AI 深度学习技术开发的开源软件，功能强大，大小仅 123MB，免安装便携版。

Github：[https://github.com/jantic/DeOldify](https://github.com/jantic/DeOldify)

参考说明文档：[https://mp.weixin.qq.com/s/-fP9RE90-A9sblOu-RTwPA](https://mp.weixin.qq.com/s/-fP9RE90-A9sblOu-RTwPA)

## Deep-Live-Cam

基于换脸 + LivePortrait 的技术路线。

github：[https://github.com/hacksider/Deep-Live-Cam](https://github.com/hacksider/Deep-Live-Cam)
