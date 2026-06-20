---
title: DuckDB 基本操作：创建数据库、Schema 与表
lang: zh-CN
date: 2026-06-18
publish: true
author: azrng
isOriginal: true
category:
  - database
tag:
  - DuckDB
  - SQL
  - 入门
---

## 概述

本文介绍 DuckDB 最基础的操作：创建数据库、创建 Schema、创建表、插入数据和基本查询。适合刚接触 DuckDB 的开发者快速上手。

---

## 一、创建数据库

DuckDB 支持两种数据库模式：**文件数据库**和**内存数据库**。

### 1. 文件数据库（持久化）

使用 `ATTACH` 语句创建或打开一个文件数据库：

```sql
-- 创建（或打开）名为 hdr 的数据库
-- 当前目录下会生成 hdr.duckdb 文件
ATTACH 'hdr' AS hdr;

-- 切换到该数据库，后续操作都在此数据库执行
USE hdr;
```

**说明**：
- 如果 `hdr.duckdb` 文件不存在，DuckDB 会自动创建
- 如果已存在，则打开该数据库
- 数据库文件默认创建在当前工作目录

### 2. 内存数据库（临时）

```sql
-- 使用 :memory: 创建内存数据库
ATTACH ':memory:' AS tempdb;
USE tempdb;
```

**特点**：
- 数据只在连接期间存在
- 关闭连接后数据丢失
- 适合临时计算、测试场景

### 3. 指定路径创建

```sql
-- 在指定路径创建数据库
ATTACH '/data/mydb.duckdb' AS mydb;
USE mydb;

-- Windows 路径
ATTACH 'D:\data\mydb.duckdb' AS mydb;
USE mydb;
```

---

## 二、创建 Schema

Schema 是数据库中的命名空间，用于组织和隔离表。

### 1. 基本语法

```sql
-- 创建 schema
CREATE SCHEMA IF NOT EXISTS source;
```

**说明**：
- `IF NOT EXISTS`：如果 schema 已存在则跳过，避免报错
- 不加 `IF NOT EXISTS` 时，重复创建会报错

### 2. 创建多个 Schema

```sql
-- 创建多个 schema
CREATE SCHEMA IF NOT EXISTS source;    -- 源数据
CREATE SCHEMA IF NOT EXISTS dw;        -- 数据仓库
CREATE SCHEMA IF NOT EXISTS temp;      -- 临时表
```

### 3. 查看现有 Schema

```sql
-- 查看所有 schema
SELECT schema_name FROM information_schema.schemata;

-- 或使用 DuckDB 便捷命令
SHOW schemas;
```

### 4. 删除 Schema

```sql
-- 删除空 schema
DROP SCHEMA IF EXISTS temp;

-- 删除 schema 及其所有对象（慎用）
DROP SCHEMA IF EXISTS temp CASCADE;
```

---

## 三、创建表

### 1. 基本语法

```sql
CREATE TABLE source.orders (
    order_id        BIGINT PRIMARY KEY,
    user_id         BIGINT,
    order_status    VARCHAR(20),
    order_amount    DECIMAL(10,2),
    payment_method  VARCHAR(20),
    created_at      TIMESTAMP,
    updated_at      TIMESTAMP
);
```

### 2. 常用数据类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `BIGINT` | 64 位整数 | `1001` |
| `INTEGER` | 32 位整数 | `101` |
| `DECIMAL(p,s)` | 精确数值 | `DECIMAL(10,2)` → `299.00` |
| `VARCHAR(n)` | 变长字符串 | `'completed'` |
| `BOOLEAN` | 布尔值 | `true / false` |
| `DATE` | 日期 | `'2024-01-15'` |
| `TIMESTAMP` | 时间戳 | `'2024-01-15 10:23:00'` |
| `DOUBLE` | 浮点数 | `3.14` |

### 3. 带约束的建表

```sql
CREATE TABLE source.users (
    user_id     BIGINT PRIMARY KEY,
    username    VARCHAR(50) NOT NULL,
    email       VARCHAR(100) UNIQUE,
    age         INTEGER CHECK (age >= 0 AND age <= 150),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. 从查询结果建表

```sql
-- 根据查询结果创建表
CREATE TABLE source.completed_orders AS
SELECT * FROM source.orders WHERE order_status = 'completed';
```

### 5. 查看表结构

```sql
-- 查看表的列信息
DESCRIBE source.orders;

-- 或使用
SHOW source.orders;

-- 查看所有表
SHOW tables;
```

---

## 四、插入数据

### 1. 基本插入

```sql
INSERT INTO source.orders VALUES
(1001, 101, 'completed', 299.00, 'alipay', '2024-01-15 10:23:00', '2024-01-15 10:25:00'),
(1002, 102, 'completed', 899.50, 'wechat', '2024-01-15 11:10:00', '2024-01-15 11:12:00'),
(1003, 103, 'completed', 1599.00, 'card',  '2024-01-16 09:45:00', '2024-01-16 09:48:00');
```

### 2. 指定列插入

```sql
-- 只插入部分列，其他列使用默认值或 NULL
INSERT INTO source.orders (order_id, user_id, order_status, order_amount)
VALUES (1004, 101, 'completed', 450.00);
```

### 3. 使用函数插入

```sql
-- 使用当前时间
INSERT INTO source.orders VALUES
(1005, 104, 'pending', 199.00, 'alipay', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 使用 UUID 作为主键
INSERT INTO source.orders (order_id, user_id, order_status, order_amount)
VALUES (nextval('order_seq'), 105, 'completed', 99.00);
```

### 4. 从查询插入

```sql
-- 从其他表插入数据
INSERT INTO source.orders_archive
SELECT * FROM source.orders WHERE created_at < '2024-02-01';
```

### 5. 批量插入多行

```sql
-- 一次插入多行数据
INSERT INTO source.orders VALUES
(1005, 104, 'pending',   199.00, 'alipay', '2024-01-18 08:30:00', '2024-01-18 08:30:00'),
(1006, 105, 'cancelled', 699.00, 'wechat', '2024-01-18 09:15:00', '2024-01-18 09:20:00'),
(1007, 106, 'completed', 1299.00, 'card',  '2024-01-19 16:40:00', '2024-01-19 16:43:00');
```

---

## 五、基本查询

### 1. 查询所有数据

```sql
SELECT * FROM source.orders;
```

### 2. 条件查询

```sql
-- 按状态过滤
SELECT order_id, order_amount
FROM source.orders
WHERE order_status = 'completed';

-- 多条件
SELECT *
FROM source.orders
WHERE order_status = 'completed'
  AND order_amount >= 500;
```

### 3. 聚合查询

```sql
-- 统计订单数量和总金额
SELECT
    order_status,
    COUNT(*) AS order_count,
    SUM(order_amount) AS total_amount,
    AVG(order_amount) AS avg_amount
FROM source.orders
GROUP BY order_status;
```

### 4. 排序和限制

```sql
-- 按金额降序，取前 5 条
SELECT order_id, order_amount
FROM source.orders
ORDER BY order_amount DESC
LIMIT 5;
```

### 5. 分页查询

```sql
-- 跳过前 10 条，取接下来的 10 条
SELECT *
FROM source.orders
ORDER BY order_id
LIMIT 10 OFFSET 10;
```

---

## 六、完整示例：初始化 hdr 数据库

将以上操作组合成一个完整的初始化脚本：

```sql
-- 1. 创建并切换到 hdr 数据库
ATTACH 'hdr' AS hdr;
USE hdr;

-- 2. 创建 source schema
CREATE SCHEMA IF NOT EXISTS source;

-- 3. 创建 orders 表
CREATE TABLE source.orders (
    order_id        BIGINT PRIMARY KEY,
    user_id         BIGINT,
    order_status    VARCHAR(20),
    order_amount    DECIMAL(10,2),
    payment_method  VARCHAR(20),
    created_at      TIMESTAMP,
    updated_at      TIMESTAMP
);

-- 4. 插入测试数据
INSERT INTO source.orders VALUES
(1001, 101, 'completed', 299.00, 'alipay',   '2024-01-15 10:23:00', '2024-01-15 10:25:00'),
(1002, 102, 'completed', 899.50, 'wechat',   '2024-01-15 11:10:00', '2024-01-15 11:12:00'),
(1003, 103, 'completed', 1599.00, 'card',    '2024-01-16 09:45:00', '2024-01-16 09:48:00'),
(1004, 101, 'completed', 450.00, 'alipay',  '2024-01-17 14:20:00', '2024-01-17 14:22:00');

INSERT INTO source.orders VALUES
(1005, 104, 'pending',    199.00, 'alipay',  '2024-01-18 08:30:00', '2024-01-18 08:30:00'),
(1006, 105, 'cancelled',  699.00, 'wechat',  '2024-01-18 09:15:00', '2024-01-18 09:20:00'),
(1007, 106, 'completed',  1299.00, 'card',   '2024-01-19 16:40:00', '2024-01-19 16:43:00');

INSERT INTO source.orders VALUES
(1008, 107, 'pending', 99.00, 'alipay', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 5. 验证数据
SELECT * FROM source.orders;
```

---

## 七、常用管理命令速查

| 命令 | 说明 |
|------|------|
| `SHOW databases` | 查看所有数据库 |
| `SHOW schemas` | 查看当前数据库的所有 schema |
| `SHOW tables` | 查看当前 schema 的所有表 |
| `DESCRIBE <table>` | 查看表结构 |
| `SELECT version()` | 查看 DuckDB 版本 |

---

## 📌 小结

1. **创建数据库**：`ATTACH 'name' AS name;` + `USE name;`
2. **创建 Schema**：`CREATE SCHEMA IF NOT EXISTS name;`
3. **创建表**：`CREATE TABLE schema.table (...);`
4. **插入数据**：`INSERT INTO table VALUES (...);`
5. **查询数据**：`SELECT ... FROM schema.table WHERE ...;`
