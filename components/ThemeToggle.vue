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
  <Button
    :variant="isDark ? 'ghost' : 'outline'"
    size="icon"
    :class="
      isDark
        ? 'bg-primary/18 text-primary ring-1 ring-primary/25 hover:bg-primary/24 active:scale-95'
        : 'hover:border-primary/35 hover:bg-primary/10 hover:text-primary active:scale-95'
    "
    @click="toggle"
  >
    <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="h-4 w-4" />
  </Button>
</template>
