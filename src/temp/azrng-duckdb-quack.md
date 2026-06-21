---
title: Azrng.DuckDB.Quack 介绍
lang: zh-CN
date: 2026-06-21
publish: true
author: azrng
isOriginal: true
category:
  - dotnet
tag:
  - duckdb
  - quack
  - ado.net
  - dapper
---

# Azrng.DuckDB.Quack 介绍

> 纯 C# 实现的 DuckDB Quack 协议 ADO.NET 提供程序，无需 native DLL 依赖。
> 当前版本：**1.0.0-beta2**，多目标框架 `net8.0;net10.0`。

## 一、从 DuckDB 到 duckdb-quack

### 1.1 DuckDB 是什么

[DuckDB](https://duckdb.org/) 是一个**进程内分析型数据库**（in-process OLAP DB），可以理解为"分析场景的 SQLite"：

- 以 C++ 编写，作为一个库嵌入到宿主进程内运行（而非独立服务）；
- 面向 OLAP：列式存储、向量化执行，擅长大数据量的聚合/扫描，而不是高并发点查；
- 零运维、单文件，开箱即用。

它的原生形态决定了它本质上是**单机、嵌入式的**——同一个数据库文件通常由一个进程独占访问。当我们需要让多个客户端通过网络访问同一个 DuckDB 实例时，就需要一套远程协议。

### 1.2 duckdb-quack 是什么

[duckdb-quack](https://github.com/duckdb/duckdb-quack)（仓库全名 `duckdb/duckdb-quack`）是 DuckDB 官方提供的一个**扩展（extension）**，它给 DuckDB 增加了一套 **client/server 协议（The Quack Client/Server Protocol）**。

| 项目 | 信息 |
|------|------|
| 仓库 | https://github.com/duckdb/duckdb-quack |
| 当前版本 | `v1.5-variegata`（pre-release，实验性） |
| 主要语言 | C++（约 88%） |
| 许可证 | MIT |
| 适配 DuckDB | `1.5.3` |

> ⚠️ **实验性 / 预发布**：Quack 官方原文明确——*"Quack is released as a pre-release extension and is currently experimental."* 目前以**预发布扩展（pre-release）**形式提供，处于**实验性（experimental）**阶段。这意味着协议形态、函数命名、消息格式等都可能随版本调整，**不建议未经充分测试直接用于生产关键链路**。遇到问题可在 [GitHub Issues](https://github.com/duckdb/duckdb-quack/issues) 反馈。
> Azrng.DuckDB.Quack 跟随该实验性协议实现，当前同样处于 beta 阶段，使用前请评估风险。

它的核心定位是：

> The `quack` extension adds a client-server protocol to DuckDB. With this extension, DuckDB can act as both a server and a client to communicate over a network.

也就是说，加载了 quack 扩展之后，**DuckDB 既可以当服务端（对外暴露数据），也可以当客户端（去连别的 DuckDB 实例）**，两端通过网络通信。

#### 服务端 / 客户端用法（官方示例）

```sql
-- 1) 在一个 DuckDB 实例（服务端）上启动 quack
INSTALL quack;
LOAD quack;

CALL quack_serve('quack:localhost', token = 'super_secret');
CREATE TABLE hello AS FROM VALUES ('world') v(s);
```

```sql
-- 2) 从另一个 DuckDB 实例（客户端）连接并读取
CREATE SECRET (TYPE quack, TOKEN 'super_secret');
ATTACH 'quack:localhost' AS remote;
FROM remote.hello;          -- 查到服务端的 hello 表
```

> **命名小贴士**：在 C++ 源码`docs/usage.md` 里，函数名还是 `rpc_start`/`rpc_stop`/`rpc_call`、端点是 `/rpc`；公开发布版统一改名为 `quack_serve`/`quack:`、端点 `/quack`，端口 `9494` 不变。这是同一套协议在不同阶段的命名演进，线协议本身（消息、LEB128、列式）是一致的。本文统一采用公开发布版的 `quack` 命名。

#### duckdb-quack 与 DuckDB 的关系

一句话总结：**quack 是依附于 DuckDB 引擎的扩展，它本身不实现存储/查询引擎，而是复用 DuckDB 的能力，为其补齐"网络远程访问"这一块**。

```
┌──────────────────────────────────────────────┐
│                  DuckDB 引擎                  │   ← C++，存储 + 向量化执行
│  ┌────────────────────────────────────────┐  │
│  │            quack 扩展（C++）            │  │   ← 加上 client/server 协议
│  │   服务端：quack_serve 暴露 /quack 端点    │  │
│  │   客户端：ATTACH 'quack:...' 远程访问     │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

参考：

- 协议总览：https://duckdb.org/docs/current/quack/overview.html
- 发布博客：https://duckdb.org/2026/05/12/quack-remote-protocol

## 二、Quack 协议原理

以下结论来自对 C++ 源码（`quack_message.json`、`quack_client.hpp`、`docs/usage.md`）与 `Azrng.DuckDB.Quack` 源码（`QuackProtocolConfig`、`QuackBinaryReader`、`ColumnarBatch`、`IQuackProtocolBridge`）的梳理。

### 2.1 传输层：HTTP(S) + 固定端点

- 默认端口 **`9494`**，请求路径固定为 **`/quack`**；
- 根据 `DisableSsl` 决定走 `http` 还是 `https`；
- 客户端向 `http(s)://host:9494/quack` 发起 `POST`（请求体 `application/octet-stream`），把消息二进制编码后发送，服务端处理后返回二进制响应。

> 这意味着 Quack 协议是建立在 HTTP 之上的**自定义二进制消息协议**，而不是 JDBC/ODBC 那种长连接协议，天然适配反向代理、网关等 HTTP 基础设施。

### 2.2 消息模型（来自 `quack_message.json`）

协议是"消息对（request/response）"模型。每条消息都带一个 `MessageHeader`：

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | MessageType | 消息类型 |
| `connection_id` | string | 连接标识（一次 `ATTACH`/连接内稳定） |
| `client_query_id` | optional_idx | 客户端单调递增的查询 id，用于关联两端日志 |

核心消息类型：

| 消息 | 方向 | 关键字段 | 对应 C# 方法 |
|------|------|----------|--------------|
| `PrepareRequestMessage` | 请求 | `sql_query` | `ExecuteQueryAsync` |
| `PrepareResponseMessage` | 响应 | `result_types`、`result_names`、`needs_more_fetch`、`results` | `QuackQueryResult` |
| `FetchRequestMessage` | 请求 | `uuid`（hugeint，结果句柄） | `FetchAsync` |
| `ErrorResponse` | 响应 | `message` | 抛 `QuackProtocolException` |
| `DisconnectMessage` / `SuccessResponse` | - | - | `CloseSessionAsync` |

### 2.3 认证：Token

- 认证基于一个 **Token**（对应服务端的 `CREATE SECRET (TYPE quack, TOKEN '...')`）；
- 客户端在连接字符串中携带 `Token=...`，连接建立时校验。

### 2.4 结果传输：列式（Arrow 风格）+ null 位图

DuckDB 是列式引擎，`PrepareResponseMessage.results` 以**列式批（DataChunk / columnar batch）**传输：

- 每一列以**原生 typed 数组**承载（`long[]` / `double[]` / `string?[]` 等），避免对值类型逐元素装箱；
- 配合**按位的 null 位图（validity bitmap）**标记空值：`bit=1` 表示非 null；
- 解码端可直接按列索引访问，无需行列转置，吞吐高、分配少。

### 2.5 线路编码：LEB128 变长整数

协议中大量数值（包括 `result_uuid`、字段长度前缀等）使用 **LEB128 变长整数编码**紧凑传输，支持无符号（`ReadVarUInt`）与有符号（signed LEB128，`ReadVarInt`）两种。这也是 beta2 的修复重点——大结果集续读时涉及非规范 / signed LEB128 的重新编码处理。

### 2.6 大结果集：Fetch 续读

当一次查询的结果集很大时不会一次性返回，而是基于一个 `uuid`（hugeint 结果句柄）进行**分批续读（FETCH）**：

- 首批随 `PrepareResponseMessage` 返回，并带 `needs_more_fetch` 标志；
- 客户端据此反复发 `FetchRequestMessage(uuid)` 取下一批，直到取完；
- 服务端按 `quack_fetch_batch_chunks`（默认 12 个 DataChunk）或 `quack_fetch_batch_bytes`（默认 4 MiB）打包，命中任一上限即返回一批。

### 2.7 会话与多语句

- 协议是**会话（Session）级**的，连接绑定一个 `connection_id`（C# 侧即 `QuackProtocolSession.SessionId`）；
- 借助 DuckDB 原生的多语句执行能力，可以把"切换上下文 + 真正的查询"拼在一次请求里（例如 `USE "catalog"; SELECT ...`），零额外 HTTP 往返（见下文 `Catalog` 机制）。

## 三、Azrng.DuckDB.Quack 是什么

### 3.1 定位

`Azrng.DuckDB.Quack` 是一个**纯 C# 实现的 ADO.NET 提供程序（Provider）**，实现了上面那套 Quack 协议的**客户端**部分。

- 角色：**客户端 Provider**。服务端仍然由 DuckDB + quack 扩展（C++）承担，本库负责让 .NET 应用作为客户端去连接、查询远程 DuckDB。
- 价值：.NET 应用**无需引入任何 native DLL / C++ 依赖**，就能通过 Quack 协议访问远程 DuckDB；同时完全融入 ADO.NET / Dapper 生态，写法和用其他数据库几乎一致。

### 3.2 项目来历（重要）

本项目**基于 C++ 项目 duckdb-quack，通过 AI 辅助翻译/迁移到纯 C#**，整个过程**耗时约两天多**。

需要说明的是，这里"翻译"的是 **duckdb-quack 中描述的客户端线协议逻辑**——连接握手、消息序列化、列式结果解码、LEB128 处理、Fetch 续读等——用 C# 重新实现一遍，使其成为一个独立的托管客户端。DuckDB 引擎本身和作为服务端的 quack 扩展依旧是 C++ 的，并未被重写。

> 简单说：**C++ 写的服务端协议 → AI 辅助翻译成纯 C# 的客户端实现**，让 .NET 侧摆脱 native 依赖。

### 3.3 功能特性一览

- 完整的 ADO.NET 接口实现：`QuackConnection`、`QuackCommand`、`QuackDataReader`；
- 参数化查询（`@name`、`:param` 两种格式）；
- 兼容 **Dapper** ORM；
- 异步 API 支持；
- 连接池复用；
- SSL/TLS 可配置；
- 结构化日志（`ILogger`）；
- 指标收集（查询耗时、连接数、错误率、P99）；
- 事务支持（BEGIN / COMMIT / ROLLBACK）；
- 批量操作（批量 INSERT）；
- Token 加密存储（AES-GCM）。

### 3.4 协议版本对齐

| 项 | 值 |
|----|----|
| DuckDB 版本 | `1.5.3` |
| Quack 版本 | `v1.5-variegata` |
| Native ABI 版本 | `1` |

## 四、duckdb-quack（C++）vs Azrng.DuckDB.Quack（C#）

两者**说的是同一套协议**、对齐同一版本（DuckDB `1.5.3` / Quack `v1.5-variegata`），但形态、定位、实现方式完全不同。

| 维度 | duckdb-quack（C++ 扩展） | Azrng.DuckDB.Quack（C# 包） |
|------|---------------------------|------------------------------|
| 语言 | C++（~88%） | 纯 C#（托管） |
| 形态 | DuckDB 扩展（`.duckdb_extension`），加载进 DuckDB 引擎 | 独立的 NuGet 库 / ADO.NET Provider |
| 角色 | **服务端 + 客户端**都有 | **仅客户端** |
| 客户端运行前提 | 客户端必须是一个 DuckDB 实例（CLI / 嵌入式） | 任意 .NET 应用，**不需要装 DuckDB** |
| 是否依赖 native | 是，依赖 DuckDB C++ 引擎 | **否，零 native DLL** |
| 编解码实现 | 复用引擎内部类型：`DataChunk`、`LogicalType`、`MemoryStream`、序列化器、`http_util`、`logger` | 自行用 C# 实现：`QuackBinaryReader`、`ColumnarBatch`、消息序列化 |
| 接入方式 | SQL 内 `ATTACH 'quack:...' AS remote` / `rpc_call()` | `QuackConnection` + ADO.NET / Dapper |
| 查询下推 | `ATTACH` 支持 projection / filter 自动下推到服务端 | 直接下发用户写的 SQL（由服务端优化器处理） |
| 部署体积 | native 二进制，按 OS / CPU 架构分别发布 | 托管 DLL，跨平台、AOT / trim 友好 |
| 项目目标 | 官方权威协议实现 | 纯 C# 客户端移植（学习） |

### 架构对照

```
       【C++ 路线：客户端=引擎的一部分】                  【C# 路线：独立客户端】
┌───────────────────────────────┐        ┌───────────────────────────────┐
│  Python/Java/Go/.NET + DuckDB │        │            .NET 应用           │
│  ┌─────────────────────────┐  │        │  ┌──────────────────────────┐  │
│  │  DuckDB 引擎 (libduckdb) │  │        │  │ Azrng.DuckDB.Quack (C#)  │  │
│  │  ┌───────────────────┐  │  │        │  │  自实现协议编解码         │  │
│  │  │ quack 扩展(客户端) │──┼──┼──HTTP──┼──│  Connection/Command/...  │  │
│  │  └───────────────────┘  │  │ (9494) │  └──────────────────────────┘  │
│  └─────────────────────────┘  │        │   （无 libduckdb）             │
└───────────────────────────────┘        └───────────────────────────────┘
                         │                                │
                         └──────── HTTP ──── /quack ──────┘
                                       ▼
                         ┌───────────────────────────────┐
                         │ DuckDB 引擎 + quack 扩展(服务端) │   ← 始终是 C++
                         │       quack_serve / 9494        │
                         └───────────────────────────────┘
```

关键差别一句话：**C++ 的客户端是"寄生"在 DuckDB 引擎里的**，靠复用引擎的 `DataChunk`/`LogicalType`/序列化器来完成编解码；**C# 的客户端把这套编解码整体用托管代码重写**，从而脱离引擎独立运行。服务端两种路线都连同一个（C++ 的）DuckDB + quack。

## 五、不依赖 native DLL 的实现方式

这是本库的核心技术点：**为什么可以不带 native 库，又是怎么做到的**。

### 5.1 为什么可以不用 native DLL

关键洞察：**客户端根本不需要"执行" SQL，执行 SQL 是服务端（DuckDB 引擎）的职责**。一个 Quack 客户端要做的事情只有三件：

1. 把"SQL 文本 + 参数"按协议**序列化**成字节；
2. 通过 HTTP **发送**给服务端；
3. 把返回的字节**反序列化**成列式结果。

也就是说，Quack 客户端本质上 = **"二进制协议编解码器 + HTTP 传输"**。这套协议是 DuckDB 官方**文档化、开放**的（见协议总览页），只要把消息格式实现出来，就不再需要 DuckDB 引擎本身。

> C++ 的 quack 客户端之所以依赖引擎，并不是协议本身需要，而是因为它**本来就是 DuckDB 的一部分**，顺手复用了引擎的 `DataChunk`/`LogicalType`/`MemoryStream`/序列化器/`http_util` 来实现编解码。把它从引擎里"抽出来"用 C# 重写一遍，就得到了一个零依赖的独立客户端。

### 5.2 分层实现（对应真实源码文件）

```
┌──────────────────────────────────────────────────────────────┐
│  ⑥ ADO.NET 表面层                                            │
│  QuackConnection / QuackCommand / QuackDataReader            │
│  QuackParameterCollection / QuackTransaction                 │
├──────────────────────────────────────────────────────────────┤
│  ⑤ 协议桥层  IQuackProtocolBridge                            │
│  QuackProtocolBridge / PureQuackProtocolBridge               │
│  ConnectAsync / ExecuteQueryAsync / FetchAsync / Close…      │
├──────────────────────────────────────────────────────────────┤
│  ④ 编解码层                                                  │
│  QuackBinaryReader (LEB128: ReadVarUInt / ReadVarInt…)        │
│  ColumnarBatch (typed 数组 + validity 位图)                   │
├──────────────────────────────────────────────────────────────┤
│  ③ 传输层   QuackHttpClient  (System.Net.Http.HttpClient)    │
├──────────────────────────────────────────────────────────────┤
│  ② 配套：连接池 / 重试 / 指标 / Token 加密                    │
│  QuackConnectionPool · QuackRetryPolicy ·                    │
│  QuackProtocolMetrics · QuackTokenEncryptor(AES-GCM)         │
├──────────────────────────────────────────────────────────────┤
│  ① 版本/配置  QuackProtocolVersions · QuackProtocolConfig    │
└──────────────────────────────────────────────────────────────┘
```

- **传输层 `Internal/QuackHttpClient`**：用 `System.Net.Http.HttpClient` 向 `/quack` 发 `POST`（`application/octet-stream`）；进程级共享连接池（keep-alive 复用 TCP，避免高并发下临时端口耗尽），支持外部注入 `HttpClient`、自定义超时与 SSL/TLS（可关证书校验或指定自签 CA）。
- **编解码层 `Internal/QuackBinaryReader`**：手写无符号/有符号 LEB128、字段 ID、VarInt 长度前缀 UTF-8 字符串、字节块读取；`Internal/ColumnarBatch` 用 typed 原生数组 + 按位 null 位图承载列式结果，避免装箱。
- **协议桥层 `IQuackProtocolBridge`**：把 ADO.NET 语义映射为线协议消息——`ConnectAsync`→建立会话、`ExecuteQueryAsync`→`PrepareRequestMessage(sql)`、`FetchAsync`→`FetchRequestMessage(uuid)`、`CloseSessionAsync`→`DisconnectMessage`。
- **ADO.NET 表面层**：标准 `DbConnection`/`DbCommand`/`DbDataReader` 等，因此天然兼容 Dapper、DI、`ILogger`。
- **配套**：`QuackConnectionPool`/`QuackConnectionLease` 连接池、`QuackRetryPolicy` 重试、`QuackProtocolMetrics`/`MetricsSnapshot` 指标、`QuackTokenEncryptor` 客户端侧 AES-GCM Token 加密。

### 5.3 与 C++ 消息的对应关系

| C++ 消息（`quack_message.json`） | C# 侧对应 |
|----------------------------------|-----------|
| `MessageHeader(connection_id, client_query_id)` | `QuackProtocolSession.SessionId` + 客户端查询 id |
| `PrepareRequestMessage(sql_query)` | `IQuackProtocolBridge.ExecuteQueryAsync` |
| `PrepareResponseMessage(result_types/names/needs_more_fetch/results)` | `QuackQueryResult`（含列信息 + 首批 + 是否需续读） |
| `FetchRequestMessage(uuid)` | `IQuackProtocolBridge.FetchAsync(fetchToken)` |
| `ErrorResponse` | 抛 `QuackProtocolException`（含 HTTP 状态码） |
| `DisconnectMessage` | `CloseSessionAsync` |

### 5.4 这样做的收益

- **零 native**：不打包 `libduckdb`（按 OS/CPU 架构几十 MB 的二进制），容器镜像更小、CI 更简单；
- **跨平台一致**：一个托管 DLL 跑遍 Windows / Linux / macOS，AOT 与 trimming 友好（无 P/Invoke、无 cgo）；
- **无版本漂移**：不会出现"客户端 native 库与服务端 DuckDB 版本错配"的问题；
- **生态契合**：原生融入 ADO.NET / Dapper / 依赖注入 / `ILogger`，迁移成本低。

## 六、其他语言如何连接 Quack（及官方文档地址）

由于 quack 是 DuckDB 的扩展，**任何语言的官方 DuckDB 客户端绑定都能用它**——这些绑定的共同点是：**内部都打包了 native 的 `libduckdb`（C++ 引擎）**。用法套路统一：装客户端 → `INSTALL quack`（首次使用会自动安装/加载）→ `CREATE SECRET` 设 Token → `ATTACH 'quack:...'`。

> 客户端驱动总览（含各语言支持等级与最新版本）：
> https://duckdb.org/docs/current/clients/overview.html

### 6.1 Python

`pip install duckdb` 的 wheel 内含 native `libduckdb`，用法遵循 DB-API 2.0（PEP 249）：

```python
import duckdb

con = duckdb.connect()                                   # 进程内引擎
con.execute("INSTALL quack;")                            # 也可省略，自动安装/加载
con.execute("CREATE SECRET (TYPE quack, TOKEN 'super_secret')")
con.execute("ATTACH 'quack:localhost' AS remote")
print(con.execute("FROM remote.hello").fetchall())
```

文档：

- Python API 总览：https://duckdb.org/docs/lts/clients/python/overview.html
- Python DB-API：https://duckdb.org/docs/lts/clients/python/dbapi.html

### 6.2 Java / JDBC

Maven 引入 `org.duckdb:duckdb_jdbc`（JAR 内含 native `libduckdb`），实现 JDBC 4.1：

```java
Class.forName("org.duckdb.DuckDBDriver");
try (Connection con = DriverManager.getConnection("jdbc:duckdb:");
     Statement st = con.createStatement()) {
    st.execute("INSTALL quack;");
    st.execute("CREATE SECRET (TYPE quack, TOKEN 'super_secret')");
    st.execute("ATTACH 'quack:localhost' AS remote");
    try (ResultSet rs = st.executeQuery("FROM remote.hello")) {
        while (rs.next()) System.out.println(rs.getString(1));
    }
}
```

文档：Java (JDBC) Client — https://duckdb.org/docs/current/clients/java.html

### 6.3 Go

Go 驱动 [`github.com/marcboeker/go-duckdb`](https://github.com/marcboeker/go-duckdb) 通过 **cgo 链接 native `libduckdb`**，配合标准库 `database/sql`：

```go
import (
    "database/sql"
    _ "github.com/marcboeker/go-duckdb"
)

db, _ := sql.Open("duckdb", "")
db.Exec("INSTALL quack;")
db.Exec("CREATE SECRET (TYPE quack, TOKEN 'super_secret')")
db.Exec("ATTACH 'quack:localhost' AS remote")
rows, _ := db.Query("FROM remote.hello")
// ...
```

文档：客户端总览 https://duckdb.org/docs/current/clients/overview.html ；驱动仓库 https://github.com/marcboeker/go-duckdb

### 6.4 与 Azrng.DuckDB.Quack 的对比

| 项 | Python / Java / Go 官方客户端 | Azrng.DuckDB.Quack |
|----|-------------------------------|--------------------|
| 引擎依赖 | **内含 native `libduckdb`（C++）** | 无 native，纯托管 |
| 接入范式 | 套个进程内 DuckDB，再 `ATTACH 'quack:...'` | 直接当远程数据库用 |
| 协议实现 | 复用引擎里的 C++ quack 客户端 | 自实现 C# 编解码 |
| 部署 | 按平台带 native 二进制 | 单托管 DLL，跨平台 |

> 理论上任何语言都能像 Azrng 这样写一个**纯协议客户端**（协议是开放文档化的），从而摆脱 native 引擎；

## 七、安装

```powershell
dotnet add package Azrng.DuckDB.Quack
```

## 八、连接参数

| 参数 | 说明 | 必填 | 默认值 |
|------|------|:----:|--------|
| `Host` | 服务器地址 | ✓ | - |
| `Port` | 端口号 | | `9494` |
| `Token` | 认证令牌（对应服务端 SECRET） | ✓ | - |
| `Catalog` | 默认数据库，每次查询自动切换（见下方说明） | | - |
| `DisableSsl` | 是否禁用 SSL | | `true` |
| `TimeoutSeconds` | 超时时间（秒） | | `30` |

### Catalog 机制说明

指定 `Catalog` 后，**每次查询都会自动在该数据库上下文中执行**，用户 SQL 无需手动加数据库前缀：

- **自动切换**：每次查询前自动拼接 `USE "catalog"; `，借助 DuckDB 多语句执行能力，**零额外 HTTP 开销**；
- **自动创建**：连接时若该 catalog 不存在，会自动执行 `ATTACH 'catalog' AS "catalog"` 在服务端创建同名数据库文件；
- **透明使用**：直接写表名即可，`SELECT * FROM orders`，无需写 `SELECT * FROM catalog.schema.orders`。

```text
# 指定 Catalog —— 后续查询自动在 duckflight 数据库下执行
Host=localhost;Port=9494;Token=xxx;Catalog=duckflight;DisableSsl=true

# 不指定 —— 用户自己写全路径
Host=localhost;Port=9494;Token=xxx;DisableSsl=true
```

## 九、快速开始

```csharp
using Azrng.DuckDB.Quack;

// 连接到指定 Catalog
await using var connection = new QuackConnection(
    "Host=localhost;Port=9494;Token=your-token;Catalog=duckflight;DisableSsl=true");
await connection.OpenAsync();

// 查询数据
await using var command = connection.CreateCommand();
command.CommandText = "SELECT * FROM orders LIMIT 10";

await using var reader = await command.ExecuteReaderAsync();
while (await reader.ReadAsync())
{
    Console.WriteLine(reader.GetInt64(0));
}
```

## 十、用法示例

### 10.1 参数化查询

```csharp
await using var command = connection.CreateCommand();
command.CommandText = "SELECT * FROM users WHERE id = @id AND name = @name";
command.Parameters.AddWithValue("@id", 42);
command.Parameters.AddWithValue("@name", "Alice");
```

或使用扩展方法：

```csharp
command.AddParam("@id", 42);
command.AddParam("@name", "Alice");
```

### 10.2 Dapper 集成

```csharp
using Dapper;

await using var connection = new QuackConnection(connectionString);
await connection.OpenAsync();

var orders = await connection.QueryAsync<Order>(
    "SELECT * FROM orders WHERE status = @Status",
    new { Status = "pending" });
```

### 10.3 连接池

```csharp
using Microsoft.Extensions.Logging;

var logger = LoggerFactory.Create(builder => builder.AddConsole())
    .CreateLogger<QuackConnectionPool>();
await using var pool = new QuackConnectionPool(connectionString, logger, maxPoolSize: 5);

await using var lease = await pool.RentConnectionAsync();
await using var command = lease.Connection.CreateCommand();
command.CommandText = "SELECT 1";
var value = await command.ExecuteScalarAsync();
```

### 10.4 事务

```csharp
await using var transaction = await connection.BeginTransactionAsync();
try
{
    await using var cmd = connection.CreateCommand();
    cmd.Transaction = transaction;
    cmd.CommandText = "INSERT INTO accounts VALUES (1, 1000)";
    await cmd.ExecuteNonQueryAsync();

    await transaction.CommitAsync();
}
catch
{
    await transaction.RollbackAsync();
    throw;
}
```

### 10.5 批量操作

```csharp
var rows = new List<object?[]>
{
    new object?[] { 1, "Alice", "alice@example.com" },
    new object?[] { 2, "Bob",   "bob@example.com" }
};

var affected = await connection.ExecuteBatchInsertAsync(
    "users",
    new[] { "id", "name", "email" },
    rows);
```

### 10.6 DDL / DML

```csharp
await connection.ExecuteAsync("CREATE TABLE IF NOT EXISTS users (id INTEGER, name VARCHAR)");
await connection.ExecuteAsync("INSERT INTO users VALUES (1, 'Alice'), (2, 'Bob')");
await connection.ExecuteAsync("UPDATE users SET name = 'Alice Updated' WHERE id = 1");
await connection.ExecuteAsync("DELETE FROM users WHERE id = 2");
```

### 10.7 Token 加密存储（客户端侧）

为了不在连接字符串/配置里直接暴露明文 Token，可以使用 AES-GCM 加密后存储，运行时再解密：

```csharp
// 加密：得到 "ENC:" 前缀的密文，可安全写入配置
var encrypted = QuackTokenEncryptor.Encrypt("super_secret", keyBytes);

// 解密：还原成真实 Token 再交给 QuackConnection
var token = QuackTokenEncryptor.Decrypt(encrypted, keyBytes);
```

> `QuackTokenEncryptor` 采用 AES-GCM（带认证），密钥不足 32 字节时通过 SHA256 派生；密文格式为 `ENC:` + Base64（`nonce || cipher || tag`）。这是**客户端侧**的保护措施，不改变线上 Token 认证方式。

## 十一、数据类型映射

| DuckDB 类型 | .NET 类型 |
|-------------|-----------|
| BOOLEAN | `bool` |
| TINYINT, SMALLINT, INTEGER, BIGINT | `long` |
| HUGEINT | `long` / `decimal` |
| FLOAT, DOUBLE | `double` |
| DECIMAL | `decimal` |
| VARCHAR, CHAR, BLOB | `string` |
| DATE | `DateOnly` |
| TIMESTAMP | `DateTimeOffset` |
| UUID | `Guid` |

## 十二、测试

| 类别 | 数量 |
|------|------|
| 单元测试 | 194 |
| 集成测试 | 90 |
| **总计** | **284** |

```powershell
dotnet test tests\Azrng.DuckDB.Quack.Tests\Azrng.DuckDB.Quack.Tests.csproj
```

## 参考链接

- duckdb-quack 仓库（C++ 扩展）：https://github.com/duckdb/duckdb-quack
- Quack 协议总览：https://duckdb.org/docs/current/quack/overview.html
- 发布博客：https://duckdb.org/2026/05/12/quack-remote-protocol
- DuckDB 官网：https://duckdb.org/
- 各语言客户端总览：https://duckdb.org/docs/current/clients/overview.html
- Python API：https://duckdb.org/docs/lts/clients/python/overview.html
- Java (JDBC)：https://duckdb.org/docs/current/clients/java.html
- Go 驱动：https://github.com/marcboeker/go-duckdb
- 本库 NuGet：`Azrng.DuckDB.Quack`（MIT）
