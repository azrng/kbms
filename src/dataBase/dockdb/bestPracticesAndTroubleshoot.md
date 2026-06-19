---
title: DuckDB 生产级最佳实践与错误排查
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
  - 最佳实践
---

## 九、常见错误排查 🩺

遇到报错不要慌，先对照下面的清单排查。

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

### 6. 🤔 DataGrip 能执行，但 .NET 客户端不能

这是一个非常经典的困惑。**原因**：工具的连接上下文可能默认就是远端 database，而 .NET 客户端是从本地 `:memory:` 起步。

**排查清单**：

1. 应用实际连接串是什么？
2. 是否已 `LOAD` quack 扩展？
3. 是否已 `ATTACH` 远端？
4. `ATTACH` 的 alias 是什么（默认 `remote`）？
5. 是否已 `USE <alias>`？
6. 直接 attached table 是否触发了 schema 丢失？可用 `quack_query_by_name` 验证同一 SQL 是否能跑通。

---

## 十、生产级最佳实践

### 1. 复用连接，不要每次查询都新建

`LOAD/ATTACH` 都有成本（毫秒到百毫秒级）。建议：

- 在应用启动时执行一次初始化，把 `DuckDBConnection` 作为**单例**保存。
- 后续所有查询复用这条连接。
- ⚠️ 多线程并发查询时，**不要假设同一个 `DuckDBConnection` 可以被多个线程随意共享**。更稳妥的做法是串行化访问，或为并发工作单元创建独立连接并各自完成 `LOAD/ATTACH/USE` 初始化。

#### 连接初始化的错误处理

生产代码不要只把初始化 SQL 顺序写在主流程里。建议**把连接初始化包成一个方法，并在异常里带上当前步骤**，方便快速定位是扩展文件、LOAD、ATTACH、认证还是 `USE` 失败：

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

当结果集很大时，**千万别一次性加载到内存**，应该边读边处理：

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

目标是让过滤、聚合、排序和 `LIMIT` **尽量在远端执行**，减少传输数据量。但当前 Quack v1.5.3 实测说明，直接 attached table 查询可能在下推时丢失 schema；因此需要用 `quack_query_by_name` 或封装层验证实际执行路径。

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

`?` 位置参数、`$name` 命名参数和 `?name?` 伪位置参数在 DuckDB.NET / Dapper 层面都是真正的参数化，值不会被字符串拼接进 SQL。但如果你把 SQL 作为字符串传给 `quack_query_by_name(alias, sql)`，**内层 SQL 不能再接收外层参数**，此时必须由封装层负责安全生成 SQL，不能直接拼接用户输入。

```csharp
// ✅ 安全：参数值由 native 引擎绑定
cmd.Parameters.Add(new DuckDBParameter { Value = userInput });

// ❌ 危险：字符串拼接
cmd.CommandText = $"WHERE name = '{userInput}'";
```

---

## 十一、完整示例：可运行的 Console 项目

把下面两个文件放在一起，配上扩展文件，就能直接跑起来 👇

### Program.cs

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

### YourApp.csproj

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

## 十二、封装建议：生产项目应该怎么拆

如果要把上面的示例代码整理成生产可复用的组件，建议至少拆成以下几个职责模块：

- 🔌 **连接管理**：集中处理 `LOAD` / `ATTACH` / `USE`，避免每个查询重复初始化。
- 🖥️ **平台探测**：根据 OS 与 CPU 架构定位 `quack.duckdb_extension`。
- 🔐 **连接配置解析**：从配置或 secret 管理系统读取 host、port、token、alias、SSL 选项。
- 🔧 **SQL 方言规范化**：如上游 SQL 会生成三段式列引用，可在进入 DuckDB 前统一改写。
- 🔄 **参数转换**：如必须兼容上游 `@paramName` 风格，可在 provider 层转换成 `$paramName` 或 `?`。

---

## 十三、速查表 📋

收藏这一段，随时查阅：

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

---

## 📌 核心总结

把这篇文章的要点浓缩成五句话：

1. **连接链路是四层**：你的应用 → ADO.NET Provider → 本地 DuckDB → quack 扩展 → 远端服务。你不是直连远端，而是"先本地再远程"。

2. **三个必踩的坑**：`@paramName` 不支持、`ATTACH` 后必须 `USE remote`、直接查 attached table 可能丢失 schema。

3. **`quack_query_by_name` 是当前最可靠的远端查询方式**，但它只接受 `(alias, sql)` 两个字符串参数，外层参数绑定传不进去。

4. **参数化的现实解法**：在封装层做强类型校验 + SQL literal 转义，生成完整 SQL 再交给远端。安全的前提是只接受已校验类型。

5. **生产项目必须有封装层**：处理连接管理、平台探测、SQL 方言规范化和参数转换。不要把裸 SQL 散落在业务代码各处。
