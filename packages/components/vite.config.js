import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: {
        index: resolve(__dirname, "./src/index.js"),
      },
      formats: ["es"],
      name: 'JworkerComponents'
    },
    minify: false,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "ant-design-vue"],
      output: {
        chunkFileNames: "common/[name].js",
        entryFileNames: (file) => {
          if (file.name == "index") {
            return "index.js";
          } else {
            return "[name]/index.js";
          }
        },
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
    assetsDir: "",
  },
  plugins: [vue(),  vueJsx()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  test: {
    environment: "happy-dom",
    coverage: {
      provider: "v8",
      enabled: true,
      reporter: ["text", "json", "html"],
    },
    reporters: ["default", "html"],
  },
});
