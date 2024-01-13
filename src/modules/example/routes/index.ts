import type { RouteRecordTyped } from '@/plugins/router/router.plugin.ts'

export const routes: RouteRecordTyped[] = [
	{
		path: 'example',
		children: [
			{
				path: '',
				name: 'example-index',
				component: async () => import('../features/example-index/views/ExampleIndexView.vue'),
			},
		],
	},
]
