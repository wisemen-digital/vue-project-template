import { defineAsyncComponent } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export const userRoutes = [
  {
    path: '/users',
    children: [
      {
        name: 'user-overview',
        path: '',
        component: defineAsyncComponent(() => import('@/modules/user/features/overview/views/UserOverviewView.vue')),
      },
      {
        name: 'user-detail',
        props: true,
        path: ':userUuid',
        component: defineAsyncComponent(() => import('@/modules/user/features/detail/views/UserDetailViewDataProvider.vue')),
      },
      {
        name: 'user-create',
        path: 'create',
        component: defineAsyncComponent(() => import('@/modules/user/features/create/views/UserCreateView.vue')),
      },
      {
        name: 'user-update',
        path: ':userUuid/update',
        component: defineAsyncComponent(() => import('@/modules/user/features/update/views/UserUpdateViewDataProvider.vue')),
      },
    ],
  },
] as const satisfies RouteRecordRaw[]
