---
title: AI 前后端 SSE 流式响应规范
lang: zh-CN
date: 2026-05-29
publish: true
author: azrng
isOriginal: true
category:
  - ai
tag:
  - SSE
  - 流式响应
  - 前后端对接
---

# AI 前后端 SSE 流式响应规范

## 1. 概述

本规范定义 AI 对话系统中后端与前端之间的 **SSE (Server-Sent Events)** 流式通信协议。适用于通用 AI 对话场景，支持文本流式输出、工具调用、富文本控件等多种交互模式。

### 1.1 设计原则

- **混合事件模式**：简单事件采用扁平结构（一条消息一个事件），流式内容采用三元组模式（START → CONTENT → END）
- **控件驱动**：通过统一的控件类型系统支持多种 UI 组件
- **框架无关**：协议本身不绑定前端框架，示例代码以 React 为主

### 1.2 传输协议

- 请求方式：`POST`
- 响应头：`Content-Type: text/event-stream`，`Cache-Control: no-cache, no-store`
- 编码：UTF-8
- 每条事件格式遵循 SSE 标准：`data: {JSON}\n\n`

---

## 2. 请求格式

客户端发送 POST 请求，body 为 JSON：

```json
{
  "threadId": "可选，会话线程ID，首次不传由后端生成",
  "runId": "可选，本次运行ID，首次不传由后端生成",
  "messages": [
    {
      "role": "user",
      "content": "用户输入的内容"
    }
  ],
  "context": [
    {
      "key": "currentPage",
      "value": "/dashboard"
    }
  ],
  "tools": [],
  "state": {}
}
```

### 2.1 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| threadId | string | 否 | 会话线程 ID，首次对话由后端生成并返回 |
| runId | string | 否 | 本次运行 ID，首次不传由后端生成 |
| messages | Message[] | 是 | 对话消息数组 |
| context | ContextItem[] | 否 | 上下文信息（当前页面、用户信息等） |
| tools | Tool[] | 否 | 客户端注册的可调用工具列表 |
| state | object | 否 | 共享状态（客户端维护） |

### 2.2 Message 结构

```typescript
interface Message {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  name?: string;
  toolCallId?: string;  // role=tool 时必填
}
```

### 2.3 ContextItem 结构

```typescript
interface ContextItem {
  key: string;
  value: string;
  description?: string;
}
```

### 2.4 Tool 结构

```typescript
interface Tool {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, any>;
    required?: string[];
  };
}
```

---

## 3. 响应事件类型总览

### 3.1 事件分类

| 类别 | 事件类型 | 模式 | 说明 |
|------|----------|------|------|
| 生命周期 | `run_start` | 扁平 | 运行开始 |
| 生命周期 | `run_end` | 扁平 | 运行结束 |
| 生命周期 | `run_error` | 扁平 | 运行出错 |
| 会话 | `session` | 扁平 | 返回会话 ID |
| Agent | `agent_switch` | 扁平 | Agent 切换通知 |
| 文本消息 | `text_message_start` | 三元组 | 文本消息开始 |
| 文本消息 | `text_message_content` | 三元组 | 文本消息增量内容 |
| 文本消息 | `text_message_end` | 三元组 | 文本消息结束 |
| 工具调用 | `tool_call_start` | 三元组 | 工具调用开始 |
| 工具调用 | `tool_call_args` | 三元组 | 工具调用参数增量 |
| 工具调用 | `tool_call_end` | 三元组 | 工具调用结束 |
| 工具调用 | `tool_call_result` | 扁平 | 工具调用结果 |
| 控件 | `widget` | 扁平 | 富文本控件输出 |
| 推荐 | `suggestions` | 扁平 | 推荐问题列表 |
| 状态 | `state_snapshot` | 扁平 | 完整状态快照 |
| 状态 | `state_delta` | 扁平 | 状态增量更新 (JSON Patch) |
| 思考 | `reasoning_start` | 三元组 | 思考过程开始 |
| 思考 | `reasoning_content` | 三元组 | 思考过程增量内容 |
| 思考 | `reasoning_end` | 三元组 | 思考过程结束 |
| 结束 | `done` | 扁平 | 流式传输完成标记 |

### 3.2 模式说明

**扁平模式**：每个事件自包含完整信息，适用于非流式或一次性数据。

```
data: {"type": "session", "sessionId": "abc-123"}
```

**三元组模式**：START → N 个 CONTENT → END，适用于需要增量拼接的流式内容。三元组通过 `id` 字段关联。

```
data: {"type": "text_message_start", "id": "msg-001", "role": "assistant"}
data: {"type": "text_message_content", "id": "msg-001", "delta": "你好"}
data: {"type": "text_message_content", "id": "msg-001", "delta": "，有什么"}
data: {"type": "text_message_content", "id": "msg-001", "delta": "可以帮你？"}
data: {"type": "text_message_end", "id": "msg-001"}
```

---

## 4. 事件详细定义

### 4.1 生命周期事件

#### run_start

运行开始，每轮对话的首个事件。

```json
{
  "type": "run_start",
  "threadId": "thread-abc-123",
  "runId": "run-xyz-456"
}
```

#### run_end

运行结束，包含可选的结果数据。

```json
{
  "type": "run_end",
  "threadId": "thread-abc-123",
  "runId": "run-xyz-456",
  "result": { "summary": "可选的结果摘要" }
}
```

#### run_error

运行出错。

```json
{
  "type": "run_error",
  "code": "TOOL_EXECUTION_FAILED",
  "message": "工具执行失败：超时"
}
```

#### done

流式传输完成的终止标记。收到此事件后，前端应关闭 SSE 连接。

```json
{"type": "done"}
```

```
data: [DONE]
```

> `[DONE]` 是可选的兼容标记，部分 OpenAI 兼容接口会发送此标记。

---

### 4.2 会话与 Agent 事件

#### session

返回或关联会话 ID。

```json
{
  "type": "session",
  "sessionId": "9b262c80-ca48-4f3e-84a1-50c926b4a2a1"
}
```

#### agent_switch

多 Agent 架构下，Agent 切换通知。

```json
{
  "type": "agent_switch",
  "agent": "indicator_agent",
  "name": "指标分析助手",
  "content": "已切换到指标分析助手"
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| agent | string | Agent 标识符 |
| name | string | Agent 显示名称 |
| content | string? | 切换说明（可选） |

---

### 4.3 文本消息事件（三元组）

用于 AI 回复的文本内容流式输出。

#### text_message_start

```json
{
  "type": "text_message_start",
  "id": "msg-001",
  "role": "assistant"
}
```

#### text_message_content

```json
{
  "type": "text_message_content",
  "id": "msg-001",
  "delta": "这是增量文本"
}
```

#### text_message_end

```json
{
  "type": "text_message_end",
  "id": "msg-001"
}
```

> 一次运行中可以出现多个文本消息三元组（例如中间穿插工具调用后再继续文本输出）。

---

### 4.4 工具调用事件（三元组 + 结果）

#### tool_call_start

```json
{
  "type": "tool_call_start",
  "id": "tc-001",
  "name": "search_knowledge_base",
  "parentMessageId": "msg-001"
}
```

#### tool_call_args

参数以增量 JSON 片段形式发送，前端需自行拼接解析。

```json
{"type": "tool_call_args", "id": "tc-001", "delta": "{\"query\":"}
{"type": "tool_call_args", "id": "tc-001", "delta": "\"出院患者\"}"}
```

#### tool_call_end

```json
{
  "type": "tool_call_end",
  "id": "tc-001"
}
```

#### tool_call_result

工具执行完成后的返回结果，扁平事件。

```json
{
  "type": "tool_call_result",
  "id": "tc-001",
  "toolCallId": "tc-001",
  "content": "查询结果：2024年3月出院患者16579人次..."
}
```

---

### 4.5 思考过程事件（三元组）

用于展示模型的推理/思考过程（如 DeepSeek-R1、QwQ 等模型的 thinking 内容）。

#### reasoning_start

```json
{
  "type": "reasoning_start",
  "id": "reason-001"
}
```

#### reasoning_content

```json
{"type": "reasoning_content", "id": "reason-001", "delta": "用户询问的是"}
{"type": "reasoning_content", "id": "reason-001", "delta": "出院患者趋势..."}
```

#### reasoning_end

```json
{
  "type": "reasoning_end",
  "id": "reason-001"
}
```

> 思考过程内容通常以折叠/可展开的方式在前端展示。

---

### 4.6 控件事件（widget）

统一的富文本控件输出事件。后端通过 `widget` 事件将结构化数据发送给前端，前端根据 `widget` 字段渲染对应的 UI 组件。

```json
{
  "type": "widget",
  "widget": "控件类型",
  "data": { ... },
  "id": "widget-001"
}
```

#### 控件类型总览

| widget 值 | 说明 | 适用场景 |
|-----------|------|----------|
| `markdown` | Markdown 富文本 | AI 回复中的格式化文本 |
| `code_block` | 代码块 | 代码展示、代码生成 |
| `table` | 数据表格 | 结构化数据展示 |
| `chart` | 图表 | 数据可视化（趋势、分布等） |
| `card` | 卡片 | 信息摘要卡片 |
| `file` | 文件附件 | 文件下载/预览 |
| `image` | 图片 | 图片展示 |
| `citation` | 引用来源 | 知识库引用溯源 |
| `alert` | 提示/警告 | 系统提示信息 |
| `progress` | 进度 | 长任务进度展示 |

---

## 5. 控件详细定义

### 5.1 markdown

Markdown 富文本内容。当 AI 回复包含复杂格式时，以控件形式独立发送。

```json
{
  "type": "widget",
  "widget": "markdown",
  "id": "w-md-001",
  "data": {
    "content": "## 分析结论\n\n根据查询结果，2024年3-8月出院患者人次趋势如下：\n\n- 3月：16,579 人次\n- 4月：17,041 人次（峰值）\n- 5月：16,049 人次"
  }
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| content | string | Markdown 格式文本 |

**前端渲染要求**：
- 支持标题、粗体、斜体、列表、链接、行内代码
- 代码块应使用语法高亮渲染
- 支持 LaTeX 数学公式（`$...$` 行内，`$$...$$` 块级）

---

### 5.2 code_block

代码块，带语言标识和可选的标题。

```json
{
  "type": "widget",
  "widget": "code_block",
  "id": "w-code-001",
  "data": {
    "language": "python",
    "title": "data_analysis.py",
    "code": "import pandas as pd\n\ndf = pd.read_csv('data.csv')\nprint(df.describe())",
    "executable": false
  }
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| language | string | 编程语言标识 |
| title | string? | 代码块标题（可选） |
| code | string | 代码内容 |
| executable | boolean | 是否可执行（可选，默认 false） |

**前端渲染要求**：
- 语法高亮
- 复制按钮
- 如 `executable=true`，显示运行按钮

---

### 5.3 table

数据表格。

```json
{
  "type": "widget",
  "widget": "table",
  "id": "w-table-001",
  "data": {
    "title": "2024年3-8月出院患者人次",
    "columns": [
      { "key": "month", "label": "月份", "align": "center" },
      { "key": "count", "label": "人次", "align": "right" },
      { "key": "yoy", "label": "同比", "align": "right" }
    ],
    "rows": [
      { "month": "2024/03", "count": 16579, "yoy": "+5.2%" },
      { "month": "2024/04", "count": 17041, "yoy": "+3.8%" },
      { "month": "2024/05", "count": 16049, "yoy": "-1.2%" }
    ],
    "summary": "月均 16,350 人次"
  }
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| title | string? | 表格标题（可选） |
| columns | Column[] | 列定义 |
| columns[].key | string | 列数据字段名 |
| columns[].label | string | 列显示名称 |
| columns[].align | string? | 对齐方式：left / center / right |
| rows | object[] | 行数据 |
| summary | string? | 表格摘要/脚注（可选） |

---

### 5.4 chart

图表，支持多种图表类型。

```json
{
  "type": "widget",
  "widget": "chart",
  "id": "w-chart-001",
  "data": {
    "chartType": "line",
    "title": "出院患者人次数月度趋势",
    "unit": "人次",
    "xAxis": { "key": "date", "label": "月份" },
    "yAxis": { "label": "人次" },
    "series": [
      {
        "name": "本期",
        "data": [
          { "date": "2024/03", "value": 16579 },
          { "date": "2024/04", "value": 17041 },
          { "date": "2024/05", "value": 16049 },
          { "date": "2024/06", "value": 15560 },
          { "date": "2024/07", "value": 16476 },
          { "date": "2024/08", "value": 16678 }
        ]
      },
      {
        "name": "同期",
        "data": [
          { "date": "2024/03", "value": 15200 },
          { "date": "2024/04", "value": 16100 },
          { "date": "2024/05", "value": 15800 },
          { "date": "2024/06", "value": 15000 },
          { "date": "2024/07", "value": 15900 },
          { "date": "2024/08", "value": 16200 }
        ]
      }
    ]
  }
}
```

**支持的 chartType**：

| chartType | 说明 | 适用场景 |
|-----------|------|----------|
| `line` | 折线图 | 趋势分析 |
| `bar` | 柱状图 | 数量对比 |
| `pie` | 饼图 | 占比分布 |
| `scatter` | 散点图 | 相关性分析 |
| `area` | 面积图 | 累积趋势 |
| `radar` | 雷达图 | 多维对比 |

| 字段 | 类型 | 说明 |
|------|------|------|
| chartType | string | 图表类型 |
| title | string? | 图表标题 |
| unit | string? | 数据单位 |
| xAxis | AxisDef | X 轴定义 |
| yAxis | AxisDef | Y 轴定义 |
| series | Series[] | 数据系列 |
| series[].name | string | 系列名称 |
| series[].data | DataPoint[] | 数据点 |

**前端渲染建议**：使用 ECharts、AntV、Recharts 等图表库。

---

### 5.5 card

信息卡片，用于展示摘要、实体信息等。

```json
{
  "type": "widget",
  "widget": "card",
  "id": "w-card-001",
  "data": {
    "title": "出院患者人次数",
    "subtitle": "2024年3-8月",
    "icon": "📊",
    "fields": [
      { "label": "本期均值", "value": "16,350 人次" },
      { "label": "最高月份", "value": "4月（17,041）" },
      { "label": "最低月份", "value": "6月（15,560）" },
      { "label": "波动幅度", "value": "±4.6%" }
    ],
    "actions": [
      { "label": "查看详情", "action": "navigate", "payload": "/indicators/detail/123" }
    ]
  }
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| title | string | 卡片标题 |
| subtitle | string? | 副标题 |
| icon | string? | 图标（emoji 或图标名） |
| fields | Field[] | 字段列表 |
| fields[].label | string | 字段标签 |
| fields[].value | string | 字段值 |
| actions | Action[]? | 可操作按钮（可选） |

---

### 5.6 file

文件附件。

```json
{
  "type": "widget",
  "widget": "file",
  "id": "w-file-001",
  "data": {
    "fileName": "report_2024Q3.xlsx",
    "fileSize": 245760,
    "mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "downloadUrl": "/api/files/report_2024Q3.xlsx",
    "previewable": false
  }
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| fileName | string | 文件名 |
| fileSize | number | 文件大小（字节） |
| mimeType | string | MIME 类型 |
| downloadUrl | string | 下载链接 |
| previewable | boolean | 是否支持在线预览 |

---

### 5.7 image

图片。

```json
{
  "type": "widget",
  "widget": "image",
  "id": "w-img-001",
  "data": {
    "url": "https://example.com/chart.png",
    "alt": "趋势图",
    "width": 800,
    "height": 400,
    "caption": "图1：出院患者月度趋势"
  }
}
```

---

### 5.8 citation

引用来源，用于知识库问答的溯源展示。

```json
{
  "type": "widget",
  "widget": "citation",
  "id": "w-cite-001",
  "data": {
    "sources": [
      {
        "title": "2024年医疗质量报告",
        "url": "/documents/quality-report-2024.pdf",
        "page": 15,
        "quote": "出院患者人次数较去年同期增长5.2%",
        "relevance": 0.92
      },
      {
        "title": "科室运营月报-2024年4月",
        "url": "/documents/monthly-apr-2024.pdf",
        "page": 3,
        "quote": "4月达到年度峰值17,041人次",
        "relevance": 0.87
      }
    ]
  }
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| sources | Source[] | 引用来源列表 |
| sources[].title | string | 来源标题 |
| sources[].url | string? | 来源链接 |
| sources[].page | number? | 页码 |
| sources[].quote | string | 引用片段 |
| sources[].relevance | number | 相关度 (0-1) |

---

### 5.9 alert

提示/警告信息。

```json
{
  "type": "widget",
  "widget": "alert",
  "id": "w-alert-001",
  "data": {
    "level": "warning",
    "title": "数据说明",
    "message": "2024年6月数据因系统升级存在部分缺失，趋势分析仅供参考。"
  }
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| level | string | 提示级别：info / warning / error / success |
| title | string? | 标题 |
| message | string | 提示内容 |

---

### 5.10 progress

长任务进度展示。

```json
{"type": "widget", "widget": "progress", "id": "w-prog-001", "data": {"label": "正在分析数据...", "percent": 45, "steps": ["获取数据", "清洗数据", "分析趋势", "生成报告"], "currentStep": 1}}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| label | string | 进度说明文字 |
| percent | number | 进度百分比 (0-100) |
| steps | string[]? | 步骤列表（可选） |
| currentStep | number? | 当前步骤索引（可选） |

---

## 6. 推荐问题事件

AI 回复结束后，推荐用户可能的后续问题。

```json
{
  "type": "suggestions",
  "items": [
    {
      "id": "sug-001",
      "question": "为什么4月出院人次达到峰值？",
      "action": "query"
    },
    {
      "id": "sug-002",
      "question": "按科室维度拆分看看",
      "action": "query"
    },
    {
      "id": "sug-003",
      "question": "导出这份数据为 Excel",
      "action": "command"
    }
  ]
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| items | Suggestion[] | 推荐问题列表（建议 2-5 个） |
| items[].id | string | 推荐项 ID |
| items[].question | string | 推荐问题文本 |
| items[].action | string | 点击后的行为类型：query（发起对话）/ command（执行命令）/ navigate（页面跳转） |

---

## 7. 状态管理事件

### 7.1 state_snapshot

完整状态快照，替换客户端持有的全部状态。

```json
{
  "type": "state_snapshot",
  "snapshot": {
    "currentIndicator": "出院患者人次数",
    "timeRange": { "start": "2024-03-01", "end": "2024-08-31" },
    "filters": { "orgType": 0 }
  }
}
```

### 7.2 state_delta

状态增量更新，使用 JSON Patch (RFC 6902) 格式。

```json
{
  "type": "state_delta",
  "delta": [
    { "op": "replace", "path": "/timeRange/end", "value": "2024-09-30" },
    { "op": "add", "path": "/filters/deptName", "value": "内科" }
  ]
}
```

---

## 8. 完整消息序列示例

以下是一次典型对话的完整 SSE 流序列（用户查询指标数据，AI 调用工具后返回图表和文本）：

```
→ POST /api/chat
← Content-Type: text/event-stream

data: {"type":"run_start","threadId":"t-001","runId":"r-001"}

data: {"type":"session","sessionId":"t-001"}

data: {"type":"agent_switch","agent":"indicator_agent","name":"指标分析助手"}

data: {"type":"reasoning_start","id":"think-001"}
data: {"type":"reasoning_content","id":"think-001","delta":"用户要查询3-8月出院患者趋势，需要调用指标查询工具..."}
data: {"type":"reasoning_end","id":"think-001"}

data: {"type":"tool_call_start","id":"tc-001","name":"query_indicator"}
data: {"type":"tool_call_args","id":"tc-001","delta":"{\"indicator\":"}
data: {"type":"tool_call_args","id":"tc-001","delta":"\"出院患者人次数\","}
data: {"type":"tool_call_args","id":"tc-001","delta":"\"range\":\"2024-03~2024-08\"}"}
data: {"type":"tool_call_end","id":"tc-001"}

data: {"type":"tool_call_result","id":"tc-001","content":"[{\"month\":\"2024/03\",\"value\":16579},...]"}

data: {"type":"text_message_start","id":"msg-001","role":"assistant"}
data: {"type":"text_message_content","id":"msg-001","delta":"根据查询结果"}
data: {"type":"text_message_content","id":"msg-001","delta":"，2024年3-8月"}
data: {"type":"text_message_content","id":"msg-001","delta":"出院患者人次趋势如下："}
data: {"type":"text_message_end","id":"msg-001"}

data: {"type":"widget","widget":"chart","id":"w-chart-001","data":{"chartType":"line","title":"出院患者人次数月度趋势","unit":"人次","series":[{"name":"人次","data":[{"date":"2024/03","value":16579},{"date":"2024/04","value":17041},{"date":"2024/05","value":16049},{"date":"2024/06","value":15560},{"date":"2024/07","value":16476},{"date":"2024/08","value":16678}]}]}}

data: {"type":"widget","widget":"table","id":"w-table-001","data":{"title":"月度明细","columns":[{"key":"month","label":"月份"},{"key":"value","label":"人次","align":"right"}],"rows":[{"month":"2024/03","value":16579},{"month":"2024/04","value":17041},{"month":"2024/05","value":16049},{"month":"2024/06","value":15560},{"month":"2024/07","value":16476},{"month":"2024/08","value":16678}]}}

data: {"type":"text_message_start","id":"msg-002","role":"assistant"}
data: {"type":"text_message_content","id":"msg-002","delta":"**趋势分析**：\n- 4月达到峰值（17,041人次）\n- 6月为低谷（15,560人次）\n- 整体保持平稳，月均约16,350人次"}
data: {"type":"text_message_end","id":"msg-002"}

data: {"type":"widget","widget":"citation","id":"w-cite-001","data":{"sources":[{"title":"2024年医疗质量报告","page":15,"quote":"出院患者人次数较去年同期增长5.2%","relevance":0.92}]}}

data: {"type":"suggestions","items":[{"id":"s1","question":"为什么4月出院人次达到峰值？"},{"id":"s2","question":"按科室维度拆分看看"},{"id":"s3","question":"导出数据为Excel"}]}

data: {"type":"run_end","threadId":"t-001","runId":"r-001"}
data: {"type":"done"}
data: [DONE]
```

---

## 9. 前端处理示例（React）

### 9.1 SSE 连接管理

```typescript
interface SSEEvent {
  type: string;
  [key: string]: any;
}

class ChatSSEClient {
  private controller: AbortController | null = null;

  async sendMessage(
    url: string,
    body: RequestBody,
    handlers: EventHandlers
  ): Promise<void> {
    this.controller = new AbortController();

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: this.controller.signal,
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    if (!response.body) throw new Error('No response body');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const raw = line.slice(6).trim();
            if (raw === '[DONE]') {
              handlers.onDone?.();
              return;
            }
            try {
              const event: SSEEvent = JSON.parse(raw);
              this.dispatchEvent(event, handlers);
            } catch {
              // skip malformed JSON
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  abort(): void {
    this.controller?.abort();
  }

  private dispatchEvent(event: SSEEvent, handlers: EventHandlers): void {
    switch (event.type) {
      case 'run_start':      handlers.onRunStart?.(event); break;
      case 'run_end':        handlers.onRunEnd?.(event); break;
      case 'run_error':      handlers.onRunError?.(event); break;
      case 'session':        handlers.onSession?.(event); break;
      case 'agent_switch':   handlers.onAgentSwitch?.(event); break;
      case 'done':           handlers.onDone?.(); break;
      case 'suggestions':    handlers.onSuggestions?.(event); break;
      case 'state_snapshot': handlers.onStateSnapshot?.(event); break;
      case 'state_delta':    handlers.onStateDelta?.(event); break;
      case 'widget':         handlers.onWidget?.(event); break;
      // 三元组事件
      case 'text_message_start':    handlers.onTextStart?.(event); break;
      case 'text_message_content':  handlers.onTextDelta?.(event); break;
      case 'text_message_end':      handlers.onTextEnd?.(event); break;
      case 'tool_call_start':       handlers.onToolCallStart?.(event); break;
      case 'tool_call_args':        handlers.onToolCallArgs?.(event); break;
      case 'tool_call_end':         handlers.onToolCallEnd?.(event); break;
      case 'tool_call_result':      handlers.onToolCallResult?.(event); break;
      case 'reasoning_start':       handlers.onReasoningStart?.(event); break;
      case 'reasoning_content':     handlers.onReasoningDelta?.(event); break;
      case 'reasoning_end':         handlers.onReasoningEnd?.(event); break;
    }
  }
}
```

### 9.2 流式内容拼接

```typescript
// 管理三元组状态的 hook
function useStreamAssembler() {
  const [textBuffers, setTextBuffers] = useState<Record<string, string>>({});
  const [toolBuffers, setToolBuffers] = useState<Record<string, string>>({});

  const handleTextDelta = useCallback((event: SSEEvent) => {
    setTextBuffers(prev => ({
      ...prev,
      [event.id]: (prev[event.id] || '') + event.delta,
    }));
  }, []);

  const handleTextEnd = useCallback((event: SSEEvent) => {
    setTextBuffers(prev => {
      const { [event.id]: finished, ...rest } = prev;
      return rest;
    });
  }, []);

  const handleToolCallArgs = useCallback((event: SSEEvent) => {
    setToolBuffers(prev => ({
      ...prev,
      [event.id]: (prev[event.id] || '') + event.delta,
    }));
  }, []);

  return {
    textBuffers,
    toolBuffers,
    handleTextDelta,
    handleTextEnd,
    handleToolCallArgs,
  };
}
```

### 9.3 控件渲染

```tsx
function WidgetRenderer({ widget }: { widget: WidgetEvent }) {
  switch (widget.widget) {
    case 'markdown':
      return <MarkdownContent content={widget.data.content} />;
    case 'code_block':
      return <CodeBlock language={widget.data.language} code={widget.data.code} />;
    case 'table':
      return <DataTable columns={widget.data.columns} rows={widget.data.rows} />;
    case 'chart':
      return <ChartRenderer config={widget.data} />;
    case 'card':
      return <InfoCard {...widget.data} />;
    case 'citation':
      return <CitationList sources={widget.data.sources} />;
    case 'alert':
      return <Alert level={widget.data.level} message={widget.data.message} />;
    case 'progress':
      return <ProgressBar percent={widget.data.percent} label={widget.data.label} />;
    case 'file':
      return <FileAttachment {...widget.data} />;
    case 'image':
      return <img src={widget.data.url} alt={widget.data.alt} />;
    default:
      return <pre>{JSON.stringify(widget.data, null, 2)}</pre>;
  }
}
```

### 9.4 SSE 缓冲区溢出防护

前端通过 `ReadableStream` 读取 SSE 数据时，会将收到的字节拼接到内存缓冲区中再按 `\n\n` 分割事件。如果后端异常（如发送了超大 JSON、事件之间缺少分隔符、或连接卡死但未关闭），缓冲区会持续增长，最终导致前端内存溢出或页面卡死。

**防护策略**：在流式读取循环中监控缓冲区长度，超过阈值时强制清空并记录告警。

```typescript
async function consumeStream(
  response: Response,
  handlers: EventHandlers
): Promise<void> {
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  if (!reader) throw new Error('No response body');

  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const events = buffer.split('\n\n');
      buffer = events.pop() || '';

      for (const raw of events) {
        if (!raw.trim()) continue;
        // ... 解析并派发事件
      }

      // 缓冲区溢出防护：超过阈值时强制清空
      if (buffer.length > 20000) {
        console.warn('[SSE] Buffer overflow, clearing:', buffer.length);
        buffer = '';
      }
    }
  } finally {
    reader.releaseLock();
  }
}
```

**阈值建议**：

| 场景 | 建议阈值 | 说明 |
|------|----------|------|
| 常规对话 | 20 KB | 一般单个事件不会超过此大小 |
| 含大块工具结果 | 50 KB | 工具返回大量结构化数据时可适当放宽 |
| 含图片 Base64 | 100 KB | 图片内联传输场景需要更大阈值 |

**注意事项**：
- 清空缓冲区后，下一轮读取仍会正常拼接新数据，不会丢失后续事件
- 如果需要更精确的容错，可以在清空前尝试从缓冲区中提取最后一个完整的 `data: {...}` 行
- 后端也应控制单个事件的大小，避免发送超过 64 KB 的单条事件

---

## 10. 错误处理

### 10.1 HTTP 错误

| 状态码 | 说明 |
|--------|------|
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 429 | 请求过于频繁 |
| 500 | 服务器内部错误 |

### 10.2 流内错误

通过 `run_error` 事件在流中报告错误：

```json
{
  "type": "run_error",
  "code": "TOOL_TIMEOUT",
  "message": "工具调用超时，请稍后重试"
}
```

### 10.3 建议的错误码

| code | 说明 |
|------|------|
| `TOOL_TIMEOUT` | 工具调用超时 |
| `TOOL_EXECUTION_FAILED` | 工具执行失败 |
| `MODEL_ERROR` | 模型调用错误 |
| `CONTEXT_TOO_LONG` | 上下文超长 |
| `RATE_LIMITED` | 频率限制 |
| `UNKNOWN` | 未知错误 |

---

## 11. 版本历史

| 版本 | 日期 | 变更说明 |
|------|------|----------|
| 1.0 | 2026-05-29 | 初始版本，定义混合事件模式、控件类型系统、完整消息格式 |
