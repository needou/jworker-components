import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: 'src/lib/index.js', // 入口文件，根据你的项目结构进行调整
      name: 'JworkerComponents', // 你的库的名称
      fileName: 'jworker-components',
      formats: ["es"]
    },
    rollupOptions: {
      // ！！！外部依赖，例如 Vue 3，如果你的库依赖于其他库，需要在这里声明，并且vue和ant-design-vue在package.json里面要放到devDependencies中
      external: ['vue','ant-design-vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
      },
    },
    cssCodeSplit:false
  },
  plugins: [
    vue(),
  ],
  css: {
    extract: false,
    // 预处理器配置项
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      },
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    dedupe: ['vue']
  }
})
