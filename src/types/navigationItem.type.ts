import { Icon, KeyboardCommand } from '@wisemen/vue-core'

import { Routes } from '@/routes/routes'

import { RouteLocationTyped } from './router/router.type'

export interface NavigationItem {
  command?: Omit<KeyboardCommand, 'onPressed'>
  icon: Icon
  label: string
  to: RouteLocationTyped<keyof Routes>
}
