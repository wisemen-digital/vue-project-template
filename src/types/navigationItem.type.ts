import {
  Icon,
  KeyboardShortcut,
} from '@wisemen/vue-core'

import { Routes } from '@/routes/routes.ts'

import { RouteLocationTyped } from './router/router.type.ts'

export interface NavigationItem {
  icon: Icon
  keyboardShortcut?: KeyboardShortcut
  label: string
  to: RouteLocationTyped<keyof Routes>
}
