---
title: DuckDB 类型映射与 SQL 方言陷阱
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
---

## 一、类型映射与 NULL 处理

### 1. .NET 类型 → DuckDB 类型映射

`DuckDBParameter` 会根据 `Value` 的运行时类型自动推断。常见映射如下：

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

### 2. NULL 怎么传？

这是一个非常常见的坑——**C# 的 `null` 和数据库的 NULL 不是一回事**：

```csharp
// ✅ 正确
cmd.Parameters.Add(new DuckDBParameter { Value = DBNull.Value });

// ❌ 错误：C# null 在某些路径下会被当成"未设置参数"
cmd.Parameters.Add(new DuckDBParameter { Value = null });
```

读取数据时同样需要**先判断 NULL 再取值**：

```csharp
var userId = reader.IsDBNull(1) ? (long?)null : reader.GetInt64(1);
```

### 3. Dapper 强类型映射的构造函数建议

如果你用 Dapper 做对象映射，关于 DTO 的定义方式有个小建议：

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

## 二、SQL 方言陷阱：三段式列引用

有些上游 SQL 生成器会输出 `schema.table.column` 形式的三段式列引用。DuckDB 在部分查询场景下会把 `source.orders` 作为 schema + table 解析，但在列限定符里继续写 `source.orders.created_at` 可能触发绑定错误。这个问题与具体 DuckDB 版本、SQL 形态和是否经过 Quack 远端解析有关，**建议在目标版本上实际验证**。

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

**实测结论**：

- 直接 attached table 查询时，`FROM source.orders` 在当前环境下会下推成 `FROM orders` 并失败。
- `WHERE source.orders.created_at ...` 会触发 Binder Error。
- 使用 `quack_query_by_name('remote', 'SELECT ... FROM source.orders ...')` 可以让远端正确识别 `source.orders`。
- 如果要改写三段式列引用，应在封装层做 SQL normalizer，并用目标版本实测。

💡 **实用建议**：如果你有上游系统生成的 SQL 用了三段式，需要在 .NET 侧做规范化。可以把这类逻辑封装成独立的 SQL normalizer，在查询进入 DuckDB 前统一处理。
