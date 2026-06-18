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

> 面向首次接触 DuckDB / Quack 的 .NET 开发者。读完本文你能：在 .NET 项目里装好客户端依赖、连上一台远程 Quack DuckDB 服务、跑通基础查询和参数化查询、并能自己排查最常见的几类错误。

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

最容易踩坑的两条：

1. **DuckDB 不支持 `@paramName`**。直接写会语法错，应改用 `?`、`$1` 或 `$paramName`。
2. **`ATTACH` 之后默认库还是本地 `:memory:`**。不 `USE remote`，就查不到远程表。

---

## 三、准备工作（客户端侧）

### 1. NuGet 包

```xml
<ItemGroup>
    <!-- ADO.NET Provider + 自带 native DuckDB 引擎 -->
    <PackageReference Include="DuckDB.NET.Data.Full" Version="1.5.3"/>
    <!-- 可选：Dapper，用于强类型映射和 ?name? 伪位置参数 -->
    <PackageReference Include="Dapper" Version="2.1.35"/>
</ItemGroup>
```

> ⚠️ `DuckDB.NET.Data.Full 1.5.3` 目标框架是 `net8.0`，可用于 `net8.0` 及更高版本。如果你建的是 `net6.0` 项目，NuGet 还原会报兼容错误。

### 2. 目标框架

```xml
<PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
</PropertyGroup>
```

### 3. quack 扩展文件

DuckDB 的 native 引擎只是"裸的"数据库，`quack.duckdb_extension` 是独立的可加载扩展。你需要把它放到运行时能找到的位置。

**目录结构**（推荐）：

```text
YourApp/
├── YourApp.csproj
├── Program.cs
└── extensions/
    └── v1.5.3/
        ├── windows_amd64/
        │   └── quack.duckdb_extension
        ├── linux_amd64/
        │   └── quack.duckdb_extension
        └── linux_arm64/
            └── quack.duckdb_extension
```

**csproj 里声明为 Content，构建时复制到输出目录**：

```xml
<ItemGroup>
    <Content Include="extensions\**\*" CopyToOutputDirectory="PreserveNewest"/>
</ItemGroup>
```

**扩展文件从哪里来**：

- 如果你的项目已经随包或内部组件提供对应版本的 `quack.duckdb_extension`，可直接复制到上面的 `extensions/` 目录。
- 也可以从 DuckDB extension repository 获取，或自行编译。

### 4. 运行时探测扩展路径

DuckDB 的 `INSTALL '<path>'` 接受一个**文件系统绝对路径**。你需要根据当前平台拼出对应路径：

```csharp
using System.Runtime.InteropServices;

static string GetQuackExtensionPath()
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

    var path = Path.Combine(AppContext.BaseDirectory, "extensions", "v1.5.3", platform, "quack.duckdb_extension");

    if (!File.Exists(path))
        throw new FileNotFoundException($"未找到 quack 扩展文件: {path}");

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

// === Step 2：INSTALL quack 扩展 ===
// 把扩展二进制加载进 DuckDB native engine
var extPath = GetQuackExtensionPath();
ExecuteScalar($"INSTALL '{extPath}';");

// === Step 3：LOAD quack 扩展 ===
// 注册 ATTACH TYPE = quack 这个新的连接类型
ExecuteScalar($"LOAD '{extPath}';");

// === Step 4：ATTACH 远程服务端，并切换默认 database ===
ExecuteScalar($"ATTACH 'quack:{QuackHost}:{QuackPort}' AS remote " +
              $"(TYPE quack, TOKEN '{QuackToken}', DISABLE_SSL true);");
ExecuteScalar("USE remote;");

// 现在可以查远程表了
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
| Step 2 `INSTALL` | 把 `.duckdb_extension` 文件内容加载到 native engine | Step 3 报"扩展未安装" |
| Step 3 `LOAD` | 激活扩展，注册 `TYPE quack` 这个 ATTACH 类型 | Step 4 报"unknown ATTACH type: quack" |
| Step 4 `ATTACH ... AS remote` | 建立到远程的连接，别名 `remote` | 查询时报"database remote does not exist" |
| Step 4 `USE remote` | 把当前会话默认 database 切到 `remote` | `select * from main.orders` 实际查的是本地 `:memory:` 的 `main.orders`，报 `Table with name orders does not exist` |

---

## 五、基础查询（无参数）

```csharp
using var cmd = connection.CreateCommand();
cmd.CommandText = @"
    SELECT order_id, user_id, order_status, order_amount
    FROM source.orders
    LIMIT 10;";

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

下面介绍三种实际可用的参数化写法。

### 2. 方式 A：DuckDB 原生 `?` 位置参数（推荐学习）

最直接、最贴近 native 引擎行为的写法。

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

如果不想依赖 `?` 的位置顺序，可以使用 DuckDB 原生 `$name` 命名参数：

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

Dapper 提供了一种**伪位置参数语法**：用 `?name?`（前后各一个 `?`）。如果你已经在项目中使用 Dapper，可以继续使用这种写法做 DTO 映射。

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
- ⚠️ 同名参数多次出现时，Dapper 会自动复用同一个值
- ⚠️ DTO 构造函数和属性映射要与查询列名匹配（详见下一章）

### 5. 三种方式的对比

| 维度 | 方式 A（原生 `?`） | 方式 B（原生 `$name`） | 方式 C（Dapper `?name?`） |
|---|---|---|---|
| 性能 | 最直接 | 最直接 | Dapper 多一层映射，通常差异很小 |
| 可读性 | 参数多时差 | 好 | 好 |
| 强类型映射 | 需要手写 reader | 需要手写 reader | 自动 |
| 多次复用同名参数 | 要 `Add` 多次 | 写一次即可 | 写一次即可 |
| 适合场景 | 简单 SQL、性能敏感 | 原生 DuckDB.NET 业务查询 | Dapper DTO 投影 |

### 6. 错误对比：千万别这么写

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

DuckDB 在解析 `FROM source.orders` 后，可用的候选表名是 `orders`，**不是** `source.orders`。

```sql
-- ✅ 表引用带 schema，列引用用短名
SELECT count(1)
FROM source.orders
WHERE orders.created_at >= '2026-05-17';

-- ❌ 三段式列引用会绑定失败
SELECT count(1)
FROM source.orders
WHERE source.orders.created_at >= '2026-05-17';
-- 错误：Binder Error: Referenced table "source.orders" not found!
-- Candidate tables: "orders"
```

**规则**：

- `FROM schema.table` —— 保留 schema 前缀，定位到远端的 schema。
- `WHERE/SELECT/ORDER BY` 里的列 —— 用 `table.column` 或 `column`，不要写 `schema.table.column`。

如果你有上游系统生成的 SQL 用了三段式，需要在 .NET 侧做规范化；可以把这类逻辑封装成独立的 SQL normalizer，在查询进入 DuckDB 前统一处理。

---

## 九、常见错误排查

### 1. `Catalog Error: Table with name orders does not exist!`

**原因**：只 `ATTACH` 了远程，但没 `USE remote`，当前默认 database 还是本地 `:memory:`。

**解决**：在 `ATTACH` 后立即 `USE remote;`。

### 2. `Binder Error: Referenced table "source.orders" not found!`

**原因**：用了三段式列引用（见上一章）。

**解决**：条件里的列改成 `table.column` 或短名。

### 3. `DuckDB.NET.Data.Full 1.5.3 与 net6.0 不兼容`

**原因**：项目目标框架低于包所支持。

**解决**：把 `<TargetFramework>` 改成 `net8.0` 或更高版本。

### 4. `Quack DuckDB 扩展文件未找到`

**原因**：csproj 里没有把 `extensions/` 声明为 `Content`，或者运行时工作目录不对。

**解决**：

- 检查 csproj 里有 `<Content Include="extensions\**\*" CopyToOutputDirectory="PreserveNewest"/>`。
- 检查 `bin/<Config>/<TFM>/extensions/v1.5.3/<platform>/quack.duckdb_extension` 存在。
- 用 `AppContext.BaseDirectory` 而不是 `Directory.GetCurrentDirectory()`，避免当前目录跳到别处。

### 5. `Parser Error: syntax error at or near "@"`

**原因**：SQL 里用了 `@paramName`。

**解决**：换成 `?` 位置参数、`$name` 命名参数或 Dapper `?name?`。

### 6. DataGrip 能执行，但 .NET 客户端不能

**原因**：工具的连接上下文可能默认就是远端 database，而 .NET 客户端是从本地 `:memory:` 起步。

**排查清单**：

1. 应用实际连接串是什么？
2. 是否已 `INSTALL` + `LOAD` quack 扩展？
3. 是否已 `ATTACH` 远端？
4. `ATTACH` 的 alias 是什么（默认 `remote`）？
5. 是否已 `USE <alias>`？
6. SQL 里的表/列引用是否符合上一章的三段式规则？

---

## 十、最佳实践

### 1. 复用连接，不要每次查询都新建

`INSTALL/LOAD/ATTACH` 都有成本（毫秒到百毫秒级）。建议：

- 在应用启动时执行一次，把 `DuckDBConnection` 作为**单例**保存。
- 后续所有查询复用这条连接。
- 多线程并发查询时，要么串行化访问，要么用连接池模式（DuckDB.NET 支持，但需要额外配置）。

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

### 4. 把过滤、聚合推到远端

DuckDB + Quack 会自动把 SQL 尽量推送到远端执行。但你需要写"可下推"的 SQL：

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

`?` 位置参数、`$name` 命名参数和 `?name?` 伪位置参数都是**真正的参数化**，值永远不会被字符串拼接进 SQL。

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
using Dapper;

const string QuackHost = "<quack-host>";
const int QuackPort = 9494;
const string QuackToken = "<your-token>";

using var connection = new DuckDBConnection("Data Source=:memory:");
connection.Open();

var extPath = GetQuackExtensionPath();
Execute("INSTALL '" + extPath + "';");
Execute("LOAD '" + extPath + "';");
Execute($"ATTACH 'quack:{QuackHost}:{QuackPort}' AS remote " +
        $"(TYPE quack, TOKEN '{QuackToken}', DISABLE_SSL true);");
Execute("USE remote;");

Console.WriteLine("--- 基础查询 ---");
using (var cmd = connection.CreateCommand())
{
    cmd.CommandText = "SELECT order_id, order_status FROM source.orders LIMIT 5;";
    using var reader = cmd.ExecuteReader();
    while (reader.Read())
        Console.WriteLine($"  {reader.GetInt64(0)} {reader.GetString(1)}");
}

Console.WriteLine("\n--- 参数化查询（原生 ?）---");
using (var cmd = connection.CreateCommand())
{
    cmd.CommandText = "SELECT order_id, order_status FROM source.orders WHERE order_status = ? LIMIT ?;";
    cmd.Parameters.Add(new DuckDBParameter { Value = "completed" });
    cmd.Parameters.Add(new DuckDBParameter { Value = 5 });
    using var reader = cmd.ExecuteReader();
    while (reader.Read())
        Console.WriteLine($"  {reader.GetInt64(0)} {reader.GetString(1)}");
}

Console.WriteLine("\n--- 参数化查询（Dapper ?name?）---");
var orders = connection.Query<OrderDto>(
    "SELECT order_id, order_status, order_amount FROM source.orders " +
    "WHERE order_status = ?status? AND order_amount >= ?minAmount? LIMIT ?limit?;",
    new { status = "completed", minAmount = 50.0m, limit = 5 });
foreach (var o in orders)
    Console.WriteLine($"  {o.OrderId} {o.OrderStatus} {o.OrderAmount}");

void Execute(string sql)
{
    using var cmd = connection.CreateCommand();
    cmd.CommandText = sql;
    cmd.ExecuteNonQuery();
}

static string GetQuackExtensionPath()
{
    var arch = System.Runtime.InteropServices.RuntimeInformation.ProcessArchitecture
        is System.Runtime.InteropServices.Architecture.Arm64 ? "arm64" : "amd64";
    var os = System.Runtime.InteropServices.RuntimeInformation.IsOSPlatform(System.Runtime.InteropServices.OSPlatform.Windows)
        ? $"windows_{arch}"
        : System.Runtime.InteropServices.RuntimeInformation.IsOSPlatform(System.Runtime.InteropServices.OSPlatform.Linux)
            ? $"linux_{arch}"
            : throw new PlatformNotSupportedException();

    var path = Path.Combine(AppContext.BaseDirectory, "extensions", "v1.5.3", os, "quack.duckdb_extension");
    if (!File.Exists(path))
        throw new FileNotFoundException($"未找到 quack 扩展: {path}");
    return path.Replace("\\", "/").Replace("'", "''");
}

sealed class OrderDto
{
    public long OrderId { get; set; }
    public string OrderStatus { get; set; } = "";
    public decimal OrderAmount { get; set; }
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
        <PackageReference Include="DuckDB.NET.Data.Full" Version="1.5.3"/>
        <PackageReference Include="Dapper" Version="2.1.35"/>
    </ItemGroup>
    <ItemGroup>
        <Content Include="extensions\**\*" CopyToOutputDirectory="PreserveNewest"/>
    </ItemGroup>
</Project>
```

---

## 十二、封装时建议拆分的代码

如果要把示例代码整理成生产可复用的组件，建议至少拆成这些职责：

- **连接管理**：集中处理 `INSTALL` / `LOAD` / `ATTACH` / `USE`，避免每个查询重复初始化。
- **平台探测**：根据 OS 与 CPU 架构定位 `quack.duckdb_extension`。
- **连接配置解析**：从配置或 secret 管理系统读取 host、port、token、alias、SSL 选项。
- **SQL 方言规范化**：如上游 SQL 会生成三段式列引用，可在进入 DuckDB 前统一改写。
- **参数转换**：如必须兼容上游 `@paramName` 风格，可在 provider 层转换成 `$paramName` 或 `?`。

---

## 十三、速查表

```text
连接：DuckDBConnection("Data Source=:memory:")
       ↓
      INSTALL '<ext_path>'     ← 加载 .duckdb_extension 二进制
       ↓
      LOAD '<ext_path>'        ← 激活扩展
       ↓
      ATTACH 'quack:host:port' AS remote (TYPE quack, TOKEN '...', DISABLE_SSL true)
       ↓
      USE remote               ← 切默认 database，否则查不到远程表
       ↓
      查询：cmd.CommandText = "SELECT ... WHERE col = ?"
            cmd.Parameters.Add(new DuckDBParameter { Value = ... })
            using var reader = cmd.ExecuteReader()
```

**参数占位符速查**：

| 你想要的 | SQL 怎么写 | 怎么传值 |
|---|---|---|
| 位置参数 | `WHERE c = ? AND d = ?` | `cmd.Parameters.Add(...)` 按顺序 |
| 命名参数 | `WHERE c = $name` | `DuckDBParameter.ParameterName = "name"` |
| 命名（Dapper） | `WHERE c = ?name?` | `connection.Query<T>(sql, new { name = ... })` |
| ❌ 不要用 | `WHERE c = @name` | DuckDB 不识别 |
