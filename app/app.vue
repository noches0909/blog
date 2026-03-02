<script setup lang="ts">
const pageReady = ref(!import.meta.dev)

if (import.meta.dev && import.meta.client) {
  const revealWhenLoaded = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        pageReady.value = true
      })
    })
  }

  onMounted(() => {
    if (document.readyState === "complete") {
      revealWhenLoaded()
      return
    }

    window.addEventListener("load", revealWhenLoaded, { once: true })
    setTimeout(() => {
      pageReady.value = true
    }, 2500)
  })
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage v-if="pageReady" />
  </NuxtLayout>
</template>
