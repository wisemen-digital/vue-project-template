import { guest } from '@/middlewares/guest.middleware.ts'
import type { RouteRecordTyped } from '@/types/router/router.type'

export interface AuthRoutes {
  'auth-callback': {
    queryParams: {
      code?: string
    }
    path: '/auth/callback'
  }
  'auth-forgot-password': {
    path: '/auth/forgot-password'
  }
  'auth-login': {
    path: '/auth/login'
  }
  'auth-logout': {
    path: '/auth/logout'
  }
  'auth-reset-password': {
    params: {
      token: string
    }
    queryParams: {
      email: string
    }
    path: 'auth/reset-password/:token'
  }
}

export const authRoutes: RouteRecordTyped[] = [
  {
    path: '/auth',
    children: [
      {
        name: 'auth-login',
        path: 'login',
        component: async () => await import('@/modules/auth/features/login/views/AuthLoginView.vue'),
        meta: {
          middleware: [
            guest,
          ],
        },
      },
      {
        name: 'auth-callback',
        path: 'callback',
        component: async () => await import('@/modules/auth/features/callback/views/AuthCallbackView.vue'),
      },
      {
        name: 'auth-logout',
        path: 'logout',
        component: async () => await import('@/modules/auth/features/logout/views/AuthLogoutView.vue'),
      },
      {
        name: 'auth-forgot-password',
        path: 'forgot-password',
        component: async () => await import('@/modules/auth/features/forgot-password/views/AuthForgotPasswordView.vue'),
      },
      {
        name: 'auth-reset-password',
        path: 'reset-password/:token',
        component: async () => await import('@/modules/auth/features/reset-password/views/AuthResetPasswordView.vue'),
      },
    ],
  },
]
