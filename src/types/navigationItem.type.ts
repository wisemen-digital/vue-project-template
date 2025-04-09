import type {
  Icon,
  VcKeyboardKeyProps,
} from '@wisemen/vue-core-components'

import type { RouteLocationCurrent } from '@/types/global/vueRouter'

export interface NavigationItem {
  hasAlertDot?: boolean
  icon: Icon
  keyboardShortcut?: VcKeyboardKeyProps['keyboardKey']
  label: string
  to: RouteLocationCurrent
}

export interface NavigationGroup {
  items: NavigationItem[]
  label: string
}
