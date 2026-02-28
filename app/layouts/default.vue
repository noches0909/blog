<script setup lang="ts"></script>

<template>
  <div class="min-h-screen">
    <!-- 左上角首页 Logo -->
    <div class="fixed left-3 top-3 z-50 sm:left-4 sm:top-4">
      <LogoHome />
    </div>
    <!-- Theme Toggle 固定在右上角 -->
    <div class="fixed right-3 top-3 z-50 sm:right-4 sm:top-4">
      <ThemeToggle />
    </div>

    <!-- 页面内容 -->
    <main class="pb-24 pt-14 sm:pt-0">
      <slot />
    </main>

    <!-- 底部导航 -->
    <Navigation />
  </div>
</template>
