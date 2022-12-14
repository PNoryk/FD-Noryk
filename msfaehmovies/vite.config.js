import eslintPlugin from "@nabla/vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import viteSvgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/scss/_functions.scss" as *; @use "include-media" as *; '
      }
    }
  },
  plugins: [react(), viteSvgr(), eslintPlugin()],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
});
