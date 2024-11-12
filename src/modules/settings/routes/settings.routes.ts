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
      },
      {
        name: 'settings-theme',
        path: 'theme',
        component: (): Component => import('@/modules/settings/features/theme/views/SettingsThemeOverviewView.vue'),
      },
      {
        name: 'settings-users',
        path: 'users',
        component: (): Component => import('@/modules/settings/features/users/views/SettingsUsersOverviewView.vue'),
        redirect: {
          name: 'settings-users-list',
        },
        children: [
          {
            name: 'settings-users-list',
            path: '',
            component: (): Component => import('@/modules/settings/features/users/views/SettingsUsersUsersOverviewView.vue'),
          },
          {
            name: 'settings-users-roles-and-permissions',
            path: 'roles-and-permissions',
            component: (): Component => import('@/modules/settings/features/users/views/SettingsRolesAndPermissionsDataProvider.vue'),
          },
        ],
      },
    ],
  },
] as const satisfies RouteRecordRaw[]
