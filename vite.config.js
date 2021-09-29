import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/renting/' : '',
  plugins: [
    vue(),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  server: {
    proxy: {
      // 字符串简写写法
      '/api': 'https://dongxin.cool/api'
    }
  }
})
