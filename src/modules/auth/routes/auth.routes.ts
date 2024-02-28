import { guest } from '@/middlewares/guest.middleware.ts'
import type { RouteRecordTyped } from '@/types/router/router.type'

export interface AuthRoutes {
	'login': {
		path: '/login'
	}
	'forgot-password': {
		path: '/forgot-password'
	}
	'reset-password': {
		path: '/reset-password/:token'
		params: {
			token: string
		}
		queryParams: {
			email: string
		}
	}
}

export const authRoutes: RouteRecordTyped[] = [
	{
		path: '',
		meta: {
			middleware: [guest],
		},
		component: () => import('../components/AuthLayout.vue'),
		children: [
			{
				path: 'login',
				name: 'login',
				component: async () => await import('../features/login/views/AuthLoginView.vue'),
			},
			{
				path: 'forgot-password',
				name: 'forgot-password',
				component: async () => await import('../features/forgot-password/views/AuthForgotPasswordView.vue'),
			},
			{
				path: 'reset-password/:token',
				name: 'reset-password',
				component: async () => await import('../features/reset-password/views/AuthResetPasswordView.vue'),
			},
		],
	},
]
