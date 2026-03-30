<script setup lang="ts">
const route = useRoute()

const navigation = [
  { name: "首页", path: "/", icon: "house" },
  { name: "博客", path: "/blog", icon: "notebook-tabs" },
  { name: "项目", path: "/project", icon: "folder-git-2" },
  { name: "关于", path: "/about", icon: "user-round" },
] as const

function isActive(path: string) {
  if (path === "/") {
    return route.path === "/"
  }

  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <nav class="fixed bottom-4 left-1/2 z-40 w-[calc(100%-1rem)] max-w-md -translate-x-1/2 sm:bottom-6 sm:w-auto sm:max-w-none">
    <div
      class="rounded-2xl border border-slate-200 bg-white/88 px-1.5 py-1.5 shadow-lg backdrop-blur-md dark:border-slate-700 dark:bg-slate-800/88 sm:rounded-full sm:px-2 sm:py-2"
    >
      <div class="grid grid-cols-4 items-stretch gap-1 sm:flex sm:items-center">
        <NuxtLink
          v-for="item in navigation"
          :key="item.path"
          :to="item.path"
          :class="[
            'inline-flex min-w-0 items-center justify-center gap-1 rounded-xl px-2 py-2 text-sm transition-all duration-300 sm:rounded-full sm:px-3',
            isActive(item.path)
              ? 'scale-[1.01] bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/30'
              : 'text-slate-600 hover:bg-primary/10 hover:text-primary dark:text-slate-400 dark:hover:bg-primary/20 dark:hover:text-primary',
          ]"
        >
          <AppIcon :name="item.icon" class="h-4 w-4 shrink-0" />
          <span class="truncate text-sm">{{ item.name }}</span>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
