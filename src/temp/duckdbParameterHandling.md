---
title: DuckDB + Quack 协议查询与参数化查询
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
  - Dapper
  - 参数化查询
---

> 面向首次接触 DuckDB / Quack 的 .NET 开发者。读完本文你能：在 .NET 项目里装好客户端依赖、连上一台远程 Quack DuckDB 服务、跑通基础查询，并理解为什么生产代码通常需要封装层处理 SQL 规范化和参数转换。

---

## 一、概念入门：先弄清楚三个东西

### 1. DuckDB 是什么

DuckDB 是一个**嵌入式 OLAP 数据库**，可以理解为"分析场景的 SQLite"：

- **嵌入式**：以 `.dll/.so/.dylib` 形式被你的 .NET 进程加载，不需要单独跑一个数据库服务。
- **OLAP**：面向分析型负载（聚合、扫表、大结果集），不是 OLTP（高并发小事务）。
- **SQL 兼容**：用 PostgreSQL 风格的 SQL 语法。

在 .NET 里通过 `DuckDB.NET.Data.Full` NuGet 包调用它。

### 2. Quack 是什么

Quack 是 DuckDB 的**远程协议扩展**（loadable extension）。DuckDB 本身是嵌入式的，但有时你想让多个客户端共享同一份远程数据，于是有了 Quack：

- Quack 服务端：一个独立进程（或容器），背后挂一份 DuckDB 文件或 catalog，对外暴露 Quack 协议。
- Quack 客户端：在本地 DuckDB 里加载 `quack` 扩展后，可以通过 `ATTACH ... (TYPE quack, ...)` 像访问本地表一样查询远程数据。

### 3. 调用链路：四层

```text
你的 .NET 应用
  └── DuckDB.NET.Data.Full（ADO.NET Provider）
        └── 本地嵌入式 DuckDB native engine（duckdb.dll/.so/.dylib）
              └── quack loadable extension（quack.duckdb_extension）
                    └── 远程 Quack DuckDB 服务端
```

**关键认知**：你不是"直接连"远程 Quack 服务端。你是先在进程内起一个本地 DuckDB，再让它通过 quack 扩展去和远程服务端通信。本地这层 DuckDB 既是 SQL 解析器、又是协议客户端。

---

## 二、概念对比：和 SQL Server / PostgreSQL 的差异

| 维度 | SQL Server / PostgreSQL | DuckDB + Quack |
|---|---|---|
| 部署模型 | 独立的数据库服务进程 | 本地嵌入式 + 可选远程 Quack |
| .NET 客户端 | `SqlConnection` / `NpgsqlConnection` | `DuckDBConnection` |
| `@` 前缀参数 | `@paramName` | ❌ 不支持 |
| 位置参数 | 部分支持 `?` / `@p0` | ✅ `?` 或 `$1, $2` |
| 原生命名参数 | 依赖驱动实现 | ✅ `$paramName` |
| 连接串 | `Server=...;Database=...;User Id=...` | 本地 `Data Source=:memory:`，远程用 `ATTACH` |
| 默认 database | 连接串指定 | 本地默认 `:memory:`，需要 `USE <alias>` 切到远程 |
| 远端查询 | 直接访问服务端表 | 当前 Quack v1.5.3 下，直接 `FROM source.orders` 可能下推失败，推荐通过封装层或 `quack_query_by_name` |

最容易踩坑的两条：

1. **DuckDB 不支持 `@paramName`**。直接写会语法错，应改用 `?`、`$1` 或 `$paramName`。
2. **`ATTACH` 之后默认库还是本地 `:memory:`**。不 `USE remote`，就查不到远程表。
3. **直接查询 attached table 不一定等价于远端执行原 SQL**。当前实测环境中，`SELECT ... FROM source.orders` 会在下推时丢失 schema，报 `Table with name orders does not exist`；可用 `quack_query_by_name(alias, sql)` 让远端解析 SQL。

---

## 三、准备工作（客户端侧）

### 1. NuGet 包

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

```xml
<PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
</PropertyGroup>
```

### 3. quack / httpfs 扩展文件

DuckDB 的 native 引擎只是"裸的"数据库，`quack.duckdb_extension` 是独立的可加载扩展。你需要把它放到运行时能找到的位置。

如果应用运行在不能访问外网的内网环境，还需要提前下载并随包分发 `httpfs.duckdb_extension`。原因是 Quack / DuckDB 在访问远端资源或扩展依赖时可能需要 `httpfs`，而内网环境无法在运行时通过 DuckDB extension repository 自动拉取扩展文件。不要依赖 `INSTALL httpfs;` 在生产内网环境临时下载。

**目录结构**（推荐）：

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

**csproj 里声明为 Content，构建时复制到输出目录**：

```xml
<ItemGroup>
    <Content Include="extensions\**\*" CopyToOutputDirectory="PreserveNewest"/>
</ItemGroup>
```

**扩展文件从哪里来**：

- 如果你的项目已经随包或内部组件提供对应版本的 `quack.duckdb_extension`，可直接复制到上面的 `extensions/` 目录。
- `httpfs.duckdb_extension` 要和当前 DuckDB native engine 的版本、平台、CPU 架构匹配。内网部署前应在可联网环境下载好，再复制到制品或内部制品库。
- 也可以从 DuckDB extension repository 获取，或自行编译。

### 4. 运行时探测扩展路径

如果扩展文件已经随应用分发到本地，DuckDB 可以通过 `LOAD '<path>'` 从显式路径加载。你需要根据当前平台拼出对应路径：

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

---

## 四、连接 Quack 服务端：四步走

下面是一个**完整、可直接运行**的最小示例。读完这段你就掌握了 90% 的内容。

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

### 关键点解释

| 步骤 | 作用 | 漏掉会怎样 |
|---|---|---|
| Step 1 `:memory:` | 起一个本地临时 DuckDB | 无 |
| Step 2 `LOAD '<path>'` | 从本地文件加载扩展，注册 `TYPE quack` | Step 3 报"unknown ATTACH type: quack" |
| Step 3 `ATTACH ... AS remote` | 建立到远程的连接，别名 `remote` | 查询时报"database remote does not exist" |
| Step 3 `USE remote` | 把当前会话默认 database 切到 `remote` | `select * from main.orders` 实际查的是本地 `:memory:` 的 `main.orders`，报 `Table with name orders does not exist` |

> 如果扩展不在本地，而是来自 DuckDB extension repository，才考虑 `INSTALL quack; LOAD quack;` 这类安装后加载流程。本文采用“应用随包分发本地扩展文件”的场景，所以只使用 `LOAD '<path>'`。

> 内网环境同理，不建议在运行时执行 `INSTALL httpfs;`。应提前把匹配版本和平台的 `httpfs.duckdb_extension` 放到本地扩展目录，然后通过 `LOAD '<path>'` 加载。

### SSL 选项

示例中的 `DISABLE_SSL true` 只适合内网、测试环境或服务端明确未启用 TLS 的场景。生产环境应优先启用 TLS，并按 Quack 服务端实际配置移除 `DISABLE_SSL true` 或改用服务端要求的安全连接参数。不要为了绕过证书问题在生产环境长期关闭 SSL。

---

## 五、基础查询（无参数）

当前 Quack v1.5.3 实测中，直接执行下面这种 attached table 查询可能失败：

```sql
SELECT order_id, user_id, order_status, order_amount
FROM source.orders
LIMIT 10;
```

典型错误是远端实际收到的查询丢失了 schema，变成 `FROM orders`：

```text
Invalid Input Error: Table with name orders does not exist!
Did you mean "source.orders"?
```

更稳妥的方式是使用 Quack 扩展提供的 `quack_query_by_name(alias, sql)`，把完整 SQL 字符串交给远端解析：

```csharp
using var cmd = connection.CreateCommand();
cmd.CommandText = @"
    SELECT *
    FROM quack_query_by_name('remote',
        'SELECT order_id, user_id, order_status, order_amount
         FROM source.orders
         LIMIT 10')";

using var reader = cmd.ExecuteReader();
while (reader.Read())
{
    var orderId = reader.GetInt64(0);
    var userId = reader.IsDBNull(1) ? 0L : reader.GetInt64(1);
    var status = reader.GetString(2);
    var amount = reader.GetDecimal(3);

    Console.WriteLine($"{orderId} {userId} {status} {amount}");
}
```

要点：

- `CreateCommand()` 自带 `DuckDBCommand`，绑定到当前 `connection`。
- `ExecuteReader()` 返回 `DbDataReader`，可以用 `Read()` 逐行推进。
- 用 `IsDBNull(i)` 检查 NULL，否则 `GetInt64` 等强类型方法会抛异常。
- `using` 释放命令和 reader，避免资源泄漏。
- `quack_query_by_name` 只接受 `(alias, sql)` 两个字符串参数；它不能接收外层 `DuckDBParameter` 并转发给内层 SQL。

---

## 六、参数化查询（核心章节）

### 1. 为什么不能用 `@paramName`

如果你从 SQL Server / PostgreSQL 迁移过来，会习惯这样写：

```sql
-- ❌ 在 DuckDB 里行不通
SELECT * FROM source.orders WHERE order_status = @status AND amount >= @minAmount;
```

DuckDB **不认识 `@` 前缀的命名参数**。直接传过去会报语法错误。

DuckDB 支持以下参数占位符：

| 写法 | 含义 | 示例 |
|---|---|---|
| `?` | 按出现顺序绑定 | `WHERE status = ? AND amount >= ?` |
| `$1, $2, ...` | 显式位置编号 | `WHERE status = $1 AND amount >= $2` |
| `$name` | 命名参数 | `WHERE status = $status` |

下面三种是 DuckDB.NET / Dapper 的参数绑定语法，但在当前 Quack v1.5.3 的远端查询场景里有一个重要限制：如果查询必须通过 `quack_query_by_name(alias, sql)` 才能正确执行，外层 `DuckDBParameter` 不会传入内层 SQL。也就是说，下面示例适用于本地 DuckDB 查询；不要直接把它们套到 `quack_query_by_name` 内层 SQL 里。

### 2. 方式 A：DuckDB 原生 `?` 位置参数（推荐学习）

最直接、最贴近 native 引擎行为的写法。注意：当前实测中，这种写法直接查询 `source.orders` 会因为 Quack 下推丢失 schema 而失败，需要封装层处理。

```csharp
using var cmd = connection.CreateCommand();
cmd.CommandText = @"
    SELECT order_id, user_id, order_status, order_amount
    FROM source.orders
    WHERE order_status = ?
      AND order_amount >= ?
    LIMIT ?;";

// 按 SQL 中 ? 出现的顺序，依次 Add
cmd.Parameters.Add(new DuckDBParameter { Value = "completed" });   // 第 1 个 ?
cmd.Parameters.Add(new DuckDBParameter { Value = 100.0m });        // 第 2 个 ?
cmd.Parameters.Add(new DuckDBParameter { Value = 10 });            // 第 3 个 ?

using var reader = cmd.ExecuteReader();
while (reader.Read())
{
    Console.WriteLine($"{reader.GetInt64(0)} {reader.GetString(2)} {reader.GetDecimal(3)}");
}
```

**特点**：

- ✅ 与 DuckDB C++ 引擎原生兼容，无任何中间转换
- ✅ 性能最好
- ⚠️ 没有"参数名"，只能靠顺序，参数多了容易对错位置
- ⚠️ 同一个值用两次需要 `Add` 两次

### 3. 方式 B：DuckDB 原生 `$name` 命名参数（推荐日常）

如果不想依赖 `?` 的位置顺序，可以使用 DuckDB 原生 `$name` 命名参数。注意：当前实测中，这种写法直接查询 `source.orders` 同样会因为 Quack 下推丢失 schema 而失败，需要封装层处理。

```csharp
using var cmd = connection.CreateCommand();
cmd.CommandText = @"
    SELECT order_id, user_id, order_status, order_amount
    FROM source.orders
    WHERE order_status = $status
      AND order_amount >= $minAmount
    LIMIT $limit;";

cmd.Parameters.Add(new DuckDBParameter { ParameterName = "status", Value = "completed" });
cmd.Parameters.Add(new DuckDBParameter { ParameterName = "minAmount", Value = 100.0m });
cmd.Parameters.Add(new DuckDBParameter { ParameterName = "limit", Value = 10 });

using var reader = cmd.ExecuteReader();
```

**特点**：

- ✅ SQL 可读性好，参数和值一一对应
- ✅ 不依赖参数添加顺序
- ✅ 不需要 Dapper 参与，适合只使用 DuckDB.NET 原生 API 的场景
- ⚠️ 参数名使用 `$name`，不是 SQL Server / Npgsql 常见的 `@name`

### 4. 方式 C：Dapper 的 `?name?` 伪位置参数

Dapper 提供了一种 **pseudo-positional parameters** 语法：用 `?name?`（前后各一个 `?`）。这是 Dapper 的参数重写特性，不是 DuckDB SQL 自身的占位符语法。

注意：当前实测环境中，`connection.Query<T>()` 直接执行 `FROM source.orders WHERE ... ?status? ...` 没有跑通，报 `Values were not provided for the following prepared statement parameters`。因此不要把它作为“原生 Quack 直连必然可用”的写法。

```csharp
using Dapper;

var sql = @"
    SELECT order_id, user_id, order_status, order_amount
    FROM source.orders
    WHERE order_status = ?status?
      AND order_amount >= ?minAmount?
    LIMIT ?limit?;";

var orders = connection.Query<OrderDto>(sql, new
{
    status = "completed",
    minAmount = 100.0m,
    limit = 10
}).ToList();

foreach (var o in orders)
    Console.WriteLine($"{o.OrderId} {o.OrderStatus} {o.OrderAmount}");
```

**特点**：

- ✅ 可读性好，参数和值一一对应
- ✅ Dapper 内部会按 SQL 中 `?name?` 的出现位置绑定对应参数值
- ✅ 强类型映射 `Query<T>` 直接返回对象
- ⚠️ 在 Dapper 本地参数重写语义中，同名参数多次出现时会复用同一个值；Quack 远端场景仍需实测
- ⚠️ DTO 构造函数和属性映射要与查询列名匹配（详见下一章）

### 5. 三种方式的对比

| 维度 | 方式 A（原生 `?`） | 方式 B（原生 `$name`） | 方式 C（Dapper `?name?`） |
|---|---|---|---|
| 性能 | 最直接 | 最直接 | Dapper 多一层映射，通常差异很小 |
| 可读性 | 参数多时差 | 好 | 好 |
| 强类型映射 | 需要手写 reader | 需要手写 reader | 自动 |
| 多次复用同名参数 | 要 `Add` 多次 | 写一次即可 | Dapper 语义下写一次即可，Quack 远端需封装层验证 |
| 适合场景 | 简单 SQL、性能敏感 | 原生 DuckDB.NET 业务查询 | Dapper DTO 投影 |

### 6. Quack 场景下的实测参数化结论

在当前 Quack v1.5.3 实测环境里：

- `quack_query_by_name` 只支持两个参数：`quack_query_by_name(alias, sql)`。
- `quack_query_by_name('remote', '... ? ...', value)` 不支持，会报函数签名不匹配。
- 外层 `DuckDBParameter` 不会传给 `quack_query_by_name` 的内层 SQL。
- 现有 `@paramName -> ? / $1` 转换如果仍走 attached table 查询，也会遇到 schema 下推丢失问题。

因此，当前可验证的做法是：对业务参数做强类型校验和 SQL literal 转义，然后生成完整远端 SQL，再交给 `quack_query_by_name`。这不是数据库层面的绑定参数，但比直接拼接用户输入安全；封装层必须只接受已校验类型，不允许把任意字符串当 SQL 片段拼进去。

实测通过示例：

```csharp
var status = SqlStringLiteral("completed");
var minAmount = SqlDecimalLiteral(100.0m);
var limit = SqlLimitLiteral(10);

var remoteSql = $@"
    SELECT order_id, user_id, order_status, order_amount
    FROM source.orders
    WHERE order_status = {status}
      AND order_amount >= {minAmount}
    LIMIT {limit}";

using var cmd = connection.CreateCommand();
cmd.CommandText = BuildQuackQueryByNameSql("remote", remoteSql);
using var reader = cmd.ExecuteReader();

static string BuildQuackQueryByNameSql(string alias, string sql)
{
    return $"select * from quack_query_by_name('{EscapeSql(alias)}', '{EscapeSql(sql)}')";
}

static string EscapeSql(string value)
{
    return value.Replace("\\", "\\\\").Replace("'", "''");
}

static string SqlStringLiteral(string value)
{
    return "'" + value.Replace("'", "''") + "'";
}

static string SqlDecimalLiteral(decimal value)
{
    return value.ToString(System.Globalization.CultureInfo.InvariantCulture);
}

static string SqlLimitLiteral(int value)
{
    if (value is < 0 or > 1000)
        throw new ArgumentOutOfRangeException(nameof(value), "Limit must be between 0 and 1000.");

    return value.ToString(System.Globalization.CultureInfo.InvariantCulture);
}
```

### 7. 错误对比：千万别这么写

```csharp
// ❌ 错误 1：字符串拼接（SQL 注入风险）
var sql = $"SELECT * FROM orders WHERE status = '{userInput}'";

// ❌ 错误 2：用 @paramName 传给 DuckDB
cmd.CommandText = "WHERE status = @status";  // DuckDB 报语法错
cmd.Parameters.Add(new DuckDBParameter("@status", "completed"));

// ❌ 错误 3：参数顺序和 ? 顺序不一致
cmd.CommandText = "WHERE status = ? AND amount >= ?";
cmd.Parameters.Add(new DuckDBParameter { Value = 100.0m });   // 实际绑定到 status
cmd.Parameters.Add(new DuckDBParameter { Value = "completed" }); // 实际绑定到 amount
```

---

## 七、类型映射与 NULL 注意事项

### 1. .NET 类型 → DuckDB 类型

`DuckDBParameter` 会根据 `Value` 的运行时类型自动推断。常见映射：

| .NET 类型 | DuckDB 类型 |
|---|---|
| `string` | `VARCHAR` |
| `long` / `int` / `short` | `BIGINT` / `INTEGER` / `SMALLINT` |
| `decimal` / `double` / `float` | `DECIMAL` / `DOUBLE` / `FLOAT` |
| `DateTime` | `TIMESTAMP` |
| `bool` | `BOOLEAN` |
| `byte[]` | `BLOB` |
| `DBNull.Value` | NULL |

绝大多数场景**不需要手动指定 `DbType`**。

### 2. NULL 怎么传

```csharp
// ✅ 正确
cmd.Parameters.Add(new DuckDBParameter { Value = DBNull.Value });

// ❌ 错误：C# null 在某些路径下会被当成"未设置参数"
cmd.Parameters.Add(new DuckDBParameter { Value = null });
```

读取时同样需要先判断：

```csharp
var userId = reader.IsDBNull(1) ? (long?)null : reader.GetInt64(1);
```

### 3. Dapper 强类型映射的构造函数建议

```csharp
// record 也可能工作，但列名、构造函数参数名和 Dapper 版本要匹配
private sealed record OrderDto(long OrderId, string OrderStatus);

// 更稳妥：用 class + 可写属性
private sealed class OrderDto
{
    public long OrderId { get; set; }
    public long UserId { get; set; }
    public string OrderStatus { get; set; } = "";
    public decimal OrderAmount { get; set; }
}
```

---

## 八、SQL 方言陷阱：三段式列引用

有些上游 SQL 生成器会输出 `schema.table.column` 形式的三段式列引用。DuckDB 在部分查询场景下会把 `source.orders` 作为 schema + table 解析，但在列限定符里继续写 `source.orders.created_at` 可能触发绑定错误。这个问题与具体 DuckDB 版本、SQL 形态和是否经过 Quack 远端解析有关，建议在目标版本上实际验证。

```sql
-- ✅ 表引用带 schema，列引用用短名
SELECT count(1)
FROM source.orders
WHERE orders.created_at >= '2026-05-17';

-- ❌ 三段式列引用会绑定失败
SELECT count(1)
FROM source.orders
WHERE source.orders.created_at >= '2026-05-17';
-- 可能出现 Binder Error，例如提示找不到 "source.orders" 这个表别名。
```

实测结论：

- 直接 attached table 查询时，`FROM source.orders` 在当前环境下会下推成 `FROM orders` 并失败。
- `WHERE source.orders.created_at ...` 会触发 Binder Error。
- 使用 `quack_query_by_name('remote', 'SELECT ... FROM source.orders ...')` 可以让远端正确识别 `source.orders`。
- 如果要改写三段式列引用，应在封装层做 SQL normalizer，并用目标版本实测。

如果你有上游系统生成的 SQL 用了三段式，需要在 .NET 侧做规范化；可以把这类逻辑封装成独立的 SQL normalizer，在查询进入 DuckDB 前统一处理。

---

## 九、常见错误排查

### 1. `Catalog Error: Table with name orders does not exist!`

**原因**：可能是只 `ATTACH` 了远程但没 `USE remote`；也可能是 Quack 下推时把 `source.orders` 改写成了 `orders`。

**解决**：先确认 `ATTACH` 后已执行 `USE remote;`。如果仍失败，改用 `quack_query_by_name('remote', 'SELECT ... FROM source.orders ...')` 或项目封装层。

### 2. `Binder Error` 并提到 `source.orders` 或列限定符

**原因**：用了三段式列引用（见上一章）。

**解决**：条件里的列改成 `table.column`、短名，或给表起别名后用 `alias.column`。

### 3. `DuckDB.NET.Data.Full` 与 `net6.0` 不兼容

**原因**：项目目标框架低于包所支持。

**解决**：把 `<TargetFramework>` 改成 `net8.0` 或更高版本。

### 4. `Quack DuckDB 扩展文件未找到`

**原因**：csproj 里没有把 `extensions/` 声明为 `Content`，或者运行时工作目录不对。

**解决**：

- 检查 csproj 里有 `<Content Include="extensions\**\*" CopyToOutputDirectory="PreserveNewest"/>`。
- 检查 `bin/<Config>/<TFM>/extensions/{duckdb-version}/<platform>/quack.duckdb_extension` 存在。
- 用 `AppContext.BaseDirectory` 而不是 `Directory.GetCurrentDirectory()`，避免当前目录跳到别处。

### 5. `Parser Error: syntax error at or near "@"`

**原因**：SQL 里用了 `@paramName`。

**解决**：本地 DuckDB 查询可换成 `?` 位置参数、`$name` 命名参数或 Dapper `?name?`。Quack 远端查询要结合封装层实测，不能假设外层参数会传入 `quack_query_by_name` 的内层 SQL。

### 6. DataGrip 能执行，但 .NET 客户端不能

**原因**：工具的连接上下文可能默认就是远端 database，而 .NET 客户端是从本地 `:memory:` 起步。

**排查清单**：

1. 应用实际连接串是什么？
2. 是否已 `LOAD` quack 扩展？
3. 是否已 `ATTACH` 远端？
4. `ATTACH` 的 alias 是什么（默认 `remote`）？
5. 是否已 `USE <alias>`？
6. 直接 attached table 是否触发了 schema 丢失？可用 `quack_query_by_name` 验证同一 SQL 是否能跑通。

---

## 十、最佳实践

### 1. 复用连接，不要每次查询都新建

`LOAD/ATTACH` 都有成本（毫秒到百毫秒级）。建议：

- 在应用启动时执行一次，把 `DuckDBConnection` 作为**单例**保存。
- 后续所有查询复用这条连接。
- 多线程并发查询时，不要假设同一个 `DuckDBConnection` 可以被多个线程随意共享。更稳妥的做法是串行化访问，或为并发工作单元创建独立连接并各自完成 `LOAD/ATTACH/USE` 初始化。

### 连接初始化错误处理

生产代码不要只把初始化 SQL 顺序写在主流程里，建议把连接初始化包成一个方法，并在异常里带上当前步骤，方便定位是扩展文件、LOAD、ATTACH、认证还是 `USE` 失败：

```csharp
static void ExecuteStep(DuckDBConnection connection, string stepName, string sql)
{
    try
    {
        using var cmd = connection.CreateCommand();
        cmd.CommandText = sql;
        cmd.ExecuteNonQuery();
    }
    catch (Exception ex)
    {
        throw new InvalidOperationException($"DuckDB 初始化失败：{stepName}", ex);
    }
}
```

### 2. 避免 `SELECT *`

- 显式列出所需列。
- 减少 `object[]` 装箱和内存分配。
- 减少网络传输和反序列化开销。

### 3. 大结果集改成流式读取

```csharp
// ❌ 把整个结果加载到内存
var all = new List<object[]>();
while (reader.Read()) { /* ... */ all.Add(row); }

// ✅ 边读边处理，控制内存峰值
while (reader.Read())
{
    var orderId = reader.GetInt64(0);
    ProcessOne(orderId);  // 处理完就丢
}
```

### 4. 优先让过滤、聚合在远端执行

目标是让过滤、聚合、排序和 `LIMIT` 尽量在远端执行，减少传输数据量。但当前 Quack v1.5.3 实测说明，直接 attached table 查询可能在下推时丢失 schema；因此需要用 `quack_query_by_name` 或封装层验证实际执行路径。

```sql
-- ✅ 远端执行：过滤、聚合、limit 都在远端
SELECT user_id, count(*) AS cnt
FROM source.orders
WHERE created_at >= ?
GROUP BY user_id
HAVING count(*) > ?
ORDER BY cnt DESC
LIMIT 100;
```

### 5. SQL 注入安全

`?` 位置参数、`$name` 命名参数和 `?name?` 伪位置参数在 DuckDB.NET / Dapper 层面都是真正的参数化，值不会被字符串拼接进 SQL。但如果你把 SQL 作为字符串传给 `quack_query_by_name(alias, sql)`，内层 SQL 不能再接收外层参数，此时必须由封装层负责安全生成 SQL，不能直接拼接用户输入。

```csharp
// ✅ 安全：参数值由 native 引擎绑定
cmd.Parameters.Add(new DuckDBParameter { Value = userInput });

// ❌ 危险：字符串拼接
cmd.CommandText = $"WHERE name = '{userInput}'";
```

---

## 十一、完整示例：可运行的 Console 项目

把下面四个文件放在一起，配上扩展文件，就能跑：

**`Program.cs`**：

```csharp
using DuckDB.NET.Data;
const string QuackHost = "<quack-host>";
const int QuackPort = 9494;
const string QuackToken = "<your-token>";

using var connection = new DuckDBConnection("Data Source=:memory:");
connection.Open();

ExecuteStep("LOAD httpfs extension", "LOAD '" + GetDuckDbExtensionPath("httpfs") + "';");
ExecuteStep("LOAD quack extension", "LOAD '" + GetDuckDbExtensionPath("quack") + "';");
ExecuteStep("ATTACH remote", $"ATTACH 'quack:{QuackHost}:{QuackPort}' AS remote " +
                             $"(TYPE quack, TOKEN '{QuackToken}', DISABLE_SSL true);");
ExecuteStep("USE remote", "USE remote;");

Console.WriteLine("--- 基础查询 ---");
using (var cmd = connection.CreateCommand())
{
    cmd.CommandText = @"
        SELECT *
        FROM quack_query_by_name('remote',
            'SELECT order_id, order_status FROM source.orders LIMIT 5')";
    using var reader = cmd.ExecuteReader();
    while (reader.Read())
        Console.WriteLine($"  {reader.GetInt64(0)} {reader.GetString(1)}");
}

Console.WriteLine("\n--- 带过滤条件的远端查询（示例值已写入远端 SQL）---");
using (var cmd = connection.CreateCommand())
{
    var status = SqlStringLiteral("completed");
    var minAmount = SqlDecimalLiteral(50.0m);
    var limit = SqlLimitLiteral(5);
    var remoteSql = $@"
        SELECT order_id, order_status, order_amount
        FROM source.orders
        WHERE order_status = {status}
          AND order_amount >= {minAmount}
        LIMIT {limit}";

    cmd.CommandText = BuildQuackQueryByNameSql("remote", remoteSql);
    using var reader = cmd.ExecuteReader();
    while (reader.Read())
        Console.WriteLine($"  {reader.GetInt64(0)} {reader.GetString(1)} {reader.GetDecimal(2)}");
}

void ExecuteStep(string stepName, string sql)
{
    try
    {
        using var cmd = connection.CreateCommand();
        cmd.CommandText = sql;
        cmd.ExecuteNonQuery();
    }
    catch (Exception ex)
    {
        throw new InvalidOperationException($"DuckDB 初始化失败：{stepName}", ex);
    }
}

static string GetDuckDbExtensionPath(string extensionName)
{
    var arch = System.Runtime.InteropServices.RuntimeInformation.ProcessArchitecture
        is System.Runtime.InteropServices.Architecture.Arm64 ? "arm64" : "amd64";
    var os = System.Runtime.InteropServices.RuntimeInformation.IsOSPlatform(System.Runtime.InteropServices.OSPlatform.Windows)
        ? $"windows_{arch}"
        : System.Runtime.InteropServices.RuntimeInformation.IsOSPlatform(System.Runtime.InteropServices.OSPlatform.Linux)
            ? $"linux_{arch}"
            : System.Runtime.InteropServices.RuntimeInformation.IsOSPlatform(System.Runtime.InteropServices.OSPlatform.OSX)
                ? $"osx_{arch}"
                : throw new PlatformNotSupportedException();

    var duckdbVersion = "{duckdb-version}";
    var fileName = extensionName + ".duckdb_extension";
    var path = Path.Combine(AppContext.BaseDirectory, "extensions", duckdbVersion, os, fileName);
    if (!File.Exists(path))
        throw new FileNotFoundException($"未找到 DuckDB 扩展: {path}");
    return path.Replace("\\", "/").Replace("'", "''");
}

static string BuildQuackQueryByNameSql(string alias, string sql)
{
    return $"select * from quack_query_by_name('{EscapeSql(alias)}', '{EscapeSql(sql)}')";
}

static string EscapeSql(string value)
{
    return value.Replace("\\", "\\\\").Replace("'", "''");
}

static string SqlStringLiteral(string value)
{
    return "'" + value.Replace("'", "''") + "'";
}

static string SqlDecimalLiteral(decimal value)
{
    return value.ToString(System.Globalization.CultureInfo.InvariantCulture);
}

static string SqlLimitLiteral(int value)
{
    if (value is < 0 or > 1000)
        throw new ArgumentOutOfRangeException(nameof(value), "Limit must be between 0 and 1000.");

    return value.ToString(System.Globalization.CultureInfo.InvariantCulture);
}

```

**`YourApp.csproj`**：

```xml
<Project Sdk="Microsoft.NET.Sdk">
    <PropertyGroup>
        <OutputType>Exe</OutputType>
        <TargetFramework>net8.0</TargetFramework>
        <ImplicitUsings>enable</ImplicitUsings>
        <Nullable>enable</Nullable>
    </PropertyGroup>
    <ItemGroup>
        <PackageReference Include="DuckDB.NET.Data.Full" Version="{duckdb-net-version}"/>
        <!-- 如果完整示例不使用 Dapper，可删除该依赖 -->
        <PackageReference Include="Dapper" Version="{dapper-version}"/>
    </ItemGroup>
    <ItemGroup>
        <Content Include="extensions\**\*" CopyToOutputDirectory="PreserveNewest"/>
    </ItemGroup>
</Project>
```

---

## 十二、封装时建议拆分的代码

如果要把示例代码整理成生产可复用的组件，建议至少拆成这些职责：

- **连接管理**：集中处理 `LOAD` / `ATTACH` / `USE`，避免每个查询重复初始化。
- **平台探测**：根据 OS 与 CPU 架构定位 `quack.duckdb_extension`。
- **连接配置解析**：从配置或 secret 管理系统读取 host、port、token、alias、SSL 选项。
- **SQL 方言规范化**：如上游 SQL 会生成三段式列引用，可在进入 DuckDB 前统一改写。
- **参数转换**：如必须兼容上游 `@paramName` 风格，可在 provider 层转换成 `$paramName` 或 `?`。

---

## 十三、速查表

```text
连接：DuckDBConnection("Data Source=:memory:")
       ↓
      LOAD '<ext_path>'        ← 从本地路径加载并激活扩展
       ↓
      ATTACH 'quack:host:port' AS remote (TYPE quack, TOKEN '...', DISABLE_SSL true)
       ↓
      USE remote               ← 切默认 database，否则查不到远程表
       ↓
      查询：cmd.CommandText = "SELECT * FROM quack_query_by_name('remote', '<remote sql>')"
            using var reader = cmd.ExecuteReader()
```

**参数占位符速查**：

| 你想要的 | SQL 怎么写 | 怎么传值 |
|---|---|---|
| 位置参数 | `WHERE c = ? AND d = ?` | `cmd.Parameters.Add(...)` 按顺序 |
| 命名参数 | `WHERE c = $name` | `DuckDBParameter.ParameterName = "name"` |
| 命名（Dapper） | `WHERE c = ?name?` | `connection.Query<T>(sql, new { name = ... })` |
| ❌ 不要用 | `WHERE c = @name` | DuckDB 不识别 |

> 上表是 DuckDB.NET / Dapper 参数语法速查。若远端查询必须通过 `quack_query_by_name` 执行，内层 SQL 不能直接使用外层参数绑定。
