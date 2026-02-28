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

export default defineContentConfig({
  collections: {
    blog,
  },
})
