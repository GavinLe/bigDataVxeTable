import { defineConfig} from 'vite'

import path from 'path'

import Plg from './presets/plugins'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Plg()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    },
  },
  resolve: {
    alias: [
      // /@/xxxx => src/xxxx
      {
        find: /\/@\//,
        replacement: path.resolve('src') + '/',
      },
    ],
  },
  //本地运行配置，以及反向代理配置
 server: {
    port: "9000",//端口
    // host: "localhost",//ip地址例如192.168.1.177
    host:true,
    open: true,//服务启动时自动在浏览器中打开应用
    // 反向代理配置
    proxy: { //配置多个代理
      '/api': {
      target: "https://xxxx.com/",//例子:http://192.168.1.177:8080 或测试服务器https://xxxx.com
      changeOrigin: true,///设置访问目标地址允许跨域
      rewrite: (p) => p.replace(/^\/dev-api/, '')
      },
      '/api': {
      target: "https://xxxx.com/",
      changeOrigin: true,///设置访问目标地址允许跨域
      rewrite: (p) => p.replace(/^\/prod-api/, '')
      },
    }
  }
})
