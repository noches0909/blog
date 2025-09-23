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
      isDark ? ' bg-white/5 hover:bg-white/10 text-foreground active:scale-95' : 'active:scale-95'
    "
    @click="toggle"
  >
    <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="h-4 w-4" />
  </Button>
</template>
