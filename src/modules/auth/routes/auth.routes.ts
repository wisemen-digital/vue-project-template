import { guest } from '@/middlewares/guest.middleware.ts'
import type { RouteRecordTyped } from '@/types/router/router.type'

export interface AuthRoutes {
  'forgot-password': {
    path: '/forgot-password'
  }
  'login': {
    path: '/login'
  }
  'reset-password': {
    params: {
      token: string
    }
    queryParams: {
      email: string
    }
    path: '/reset-password/:token'
  }
}

export const authRoutes: RouteRecordTyped[] = [
  {
    path: '',
    component: () => import('@/modules/auth/components/AuthLayout.vue'),
    meta: {
      middleware: [
        guest,
      ],
    },
    children: [
      {
        name: 'login',
        path: 'login',
        component: async () => await import('@/modules/auth/features/login/views/AuthLoginView.vue'),
      },
      {
        name: 'forgot-password',
        path: 'forgot-password',
        component: async () => await import('@/modules/auth/features/forgot-password/views/AuthForgotPasswordView.vue'),
      },
      {
        name: 'reset-password',
        path: 'reset-password/:token',
        component: async () => await import('@/modules/auth/features/reset-password/views/AuthResetPasswordView.vue'),
      },
    ],
  },
]
