---
title: 知识库与 RAG 应用
lang: zh-CN
date: 2026-10-12
publish: true
author: azrng
isOriginal: true
category:
  - ai
tag:
  - 知识库
  - RAG
  - 工具
---

## MaxKB

MaxKB = Max Knowledge Base，是一款基于大语言模型和 RAG 的开源知识库问答系统，广泛应用于智能客服、企业内部知识库、学术研究与教育等场景。

官网：[https://maxkb.cn/](https://maxkb.cn/)

### docker 部署

```yaml
services:
  maxkb:
    container_name: maxkb # http://localhost:28080  admin/MaxKB@123..
    image: registry.cn-hangzhou.aliyuncs.com/zrng/maxkb:1.8.0 # 1panel/maxkb
    ports:
      - 28080:8080 # 对外端口
    restart: always
```

+ 访问地址为：IP+28080
+ image 地址配置的是阿里云镜像仓库的地址，防止拉取失败
+ 默认用户名/密码：admin/MaxKB@123..
+ 官方文档地址：[https://maxkb.cn/docs/installation/online_installtion/](https://maxkb.cn/docs/installation/online_installtion/)

访问 [http://localhost:28080/ui/login](http://localhost:28080/ui/login) 登录：

![登录页](/ai/1350373-20250101211727860-1434857526.png)

登录成功后按照弹框提示修改默认密码，然后去系统管理添加模型。

### 添加模型

![添加模型入口](/ai/1350373-20250101211733926-719309424.png)

可以看到支持很多的大模型：

![支持的模型](/ai/1350373-20250101211740901-1045422565.png)

如果大模型是 Ollama，选择私有模型 => Ollama，然后添加模型：

![添加 Ollama 模型](/ai/1350373-20250101211747720-1536757240.png)

### 添加应用

到应用界面添加新应用：

![新建应用](/ai/1350373-20250101211759755-427349766.png)

![应用配置](/ai/1350373-20250101211804832-1218856794.png)

其余使用默认配置，点击右上角的保存并发布，然后点击左侧的概览，可以看到应用信息以及访问地址等：

![应用概览](/ai/1350373-20250101211812682-782853015.png)

直接访问对话地址即可开始咨询，根据电脑配置好坏响应内容的速度也有不同：

![对话界面](/ai/1350373-20250101211817787-736010266.png)

### 嵌入第三方

通过简单的配置可以将该应用嵌入到第三方系统中：

![嵌入第三方](/ai/1350373-20250101211823747-123863987.png)

### 知识库

在知识库选项卡，可以新建知识库并导入文本或 Web 站点等，然后将需要支持咨询的内容上传并向量化：

![新建知识库](/ai/1350373-20250101211830196-829366208.png)

然后在应用界面可以关联新建的知识库，以便返回更想要的内容：

![应用关联知识库](/ai/1350373-20250101211834390-747781163.png)

## AnythingLLM

一体化 AI 应用程序。

官网地址：[https://anythingllm.com](https://anythingllm.com)

文档网站：[https://docs.anythingllm.com/](https://docs.anythingllm.com/)

### 独特优势

* 文档智能问答：支持 PDF、Word 等格式文件索引，通过向量检索技术精准定位文档片段，结合大模型生成上下文关联的答案。
* 本地化部署灵活：可对接 Ollama 等本地推理引擎，无需依赖云端服务，保障敏感数据安全。
* 检索与生成一体化：先检索知识库内容，再调用模型生成答案，确保回答的专业性与准确性。

### 适用场景

* 企业内部文档库的自动化问答（如员工手册、技术文档）；
* 学术研究中的文献摘要与关键信息提取；
* 个人用户管理海量笔记或电子书资源。

### 选型建议

推荐给依赖文档处理的企业、研究机构，或需要构建私有知识库的团队。

## Cherry Studio

多模型协助的"全能指挥官"。

官网：[https://cherry-ai.com](https://cherry-ai.com)

### 独特优势

* 多模型自由切换：支持 OpenAI、DeepSeek、Gemini 等主流云端模型，同时集成 Ollama 本地部署，实现云端与本地模型的灵活调用。
* 内置 300+ 预配置助手：覆盖写作、编程、设计等场景，用户可自定义助手角色与功能，还能在同一对话中对比多个模型输出结果。
* 多模态文件处理：支持文本、PDF、图像等多种格式，集成 WebDAV 文件管理、代码高亮与 Mermaid 图表可视化，满足复杂数据处理需求。

### 适用场景

* 开发者需多模型对比调试代码或生成文档；
* 创作者需快速切换不同风格文案生成；
* 企业需兼顾数据隐私（本地模型）与云端高性能模型混合使用。

### 选型建议

适合技术团队、多任务处理者，或对数据隐私与功能扩展性要求较高的用户。

## Dify

官方文档：[https://enterprise-docs.dify.ai/zh-cn/introduction](https://enterprise-docs.dify.ai/zh-cn/introduction)

+ [Helm 文件配置](https://enterprise-docs.dify.ai/zh-cn/deployment/advanced-configuration/dify-helm-chart)
+ [Dify 文件上传](https://personel-zhouxinle888-a66353926f9185cff28f2bd374a5c3a9dd89d5206.gitlab.io/dify/dify-20.html)
