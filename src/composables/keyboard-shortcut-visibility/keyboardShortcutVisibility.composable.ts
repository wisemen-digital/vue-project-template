import { useLocalStorage } from '@vueuse/core'
import type { Ref } from 'vue'

const LOCAL_STORAGE_KEY = 'show-keyboard-shortcuts'

export function useKeyboardShortcutVisibilityValue(): Ref<boolean> {
  return useLocalStorage<boolean>(LOCAL_STORAGE_KEY, true)
}
