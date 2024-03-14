import { useLocalStorage } from '@vueuse/core'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'

import type { ThemeConstant } from '@/constants/theme.constant.ts'

export interface UseThemeReturnType {
  setTheme: (value: ThemeConstant | null) => void
  theme: ComputedRef<ThemeConstant | null>
}

export function useTheme(): UseThemeReturnType {
  const theme = useLocalStorage<'' | ThemeConstant>('theme', '')

  function setTheme(value: ThemeConstant | null): void {
    theme.value = value ?? ''
  }

  return {
    setTheme,
    theme: computed<ThemeConstant | null>(() => {
      if (theme.value === '') {
        return null
      }

      return theme.value
    }),
  }
}
