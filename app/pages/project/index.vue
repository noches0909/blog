<script setup lang="ts">
useSeoMeta({
  title: "项目",
  description: "当前正在迭代的个人项目与技术实践。",
})

const projects = [
  {
    name: "nuxt-blog",
    description: "当前博客主项目，项目详情页内容直接读取仓库 README.md。",
    status: "维护中",
    stack: ["Nuxt4", "@nuxt/content", "Tailwind CSS"],
    to: "/project/nuxt-blog",
    cta: "查看项目详情",
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
        <h1 class="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">项目列表</h1>
        <p class="mt-2 text-base text-slate-600 dark:text-slate-300">
          只保留 nuxt-blog 项目，详情页内容由项目 README 驱动。
        </p>
      </header>

      <section class="grid gap-4 sm:max-w-xl">
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
