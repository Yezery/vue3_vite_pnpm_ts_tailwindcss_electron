import { defineConfig } from "vite";
 
import vue from "@vitejs/plugin-vue";
 
 
 
import electron from "vite-plugin-electron";
 
import electronRenderer from "vite-plugin-electron-renderer";
import { fileURLToPath, URL } from 'node:url'
 
 
export default defineConfig(({ mode }) => ({
 
  base: mode == "development" ? "" : "./",
 
  plugins: [
 
    vue(),
 
    electron([
 
      {
 
        entry: "electron/index.ts", // 主进程文件
 
      },
 
      {
 
        entry: "electron/preload.ts",
 
      },
 
    ]),
 
    electronRenderer(),
 
  ],
 
  build: {
 
    emptyOutDir: false, // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
 
    outDir: "dist-electron",
 
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
}));