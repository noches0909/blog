<script setup lang="ts">
useSeoMeta({
  title: "Noland Cheng",
  description: "Noland Cheng 的技术文档、项目实践与生活杂记。",
})
</script>

<template>
  <AuroraBackground>
    <section class="hero-card relative flex w-full max-w-4xl flex-col items-center justify-center gap-4 px-4 py-6 text-center sm:py-0">
      <ThemeAvatar class="h-24 w-24 border-2 sm:h-28 sm:w-28" />

      <h1 class="theme-heading text-2xl font-bold sm:text-3xl md:text-6xl">
        Noland Cheng
      </h1>

      <div class="theme-copy max-w-3xl py-2 md:text-3xl">
        <p class="text-base font-normal md:text-2xl">涓流虽寡，浸成江河；爝火虽微，卒能燎野。</p>
        <p class="theme-muted text-sm font-light md:text-xl">
          Tiny streams converge to form vast rivers, and a little spark can light the field.
        </p>
      </div>
    </section>
  </AuroraBackground>
</template>
