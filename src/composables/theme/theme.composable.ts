import { useLocalStorage } from '@vueuse/core'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'

import type { ThemeConstant } from '@/constants/theme.constant.ts'

export interface UseThemeReturnType {
  current: ComputedRef<ThemeConstant | null>
  set: (value: ThemeConstant | null) => void
}

export function useTheme(): UseThemeReturnType {
  const theme = useLocalStorage<'' | ThemeConstant>('theme', '')

  function set(value: ThemeConstant | null): void {
    theme.value = value ?? ''
  }

  return {
    current: computed<ThemeConstant | null>(() => {
      if (theme.value === '') {
        return null
      }

      return theme.value
    }),
    set,
  }
}
