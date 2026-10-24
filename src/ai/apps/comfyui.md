---
title: ComfyUI
lang: zh-CN
date: 2026-10-24
publish: true
author: azrng
isOriginal: true
category:
  - ai
tag:
  - ComfyUI
  - 图像生成
  - Qwen-Image
---

ComfyUI 是基于节点流程的 Stable Diffusion 图形化界面，通过拖拽节点搭建图像生成工作流。本文以 Qwen-Image-2.1 模型为例，介绍从客户端安装、模型下载到提示词生成的完整本地部署流程。

## 安装 ComfyUI

只有最新版 ComfyUI 客户端才支持 Qwen-Image-2.1，之前安装过务必升级到最新版本。

下载地址：[https://comfy.org/](https://comfy.org/)

## 下载模型

Huggingface：[https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF/tree/main](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF/tree/main)

下载后将模型放入对应文件夹：

```plain
ComfyUI/
└── models/
    ├── diffusion_models/
    │   └── qwen-image-2.1-UC-Q4_K_M.gguf
    ├── text_encoders/
    │   └── qwen3vl_8b_int8_convrot.safetensors
    └── vae/
        └── qwen_image_2.1_vae_bf16.safetensors
```

| 文件 | 作用 |
| --- | --- |
| qwen-image-2.1-UC-Q4_K_M.gguf | 图像生成主模型 |
| qwen3vl_8b_int8_convrot.safetensors | 文本编码器 |
| qwen_image_2.1_vae_bf16.safetensors | 图像编码与解码 |

## 安装 GGUF 加载插件

GGUF 量化模型需要配套插件加载。在 ComfyUI 根目录执行：

```shell
cd custom_nodes
git clone https://github.com/leejet/ComfyUI-GGUF.git
```

按插件说明安装 Python 依赖，并重启 ComfyUI：

```shell
# 1. 确认文件存在
Test-Path .\.venv\Scripts\python.exe
Test-Path ..\standalone-env\uv.exe

# 2. 使用 uv 给 ComfyUI 的环境安装 GGUF 依赖
& "..\standalone-env\uv.exe" pip install `
  --python ".\.venv\Scripts\python.exe" `
  -r ".\custom_nodes\ComfyUI-GGUF\requirements.txt" `
  --index-url "https://pypi.tuna.tsinghua.edu.cn/simple"
```

安装成功后验证：

```shell
.\.venv\Scripts\python.exe -c "import gguf; print('GGUF 依赖安装成功')"
```

最后重启 ComfyUI，如果出现报错，选择合适的文件即可，然后就可以输入提示词生成了。

## 提示词参考

正向提示词：

```plain
一位25岁左右的年轻成年亚洲女性，容貌精致漂亮，符合大众审美，五官比例协调，脸型自然柔和，皮肤白皙通透且具有真实的皮肤纹理，明亮有神的杏仁形眼睛，精致自然的眉毛，立体但柔和的鼻梁，饱满自然的嘴唇，乌黑柔顺的长发，发丝细节清晰。

身材高挑匀称，拥有优雅自然的女性曲线，比例协调，姿态自信优雅。穿着一件高级感十足的黑色修身丝绸晚礼服，剪裁贴合身材，优雅的领口设计，展现迷人的身材轮廓，但整体保持高级、时尚、得体。

她自然地站在镜头前，身体略微侧身，肩颈线条优美，一只手自然放在腰间，直视镜头，表情自信、妩媚而自然，带有轻微的性感气质和成熟魅力。

高端时尚杂志人像摄影，电影级布光，柔和的主光，细腻的轮廓光，真实自然的肤质，清晰的发丝细节，真实的人体比例，浅景深，背景柔和虚化，85mm人像镜头，专业摄影棚，照片级真实感，超高细节，商业时尚摄影，奢华、高级、优雅、自然。
```

负面提示词：

```plain
低质量，模糊，卡通，动漫，插画，塑料皮肤，蜡像感，假脸，五官畸形，五官不对称，眼睛大小不一致，脸部变形，身体比例异常，人体结构错误，手部畸形，多余手指，缺失手指，多余肢体，多人，重复人物，过度磨皮，过度美颜，浓妆，夸张胸部，不自然身材，低俗姿势，色情姿势，裸露，过度暴露，杂乱背景，文字，水印，Logo
```

## 多图片编辑

多图输入时可用类似提示词做换装等编辑操作：

```plain
保持图像1中人物的特征和姿势不变，将图像2中的浅蓝色牛仔衬衫穿在人物身上，保留原有的面部特征、发型、体型和姿势，牛仔衬衫自然贴合身体，具有逼真的牛仔布纹理和自然的衣物褶皱，保留原始背景和原有光线效果，呈现高端时尚摄影风格，细节清晰锐利。
```
