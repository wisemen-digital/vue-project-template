<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppTeleport from '@/components/app/teleport/AppTeleport.vue'
import AppForm from '@/components/form/AppForm.vue'
import AppFormSubmitButton from '@/components/form/AppFormSubmitButton.vue'
import FormLayout from '@/components/form/FormLayout.vue'
import type { userUpdateFormSchema } from '@/models/user/update/userUpdateForm.model'
import UserFormName from '@/modules/user/components/user-form/UserFormName.vue'

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
      <AppTeleport target="header-actions">
        <AppFormSubmitButton
          :form-id="formId"
          :form="props.form"
        >
          {{ t('form.save_changes') }}
        </AppFormSubmitButton>
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
