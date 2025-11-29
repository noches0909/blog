import { updateDemoItem } from "@@/server/utils/demoStore"

// PUT /api/demo/items/:id - 更新指定记录
export default defineEventHandler(async (event) => {
  const idParam = event.context.params?.id
  const id = Number.parseInt(Array.isArray(idParam) ? idParam[0] : idParam || "", 10)

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "缺少有效的 id" })
  }

  const body = await readBody<{ name?: string; email?: string; role?: string }>(event)
  const updated = updateDemoItem(id, body)

  if (!updated) {
    throw createError({ statusCode: 404, statusMessage: "记录不存在" })
  }

  return { success: true, data: updated }
})
