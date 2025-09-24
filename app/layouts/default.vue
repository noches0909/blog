<script setup lang="ts"></script>

<template>
  <div class="min-h-screen">
    <!-- Theme Toggle 固定在右上角 -->
    <div class="fixed right-4 top-4 z-50">
      <ThemeToggle />
    </div>

    <!-- 页面内容 -->
    <main>
      <slot />
    </main>

    <!-- 底部导航 -->
    <Navigation />
  </div>
</template>
