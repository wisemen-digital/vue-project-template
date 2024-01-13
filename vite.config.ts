import vueI18n from '@intlify/vite-plugin-vue-i18n'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue({
      script: {
        propsDestructure: true,
        defineModel: true,
      },
    }),
    Components({
      dirs: ['./src'],
      dts: true,
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n'],
      vueTemplate: true,
    }),
    vueI18n({
      include: './src/i18n/locales/**',
      runtimeOnly: false,
    }),
  ],
  resolve: {
    alias: [{
      find: '@',
      replacement: '/src',
    }],
  },
  server: {
    port: 3000,
    hmr: {
      host: 'localhost',
      protocol: 'ws',
      clientPort: 3000,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
})
