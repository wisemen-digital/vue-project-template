import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export const settingRoutes = [
  {
    path: '/settings',
    children: [
      {
        name: 'settings-overview',
        path: '',
        component: (): Component => import('@/modules/setting/features/overview/SettingOverviewView.vue'),
      },
    ],
  },
] as const satisfies RouteRecordRaw[]
