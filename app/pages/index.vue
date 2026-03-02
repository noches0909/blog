<script setup lang="ts">
import { Motion } from "motion-v"
import avatarUrl from "~/assets/image/avatar.png"

const { data: latestPosts } = await useAsyncData("home-latest-posts", () =>
  queryCollection("blog").where("draft", "=", false).order("date", "DESC").limit(3).all(),
)

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  dateStyle: "medium",
})

function formatDate(value?: string) {
  if (!value) {
    return "-"
  }

  return dateFormatter.format(new Date(value))
}

function resolvePostTo(post: { stem?: string; path?: string }) {
  if (post.stem?.startsWith("blog/")) {
    return `/${post.stem.slice("blog/".length)}`
  }

  if (post.path?.startsWith("/blog/")) {
    return `/${post.path.slice("/blog/".length)}`
  }

  return post.path || "/blog"
}
</script>

<template>
  <AuroraBackground>
    <Motion
      as="div"
      :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }"
      :while-in-view="{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }"
      :transition="{
        delay: 0.25,
        duration: 0.75,
        ease: 'easeInOut',
      }"
      class="relative flex w-full max-w-4xl flex-col items-center justify-center gap-4 px-4 py-6 sm:py-0"
    >
      <Avatar
        class="h-24 w-24 border-2 border-white/70 shadow-lg sm:h-28 sm:w-28 dark:border-slate-700"
        style="width: clamp(6rem, 22vw, 7rem); height: clamp(6rem, 22vw, 7rem);"
      >
        <AvatarImage
          :src="avatarUrl"
          alt="Noland Cheng"
          class="object-cover object-top"
          width="112"
          height="112"
          loading="eager"
          decoding="async"
        />
        <AvatarFallback>NC</AvatarFallback>
      </Avatar>

      <div class="text-center text-2xl font-bold sm:text-3xl md:text-6xl dark:text-white">Noland Cheng</div>
      <div class="max-w-3xl py-2 text-center font-extralight md:text-3xl dark:text-neutral-200">
        <p class="text-base md:text-2xl">涓流虽寡，浸成江河；爝火虽微，卒能燎野。</p>
        <p class="text-sm md:text-xl">
          Tiny streams converge to form vast rivers, and a little spark can light the field.
        </p>
      </div>

      <div class="mt-2 flex flex-wrap items-center justify-center gap-3">
        <Button as-child>
          <NuxtLink to="/blog">
            <Icon name="lucide:notebook-pen" class="h-4 w-4" />
            阅读博客
          </NuxtLink>
        </Button>
        <Button as-child variant="outline">
          <NuxtLink to="/project">
            <Icon name="lucide:folder-code" class="h-4 w-4" />
            查看项目
          </NuxtLink>
        </Button>
      </div>

      <section class="glass-shell mt-6 w-full p-3 sm:p-4">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white">最新文章</h2>
          <NuxtLink
            to="/blog"
            class="text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            查看全部
          </NuxtLink>
        </div>

        <div v-if="latestPosts?.length" class="glass-shell glass-stack rounded-2xl border-white/55 bg-white/35 dark:border-slate-600/30 dark:bg-slate-900/25">
          <NuxtLink
            v-for="post in latestPosts"
            :key="post.stem || post.path"
            :to="resolvePostTo(post)"
            class="glass-row group"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="text-sm text-slate-500 dark:text-slate-400">{{ formatDate(post.date) }}</div>
              <Icon name="lucide:arrow-up-right" class="glass-row-arrow mt-0.5 h-4 w-4 shrink-0" />
            </div>
            <div class="mt-1 text-base font-medium text-slate-900 dark:text-white">{{ post.title }}</div>
            <p class="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
              {{ post.description }}
            </p>
          </NuxtLink>
        </div>

        <p v-else class="glass-empty rounded-xl px-3 py-2 text-sm text-slate-600 dark:text-slate-300">
          还没有发布文章，先从第一篇开始吧。
        </p>
      </section>
    </Motion>
  </AuroraBackground>
</template>
