import { useDarkMode } from '@wisemen/vue-core'
import {
  computed,
  watch,
} from 'vue'
import { useI18n } from 'vue-i18n'

import { Theme } from '@/client'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import { useFontSizeSelect } from '@/composables/font-size/fontSize.composable.ts'
import { useHighContrastModeValue } from '@/composables/high-contrast-mode/highContrastMode.composable.ts'
import { useKeyboardShortcutVisibilityValue } from '@/composables/keyboard-shortcut-visibility/keyboardShortcutVisibility.composable.ts'
import { useLanguageSelect } from '@/composables/language/language.composable.ts'
import { useReduceMotionValue } from '@/composables/reduce-motion/reduceMotion.composable.ts'
import type { UserUuid } from '@/models/user/userUuid.model.ts'
import { usePreferenceQuery } from '@/modules/setting/api/queries/settingPreference.query.ts'
import { SettingPreferenceService } from '@/modules/setting/api/services/settingPreference.service.ts'
import type { FontSize } from '@/modules/setting/models/preference/settingFontSize.model.ts'
import type { SettingPreferenceUpdateForm } from '@/modules/setting/models/preference/settingPreferenceUpdateForm.model.ts'
import { useAuthStore } from '@/stores/auth.store.ts'

interface UseSettingPreferenceReturnType {
  update: (preferenceForm: SettingPreferenceUpdateForm) => Promise<void>
}

export function useSettingPreferences(): UseSettingPreferenceReturnType {
  const i18n = useI18n()
  const apiErrorToast = useApiErrorToast()

  const authStore = useAuthStore()
  const userUuid = computed<UserUuid | null>(() => authStore.authUser?.uuid ?? null)
  const preferenceQuery = usePreferenceQuery(userUuid)

  const fontSizeSelect = useFontSizeSelect()
  const languageSelect = useLanguageSelect()
  const isKeyboardShortcutHintVisible = useKeyboardShortcutVisibilityValue()
  const reduceMotionValue = useReduceMotionValue()
  const isHighContrastModeEnabled = useHighContrastModeValue()
  const darkMode = useDarkMode()

  async function update(preferenceForm: SettingPreferenceUpdateForm): Promise<void> {
    if (userUuid.value === null) {
      throw new Error('User UUID is null')
    }

    try {
      await SettingPreferenceService.update(userUuid.value, preferenceForm)
    }
    catch (error) {
      apiErrorToast.show(error)
    }
  }

  watch(preferenceQuery.data, () => {
    if (preferenceQuery.data.value === null) {
      return
    }

    isHighContrastModeEnabled.value = preferenceQuery.data.value.highContrast ?? false
    fontSizeSelect.value.value = preferenceQuery.data.value.fontSize as FontSize ?? 'default'
    languageSelect.value.value = preferenceQuery.data.value.language ?? i18n.locale.value
    isKeyboardShortcutHintVisible.value = preferenceQuery.data.value.showShortcuts ?? false
    reduceMotionValue.value = preferenceQuery.data.value.reduceMotion ?? false
    darkMode.value = preferenceQuery.data.value.theme ?? Theme.SYSTEM
  })

  return { update }
}
