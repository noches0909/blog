<script setup lang="ts">
const route = useRoute()

const slug = computed(() => {
  const param = route.params.slug
  return Array.isArray(param) ? param[0] || "" : (param || "")
})

const currentStem = computed(() => `project/${slug.value}`)

const projectMeta = computed(() => {
  if (slug.value === "nuxt-blog") {
    return {
      title: "nuxt-blog",
      description: "项目详情页内容来自当前仓库 README.md。",
    }
  }

  return {
    title: "项目详情",
    description: "项目文档详情页",
  }
})

const { data: projectDoc } = await useAsyncData(
  () => `project-doc:${currentStem.value}`,
  () => queryCollection("project").where("stem", "=", currentStem.value).first(),
)

if (!projectDoc.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "项目不存在",
  })
}

const projectData = computed(() => projectDoc.value!)

useSeoMeta({
  title: () => projectMeta.value.title,
  description: () => projectMeta.value.description,
  ogTitle: () => projectMeta.value.title,
  ogDescription: () => projectMeta.value.description,
})
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100/70 px-4 py-10 sm:py-14 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900"
  >
    <div class="mx-auto w-full max-w-3xl">
      <header class="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900/80">
        <NuxtLink
          to="/project"
          class="inline-flex items-center gap-2 text-base text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <Icon name="lucide:arrow-left" class="h-4 w-4" />
          返回项目列表
        </NuxtLink>

        <h1 class="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          {{ projectMeta.title }}
        </h1>
        <p class="mt-2 text-base text-slate-600 dark:text-slate-300">
          {{ projectMeta.description }}
        </p>
      </header>

      <article class="article-body mt-6 rounded-3xl border border-slate-200 bg-white/90 px-4 py-6 shadow-sm sm:px-6 sm:py-8 dark:border-slate-800 dark:bg-slate-900/80">
        <ContentRenderer :value="projectData" prose />
      </article>
    </div>
  </div>
</template>

<style scoped>
.article-body :deep(h1) {
  margin-bottom: 0.75rem;
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 1.3;
}

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

.article-body :deep(p),
.article-body :deep(li) {
  margin-top: 0.75rem;
  line-height: 1.8;
  color: rgb(71 85 105);
}

.dark .article-body :deep(p),
.dark .article-body :deep(li) {
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
