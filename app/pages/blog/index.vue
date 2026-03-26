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

  if (post.path?.startsWith("/blog/")) {
    return post.path
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
  <div class="glass-page px-4 pt-10 pb-28 sm:py-14">
    <div class="glass-backdrop">
      <div class="glass-orb glass-orb-left" />
      <div class="glass-orb glass-orb-right" />
      <div class="glass-grid" />
    </div>

    <div class="relative z-10 mx-auto w-full max-w-4xl">
      <header class="glass-shell mb-6 p-5 sm:mb-8 sm:p-6">
        <p class="text-base uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Blog</p>
        <h1 class="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl dark:text-white">文章列表</h1>
        <p class="mt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          当前提供最小可用的博客功能：文章列表、标签筛选和 Markdown 详情页渲染。
        </p>

        <div ref="tagRailRef" class="glass-rail">
          <span class="glass-indicator" :style="tagIndicatorStyle" />
          <button
            v-for="(tag, index) in allTags"
            :key="tag"
            :ref="(el) => setTagRef(el, index)"
            type="button"
            class="glass-tab"
            :class="activeTag === tag ? 'glass-tab-active' : 'glass-tab-idle'"
            @click="selectTag(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </header>

      <section v-if="pending" class="glass-shell glass-stack">
        <div v-for="idx in 3" :key="idx" class="space-y-3 px-4 py-5 sm:px-5">
          <div class="h-6 w-2/5 animate-pulse rounded-full bg-white/75 dark:bg-slate-700/65" />
          <div class="h-4 w-full animate-pulse rounded-full bg-white/65 dark:bg-slate-700/50" />
          <div class="h-4 w-3/4 animate-pulse rounded-full bg-white/60 dark:bg-slate-700/45" />
        </div>
      </section>

      <TransitionGroup
        v-else-if="filteredPosts.length"
        name="post-list"
        tag="section"
        class="glass-shell glass-stack"
      >
        <NuxtLink
          v-for="post in filteredPosts"
          :key="post.stem || post.path"
          :to="resolvePostTo(post)"
          class="glass-row"
        >
          <div class="flex items-start justify-between gap-3">
            <h2 class="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl dark:text-white">
              {{ post.title }}
            </h2>
            <Icon name="lucide:arrow-up-right" class="glass-row-arrow mt-1 h-4 w-4 shrink-0" />
          </div>
          <p class="mt-2 text-sm text-slate-500 sm:text-base dark:text-slate-300">
            {{ post.description }}
          </p>
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <span class="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {{ formatDate(post.date) }}
            </span>
            <span
              v-for="tag in post.tags"
              :key="`${post.path}-${tag}`"
              class="glass-chip"
            >
              {{ tag }}
            </span>
          </div>
        </NuxtLink>
      </TransitionGroup>

      <section
        v-else
        class="glass-shell glass-empty p-10 text-center text-base text-slate-600 dark:text-slate-300"
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
