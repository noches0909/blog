<script setup lang="ts">
definePageMeta({
  // 兼容 GitHub Pages 的 /blog/<slug> 直达刷新
  alias: ["/:slug(.*)*"],
})

const route = useRoute()

const slug = computed(() => {
  const param = route.params.slug
  const raw = Array.isArray(param) ? param.join("/") : (param || "")

  // Hydration 时可能命中 alias，把 slug 解析成 "blog/<actual-slug>"。
  // 这里统一去掉前导 "blog/"，保证内容查询始终命中 "blog/<slug>"。
  let normalized = raw.replace(/^\/+|\/+$/g, "")
  if (normalized.startsWith("blog/")) {
    normalized = normalized.slice("blog/".length)
  }

  return normalized
})

const currentStem = computed(() => `blog/${slug.value}`)

const { data: article } = await useAsyncData(
  () => `blog-article:${currentStem.value}`,
  () => queryCollection("blog").where("stem", "=", currentStem.value).first(),
)

if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "文章不存在",
  })
}

const articleData = computed(() => article.value!)
const currentPath = computed(() => articleData.value.path || `/blog/${slug.value}`)

const { data: surroundings } = await useAsyncData(
  () => `blog-surroundings:${currentPath.value}`,
  () =>
    queryCollectionItemSurroundings("blog", currentPath.value, {
      fields: ["title", "description"],
    }),
)

const previousArticle = computed(() => surroundings.value?.[0] || null)
const nextArticle = computed(() => surroundings.value?.[1] || null)

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  dateStyle: "long",
})

function formatDate(value?: string) {
  if (!value) {
    return "-"
  }

  return dateFormatter.format(new Date(value))
}

function resolveArticleTo(path?: string) {
  if (!path) {
    return "/blog"
  }

  return path
}

useSeoMeta({
  title: () => articleData.value.title || "文章详情",
  description: () => articleData.value.description || "博客文章详情页",
  ogTitle: () => articleData.value.title,
  ogDescription: () => articleData.value.description,
})
</script>

<template>
  <div class="glass-page px-4 pt-10 pb-28 sm:py-14">
    <div class="glass-backdrop">
      <div class="glass-orb glass-orb-left" />
      <div class="glass-orb glass-orb-right" />
      <div class="glass-grid" />
    </div>

    <div class="relative z-10 mx-auto w-full max-w-3xl">
      <header class="glass-shell p-5 sm:p-6">
        <NuxtLink
          to="/blog"
          class="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <Icon name="lucide:arrow-left" class="h-4 w-4" />
          返回列表
        </NuxtLink>

        <h1 class="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
          {{ articleData.title }}
        </h1>
        <p class="mt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {{ articleData.description }}
        </p>

        <div class="mt-4 flex flex-wrap items-center gap-2">
          <span class="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            发布于 {{ formatDate(articleData.date) }}
          </span>
          <span v-for="tag in articleData.tags || []" :key="tag" class="glass-chip">
            {{ tag }}
          </span>
        </div>
      </header>

      <article class="glass-doc article-body mt-5 px-4 py-6 sm:px-7 sm:py-8">
        <ContentRenderer :value="articleData" prose />
      </article>

      <footer class="glass-nav-grid mt-6 md:grid-cols-2">
        <NuxtLink v-if="previousArticle" :to="resolveArticleTo(previousArticle.path)" class="glass-nav-link">
          <div class="text-sm text-slate-500 dark:text-slate-400">上一篇</div>
          <div class="mt-1 font-medium text-slate-900 dark:text-white">
            {{ previousArticle.title }}
          </div>
        </NuxtLink>
        <div v-else class="hidden md:block" />

        <NuxtLink v-if="nextArticle" :to="resolveArticleTo(nextArticle.path)" class="glass-nav-link">
          <div class="text-sm text-slate-500 dark:text-slate-400">下一篇</div>
          <div class="mt-1 font-medium text-slate-900 dark:text-white">{{ nextArticle.title }}</div>
        </NuxtLink>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.article-body :deep(h2) {
  margin-top: 2.2rem;
  margin-bottom: 0.8rem;
  font-size: 1.45rem;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.article-body :deep(h3) {
  margin-top: 1.65rem;
  margin-bottom: 0.6rem;
  font-size: 1.15rem;
  font-weight: 600;
}

.article-body :deep(p),
.article-body :deep(li) {
  margin-top: 0.82rem;
  line-height: 1.85;
  color: rgb(51 65 85);
}

.dark .article-body :deep(p),
.dark .article-body :deep(li) {
  color: rgb(203 213 225 / 0.95);
}

.article-body :deep(ul),
.article-body :deep(ol) {
  margin-top: 0.9rem;
  padding-left: 1.25rem;
}

.article-body :deep(a) {
  color: var(--primary);
  text-decoration-color: color-mix(in oklab, var(--primary) 45%, transparent);
  text-underline-offset: 0.18em;
}

.dark .article-body :deep(a) {
  color: color-mix(in oklab, var(--primary) 78%, white 22%);
  text-decoration-color: color-mix(in oklab, var(--primary) 52%, transparent);
}

.article-body :deep(pre) {
  margin-top: 1.1rem;
  overflow-x: auto;
  border-radius: 1rem;
  border: 1px solid rgb(148 163 184 / 0.35);
  background: rgb(248 250 252 / 0.75);
  padding: 1rem;
  backdrop-filter: blur(10px);
}

.dark .article-body :deep(pre) {
  border-color: rgb(100 116 139 / 0.42);
  background: rgb(15 23 42 / 0.72);
}

.article-body :deep(code) {
  font-size: 0.87rem;
}

.article-body :deep(p code),
.article-body :deep(li code) {
  border-radius: 0.42rem;
  border: 1px solid rgb(203 213 225 / 0.7);
  background: rgb(241 245 249 / 0.8);
  color: rgb(15 23 42 / 0.95);
  padding: 0.08rem 0.38rem;
}

.dark .article-body :deep(p code),
.dark .article-body :deep(li code) {
  border-color: rgb(100 116 139 / 0.45);
  background: rgb(30 41 59 / 0.72);
  color: rgb(226 232 240 / 0.96);
}
</style>
