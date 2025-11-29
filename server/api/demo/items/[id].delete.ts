import { deleteDemoItem } from "@@/server/utils/demoStore"

// DELETE /api/demo/items/:id - 删除指定记录
export default defineEventHandler((event) => {
  const idParam = event.context.params?.id
  const id = Number.parseInt(Array.isArray(idParam) ? idParam[0] : idParam || "", 10)

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "缺少有效的 id" })
  }

  const success = deleteDemoItem(id)

  if (!success) {
    throw createError({ statusCode: 404, statusMessage: "记录不存在" })
  }

  return { success: true }
})
