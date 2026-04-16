<script setup lang="ts">
import avatarUrl from "~/assets/image/avatar.png"

useSeoMeta({
  title: "关于",
  description: "关于 Noland Cheng 和当前关注方向的简要介绍。",
})
</script>

<template>
  <PageShell width="md">
    <header class="text-center">
      <Avatar
        class="mx-auto mb-5 h-20 w-20 shadow-lg sm:h-24 sm:w-24"
        style="width: clamp(5rem, 18vw, 6rem); height: clamp(5rem, 18vw, 6rem);"
      >
        <AvatarImage
          :src="avatarUrl"
          alt="Noland Cheng"
          loading="eager"
          decoding="async"
          class="object-cover object-top"
        />
        <AvatarFallback>NC</AvatarFallback>
      </Avatar>
      <h1 class="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">关于我</h1>
      <p class="mt-2 text-base text-slate-600 dark:text-slate-400">页面内容保持精简，后续会逐步补充。</p>
    </header>

    <section class="glass-shell mt-8 p-6 sm:p-7">
      <h2 class="text-xl font-semibold text-slate-900 dark:text-white">当前信息</h2>

      <div
        class="glass-shell glass-stack mt-4 rounded-2xl border-white/60 bg-white/36 dark:border-slate-600/30 dark:bg-slate-900/28"
      >
        <p class="glass-row text-base text-slate-600 dark:text-slate-300">
          目前主要关注 Nuxt、前端工程化和内容工作流实践。
        </p>

        <p class="glass-row text-base text-slate-600 dark:text-slate-300">
          GitHub：
          <a
            href="https://github.com/noches0909"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary underline-offset-4 hover:underline"
          >
            github.com/noches0909
          </a>
        </p>
      </div>
    </section>
  </PageShell>
</template>
