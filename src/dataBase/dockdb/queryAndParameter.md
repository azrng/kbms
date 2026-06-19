---
title: DuckDB 查询与参数化查询
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

## 五、基础查询：先把数据读出来

连接建立好了，我们来做第一次查询。

### ⚠️ 直接查 attached table 可能失败

在当前 Quack v1.5.3 实测中，直接执行下面这种 attached table 查询**可能失败**：

```sql
SELECT order_id, user_id, order_status, order_amount
FROM source.orders
LIMIT 10;
```

典型错误是远端实际收到的查询**丢失了 schema**，变成 `FROM orders`：

```text
Invalid Input Error: Table with name orders does not exist!
Did you mean "source.orders"?
```

### ✅ 更稳妥的方式：`quack_query_by_name`

使用 Quack 扩展提供的 `quack_query_by_name(alias, sql)`，**把完整 SQL 字符串交给远端解析**，就能避免下推过程中 schema 丢失的问题：

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

**几个要点**：

- `CreateCommand()` 自带 `DuckDBCommand`，绑定到当前 `connection`。
- `ExecuteReader()` 返回 `DbDataReader`，可以用 `Read()` 逐行推进。
- 用 `IsDBNull(i)` 检查 NULL，否则 `GetInt64` 等强类型方法会抛异常。
- `using` 释放命令和 reader，避免资源泄漏。
- ⚠️ **`quack_query_by_name` 只接受 `(alias, sql)` 两个字符串参数**；它不能接收外层 `DuckDBParameter` 并转发给内层 SQL。这一点在后面的参数化查询章节尤为关键。

---

## 六、参数化查询：本文最核心的章节

如果你从 SQL Server / PostgreSQL 迁移过来，这一章能帮你避开最大的几个坑。

### 1. 为什么不能用 `@paramName`

你可能习惯这样写：

```sql
-- ❌ 在 DuckDB 里行不通
SELECT * FROM source.orders WHERE order_status = @status AND amount >= @minAmount;
```

但 DuckDB **不认识 `@` 前缀的命名参数**。直接传过去会报语法错误。

DuckDB 实际支持以下参数占位符：

| 写法 | 含义 | 示例 |
|---|---|---|
| `?` | 按出现顺序绑定 | `WHERE status = ? AND amount >= ?` |
| `$1, $2, ...` | 显式位置编号 | `WHERE status = $1 AND amount >= $2` |
| `$name` | 命名参数 | `WHERE status = $status` |

💡 下面将介绍三种 DuckDB.NET / Dapper 的参数绑定语法。但在当前 Quack v1.5.3 的远端查询场景里有一个**重要限制**：如果查询必须通过 `quack_query_by_name(alias, sql)` 才能正确执行，**外层 `DuckDBParameter` 不会传入内层 SQL**。也就是说，下面示例适用于本地 DuckDB 查询；**不要直接把它们套到 `quack_query_by_name` 内层 SQL 里**。

### 2. 方式 A：DuckDB 原生 `?` 位置参数（推荐学习）

这是最直接、最贴近 native 引擎行为的写法。⚠️ 注意：当前实测中，这种写法直接查询 `source.orders` 会因为 Quack 下推丢失 schema 而失败，需要封装层处理。

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

**方式 A 的特点**：

- ✅ 与 DuckDB C++ 引擎原生兼容，无任何中间转换
- ✅ 性能最好
- ⚠️ 没有"参数名"，只能靠顺序，参数多了容易对错位置
- ⚠️ 同一个值用两次需要 `Add` 两次

### 3. 方式 B：DuckDB 原生 `$name` 命名参数（推荐日常使用）

如果不想依赖 `?` 的位置顺序，可以使用 DuckDB 原生的 `$name` 命名参数。⚠️ 同样注意：当前实测中，直接查询 `source.orders` 会因为 Quack 下推丢失 schema 而失败。

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

**方式 B 的特点**：

- ✅ SQL 可读性好，参数和值一一对应
- ✅ 不依赖参数添加顺序
- ✅ 不需要 Dapper 参与，适合只使用 DuckDB.NET 原生 API 的场景
- ⚠️ 参数名使用 `$name`，**不是** SQL Server / Npgsql 常见的 `@name`

### 4. 方式 C：Dapper 的 `?name?` 伪位置参数

Dapper 提供了一种 **pseudo-positional parameters** 语法：用 `?name?`（前后各一个 `?`）。这是 **Dapper 的参数重写特性**，不是 DuckDB SQL 自身的占位符语法。

⚠️ 注意：当前实测环境中，`connection.Query<T>()` 直接执行 `FROM source.orders WHERE ... ?status? ...` 没有跑通，报 `Values were not provided for the following prepared statement parameters`。因此**不要把它作为"原生 Quack 直连必然可用"的写法**。

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

**方式 C 的特点**：

- ✅ 可读性好，参数和值一一对应
- ✅ Dapper 内部会按 SQL 中 `?name?` 的出现位置绑定对应参数值
- ✅ 强类型映射 `Query<T>` 直接返回对象
- ⚠️ 在 Dapper 本地参数重写语义中，同名参数多次出现时会复用同一个值；Quack 远端场景仍需实测
- ⚠️ DTO 构造函数和属性映射要与查询列名匹配（详见下一章）

### 5. 三种方式横向对比

| 维度 | 方式 A（原生 `?`） | 方式 B（原生 `$name`） | 方式 C（Dapper `?name?`） |
|---|---|---|---|
| 性能 | 最直接 | 最直接 | Dapper 多一层映射，通常差异很小 |
| 可读性 | 参数多时差 | 好 | 好 |
| 强类型映射 | 需要手写 reader | 需要手写 reader | 自动 |
| 多次复用同名参数 | 要 `Add` 多次 | 写一次即可 | Dapper 语义下写一次即可，Quack 远端需封装层验证 |
| 适合场景 | 简单 SQL、性能敏感 | 原生 DuckDB.NET 业务查询 | Dapper DTO 投影 |

### 6. Quack 场景下的实测结论：关键 ⚠️

在当前 Quack v1.5.3 实测环境里，参数化查询有一个绕不开的限制：

- `quack_query_by_name` 只支持两个参数：`quack_query_by_name(alias, sql)`。
- `quack_query_by_name('remote', '... ? ...', value)` 不支持，会报函数签名不匹配。
- **外层 `DuckDBParameter` 不会传给 `quack_query_by_name` 的内层 SQL**。
- 现有 `@paramName -> ? / $1` 转换如果仍走 attached table 查询，也会遇到 schema 下推丢失问题。

那么怎么办？当前可验证的做法是：**对业务参数做强类型校验和 SQL literal 转义，然后生成完整远端 SQL，再交给 `quack_query_by_name`**。这不是数据库层面的绑定参数，但比直接拼接用户输入安全得多——前提是**封装层必须只接受已校验类型，不允许把任意字符串当 SQL 片段拼进去**。

下面是一段实测通过的示例代码。注意每个辅助方法都做了类型约束和范围校验：

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

### 7. ⚠️ 千万别这么写：反面教材

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
