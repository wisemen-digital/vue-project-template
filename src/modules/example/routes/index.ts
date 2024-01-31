import type { RouteRecordTyped } from '@/models/core/router.model.ts'

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
