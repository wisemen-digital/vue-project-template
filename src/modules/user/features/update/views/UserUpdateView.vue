<script setup lang="ts">
import type { BreadcrumbItem } from '@wisemen/vue-core'
import { useToast } from '@wisemen/vue-core'
import { useForm } from 'formango'
import { computed } from 'vue'

import { useUserUpdateMutation } from '@/api/mutations/userUpdate.mutation'
import FormPage from '@/components/form/FormPage.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import { useI18n } from '@/composables/i18n/i18n.composable'
import { TEST_ID } from '@/constants/testId.constant.ts'
import type { User } from '@/models/user/detail/user.model'
import type { UserUpdateForm as UserUpdateFormType } from '@/models/user/update/userUpdateForm.model'
import { userUpdateFormSchema } from '@/models/user/update/userUpdateForm.model'
import { UserUpdateTransformer } from '@/models/user/user.transformer'
import UserUpdateForm from '@/modules/user/features/update/components/UserUpdateForm.vue'

const props = defineProps<{
  user: User
}>()

const { t } = useI18n()
const toast = useToast()
const errorToast = useApiErrorToast()
const userUpdateMutation = useUserUpdateMutation()

const breadcrumbs: BreadcrumbItem[] = [
  {
    label: t('user.label.plural'),
    to: {
      name: 'user-overview',
    },
    type: 'route',
  },
  {
    label: props.user.fullName,
    to: {
      name: 'user-detail',
      params: {
        userUuid: props.user.uuid,
      },
    },
    type: 'route',
  },
  {
    label: t('shared.edit'),
    type: 'page',
  },
]

const {
  form,
  onSubmitForm,
  onSubmitFormError,
} = useForm({
  initialState: computed<UserUpdateFormType>(() => UserUpdateTransformer.toForm(props.user)),
  schema: userUpdateFormSchema,
})

onSubmitFormError(() => {
  toast.error({
    message: t('error.invalid_form_input.description'),
  })
})

onSubmitForm(async (values) => {
  try {
    await userUpdateMutation.execute({
      body: values,
      params: {
        userUuid: props.user.uuid,
      },
    })

    toast.success({
      testId: TEST_ID.USERS.UPDATE.SUCCESS_TOAST,
      message: t('module.user.update.success_toast.message'),
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
    :title="props.user.fullName"
  >
    <UserUpdateForm :form="form" />
  </FormPage>
</template>
