# blog

基于 Nuxt 4 的个人博客项目。

## 在线地址

- Vercel: [https://blog-hazel-seven-14.vercel.app/](https://blog-hazel-seven-14.vercel.app/)
- GitHub Pages: [https://noches0909.github.io/blog/](https://noches0909.github.io/blog/)

## 当前能力

- 首页介绍页
- 博客列表页 `/blog`
- 文章详情页 `/blog/[...slug]`
- 项目列表页与项目详情页
- Markdown 内容渲染
- 暗黑模式切换

## 技术栈

- `nuxt@4`
- `@nuxt/content`
- `@nuxtjs/color-mode`
- `tailwindcss@4`

## 目录说明

```txt
.
├── app/
│   ├── assets/css/              # 全局样式
│   ├── layouts/                 # 默认布局
│   ├── pages/                   # 页面路由
│   └── app.vue                  # 应用入口
├── components/                  # 业务组件与公用壳层
├── content/
│   ├── blog/                    # 博客文章
│   └── project/nuxt-blog.md     # README.md 的软链接
├── scripts/
│   ├── sync-project-doc-link.mjs
│   └── fix-pages-output.mjs
├── content.config.ts
└── nuxt.config.ts
```

## 本地开发

```bash
bun install
bun run dev
```

## 检查与构建

```bash
bun run typecheck
bun run build
bun run generate
```

`generate` 会额外执行兼容脚本，补齐 GitHub Pages 静态部署下的旧链接输出。
