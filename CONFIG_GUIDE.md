# 配置说明

## 项目结构

```txt
.
├── app/
│   ├── app.vue
│   ├── assets/css/tailwind.css
│   ├── layouts/default.vue
│   └── pages/
│       ├── about.vue
│       ├── blog/
│       │   ├── [...slug].vue
│       │   └── index.vue
│       ├── index.vue
│       └── project/
│           ├── [slug].vue
│           └── index.vue
├── components/
│   ├── AppIcon.vue
│   ├── LogoHome.vue
│   ├── Navigation.vue
│   ├── PageShell.vue
│   ├── ThemeToggle.vue
│   └── ui/aurora-background/AuroraBackground.vue
├── content/
│   ├── blog/*.md
│   └── project/nuxt-blog.md -> ../../README.md
├── scripts/
│   ├── fix-pages-output.mjs
│   └── sync-project-doc-link.mjs
├── content.config.ts
├── nuxt.config.ts
└── tsconfig.json
```

## 核心配置

### `nuxt.config.ts`

- 统一声明 Nuxt 模块：`@nuxt/content`、`@nuxtjs/color-mode`
- 根据 `NUXT_APP_BASE_URL` 和 GitHub Actions 环境推导 `app.baseURL`
- 为旧的博客详情路径预生成兼容路由
- 开启 `inlineStyles`，关闭 `payloadExtraction`，减少静态部署下的样式与 payload 问题

### `content.config.ts`

- `blog` 集合包含文章元数据校验：`title`、`description`、`date`、`tags`、`draft`
- `project` 集合用于项目文档页，目前通过 README 软链接提供内容

### `app/assets/css/tailwind.css`

- 作为 Tailwind v4 入口
- 定义全局色板、玻璃态页面壳层、导航按钮、文章正文和页面切换动画
- 只保留当前项目实际使用的设计 token 和组件类

### `components/AppIcon.vue`

- 将当前项目用到的图标内联到本地组件中
- 避免静态导出时依赖外部图标模块注入样式

## 路由与部署

### 博客详情兼容

- 页面文件是 `app/pages/blog/[...slug].vue`
- 为兼容 GitHub Pages 项目路径部署，详情页额外声明了 alias：`/:slug(.*)*`
- `nuxt.config.ts` 会为旧链接预渲染 `/blog/<slug>` 和 `/blog/blog/<slug>` 两类路径

### 项目文档同步

- `scripts/sync-project-doc-link.mjs` 会确保 `content/project/nuxt-blog.md` 始终指向 `README.md`
- 在不支持软链接的环境下，脚本会自动退回为复制文件

### 静态输出修正

- `scripts/fix-pages-output.mjs` 只在 `bun run generate` 时执行
- 作用是补齐静态部署下旧链接需要的目录结构，避免 GitHub Pages 直接刷新时丢失页面

## 常用命令

```bash
bun install
bun run dev
bun run typecheck
bun run build
bun run generate
```

## 维护建议

- 新增博客文章时，只需要在 `content/blog/` 下添加 Markdown 文件并补齐 frontmatter
- 新增页面时，优先复用 `PageShell.vue` 和 `tailwind.css` 中现有的公用类
- 如果后续移除 GitHub Pages 兼容需求，可以优先评估 `legacyBlogRoutes` 和 `fix-pages-output.mjs` 是否还需要保留
