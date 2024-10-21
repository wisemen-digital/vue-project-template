import { guest } from '@/middlewares/guest.middleware.ts'
import type { RouteRecordTyped } from '@/types/router/router.type'

export interface AuthRoutes {
  'auth-callback': {
    queryParams: {
      code: string
    }
    path: '/auth/callback'
  }
  'auth-login': {
    path: '/auth/login'
  }
  'auth-logout': {
    path: '/auth/logout'
  }
}

export const authRoutes: RouteRecordTyped[] = [
  {
    path: '/auth',
    component: () => import('@/modules/auth/components/AuthLayout.vue'),
    meta: {
      middleware: [
        guest,
      ],
    },
    children: [
      {
        name: 'auth-login',
        path: '/login',
        component: async () => await import('@/modules/auth/features/login/views/AuthLoginView.vue'),
      },
      {
        name: 'auth-logout',
        path: '/logout',
        component: async () => await import('@/modules/auth/features/logout/views/AuthLogoutView.vue'),
      },
      {
        name: 'auth-callback',
        path: '/callback',
        component: async () => await import('@/modules/auth/features/callback/views/AuthCallbackView.vue'),
      },
    ],
  },
]
