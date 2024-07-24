<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import { FormDatePicker } from '@wisemen/vue-core'
import type { Field } from 'formango'
import { useI18n } from 'vue-i18n'

import FormGrid from '@/components/app/grid/FormGrid.vue'
import FormSection from '@/components/form/FormSection.vue'

const props = defineProps<{
  birthDate: Field<CalendarDate>
}>()

const { t } = useI18n()
</script>

<template>
  <FormSection
    :description="t('users.form.section.personal_info')"
    :title="t('shared.personal_info')"
  >
    <FormGrid :cols="2">
      <FormDatePicker
        v-bind="props.birthDate"
        :label="t('shared.birth_date')"
      />
    </FormGrid>
  </FormSection>
</template>
