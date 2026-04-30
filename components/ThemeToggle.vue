<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === "dark")
const label = computed(() => (isDark.value ? "切换到浅色模式" : "切换到深色模式"))

function toggleTheme() {
  colorMode.preference = isDark.value ? "light" : "dark"
}
</script>

<template>
  <Button
    variant="outline"
    size="icon"
    class="rounded-xl bg-white/80 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-primary/60 hover:bg-white/90 hover:text-primary dark:bg-slate-900/70 dark:hover:bg-slate-900/86"
    :aria-label="label"
    @click="toggleTheme"
  >
    <AppIcon :name="isDark ? 'sun' : 'moon'" class="h-4 w-4" />
  </Button>
</template>
