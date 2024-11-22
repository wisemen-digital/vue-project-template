/* eslint-disable node/prefer-global/process */
import ImportMetaEnvPlugin from '@import-meta-env/unplugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        silenceDeprecations: [
          'legacy-js-api',
        ],
      },
    },
  },
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
    BUILD_COMMIT: JSON.stringify(process.env.BUILD_COMMIT ?? 'undefined'),
    BUILD_NUMBER: JSON.stringify(process.env.BUILD_NUMBER ?? '0'),
    BUILD_TIMESTAMP: JSON.stringify(process.env.BUILD_TIMESTAMP ?? 'undefined'),
  },
  plugins: [
    ImportMetaEnvPlugin.vite({
      env: '.env',
      example: '.env.example',
    }),
    viteCompression(),
    VitePWA({
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
      ],
      injectRegister: 'auto',
      manifest: {
        name: 'Project template',
        background_color: '#ffffff',
        display: 'fullscreen',
        icons: [
          {
            sizes: '512x512',
            src: 'favicon_512x512.png',
            type: 'image/png',
          },
          {
            sizes: '192x192',
            src: 'favicon_192x192.png',
            type: 'image/png',
          },
        ],
        short_name: 'Project template',
        theme_color: 'rgb(23, 23, 23)',
      },
      registerType: 'prompt',
      strategies: 'generateSW',
      workbox: {
        navigateFallbackDenylist: [
          /api/,
        ],
        runtimeCaching: [
          {
            handler: 'CacheFirst',
            options: {
              cacheName: 's3-images',
              cacheableResponse: {
                statuses: [
                  0,
                  200,
                ], // cache responses with these statuses
              },
              expiration: {
                maxAgeSeconds: 30 * 24 * 60 * 60, // cache for 30 days
              },
              matchOptions: {
                ignoreSearch: true,
              },
            },
            urlPattern: ({ url }): boolean => url.origin.includes('.s3.'),
          },
        ],
      },
    }),
    vue({
      script: {
        defineModel: true,
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
    ],
  },
})
