<script setup lang="ts">
import avatarUrl from "~/assets/image/avatar.png"

useSeoMeta({
  title: "关于",
  description: "关于 Noland Cheng 和当前关注方向的简要介绍。",
})
</script>

<template>
  <PageShell width="md">
    <article class="about-essay">
      <header class="text-center">
        <Avatar
          class="mx-auto h-20 w-20 border border-white/70 shadow-lg sm:h-24 sm:w-24 dark:border-slate-600/40"
          style="width: 6rem; height: 6rem;"
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

        <p class="studio-kicker mt-7">About</p>
        <h1 class="mt-4 text-4xl font-semibold leading-none text-slate-950 sm:text-6xl dark:text-white">
          关于我
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
          我想把这里留给一些更慢、更诚实的话。
        </p>
      </header>

      <div class="about-essay-body">
        <p>
          你好，我是 Noland Cheng。这里是一处个人博客，也是我给自己保留下来的一个小工作台。
          我会把写代码、做产品、整理想法时踩过的坑和得到的判断，尽量用清楚的文字记录下来。
        </p>

        <p>
          我对“持续”这件事很着迷。很多东西一开始都很小：一个页面、一次重构、一段笔记、一点关于工具的理解。
          但如果它们能被认真保存、反复校准，时间会慢慢把这些零散的东西连成路径。
        </p>

        <p>
          现在我主要关注 Nuxt、前端工程化、内容工作流，以及怎么把想法从模糊的念头推进到可以被使用的形态。
          我喜欢简洁的界面，也喜欢那些看起来安静、但能把复杂性藏得很好的系统。
        </p>

        <p>
          如果你读到这里，希望这个站点给你的感觉不是“完成了什么”，而是“还在生长”。
          我会继续写，继续调整，也继续把一些微小但真实的进展留在这里。
        </p>
      </div>
    </article>
  </PageShell>
</template>
