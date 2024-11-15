import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

import { guest } from '@/middlewares/guest.middleware.ts'

<<<<<<< Updated upstream
export const authRoutes = [
=======
export interface AuthRoutes {
  'forgot-password': void
  'login': void
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
>>>>>>> Stashed changes
  {
    path: '/auth',
    component: (): Component => import('@/modules/auth/components/AuthLayout.vue'),
    meta: {
      middleware: [
        guest,
      ],
    },
    redirect: {
      name: 'auth-login',
    },
    children: [
      {
        name: 'auth-login',
        path: 'login',
        component: (): Component => import('@/modules/auth/features/login/views/AuthLoginView.vue'),
      },
      {
        name: 'auth-callback',
        path: 'callback',
        component: (): Component => import('@/modules/auth/features/callback/views/AuthCallbackView.vue'),
      },
      {
        name: 'auth-logout',
        path: 'logout',
        component: (): Component => import('@/modules/auth/features/logout/views/AuthLogoutView.vue'),
      },
    ],
  },
] as const satisfies RouteRecordRaw[]
