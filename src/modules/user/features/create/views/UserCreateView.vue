<script setup lang="ts">
import type { BreadcrumbItem } from '@wisemen/vue-core'
import {
  useApiErrorToast,
  useToast,
  useTypedRouter,
} from '@wisemen/vue-core'
import { useForm } from 'formango'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import FormPage from '@/components/form/FormPage.vue'
import { TEST_ID } from '@/constants/testId.constant.ts'
import { userCreateFormSchema } from '@/models/user/create/userCreateForm.model'
import { useUserCreateMutation } from '@/modules/user/api/mutations/userCreate.mutation'
import UserCreateForm from '@/modules/user/features/create/components/UserCreateForm.vue'

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

const {
  form,
  onSubmitForm,
  onSubmitFormError,
} = useForm({
  schema: userCreateFormSchema,
})

onSubmitFormError(() => {
  toast.error({
    title: t('error.invalid_form_input.title'),
    description: t('error.invalid_form_input.description'),
  })
})

onSubmitForm(async (values) => {
  try {
    const user = await userCreateMutation.execute({
      body: values,
    })

    toast.show({
      testId: TEST_ID.USERS.CREATE.SUCCESS_TOAST,
      title: t('users.create.success.title'),
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
