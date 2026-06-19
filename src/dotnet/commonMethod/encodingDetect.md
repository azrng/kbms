---
title: .NET 编码检测：UTF.Unknown 库
lang: zh-CN
date: 2026-03-20
publish: true
author: azrng
isOriginal: true
category:
  - dotnet
tag:
  - 编码
  - UTF-8
  - GBK
---

## 问题背景

读取外部文本文件时，GB2312、GBK 和 UTF-8 混用经常导致乱码。

### 常见误区：Try-Catch 不靠谱

```csharp
// ❌ 错误写法：UTF-8 解码不会抛异常，只会产生乱码
string textContent;
try
{
    textContent = Encoding.UTF8.GetString(content);
}
catch
{
    textContent = Encoding.GetEncoding("GB2312").GetString(content);
}
```

`Encoding.UTF8.GetString` 非常宽容，即使字节流不符合 UTF-8 规则也会尽力解析，不会抛出异常。

---

## 解决方案：UTF.Unknown 库

### 安装

```xml
<PackageReference Include="UTF.Unknown" Version="2.6.0" />
```

### 使用

```csharp
using UtfUnknown;

private static Encoding DetectEncoding(byte[] content)
{
    var result = CharsetDetector.DetectFromBytes(content);

    if (result.Detected?.Encoding != null)
    {
        return result.Detected.Encoding;
    }

    // 检测失败时回退到 GB2312
    return Encoding.GetEncoding("GB2312");
}
```

### 使用示例

```csharp
byte[] fileBytes = File.ReadAllBytes(filePath);
Encoding encoding = DetectEncoding(fileBytes);
string content = encoding.GetString(fileBytes);
```

---

## 要点

- **不要依赖 try-catch**：解码操作通常不抛异常，只产生乱码
- **使用专业库**：`UTF.Unknown` 通过字节流特征精准识别编码
- **优雅降级**：检测失败时回退到 GB2312 作为兜底
