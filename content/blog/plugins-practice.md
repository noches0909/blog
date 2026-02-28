---
title: 现有插件如何协同使用
description: 保持插件精简，通过 Nuxt Content + Shadcn + Color Mode 做出稳定基础站点。
date: 2026-02-24
tags:
  - 插件
  - Nuxt
draft: false
---

当前项目已经有不少基础插件，但关键是 **明确职责**，不要重复造轮子。

## 插件分工

- `@nuxt/content`：负责内容组织、查询和渲染。
- `shadcn-nuxt`：负责基础 UI 组件和交互一致性。
- `@nuxtjs/color-mode`：负责主题切换和状态保持。
- `@nuxt/icon`：提供统一图标入口。

## 目前的取舍

没有接入复杂后台，也没有引入数据库管理文章。  
内容以 Markdown 文件为主，足够支撑个人博客的第一阶段。

## 一个经验

先有可发布的内容流，再考虑管理体验。  
如果文章都还没稳定产出，后台系统通常会变成负担。
