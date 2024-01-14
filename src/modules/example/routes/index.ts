import type { RouteRecordTyped } from '@/plugins/router/router.plugin.ts'

export const exampleRoutes: RouteRecordTyped[] = [
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
