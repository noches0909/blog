<script setup lang="ts">
const PROJECT_META = {
  "nuxt-blog": {
    title: "nuxt-blog",
    description: "项目详情页内容来自仓库 README.md，并通过 content/project/nuxt-blog.md 软链接接入。",
  },
} as const

const route = useRoute()

const slug = computed(() => {
  const param = route.params.slug
  return Array.isArray(param) ? (param[0] ?? "") : (param ?? "")
})

const currentStem = computed(() => `project/${slug.value}`)

const projectMeta = computed(() => {
  return (
    PROJECT_META[slug.value as keyof typeof PROJECT_META] ?? {
      title: "项目详情",
      description: "项目文档详情页",
    }
  )
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
  <PageShell width="md">
    <header class="glass-shell p-5 sm:p-6">
      <NuxtLink
        to="/project"
        class="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
      >
        <AppIcon name="arrow-left" class="h-4 w-4" />
        返回项目列表
      </NuxtLink>

      <h1 class="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
        {{ projectMeta.title }}
      </h1>
      <p class="mt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300">
        {{ projectMeta.description }}
      </p>
    </header>

    <article class="glass-doc rich-text mt-5 px-4 py-6 sm:px-7 sm:py-8">
      <ContentRenderer :value="projectData" prose />
    </article>
  </PageShell>
</template>
