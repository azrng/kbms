# CLAUDE.md

本文件为 Claude Code 提供项目级别的指导和规范。

## 项目概述

这是一个基于 VuePress 的知识库管理系统 (KBMS)，包含 AI、云计算、前端等多个技术领域的文档。

## 文档图片存储规范

### 存储位置

所有文档图片统一存储在 `src/.vuepress/public/` 目录下，按文档分类存放：

```
src/.vuepress/public/
├── ai/           # AI 相关文档图片
├── cloud/        # 云计算相关文档图片
├── frontend/     # 前端相关文档图片
├── common/       # 通用图片
└── ...
```

### 命名规范

图片文件使用 **UUID** 命名，防止文件名冲突：

```
{uuid}.{扩展名}
```

示例：
- `730c3aaa-62df-48ab-ae7c-784bb900128b.jpg`
- `f7242e30-48b5-4dc5-9a47-840d163d006b.png`

### 生成 UUID

使用 Node.js 生成 UUID：

```bash
node -e "console.log(require('crypto').randomUUID())"
```

### 引用方式

在 Markdown 文档中使用绝对路径引用图片：

```markdown
![图片描述](/ai/730c3aaa-62df-48ab-ae7c-784bb900128b.jpg)
```

**注意**：不要使用相对路径（如 `./images/xxx.png`），统一使用 `/分类/uuid.ext` 格式。

### 添加新图片流程

1. 生成 UUID：`node -e "console.log(require('crypto').randomUUID())"`
2. 将图片保存到对应的 public 子目录，使用 UUID 命名
3. 在文档中使用 `/分类/uuid.ext` 格式引用

## 侧边栏配置

侧边栏配置文件位于 `src/.vuepress/sidebar/` 目录下：

- `ai.ts` - AI 模块侧边栏
- `cloud.ts` - 云计算模块侧边栏
- `frontend.ts` - 前端模块侧边栏
- ...

### 添加新文档

在对应的 sidebar 配置文件中添加文档路径：

```typescript
export const aiSidebar = [
    "readme.md",
    "new-doc.md",  // 添加新文档
    // ...
];
```

## 提示词库结构

提示词文档位于 `src/ai/prompts/` 目录：

```
src/ai/prompts/
├── README.md              # 索引目录
├── text/                  # 文本提示词
│   ├── prompt-writing.md
│   ├── coding-experts.md
│   └── ...
└── images/                # 图片提示词
    ├── id-photos.md
    ├── art-photos.md
    └── ...
```

## 常用命令

```bash
# 启动开发服务器
pnpm dev

# 构建项目
pnpm build

# 生成 UUID
node -e "console.log(require('crypto').randomUUID())"
```
