<script setup lang="ts">
import type { BreadcrumbItem } from '@wisemen/vue-core'
import { useToast } from '@wisemen/vue-core'
import { useForm } from 'formango'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import FormPage from '@/components/form/FormPage.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import { TEST_ID } from '@/constants/testId.constant.ts'
import { userCreateFormSchema } from '@/models/user/create/userCreateForm.model'
import { useUserCreateMutation } from '@/modules/user/api/mutations/userCreate.mutation'
import UserCreateForm from '@/modules/user/features/create/components/UserCreateForm.vue'

const { t } = useI18n()
const router = useRouter()
const toast = useToast()
const errorToast = useApiErrorToast()
const userCreateMutation = useUserCreateMutation()

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  {
    label: t('user.label.plural'),
    to: {
      name: 'user-overview',
    },
    type: 'route',
  },
  {
    label: t('module.user.create.title'),
    type: 'page',
  },
])

const form = useForm({
  schema: userCreateFormSchema,
  onSubmit: async (values) => {
    try {
      await userCreateMutation.execute({
        body: values,
      })

      toast.success({
        testId: TEST_ID.USERS.CREATE.SUCCESS_TOAST,
        message: t('module.user.create.success_toast.message'),
      })

      await router.push({
        name: 'user-overview',
      })
    }
    catch (error) {
      errorToast.show(error)
    }
  },
  onSubmitError: () => {
    toast.error({
      message: t('error.invalid_form_input.description'),
    })
  },
})
</script>

<template>
  <FormPage
    :title="t('module.user.create.title')"
    :breadcrumbs="breadcrumbs"
  >
    <UserCreateForm :form="form" />
  </FormPage>
</template>
