import { auth } from '@/middlewares/auth.middleware.ts'
import type { RouteRecordTyped } from '@/plugins/router/router.plugin.ts'

export const routes: RouteRecordTyped[] = [
	{
		path: '',
		meta: {
			middleware: [auth],
		},
		component: () => import('@/components/layout/AppLayout.vue'),
		children: [
			{
				path: '',
				name: 'index',
				redirect: {
					name: 'example-index',
				},
			},
			/**
			 * Authenticated routes
			 */
			...exampleRoutes,
		],
	},
	/**
	 * Unauthenticated routes
	 */
	...authRoutes,
	{
		path: '/:catchAll(.*)',
		name: '404',
		redirect: {
			name: 'index',
		},
	},
]
