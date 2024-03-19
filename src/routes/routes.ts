import { authMiddleware } from '@/middlewares/auth.middleware.ts'
import type { AuthRoutes } from '@/modules/auth/routes/auth.routes.ts'
import { authRoutes } from '@/modules/auth/routes/auth.routes.ts'
import { type UsersRoutes, usersRoutes } from '@/modules/users/routes/users.routes'
import type { RouteRecordTyped } from '@/types/router/router.type'

export interface Routes extends AuthRoutes, UsersRoutes {
  404: {
    path: '/:catchAll(.*)'
  }
  index: {
    path: '/'
  }
}

export const routes: RouteRecordTyped[] = [
  {
    children: [
      {
        name: 'index',
        path: '',
        props: {},
        redirect: {
          name: 'users-overview',
        },
      },
      /**
       * Authenticated routes
       */
      ...usersRoutes,
    ],
    component: () => import('@/components/layout/AppLayout.vue'),
    meta: {
      middleware: [
        authMiddleware,
      ],
    },
    path: '',
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
]
