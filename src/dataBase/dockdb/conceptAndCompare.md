---
title: DuckDB + Quack 概念入门与对比
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

## 一、概念入门：先弄清楚三个东西

在写代码之前，我们先花几分钟把三个核心概念捋清楚。磨刀不误砍柴工。

### 1. DuckDB 是什么 🦆

DuckDB 是一个**嵌入式 OLAP 数据库**，你可以把它理解为"**分析场景的 SQLite**"：

- **嵌入式**：以 `.dll/.so/.dylib` 形式被你的 .NET 进程直接加载，**不需要单独跑一个数据库服务**。
- **OLAP**：面向分析型负载（聚合、扫表、大结果集），不是 OLTP（高并发小事务）。
- **SQL 兼容**：使用 PostgreSQL 风格的 SQL 语法。

在 .NET 里，我们通过 `DuckDB.NET.Data.Full` 这个 NuGet 包来调用它。

### 2. Quack 是什么

Quack 是 DuckDB 的**远程协议扩展**（loadable extension）。DuckDB 本身是嵌入式的，但实际项目中你可能需要**让多个客户端共享同一份远程数据**，于是就有了 Quack：

- **Quack 服务端**：一个独立进程（或容器），背后挂一份 DuckDB 文件或 catalog，对外暴露 Quack 协议。
- **Quack 客户端**：在本地 DuckDB 里加载 `quack` 扩展后，通过 `ATTACH ... (TYPE quack, ...)` 就能**像访问本地表一样查询远程数据**。

### 3. 调用链路：四层结构

理解整个调用链路至关重要。从你的代码到远端数据，中间一共经过四层：

```text
你的 .NET 应用
  └── DuckDB.NET.Data.Full（ADO.NET Provider）
        └── 本地嵌入式 DuckDB native engine（duckdb.dll/.so/.dylib）
              └── quack loadable extension（quack.duckdb_extension）
                    └── 远程 Quack DuckDB 服务端
```

💡 **关键认知**：你**不是"直接连"远程 Quack 服务端**。实际过程是——先在你的进程内启动一个本地 DuckDB 实例，再让它通过 quack 扩展去和远端通信。**本地这层 DuckDB 既是 SQL 解析器、又是协议客户端。**

理解了这一点，后面很多"为什么"就迎刃而解了。

---

## 二、概念对比：和 SQL Server / PostgreSQL 有什么不同

如果你之前一直用 SQL Server 或 PostgreSQL，迁移到 DuckDB + Quack 时，有几个关键差异必须心里有数：

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

⚠️ **最容易踩坑的三条**（每条都是血的教训）：

1. **DuckDB 不支持 `@paramName`**。直接写会报语法错误，应改用 `?`、`$1` 或 `$paramName`。
2. **`ATTACH` 之后默认库还是本地 `:memory:`**。不 `USE remote`，就查不到远程表。
3. **直接查询 attached table 不一定等价于远端执行原 SQL**。当前实测环境中，`SELECT ... FROM source.orders` 会在下推时丢失 schema，报 `Table with name orders does not exist`；可用 `quack_query_by_name(alias, sql)` 让远端解析 SQL。
