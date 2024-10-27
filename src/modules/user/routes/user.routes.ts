import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export const userRoutes = [
  {
    path: '/users',
    children: [
      {
        name: 'user-overview',
        path: '',
        component: (): Component => import('@/modules/user/features/overview/views/UserOverviewView.vue'),
      },
      {
        name: 'user-detail',
        props: true,
        path: ':userUuid',
        component: (): Component => import('@/modules/user/features/detail/views/UserDetailViewDataProvider.vue'),
      },
      {
        name: 'user-create',
        path: 'create',
        component: (): Component => import('@/modules/user/features/create/views/UserCreateView.vue'),
      },
      {
        name: 'user-update',
        props: true,
        path: ':userUuid/update',
        component: (): Component => import('@/modules/user/features/update/views/UserUpdateViewDataProvider.vue'),
      },
    ],
  },
] as const satisfies RouteRecordRaw[]
