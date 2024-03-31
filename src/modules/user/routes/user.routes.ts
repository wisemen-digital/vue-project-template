import type { UserUuid } from '@/models/user/userUuid.model'
import type { RouteRecordTyped } from '@/types/router/router.type'

export interface UserRoutes {
  'user-create': {
    path: '/users/create'
  }
  'user-detail': {
    params: {
      userUuid: UserUuid
    }
    path: '/users/:userUuid'
  }
  'user-overview': {
    path: '/users'
  }
  'user-update': {
    params: {
      userUuid: UserUuid
    }
    path: '/users/:userUuid/update'
  }
}

export const userRoutes: RouteRecordTyped[] = [
  {
    children: [
      {
        component: () => import('../features/overview/views/UserOverviewView.vue'),
        name: 'user-overview',
        path: '',
      },
      {
        component: () => import('../features/detail/views/UserDetailViewDataProvider.vue'),
        name: 'user-detail',
        path: ':userUuid',
      },
      {
        component: () => import('../features/create/views/UserCreateView.vue'),
        name: 'user-create',
        path: 'create',
      },
      {
        component: () => import('../features/update/views/UserUpdateViewDataProvider.vue'),
        name: 'user-update',
        path: ':userUuid/update',
      },
    ],
    path: '/users',
  },
]
