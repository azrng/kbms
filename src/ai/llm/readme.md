---
title: 大语言模型
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

> 本目录围绕大语言模型的选型与落地展开，覆盖：**模型平台 → 命名解读 → 部署**。
>
> - 本页：模型平台、主流厂商与嵌入模型
> - [模型命名与量化解读](./modelGuide.md)：模型名称、量化后缀的含义与嵌入模型对比
> - [模型部署](./deploy.md)：本地 / 云平台 / 容器化部署与 Ollama、vLLM、LM Studio 等工具

## 模型平台

### 在线模型平台

[GitHub Models](https://github.com/marketplace/models)

[硅基流动](https://cloud.siliconflow.cn/models)

### Hugging Face

是一个综合性AI平台，提供了大量的预训练模型，还支持模型训练、微调、部署等功能。适合开发者或研究人员，需要对模型进行深度定制和优化，或者需要使用丰富的工具和库进行开发。

[https://huggingface.co/](https://huggingface.co/)

国内镜像站：[https://hf-mirror.com/](https://hf-mirror.com/) 、[https://www.modelscope.cn/](https://www.modelscope.cn/models)

如果想下载GGUF文件搜索的时候记得带上GGUF，例如deepseek-r1-8b-gguf

### Ollama library

提供了大量的预训练模型，专注于模型的部署和使用，适用于希望快速使用预训练模型进行实际应用的用户，降低了使用门槛。适合普通用户或小型团队，希望快速部署和使用预训练模型，而不需要复杂的配置和开发。

网站：[https://ollama.com/library](https://ollama.com/library)

### 中转服务商

LLM中转服务可用性：[https://relaypulse.top/](https://relaypulse.top/)

## 厂商

### 阿里云

qwen2.5-7b(通义千问)

### 智谱

官网地址：https://open.bigmodel.cn/

ANTHROPIC接口地址：https://open.bigmodel.cn/api/anthropic

OpenAi编码套餐地址：https://open.bigmodel.cn/api/coding/paas/v4

### llama

llama3.2：由 Meta 开发的开源人工智能模型系列，向量维度值为3072

### DeepSeek

* **DeepSeek-R1**：专注于逻辑推理、问题解决和教育工具，教育平台、研究工具
* **DeepSeek-Coder**：IDE集成、编程平台，专注于编程辅助，包括代码生成、调试和优化

DeepSeek生态全家桶来：https://github.com/deepseek-ai/awesome-deepseek-integration

## 嵌入模型

如何查找中文嵌入模型：[https://blog.csdn.net/2401_85378759/article/details/144737938](https://blog.csdn.net/2401_85378759/article/details/144737938)

各模型的向量维度与适用场景对比见 [模型命名与量化解读](./modelGuide.md)。

### bge-m3

向量维度1024

```shell
ollama pull bge-m3
```

### text-embedding-3-large

OpenAI的大型嵌入模型，输出维度为3072

### mxbai-embed-large

mxbai-embed-large:335m： 嵌入模型

- 适用于高精度短文本处理、文本分类、情感分析、问答系统等。
- 是 RAG 应用的理想选择，适合结合生成模型构建高效的检索增强系统

### nomic-embed-text

`nomic-embed-text` 模型的嵌入向量维度是可变的。该模型支持自定义维度，范围从 **64 到 768**

### all-MiniLM

文本生成嵌入变量（Text Embedding with Variables）是一种将文本数据转换为数值向量（嵌入向量）的技术，通常用于自然语言处理（NLP）任务。嵌入变量的原理基于将文本中的单词、短语或句子映射到高维空间中的点（向量），使得语义相似的文本在向量空间中距离更近。

**适用任务**：广泛应用于语义搜索、文本聚类、句子相似度计算、信息检索等

- 适合需要快速推理和低资源消耗的场景，如实时搜索和推荐系统。
- 由于其较小的模型尺寸，适合在边缘设备或移动设备上部署。

#### all-MiniLM-L6-v2

- **特点**：这是一个轻量级模型，具有6层Transformer结构，输出384维的嵌入向量。
- **优点**：
  - **速度快**：模型较小，适合资源受限的场景。
  - **推理效率高**：适合快速开发和部署。
- **适用场景**：
  - 需要快速原型开发的项目。
  - 对计算资源有限制（如在边缘设备或低配置服务器上运行）。
  - 任务对精度要求不高，但对速度要求高。

#### all-MiniLM-L12-v2

- **特点**：具有12层Transformer结构，输出384维的嵌入向量。
- **优点**：
  - **精度更高**：相比L6版本，L12版本在语义相似性任务上表现更好。
  - **适合复杂任务**：能够更好地捕捉语义信息。
- **适用场景**：
  - 需要更高精度的语义搜索或文本相似性任务。
  - 有足够的计算资源来支持稍大的模型。

### 嵌入接口说明

#### 请求参数

调用 `all-MiniLM` 模型的嵌入接口时，通常需要以下参数：

- **`model`**：指定使用的模型名称，例如 `"all-MiniLM-L6-v2"` 或 `"all-MiniLM-L12-v2"`。
- **`input`**：需要嵌入的文本或文本列表。可以是单个字符串，也可以是字符串数组。
- **`truncate`**（可选）：是否截断输入文本以适应模型的最大上下文长度。默认值为 `true`。
- **`options`**（可选）：其他模型参数，具体参数需参考模型文档。
- **`keep_alive`**（可选）：控制模型在请求完成后保持加载到内存中的时间，默认为 `5m`。

#### 调用示例

url示例：`http://localhost:1234/v1/embeddings`

单个文本嵌入：

```json
{
  "model": "all-MiniLM-L6-v2",
  "input": "This is a sample sentence for embedding."
}
```

多个文本嵌入：

```json
{
  "model": "all-MiniLM-L6-v2",
  "input": ["This is a sample sentence.", "Another sentence for embedding."]
}
```
