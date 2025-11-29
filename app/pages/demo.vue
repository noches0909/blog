<script setup lang="ts">
import { computed, reactive, ref } from "vue"

type DemoItem = {
  id: number
  name: string
  email: string
  role: string
  createdAt: string
}

type Banner = { type: "success" | "error"; text: string }

const banner = ref<Banner | null>(null)
const creating = ref(false)
const savingId = ref<number | null>(null)
const deletingId = ref<number | null>(null)
const editId = ref<number | null>(null)

const form = reactive({
  name: "",
  email: "",
  role: "",
})

const editForm = reactive({
  name: "",
  email: "",
  role: "",
})

const { data: items, pending, error, refresh } = useAsyncData<DemoItem[]>(
  "demo-items",
  () => $fetch("/api/demo/items"),
  { default: () => [] },
)

const sortedItems = computed(() => [...(items.value || [])].sort((a, b) => b.id - a.id))
const totalCount = computed(() => sortedItems.value.length)
const lastCreated = computed(() => sortedItems.value[0]?.createdAt)

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  dateStyle: "medium",
  timeStyle: "short",
})

function formatDate(value?: string) {
  if (!value) return "-"
  return dateFormatter.format(new Date(value))
}

function resetForm() {
  form.name = ""
  form.email = ""
  form.role = ""
}

function setBanner(next: Banner | null) {
  banner.value = next
}

function errorMessage(err: unknown) {
  if (err && typeof err === "object") {
    const maybe = err as { data?: { statusMessage?: string; message?: string }; message?: string }
    return maybe.data?.statusMessage || maybe.data?.message || maybe.message || "操作失败"
  }
  return "操作失败"
}

async function handleCreate() {
  setBanner(null)
  creating.value = true

  try {
    await $fetch("/api/demo/items", {
      method: "POST",
      body: { ...form },
    })
    resetForm()
    setBanner({ type: "success", text: "新增成功，数据已写入假接口" })
    await refresh()
  } catch (err) {
    setBanner({ type: "error", text: errorMessage(err) })
  } finally {
    creating.value = false
  }
}

function startEdit(item: DemoItem) {
  editId.value = item.id
  editForm.name = item.name
  editForm.email = item.email
  editForm.role = item.role
}

function cancelEdit() {
  editId.value = null
  editForm.name = ""
  editForm.email = ""
  editForm.role = ""
}

async function saveEdit() {
  if (!editId.value) return

  setBanner(null)
  savingId.value = editId.value

  try {
    await $fetch(`/api/demo/items/${editId.value}`, {
      method: "PUT",
      body: { ...editForm },
    })
    setBanner({ type: "success", text: "修改成功" })
    cancelEdit()
    await refresh()
  } catch (err) {
    setBanner({ type: "error", text: errorMessage(err) })
  } finally {
    savingId.value = null
  }
}

async function removeItem(id: number) {
  const confirmed = window.confirm("确认删除这条记录吗？")
  if (!confirmed) return

  setBanner(null)
  deletingId.value = id

  try {
    await $fetch(`/api/demo/items/${id}`, { method: "DELETE" })
    setBanner({ type: "success", text: "已删除" })
    await refresh()
  } catch (err) {
    setBanner({ type: "error", text: errorMessage(err) })
  } finally {
    deletingId.value = null
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
  >
    <div class="container mx-auto px-4 py-16">
      <div
        class="mb-8 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70"
      >
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div class="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-3 py-1 text-xs">
              <span class="size-2 rounded-full bg-emerald-400" />
              Demo 沙盒
            </div>
            <h1 class="mt-4 text-3xl font-bold text-slate-900 dark:text-white">Demo 表格 CRUD</h1>
            <p class="mt-2 text-slate-600 dark:text-slate-400">
              使用 Nuxt 服务器端（Node）假接口，完成一个简单的增删改查小表格。
            </p>
          </div>
          <div class="flex items-center gap-3">
            <Button variant="outline" :disabled="pending" @click="refresh">
              <Icon name="lucide:refresh-ccw" class="h-4 w-4" />
              重新获取
            </Button>
            <div class="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200">
              假数据存储在内存中
            </div>
          </div>
        </div>

        <div class="mt-6 grid gap-4 md:grid-cols-3">
          <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-800/70">
            <p class="text-sm text-slate-500 dark:text-slate-400">记录数</p>
            <p class="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{{ totalCount }}</p>
          </div>
          <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-800/70">
            <p class="text-sm text-slate-500 dark:text-slate-400">最近新增</p>
            <p class="mt-2 text-lg font-medium text-slate-900 dark:text-white">
              {{ lastCreated ? formatDate(lastCreated) : "—" }}
            </p>
          </div>
          <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-800/70">
            <p class="text-sm text-slate-500 dark:text-slate-400">接口状态</p>
            <p class="mt-2 flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-300">
              <span class="size-2 rounded-full bg-emerald-400 animate-pulse" />
              本地 Node 假接口运行中
            </p>
          </div>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-[360px,1fr]">
        <section
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
        >
          <div class="mb-4">
            <p class="text-sm text-slate-500 dark:text-slate-400">创建新条目</p>
            <h2 class="text-xl font-semibold text-slate-900 dark:text-white">新增记录</h2>
          </div>

          <form class="space-y-4" @submit.prevent="handleCreate">
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-700 dark:text-slate-300" for="name">姓名</label>
              <input
                id="name"
                v-model="form.name"
                required
                placeholder="输入姓名"
                class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-700"
              />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-700 dark:text-slate-300" for="email">邮箱</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="name@example.com"
                class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-700"
              />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-700 dark:text-slate-300" for="role">角色</label>
              <input
                id="role"
                v-model="form.role"
                required
                placeholder="岗位或职责"
                class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-700"
              />
            </div>

            <Button type="submit" class="w-full" :disabled="creating">
              <Icon name="lucide:plus" class="h-4 w-4" />
              {{ creating ? "提交中..." : "新增" }}
            </Button>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              数据会调用 <code class="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">/api/demo/items</code>
              的 Node 假接口，不会持久化到数据库。
            </p>
          </form>
        </section>

        <section
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
        >
          <div class="mb-4 flex items-center justify-between gap-3">
            <div>
              <p class="text-sm text-slate-500 dark:text-slate-400">管理表格</p>
              <h2 class="text-xl font-semibold text-slate-900 dark:text-white">已有记录</h2>
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span v-if="pending" class="flex items-center gap-1">
                <span class="size-2 animate-ping rounded-full bg-slate-400" />
                加载中...
              </span>
              <span v-else class="flex items-center gap-1">
                <span class="size-2 rounded-full bg-emerald-400" />
                就绪
              </span>
            </div>
          </div>

          <div
            v-if="banner"
            :class="[
              'mb-4 flex items-center gap-2 rounded-lg px-4 py-3 text-sm',
              banner.type === 'success'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-500/40'
                : 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-200 dark:border-rose-500/40',
            ]"
          >
            <Icon :name="banner.type === 'success' ? 'lucide:check-circle' : 'lucide:alert-circle'" class="h-4 w-4" />
            <span>{{ banner.text }}</span>
          </div>

          <div v-if="error" class="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-200">
            加载失败：{{ errorMessage(error) }}
          </div>
          <div v-else>
            <div
              v-if="!pending && !sortedItems.length"
              class="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/80 p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400"
            >
              <Icon name="lucide:inbox" class="h-10 w-10" />
              <div>暂无数据，先去左侧新增一条记录吧。</div>
            </div>

            <div v-else class="overflow-x-auto">
              <table class="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
                <thead class="bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <tr>
                    <th class="px-4 py-3 font-medium">ID</th>
                    <th class="px-4 py-3 font-medium">姓名</th>
                    <th class="px-4 py-3 font-medium">邮箱</th>
                    <th class="px-4 py-3 font-medium">角色</th>
                    <th class="px-4 py-3 font-medium">创建时间</th>
                    <th class="px-4 py-3 text-right font-medium">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-900/40">
                  <tr v-for="item in sortedItems" :key="item.id">
                    <td class="px-4 py-3 font-semibold text-slate-900 dark:text-white">#{{ item.id }}</td>
                    <td class="px-4 py-3">
                      <div v-if="editId === item.id">
                        <input
                          v-model="editForm.name"
                          class="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm shadow-sm outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-700"
                        />
                      </div>
                      <div v-else class="text-slate-800 dark:text-slate-100">
                        {{ item.name }}
                      </div>
                    </td>
                    <td class="px-4 py-3">
                      <div v-if="editId === item.id">
                        <input
                          v-model="editForm.email"
                          class="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm shadow-sm outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-700"
                        />
                      </div>
                      <div v-else class="text-slate-700 dark:text-slate-200">
                        {{ item.email }}
                      </div>
                    </td>
                    <td class="px-4 py-3">
                      <div v-if="editId === item.id">
                        <input
                          v-model="editForm.role"
                          class="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm shadow-sm outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-700"
                        />
                      </div>
                      <div v-else class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        {{ item.role }}
                      </div>
                    </td>
                    <td class="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {{ formatDate(item.createdAt) }}
                    </td>
                    <td class="px-4 py-3">
                      <div class="flex flex-wrap justify-end gap-2">
                        <template v-if="editId === item.id">
                          <Button
                            size="sm"
                            :disabled="savingId === item.id"
                            @click="saveEdit"
                          >
                            <Icon name="lucide:save" class="h-4 w-4" />
                            {{ savingId === item.id ? "保存中..." : "保存" }}
                          </Button>
                          <Button size="sm" variant="ghost" @click="cancelEdit">
                            取消
                          </Button>
                        </template>
                        <template v-else>
                          <Button size="sm" variant="secondary" @click="startEdit(item)">
                            <Icon name="lucide:pencil" class="h-4 w-4" />
                            编辑
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            :disabled="deletingId === item.id"
                            @click="removeItem(item.id)"
                          >
                            <Icon name="lucide:trash" class="h-4 w-4" />
                            {{ deletingId === item.id ? "删除中..." : "删除" }}
                          </Button>
                        </template>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
