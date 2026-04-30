<script setup lang="ts">
useSeoMeta({
  title: "全栈沉沦录",
  description: "记录 Nuxt、前端工程和产品实现过程中的思考。",
})

const activeTag = ref("全部")

const { data: posts, pending } = await useAsyncData("blog-posts", () =>
  queryCollection("blog").where("draft", "=", false).order("date", "DESC").all(),
)

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  dateStyle: "long",
})

const allTags = computed(() => {
  const tags = new Set<string>()

  for (const post of posts.value ?? []) {
    for (const tag of post.tags ?? []) {
      tags.add(tag)
    }
  }

  return ["全部", ...tags]
})

const filteredPosts = computed(() => {
  if (activeTag.value === "全部") {
    return posts.value ?? []
  }

  return (posts.value ?? []).filter((post) => (post.tags ?? []).includes(activeTag.value))
})

function resolvePostTo(post: { stem?: string; path?: string }) {
  if (post.stem?.startsWith("blog/")) {
    return `/blog/${post.stem.slice("blog/".length)}`
  }

  return post.path || "/blog"
}

function formatDate(value?: string) {
  return value ? dateFormatter.format(new Date(value)) : "-"
}
</script>

<template>
  <PageShell width="lg">
    <header class="studio-header">
      <p class="studio-kicker">Blog</p>
      <div class="grid gap-5 md:grid-cols-[1fr_18rem] md:items-end">
        <h1 class="studio-title">全栈沉沦录</h1>
        <p class="studio-copy md:pb-2">
          记录 Nuxt、前端工程和产品实现过程中的思考。保留简洁的入口，但让每篇文章像一条可以展开的线索。
        </p>
      </div>

      <div class="studio-rail pt-1">
        <Button
          v-for="tag in allTags"
          :key="tag"
          size="sm"
          variant="ghost"
          :class="[
            'studio-filter h-9 px-4',
            activeTag === tag && 'studio-filter-active hover:bg-primary hover:text-white',
          ]"
          :aria-pressed="activeTag === tag"
          @click="activeTag = tag"
        >
          {{ tag }}
        </Button>
      </div>
    </header>

    <section v-if="pending" class="studio-list mt-8">
      <div v-for="idx in 3" :key="idx" class="studio-panel h-32 animate-pulse" />
    </section>

    <TransitionGroup
      v-else-if="filteredPosts.length"
      name="post-list"
      tag="section"
      class="studio-list mt-8"
    >
      <NuxtLink
        v-for="(post, index) in filteredPosts"
        :key="post.stem || post.path"
        :to="resolvePostTo(post)"
        class="studio-item group"
      >
        <div class="grid gap-4 sm:grid-cols-[4.5rem_1fr_auto] sm:items-start">
          <div class="studio-item-index text-sm font-semibold">
            {{ String(index + 1).padStart(2, "0") }}
          </div>

          <div>
            <h2 class="text-xl font-semibold leading-tight text-slate-950 sm:text-2xl dark:text-white">
              {{ post.title }}
            </h2>
            <p class="mt-3 text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
              {{ post.description }}
            </p>
          </div>

          <AppIcon
            name="arrow-up-right"
            class="h-5 w-5 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
          />
        </div>

        <div class="mt-5 flex flex-wrap items-center gap-2 sm:pl-[5.5rem]">
          <span class="mr-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            {{ formatDate(post.date) }}
          </span>
          <span v-for="tag in post.tags" :key="`${post.path}-${tag}`" class="studio-chip">
            {{ tag }}
          </span>
        </div>
      </NuxtLink>
    </TransitionGroup>

    <section
      v-else
      class="studio-panel mt-8 p-10 text-center text-base text-slate-600 dark:text-slate-300"
    >
      还没有匹配的文章，试试切换其他标签。
    </section>
  </PageShell>
</template>

<style scoped>
.post-list-enter-active,
.post-list-leave-active,
.post-list-move {
  transition:
    opacity 0.36s ease,
    filter 0.4s ease,
    transform 0.42s cubic-bezier(0.22, 1, 0.36, 1);
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  filter: blur(6px);
  transform: translateY(18px);
}

.post-list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
