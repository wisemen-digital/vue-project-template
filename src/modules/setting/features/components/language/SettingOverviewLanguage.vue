<script setup lang="ts">
import { VcSelect } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import FormFieldset from '@/components/form/FormFieldset.vue'
import { useLanguageSelect } from '@/composables/language/language.composable'

const { t } = useI18n()

const languageSelect = useLanguageSelect()
</script>

<template>
  <FormFieldset
    :title="t('module.setting.language.title')"
    :description="t('module.setting.language.description')"
  >
    <VcSelect
      v-model="languageSelect.value.value"
      :items="languageSelect.items.value"
      :display-fn="languageSelect.displayFn"
      :label="t('module.setting.language.title')"
      class="w-72"
    />
  </FormFieldset>
</template>
