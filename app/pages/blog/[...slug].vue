<script setup lang="ts">
const route = useRoute()

const slug = computed(() => {
  const param = route.params.slug
  if (Array.isArray(param)) {
    return param.join("/")
  }

  return param || ""
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

useSeoMeta({
  title: () => articleData.value.title || "文章详情",
  description: () => articleData.value.description || "博客文章详情页",
  ogTitle: () => articleData.value.title,
  ogDescription: () => articleData.value.description,
})
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100/70 px-4 py-10 sm:py-14 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900"
  >
    <div class="mx-auto w-full max-w-3xl">
      <header class="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900/80">
        <NuxtLink
          to="/blog"
          class="inline-flex items-center gap-2 text-base text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <Icon name="lucide:arrow-left" class="h-4 w-4" />
          返回列表
        </NuxtLink>

        <h1 class="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          {{ articleData.title }}
        </h1>
        <p class="mt-2 text-base text-slate-600 dark:text-slate-300">
          {{ articleData.description }}
        </p>

        <div class="mt-4 flex flex-wrap items-center gap-2">
          <span class="text-base text-slate-500 dark:text-slate-400">
            发布于 {{ formatDate(articleData.date) }}
          </span>
          <span
            v-for="tag in articleData.tags || []"
            :key="tag"
            class="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          >
            {{ tag }}
          </span>
        </div>
      </header>

      <article class="article-body mt-6 rounded-3xl border border-slate-200 bg-white/90 px-4 py-6 shadow-sm sm:px-6 sm:py-8 dark:border-slate-800 dark:bg-slate-900/80">
        <ContentRenderer :value="articleData" prose />
      </article>

      <footer class="mt-6 grid gap-3 md:grid-cols-2">
        <NuxtLink
          v-if="previousArticle"
          :to="previousArticle.path"
          class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base transition hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-slate-600"
        >
          <div class="text-sm text-slate-500 dark:text-slate-400">上一篇</div>
          <div class="mt-1 font-medium text-slate-900 dark:text-white">
            {{ previousArticle.title }}
          </div>
        </NuxtLink>
        <div v-else class="hidden md:block" />

        <NuxtLink
          v-if="nextArticle"
          :to="nextArticle.path"
          class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base transition hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-slate-600"
        >
          <div class="text-sm text-slate-500 dark:text-slate-400">下一篇</div>
          <div class="mt-1 font-medium text-slate-900 dark:text-white">{{ nextArticle.title }}</div>
        </NuxtLink>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.article-body :deep(h2) {
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.35;
}

.article-body :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.6rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.article-body :deep(p) {
  margin-top: 0.75rem;
  line-height: 1.8;
  color: rgb(71 85 105);
}

.dark .article-body :deep(p) {
  color: rgb(203 213 225);
}

.article-body :deep(pre) {
  margin-top: 1rem;
  overflow-x: auto;
  border-radius: 0.75rem;
  border: 1px solid rgb(226 232 240);
  background: rgb(248 250 252);
  padding: 1rem;
}

.dark .article-body :deep(pre) {
  border-color: rgb(51 65 85);
  background: rgb(15 23 42);
}

.article-body :deep(code) {
  font-size: 0.88rem;
}

.article-body :deep(p code),
.article-body :deep(li code) {
  border-radius: 0.35rem;
  background: rgb(241 245 249);
  color: rgb(15 23 42);
  padding: 0.08rem 0.35rem;
}

.dark .article-body :deep(p code),
.dark .article-body :deep(li code) {
  background: rgb(51 65 85);
  color: rgb(226 232 240);
}
</style>
