<script setup lang="ts">
import { Motion } from "motion-v"
import avatarUrl from "~/assets/image/avatar.png"
</script>

<template>
  <AuroraBackground>
    <div class="fixed right-4 top-4 z-50">
      <ThemeToggle />
    </div>
    <Motion
      as="div"
      :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }"
      :while-in-view="{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }"
      :transition="{
        delay: 0.3,
        duration: 0.8,
        ease: 'easeInOut',
      }"
      class="relative flex flex-col items-center justify-center gap-4 px-4"
    >
      <Avatar class="w-32 h-32">
        <AvatarImage :src="avatarUrl" alt="@unovue" />
        <AvatarFallback>NC</AvatarFallback>
      </Avatar>
      <div class="text-center text-3xl font-bold md:text-7xl dark:text-white">Noland Cheng</div>
      <div class="py-4 text-center font-extralight md:text-4xl dark:text-neutral-200">
        <p class="text-base md:text-3xl">涓流虽寡，浸成江河；爝火虽微，卒能燎野。</p>
        <p class="text-sm md:text-2xl">
          Tiny streams converge, to form rivers vast; a small fire grows, to blaze the prairie wild.
        </p>
      </div>
    </Motion>
  </AuroraBackground>
</template>
