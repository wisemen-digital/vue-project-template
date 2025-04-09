import { useAppearance } from '@wisemen/vue-core-components'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

import {
  FontSize,
  UiTheme,
} from '@/client'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import { useFontSizeSelect } from '@/composables/font-size/fontSize.composable.ts'
import { useHighContrastModeValue } from '@/composables/high-contrast-mode/highContrastMode.composable.ts'
import { useKeyboardShortcutVisibilityValue } from '@/composables/keyboard-shortcut-visibility/keyboardShortcutVisibility.composable.ts'
import { useLanguageSelect } from '@/composables/language/language.composable.ts'
import { useReduceMotionValue } from '@/composables/reduce-motion/reduceMotion.composable.ts'
import { usePreferenceQuery } from '@/modules/settings/api/queries/settingsPreference.query.ts'
import { SettingsPreferenceService } from '@/modules/settings/api/services/settingsPreference.service.ts'
import type { SettingsPreferenceUpdateForm } from '@/modules/settings/models/preference/settingsPreferenceUpdateForm.model.ts'

interface UseSettingsPreferenceReturnType {
  update: (preferenceForm: SettingsPreferenceUpdateForm) => Promise<void>
}

export function useSettingsPreferences(): UseSettingsPreferenceReturnType {
  const i18n = useI18n()
  const apiErrorToast = useApiErrorToast()

  const preferenceQuery = usePreferenceQuery()

  const fontSizeSelect = useFontSizeSelect()
  const languageSelect = useLanguageSelect()
  const isKeyboardShortcutHintVisible = useKeyboardShortcutVisibilityValue()
  const reduceMotionValue = useReduceMotionValue()
  const isHighContrastModeEnabled = useHighContrastModeValue()
  const appearance = useAppearance()

  async function update(preferenceForm: SettingsPreferenceUpdateForm): Promise<void> {
    try {
      await SettingsPreferenceService.update(preferenceForm)
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
    fontSizeSelect.value.value = preferenceQuery.data.value.fontSize as FontSize ?? FontSize.DEFAULT
    languageSelect.value.value = preferenceQuery.data.value.language ?? i18n.locale.value
    isKeyboardShortcutHintVisible.value = preferenceQuery.data.value.showShortcuts ?? false
    reduceMotionValue.value = preferenceQuery.data.value.reduceMotion ?? false
    appearance.value = preferenceQuery.data.value.theme ?? UiTheme.SYSTEM
  })

  return { update }
}
