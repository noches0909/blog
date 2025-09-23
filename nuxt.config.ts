// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "pathe"

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxt/icon", "shadcn-nuxt", "@nuxtjs/color-mode"],
  css: ["~/assets/css/tailwind.css"],
  components: [{ path: "@/components", pathPrefix: false, extensions: ["vue"] }],
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  colorMode: {
    classSuffix: "",
  },
  alias: {
    "@": resolve("./"),
    "~": resolve("./app"),
  },
  app: {
    head: {
      title: "Noland Cheng",
      // titleTemplate: "%s · Noland Cheng",
    },
  },
})
