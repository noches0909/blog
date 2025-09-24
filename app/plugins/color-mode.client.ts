/**
 * 颜色模式客户端插件
 *
 * 作用：防止FOUC (Flash of Unstyled Content) 闪烁问题
 * FOUC是指页面在CSS加载完成前显示无样式内容的现象
 *
 * 该插件只在客户端运行（.client.ts后缀）
 */
export default defineNuxtPlugin(() => {
  // 获取Nuxt颜色模式组合函数
  // 这会返回当前的主题设置（light/dark/system）
  const colorMode = useColorMode()

  // 使用nextTick确保DOM更新后再执行
  // nextTick会在Vue完成DOM更新后执行回调函数
  nextTick(() => {
    // 获取HTML根元素
    const html = document.documentElement

    // 移除可能存在的颜色模式类名，避免冲突
    html.classList.remove("light", "dark")

    // 根据当前颜色模式设置添加对应的CSS类名
    // 这样CSS中的 .light 和 .dark 选择器就能正常工作
    html.classList.add(colorMode.value)
  })
})
