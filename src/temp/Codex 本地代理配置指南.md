# Codex 本地代理配置指南

本文记录一次已验证的 Codex 重连问题排查与代理配置方法，适用于 Windows 上使用 FlClash 等本地 HTTP 代理客户端的场景。

## 本机修改记录

本机发现 FlClashCore 正在监听 `127.0.0.1:7890`，但 Codex 运行环境和用户环境中均未配置代理变量。因此新建了用户级配置文件：

`C:\Users\Azrng\.codex\.env`

文件内容如下：

```dotenv
# Local FlClash HTTP proxy used by Codex.
HTTP_PROXY=http://127.0.0.1:7890
HTTPS_PROXY=http://127.0.0.1:7890
NO_PROXY=localhost,127.0.0.1,::1
```

配置项说明：

| 配置项 | 用途 |
| --- | --- |
| `HTTP_PROXY` | 将 HTTP 请求转发到本地 HTTP 代理。 |
| `HTTPS_PROXY` | 将 HTTPS 请求通过代理的 CONNECT 隧道转发；这是 Codex 网络访问的关键项。 |
| `NO_PROXY` | 访问本机地址时不走代理，避免本地服务访问被错误转发。 |

## 在其他电脑上配置

不要直接假定代理端口也是 `7890`。请先启动代理客户端，再执行以下 PowerShell 命令查找常见本地代理端口：

```powershell
Get-NetTCPConnection -State Listen |
  Where-Object {
    $_.LocalAddress -in @('127.0.0.1', '::1') -and
    $_.LocalPort -in 1080, 7890, 7891, 7892, 8080, 10809, 10810, 10811
  } |
  Sort-Object LocalPort |
  Format-Table LocalAddress, LocalPort, OwningProcess -AutoSize
```

确认端口后，将下例中的 `7890` 替换为实际端口，在 `C:\Users\<你的用户名>\.codex\.env` 中写入：

```dotenv
HTTP_PROXY=http://127.0.0.1:7890
HTTPS_PROXY=http://127.0.0.1:7890
NO_PROXY=localhost,127.0.0.1,::1
```

若 `.codex` 目录不存在，可先创建：

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.codex"
```

随后完全退出并重新启动 Codex，使新的环境配置进入新进程。

## 验证代理

将端口替换为实际值后运行：

```powershell
curl.exe --proxy http://127.0.0.1:7890 `
  --connect-timeout 8 --max-time 20 `
  --silent --show-error --output NUL `
  --write-out 'http_status=%{http_code}; proxy_used=%{proxy_used}; exit=%{exitcode}' `
  https://api.openai.com/v1/models
```

成功标准：命令退出码为 `0`，并且 `proxy_used=1`。未登录或未附带 API 凭据时，`http_status=401` 是正常结果，表示代理到 OpenAI 的网络链路已建立。

本机已验证结果：`http_status=401; proxy_used=1; exit=0`。

## 注意事项

- 代理客户端退出、切换配置或改动端口后，需同步更新 `.env` 中的端口。
- 本次没有修改 Windows 系统代理、WinHTTP 代理或 `~/.codex/config.toml`，避免影响其他应用和现有 Codex 提供商配置。
- OpenAI 官方文档将 `config.toml` 作为 Codex 的持久化配置，并将环境变量定位为运行时覆盖、自动化和诊断用途。官方稳定环境变量列表未专门列出 `HTTP_PROXY` / `HTTPS_PROXY`，因此不同启动方式是否自动加载 `.env` 取决于本机的 Codex 启动环境。若重启后仍反复重连，应检查该启动方式是否将 `.env` 注入进程环境，或在用户级环境变量中设置同名变量。

官方参考：[Codex 环境变量说明](https://learn.chatgpt.com/docs/config-file/environment-variables)、[Codex 高级配置说明](https://learn.chatgpt.com/docs/config-file/config-advanced)。
