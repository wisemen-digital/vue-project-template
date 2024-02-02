import { authMiddleware } from '@/middlewares/auth.middleware.ts'
import { authRoutes } from '@/modules/auth/routes/auth.routes.ts'
import { customersRoutes } from '@/modules/customers/routes/customers.routes.ts'
import type { RouteRecordTyped } from '@/types/core/router/router.model.ts'

export const routes: RouteRecordTyped[] = [
	{
		path: '',
		meta: {
			middleware: [authMiddleware],
		},
		component: () => import('@/components/layout/AppLayout.vue'),
		children: [
			{
				path: '',
				name: 'index',
				props: {},
				redirect: {
					name: 'customers-overview',
				},
			},
			/**
			 * Authenticated routes
			 */
			...customersRoutes,
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
