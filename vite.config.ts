import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
	define: {
		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
	},
	plugins: [
		VueDevTools(),
		vue({
			script: {
				propsDestructure: true,
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
