import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

import { guest } from '@/middlewares/guest.middleware.ts'

export const authRoutes = [
  {
    path: '/auth',
    component: (): Component => import('@/modules/auth/components/AuthLayout.vue'),
    redirect: {
      name: 'auth-login',
    },
    children: [
      {
        name: 'auth-login',
        path: 'login',
        component: (): Component => import('@/modules/auth/features/login/views/AuthLoginView.vue'),
        meta: {
          middleware: [
            guest,
          ],
        },
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
