<script setup lang="ts">
// 项目页面
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-800"
  >
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4 text-slate-900 dark:text-white">我的项目</h1>
        <p class="text-lg text-slate-600 dark:text-slate-400">技术实践与创新成果展示</p>
      </div>

      <div class="max-w-6xl mx-auto">
        <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 class="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">项目作品集</h2>
          <p class="text-slate-600 dark:text-slate-400 mb-4">
            这里展示我在软件开发、前端工程、全栈应用等方面的实践项目。每个项目都凝聚了我的技术探索和创新思考。
          </p>
          <p class="text-slate-600 dark:text-slate-400">项目详情正在整理中，即将与大家见面...</p>
        </div>

        <!-- 项目展示网格 - 未来可以动态加载项目数据 -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div
            class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 border border-slate-200 dark:border-slate-700"
          >
            <div class="text-4xl mb-3">🚧</div>
            <h3 class="text-lg font-semibold mb-2 text-slate-900 dark:text-white">项目一</h3>
            <p class="text-slate-600 dark:text-slate-400 text-sm">敬请期待</p>
          </div>

          <div
            class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 border border-slate-200 dark:border-slate-700"
          >
            <div class="text-4xl mb-3">⚡</div>
            <h3 class="text-lg font-semibold mb-2 text-slate-900 dark:text-white">项目二</h3>
            <p class="text-slate-600 dark:text-slate-400 text-sm">开发中</p>
          </div>

          <div
            class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 border border-slate-200 dark:border-slate-700"
          >
            <div class="text-4xl mb-3">🎯</div>
            <h3 class="text-lg font-semibold mb-2 text-slate-900 dark:text-white">项目三</h3>
            <p class="text-slate-600 dark:text-slate-400 text-sm">规划中</p>
          </div>
        </div>

        <div class="text-center py-12">
          <div class="text-6xl mb-4">💻</div>
          <p class="text-slate-500 dark:text-slate-400">更多精彩项目即将发布</p>
        </div>
      </div>
    </div>
  </div>
</template>
