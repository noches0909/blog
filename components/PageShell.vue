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
  <div class="studio-page px-4 pt-20 pb-28 sm:px-6 sm:pt-24 sm:pb-32">
    <div class="studio-backdrop">
      <div class="studio-aurora" />
      <div class="studio-grid" />
      <div class="studio-noise" />
    </div>

    <div :class="['studio-frame relative z-10 mx-auto w-full', containerClass]">
      <slot />
    </div>
  </div>
</template>
