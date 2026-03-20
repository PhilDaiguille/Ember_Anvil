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
        ["zstandard", { level: 22 }],
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
  // Optimisation des dépendances (Vite 7)
  optimizeDeps: {
    include: ["vue", "vue-router", "lucide-vue-next"],
    holdUntilCrawlEnd: false, // Améliore le cold start pour les grands projets
  },
  // Server warmup pour pré-transformer les fichiers fréquemment utilisés
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
  // Optimisations de build
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
