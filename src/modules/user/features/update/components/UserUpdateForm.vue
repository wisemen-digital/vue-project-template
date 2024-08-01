<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppTeleport from '@/components/app/teleport/AppTeleport.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormLayout from '@/components/form/FormLayout.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import type { userUpdateFormSchema } from '@/models/user/update/userUpdateForm.model'
import UserFormNameSection from '@/modules/user/components/user-form/UserFormNameSection.vue'
import UserFormPersonalInfoSection from '@/modules/user/components/user-form/UserFormPersonalInfoSection.vue'

const props = defineProps<{
  form: Form<typeof userUpdateFormSchema>
}>()

const { t } = useI18n()

const firstName = props.form.register('firstName')
const lastName = props.form.register('lastName')

const birthDate = props.form.register('birthDate')
</script>

<template>
  <AppForm :form="props.form">
    <template #default="{ formId }">
      <AppTeleport to="headerActions">
        <FormSubmitButton
          :form-id="formId"
          :form="props.form"
          :label="t('form.save_changes')"
        />
      </AppTeleport>

      <FormLayout>
        <UserFormNameSection
          :first-name="firstName"
          :last-name="lastName"
        />

        <UserFormPersonalInfoSection :birth-date="birthDate" />
      </FormLayout>
    </template>
  </AppForm>
</template>
