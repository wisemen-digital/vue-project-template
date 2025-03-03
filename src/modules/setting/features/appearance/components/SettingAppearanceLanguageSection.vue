<script setup lang="ts">
import { VcSelect } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import FormFieldset from '@/components/form/FormFieldset.vue'
import { useLanguageSelect } from '@/composables/language/language.composable.ts'
import { useSettingPreferences } from '@/modules/setting/composables/settingPreferences.composable.ts'
import type { Locale } from '@/plugins/i18n/i18n.plugin.ts'

const { t } = useI18n()

const languageSelect = useLanguageSelect()
const preferences = useSettingPreferences()

function onUpdateModelValue(value: Locale | null): void {
  if (value === null) {
    return
  }

  preferences.update({
    language: value,
  })
}
</script>

<template>
  <FormFieldset
    :is-title-hidden="true"
    :title="t('module.setting.language.title')"
  >
    <VcSelect
      v-model="languageSelect.value.value"
      :items="languageSelect.items.value"
      :display-fn="languageSelect.displayFn"
      :label="t('module.setting.language.title')"
      class="w-72"
      @update:model-value="onUpdateModelValue"
    />
  </FormFieldset>
</template>
