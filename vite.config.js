import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/lib/index.js', // 入口文件，根据你的项目结构进行调整
      name: 'jworker-components' // 你的库的名称
    },
    rollupOptions: {
      // 外部依赖，例如 Vue 3，如果你的库依赖于其他库，需要在这里声明
      external: ['vue','ant-design-vue'],
      output: {
        globals: {
          vue: 'Vue', // 这里需要指定 Vue 对象的全局变量名
          'ant-design-vue': 'AntDesignVue',
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
        math: "always",
      },
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
