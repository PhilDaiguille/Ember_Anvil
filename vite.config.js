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
    vitePluginSitemap({
      hostname: process.env.VITE_SITE_URL || "https://ember-anvil.vercel.app/",
      outDir: "dist",
    }),
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
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue", "vue-router"],
          icons: ["lucide-vue-next"],
        },
      },
    },
    cssCodeSplit: true,
    minify: "esbuild",
    chunkSizeWarningLimit: 600,
    assetsInlineLimit: 4096,
  },
});
