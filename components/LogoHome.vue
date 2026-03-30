<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const iconSrc = computed(() => `${runtimeConfig.app.baseURL}favicon.ico`)
</script>

<template>
  <NuxtLink to="/" aria-label="返回首页" class="group inline-flex items-center">
    <img
      :src="iconSrc"
      alt="Home"
      width="32"
      height="32"
      loading="eager"
      decoding="async"
      class="h-8 w-8 rounded shadow-sm transition-transform duration-200 group-hover:scale-110"
    />
  </NuxtLink>
</template>
