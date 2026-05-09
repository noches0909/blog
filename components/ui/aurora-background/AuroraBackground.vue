<script setup lang="ts">
import { cn } from "@@/lib/utils"
import { computed } from "vue";

interface AuroraBackgroundProps {
  radialGradient?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<AuroraBackgroundProps>(), {
  radialGradient: true,
});

const styles = computed(() => {
  return {
    "--aurora":
      "repeating-linear-gradient(100deg,var(--hero-band-a)_10%,var(--hero-band-b)_15%,var(--hero-band-c)_20%,var(--hero-band-d)_25%,var(--hero-band-a)_30%)",
    "--dark-gradient":
      "repeating-linear-gradient(100deg,var(--hero-shadow)_0%,var(--hero-shadow)_7%,transparent_10%,transparent_12%,var(--hero-shadow)_16%)",
    "--white-gradient":
      "repeating-linear-gradient(100deg,var(--hero-light)_0%,var(--hero-light)_7%,transparent_10%,transparent_12%,var(--hero-light)_16%)",

    "--hero-band-a": "rgb(0 87 216 / 0.44)",
    "--hero-band-b": "rgb(35 169 242 / 0.34)",
    "--hero-band-c": "rgb(6 31 120 / 0.24)",
    "--hero-band-d": "rgb(0 87 216 / 0.3)",
    "--hero-shadow": "color-mix(in oklab, var(--background) 82%, black 18%)",
    "--hero-light": "color-mix(in oklab, var(--card) 86%, transparent)",
    "--transparent": "transparent",
    "--animate-aurora": "aurora 60s linear infinite",
  };
});
</script>

<template>
  <main>
    <div
      v-bind="props"
      :class="
        cn(
          `transition-bg relative flex h-screen flex-col items-center justify-center overflow-hidden bg-background text-foreground`,
          props.class,
        )
      "
    >
      <div
        :style="styles"
        class="absolute inset-0 overflow-hidden"
      >
        <div
          :class="
            cn(
              `after:animate-aurora pointer-events-none absolute -inset-2.5 [background-image:var(--white-gradient),var(--aurora)] bg-size-[300%,200%] bg-position-[50%_50%,50%_50%] opacity-60 blur-[10px] filter will-change-transform after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:bg-size-[200%,100%] after:bg-fixed after:mix-blend-soft-light after:content-[''] dark:opacity-48 dark:[background-image:var(--dark-gradient),var(--aurora)] after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
              props.radialGradient &&
                `mask-[linear-gradient(180deg,black_8%,var(--transparent)_86%)]`,
            )
          "
        />
      </div>
      <slot />
    </div>
  </main>
</template>
