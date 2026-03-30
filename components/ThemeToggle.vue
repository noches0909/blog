<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === "dark")
const label = computed(() => (isDark.value ? "切换到浅色模式" : "切换到深色模式"))

function toggleTheme() {
  colorMode.preference = isDark.value ? "light" : "dark"
}
</script>

<template>
  <button
    type="button"
    class="icon-button"
    :class="isDark && 'icon-button-active'"
    :aria-label="label"
    @click="toggleTheme"
  >
    <AppIcon :name="isDark ? 'sun' : 'moon'" class="h-4 w-4" />
  </button>
</template>
