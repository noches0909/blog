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
      description: "项目详情页内容来自仓库 README.md，并通过 content/project/nuxt-blog.md 软链接接入。",
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
  <div class="glass-page px-4 py-10 sm:py-14">
    <div class="glass-backdrop">
      <div class="glass-orb glass-orb-left" />
      <div class="glass-orb glass-orb-right" />
      <div class="glass-grid" />
    </div>

    <div class="relative z-10 mx-auto w-full max-w-3xl">
      <header class="glass-shell p-5 sm:p-6">
        <NuxtLink
          to="/project"
          class="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <Icon name="lucide:arrow-left" class="h-4 w-4" />
          返回项目列表
        </NuxtLink>

        <h1 class="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
          {{ projectMeta.title }}
        </h1>
        <p class="mt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {{ projectMeta.description }}
        </p>
      </header>

      <article class="glass-doc article-body mt-5 px-4 py-6 sm:px-7 sm:py-8">
        <ContentRenderer :value="projectData" prose />
      </article>
    </div>
  </div>
</template>

<style scoped>
.article-body :deep(h1) {
  margin-bottom: 0.82rem;
  font-size: 1.85rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

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
