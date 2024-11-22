<script setup lang="ts">
import { VcTextField } from '@wisemen/vue-core'
import type { Field } from 'formango'

import FormGrid from '@/components/app/grid/FormGrid.vue'
import FormSection from '@/components/form/FormSection.vue'
import { useI18n } from '@/composables/i18n/i18n.composable'
import { TEST_ID } from '@/constants/testId.constant.ts'

const props = defineProps<{
  firstName: Field<string>
  lastName: Field<string>
}>()

const { t } = useI18n()
</script>

<template>
  <FormSection
    :description="t('module.user.form.section.name.description')"
    :title="t('user.name')"
  >
    <FormGrid :cols="2">
      <VcTextField
        :test-id="TEST_ID.USERS.FORM.FIRST_NAME_INPUT"
        v-bind="props.firstName"
        :label="t('user.first_name')"
      />
      <VcTextField
        v-bind="props.lastName"
        :test-id="TEST_ID.USERS.FORM.LAST_NAME_INPUT"
        :label="t('user.last_name')"
      />
    </FormGrid>
  </FormSection>
</template>
