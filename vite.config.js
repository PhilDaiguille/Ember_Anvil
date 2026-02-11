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
    // Code splitting optimisé
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk pour les dépendances
          vendor: ["vue", "vue-router"],
          // Icons chunk séparé
          icons: ["lucide-vue-next"],
        },
      },
    },
    // Optimiser la taille du bundle
    cssCodeSplit: true,
    // Source maps pour debugging en prod (optionnel)
    sourcemap: false,
    // Minification
    minify: "esbuild",
    // Chunk size warnings
    chunkSizeWarningLimit: 600,
    // Optimiser les assets
    assetsInlineLimit: 4096, // 4kb - inline les petits assets
  },
  // Optimisation CSS
  css: {
    devSourcemap: true,
  },
});
