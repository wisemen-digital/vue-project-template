import type { UserUuid } from '@/models/users/userUuid.model'
import type { RouteRecordTyped } from '@/types/router/router.type'

export interface UsersRoutes {
  'users-create': {
    path: '/users/create'
  }
  'users-detail': {
    params: {
      userUuid: UserUuid
    }
    path: '/users/:userUuid'
  }
  'users-overview': {
    path: '/users'
  }
  'users-update': {
    params: {
      userUuid: UserUuid
    }
    path: '/users/:userUuid/update'
  }
}

export const usersRoutes: RouteRecordTyped[] = [
  {
    component: () => import('../features/overview/views/UsersOverviewView.vue'),
    name: 'users-overview',
    path: '/users',
  },
  {
    component: () => import('../features/detail/views/UsersDetailViewDataProvider.vue'),
    name: 'users-detail',
    path: '/users/:userUuid',
  },
  {
    component: () => import('../features/create/views/UsersCreateView.vue'),
    name: 'users-create',
    path: '/users/create',
  },
  {
    component: () => import('../features/update/views/UsersUpdateViewDataProvider.vue'),
    name: 'users-update',
    path: '/users/:userUuid/update',
  },
]
