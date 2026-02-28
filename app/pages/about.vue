<script setup lang="ts">
import avatarUrl from "~/assets/image/avatar.png"
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/20 dark:to-slate-800"
  >
    <div class="container mx-auto px-4 py-10 sm:py-16">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8 sm:mb-12">
          <Avatar class="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 sm:mb-6">
            <AvatarImage :src="avatarUrl" alt="Noland Cheng" />
            <AvatarFallback>NC</AvatarFallback>
          </Avatar>
          <h1 class="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-white">关于我</h1>
          <p class="text-base sm:text-lg text-slate-600 dark:text-slate-400">了解更多关于我的故事</p>
        </div>

        <div class="space-y-5 sm:space-y-8">
          <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 sm:p-8">
            <h2 class="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-slate-900 dark:text-white">个人简介</h2>
            <div class="space-y-3 sm:space-y-4 text-base text-slate-600 dark:text-slate-400">
              <p>你好，我是 Noland Cheng。一个热爱技术、追求卓越的开发者。</p>
              <p>
                我相信"涓流虽寡，浸成江河；爝火虽微，卒能燎野"的力量。每一行代码、每一次学习、每一个项目，
                都是向着更高目标迈进的一小步。
              </p>
              <p>在技术的海洋中不断探索，在创造的路上永不停歇。</p>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 sm:p-8">
            <h2 class="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-slate-900 dark:text-white">技能与兴趣</h2>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h3 class="text-lg font-semibold mb-3 text-slate-900 dark:text-white">技术栈</h3>
                <div class="space-y-2 text-base text-slate-600 dark:text-slate-400">
                  <p>• 前端开发：Vue.js, Nuxt.js, React, TypeScript</p>
                  <p>• 后端开发：Node.js, Python</p>
                  <p>• 工具链：Git, Docker, CI/CD</p>
                  <p>• 设计：Tailwind CSS, UI/UX</p>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-semibold mb-3 text-slate-900 dark:text-white">兴趣爱好</h3>
                <div class="space-y-2 text-base text-slate-600 dark:text-slate-400">
                  <p>• 开源贡献</p>
                  <p>• 技术博客写作</p>
                  <p>• 新技术学习</p>
                  <p>• 产品设计思考</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 sm:p-8">
            <h2 class="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-slate-900 dark:text-white">联系方式</h2>
            <div class="space-y-3 text-base text-slate-600 dark:text-slate-400">
              <p>如果你想与我交流技术话题、合作项目，或者单纯聊聊天，欢迎通过以下方式联系我：</p>
              <div class="pt-4">
                <p>📧 邮箱：正在准备中...</p>
                <p>🐙 GitHub：正在准备中...</p>
                <p>🐦 社交媒体：正在准备中...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
