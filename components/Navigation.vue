<script setup lang="ts">
const route = useRoute()

const navigation = [
  { name: "首页", path: "/", icon: "house" },
  { name: "博客", path: "/blog", icon: "notebook-tabs" },
  { name: "杂记", path: "/notes", icon: "coffee" },
  { name: "项目", path: "/project", icon: "folder-git-2" },
  { name: "关于", path: "/about", icon: "user-round" },
] as const

function isActive(path: string) {
  if (path === "/") {
    return route.path === "/"
  }

  return route.path === path || route.path.startsWith(`${path}/`)
}

const activeIndex = computed(() => {
  const index = navigation.findIndex((item) => isActive(item.path))

  return index >= 0 ? index : 0
})

function resolveOrbitSlot(index: number) {
  return index - activeIndex.value
}

function resolveOrbitStyle(index: number) {
  const slot = resolveOrbitSlot(index)
  const distance = Math.abs(slot)
  const x = 2.65 - distance * 0.46
  const opacity = distance === 0 ? 1 : distance === 1 ? 0.66 : 0.36
  const scale = distance === 0 ? 1 : distance === 1 ? 0.94 : 0.86

  return {
    "--orbit-y": `${slot * 3.75}rem`,
    "--orbit-x": `${x}rem`,
    "--orbit-opacity": opacity,
    "--orbit-scale": scale,
    "--orbit-z": navigation.length - distance,
  }
}
</script>

<template>
  <nav class="navigation-orbit" aria-label="主导航">
    <div class="navigation-orbit__arc" aria-hidden="true" />
    <div class="navigation-orbit__items">
      <Button
        v-for="(item, index) in navigation"
        :key="item.path"
        as-child
        size="sm"
        variant="ghost"
        :class="[
          'navigation-orbit__item',
          isActive(item.path) && 'navigation-orbit__item--active',
        ]"
        :style="resolveOrbitStyle(index)"
      >
        <NuxtLink :to="item.path" :aria-current="isActive(item.path) ? 'page' : undefined">
          <AppIcon :name="item.icon" class="h-4 w-4 shrink-0" />
          <span>{{ item.name }}</span>
        </NuxtLink>
      </Button>
    </div>
  </nav>
</template>

<style scoped>
.navigation-orbit {
  position: fixed;
  left: 0;
  top: 50%;
  z-index: 40;
  width: 10.2rem;
  height: 20rem;
  transform: translateY(-50%);
  pointer-events: none;
}

.navigation-orbit__arc {
  position: absolute;
  left: -8.95rem;
  top: 50%;
  width: 17.9rem;
  height: 17.9rem;
  border: 1px solid rgb(100 116 139 / 0.18);
  border-left: 0;
  border-radius: 0 999px 999px 0;
  background:
    radial-gradient(circle at left center, rgb(255 255 255 / 0.26), transparent 62%),
    linear-gradient(90deg, rgb(255 255 255 / 0.42), rgb(255 255 255 / 0.1));
  box-shadow: inset -1px 0 0 rgb(255 255 255 / 0.46);
  transform: translateY(-50%);
  backdrop-filter: blur(14px) saturate(1.04);
}

.navigation-orbit__items {
  position: absolute;
  inset: 0;
  pointer-events: auto;
}

.navigation-orbit__item {
  position: absolute;
  left: 0;
  top: 50%;
  z-index: var(--orbit-z);
  width: 7.45rem;
  min-width: 0;
  height: 2.85rem;
  align-items: center;
  justify-content: flex-start;
  gap: 0.58rem;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  padding-inline: 0.88rem;
  color: rgb(51 65 85 / 0.74);
  font-size: 1.05rem;
  font-weight: 650;
  opacity: var(--orbit-opacity);
  box-shadow: none;
  transform: translate(var(--orbit-x), calc(-50% + var(--orbit-y))) scale(var(--orbit-scale));
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    left 0.42s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.32s ease,
    top 0.42s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.42s cubic-bezier(0.22, 1, 0.36, 1);
}

.navigation-orbit__item::before {
  content: "";
  position: absolute;
  inset: 0.22rem 0.64rem 0.22rem -2.85rem;
  z-index: -1;
  border-radius: 0 999px 999px 0;
  background: var(--primary);
  opacity: 0;
  transform: scaleX(0);
  transform-origin: left center;
  transition:
    opacity 0.24s ease,
    transform 0.42s cubic-bezier(0.22, 1, 0.36, 1);
}

.navigation-orbit__item:not(.navigation-orbit__item--active):hover {
  background: transparent;
  color: rgb(15 23 42);
  opacity: 1;
  transform: translate(calc(var(--orbit-x) + 0.18rem), calc(-50% + var(--orbit-y))) scale(var(--orbit-scale));
}

.navigation-orbit__item--active {
  border-color: transparent;
  background: transparent;
  color: white;
}

.navigation-orbit__item--active::before {
  opacity: 1;
  transform: scaleX(1);
}

.dark .navigation-orbit__arc {
  border-color: rgb(148 163 184 / 0.14);
  background:
    radial-gradient(circle at left center, rgb(15 23 42 / 0.3), transparent 62%),
    linear-gradient(90deg, rgb(15 23 42 / 0.42), rgb(15 23 42 / 0.08));
  box-shadow: inset -1px 0 0 rgb(148 163 184 / 0.12);
}

.dark .navigation-orbit__item {
  color: rgb(203 213 225 / 0.7);
}

.dark .navigation-orbit__item:not(.navigation-orbit__item--active):hover {
  background: transparent;
  color: white;
}

.dark .navigation-orbit__item--active {
  border-color: transparent;
  background: transparent;
  color: white;
}

.dark .navigation-orbit__item::before {
  background: var(--primary);
}

@media (max-width: 1199px) {
  .navigation-orbit {
    top: auto;
    bottom: 0.75rem;
    left: 50%;
    width: min(24rem, calc(100% - 1rem));
    height: 4.2rem;
    transform: translateX(-50%);
  }

  .navigation-orbit__arc {
    inset: auto 0 0;
    width: 100%;
    height: 4.2rem;
    border: 1px solid rgb(100 116 139 / 0.14);
    border-bottom: 0;
    border-radius: 2.2rem 2.2rem 0 0;
    background:
      radial-gradient(ellipse at center bottom, rgb(255 255 255 / 0.46), transparent 70%),
      linear-gradient(180deg, rgb(255 255 255 / 0.34), rgb(255 255 255 / 0.1));
    transform: none;
  }

  .dark .navigation-orbit__arc {
    border-color: rgb(148 163 184 / 0.16);
    background:
      radial-gradient(ellipse at center bottom, rgb(15 23 42 / 0.56), transparent 70%),
      linear-gradient(180deg, rgb(15 23 42 / 0.46), rgb(15 23 42 / 0.16));
  }

  .navigation-orbit__items {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    align-items: end;
    gap: 0.1rem;
    padding: 0.58rem 0.5rem 0.42rem;
  }

  .navigation-orbit__item,
  .navigation-orbit__item:nth-child(n) {
    position: static;
    z-index: auto;
    width: 100%;
    height: 3.1rem;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 0.18rem;
    padding-inline: 0.25rem;
    font-size: 0.78rem;
    opacity: 1;
    transform: none;
  }

  .navigation-orbit__item::before {
    content: none;
  }

  .navigation-orbit__item--active {
    background: var(--primary);
    color: white;
  }

  .navigation-orbit__item:not(.navigation-orbit__item--active):hover {
    transform: translateY(-0.08rem);
  }
}
</style>
