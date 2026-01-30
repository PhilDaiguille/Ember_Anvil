import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { compression } from "vite-plugin-compression2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    compression({
      algorithms: [
        defineConfig({
          algorithm: "gzip",
          options: { level: 9 },
        }),
        defineConfig({
          algorithm: "brotliCompress",
          options: { level: 11 },
        }),
        defineConfig({
          algorithm: "zstandard",
          options: { level: 22 },
        }),
        "gzip", "brotliCompress", "zstandard",
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
