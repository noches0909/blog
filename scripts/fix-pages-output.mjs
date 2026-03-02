import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs"
import { resolve } from "node:path"

const outputRoot = resolve(".output/public")
const blogRoot = resolve(outputRoot, "blog")
const nestedBlogRoot = resolve(blogRoot, "blog")

if (!existsSync(blogRoot)) {
  process.exit(0)
}

mkdirSync(nestedBlogRoot, { recursive: true })

// Duplicate the /blog landing page to /blog/blog for hard-refresh compatibility.
const sourceBlogIndex = resolve(blogRoot, "index.html")
if (existsSync(sourceBlogIndex)) {
  cpSync(sourceBlogIndex, resolve(nestedBlogRoot, "index.html"))
}
if (existsSync(`${sourceBlogIndex}.br`)) {
  cpSync(`${sourceBlogIndex}.br`, resolve(nestedBlogRoot, "index.html.br"))
}
if (existsSync(`${sourceBlogIndex}.gz`)) {
  cpSync(`${sourceBlogIndex}.gz`, resolve(nestedBlogRoot, "index.html.gz"))
}

const reservedDirNames = new Set(["blog", "_nuxt", "__nuxt_content"])
const blogEntries = readdirSync(blogRoot)

// Duplicate article folders: /blog/<slug> -> /blog/blog/<slug>
for (const entry of blogEntries) {
  if (reservedDirNames.has(entry)) {
    continue
  }

  const sourceDir = resolve(blogRoot, entry)
  if (!statSync(sourceDir).isDirectory()) {
    continue
  }

  if (!existsSync(resolve(sourceDir, "index.html"))) {
    continue
  }

  cpSync(sourceDir, resolve(nestedBlogRoot, entry), {
    recursive: true,
    force: true,
  })
}
