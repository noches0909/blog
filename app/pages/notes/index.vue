<script setup lang="ts">
useSeoMeta({
  title: "杂记",
  description: "生活里的片段、观察与随手记录。",
})

const { data: notes, pending } = await useAsyncData("notes-posts", () =>
  queryCollection("notes").where("draft", "=", false).order("date", "DESC").all(),
)

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  dateStyle: "long",
})

function formatDate(value?: string) {
  return value ? dateFormatter.format(new Date(value)) : "-"
}
</script>

<template>
  <PageShell width="lg">
    <header class="studio-header">
      <p class="studio-kicker">Notes</p>
      <div class="grid gap-5 md:grid-cols-[1fr_18rem] md:items-end">
        <h1 class="studio-title">杂记</h1>
        <p class="studio-copy md:pb-2">
          生活里的片段、观察与随手记录。有些东西不急着成为结论，先放在这里慢慢长出来。
        </p>
      </div>
    </header>

    <section v-if="pending" class="studio-list mt-8">
      <div v-for="idx in 3" :key="idx" class="studio-panel h-32 animate-pulse" />
    </section>

    <section v-else-if="notes?.length" class="studio-list mt-8">
      <article v-for="(note, index) in notes" :key="note.stem || note.path" class="studio-item">
        <div class="grid gap-4 sm:grid-cols-[4.5rem_1fr] sm:items-start">
          <div class="studio-item-index text-sm font-semibold">
            {{ String(index + 1).padStart(2, "0") }}
          </div>

          <div>
            <h2 class="text-xl font-semibold leading-tight text-slate-950 sm:text-2xl dark:text-white">
              {{ note.title }}
            </h2>
            <p class="mt-3 text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
              {{ note.description }}
            </p>
          </div>
        </div>

        <div class="mt-5 flex flex-wrap items-center gap-2 sm:pl-[5.5rem]">
          <span class="mr-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            {{ formatDate(note.date) }}
          </span>
          <span v-for="tag in note.tags" :key="`${note.path}-${tag}`" class="studio-chip">
            {{ tag }}
          </span>
        </div>
      </article>
    </section>

    <section class="studio-panel mt-8 p-10 text-center text-base text-slate-600 dark:text-slate-300" v-else>
      这里先空着。之后把杂记文章放进 <code>content/notes</code> 就会显示在这里。
    </section>
  </PageShell>
</template>
