import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export const settingsRoutes = [
  {
    path: '/settings',
    children: [
      {
        name: 'settings-overview',
        path: '',
        component: (): Component => import('@/modules/settings/features/overview/SettingsOverviewView.vue'),
      },
    ],
  },
] as const satisfies RouteRecordRaw[]
