<script setup lang="ts">
useSeoMeta({
  title: "项目",
  description: "当前正在迭代的个人项目与技术实践。",
})

const projects = [
  {
    name: "nuxt-blog",
    description: "当前博客主项目，项目详情页内容与仓库 README.md 保持同步。",
    status: "维护中",
    stack: ["Nuxt4", "@nuxt/content", "Tailwind CSS"],
    to: "/project/nuxt-blog",
    cta: "查看项目详情",
  },
]
</script>

<template>
  <div class="glass-page px-4 pt-10 pb-28 sm:py-14">
    <div class="glass-backdrop">
      <div class="glass-orb glass-orb-left" />
      <div class="glass-orb glass-orb-right" />
      <div class="glass-grid" />
    </div>

    <div class="relative z-10 mx-auto w-full max-w-5xl">
      <header class="glass-shell mb-6 max-w-3xl p-5 sm:mb-8 sm:p-6">
        <p class="text-base uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Projects</p>
        <h1 class="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl dark:text-white">项目列表</h1>
        <p class="mt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          只保留 nuxt-blog 项目，详情页内容由项目文档驱动。
        </p>
      </header>

      <section class="glass-shell glass-stack sm:max-w-xl">
        <NuxtLink
          v-for="project in projects"
          :key="project.name"
          :to="project.to"
          class="glass-row group"
        >
          <div class="flex items-center justify-between gap-3">
            <h2 class="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">{{ project.name }}</h2>
            <span class="glass-chip">{{ project.status }}</span>
          </div>

          <p class="mt-2 text-sm text-slate-500 sm:text-base dark:text-slate-300">{{ project.description }}</p>

          <div class="mt-3 flex flex-wrap items-center gap-2">
            <span
              v-for="item in project.stack"
              :key="`${project.name}-${item}`"
              class="glass-chip"
            >
              {{ item }}
            </span>
          </div>

          <div
            class="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white"
          >
            {{ project.cta }}
            <Icon name="lucide:arrow-right" class="h-4 w-4" />
          </div>
        </NuxtLink>
      </section>
    </div>
  </div>
</template>
