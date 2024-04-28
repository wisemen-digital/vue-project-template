<script setup lang="ts">
import { BreadcrumbItem, useToast } from '@wisemen/vue-core'
import { useForm } from 'formango'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import FormPage from '@/components/form/FormPage.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable'
import { useTypedRouter } from '@/composables/router/typedRouter.composable'
import { userCreateFormSchema } from '@/models/user/create/userCreateForm.model'
import { useUserCreateMutation } from '@/modules/user/api/mutations/userCreate.mutation'

import UserCreateForm from '../components/UserCreateForm.vue'

const { t } = useI18n()
const router = useTypedRouter()
const toast = useToast()
const errorToast = useApiErrorToast()
const userCreateMutation = useUserCreateMutation()

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
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
])

const { form, onSubmitForm } = useForm({
  schema: userCreateFormSchema,
})

onSubmitForm(async (values) => {
  try {
    const user = await userCreateMutation.execute({
      body: values,
    })

    toast.custom({
      action: {
        label: t('shared.go_to_detail'),
        onClick: () => {
          void router.push({
            name: 'user-detail',
            params: {
              userUuid: user.uuid,
            },
          })
        },
      },
      description: t('users.create.success.description'),
      icon: 'checkmarkCircle',
      title: t('users.create.success.title'),
      type: 'success',
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
  <FormPage
    :breadcrumbs="breadcrumbs"
    :title="t('users.create.title')"
  >
    <UserCreateForm :form="form" />
  </FormPage>
</template>
