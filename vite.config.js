import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { compression } from "vite-plugin-compression2";
import vitePluginSitemap from "./scripts/vite-plugin-sitemap.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
});
