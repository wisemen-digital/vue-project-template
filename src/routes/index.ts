import { auth } from '@/middlewares'
import { routes as authRoutes } from '@/modules/auth'
import { routes as exampleRoutes } from '@/modules/example'
import type { RouteRecordTyped } from '@/plugins'

export const routes: RouteRecordTyped[] = [
  {
    path: '',
    meta: {
      middleware: [auth],
    },
    component: () => import('@/components/layout/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        redirect: {
          name: 'example-index',
        },
      },
      /**
       * Authenticated routes
       */
      ...exampleRoutes,
    ],
  },
  /**
   * Unauthenticated routes
   */
  ...authRoutes,
  {
    path: '/:catchAll(.*)',
    name: '404',
    redirect: {
      name: 'index',
    },
  },
]
