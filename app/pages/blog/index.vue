<script setup lang="ts">
import type { ComponentPublicInstance } from "vue"

useSeoMeta({
  title: "博客",
  description: "记录 Nuxt、前端工程和产品实现过程中的思考。",
})

const activeTag = ref("全部")

const tagRailRef = ref<HTMLElement | null>(null)
const tagRefs = ref<(HTMLButtonElement | null)[]>([])
const tagIndicatorStyle = ref<Record<string, string>>({
  opacity: "0",
})

const { data: posts, pending } = await useAsyncData("blog-posts", () =>
  queryCollection("blog").where("draft", "=", false).order("date", "DESC").all(),
)

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  dateStyle: "long",
})

const allTags = computed(() => {
  const tags = new Set<string>()

  for (const post of posts.value || []) {
    for (const tag of post.tags || []) {
      tags.add(tag)
    }
  }

  return ["全部", ...tags]
})

const filteredPosts = computed(() => {
  if (!posts.value) {
    return []
  }

  if (activeTag.value === "全部") {
    return posts.value
  }

  return posts.value.filter((post) => (post.tags || []).includes(activeTag.value))
})

function resolvePostTo(post: { stem?: string; path?: string }) {
  if (post.stem?.startsWith("blog/")) {
    return `/blog/${post.stem.slice("blog/".length)}`
  }

  return post.path || "/blog"
}

function formatDate(value?: string) {
  if (!value) {
    return "-"
  }

  return dateFormatter.format(new Date(value))
}

function setTagRef(el: Element | ComponentPublicInstance | null, index: number) {
  const target =
    el && "$el" in el
      ? ((el.$el as Element | null) ?? null)
      : (el as Element | null)

  tagRefs.value[index] = target instanceof HTMLButtonElement ? target : null
}

function updateTagIndicator() {
  if (!tagRailRef.value) {
    return
  }

  const index = allTags.value.findIndex((tag) => tag === activeTag.value)
  const target = tagRefs.value[index]
  if (!target) {
    tagIndicatorStyle.value = { opacity: "0" }
    return
  }

  tagIndicatorStyle.value = {
    opacity: "1",
    width: `${target.offsetWidth}px`,
    height: `${target.offsetHeight}px`,
    transform: `translate(${target.offsetLeft}px, ${target.offsetTop}px)`,
  }
}

watch([allTags, activeTag], async () => {
  await nextTick()
  updateTagIndicator()
})

function selectTag(tag: string) {
  if (activeTag.value === tag) {
    return
  }
  activeTag.value = tag
}

onMounted(() => {
  updateTagIndicator()
  window.addEventListener("resize", updateTagIndicator)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateTagIndicator)
})
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100/70 px-4 py-10 sm:py-14 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900"
  >
    <div class="mx-auto w-full max-w-4xl">
      <header
        class="mb-6 rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm sm:mb-8 sm:p-6 dark:border-slate-800 dark:bg-slate-900/70"
      >
        <p class="text-base uppercase tracking-widest text-slate-500 dark:text-slate-400">Blog</p>
        <h1 class="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">文章列表</h1>
        <p class="mt-2 text-base text-slate-600 dark:text-slate-300">
          当前提供最小可用的博客功能：文章列表、标签筛选和 Markdown 详情页渲染。
        </p>

        <div
          ref="tagRailRef"
          class="relative mt-5 flex flex-wrap gap-2 rounded-2xl bg-slate-100/80 p-2 dark:bg-slate-800/60"
        >
          <span
            class="pointer-events-none absolute left-0 top-0 rounded-xl bg-white shadow-sm ring-1 ring-slate-200/70 transition-all duration-300 ease-out dark:bg-slate-700/80 dark:ring-slate-600/70"
            :style="tagIndicatorStyle"
          />
          <button
            v-for="(tag, index) in allTags"
            :key="tag"
            :ref="(el) => setTagRef(el, index)"
            type="button"
            class="relative z-10 inline-flex items-center rounded-xl px-3 py-2 text-base font-medium transition-colors duration-300"
            :class="
              activeTag === tag
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            "
            @click="selectTag(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </header>

      <section v-if="pending" class="space-y-3">
        <div
          v-for="idx in 3"
          :key="idx"
          class="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60"
        />
      </section>

      <TransitionGroup
        v-else-if="filteredPosts.length"
        name="post-list"
        tag="section"
        class="space-y-4"
      >
        <NuxtLink
          v-for="post in filteredPosts"
          :key="post.stem || post.path"
          :to="resolvePostTo(post)"
          class="post-list-item block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:p-5 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-slate-600"
        >
          <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <h2 class="text-xl font-semibold text-slate-900 dark:text-white">{{ post.title }}</h2>
            <span class="shrink-0 text-base text-slate-500 dark:text-slate-400">
              {{ formatDate(post.date) }}
            </span>
          </div>
          <p class="mt-2 text-base text-slate-600 dark:text-slate-300">
            {{ post.description }}
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="tag in post.tags"
              :key="`${post.path}-${tag}`"
              class="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {{ tag }}
            </span>
          </div>
        </NuxtLink>
      </TransitionGroup>

      <section
        v-else
        class="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-10 text-center text-base text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300"
      >
        还没有匹配的文章，试试切换其他标签。
      </section>
    </div>
  </div>
</template>

<style scoped>
.post-list-enter-active,
.post-list-leave-active,
.post-list-move {
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
  filter: blur(4px);
}

.post-list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
