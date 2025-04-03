<script setup lang="ts">
import { VcSelect } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import FormFieldset from '@/components/form/FormFieldset.vue'
import { useFontSizeSelect } from '@/composables/font-size/fontSize.composable.ts'
import { useSettingPreferences } from '@/modules/setting/composables/settingPreferences.composable.ts'
import type { FontSize } from '@/modules/setting/models/preference/settingFontSize.model.ts'

const i18n = useI18n()

const fontSizeSelect = useFontSizeSelect()
const preferences = useSettingPreferences()

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
    :title="i18n.t('module.setting.font_size.title')"
  >
    <VcSelect
      v-model="fontSizeSelect.value.value"
      :items="fontSizeSelect.items.value"
      :display-fn="fontSizeSelect.displayFn"
      :label="i18n.t('module.setting.font_size.title')"
      class="w-72"
      @update:model-value="onUpdateModelValue"
    />
  </FormFieldset>
</template>
