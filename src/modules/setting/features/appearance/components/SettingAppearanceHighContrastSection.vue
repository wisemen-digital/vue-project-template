<script setup lang="ts">
import { VcSwitch } from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import FormFieldset from '@/components/form/FormFieldset.vue'
import { useHighContrastModeValue } from '@/composables/high-contrast-mode/highContrastMode.composable.ts'
import { useSettingPreferences } from '@/modules/setting/composables/settingPreferences.composable.ts'

const i18n = useI18n()
const isHighContrastModeEnabled = useHighContrastModeValue()
const preference = useSettingPreferences()

const label = computed<string>(() => {
  if (isHighContrastModeEnabled.value) {
    return i18n.t('module.setting.high_contrast.enabled.label')
  }

  return i18n.t('module.setting.high_contrast.disabled.label')
})

const description = computed<string>(() => {
  if (isHighContrastModeEnabled.value) {
    return i18n.t('module.setting.high_contrast.enabled.description')
  }

  return i18n.t('module.setting.high_contrast.disabled.description')
})

function onUpdateModelValue(value: boolean): void {
  preference.update({ highContrast: value })
}
</script>

<template>
  <FormFieldset
    :title="i18n.t('module.setting.high_contrast.title')"
    :description="i18n.t('module.setting.high_contrast.description')"
  >
    <VcSwitch
      v-model="isHighContrastModeEnabled"
      :label="label"
      :hint="description"
      @update:model-value="onUpdateModelValue"
    />
  </FormFieldset>
</template>
