import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入node提供的path模块，可以获取绝对路径。
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  // 给src文件夹设置别名；格式依赖  npm i @types/node --save--dev
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },
  // base: '/hospitalrun-fe/',
  // 跨域
  server: {
    proxy: {
      '/api': {
        target: 'http://syt.atguigu.cn',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
})
