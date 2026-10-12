---
title: 模型部署
lang: zh-CN
date: 2026-10-12
publish: true
author: azrng
isOriginal: true
category:
  - ai
tag:
  - 大模型
  - 部署
---

> 模型平台与厂商选型见 [大语言模型](./readme.md)，模型命名与量化后缀解读见 [模型命名与量化解读](./modelGuide.md)。

## 部署方式概览

### 1、本地部署

本地部署是指将大语言模型直接部署在本地服务器或设备上，适合对数据隐私和安全性要求较高的场景。

#### 常见工具：

- **Ollama**：简化本地部署和运行过程，支持多种预构建模型，可自定义模型。
- **LangChain**：结合检索增强生成（RAG）技术，从文档数据库中检索信息后输入到大语言模型，提升生成内容的准确性和相关性。
- 使用 LMDeploy 或 TRT-LLM 部署：-企业级推荐
  * LMDeploy 提供企业级部署方案，支持离线处理和在线服务。 -推荐
  * TRT-LLM 支持 BF16 和 INT4/INT8 权重，优化推理速度。

#### 优势：

- 数据隐私和安全性高。
- 可根据需求进行模型微调和优化

### 2、云平台部署

通过云服务提供商部署大语言模型，适合需要高可扩展性和灵活性的场景。

#### 常见工具：

- **Hugging Face Text Generation Inference**：支持在云环境中高效运行大语言模型，提供监控和优化功能。
- **DeepSpeed-MII**：支持多副本负载均衡，适合处理大量用户请求。

#### 优势：

- 可按需扩展资源。
- 提供丰富的监控和管理工具

### 3、容器化部署

使用 Docker 或 Kubernetes 等容器化技术部署大语言模型，适合需要快速部署和灵活管理的场景。

#### 常见工具：

- **Docker**：通过 Docker 容器快速部署和运行大语言模型。
- **Kubernetes**：支持大规模集群管理和弹性扩展。

#### 优势：

- 部署速度快，环境隔离性强。
- 易于扩展和管理

## Ollama

Ollama是一款开源的大模型管理工具，它允许用户在本地便捷地运行多种大型开源模型，包括清华大学的ChatGLM、阿里的千问以及Meta的llama等。目前，Ollama兼容macOS、Linux和Windows三大主流操作系统。

官网：[https://ollama.com/](https://ollama.com/)

### 命令行

```shell
# 查询模型列表
ollama list

# 运行模型
ollama run xxx

# 只拉取不运行
ollama pull xxx

# 查看当前运行的模型
ollama ps

# 停止某一个模型
ollama stop xxx

# 删除模型
ollama rm xxx
```

### 安装部署

#### Windows部署

从Ollama官网下载安装程序，按照安装向导完成安装

#### Linux部署

```shell
curl https://ollama.ai/install.sh | sh
```

#### docker部署

这里我们直接使用docker部署的Ollama，我直接放我的docker-compose文件配置

```yaml
services:
  ollama:
    container_name: ollama
    image: registry.cn-hangzhou.aliyuncs.com/zrng/ollama:0.4.6 # docker.io/ollama/ollama:latest
    ports:
      - 11434:11434 # 对外端口
    restart: always
    environment:
      - OLLAMA_PROXY_URL=http://host.docker.internal:11434/v1 # web ui使用的时候地址填写：http://host.docker.internal:11434
    volumes:
      - E:\Data\ollama:/root/.ollama # 挂载数据
```

+ 访问地址为：[http://IP:11434](http://localhost:11434)
+ image地址配置的是阿里云镜像仓库地址，防止拉取失败
+ OLLAMA_PROXY_URL：这个是后面填写API 域名的时候要用的
+ volumes这个挂载了我的容器数据

执行docker-compose命令后，在容器启动正常后访问Ollama地址判断启动是否正常，比如我这里直接访问：[http://localhost:11434/](http://localhost:11434/)

![image](/ai/1350373-20250101211657228-597289635.png)

### 查看模型列表

通过docker方式部署，通过命令进入Ollama容器中，查看是否存在默认的模型

```shell
# 查询模型列表
ollama list
```

![image](/ai/1350373-20250101211645377-136082156.png)

### 安装llama模型

现在来安装一个开源模型，我找了一个小一点的模型llama3.2进行测试，也可以去模型仓库中寻找合适的模型：[https://ollama.com/library](https://ollama.com/library)

```shell
# 安装大模型
ollama run llama3.2
```

![image](/ai/1350373-20250101211713251-1229119748.png)

安装完成可以通过命令行查看模型是否安装成功

![image](/ai/1350373-20250101211719148-106168135.png)

现在模型已经安装成功，可以在容器内使用命令行使用模型，也可以使用其他UI服务进行使用

### 安装Deepseek模型

模型下载地址：[https://ollama.com/library/deepseek-coder](https://ollama.com/library/deepseek-coder)

```shell
# 拉取模型
ollama pull deepseek-r1:1.5b
ollama pull deepseek-coder:6.7b
ollama pull deepseek-r1:8b

# 运行模型
ollama run deepseek-r1:1.5b
ollama run deepseek-coder:6.7b
ollama run deepseek-r1:8b
```

![image-20250209223838276](/ai/image-20250209223838276.png)

其他自定义配置文件可以看：[Ollama本地部署DeepSeek-R1:14b完全指南](Ollama本地部署DeepSeek-R1:14b完全指南)

## vLLM

vLLM 是一个快速且易于使用的库，专为大型语言模型 (LLM) 的推理和部署而设计。

文档：[https://vllm.hyper.ai/](https://vllm.hyper.ai/)

## LM Studio

专注本地大模型的交互，提供用户界面，支持模型的发现、下载、管理、运行。

官网：[https://lmstudio.ai/](https://lmstudio.ai/)

### 修改源

该软件默认使用的模型源是huggingface，因为一些原因访问不方便，但是可以找到安装路径，比如我的安装路径为 D:\Program Files\LmStudio\LM Studio ，那么就可以去\resources\app\.webpack\main 找到一个叫做`index.js`的文件，使用vscode等工具打开该文件，搜索`huggingface.co` 批量替换为镜像站 `hf-mirror.com` (先关闭软件后修改)
