import { createDemoItem } from "@@/server/utils/demoStore"

// POST /api/demo/items - 新增一条记录
export default defineEventHandler(async (event) => {
  const body = await readBody<{ name?: string; email?: string; role?: string }>(event)

  if (!body?.name || !body?.email || !body?.role) {
    throw createError({
      statusCode: 400,
      statusMessage: "name、email、role 为必填字段",
    })
  }

  const item = createDemoItem({
    name: body.name,
    email: body.email,
    role: body.role,
  })

  setResponseStatus(event, 201)
  return { success: true, data: item }
})
