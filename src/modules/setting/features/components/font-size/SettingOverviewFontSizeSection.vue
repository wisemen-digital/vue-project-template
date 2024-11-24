<script setup lang="ts">
import { VcSelect } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import FormSection from '@/components/form/FormSection.vue'
import { useFontSizeSelect } from '@/composables/font-size/fontSize.composable'

const { t } = useI18n()

const fontSizeSelect = useFontSizeSelect()
</script>

<template>
  <FormSection
    :title="t('module.setting.font_size.title')"
    :description="t('module.setting.font_size.description')"
  >
    <VcSelect
      v-model="fontSizeSelect.value.value"
      :items="fontSizeSelect.items.value"
      :display-fn="fontSizeSelect.displayFn"
      :label="t('module.setting.font_size.title')"
      class="w-72"
    />
  </FormSection>
</template>
