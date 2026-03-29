import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { compression } from "vite-plugin-compression2";
import vitePluginSitemap from "./scripts/vite-plugin-sitemap.js";

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
    tailwindcss(),
    compression({
      algorithms: [
        ["gzip", { level: 9 }],
        ["brotliCompress", { level: 11 }],
      ],
      threshold: 1024,
      deleteOriginalAssets: false,
    }),
    vitePluginSitemap(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ["vue", "vue-router", "lucide-vue-next"],
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
    rolldownOptions: {
      output: {
        manualChunks: (id) => {
          if (
            id.includes("node_modules/vue") ||
            id.includes("node_modules/vue-router")
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
