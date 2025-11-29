// Lightweight内存存储，用于 demo 表格的假数据
export type DemoItem = {
  id: number
  name: string
  email: string
  role: string
  createdAt: string
}

type CreateDemoItem = Pick<DemoItem, "name" | "email" | "role">
type UpdateDemoItem = Partial<CreateDemoItem>

// 预置几条数据，方便直接展示
const seedItems: DemoItem[] = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    role: "前端工程师",
    createdAt: new Date("2024-01-15T08:00:00Z").toISOString(),
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    role: "后端工程师",
    createdAt: new Date("2024-02-20T10:30:00Z").toISOString(),
  },
  {
    id: 3,
    name: "Carol",
    email: "carol@example.com",
    role: "产品经理",
    createdAt: new Date("2024-03-12T15:45:00Z").toISOString(),
  },
]

const items: DemoItem[] = [...seedItems]
let nextId = items.length + 1

// 读取列表时返回副本，避免外部修改内部状态
export function listDemoItems() {
  return items.map((item) => ({ ...item }))
}

// 创建并存入一条记录
export function createDemoItem(payload: CreateDemoItem) {
  const newItem: DemoItem = {
    id: nextId++,
    createdAt: new Date().toISOString(),
    ...payload,
  }
  items.push(newItem)
  return { ...newItem }
}

// 更新指定 id 的记录
export function updateDemoItem(id: number, payload: UpdateDemoItem) {
  const index = items.findIndex((item) => item.id === id)
  if (index === -1) {
    return null
  }

  items[index] = { ...items[index], ...payload }
  return { ...items[index] }
}

// 删除一条记录，返回是否成功
export function deleteDemoItem(id: number) {
  const index = items.findIndex((item) => item.id === id)
  if (index === -1) {
    return false
  }

  items.splice(index, 1)
  return true
}
