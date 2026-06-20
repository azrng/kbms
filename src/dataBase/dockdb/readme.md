---
title: DuckDB
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

## 概述

DuckDB 是一个**嵌入式 OLAP 数据库**，可以理解为"**分析场景的 SQLite**"：

- **嵌入式**：以 `.dll/.so/.dylib` 形式被 .NET 进程直接加载，不需要单独跑数据库服务
- **OLAP**：面向分析型负载（聚合、扫表、大结果集）
- **SQL 兼容**：使用 PostgreSQL 风格的 SQL 语法

**官网**：https://duckdb.org/

**NuGet 包**：`DuckDB.NET.Data.Full`

---

## Quack 扩展

Quack 是 DuckDB 的**远程协议扩展**，让多个客户端可以共享同一份远程数据：

- **Quack 服务端**：独立进程，对外暴露 Quack 协议
- **Quack 客户端**：通过 `ATTACH ... (TYPE quack, ...)` 像访问本地表一样查询远程数据

### 调用链路

```text
.NET 应用
  └── DuckDB.NET.Data.Full（ADO.NET Provider）
        └── 本地嵌入式 DuckDB native engine
              └── quack loadable extension
                    └── 远程 Quack DuckDB 服务端
```

---

## 核心要点

### 三个必踩的坑

1. **DuckDB 不支持 `@paramName`** → 使用 `?`、`$1` 或 `$paramName`
2. **`ATTACH` 后必须 `USE remote`** → 否则查不到远程表
3. **直接查 attached table 可能丢失 schema** → 使用 `quack_query_by_name`

### 参数化查询对比

| 方式 | 语法 | 适用场景 |
|------|------|----------|
| 原生 `?` | `WHERE c = ?` | 简单 SQL、性能敏感 |
| 原生 `$name` | `WHERE c = $name` | 原生 DuckDB.NET 业务查询 |
| Dapper `?name?` | `WHERE c = ?name?` | Dapper DTO 投影 |

> ⚠️ Quack 远端查询场景下，外层参数绑定不会传入 `quack_query_by_name` 内层 SQL

---

## 文档导航

| 文档 | 内容 |
|------|------|
| [基本操作：创建数据库、Schema 与表](basicOperations.md) | 创建数据库、Schema、表、插入数据、基本查询 |
| [概念入门与对比](conceptAndCompare.md) | DuckDB/Quack 概念、与 SQL Server/PostgreSQL 对比 |
| [客户端配置与连接](connectionSetup.md) | NuGet 包、扩展文件、连接字符串、quack_query 模式 |
| [查询与参数化查询](queryAndParameter.md) | 基础查询、三种参数化方式、Quack 场景实测结论 |
| [类型映射与 SQL 陷阱](typeMappingAndTraps.md) | .NET 类型映射、NULL 处理、三段式列引用 |
| [最佳实践与错误排查](bestPracticesAndTroubleshoot.md) | 生产级实践、常见错误、完整示例、速查表 |

---

## 快速开始

```csharp
using DuckDB.NET.Data;

// 1. 打开本地内存 DuckDB
using var connection = new DuckDBConnection("Data Source=:memory:");
connection.Open();

// 2. 加载扩展
connection.CreateCommand().CommandText = "LOAD '<quack_extension_path>'";
connection.CreateCommand().ExecuteNonQuery();

// 3. ATTACH 远程服务端
connection.CreateCommand().CommandText = "ATTACH 'quack:host:port' AS remote (TYPE quack, TOKEN '...', DISABLE_SSL true)";
connection.CreateCommand().ExecuteNonQuery();

// 4. 切换默认 database
connection.CreateCommand().CommandText = "USE remote";
connection.CreateCommand().ExecuteNonQuery();

// 5. 查询
connection.CreateCommand().CommandText = "SELECT * FROM quack_query_by_name('remote', 'SELECT * FROM source.table LIMIT 10')";
using var reader = connection.CreateCommand().ExecuteReader();
while (reader.Read()) { /* 处理数据 */ }
```

---

## 版本信息

| 组件 | 版本 | 说明 |
|------|------|------|
| DuckDB | v1.5.3 (Variegata) | 嵌入式数据库引擎 |
| Quack 扩展 | 1693647 | 远程协议扩展 |
| DuckDB.NET.Data.Full | 1.5.3 | .NET ADO.NET Provider |
| 目标框架 | .NET 8.0+ | 最低要求 |
