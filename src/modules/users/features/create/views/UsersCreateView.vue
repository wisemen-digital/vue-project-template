<script setup lang="ts">
import { useForm } from 'formango'
import { useI18n } from 'vue-i18n'

import AppPage from '@/components/app/AppPage.vue'
import { useHandleApiError } from '@/composables/handle-api-error/handleApiError.composable'
import { useTypedRouter } from '@/composables/router/typedRouter.composable'
import { userCreateFormSchema } from '@/models/users/create/userCreateForm.model'
import { useUserCreateMutation } from '@/modules/users/api/mutations/userCreate.mutation'
import type { Breadcrumb } from '@/types/breadcrumb.type'

import UsersCreateForm from '../components/UsersCreateForm.vue'

const router = useTypedRouter()
const { t } = useI18n()
const { execute: userCreateMutation } = useUserCreateMutation()

const breadcrumbs: Breadcrumb[] = [{
  label: t('shared.users'),
  to: {
    name: 'users-overview',
  },
}, {
  label: t('users.create.title'),
}]

const { form, onSubmitForm } = useForm({
  schema: userCreateFormSchema,
})

onSubmitForm(async (values) => {
  try {
    await userCreateMutation({
      body: values,
    })

    await router.push({
      name: 'users-overview',
    })
  }
  catch (error) {
    useHandleApiError(error)
  }
})
</script>

<template>
  <AppPage
    :breadcrumbs="breadcrumbs"
    :title="t('users.create.title')"
  >
    <UsersCreateForm :form="form" />
  </AppPage>
</template>
