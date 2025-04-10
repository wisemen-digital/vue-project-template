import { useLocalStorage } from '@vueuse/core'
import type { Ref } from 'vue'
import {
  computed,
  watch,
} from 'vue'

import { FontSize } from '@/client'
import { i18nPlugin } from '@/plugins/i18n.plugin.ts'
import { createI18nKeyMap } from '@/types/enum.type'

interface UseFontSizeReturnType {
  displayFn: (value: FontSize) => string
  items: FontSize[]
  value: Ref<FontSize>
}

const LOCAL_STORAGE_KEY = 'fontSize'

export function useFontSizeSelect(): UseFontSizeReturnType {
  const fontSizes: FontSize[] = [
    FontSize.SMALLER,
    FontSize.SMALL,
    FontSize.DEFAULT,
    FontSize.LARGE,
    FontSize.LARGER,
  ]

  const i18nKeys = createI18nKeyMap<FontSize>({
    default: 'module.settings.font_size.default',
    large: 'module.settings.font_size.large',
    larger: 'module.settings.font_size.larger',
    small: 'module.settings.font_size.small',
    smaller: 'module.settings.font_size.smaller',
  })

  const fontSize = useLocalStorage<FontSize>(LOCAL_STORAGE_KEY, FontSize.DEFAULT)

  const value = computed<FontSize>({
    get: () => fontSize.value,
    set: (value) => {
      fontSize.value = value
    },
  })

  function displayFn(value: FontSize): string {
    return i18nPlugin.global.t(i18nKeys.get(value)!)
  }

  return {
    displayFn,
    items: fontSizes,
    value,
  }
}

export function useFontSize(): void {
  const fontSize = useLocalStorage<FontSize>(LOCAL_STORAGE_KEY, FontSize.DEFAULT)

  const fontSizeToPxMap = new Map<FontSize, number>([
    [
      FontSize.SMALLER,
      12,
    ],
    [
      FontSize.SMALL,
      14,
    ],
    [
      FontSize.DEFAULT,
      16,
    ],
    [
      FontSize.LARGE,
      18,
    ],
    [
      FontSize.LARGER,
      20,
    ],
  ])

  watch(fontSize, () => {
    document.documentElement.style.fontSize = `${fontSizeToPxMap.get(fontSize.value)}px`
  }, { immediate: true })
}
