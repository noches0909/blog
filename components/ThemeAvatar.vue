<script setup lang="ts">
import avatarDarkUrl from "~/assets/image/avatar-dark.png"
import avatarLightUrl from "~/assets/image/avatar-light.png"

const props = withDefaults(
  defineProps<{
    class?: string
  }>(),
  {
    class: "",
  },
)

const colorMode = useColorMode()
const isPreviewOpen = ref(false)

const currentAvatar = computed(() => {
  return colorMode.value === "dark" ? avatarDarkUrl : avatarLightUrl
})

const currentAlt = computed(() => {
  return colorMode.value === "dark" ? "Noland Cheng 暗黑模式头像" : "Noland Cheng 白天模式头像"
})

function openPreview() {
  isPreviewOpen.value = true
}

function closePreview() {
  isPreviewOpen.value = false
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    closePreview()
  }
}

watch(isPreviewOpen, (isOpen) => {
  if (import.meta.server) {
    return
  }

  document.body.style.overflow = isOpen ? "hidden" : ""
})

onMounted(() => {
  window.addEventListener("keydown", handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown)

  if (import.meta.client) {
    document.body.style.overflow = ""
  }
})
</script>

<template>
  <button
    type="button"
    class="theme-avatar-trigger group"
    aria-label="放大头像"
    @click="openPreview"
  >
    <Avatar :class="['theme-avatar border', props.class]">
      <AvatarImage
        :src="currentAvatar"
        :alt="currentAlt"
        loading="eager"
        decoding="async"
        class="object-cover object-center transition duration-300 group-hover:scale-105"
      />
      <AvatarFallback>NC</AvatarFallback>
    </Avatar>
  </button>

  <Teleport to="body">
    <Transition name="avatar-preview">
      <div
        v-if="isPreviewOpen"
        class="avatar-preview"
        role="dialog"
        aria-modal="true"
        aria-label="头像预览"
        @click.self="closePreview"
      >
        <button
          type="button"
          class="avatar-preview__close"
          aria-label="关闭头像预览"
          @click="closePreview"
        >
          <AppIcon name="x" class="h-5 w-5" />
        </button>

        <img
          :src="currentAvatar"
          :alt="currentAlt"
          class="avatar-preview__image"
          loading="eager"
          decoding="async"
        />
      </div>
    </Transition>
  </Teleport>
</template>
