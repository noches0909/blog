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
    stack: ["Nuxt 4", "@nuxt/content", "Tailwind CSS"],
    to: "/project/nuxt-blog",
    cta: "查看项目详情",
  },
] as const
</script>

<template>
  <PageShell width="xl">
    <header class="studio-header">
      <p class="studio-kicker">Projects</p>
      <div class="grid gap-5 lg:grid-cols-[1fr_22rem] lg:items-end">
        <h1 class="studio-title">项目工作台</h1>
        <p class="studio-copy lg:pb-2">
          只保留当前仍在维护的项目。这里不做热闹的作品墙，而是像一张持续更新的工程地图。
        </p>
      </div>
    </header>

    <section class="mt-8 grid gap-4 lg:grid-cols-[1fr_0.72fr]">
      <NuxtLink
        v-for="project in projects"
        :key="project.name"
        :to="project.to"
        class="studio-panel group p-5 sm:p-6"
      >
        <div class="relative z-10 flex min-h-64 flex-col justify-between gap-8">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="studio-kicker">Active Repository</p>
              <h2 class="mt-3 text-3xl font-semibold leading-none text-slate-950 sm:text-5xl dark:text-white">
                {{ project.name }}
              </h2>
            </div>
            <span class="studio-chip">{{ project.status }}</span>
          </div>

          <div>
            <p class="max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
              {{ project.description }}
            </p>

            <div class="mt-5 flex flex-wrap items-center gap-2">
              <span v-for="item in project.stack" :key="`${project.name}-${item}`" class="studio-chip">
                {{ item }}
              </span>
            </div>
          </div>

          <div
            class="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition group-hover:text-primary dark:text-slate-300"
          >
            {{ project.cta }}
            <AppIcon name="arrow-right" class="h-4 w-4 transition group-hover:translate-x-1" />
          </div>
        </div>
      </NuxtLink>

      <aside class="studio-panel p-5 sm:p-6">
        <div class="relative z-10 flex h-full min-h-64 flex-col justify-between gap-8">
          <div>
            <p class="studio-kicker">Signal</p>
            <p class="mt-4 text-2xl font-semibold leading-tight text-slate-950 dark:text-white">
              文档与项目保持同步，减少手动维护的断层。
            </p>
          </div>
          <div class="grid grid-cols-3 gap-2 text-center">
            <div class="border border-slate-300/40 bg-white/30 p-3 dark:border-slate-500/20 dark:bg-slate-900/24">
              <div class="text-xl font-semibold text-slate-950 dark:text-white">01</div>
              <div class="text-xs text-slate-500 dark:text-slate-400">维护中</div>
            </div>
            <div class="border border-slate-300/40 bg-white/30 p-3 dark:border-slate-500/20 dark:bg-slate-900/24">
              <div class="text-xl font-semibold text-slate-950 dark:text-white">Nuxt</div>
              <div class="text-xs text-slate-500 dark:text-slate-400">主栈</div>
            </div>
            <div class="border border-slate-300/40 bg-white/30 p-3 dark:border-slate-500/20 dark:bg-slate-900/24">
              <div class="text-xl font-semibold text-slate-950 dark:text-white">Docs</div>
              <div class="text-xs text-slate-500 dark:text-slate-400">驱动</div>
            </div>
          </div>
        </div>
      </aside>
    </section>
  </PageShell>
</template>
