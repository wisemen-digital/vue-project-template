import { authMiddleware } from '@/middlewares/auth.middleware.ts'
import type { AuthRoutes } from '@/modules/auth/routes/auth.routes.ts'
import { authRoutes } from '@/modules/auth/routes/auth.routes.ts'
import { type UsersRoutes, usersRoutes } from '@/modules/users/routes/users.routes'
import type { RouteRecordTyped } from '@/types/router/router.type'

export interface Routes extends AuthRoutes, UsersRoutes {
	'index': {
		path: '/'
	}
	'404': {
		path: '/:catchAll(.*)'
	}
}

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
					name: 'users-overview',
				},
			},
			/**
			 * Authenticated routes
			 */
			...usersRoutes,
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
