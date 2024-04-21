<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppTeleport from '@/components/app/teleport/AppTeleport.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormLayout from '@/components/form/FormLayout.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import type { userCreateFormSchema } from '@/models/user/create/userCreateForm.model'
import UserFormName from '@/modules/user/components/user-form/UserFormName.vue'

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
      <AppTeleport target="header-actions">
        <FormSubmitButton
          :form-id="formId"
          :form="form"
          :label="t('users.create.create_user')"
        />
      </AppTeleport>

      <FormLayout>
        <UserFormName
          :first-name="firstName"
          :last-name="lastName"
        />
      </FormLayout>
    </template>
  </AppForm>
</template>
