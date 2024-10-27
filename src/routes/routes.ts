import type {
  Component,
} from 'vue'
import type { RouteRecordRaw } from 'vue-router'

import { authMiddleware } from '@/middlewares/auth.middleware'
import { authRoutes } from '@/modules/auth/routes/auth.routes.ts'
import { settingsRoutes } from '@/modules/settings/routes/settings.routes'
import { userRoutes } from '@/modules/user/routes/user.routes'
import type { RoutesProccessed } from '@/types/vueRouter'

export const routes = [
  {
    path: '',
    component: (): Component => import('@/components/layout/dashboard/AppDashboardLayout.vue'),
    meta: {
      middleware: [
        authMiddleware,
      ],
    },
    children: [
      {
        name: 'index',
        path: '',
        redirect: {
          name: 'user-overview',
        },
      },
      /**
       * Authenticated routes
       */
      ...userRoutes,
      ...settingsRoutes,
    ],
  },
  /**
   * Unauthenticated routes
   */
  ...authRoutes,
  {
    name: '404',
    path: '/:catchAll(.*)',
    redirect: {
      name: 'index',
    },
  },
] as const satisfies RouteRecordRaw[]

declare module '@wisemen/vue-core' {
  interface Routes extends RoutesProccessed {}
}
