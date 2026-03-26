import { copyFile, lstat, readlink, rm, symlink } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const scriptDir = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(scriptDir, "..")
const readmePath = resolve(rootDir, "README.md")
const projectDocPath = resolve(rootDir, "content/project/nuxt-blog.md")
const relativeReadmePath = "../../README.md"

async function hasExpectedSymlink() {
  try {
    const stat = await lstat(projectDocPath)

    if (!stat.isSymbolicLink()) {
      return false
    }

    const currentTarget = await readlink(projectDocPath)
    return resolve(dirname(projectDocPath), currentTarget) === readmePath
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return false
    }

    throw error
  }
}

async function ensureProjectDoc() {
  if (await hasExpectedSymlink()) {
    return
  }

  await rm(projectDocPath, { force: true })

  try {
    await symlink(relativeReadmePath, projectDocPath)
  } catch (error) {
    if (
      error
      && typeof error === "object"
      && "code" in error
      && ["EPERM", "EACCES", "ENOSYS", "UNKNOWN"].includes(String(error.code))
    ) {
      await copyFile(readmePath, projectDocPath)
      return
    }

    throw error
  }
}

await ensureProjectDoc()
