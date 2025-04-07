<script setup lang="ts">
import { VcSwitch } from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import FormFieldset from '@/components/form/FormFieldset.vue'
import { useReduceMotionValue } from '@/composables/reduce-motion/reduceMotion.composable.ts'
import { useSettingsPreferences } from '@/modules/settings/composables/settingsPreferences.composable.ts'

const i18n = useI18n()
const reduceMotionValue = useReduceMotionValue()
const preferences = useSettingsPreferences()

const label = computed<string>(() => {
  if (reduceMotionValue.value) {
    return i18n.t('module.settings.reduce_motion.enabled.label')
  }

  return i18n.t('module.settings.reduce_motion.disabled.label')
})

const description = computed<string>(() => {
  if (reduceMotionValue.value) {
    return i18n.t('module.settings.reduce_motion.enabled.description')
  }

  return i18n.t('module.settings.reduce_motion.disabled.description')
})

function onUpdateModelValue(value: boolean): void {
  preferences.update({ reduceMotion: value })
}
</script>

<template>
  <FormFieldset :title="i18n.t('module.settings.reduce_motion.title')">
    <VcSwitch
      id="reduce-motion"
      v-model="reduceMotionValue"
      :label="label"
      :hint="description"
      @update:model-value="onUpdateModelValue"
    />
  </FormFieldset>
</template>
