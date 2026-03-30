<script setup lang="ts">
definePageMeta({
  alias: ["/:slug(.*)*"],
})

function normalizeBlogSlug(value: string) {
  return value.replace(/^\/+|\/+$/g, "").replace(/^blog\//, "")
}

const route = useRoute()

const slug = computed(() => {
  const param = route.params.slug
  const raw = Array.isArray(param) ? param.join("/") : (param ?? "")
  return normalizeBlogSlug(raw)
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
  return value ? dateFormatter.format(new Date(value)) : "-"
}

function resolveArticleTo(path?: string) {
  return path || "/blog"
}

useSeoMeta({
  title: () => articleData.value.title || "文章详情",
  description: () => articleData.value.description || "博客文章详情页",
  ogTitle: () => articleData.value.title,
  ogDescription: () => articleData.value.description,
})
</script>

<template>
  <PageShell width="md">
    <header class="glass-shell p-5 sm:p-6">
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
      >
        <AppIcon name="arrow-left" class="h-4 w-4" />
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

    <article class="glass-doc rich-text mt-5 px-4 py-6 sm:px-7 sm:py-8">
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
  </PageShell>
</template>
