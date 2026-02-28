# blog

基于 Nuxt 4 的个人博客项目（MVP 阶段）。

## 当前状态

已完成的基础能力：

- 首页展示 + 最新文章入口
- 博客列表页 `/blog`（来自 `@nuxt/content`）
- 文章详情页 `/blog/[...slug]`（Markdown 渲染）
- 上一篇 / 下一篇跳转
- 项目页、关于页
- 暗黑模式切换（`@nuxtjs/color-mode`）

## 技术栈

- `nuxt@4`
- `@nuxt/content`
- `@vueuse/core@14`
- `reka-ui`（配合本地 shadcn 风格组件）
- `@nuxt/icon`
- `tailwindcss@4`
- `motion-v`

## 目录说明

```txt
.
├── app/
│   ├── layouts/           # 全局布局
│   ├── pages/             # 页面路由
│   ├── plugins/           # 客户端/SSR 插件
│   └── assets/            # 全局样式与静态资源
├── components/
│   ├── ui/                # shadcn 风格 UI 组件
│   └── *.vue              # 业务组件
├── content/
│   └── blog/*.md          # 博客文章源文件
├── content.config.ts      # Nuxt Content 集合配置
└── nuxt.config.ts
```

## 本地开发

```bash
bun install
bun run dev
```

构建验证：

```bash
bun run nuxi typecheck
bun run build
```

## 后续待办（按优先级）

1. 增加 RSS 与 sitemap
2. 增加文章归档与分页
3. 完善 SEO 字段（OG、canonical、结构化数据）
4. 补充单元测试和 E2E 冒烟测试
