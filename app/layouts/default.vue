<template>
  <div class="min-h-[100dvh]">
    <div class="fixed left-3 top-3 z-50 sm:left-4 sm:top-4">
      <LogoHome />
    </div>

    <div class="fixed right-3 top-3 z-50 sm:right-4 sm:top-4">
      <div class="flex items-center gap-2">
        <a
          href="https://github.com/noches0909"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="访问我的 GitHub"
          class="icon-button active:scale-95"
        >
          <AppIcon name="github" class="h-4 w-4" />
        </a>
        <ThemeToggle />
      </div>
    </div>

    <main class="min-h-0">
      <slot />
    </main>

    <Navigation />
  </div>
</template>
