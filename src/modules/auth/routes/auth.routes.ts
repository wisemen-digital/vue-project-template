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
				name: 'login-form',
				component: async () => import('../features/login/views/AuthLoginView.vue'),
			},
			{
				path: 'forgot-password',
				name: 'forgot-password-form',
				component: async () => import('../features/forgot-password/views/AuthForgotPasswordFormView.vue'),
			},
			{
				path: 'reset-password/:token',
				name: 'reset-password-form',
				component: async () => import('../features/reset-password/views/AuthResetPasswordFormView.vue'),
			},
		],
	},
]
