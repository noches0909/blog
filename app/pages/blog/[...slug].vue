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
    <header class="studio-header">
      <NuxtLink
        to="/blog"
        class="studio-back-link text-sm"
      >
        <AppIcon name="arrow-left" class="h-4 w-4" />
        返回列表
      </NuxtLink>

      <div>
        <p class="studio-kicker">Article</p>
        <h1 class="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl dark:text-white">
          {{ articleData.title }}
        </h1>
        <p class="studio-copy mt-4">
          {{ articleData.description }}
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <span class="mr-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          发布于 {{ formatDate(articleData.date) }}
        </span>
        <span v-for="tag in articleData.tags || []" :key="tag" class="studio-chip">
          {{ tag }}
        </span>
      </div>
    </header>

    <article class="studio-panel rich-text mt-8 px-5 py-7 sm:px-8 sm:py-9">
      <ContentRenderer :value="articleData" prose />
    </article>

    <footer class="mt-6 grid gap-3 md:grid-cols-2">
      <NuxtLink v-if="previousArticle" :to="resolveArticleTo(previousArticle.path)" class="studio-item">
        <div class="text-sm text-slate-500 dark:text-slate-400">上一篇</div>
        <div class="mt-1 font-medium text-slate-900 dark:text-white">
          {{ previousArticle.title }}
        </div>
      </NuxtLink>
      <div v-else class="hidden md:block" />

      <NuxtLink v-if="nextArticle" :to="resolveArticleTo(nextArticle.path)" class="studio-item">
        <div class="text-sm text-slate-500 dark:text-slate-400">下一篇</div>
        <div class="mt-1 font-medium text-slate-900 dark:text-white">{{ nextArticle.title }}</div>
      </NuxtLink>
    </footer>
  </PageShell>
</template>
