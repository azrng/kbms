---
title: DuckDB 客户端配置与连接 Quack 服务端
lang: zh-CN
date: 2026-06-18
publish: true
author: azrng
isOriginal: true
category:
  - database
  - dotnet
tag:
  - DuckDB
  - DuckDB.NET
  - Quack
---

## 三、准备工作：客户端侧配置

工欲善其事，必先配好依赖。这一步做好了，后面就顺畅了。

### 1. NuGet 包

首先安装两个 NuGet 包——一个必需，一个可选：

```xml
<ItemGroup>
    <!-- ADO.NET Provider + 自带 native DuckDB 引擎 -->
    <PackageReference Include="DuckDB.NET.Data.Full" Version="{duckdb-net-version}"/>
    <!-- 可选：如果封装层要做强类型映射或 Dapper 参数重写，再引入 Dapper -->
    <PackageReference Include="Dapper" Version="{dapper-version}"/>
</ItemGroup>
```

> 将 `{duckdb-net-version}` / `{dapper-version}` 替换为项目实际使用的 NuGet 版本。示例按 `DuckDB.NET.Data.Full 1.5.x` 说明，其目标框架是 `net8.0`，可用于 `net8.0` 及更高版本。

### 2. 目标框架

`DuckDB.NET.Data.Full` 需要 **.NET 8 及以上**，在项目文件中声明：

```xml
<PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
</PropertyGroup>
```

### 3. quark / httpfs 扩展文件

⚠️ 这是准备工作中最容易被忽略的一步。

DuckDB 的 native 引擎只是一个"裸的"数据库，`quack.duckdb_extension` 是**独立的可加载扩展**，你需要把它放到运行时能找到的位置。

**如果你的应用运行在不能访问外网的内网环境**，还需要提前下载并随包分发 `httpfs.duckdb_extension`。原因是 Quack / DuckDB 在访问远端资源或扩展依赖时可能需要 `httpfs`，而内网环境无法在运行时通过 DuckDB extension repository 自动拉取扩展文件。**不要依赖 `INSTALL httpfs;` 在生产内网环境临时下载。**

**推荐的目录结构**如下：

```text
YourApp/
├── YourApp.csproj
├── Program.cs
└── extensions/
    └── {duckdb-version}/
        ├── windows_amd64/
        │   ├── quack.duckdb_extension
        │   └── httpfs.duckdb_extension
        ├── linux_amd64/
        │   ├── quack.duckdb_extension
        │   └── httpfs.duckdb_extension
        ├── linux_arm64/
        │   ├── quack.duckdb_extension
        │   └── httpfs.duckdb_extension
        ├── osx_amd64/
        │   ├── quack.duckdb_extension
        │   └── httpfs.duckdb_extension
        └── osx_arm64/
            ├── quack.duckdb_extension
            └── httpfs.duckdb_extension
```

> 这不是 DuckDB 强制规定的目录结构，只是应用内分发扩展文件的一种约定。关键是运行时能根据 DuckDB / Quack 扩展版本、操作系统和 CPU 架构定位到正确的 `.duckdb_extension` 文件。若 Quack 当前未提供某个平台的扩展文件，就不要在目录示例中放该平台，代码也应抛出清晰错误。

接下来，在 **csproj 里声明为 Content，构建时自动复制到输出目录**：

```xml
<ItemGroup>
    <Content Include="extensions\**\*" CopyToOutputDirectory="PreserveNewest"/>
</ItemGroup>
```

**扩展文件从哪里来？** 有三种途径：

- 如果你的项目已经随包或内部组件提供对应版本的 `quack.duckdb_extension`，可直接复制到上面的 `extensions/` 目录。
- `httpfs.duckdb_extension` 要和当前 DuckDB native engine 的版本、平台、CPU 架构匹配。**内网部署前应在可联网环境下载好**，再复制到制品或内部制品库。
- 也可以从 DuckDB extension repository 获取，或自行编译。

### 4. 运行时探测扩展路径

如果扩展文件已经随应用分发到本地，DuckDB 可以通过 `LOAD '<path>'` 从显式路径加载。你需要**根据当前平台动态拼出对应路径**：

```csharp
using System.Runtime.InteropServices;

static string GetDuckDbExtensionPath(string extensionName)
{
    var architecture = RuntimeInformation.ProcessArchitecture switch
    {
        Architecture.Arm64 => "arm64",
        _ => "amd64"
    };

    var platform = RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ? $"windows_{architecture}"
                : RuntimeInformation.IsOSPlatform(OSPlatform.Linux) ? $"linux_{architecture}"
                : RuntimeInformation.IsOSPlatform(OSPlatform.OSX) ? $"osx_{architecture}"
                : throw new PlatformNotSupportedException("不支持的平台");

    var duckdbVersion = "{duckdb-version}";
    var fileName = extensionName + ".duckdb_extension";
    var path = Path.Combine(AppContext.BaseDirectory, "extensions", duckdbVersion, platform, fileName);

    if (!File.Exists(path))
        throw new FileNotFoundException($"未找到 DuckDB 扩展文件: {path}");

    // DuckDB 路径用正斜杠更稳；单引号需要转义
    return path.Replace("\\", "/").Replace("'", "''");
}
```

这段代码的核心逻辑是：先通过 `RuntimeInformation` 探测当前 OS 和 CPU 架构，再拼接出扩展文件的完整路径。注意 `AppContext.BaseDirectory` 比 `Directory.GetCurrentDirectory()` 更可靠，不受工作目录影响。

---

## 四、连接 Quack 服务端：四步走 🚀

终于到了核心部分。下面是一个**完整、可直接运行**的最小示例。**读懂这段代码，你就掌握了 90% 的内容。**

```csharp
using DuckDB.NET.Data;

// === Step 0：准备连接参数（实际项目从配置/secret 读取，不要硬编码）===
const string QuackHost = "<quack-host>";        // 例如 10.x.x.x
const int QuackPort = 9494;
const string QuackToken = "<your-token>";

// === Step 1：打开本地内存里的 DuckDB ===
// 注意：连接串是 "Data Source=:memory:"，不是远程地址！
// 我们要先有一个本地 DuckDB 实例，再去 ATTACH 远程。
using var connection = new DuckDBConnection("Data Source=:memory:");
connection.Open();

// === Step 2：LOAD 扩展 ===
// 内网环境建议先从本地显式路径加载 httpfs，再加载 quack
ExecuteScalar($"LOAD '{GetDuckDbExtensionPath("httpfs")}';");
var extPath = GetDuckDbExtensionPath("quack");
ExecuteScalar($"LOAD '{extPath}';");

// === Step 3：ATTACH 远程服务端，并切换默认 database ===
ExecuteScalar($"ATTACH 'quack:{QuackHost}:{QuackPort}' AS remote " +
              $"(TYPE quack, TOKEN '{QuackToken}', DISABLE_SSL true);");
ExecuteScalar("USE remote;");

// 现在可以通过 quack_query_by_name 或封装层查询远端表了
Console.WriteLine("连接成功");

// 局部辅助方法：执行无返回结果的 SQL
void ExecuteScalar(string sql)
{
    using var cmd = connection.CreateCommand();
    cmd.CommandText = sql;
    cmd.ExecuteNonQuery();
}
```

### 每一步在做什么？漏掉会怎样？

| 步骤 | 作用 | 漏掉会怎样 |
|---|---|---|
| Step 1 `:memory:` | 起一个本地临时 DuckDB | 无 |
| Step 2 `LOAD '<path>'` | 从本地文件加载扩展，注册 `TYPE quack` | Step 3 报"unknown ATTACH type: quack" |
| Step 3 `ATTACH ... AS remote` | 建立到远程的连接，别名 `remote` | 查询时报"database remote does not exist" |
| Step 3 `USE remote` | 把当前会话默认 database 切到 `remote` | `select * from main.orders` 实际查的是本地 `:memory:` 的 `main.orders`，报 `Table with name orders does not exist` |

> 如果扩展不在本地，而是来自 DuckDB extension repository，才考虑 `INSTALL quack; LOAD quack;` 这类安装后加载流程。本文采用"应用随包分发本地扩展文件"的场景，所以只使用 `LOAD '<path>'`。

> 内网环境同理，不建议在运行时执行 `INSTALL httpfs;`。应提前把匹配版本和平台的 `httpfs.duckdb_extension` 放到本地扩展目录，然后通过 `LOAD '<path>'` 加载。

### 关于 SSL 选项 ⚠️

示例中的 `DISABLE_SSL true` 只适合**内网、测试环境或服务端明确未启用 TLS** 的场景。**生产环境应优先启用 TLS**，并按 Quack 服务端实际配置移除 `DISABLE_SSL true` 或改用服务端要求的安全连接参数。不要为了绕过证书问题在生产环境长期关闭 SSL。
