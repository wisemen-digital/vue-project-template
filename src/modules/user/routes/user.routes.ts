import type { UserUuid } from '@/models/user/userUuid.model'
import type { RouteRecordTyped } from '@/types/router/router.type'

export interface UserRoutes {
  'user-create': {
    path: '/users/create'
  }
  'user-detail': {
    path: '/users/:userUuid'
    params: {
      userUuid: UserUuid
    }
  }
  'user-overview': {
    path: '/users'
  }
  'user-update': {
    path: '/users/:userUuid/update'
    params: {
      userUuid: UserUuid
    }
  }
}

export const userRoutes: RouteRecordTyped[] = [
  {
    path: '/users',
    children: [
      {
        path: '',
        name: 'user-overview',
        component: () => import('@/modules/user/features/overview/views/UserOverviewView.vue'),
      },
      {
        path: ':userUuid',
        name: 'user-detail',
        component: () => import('@/modules/user/features/detail/views/UserDetailViewDataProvider.vue'),
      },
      {
        path: 'create',
        name: 'user-create',
        component: () => import('@/modules/user/features/create/views/UserCreateView.vue'),
      },
      {
        path: ':userUuid/update',
        name: 'user-update',
        component: () => import('@/modules/user/features/update/views/UserUpdateViewDataProvider.vue'),
      },
    ],
  },
]
