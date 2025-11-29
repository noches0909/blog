import { listDemoItems } from "@@/server/utils/demoStore"

// GET /api/demo/items - 获取所有假数据
export default defineEventHandler(() => {
  return listDemoItems()
})
