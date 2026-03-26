<script setup lang="ts">
import { Motion } from "motion-v"
import avatarUrl from "~/assets/image/avatar.png"
</script>

<template>
  <AuroraBackground>
    <Motion
      as="div"
      :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }"
      :while-in-view="{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }"
      :transition="{
        delay: 0.25,
        duration: 0.75,
        ease: 'easeInOut',
      }"
      class="relative flex w-full max-w-4xl flex-col items-center justify-center gap-4 px-4 py-6 sm:py-0"
    >
      <Avatar
        class="h-24 w-24 border-2 border-white/70 shadow-lg sm:h-28 sm:w-28 dark:border-slate-700"
        style="width: clamp(6rem, 22vw, 7rem); height: clamp(6rem, 22vw, 7rem);"
      >
        <AvatarImage
          :src="avatarUrl"
          alt="Noland Cheng"
          class="object-cover object-top"
          width="112"
          height="112"
          loading="eager"
          decoding="async"
        />
        <AvatarFallback>NC</AvatarFallback>
      </Avatar>

      <div class="text-center text-2xl font-bold sm:text-3xl md:text-6xl dark:text-white">Noland Cheng</div>
      <div class="max-w-3xl py-2 text-center font-extralight md:text-3xl dark:text-neutral-200">
        <p class="text-base md:text-2xl">涓流虽寡，浸成江河；爝火虽微，卒能燎野。</p>
        <p class="text-sm md:text-xl">
          Tiny streams converge to form vast rivers, and a little spark can light the field.
        </p>
      </div>
    </Motion>
  </AuroraBackground>
</template>
