import { guest } from '@/middlewares/guest.middleware.ts'
import type { RouteRecordTyped } from '@/types/router/router.type'

export interface AuthRoutes {
  login: void
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
    ],
  },
]
