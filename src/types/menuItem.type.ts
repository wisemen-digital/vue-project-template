import { Icon } from '@wisemen/vue-core'

import { Routes } from '@/routes/routes'

import { RouteLocationTyped } from './router/router.type'

export interface MenuItem {
  icon: Icon
  label: string
  to: RouteLocationTyped<keyof Routes>
}
