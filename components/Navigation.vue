<script setup lang="ts">
const navigation = [
  { name: "博客", path: "/blog", icon: "📝" },
  { name: "项目", path: "/project", icon: "💻" },
  { name: "demo", path: "/demo", icon: "🧪" },
  { name: "关于", path: "/about", icon: "👨‍💻" },
]
</script>

<template>
  <nav class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
    <div
      class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-slate-200 dark:border-slate-700"
    >
      <div class="flex items-center space-x-1">
        <NuxtLink
          v-for="item in navigation"
          :key="item.path"
          :to="item.path"
          class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <span class="mr-1">{{ item.icon }}</span>
          <span class="hidden sm:inline">{{ item.name }}</span>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
