# Git 拉取 GitHub 卡死问题解决方案

> 场景：`git pull` / `git fetch` 长时间无响应直至超时，远程为 SSH 地址 `git@github.com`。

## 问题现象

- `git pull` 挂起 300 秒无任何输出，最终超时。
- SSH 认证本身正常（`ssh -T git@github.com` 5 秒内返回 `Hi xxx!`），但数据传输阶段挂死。
- HTTPS 直连严重限速：`fatal: Operation too slow. Less than 1000 bytes/sec transferred the last 15 seconds`。
- 本机无代理运行时，两条通道全部不可用。

## 根因

SSH 认证与数据传输是两个阶段：认证包小、能通过；后续大流量数据传输被网络限速/干扰掐断。代理只代理 HTTP(S) 流量，对原生 SSH 协议无效，因此开了代理后 `git fetch origin`（SSH）依然挂死。

## 诊断命令

```bash
# 1. 确认 SSH 认证是否正常（正常说明问题在传输阶段）
ssh -o BatchMode=yes -o ConnectTimeout=10 -T git@github.com

# 2. 测试 HTTPS 通道（带低速自动超时，避免无限挂起）
GIT_HTTP_LOW_SPEED_LIMIT=1000 GIT_HTTP_LOW_SPEED_TIME=15 \
  git ls-remote https://github.com/<user>/<repo>.git HEAD

# 3. 查看系统代理地址（Windows）
reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer
# 输出示例: ProxyServer  REG_SZ  127.0.0.1:7890

# 4. 确认代理端口在监听
netstat -ano | findstr "127.0.0.1:7890"
```

## 解决方案

前置条件：本机代理已开启（本文以 `127.0.0.1:7890` 为例，按实际端口修改）。

### 方案一：给 SSH 挂代理（保留 SSH 远程）

编辑 `~/.ssh/config`（Windows 为 `C:\Users\<用户名>\.ssh\config`），添加：

```
Host github.com
  ProxyCommand connect -H 127.0.0.1:7890 %h %p
```

> `connect` 本机未安装（`command -v connect` 为空），需要先装或用 Git 自带的完整路径写法：
>
> ```
> Host github.com
>   ProxyCommand "C:\Program Files\Git\mingw64\bin\connect.exe" -H 127.0.0.1:7890 %h %p
> ```

验证：

```bash
ssh -T git@github.com     # 应正常返回认证成功
git pull                  # 走 SSH + 代理，不再挂死
```

### 方案二：远程改 HTTPS + git 配代理（推荐，更省心）

```bash
# 1. 把远程从 SSH 换成 HTTPS（仅需一次）
git remote set-url origin https://github.com/<user>/<repo>.git

# 2. 给 git 配置 HTTP(S) 代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# 3. 验证
git pull
```

> 只想对 GitHub 走代理、不影响内网仓库时，把第 2 步换成作用域配置：
>
> ```bash
> git config --global http.https://github.com.proxy http://127.0.0.1:7890
> ```

### 方案三：单次拉取指定代理（不污染全局配置）

```bash
# bash / git bash
git -c http.proxy=http://127.0.0.1:7890 pull https://github.com/<user>/<repo>.git main

# PowerShell
$env:https_proxy="http://127.0.0.1:7890"; git pull https://github.com/<user>/<repo>.git main
```

> 拉取时带上分支名 `main`，避免 `git pull <url>` 未指定 refspec 的歧义。

## 一键代理拉取脚本

项目根目录提供 `pull-proxy.bat`（纯 ASCII + CRLF，别转成 LF 或加 `chcp 65001`，否则 cmd 解析会挂死）：

```bat
:: PowerShell / cmd 中执行（默认拉 main）
.\pull-proxy.bat

:: 指定分支
.\pull-proxy.bat main
```

行为：走 `127.0.0.1:7890` 代理，通过 HTTPS 拉取 `azrng/kbms` 指定分支并合并到当前分支，失败时提示检查代理端口。

## 取消代理配置

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
git config --global --unset http.https://github.com.proxy
```

## 常见坑

| 现象 | 原因 | 处理 |
| --- | --- | --- |
| 开了代理 `git fetch origin` 仍挂死 | origin 是 SSH 地址，代理不接管 SSH 流量 | 用方案一给 SSH 挂代理，或方案二改 HTTPS |
| `https_proxy=... git pull` 在 PowerShell 报错 | PowerShell 不识别 bash 的 env 前缀语法 | 用 `$env:https_proxy="http://127.0.0.1:7890"` 前置赋值 |
| `$env:https_proxy` 设了还是慢（十几 KiB/s） | origin 是 SSH 地址，环境变量对 SSH 无效，流量没走代理 | 确认拉取时用的是 HTTPS 地址或远程已改为 HTTPS |
| 每次 pull 都重新下载上万个对象、越来越慢 | fetch refspec 是全部分支，某分支对象缺失导致每次全量重拉 | `git config remote.origin.fetch "+refs/heads/main:refs/remotes/origin/main"` 只跟踪 main；`git branch -rd origin/<坏分支>` 删坏引用 |
| `.git/objects/pack` 出现大量 tmp_pack 垃圾（数百 MB） | 拉取中断（Ctrl+C / 超时）残留的临时包 | 删除：`rm -f .git/objects/pack/tmp_pack_*`（PowerShell: `Remove-Item .git\objects\pack\tmp_pack_*`） |
| 代理重启后端口变化 | 客户端动态端口 | `netstat -ano | findstr 7890` 确认后再用 |
| 合并时卡在编辑器界面 | `git pull` 触发 merge 打开 vim 等待输入 | `git config --global core.editor "vim"` 明确编辑器，或 `Esc` 后输入 `:wq` 退出 |
