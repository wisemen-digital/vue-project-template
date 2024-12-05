<script setup lang="ts">
import { VcSwitch } from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import FormFieldset from '@/components/form/FormFieldset.vue'
import { useHighContrastModeValue } from '@/composables/high-contrast-mode/highContrastMode.composable'

const { t } = useI18n()
const isHighContrastModeEnabled = useHighContrastModeValue()

const label = computed<string>(() => {
  if (isHighContrastModeEnabled.value) {
    return t('module.setting.high_contrast.enabled.label')
  }

  return t('module.setting.high_contrast.disabled.label')
})

const description = computed<string>(() => {
  if (isHighContrastModeEnabled.value) {
    return t('module.setting.high_contrast.enabled.description')
  }

  return t('module.setting.high_contrast.disabled.description')
})
</script>

<template>
  <FormFieldset
    :title="t('module.setting.high_contrast.title')"
    :description="t('module.setting.high_contrast.description')"
  >
    <VcSwitch
      v-model="isHighContrastModeEnabled"
      :label="label"
      :hint="description"
    />
  </FormFieldset>
</template>
