<script setup lang="ts">
const WIDTH_CLASS = {
  md: "max-w-3xl",
  lg: "max-w-4xl",
  xl: "max-w-5xl",
} as const

const props = withDefaults(
  defineProps<{
    width?: keyof typeof WIDTH_CLASS
  }>(),
  {
    width: "lg",
  },
)

const containerClass = computed(() => WIDTH_CLASS[props.width])
</script>

<template>
  <div class="glass-page px-4 pt-10 pb-28 sm:py-14">
    <div class="glass-backdrop">
      <div class="glass-orb glass-orb-left" />
      <div class="glass-orb glass-orb-right" />
      <div class="glass-grid" />
    </div>

    <div :class="['relative z-10 mx-auto w-full', containerClass]">
      <slot />
    </div>
  </div>
</template>
