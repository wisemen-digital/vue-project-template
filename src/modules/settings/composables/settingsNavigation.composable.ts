import { useRefHistory } from '@vueuse/core'
import type { ComputedRef } from 'vue'
import {
  computed,
  ref,
} from 'vue'

import type { SettingsMenuItemKey } from '@/modules/settings/types/settingsMenuItemKey.type.ts'

export interface SettingsNavigation {
  isBackDisabled: ComputedRef<boolean>
  isForwardDisabled: ComputedRef<boolean>
  currentItem: ComputedRef<HistoryItem>
  onBack: () => void
  onForward: () => void
  onNavigate: (item: SettingsMenuItemKey, data?: string) => void
}

interface HistoryItem {
  data?: string
  item: SettingsMenuItemKey
}

export function useSettingsNavigation(props: { default: SettingsMenuItemKey }): SettingsNavigation {
  const currentItem = ref<HistoryItem>({ item: props.default })

  const history = useRefHistory<HistoryItem>(currentItem)

  const isBackDisabled = computed<boolean>(() => {
    return !history.canUndo.value
  })

  const isForwardDisabled = computed<boolean>(() => {
    return !history.canRedo.value
  })

  function onBack(): void {
    history.undo()
  }

  function onForward(): void {
    history.redo()
  }

  function onNavigate(item: SettingsMenuItemKey, data?: string): void {
    currentItem.value = {
      data,
      item,
    }
  }

  return {
    isBackDisabled,
    isForwardDisabled,
    currentItem: computed<HistoryItem>(() => currentItem.value),
    onBack,
    onForward,
    onNavigate,
  }
}
