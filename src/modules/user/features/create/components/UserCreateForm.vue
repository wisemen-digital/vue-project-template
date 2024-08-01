<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppTeleport from '@/components/app/teleport/AppTeleport.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormLayout from '@/components/form/FormLayout.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { TEST_ID } from '@/constants/testId.constant.ts'
import type { userCreateFormSchema } from '@/models/user/create/userCreateForm.model'
import UserFormNameSection from '@/modules/user/components/user-form/UserFormNameSection.vue'

const props = defineProps<{
  form: Form<typeof userCreateFormSchema>
}>()

const { t } = useI18n()

const firstName = props.form.register('firstName')
const lastName = props.form.register('lastName')
</script>

<template>
  <AppForm :form="form">
    <template #default="{ formId }">
      <AppTeleport to="headerActions">
        <FormSubmitButton
          :form-id="formId"
          :form="form"
          :data-testid="TEST_ID.USERS.FORM.SUBMIT_BUTTON"
          :label="t('users.create.create_user')"
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
