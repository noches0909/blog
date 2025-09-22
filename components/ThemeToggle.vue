<script setup lang="ts">
import { computed } from "vue"
const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === "dark",
  set: (val: boolean) => {
    colorMode.preference = val ? "dark" : "light"
  },
})

function toggle() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark"
}
</script>

<template>
  <button
    aria-label="Toggle theme"
    class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:bg-neutral-50 active:scale-95 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
    @click="toggle"
  >
    <Icon name="lucide:sun" v-if="isDark" class="h-4 w-4" />
    <Icon name="lucide:moon" v-else class="h-4 w-4" />
  </button>
</template>
