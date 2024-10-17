import type { UserUuid } from '@/models/user/userUuid.model'
import type { RouteRecordTyped } from '@/types/router/router.type'

export interface UserRoutes {
  'user-create': void
  'user-detail': {
    params: {
      userUuid: UserUuid
    }
    path: '/users/:userUuid'
  }
  'user-overview': void
  'user-update': {
    params: {
      userUuid: UserUuid
    }
    path: '/users/:userUuid/update'
  }
}

export const userRoutes: RouteRecordTyped[] = [
  {
    path: '/users',
    children: [
      {
        name: 'user-overview',
        path: '',
        component: () => import('@/modules/user/features/overview/views/UserOverviewView.vue'),
      },
      {
        name: 'user-detail',
        path: ':userUuid',
        component: () => import('@/modules/user/features/detail/views/UserDetailViewDataProvider.vue'),
      },
      {
        name: 'user-create',
        path: 'create',
        component: () => import('@/modules/user/features/create/views/UserCreateView.vue'),
      },
      {
        name: 'user-update',
        path: ':userUuid/update',
        component: () => import('@/modules/user/features/update/views/UserUpdateViewDataProvider.vue'),
      },
    ],
  },
]
