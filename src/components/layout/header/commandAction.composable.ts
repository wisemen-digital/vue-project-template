import { useRouteQuery } from '@vueuse/router'
import type { Icon } from '@wisemen/vue-core-components'
import type { ComputedRef } from 'vue'
import {
  computed,
  watch,
} from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import type { CommandMenuItem } from '@/components/layout/header/commandMenu.composable.ts'
import { CommandMenuAction } from '@/components/layout/header/commandMenuAction.type.ts'
import type { RouteLocationCurrent } from '@/types/global/vueRouter'

interface Props {
  action: () => void
  key: CommandMenuAction
}

const COMMAND_ROUTE_KEY = 'commandAction'

export function useCommandMenuActionItems(): ComputedRef<CommandMenuItem[]> {
  const i18n = useI18n()
  const route = useRoute()

  function getBreadcrumbs(action: CommandMenuAction): string[] {
    if (action === CommandMenuAction.SETTINGS_APPEARANCE) {
      return [
        i18n.t('module.settings.title'),
        i18n.t('module.settings.appearance'),
      ]
    }

    if (action === CommandMenuAction.SETTINGS_NOTIFICATIONS) {
      return [
        i18n.t('module.settings.title'),
        i18n.t('module.settings.notifications.title'),
      ]
    }

    throw new Error(`Unknown action: ${action}`)
  }

  function getLabel(action: CommandMenuAction): string {
    if (action === CommandMenuAction.SETTINGS_APPEARANCE) {
      return i18n.t('module.settings.appearance')
    }

    if (action === CommandMenuAction.SETTINGS_NOTIFICATIONS) {
      return i18n.t('module.settings.notifications.title')
    }

    throw new Error(`Unknown action: ${action}`)
  }

  function getRoute(action: CommandMenuAction): RouteLocationCurrent {
    if (action === CommandMenuAction.SETTINGS_APPEARANCE) {
      return {
        name: route.name,
        params: route.params,
        query: { [COMMAND_ROUTE_KEY]: CommandMenuAction.SETTINGS_APPEARANCE },
      }
    }

    if (action === CommandMenuAction.SETTINGS_NOTIFICATIONS) {
      return {
        name: route.name,
        params: route.params,
        query: { [COMMAND_ROUTE_KEY]: CommandMenuAction.SETTINGS_NOTIFICATIONS },
      }
    }

    throw new Error(`Unknown action: ${action}`)
  }

  return computed<CommandMenuItem[]>(() => Object.values(CommandMenuAction).map((action) => {
    return {
      id: action,
      breadcrumbs: getBreadcrumbs(action),
      icon: getIcon(action),
      label: getLabel(action),
      to: getRoute(action),
    }
  }))
}

export function useCommandMenuAction(props: Props): void {
  const route = useRouteQuery<string | undefined>(COMMAND_ROUTE_KEY)

  watch(() => route.value, (nextValue) => {
    if (nextValue !== props.key) {
      route.value = undefined

      return
    }

    if (nextValue === undefined) {
      return
    }

    props.action()
    route.value = undefined
  }, { immediate: true })
}

function getIcon(action: CommandMenuAction): Icon {
  if (action === CommandMenuAction.SETTINGS_APPEARANCE) {
    return 'trashIcon'
  }

  if (action === CommandMenuAction.SETTINGS_NOTIFICATIONS) {
    return 'trashIcon'
  }

  throw new Error(`Unknown action: ${action}`)
}
