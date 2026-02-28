<script setup lang="ts">
useSeoMeta({
  title: "项目",
  description: "当前正在迭代的个人项目与技术实践。",
})

const projects = [
  {
    name: "Nuxt4 Blog",
    description: "当前博客主项目，已完成基础内容发布链路。",
    status: "进行中",
    stack: ["Nuxt4", "@nuxt/content", "Tailwind CSS"],
    to: "/blog/nuxt4-blog-mvp",
    cta: "查看改造记录",
  },
  {
    name: "内容工作流优化",
    description: "围绕文章产出、SEO 和自动化发布进行后续打磨。",
    status: "计划中",
    stack: ["Markdown", "SEO", "Automation"],
    to: "/blog/writing-flow",
    cta: "查看思路",
  },
  {
    name: "插件体系梳理",
    description: "沉淀插件分工和边界，保证博客长期维护成本可控。",
    status: "进行中",
    stack: ["Nuxt Modules", "DX"],
    to: "/blog/plugins-practice",
    cta: "阅读文章",
  },
]
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100/80 px-4 py-10 sm:py-14 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900"
  >
    <div class="mx-auto w-full max-w-5xl">
      <header class="mb-7 sm:mb-8">
        <p class="text-base uppercase tracking-widest text-slate-500 dark:text-slate-400">Projects</p>
        <h1 class="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">项目梳理</h1>
        <p class="mt-2 text-base text-slate-600 dark:text-slate-300">
          聚焦博客主线，只保留对内容生产和阅读体验有直接价值的工作。
        </p>
      </header>

      <section class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="project in projects"
          :key="project.name"
          class="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70"
        >
          <div class="flex items-center justify-between gap-3">
            <h2 class="text-lg font-semibold text-slate-900 dark:text-white">{{ project.name }}</h2>
            <span
              class="rounded-full bg-slate-100 px-2.5 py-1 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {{ project.status }}
            </span>
          </div>

          <p class="mt-3 text-base text-slate-600 dark:text-slate-300">{{ project.description }}</p>

          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="item in project.stack"
              :key="`${project.name}-${item}`"
              class="rounded-full border border-slate-200 px-2 py-1 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-300"
            >
              {{ item }}
            </span>
          </div>

          <Button as-child variant="outline" class="mt-6 w-full">
            <NuxtLink :to="project.to">
              {{ project.cta }}
              <Icon name="lucide:arrow-right" class="h-4 w-4" />
            </NuxtLink>
          </Button>
        </article>
      </section>
    </div>
  </div>
</template>
