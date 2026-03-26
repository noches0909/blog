<script setup lang="ts"></script>

<template>
  <div class="min-h-[100dvh]">
    <!-- 左上角首页 Logo -->
    <div class="fixed left-3 top-3 z-50 sm:left-4 sm:top-4">
      <LogoHome />
    </div>
    <!-- 右上角：GitHub + Theme Toggle -->
    <div class="fixed right-3 top-3 z-50 sm:right-4 sm:top-4">
      <div class="flex items-center gap-2">
        <Button as-child variant="outline" size="icon" class="active:scale-95">
          <a
            href="https://github.com/noches0909"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="访问我的 GitHub"
          >
            <Icon name="lucide:github" class="h-4 w-4" />
          </a>
        </Button>
        <ThemeToggle />
      </div>
    </div>

    <!-- 页面内容 -->
    <main class="min-h-0">
      <slot />
    </main>

    <!-- 底部导航 -->
    <Navigation />
  </div>
</template>
