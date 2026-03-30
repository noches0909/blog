<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    radialGradient?: boolean
    class?: string
  }>(),
  {
    radialGradient: true,
    class: "",
  },
)

const layerClass = computed(() => [
  "aurora-layer",
  props.radialGradient ? "aurora-mask" : "",
])
</script>

<template>
  <section
    :class="[
      'relative flex min-h-[100dvh] flex-col items-center justify-start overflow-hidden bg-zinc-50 pt-6 text-slate-950 sm:justify-center sm:pt-0 dark:bg-zinc-900',
      props.class,
    ]"
  >
    <div class="aurora-backdrop" aria-hidden="true">
      <div :class="layerClass" />
    </div>

    <slot />
  </section>
</template>

<style scoped>
.aurora-backdrop {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.aurora-layer {
  position: absolute;
  inset: -14%;
  opacity: 0.72;
  filter: blur(18px) saturate(1.18);
  background-image:
    repeating-linear-gradient(
      115deg,
      rgb(56 189 248 / 0.88) 10%,
      rgb(129 140 248 / 0.78) 18%,
      rgb(96 165 250 / 0.8) 26%,
      rgb(196 181 253 / 0.7) 34%,
      rgb(125 211 252 / 0.78) 42%,
      rgb(59 130 246 / 0.86) 50%
    ),
    linear-gradient(180deg, rgb(255 255 255 / 0.95), rgb(255 255 255 / 0.18) 34%, rgb(255 255 255 / 0.88) 100%);
  background-position:
    0% 50%,
    50% 50%;
  background-size:
    240% 240%,
    160% 160%;
  transform: translate3d(0, 0, 0) scale(1.08);
  will-change:
    background-position,
    transform,
    opacity;
  animation: aurora-drift 22s linear infinite;
}

.aurora-layer::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.82;
  background-image:
    repeating-linear-gradient(
      115deg,
      transparent 0%,
      transparent 9%,
      rgb(255 255 255 / 0.58) 13%,
      transparent 18%,
      transparent 29%,
      rgb(255 255 255 / 0.28) 34%,
      transparent 42%
    ),
    linear-gradient(90deg, rgb(255 255 255 / 0.22), transparent 55%);
  background-position:
    100% 50%,
    50% 50%;
  background-size:
    180% 180%,
    100% 100%;
  mix-blend-mode: screen;
  animation: aurora-drift-reverse 28s linear infinite;
}

.dark .aurora-layer {
  opacity: 0.58;
  filter: blur(24px) saturate(1.24);
  background-image:
    repeating-linear-gradient(
      115deg,
      rgb(30 64 175 / 0.9) 8%,
      rgb(14 116 144 / 0.84) 17%,
      rgb(99 102 241 / 0.82) 26%,
      rgb(168 85 247 / 0.7) 35%,
      rgb(37 99 235 / 0.82) 44%,
      rgb(8 145 178 / 0.8) 53%
    ),
    linear-gradient(180deg, rgb(2 6 23 / 0.96), rgb(2 6 23 / 0.24) 34%, rgb(2 6 23 / 0.9) 100%);
}

.dark .aurora-layer::after {
  opacity: 0.9;
  background-image:
    repeating-linear-gradient(
      115deg,
      transparent 0%,
      transparent 10%,
      rgb(125 211 252 / 0.12) 14%,
      transparent 20%,
      transparent 30%,
      rgb(255 255 255 / 0.08) 35%,
      transparent 44%
    ),
    linear-gradient(90deg, rgb(2 6 23 / 0.2), transparent 58%);
}

.aurora-mask {
  mask-image: radial-gradient(ellipse at 100% 0%, black 12%, transparent 72%);
}

@keyframes aurora-drift {
  0% {
    background-position:
      0% 50%,
      50% 50%;
    transform: translate3d(-2%, 0%, 0) scale(1.08);
  }

  50% {
    background-position:
      100% 50%,
      55% 46%;
    transform: translate3d(2%, 1%, 0) scale(1.16);
  }

  100% {
    background-position:
      200% 50%,
      50% 50%;
    transform: translate3d(-2%, 0%, 0) scale(1.08);
  }
}

@keyframes aurora-drift-reverse {
  0% {
    background-position:
      100% 50%,
      50% 50%;
    transform: translate3d(2%, 0%, 0) scale(1.04);
  }

  50% {
    background-position:
      0% 50%,
      46% 54%;
    transform: translate3d(-2%, -1%, 0) scale(1.12);
  }

  100% {
    background-position:
      -100% 50%,
      50% 50%;
    transform: translate3d(2%, 0%, 0) scale(1.04);
  }
}
</style>
