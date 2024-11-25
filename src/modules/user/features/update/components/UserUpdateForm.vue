<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppTeleport from '@/components/app/teleport/AppTeleport.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormLayout from '@/components/form/FormLayout.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { TEST_ID } from '@/constants/testId.constant.ts'
import type { userUpdateFormSchema } from '@/models/user/update/userUpdateForm.model'
import UserFormNameSection from '@/modules/user/components/user-form/UserFormNameSection.vue'

const props = defineProps<{
  form: Form<typeof userUpdateFormSchema>
}>()

const { t } = useI18n()

const firstName = props.form.register('firstName')
const lastName = props.form.register('lastName')
</script>

<template>
  <AppForm :form="props.form">
    <template #default="{ formId }">
      <AppTeleport to="headerActions">
        <FormSubmitButton
          :form-id="formId"
          :form="props.form"
          :data-test-id="TEST_ID.USERS.FORM.SUBMIT_BUTTON"
          :label="t('form.save_changes')"
        />
      </AppTeleport>

      <FormLayout>
        <UserFormNameSection
          :first-name="firstName"
          :last-name="lastName"
        />
      </FormLayout>
    </template>
  </AppForm>
</template>
