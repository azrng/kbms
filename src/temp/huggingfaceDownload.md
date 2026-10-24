# qwen3vl_8b_int8_convrot.safetensors 下载方案

## 文件信息

| 项 | 值 |
|---|---|
| 文件名 | `qwen3vl_8b_int8_convrot.safetensors` |
| 大小 | 9,350,798,360 字节（≈ 9.35 GB） |
| 用途 | ComfyUI Qwen-Image 2.1 文本编码器（Qwen3-VL 8B INT8 ConvRot 量化） |
| 来源仓库 | HF: `Comfy-Org/Qwen-Image-2.1` → `text_encoders/qwen3vl_8b_int8_convrot.safetensors` |
| 内容标识 | ETag / xet hash: `05a94aec9c924009948b9904abc0dbb7d5ec718728d330126f7feeabdc15760d` |

原始签名链接（hf CDN，直连有效但慢）：
`https://us.aws.cdn.hf.co/xet-bridge-us/6ab000f1a587030ee97d13cf/05a94aec9c924009948b9904abc0dbb7d5ec718728d330126f7feeabdc15760d?...`（带 Expires/Policy/Signature，2026-10-24 实测 200 OK，支持 Range 断点续传）

## 测速对比（2026-10-24 实测）

| 通道 | 速度 | 9.35 GB 预计耗时 |
|---|---|---|
| 原始 URL 直连（新加坡节点） | ~205 KB/s | ~13 小时 |
| hf-mirror.com（国内镜像） | ~405 KB/s | ~6.5 小时 |
| **ModelScope 魔搭（选用）** | **~12.5 MB/s** | **~13 分钟** |

## 换源依据（同一文件验证）

- 原始 URL 响应头：`content-length: 9350798360`，`etag: "05a94aec…5760d"`
- HF 仓库 `Comfy-Org/Qwen-Image-2.1` 该文件 ETag 与上完全一致 → 同一文件
- ModelScope 官方同步了 `Comfy-Org/Qwen-Image-2.1`（含 `text_encoders/qwen3vl_8b_int8_convrot.safetensors`，LFS）
- 排除项：`Stick9190/qwen3vl_8b_int8_convrot` 为另一文件（10.99 GB，ETag 不同），勿下错

## 推荐下载命令（curl，支持断点续传 + 自动重试）

```bash
curl -L -C - --retry 8 --retry-delay 5 --retry-all-errors \
  -o qwen3vl_8b_int8_convrot.safetensors \
  "https://www.modelscope.cn/models/Comfy-Org/Qwen-Image-2.1/resolve/master/text_encoders/qwen3vl_8b_int8_convrot.safetensors"
```

中断后重跑同一命令即可续传（`-C -`）。

### 备选通道

```bash
# hf-mirror（慢，应急用）
curl -L -C - --retry 8 --retry-all-errors \
  -o qwen3vl_8b_int8_convrot.safetensors \
  "https://hf-mirror.com/Comfy-Org/Qwen-Image-2.1/resolve/main/text_encoders/qwen3vl_8b_int8_convrot.safetensors"

# 原始签名链接（签名 2026 年内有效，Expires=1792825820；直连慢）
```

### Python 方式（modelscope SDK）

```python
from modelscope import snapshot_download
snapshot_download("Comfy-Org/Qwen-Image-2.1",
                  allow_patterns=["text_encoders/qwen3vl_8b_int8_convrot.safetensors"],
                  local_dir=".")
```

## 下载后校验

1. 大小必须精确等于 `9350798360` 字节：

```bash
stat -c %s qwen3vl_8b_int8_convrot.safetensors   # Git Bash / Linux
certutil -hashfile qwen3vl_8b_int8_convrot.safetensors SHA256   # Windows cmd
```

2. SHA-256（2026-10-24 下载完成后已实测校验通过）：

```
8bfd0f6e12abf2d2d697ecc888e5e90b0d6741d6708f05799f53afa560452e8f
```

来源：ModelScope `repo/files` API 返回的权威 `Sha256`；本地 `certutil -hashfile … SHA256` 计算结果与其一致，大小 9,350,798,360 字节一致。（HF 页面上的 ETag `05a94aec…5760d` 是 xet 内容标识，与 SHA-256 不同属正常，不作比对依据。）

## 存放位置（ComfyUI）

放入 `ComfyUI/models/text_encoders/qwen3vl_8b_int8_convrot.safetensors`。
配套：`Comfy-Org/Qwen-Image-2.1` 同仓库的 diffusion model（`qwen_image_2.1_int8_convrot.safetensors`，6.76 GB）与 VAE，可按需用同一 ModelScope 通道下载。
