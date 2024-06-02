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
      middleware: [
        guest,
      ],
    },
    children: [
      {
        path: 'login',
        name: 'login',
        component: async () => await import('@/modules/auth/features/login/views/AuthLoginView.vue'),
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: async () => await import('@/modules/auth/features/forgot-password/views/AuthForgotPasswordView.vue'),
      },
      {
        path: 'reset-password/:token',
        name: 'reset-password',
        component: async () => await import('@/modules/auth/features/reset-password/views/AuthResetPasswordView.vue'),
      },
    ],
    component: () => import('@/modules/auth/components/AuthLayout.vue'),
  },
]
