import { existsSync, readdirSync } from "node:fs"
import { resolve } from "node:path"

const isGitHubActions = process.env.GITHUB_ACTIONS === "true"
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "blog"
const isUserSiteRepository = repositoryName.endsWith(".github.io")

function normalizeBaseURL(value: string) {
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`
}

function collectMarkdownStems(dir: string, prefix = ""): string[] {
  if (!existsSync(dir)) {
    return []
  }

  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) {
      return collectMarkdownStems(resolve(dir, entry.name), `${prefix}${entry.name}/`)
    }

    if (!entry.name.endsWith(".md")) {
      return []
    }

    return `${prefix}${entry.name.replace(/\.md$/, "")}`
  })
}

const envBaseURL = process.env.NUXT_APP_BASE_URL?.trim()
const inferredBaseURL = isGitHubActions
  ? (isUserSiteRepository ? "/" : `/${repositoryName}/`)
  : "/"
const baseURL = normalizeBaseURL(envBaseURL || inferredBaseURL)

const legacyBlogRoutes = collectMarkdownStems(resolve("content/blog")).flatMap((stem) => [
  `/blog/${stem}`,
  `/blog/blog/${stem}`,
])

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxtjs/color-mode"],
  css: ["~/assets/css/tailwind.css"],
  components: [
    {
      path: resolve("components"),
      pathPrefix: false,
      extensions: ["vue"],
    },
  ],
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },
  nitro: {
    compressPublicAssets: true,
    prerender: {
      failOnError: false,
      routes: legacyBlogRoutes,
    },
  },
  features: {
    inlineStyles: true,
  },
  experimental: {
    payloadExtraction: false,
  },
  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
  },
  app: {
    baseURL,
    pageTransition: {
      name: "page-fade",
      mode: "out-in",
    },
    head: {
      title: "Noland Cheng",
      htmlAttrs: {
        lang: "zh-CN",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "color-scheme", content: "light dark" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: `${baseURL}favicon.ico` }],
    },
  },
})
