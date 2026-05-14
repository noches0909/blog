<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const colorMode = useColorMode()

const faviconHref = computed(() => {
  const icon = colorMode.value === "dark" ? "favicon-dark.ico" : "favicon-light.ico"

  return `${runtimeConfig.app.baseURL}${icon}`
})

useHead(() => ({
  link: [
    {
      key: "favicon",
      rel: "icon",
      type: "image/x-icon",
      href: faviconHref.value,
    },
  ],
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage :page-key="(route) => route.fullPath" />
  </NuxtLayout>
</template>
