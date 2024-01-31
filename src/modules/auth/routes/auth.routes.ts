import { guest } from '@/middlewares/guest.middleware.ts'
import type { RouteRecordTyped } from '@/plugins/router/router.plugin.ts'

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
				component: async () => import('../features/login/views/AuthLoginView.vue'),
			},
			{
				path: 'forgot-password',
				name: 'forgot-password',
				component: async () => import('../features/forgot-password/views/AuthForgotPasswordView.vue'),
			},
			{
				path: 'reset-password/:token',
				name: 'reset-password',
				component: async () => import('../features/reset-password/views/AuthResetPasswordView.vue'),
			},
		],
	},
]
