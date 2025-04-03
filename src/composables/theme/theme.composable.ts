import type { ComputedRef } from 'vue'
import { computed } from 'vue'

import { useHighContrastModeValue } from '@/composables/high-contrast-mode/highContrastMode.composable'

export function useTheme(): ComputedRef<string> {
  const isHighContrastMode = useHighContrastModeValue()

  return computed<string>(() => {
    if (isHighContrastMode.value) {
      return 'high-contrast'
    }

    return 'default'
  })
}
