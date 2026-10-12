---
title: 模型命名与量化解读
lang: zh-CN
date: 2026-10-12
publish: true
author: azrng
isOriginal: true
category:
  - ai
tag:
  - 大模型
---

## 模型命名解读

以下是对 `DeepSeek-R1-Distill-Qwen-1.5B-GGUF` 和 `DeepSeek-R1-Distill-Qwen-1.5B-Q4_K_M` 模型名称的详细解释：

### DeepSeek-R1-Distill-Qwen-1.5B

- **DeepSeek-R1**：这是 DeepSeek 团队开发的模型系列，R1 表示模型版本。
- **Distill**：表示该模型是通过知识蒸馏技术从更大的模型（如 DeepSeek-R1）中蒸馏而来。蒸馏过程使模型体积更小，但保留了大部分性能。
- **Qwen-1.5B**：表示该模型基于 Qwen 架构，参数量为 15 亿。这种架构在推理任务中表现出色。

### 后缀 GGUF

`DeepSeek-R1-Distill-Qwen-1.5B-GGUF`：

- **GGUF**：表示模型采用了 GGUF 格式（General GPU Format），这是一种高效的模型存储格式，支持多种量化方式。
- **适用场景**：这种格式的模型适合在资源受限的环境中运行，例如低配硬件设备。

### 后缀 Q4_K_M

`DeepSeek-R1-Distill-Qwen-1.5B-Q4_K_M`：

- **Q4_K_M**：表示模型采用了 4-bit 量化技术（Q4），并通过 K-Means 聚类优化。这种量化方式显著降低了模型的显存占用，同时保持较高的性能。
- **适用场景**：这种量化版本适合在显存有限的设备上运行，例如仅使用核显的设备

## 嵌入模型对比

各模型的详细说明见 [大语言模型](./readme.md)，下表汇总向量维度与适用场景：

| 模型 | 向量维度 | 特点 | 适用场景 |
| --- | --- | --- | --- |
| bge-m3 | 1024 | 中文嵌入模型，可通过 `ollama pull bge-m3` 获取 | 中文语义检索 |
| text-embedding-3-large | 3072 | OpenAI 的大型嵌入模型 | 对精度要求高的嵌入任务 |
| mxbai-embed-large:335m | — | 高精度嵌入模型 | 高精度短文本处理、文本分类、情感分析、问答系统；RAG 应用的理想选择 |
| nomic-embed-text | 64 ~ 768（可变） | 支持自定义维度 | 需要灵活调整向量维度的场景 |
| all-MiniLM-L6-v2 | 384 | 6 层 Transformer，轻量级，速度快、推理效率高 | 快速原型开发；边缘设备或低配置服务器；对精度要求不高但要求速度 |
| all-MiniLM-L12-v2 | 384 | 12 层 Transformer，精度更高，能更好捕捉语义信息 | 更高精度的语义搜索或文本相似性任务；有足够计算资源时 |
| llama3.2 | 3072 | Meta 开发的开源模型系列 | 由 Meta 开源，原文标注其向量维度值为 3072 |

> `all-MiniLM` 系列的接口调用方式（请求参数与调用示例）见 [大语言模型 - 嵌入接口说明](./readme.md#嵌入接口说明)。
