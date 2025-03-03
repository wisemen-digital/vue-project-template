import { useRefHistory } from '@vueuse/core'
import {
  computed,
  type ComputedRef,
  ref,
} from 'vue'

import type { SettingKey } from '@/modules/setting/types/settingKey.type.ts'

export interface SettingNavigation {
  isBackDisabled: ComputedRef<boolean>
  isForwardDisabled: ComputedRef<boolean>
  currentItem: ComputedRef<HistoryItem>
  onBack: () => void
  onForward: () => void
  onNavigate: (item: SettingKey, data?: string) => void
}

interface HistoryItem {
  data?: string
  item: SettingKey
}

export function useSettingNavigation(props: { default: SettingKey }): SettingNavigation {
  const currentItem = ref<HistoryItem>({
    item: props.default,
  })

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

  function onNavigate(item: SettingKey, data?: string): void {
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
