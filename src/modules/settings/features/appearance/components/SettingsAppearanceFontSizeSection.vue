<script setup lang="ts">
import {
  VcSelect,
  VcSelectItem,
} from '@wisemen/vue-core-components'
import { useI18n } from 'vue-i18n'

import type { FontSize } from '@/client'
import FormFieldset from '@/components/form/FormFieldset.vue'
import { useFontSizeSelect } from '@/composables/font-size/fontSize.composable.ts'
import { useSettingsPreferences } from '@/modules/settings/composables/settingsPreferences.composable.ts'

const i18n = useI18n()

const fontSizeSelect = useFontSizeSelect()
const preferences = useSettingsPreferences()

function onUpdateModelValue(value: FontSize | null): void {
  if (value === null) {
    return
  }

  preferences.update({ fontSize: value })
}
</script>

<template>
  <FormFieldset
    :is-title-hidden="true"
    :title="i18n.t('module.settings.font_size.title')"
  >
    <VcSelect
      v-model="fontSizeSelect.value.value"
      :display-fn="fontSizeSelect.displayFn"
      :label="i18n.t('module.settings.font_size.title')"
      class="w-72"
      @update:model-value="onUpdateModelValue"
    >
      <VcSelectItem
        v-for="item in fontSizeSelect.items"
        :key="item"
        :value="item"
      >
        {{ fontSizeSelect.displayFn(item) }}
      </VcSelectItem>
    </VcSelect>
  </FormFieldset>
</template>
