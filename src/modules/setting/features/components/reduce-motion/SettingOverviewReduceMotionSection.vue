<script setup lang="ts">
import { VcSwitch } from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import FormSection from '@/components/form/FormSection.vue'
import { useReduceMotionValue } from '@/composables/reduce-motion/reduceMotion.composable'

const { t } = useI18n()
const reduceMotionValue = useReduceMotionValue()

const label = computed<string>(() => {
  if (reduceMotionValue.value) {
    return t('module.setting.reduce_motion.enabled.label')
  }

  return t('module.setting.reduce_motion.disabled.label')
})

const description = computed<string>(() => {
  if (reduceMotionValue.value) {
    return t('module.setting.reduce_motion.enabled.description')
  }

  return t('module.setting.reduce_motion.disabled.description')
})
</script>

<template>
  <FormSection
    :title="t('module.setting.reduce_motion.title')"
    :description="t('module.setting.reduce_motion.description')"
  >
    <VcSwitch
      id="reduce-motion"
      v-model="reduceMotionValue"
      :label="label"
      :hint="description"
    />
  </FormSection>
</template>
