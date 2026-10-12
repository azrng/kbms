---
title: Claude Code
lang: zh-CN
date: 2026-10-12
publish: true
author: azrng
isOriginal: true
category:
  - ai
tag:
  - 编码智能体
  - ClaudeCode
---

## 使用技巧

```shell
# 增加思考
提示词 + ultra think 让 Claude 全自动美化

# 通过#来设置记忆
```

### 核心文件

```
○ 新建 claude.md → 项目记忆规则
○ 新建 todo.md → 待办任务清单

在 claude.md 设定两条规矩
  ○ 所有代办需写入 todo.md，完成后打勾。
  ○ 使用 Task 工具创建并行 子代理 提升开发效率。
```

### 网页设计

```
● 方法一：Claude 盲盒设计
  ○ 提示词 + ultra think 让 Claude 全自动美化
  ○ 随机生成配色、图标、伪导航，效果不可预测
● 方法二：截图复刻
  ○ 拖入参考网站的截图
  ○ 指令：只改样式与布局，功能不变
  ○ 输出深色紫主题，但局部需手动打磨
● 方法三：tweakcn CSS 主题：https://tweakcn.com/
  ○ 在 tweakcn 挑选主题 → Copy CSS + 截图交给 Claude
  ○ 快速套用高质量样式，弹窗等局部需二次调整
● 方法四：Readdy AI 设计（推荐、收费）
  ○ Claude 生成精简需求文档 → 粘贴到 Readdy
  ○ Readdy AI 生成专业深色界面，可用 Selector 逐块微调
  ○ 下载前端代码并与后端融合，最终效果专业美观
```

## 安装

```shell
# 首先安装nodejs，然后安装这个
npm i -g @anthropic-ai/claude-code@latest --registry=https://registry.npmmirror.com

# vscode的话就安装插件
Claude Code for VS Code

# 升级
claude update
```

强制设置环境变量(用户级别)

```sh
# 设置用户级环境变量（永久生效）
[System.Environment]::SetEnvironmentVariable(“ANTHROPIC_BASE_URL”, “https://open.bigmodel.cn/api/anthropic”, [System.EnvironmentVariableTarget]::User)
[System.Environment]::SetEnvironmentVariable(“ANTHROPIC_AUTH_TOKEN”, “xxx”, [System.EnvironmentVariableTarget]::User)

# 新开一个窗口查看
echo $env:ANTHROPIC_BASE_URL
```

其他资料文档：https://docs.88code.org/ClaudeCode/Windows.html

参考资料：https://www.yuque.com/xiaoyou-nwu1w/ooi105/bwakf9w86vzuoace

## Claude Code 上手指南 (claude-howto)

一份比官方文档更实用的 Claude Code 教程，用 Mermaid 图画出工作流，附带可直接复制粘贴的模板（代码审查流水线、自定义代理团队等）。10 个模块，从 Slash Commands 到 Plugins，渐进式学习路径，总计 11-13 小时。教程类项目，不用安装——直接看仓库即可。

- 仓库地址：https://github.com/luongnv89/claude-howto
- 在线页面：https://luongnv.com/claude-howto/

## Claude Code Statusline Pro

为 Claude Code 量身定制的智能状态栏系统。

仓库地址：https://github.com/Wangnov/claude-code-statusline-pro

### 核心特性

- **三大主题系统**：Classic、Powerline、Capsule 主题，自适应终端能力
- **灵活的配置系统**：支持 TOML 配置文件和命令行参数覆盖
- **精准 Token 计算**：与 Claude 官方 API 完全一致的 token 统计，支持渐变可视化进度条
- **智能状态识别**：基于 tokens 数量精准识别 Thinking vs Ready 状态
- **预设系统**：通过字母组合快速配置组件排布 (PMBTURS, MT, BT)
- **跨平台兼容**：Windows、macOS、Linux 智能适配，支持各种终端
- **多行小组件系统**：支持网格布局、静态/API 数据源、检测与过滤器，自由扩展状态栏
- **高性能优化**：缓存机制，300ms 更新间隔，符合 Claude Code 官方建议
- **双语支持**：中英双语配置界面和错误提示
- **Rust 引擎**：提供原生 Rust 内核，更快更稳

### Rust 重写优化亮点

- **原生 git2 仓库分析**：直接获取分支、状态、stash 等信息，避免频繁 Shell 调用，在大型仓库中依然流畅
- **多层缓存体系**：组件级内存缓存结合会话持久化存储，减少重复解析配置与历史数据的 IO
- **Tokio 异步运行时**：多线程调度渲染与文件操作，维持官方推荐的 300ms 更新节奏并提升稳定性
- **增量 Transcript 解析**：按偏移量增量读取 `.jsonl`，并通过原子写入持久化快照，避免大型日志反复全量扫描
- **配置与扩展缓存**：合并配置结果可复用并附带差异报告，多行组件缓存上次 Widget 内容以降低 I/O 和网络抖动

### 快速开始

在项目根目录或 `$USER` 目录创建 `.claude/settings.json`：

```json
{
  "statusLine": {
    "type": "command",
    "command": "npx ccsp@latest"
  }
}
```

> 兼容说明：旧命令 `npx claude-code-statusline-pro@latest` 仍可继续使用，并会提示迁移。建议将现有配置更新为 `npx ccsp@latest`。

保存文件后，重新打开 Claude Code 即可看到专业版状态栏：

```
📁 my-project | 🤖 S4 | 🌿 main | 📊 [████████████░░░] 80.1%(160k/200k) | $21.07 | ✅ Ready
```

### 预设系统 - 字母组合配置

通过简单的字母组合快速定制状态栏显示内容：

| 字母 | 含义 |
| --- | --- |
| P | Project（项目名称） |
| M | Model（模型信息） |
| B | Branch（Git 分支） |
| T | Tokens（Token 使用情况） |
| U | Usage（使用量统计） |
| R | Rate Limit（Claude.ai 订阅计划 5h / 7d 限额） |
| S | Status（状态信息） |

快速配置命令（写在 settings.json 中，并非在终端直接执行）：

```shell
# 显示所有组件（推荐）
npx ccsp@latest --preset PMBTURS --theme powerline

# 只显示模型、Token和使用量
npx ccsp@latest --preset MTU --theme classic

# 只显示分支和Token信息
npx ccsp@latest --preset BT --theme capsule
```

## Career-Ops 求职助手

一个基于 Claude Code 的求职系统，打包了 14 种技能模式，帮你批量投简历、写求职信、填申请表，还能生成 PDF 简历。装到你的 Claude Code 里就能用。

- 仓库地址：https://github.com/santifer/career-ops
