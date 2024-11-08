import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export const settingsRoutes = [
  {
    path: '/settings',
    children: [
      {
        name: 'settings-overview',
        path: '',
        component: (): Component => import('@/modules/settings/features/overview/views/SettingsOverviewView.vue'),
        redirect: {
          name: 'settings-users',
        },
        children: [
          {
            name: 'settings-users',
            path: 'users',
            component: (): Component => import('@/modules/settings/features/users/SettingsUsersOverviewView.vue'),
          },
          {
            name: 'settings-roles-and-permissions',
            path: 'roles-and-permissions',
            component: (): Component => import('@/modules/settings/features/roles-and-permissions/views/SettingsRolesAndPermissionsView.vue'),
          },
        ],
      },
    ],
  },
] as const satisfies RouteRecordRaw[]
