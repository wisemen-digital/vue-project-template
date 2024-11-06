import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export const userSettingsRoutes = [
  {
    path: '/user-settings',
    children: [
      {
        name: 'user-settings-overview',
        path: '',
        component: (): Component => import('@/modules/user-settings/features/overview/UserSettingsOverviewView.vue'),
      },
    ],
  },
] as const satisfies RouteRecordRaw[]
