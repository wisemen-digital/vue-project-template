<script setup lang="ts">
import { BreadcrumbItem, useToast } from '@wisemen/vue-core'
import { useForm } from 'formango'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppPage from '@/components/app/AppPage.vue'
import { useApiErrorToast } from '@/composables/error-toast/apiErrorToast.composable'
import { useTypedRouter } from '@/composables/router/typedRouter.composable'
import type { User } from '@/models/user/detail/user.model'
import { UserUpdateForm as UserUpdateFormType, userUpdateFormSchema } from '@/models/user/update/userUpdateForm.model'
import { UserFormTransformer } from '@/models/user/user.transformer'
import { useUserUpdateMutation } from '@/modules/user/api/mutations/userUpdate.mutation'

import UserUpdateForm from '../components/UserUpdateForm.vue'

const props = defineProps<{
  user: User
}>()

const { t } = useI18n()
const router = useTypedRouter()
const toast = useToast()
const errorToast = useApiErrorToast()
const userUpdateMutation = useUserUpdateMutation()

const breadcrumbs: BreadcrumbItem[] = [
  {
    label: t('shared.users'),
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

const { form, onSubmitForm } = useForm({
  initialState: computed<UserUpdateFormType>(() => UserFormTransformer.toUpdateForm(props.user)),
  schema: userUpdateFormSchema,
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
      title: t('users.update.success'),
    })

    await router.push({
      name: 'user-detail',
      params: {
        userUuid: props.user.uuid,
      },
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
    :title="props.user.fullName"
  >
    <UserUpdateForm :form="form" />
  </AppPage>
</template>
