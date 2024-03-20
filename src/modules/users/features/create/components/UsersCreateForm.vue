<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppTeleport from '@/components/app/teleport/AppTeleport.vue'
import AppForm from '@/components/form/form/AppForm.vue'
import AppFormSubmitButton from '@/components/form/form/AppFormSubmitButton.vue'
import type { userCreateFormSchema } from '@/models/users/create/userCreateForm.model'
import UsersFormName from '@/modules/users/components/user-form/UsersFormName.vue'

const props = defineProps<{
  form: Form<typeof userCreateFormSchema>
}>()

const { t } = useI18n()

const firstName = props.form.register('firstName')
const lastName = props.form.register('lastName')
</script>

<template>
  <AppForm :form="form">
    <AppTeleport target="header-actions">
      <AppFormSubmitButton :form="form">
        {{ t('users.create.create_user') }}
      </AppFormSubmitButton>
    </AppTeleport>

    <UsersFormName
      :first-name="firstName"
      :last-name="lastName"
    />
  </AppForm>
</template>
