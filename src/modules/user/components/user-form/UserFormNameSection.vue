<script setup lang="ts">
import { FormInput } from '@wisemen/vue-core'
import type { Field } from 'formango'
import { useI18n } from 'vue-i18n'

import FormGrid from '@/components/app/grid/FormGrid.vue'
import FormSection from '@/components/form/FormSection.vue'
import { TEST_ID } from '@/constants/testId.constant.ts'

const props = defineProps<{
  firstName: Field<string>
  lastName: Field<string>
}>()

const { t } = useI18n()
</script>

<template>
  <FormSection
    :description="t('users.form.section.name.description')"
    :title="t('shared.name')"
  >
    <FormGrid :cols="2">
      <FormInput
        :test-id="TEST_ID.USERS.FORM.FIRST_NAME_INPUT"
        v-bind="props.firstName"
        :label="t('shared.first_name')"
      />
      <FormInput
        v-bind="props.lastName"
        :test-id="TEST_ID.USERS.FORM.LAST_NAME_INPUT"
        :label="t('shared.last_name')"
      />
    </FormGrid>
  </FormSection>
</template>
