import { defineCollection, defineContentConfig, z } from "@nuxt/content"

const blog = defineCollection({
  type: "page",
  source: "blog/**/*.md",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
})

const notes = defineCollection({
  type: "page",
  source: "notes/**/*.md",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
})

const project = defineCollection({
  type: "page",
  source: "project/**/*.md",
})

export default defineContentConfig({
  collections: {
    blog,
    notes,
    project,
  },
})
