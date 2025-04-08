<script setup lang="ts">
import {
  VcSelect,
  VcSelectItem,
} from '@wisemen/vue-core-components'
import { useI18n } from 'vue-i18n'

import type { Locale } from '@/client'
import FormFieldset from '@/components/form/FormFieldset.vue'
import { useLanguageSelect } from '@/composables/language/language.composable.ts'
import { useSettingsPreferences } from '@/modules/settings/composables/settingsPreferences.composable.ts'

const i18n = useI18n()

const languageSelect = useLanguageSelect()
const preferences = useSettingsPreferences()

function onUpdateModelValue(value: Locale | null): void {
  if (value === null) {
    return
  }

  preferences.update({ language: value })
}
</script>

<template>
  <FormFieldset
    :is-title-hidden="true"
    :title="i18n.t('module.settings.language.title')"
  >
    <VcSelect
      v-model="languageSelect.value.value"
      :display-fn="languageSelect.displayFn"
      :label="i18n.t('module.settings.language.title')"
      class="w-72"
      @update:model-value="onUpdateModelValue"
    >
      <VcSelectItem
        v-for="item in languageSelect.items"
        :key="item"
        :value="item"
      >
        {{ languageSelect.displayFn(item) }}
      </VcSelectItem>
    </VcSelect>
  </FormFieldset>
</template>
