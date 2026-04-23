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

const currentPath = computed(() => `/project/${slug.value}`)

const projectMeta = computed(() => {
  return (
    PROJECT_META[slug.value as keyof typeof PROJECT_META] ?? {
      title: "项目详情",
      description: "项目文档详情页",
    }
  )
})

const { data: projectDoc } = await useAsyncData(
  () => `project-doc:${currentPath.value}`,
  () => queryCollection("project").where("path", "=", currentPath.value).first(),
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
    <header class="studio-header">
      <NuxtLink
        to="/project"
        class="studio-back-link text-sm"
      >
        <AppIcon name="arrow-left" class="h-4 w-4" />
        返回项目列表
      </NuxtLink>

      <div>
        <p class="studio-kicker">Project Note</p>
        <h1 class="mt-3 text-4xl font-semibold leading-none text-slate-950 sm:text-6xl dark:text-white">
          {{ projectMeta.title }}
        </h1>
        <p class="studio-copy mt-4">
          {{ projectMeta.description }}
        </p>
      </div>
    </header>

    <article class="studio-panel rich-text mt-8 px-5 py-7 sm:px-8 sm:py-9">
      <ContentRenderer :value="projectData" prose />
    </article>
  </PageShell>
</template>
