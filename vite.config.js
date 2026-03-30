import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import vitePluginSitemap from "./scripts/vite-plugin-sitemap.js";
import vueDevTools from "vite-plugin-vue-devtools";

const isDev = process.env.NODE_ENV !== "production";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          hoistStatic: true,
          cacheHandlers: true,
        },
      },
    }),
    isDev &&
      vueDevTools({
        launchEditor: "webstorm",
      }),
    tailwindcss(),
    vitePluginSitemap(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ["vue", "vue-router", "pinia", "lucide-vue-next"],
    holdUntilCrawlEnd: false,
  },
  server: {
    warmup: {
      clientFiles: [
        "./src/main.js",
        "./src/App.vue",
        "./src/infrastructure/router/index.js",
        "./src/shared/layout/HomeView.vue",
        "./src/shared/layout/PageHeader.vue",
        "./src/shared/layout/PageFooter.vue",
        "./src/domains/*/views/*.vue",
      ],
    },
  },
  build: {
    target: "esnext",
    rolldownOptions: {
      output: {
        manualChunks: (id) => {
          if (
            id.includes("node_modules/vue") ||
            id.includes("node_modules/vue-router") ||
            id.includes("node_modules/pinia") ||
            id.includes("node_modules/@vue/")
          ) {
            return "vendor";
          }
          if (id.includes("node_modules/lucide-vue-next")) {
            return "icons";
          }
        },
      },
    },
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    assetsInlineLimit: 4096,
  },
  css: {
    devSourcemap: true,
  },
});
