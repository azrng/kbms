---
title: SkillHub 安装指南
lang: zh-CN
date: 2026-03-21
publish: true
author: azrng
isOriginal: true
category:
  - soft
tag:
  - 工具
  - Python
  - uv
---

## 导读

在 Windows 下使用 `uv`（Python 包管理器）安装 SkillHub 时，可能遇到"找不到 Python"与"python3"依赖问题。本文记录了完整的排查和解决过程。

---

## 问题一：Python 找不到

执行安装脚本时报错：

```bash
$ curl -fsSL https://skillhub-1388575217.cos.ap-guangzhou.myqcloud.com/install/install.sh | bash
Python was not found; run without arguments to install from the Microsoft Store, or disable this shortcut from Settings > Apps > Advanced app settings > App execution aliases.
```

**原因**：使用 `uv` 管理 Python，没有将 Python 添加到全局 PATH。

### 解决方案：修正环境变量优先级

1. 找到 `uv` 管理的 Python 路径：

```bash
uv python list
# 输出示例：cpython-3.13.9-windows-x86_64-none  AppData\Roaming\uv\python\cpython-3.13.9-windows-x86_64-none\python.exe
```

2. 将 Python 路径加入系统环境变量 `PATH`，并移动到 `WindowsApps` **之前**

3. 验证：

```bash
python --version
# Python 3.13.9
```

---

## 问题二：App Execution Aliases 干扰

Windows 的"应用执行别名"功能会拦截 `python.exe` 的调用。

**解决方法**：

1. 打开 **Windows 设置** → **应用** → **高级应用设置** → **应用执行别名**
2. 找到 `python.exe` 和 `python3.exe`，将开关**关闭**

---

## 问题三：缺少 python3 命令

安装脚本要求 `python3` 命令，但 `uv` 管理的目录下只有 `python.exe`。

**解决方法**：

进入 `uv` 的 Python 安装目录，将 `python.exe` 复制并重命名为 `python3.exe`：

```bash
# 验证
where python3
# C:\Users\Azrng\AppData\Roaming\uv\python\cpython-3.13.9-windows-x86_64-none\python3.exe
```

---

## 问题四：skillhub 命令找不到

安装成功后执行 `skillhub -v` 报错 `command not found`。

**解决方法**：

将 SkillHub 的 bin 目录加入 PATH 环境变量：

```
C:\Users\Azrng\.local\bin
```

验证：

```bash
skillhub -v
# skillhub 2026.3.18

skillhub install github
# Installed: github -> C:\Users\Azrng\.local\bin\skills\github
```

---

## 总结

在 Windows 下使用 `uv` 安装 SkillHub 的 4 个关键点：

1. **优先级问题**：确保真实 Python 路径在 `WindowsApps` 之前
2. **系统拦截**：关闭 Windows 的 App Execution Aliases
3. **命令别名**：手动复制 `python.exe` 为 `python3.exe`
4. **工具路径**：将 `.local\bin` 加入 PATH
