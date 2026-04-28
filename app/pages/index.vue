<script setup lang="ts">
import avatarUrl from "~/assets/image/avatar.png"
</script>

<template>
  <AuroraBackground>
    <section
      class="hero-card relative flex w-full max-w-4xl flex-col items-center justify-center gap-4 px-4 py-6 text-center sm:py-0"
    >
      <Avatar
        class="h-24 w-24 border-2 border-white/70 shadow-lg sm:h-28 sm:w-28 dark:border-slate-700"
      >
        <AvatarImage
          :src="avatarUrl"
          alt="Noland Cheng"
          loading="eager"
          decoding="async"
          class="object-cover object-top"
        />
        <AvatarFallback>NC</AvatarFallback>
      </Avatar>

      <h1 class="text-2xl font-bold sm:text-3xl md:text-6xl dark:text-white">Noland Cheng</h1>

      <div class="max-w-3xl py-2 md:text-3xl dark:text-neutral-200">
        <p class="text-base font-normal md:text-2xl">涓流虽寡，浸成江河；爝火虽微，卒能燎野。</p>
        <p class="text-sm font-light md:text-xl">
          Tiny streams converge to form vast rivers, and a little spark can light the field.
        </p>
      </div>
    </section>
  </AuroraBackground>
</template>
