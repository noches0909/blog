# Nuxt 配置说明文档

## 📁 项目结构说明

```
├── app/                          # Nuxt 4.x 应用目录
│   ├── app.vue                   # 应用根组件
│   ├── app.html                  # 自定义HTML模板
│   ├── assets/css/               # CSS资源
│   │   └── tailwind.css          # Tailwind CSS配置文件
│   ├── layouts/                  # 布局组件
│   │   └── default.vue           # 默认布局
│   ├── pages/                    # 页面组件（自动路由）
│   │   ├── index.vue             # 首页 (/)
│   │   ├── about.vue             # 关于页 (/about)
│   │   ├── blog.vue              # 博客页 (/blog)
│   │   └── project.vue           # 项目页 (/project)
│   └── plugins/                  # 插件目录
│       └── color-mode.client.ts  # 颜色模式客户端插件
├── components/                   # 组件库
│   ├── ui/                       # Shadcn UI组件
│   ├── Navigation.vue            # 导航组件
│   └── ThemeToggle.vue           # 主题切换组件
├── public/                       # 静态资源
└── nuxt.config.ts               # Nuxt配置文件
```

## 🔧 主要配置解释

### nuxt.config.ts

项目的核心配置文件，包含：

- **模块配置**: 启用内容管理、图标库、UI组件库等
- **样式配置**: Tailwind CSS和PostCSS设置
- **路径别名**: 简化import语句
- **头部配置**: SEO和元数据设置
- **颜色模式**: 暗黑/明亮主题配置

### app.html

自定义HTML模板，包含：

- **防FOUC脚本**: 防止样式闪烁
- **颜色模式初始化**: 立即设置主题
- **基础HTML结构**: 替换Nuxt默认模板

### tailwind.css

样式配置文件，包含：

- **Tailwind导入**: 核心CSS框架
- **主题变量**: 颜色系统定义
- **暗黑模式**: 主题切换支持
- **防FOUC样式**: 页面加载优化

### color-mode.client.ts

客户端插件，用于：

- **主题同步**: 确保主题状态一致
- **DOM更新**: 立即应用主题类名
- **FOUC防护**: 减少主题切换闪烁

## 🎨 主题系统

### 工作原理

1. **系统检测**: 自动检测用户系统主题偏好
2. **用户选择**: 支持用户手动切换主题
3. **状态保存**: localStorage持久化保存选择
4. **即时应用**: 页面加载时立即应用正确主题

### 切换流程

1. 用户点击ThemeToggle组件
2. 更新colorMode状态
3. 保存到localStorage
4. 添加/移除HTML类名
5. CSS规则立即生效

## 🚀 性能优化

### 防止FOUC (Flash of Unstyled Content)

- **内联脚本**: HTML头部的立即执行脚本
- **基础样式**: CSS中的fallback颜色
- **平滑过渡**: 主题切换动画

### 资源优化

- **静态资源压缩**: Nitro自动压缩
- **CSS按需生成**: Tailwind只生成使用的样式
- **组件自动导入**: 无需手动import

## 📝 开发提示

### 添加新页面

1. 在 `app/pages/` 目录下创建 `.vue` 文件
2. Nuxt会自动创建对应路由
3. 页面会自动使用 `layouts/default.vue` 布局

### 修改主题颜色

1. 编辑 `tailwind.css` 中的CSS变量
2. 确保同时定义明亮和暗黑模式的颜色
3. 重启开发服务器生效

### 添加新组件

1. 在 `components/` 目录下创建组件
2. Nuxt会自动导入，无需手动import
3. 可以在任何页面或组件中直接使用

## 🛠️ 常用命令

```bash
# 开发模式
bun run dev

# 构建项目
bun run build

# 预览构建结果
bun run preview

# 生成静态站点
bun run generate
```

## 📚 相关文档

- [Nuxt 3 文档](https://nuxt.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Shadcn/ui 文档](https://ui.shadcn.com/)
- [Color Mode 模块](https://color-mode.nuxtjs.org/)
