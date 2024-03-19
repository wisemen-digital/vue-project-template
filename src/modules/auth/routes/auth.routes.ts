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
    path: '/reset-password/:token'
    queryParams: {
      email: string
    }
  }
}

export const authRoutes: RouteRecordTyped[] = [
  {
    children: [
      {
        component: async () => await import('../features/login/views/AuthLoginView.vue'),
        name: 'login',
        path: 'login',
      },
      {
        component: async () => await import('../features/forgot-password/views/AuthForgotPasswordView.vue'),
        name: 'forgot-password',
        path: 'forgot-password',
      },
      {
        component: async () => await import('../features/reset-password/views/AuthResetPasswordView.vue'),
        name: 'reset-password',
        path: 'reset-password/:token',
      },
    ],
    component: () => import('../components/AuthLayout.vue'),
    meta: {
      middleware: [
        guest,
      ],
    },
    path: '',
  },
]
