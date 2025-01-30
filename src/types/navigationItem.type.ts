import type {
  Icon,
  KeyboardShortcut,
} from '@wisemen/vue-core'

import type { RouteLocationCurrent } from '@/types/global/vueRouter'

export interface NavigationItem {
  hasAlertDot?: boolean
  icon: Icon
  keyboardShortcut?: KeyboardShortcut
  label: string
  to: RouteLocationCurrent
}

export interface NavigationGroup {
  items: NavigationItem[]
  label: string
}
