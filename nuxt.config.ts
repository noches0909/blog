// Nuxt 配置文档: https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "pathe"

const isGitHubActions = process.env.GITHUB_ACTIONS === "true"
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "blog"
const isUserSiteRepository = repositoryName.endsWith(".github.io")

function normalizeBaseURL(value: string) {
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`
}

// 优先使用显式环境变量，兼容自定义域名或根路径部署
const envBaseURL = process.env.NUXT_APP_BASE_URL?.trim()
const inferredBaseURL = isGitHubActions
  ? isUserSiteRepository
    ? "/"
    : `/${repositoryName}/`
  : "/"
const baseURL = normalizeBaseURL(envBaseURL || inferredBaseURL)

export default defineNuxtConfig({
  // 兼容性日期 - 告诉Nuxt你希望使用的功能版本
  compatibilityDate: "2025-07-15",

  // 开发工具 - 在开发环境中启用Vue DevTools
  devtools: { enabled: true },

  // Nuxt模块 - 扩展Nuxt功能的插件
  modules: [
    "@nuxt/content", // 内容管理系统，支持Markdown等
    "@nuxt/icon", // 图标库，提供大量图标
    "@nuxtjs/color-mode", // 暗黑/明亮模式切换功能
  ],

  // 全局CSS文件 - 会被注入到所有页面
  css: ["~/assets/css/tailwind.css"],

  // Nitro服务器引擎配置
  nitro: {
    compressPublicAssets: true, // 压缩静态资源，提高加载速度
  },

  // Nuxt功能特性配置
  features: {
    inlineStyles: false, // 不内联CSS样式，避免FOUC闪烁
  },

  // 对 GitHub Pages 静态部署更稳，避免 payload 抓取路径冲突
  experimental: {
    payloadExtraction: false,
  },

  // 组件自动导入配置
  components: [
    {
      path: "@@/components", // 组件目录路径（根目录下的components）
      pathPrefix: false, // 不使用路径作为组件名前缀
      extensions: ["vue"], // 只导入.vue文件
    },
  ],

  // PostCSS配置 - CSS预处理器
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {}, // Tailwind CSS处理器
    },
  },

  // 颜色模式配置（暗黑/明亮主题）
  colorMode: {
    classSuffix: "", // CSS类名后缀
    preference: "system", // 默认跟随系统设置
    fallback: "light", // 系统设置无法获取时的默认值
    hid: "nuxt-color-mode-script", // 脚本标签ID
    globalName: "__NUXT_COLOR_MODE__", // 全局变量名
    componentName: "ColorScheme", // 组件名
    classPrefix: "", // CSS类名前缀
    storageKey: "nuxt-color-mode", // localStorage存储键名
  },

  // 路径别名配置 - 简化import路径
  alias: {
    "@@": resolve("./"), // @@指向项目根目录（Nuxt规范）
    "~~": resolve("./"), // ~~指向项目根目录（Nuxt规范，同@@）
    "@": resolve("./app"), // @指向app目录（主要开发目录）
    "~": resolve("./app"), // ~指向app目录（与@相同，提供选择）
  },

  // 应用配置
  app: {
    // GitHub Pages 项目站点需要带仓库名前缀，例如 /blog/
    baseURL,
    pageTransition: {
      name: "page-fade",
      mode: "out-in",
    },

    head: {
      title: "Noland Cheng", // 网站标题
      // titleTemplate: "%s · Noland Cheng", // 页面标题模板（被注释掉）

      // HTML根元素属性
      htmlAttrs: {
        lang: "zh-cn", // 设置页面语言为中文
      },

      // HTML头部meta标签
      meta: [
        { charset: "utf-8" }, // 字符编码
        { name: "viewport", content: "width=device-width, initial-scale=1" }, // 响应式视口
        { name: "color-scheme", content: "light dark" }, // 支持的颜色方案
      ],

      // HTML头部link标签
      link: [
        { rel: "icon", type: "image/x-icon", href: `${baseURL}favicon.ico` }, // 网站图标
      ],
    },
  },
})
