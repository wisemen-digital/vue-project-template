<script setup lang="ts">
import { BreadcrumbItem, useToast } from '@wisemen/vue-core'
import { useForm } from 'formango'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppPage from '@/components/app/AppPage.vue'
import { useErrorToast } from '@/composables/error-toast/errorToast.composable'
import { useTypedRouter } from '@/composables/router/typedRouter.composable'
import { useUnsavedChanges } from '@/composables/unsaved-changes/unsavedChanges.composable'
import { userCreateFormSchema } from '@/models/user/create/userCreateForm.model'
import { useUserCreateMutation } from '@/modules/user/api/mutations/userCreate.mutation'

import UserCreateForm from '../components/UserCreateForm.vue'

const { t } = useI18n()
const router = useTypedRouter()
const toast = useToast()
const errorToast = useErrorToast()
const userCreateMutation = useUserCreateMutation()

const breadcrumbs: BreadcrumbItem[] = [
  {
    label: t('shared.users'),
    to: {
      name: 'user-overview',
    },
    type: 'route',
  },
  {
    label: t('users.create.title'),
    type: 'page',
  },
]

const { form, onSubmitForm } = useForm({
  schema: userCreateFormSchema,
})

useUnsavedChanges(computed<boolean>(() => form.isDirty))

onSubmitForm(async (values) => {
  try {
    await userCreateMutation.execute({
      body: values,
    })

    toast.success({
      title: t('users.create.success'),
    })

    await router.push({
      name: 'user-overview',
    })
  }
  catch (error) {
    errorToast.show(error)
  }
})
</script>

<template>
  <AppPage
    :breadcrumbs="breadcrumbs"
    :title="t('users.create.title')"
  >
    <UserCreateForm :form="form" />
  </AppPage>
</template>
