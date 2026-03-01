<script setup lang="ts">
import avatarUrl from "~/assets/image/avatar.png"
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-10 sm:py-14 dark:from-slate-950 dark:to-slate-900">
    <div class="mx-auto w-full max-w-3xl">
      <header class="text-center">
        <Avatar
          class="mx-auto mb-5 h-20 w-20 sm:h-24 sm:w-24"
          style="width: clamp(5rem, 18vw, 6rem); height: clamp(5rem, 18vw, 6rem);"
        >
          <AvatarImage :src="avatarUrl" alt="Noland Cheng" class="object-cover object-top" width="96" height="96" />
          <AvatarFallback>NC</AvatarFallback>
        </Avatar>
        <h1 class="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">关于我</h1>
        <p class="mt-2 text-base text-slate-600 dark:text-slate-400">页面内容已精简，后续会逐步补充。</p>
      </header>

      <section
        class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
      >
        <h2 class="text-xl font-semibold text-slate-900 dark:text-white">当前信息</h2>
        <p class="mt-3 text-base text-slate-600 dark:text-slate-300">
          目前主要关注 Nuxt、前端工程化和内容工作流实践。
        </p>
        <p class="mt-2 text-base text-slate-600 dark:text-slate-300">
          GitHub：
          <a
            href="https://github.com/noches0909"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary hover:underline"
          >
            github.com/noches0909
          </a>
        </p>
      </section>
    </div>
  </div>
</template>
