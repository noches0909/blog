<script setup lang="ts">
const pageReady = ref(!import.meta.dev)

if (import.meta.dev && import.meta.client) {
  let checks = 0
  const maxChecks = 120

  const waitForStyles = () => {
    const hasStyles =
      document.querySelector('style[data-vite-dev-id], style[data-vite-ref], link[rel="stylesheet"]') !== null

    if (hasStyles || checks >= maxChecks) {
      pageReady.value = true
      return
    }

    checks += 1
    requestAnimationFrame(waitForStyles)
  }

  onMounted(waitForStyles)
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage v-if="pageReady" />
  </NuxtLayout>
</template>
