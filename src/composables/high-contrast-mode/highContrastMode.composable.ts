import { useLocalStorage } from '@vueuse/core'
import type { Ref } from 'vue'

const LOCAL_STORAGE_KEY = 'high-contrast-mode'

export function useHighContrastModeValue(): Ref<boolean> {
  return useLocalStorage<boolean>(LOCAL_STORAGE_KEY, false)
}
